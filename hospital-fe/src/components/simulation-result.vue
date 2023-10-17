<script setup lang="ts">
import { type PropType } from "vue";
import { PatientsRegister, DrugCode } from "hospital-lib";

import Register from "@components/register.vue";
import { getDrugLabel } from "@helpers/drugs.helper";

const props = defineProps({
  simulationTreatment: {
    type: Object as PropType<DrugCode[]>,
    required: true
  },
  simulationInput: {
    type: Object as PropType<PatientsRegister[]>,
    required: true
  },
  simulationOuput: {
    type: Object as PropType<PatientsRegister[]>,
    required: true
  }
});

const treatment: string =
  props.simulationTreatment.length > 0
    ? props.simulationTreatment.reduce(
        (result: string, drugCode: DrugCode) => (result += ` ${getDrugLabel(drugCode)}`),
        ""
      )
    : "no treatment";
</script>

<template>
  <v-card width="400">
    <v-container>
      <v-row>
        <v-col>
          <b>Before treatment</b>
          <Register :patientsRegister="$props.simulationInput" />
        </v-col>

        <v-divider class="ms-3" inset vertical></v-divider>

        <v-col>
          <b>After with {{ treatment }}</b>
          <Register :patientsRegister="$props.simulationOuput" />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<style scoped>
.v-row {
  margin: 1em;
}
</style>
