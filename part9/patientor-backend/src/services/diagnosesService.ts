import diagnosesData from "../../data/diagnoses-data";
import { DiagnosisEntry } from "../types";

const getDiagnosesEntries = (): DiagnosisEntry[] => {
  return diagnosesData;
};

export default {
  getDiagnosesEntries,
};
