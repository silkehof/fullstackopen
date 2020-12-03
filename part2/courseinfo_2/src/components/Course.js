import React from 'react'

const Header = ({ course }) => {
    return (
        <h1>{course.name}</h1>
    )
}

const Content = ({ course }) => {
    //console.log(course.parts.length);
    return (
        course.parts.map(part =>
            <div key={part.id}>
            <Part part={part} />
            </div>
        )
    )
}

const Part = ({ part }) => {
    return (
        <p>{part.name}: {part.exercises}</p>
    )
}

const Total = ({ parts }) => {
    const totalAmount = parts.reduce((sum, part) => sum + part.exercises, 0)
    return(
        <p><strong>You will be completing a total of {totalAmount} exercises.</strong></p>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course