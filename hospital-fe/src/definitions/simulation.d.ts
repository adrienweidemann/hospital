import { PatientsRegister, DrugCode } from "hospital-lib";

export interface Simulation {
  input: PatientsRegister;
  output: PatientsRegister;
  treatment: DrugCode[];
}
