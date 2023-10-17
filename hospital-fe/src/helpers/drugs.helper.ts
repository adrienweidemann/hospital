import { DRUGS_CODES, DrugCode, DrugLabel } from "hospital-lib";

export const getDrugLabel = (drugCode: DrugCode): DrugLabel | undefined => {
  return Object.keys(DRUGS_CODES).find((key: DrugCode) => DRUGS_CODES[key] === drugCode);
};

export const convertStringDrugCodesToLabels = (drugCodes: DrugCode[]): DrugLabel[] => {
  const labels: DrugLabel[] = [];

  for (const drugCode of drugCodes) {
    const label: string | undefined = getDrugLabel(drugCode);

    if (label !== undefined) {
      labels.push(label);
    }
  }

  return labels;
};
