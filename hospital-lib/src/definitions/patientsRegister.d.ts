export type PatientState = "F" | "H" | "D" | "T" | "X";

export type PatientsRegister = {
  [key in PatientState]: number;
};
