import patientData from "../../data/patient-data";
import { NonSensitivePatientEntry, PatientEntry, NewPatientEntry } from "../types";
import { v1 as uuid } from "uuid";

const getPatientEntries = (): PatientEntry[] => {
  return patientData;
};

const getNonSensitivePatientEntries = (): NonSensitivePatientEntry[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };

  patientData.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatientEntries,
  getNonSensitivePatientEntries,
  addPatient
};
