export type PatientState = "F" | "H" | "D" | "T" | "X";
export type PatientStateLabel = "FEVER" | "HEALTHY" | "DIABETES" | "TUBERCULOSIS" | "DEAD";

export type PatientsRegister = {
  [key in PatientState]: number;
};
