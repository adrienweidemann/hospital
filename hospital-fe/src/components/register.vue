<script setup lang="ts">
import { type PropType } from "vue";
import { PatientsRegister } from "hospital-lib";

import { getStateLabel } from "@helpers/patients.helper";

defineProps({
  patientsRegister: {
    type: Object as PropType<PatientsRegister>,
    required: true
  }
});
</script>

<template>
  <li v-for="patientState in Object.keys(patientsRegister)">
    {{ getStateLabel(patientState) }}: {{ patientsRegister[patientState] }}
  </li>
</template>

<style scoped>
li {
  list-style-type: none; /* Remove bullets */
}
</style>
