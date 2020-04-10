import React from 'react';
import ReactDOM from 'react-dom';

  const Header = (props) =>{
    return(
      <h1>{props.course}</h1>
    )
  }
  const Content = (props) =>{

    return(
      <>
        <Part name={props.part1} exercises={props.exercises1} />
        <Part name={props.part2} exercises={props.exercises2} />
        <Part name={props.part3} exercises={props.exercises3} />
      </>
    )
  }
  const Part = (props) => {
    return(
      <p>
        {props.name} {props.exercises}
      </p>
    )
  }
  const Footer = (props) => {
    return(
      <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
    )
  }

  const App = () => {
    const course = {
      name:'Half Stack application development',
      parts:[
        {name: 'Fundamentals of React', exercises : 10},
        {name:'Using props to pass data', exercises: 7},
        {name: 'State of a component', exercises: 14}
      ]
    }
    return(
      <div>
        <Header course={course.name}/>
        <Content
          exercises1={course.parts[0]['exercises']}
          exercises2={course.parts[1]['exercises']}
          exercises3={course.parts[2]['exercises']}
          part1={course.parts[0]['name']}
          part2={course.parts[1]['name']}
          part3={course.parts[2]['name']}
        />
        <Footer
          exercises1={course.parts[0]['exercises']}
          exercises2={course.parts[1]['exercises']}
          exercises3={course.parts[2]['exercises']}
        />
      </div>
    )

  }

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
ReactDOM.render(<App />, document.getElementById('root'));
