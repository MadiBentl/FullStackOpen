import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Header = ({title}) => {
  return (
      <h1> {title} </h1>
    )
}
const Stat = ({result, votes}) => {
  return (
    <tr>
      <td> {result}</td>
      <td>{votes} </td>
    </tr>)
}

const Statistics = ({votes}) => {
  const positiveMath = () => {
    return votes.good/(votes.neutral + votes.bad + votes.good)
  }

  const averageMath = () => {
    return (votes.good - votes.bad)/(votes.good + votes.bad + votes.neutral)
  }
  if (votes.good + votes.neutral + votes.bad > 0){
    return(
      <table>
        <tbody>
          <Stat result="good" votes={votes.good} />
          <Stat result="neutral" votes={votes.neutral} />
          <Stat result="bad" votes={votes.bad} />
          <Stat result="total" votes={votes.good + votes.neutral + votes.bad}/>
          <Stat result= "average" votes={averageMath()} />
          <Stat result="positive" votes={positiveMath()}/>
        </tbody>
    </table>
    )
  }
  else{
    return "No feedback has been given"
  }
}
const Button = ({name, fn}) => {
  return <button onClick={fn}>{name}</button>
}

const App = () => {
  const mainHeading = "Give Feedback"
  const secondHeading = "Statistics"
  const [votes, giveVote] = useState({
    good:0,
    neutral: 0,
    bad: 0
  })

  const handleClick = (result) => {
    switch (result) {
      case "good":
        giveVote({ ...votes,good: votes.good + 1});
        break;
      case "neutral":
        giveVote({ ...votes,neutral: votes.neutral + 1});
        break;
      case "bad":
        giveVote({ ...votes,bad: votes.bad + 1});
        break;
      default:
        break;
    }
  }


  return (
    <div>
      <Header title={mainHeading}/>
      <Button name="good" fn={() => handleClick("good")} />
      <Button name="neutral" fn={() => handleClick("neutral")} />
      <Button name="bad" fn={() => handleClick("bad")} />
      <Header title={secondHeading}/>
      <Statistics votes={votes}/>
    </div>
  )
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
