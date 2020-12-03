import React from 'react'
import Course from './Course'

const Courses = ({ courses }) => {
    return (
        courses.map(course =>
            <div key={course.id}>
                <Course course={course} />
                <br></br>
            </div>
        )
    )
}

export default Courses
