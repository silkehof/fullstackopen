import React from "react";
//import { isPropertySignature, parseJsonText } from "typescript";

const App = () => {
  interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
  }

  interface CoursePartWithDescription extends CoursePartBase {
    description: string;
  }

  interface CourseNormalPart extends CoursePartWithDescription {
    type: "normal";
  }

  interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
  }

  interface CourseSubmissionPart extends CoursePartWithDescription {
    type: "submission";
    exerciseSubmissionLink: string;
  }

  interface CoursePartSpecial extends CoursePartWithDescription {
    type: "special";
    requirements: string[];
  }

  type CoursePart =
    | CourseNormalPart
    | CourseProjectPart
    | CourseSubmissionPart
    | CoursePartSpecial;

  const courseName = "Half Stack Application Development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal",
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special",
    },
  ];

  const Header = ({ name }: { name: string }) => {
    return <h1>{name}</h1>;
  };

  const Content = (props: { parts: CoursePart[] }) => {
    return (
      <div>
        {props.parts.map((part) => (
          <Part key={part.name} part={part} />
        ))}
      </div>
    );
  };

  const Total = (props: { parts: CoursePart[] }) => {
    return (
      <p>
        <strong>
          Number of total exercises:{" "}
          {props.parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </strong>
      </p>
    );
  };

  const Part = (props: { part: CoursePart }) => {
    const result = () => {
      switch (props.part.type) {
        case "normal":
          return <p>{props.part.description}</p>;
        case "groupProject":
          return <p>Group projects: {props.part.groupProjectCount}</p>;
        case "submission":
          return (
            <p>
              {props.part.description}
              <br></br>
              Submit to: {props.part.exerciseSubmissionLink}
            </p>
          );
        case "special":
          return (
            <p>
              {props.part.description}
              <br></br>
              Requirements: {props.part.requirements.join(", ")}
            </p>
          );
        default:
          return assertNever(props.part);
      }
    };

    return (
      <div>
        <strong>
          {props.part.name}: {props.part.exerciseCount} exercises
        </strong>
        {result()}
        <br></br>
      </div>
    );
  };

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;
