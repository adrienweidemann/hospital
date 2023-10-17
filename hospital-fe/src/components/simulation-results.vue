<script setup lang="ts">
import { type PropType, computed } from "vue";
import { PatientsRegister } from "hospital-lib";

import SimulationResult from "@components/simulation-result.vue";
import { Simulation } from "@definitions/simulation";

const props = defineProps({
  simulations: {
    type: Object as PropType<Simulation[]>,
    required: true
  }
});

const simulations: PatientsRegister = computed(() => props.simulations.slice(-10)); // get the last 10 simulations only
</script>

<template>
  <v-container>
    <v-row>
      <v-col v-for="simulation in simulations" :key="simulation">
        <SimulationResult
          :simulationTreatment="simulation.treatment"
          :simulationInput="simulation.input"
          :simulationOuput="simulation.output" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
