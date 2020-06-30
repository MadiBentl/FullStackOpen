import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

  const vote = (anecdote) => {
    props.voteAnecdote(anecdote)
    props.setNotification(`You voted for ${anecdote.content}`, 10)
  }
  return(
    <div>
      {props.anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  if (state.filter === ''){
    return { anecdotes: state.anecdotes }
  }else{
    return {
      anecdotes: state.anecdotes.filter(anecdote => {
        return anecdote.content.indexOf(state.filter) !== -1
      })
    }
  }
}
const mapDispatchToProps = {
  setNotification, voteAnecdote
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
