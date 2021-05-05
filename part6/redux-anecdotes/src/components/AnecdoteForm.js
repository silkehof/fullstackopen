import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showAndHideNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    const message = `You have added: ${content}`
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.showAndHideNotification(message, 5)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    </div >
  )
}

export default connect(
  null,
  { createAnecdote, showAndHideNotification}
)(AnecdoteForm)