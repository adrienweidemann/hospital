import { PatientsRegister, PatientState } from "./definitions/patientsRegister";
import { DrugCode } from "./definitions/drugs";
import { DRUGS_CODES } from "./drugs-codes";

export class Quarantine {
  private patients: PatientsRegister;
  private drugs: Array<DrugCode> = [];

  constructor(patients: PatientsRegister) {
    this.patients = patients;
  }

  private handleTreatments(): void {
    const containsAspirin = this.drugs.indexOf(DRUGS_CODES.ASPIRIN) > -1;
    const containsAntibiotic = this.drugs.indexOf(DRUGS_CODES.ANTIBIOTIC) > -1;
    const containsParacetamol = this.drugs.indexOf(DRUGS_CODES.PARACETAMOL) > -1;
    const containsInsulin = this.drugs.indexOf(DRUGS_CODES.INSULIN) > -1;

    // Paracetamol mixed with Aspirin would kill all the patients
    if (containsAspirin && containsParacetamol) {
      const totalDeaths: number = Object.keys(this.patients).reduce(
        (a: number, b: PatientState) => a + this.patients[b],
        0
      );

      this.patients = {
        F: 0,
        H: 0,
        D: 0,
        T: 0,
        X: totalDeaths
      };

      return;
    }

    // Diabetics without Insulin would die
    if (!containsInsulin) {
      if (this.patients.D > 0) {
        // No insulin has been given, then the patients'll die
        this.patients.X += this.patients.D;
        this.patients.D = 0;
      }
    } else {
      if (containsAntibiotic) {
        // Healthy people catch fever when Insulin is mixed with Antibiotic
        this.patients.F += this.patients.H;
        this.patients.H = 0;
      }
    }

    // Patients with Fever would be cured with Aspirin or Paracetamol
    if (containsAspirin || containsParacetamol) {
      this.patients.H += this.patients.F;
      this.patients.F = 0;
    }

    // Patients with Tuberculosis would be cured with Antibiotic
    if (containsAntibiotic) {
      this.patients.H += this.patients.T;
      this.patients.T = 0;
    }
  }

  public setDrugs(drugs: Array<DrugCode>): void {
    this.drugs = [...new Set(drugs)];
  }

  public wait40Days(): void {
    this.handleTreatments();

    // Drugs has been given to all patients, reset drugs array
    this.drugs = [];
  }

  public report(): PatientsRegister {
    return this.patients;
  }
}
