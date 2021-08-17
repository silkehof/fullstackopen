/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
const app = express();
app.use(express.json());
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

app.get("/bmi", (req, res) => {
  if (isNaN(Number(req.query.weight)) || isNaN(Number(req.query.height))) {
      res.status(400).send({error: 'height and weight were not two numbers'});
      return;
  }
  res.send({
    weight: Number(req.query.weight),
    height: Number(req.query.height),
    bmi: calculateBmi(
      Number(req.query.height),
      Number(req.query.weight)
    ),
  });
});

app.post("/exercises", (req, res) => {
  // console.log(req.body);
  const { exerciseHours, target } = req.body;

  if ( exerciseHours == undefined || target == undefined) {
    res.status(400).send({error: 'parameters missing'});
    return;
  }
  const isANumber = (currentValue: unknown) => !isNaN(Number(currentValue));
  if (!Array.isArray(exerciseHours) || !exerciseHours.every(isANumber) || isNaN(Number(target))) {
    res.status(400).send({error: 'parameters malformatted parameters'});
    return;
  }

  const result = calculateExercises(exerciseHours, target);
  res.json(result).send;
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
