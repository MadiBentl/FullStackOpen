import React, {useState} from 'react';

const Header = ({name}) =>{
    return(
      <h1>{name}</h1>
    )
  }
const Content = ({parts}) =>{
  return(
    <ul>
      {parts.map(part => <li key={part.id}>{part.name} {part.exercises}</li>)}
    </ul>
  )
}

const Course = ({course}) =>{
  return (<>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </>)
}

const Total = ({parts}) =>{
  let mySum = parts.reduce((sum, part) => sum + part.exercises, 0);
  return <p>Total Exercises = {mySum}</p>
}

export default Course
