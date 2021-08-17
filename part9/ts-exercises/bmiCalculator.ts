interface BmiValues {
    height: number;
    weight: number;
}

const parseArguments = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (height: number, weight: number): string => {
    const result = (weight/(height * height) * 10000);

    if (result < 18.5) {
        return "Underweight (unhealthy weight)";
    } else if (result < 25.0) {
        return "Normal (healthy weight)";
    } else if (result < 30.0) {
        return "Overweight (unhealthy weight)";
    } else {
        return "Obese (unhealthy weight)";
    }
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log('Error, something bad happened, message: ', e.message);
}
