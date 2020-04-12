import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({text, fn}) =>{
  return <button onClick={() => fn()}> {text} </button>
}
const Header = ({text}) => {
  return <h1>{text}</h1>
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
  const [selected, setSelected] = useState(Math.round(Math.random()*5))
  const [votes, upvote] = useState({
    0:0,
    1:0,
    2:0,
    3:0,
    4:0,
    5:0
  });

  const handleClick = () =>{
    setSelected(Math.round(Math.random()*5))
  }

  const handleVote = (num) =>{
    upvote({...votes, [num]: votes[num] + 1})
  }

  const renderAnecdote = (votes) =>{
    let mostVotes = 0
    let mostPopular = ''
    for (const property in votes) {
        console.log(`${property}: ${votes[property]}`);
        if (votes[property] > mostVotes){
          mostVotes = votes[property];
          mostPopular = property
        }
      }
    return mostPopular;
  }
  return(
    <>
    <Header text="Random Anecdote" />
      <p>{anecdotes[selected]}</p>
      <p>Votes: {votes[selected]}</p>
      <Button fn={() => handleClick()} text="next anecdote" />
      <Button fn={() => handleVote(selected)} text="vote" />
    <Header text="Most popular Anecdote" />
      <p>{anecdotes[renderAnecdote(votes)]}</p>
    </>
  )
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
