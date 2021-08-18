import patientData from "../../data/patient-data";
import { NonSensitivePatientEntry, PatientEntry, NewPatientEntry } from "../types";
import { v1 as uuid } from "uuid";

const getPatientEntries = (): PatientEntry[] => {
  return patientData;
};

const getNonSensitivePatientEntries = (): NonSensitivePatientEntry[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries,
  }));
};

const findPatientById = (id: string): PatientEntry | undefined => {
  const entry = patientData.find((p) => p.id === id);
  return entry;
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
  findPatientById,
  addPatient
};
