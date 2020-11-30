import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const HighestVoted = (props) => {
  if (Math.max(...props.points) > 0) {
    return (
      <div>
        <h1>Anecdote with most votes</h1>
        <p>{props.bestAnecdote}</p>
        <p>This anecdote has {Math.max(...props.points)} votes.</p>
      </div>
    )
  }
    
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>No votes haven been submitted yet.</p>
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(5).fill(0))

  const selectRandom = () => {
    return (
      setSelected(Math.floor(Math.random() * 5))
    )
  }

  const updatePoints = () => {
    const newPoints = [...points]
    newPoints[selected] += 1
    return (
      setPoints(newPoints)
    )
  }
 
  const bestAnecdote = () => {
    return (
      props.anecdotes[points.indexOf(Math.max(...points))]
    )
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>This anecdote has {points[selected]} votes.</p>
      <Button
        handleClick={updatePoints}
        text='Vote'
      />
      <Button
        handleClick={selectRandom}
        text='View new anecdote'
      />
      <HighestVoted
        bestAnecdote={bestAnecdote()}
        points={points}
      />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
