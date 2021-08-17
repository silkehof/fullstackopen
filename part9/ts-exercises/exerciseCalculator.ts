interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseInput {
  exerciseHours: Array<number>;
  target: number;
}

const validateArguments = (args: Array<string>): ExerciseInput => {
  if (args.length < 4) throw new Error("Not enough arguments!");

  for (let i = 2; i < args.length; i++) {
    if (isNaN(Number(args[i]))) {
      throw new Error(`Provided value ${args[i]} was not a number!`);
    }
  }

  const exerciseHours = [];
  for (let i = 3; i < args.length; i++) {
    exerciseHours.push(Number(args[i]));
  }

  return {
    exerciseHours: exerciseHours,
    target: Number(args[2]),
  };
};

export const calculateExercises = (
  exerciseHours: Array<number>,
  target: number
): Result => {
  const totalExerciseHours = exerciseHours.reduce((a, b) => a + b, 0);
  const averageDailyExerciseHours = totalExerciseHours / exerciseHours.length;

  let ratingDescription = "Awful effort, try harder next time!";
  const rating = (): number => {
    if (averageDailyExerciseHours >= target) {
      ratingDescription = "Fantastic streak!";
      return 3;
    } else if (target - averageDailyExerciseHours <= 1) {
      ratingDescription = "Not bad, but the target wasn't met.";
      return 2;
    } else {
      return 1;
    }
  };

  return {
    periodLength: exerciseHours.length,
    trainingDays: exerciseHours.filter((el) => el > 0).length,
    success: averageDailyExerciseHours >= target,
    rating: rating(),
    ratingDescription: ratingDescription,
    target: target,
    average: averageDailyExerciseHours,
  };
};

try {
  const { exerciseHours, target } = validateArguments(process.argv);
  console.log(calculateExercises(exerciseHours, target));
} catch (e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log("Error, something bad happened, message: ", e.message);
}