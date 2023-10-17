<script setup lang="ts">
import { ref, Ref, reactive } from "vue";
import { PatientsRegister, DrugCode, Quarantine } from "hospital-lib";

import services from "@api/services";
import { convertStringStateToRegister } from "@helpers/patients.helper";
import { convertStringDrugCodesToLabels } from "@helpers/drugs.helper";
import SimulationResults from "@components/simulation-results.vue";
import Register from "@components/register.vue";
import { Simulation } from "@definitions/simulation";

const register: Ref<PatientsRegister> = ref<PatientsRegister>(null);
const treatment: Ref<DrugCode[]> = ref<PatientsRegister>(null);
const simulations = reactive<Simulation[]>([]);

const fetchRegisterError = ref<string | null>(null);
const fetchTreatmentError = ref<string | null>(null);

const fetchPatients = async () => {
  try {
    register.value = convertStringStateToRegister(await services.patients.list());
  } catch (err) {
    fetchRegisterError.value =
      "An error has occured while fetching data. Please, try again or contact your administrator.";
  }
};

const fetchDrugs = async (): Promise<void> => {
  try {
    const stringList: string = await services.drugs.list();
    treatment.value = stringList !== "" ? stringList.split(",") : [];
  } catch (err) {
    fetchTreatmentError.value =
      "An error has occured while fetching data. Please, try again or contact your administrator.";
  }
};

const fetchData = async (): Promise<void> => {
  // Reset errors
  fetchRegisterError.value = null;
  fetchTreatmentError.value = null;

  await Promise.all([fetchPatients(), fetchDrugs()]); // can edit the code to call axios.all() as well - would be optimized
};

const simulate = () => {
  const quarantine = new Quarantine(register.value);
  quarantine.setDrugs(treatment.value);
  quarantine.wait40Days();

  simulations.push({
    input: register.value,
    output: quarantine.report(),
    treatment: treatment.value
  });
};
</script>

<template>
  <!-- This view can be splitted in subviews in a /screen or /view folder. -->
  <div>
    <h1>Hospital simulator</h1>
  </div>

  <div id="simulationInputContainer">
    <h3>Register</h3>

    <div v-if="fetchRegisterError">
      <p>{{ fetchRegisterError }}</p>
    </div>
    <div v-else-if="register === null">
      <p>No data to display, please fetch data from server with the button below.</p>
    </div>
    <Register v-else :patientsRegister="register" />

    <h3>Treatment</h3>

    <div v-if="fetchTreatmentError">
      <p>{{ fetchTreatmentError }}</p>
    </div>
    <div v-else-if="treatment === null">
      <p>No data to display, please fetch data from server with the button below.</p>
    </div>
    <div v-else>
      <p>
        {{
          treatment.length > 0
            ? convertStringDrugCodesToLabels(treatment).reduce(
                (text: string, drugLabel: string) => (text += ` ${drugLabel}`),
                ""
              )
            : "No treatment"
        }}
      </p>
    </div>
  </div>

  <div>
    <v-btn @click="fetchData"> Fetch patients and drugs </v-btn>
    <v-btn @click="simulate" color="primary"> Administer drugs to the patients </v-btn>
  </div>

  <div>
    <h3>10 last simulations:</h3>
    <SimulationResults :simulations="simulations" />
  </div>
</template>

<style scoped>
.v-btn {
  margin: 1em;
}

#simulationInputContainer {
  padding: 2em;
}
</style>
