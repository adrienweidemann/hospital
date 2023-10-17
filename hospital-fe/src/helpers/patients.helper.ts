import { PATIENT_STATES, PatientState, PatientStateLabel, PatientsRegister } from "hospital-lib";

export const getStateLabel = (patientStateKey: PatientState): PatientStateLabel => {
  return Object.keys(PATIENT_STATES).find(
    (key: PatientState) => PATIENT_STATES[key] === patientStateKey
  );
};

export const getStateLabels = (): PatientStateLabel[] => {
  return Object.keys(PATIENT_STATES);
};

export const convertStringStateToRegister = (states: string): PatientsRegister => {
  const statesList = states.split(",");

  const register: PatientsRegister = {
    F: 0,
    H: 0,
    D: 0,
    T: 0,
    X: 0
  };

  for (const state of statesList) {
    register[state]++;
  }

  return register;
};
