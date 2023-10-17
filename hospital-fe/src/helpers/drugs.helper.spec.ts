import { DRUGS_CODES } from "hospital-lib";

import { getDrugLabel, convertStringDrugCodesToLabels } from "./drugs.helper";

/**
 * I'm following Javascript best practices for UT https://github.com/goldbergyoni/javascript-testing-best-practices
 * This is a sample of UT for helpers
 */
describe("Run getDrugLabel test", () => {
  it("should return Paracetamol", () => {
    expect(getDrugLabel("P")).toBe("PARACETAMOL");
  });

  it("should return undefined", () => {
    expect(getDrugLabel("")).toBe(undefined);
  });

  it("should return Aspirin", () => {
    expect(getDrugLabel("As")).toBe("ASPIRIN");
  });

  it("should return Insulin", () => {
    expect(getDrugLabel("I")).toBe("INSULIN");
  });

  it("should return Antibiotic", () => {
    expect(getDrugLabel("An")).toBe("ANTIBIOTIC");
  });
});

describe("Run convertStringDrugCodesToLabels test", () => {
  it("should work", () => {
    expect(
      convertStringDrugCodesToLabels([DRUGS_CODES.PARACETAMOL, DRUGS_CODES.ASPIRIN])
    ).toStrictEqual(["PARACETAMOL", "ASPIRIN"]);
  });

  it("should return empty with unknown value", () => {
    expect(convertStringDrugCodesToLabels(["S"])).toStrictEqual([]);
  });

  it("should return empty with empty string", () => {
    expect(convertStringDrugCodesToLabels([""])).toStrictEqual([]);
  });

  it("should work and ignore empty string", () => {
    expect(
      convertStringDrugCodesToLabels(["", DRUGS_CODES.PARACETAMOL, "S", DRUGS_CODES.ASPIRIN])
    ).toStrictEqual(["PARACETAMOL", "ASPIRIN"]);
  });
});
