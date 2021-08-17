import express from "express";
import diagnosesService from "../services/diagnosesService";

const diagnosisRouter = express.Router();

diagnosisRouter.get("/", (_req, res) => {
  res.send(diagnosesService.getDiagnosesEntries());
});

export default diagnosisRouter;
