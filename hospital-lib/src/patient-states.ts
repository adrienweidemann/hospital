import { PatientState, PatientStateLabel } from "./definitions/patientsRegister";

export const PATIENT_STATES: Record<PatientStateLabel, PatientState> = {
  FEVER: "F",
  HEALTHY: "H",
  DIABETES: "D",
  TUBERCULOSIS: "T",
  DEAD: "X"
};
