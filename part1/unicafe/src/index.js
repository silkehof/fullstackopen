import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Statistic = (props) => {
  return (
    <tbody>
      <tr>
        <td>{props.text}:</td>
        <td>{props.value}</td>
      </tr>
    </tbody >
  )

}

const Statistics = (props) => {
  if (props.showTotal === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feedback has been given yet. Press the buttons above to get started!</p>
      </div>
    )
  }

  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <Statistic text='good' value={props.good} />
        <Statistic text='neutral' value={props.neutral} />
        <Statistic text='bad' value={props.bad} />
        <Statistic text='total' value={props.showTotal} />
        <Statistic text='average' value={props.showAverage} />
        <Statistic text='positive' value={props.showPositive} />
      </table>
    </div>
  )
}

const App = () => { 
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1) 
  const total = () => good + neutral + bad
  const countAverage = () => (good - bad) / total()
  const countPositive = () => (good / total()) * 100 + ' %'

  return (
    <div>
      <h1>Give feedback</h1>
      <p>How was your lunch at Unicafe today?</p>
      <Button
        handleClick={increaseGood}
        text='Good'
      />
      <Button
        handleClick={increaseNeutral}
        text='Neutral'
      />
      <Button
        handleClick={increaseBad}
        text='Bad'
      />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        showTotal={total()}
        showAverage={countAverage()}
        showPositive={countPositive()}
      />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
