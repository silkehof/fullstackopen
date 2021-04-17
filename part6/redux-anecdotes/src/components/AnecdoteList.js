import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showAndHideNotification } from '../reducers/notificationReducer'

const handleAll = (dispatch, id, message) => {
  dispatch(voteAnecdote(id))
  const fullMessage = `You have voted for: ${message}`
  showAndHideNotification(dispatch, fullMessage)
}

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>

  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    if (state.filter === 'ALL') {
      return state.anecdotes.sort((a, b) => b.votes - a.votes)
    }
    const filteredAnecdotes = state.anecdotes.filter(a => {
      return a.content.includes(state.filter)
    })
    return filteredAnecdotes.sort((a, b) => b.votes - a.votes)
  })

  return (
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => handleAll(dispatch, anecdote.id, anecdote.content)}
        />
      )}
    </div>
  )
}

export default AnecdoteList