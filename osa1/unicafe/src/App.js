import { useState } from 'react'
const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}
const StatisticsLine = ({name,value}) => {
  return(
    <p>
      {name} {value}
    </p>
  )
}
const Statistics = ({ good, bad, neutral }) => {
  if (good === 0 && bad === 0 && neutral === 0) {
    return (<p>No feedback given</p>)
  }
  return (
    <div>
      <StatisticsLine name = 'good' value = {good}/>
      <StatisticsLine name = 'neutral' value = {neutral}/>
      <StatisticsLine name = 'bad' value = {bad}/>
      <StatisticsLine name = 'all' value = {good + bad + neutral}/>
      <StatisticsLine name = 'average' value = {(good - bad) / (good + bad + neutral)}/>
      <StatisticsLine name = 'positive' value = {good / (good + bad + neutral) * 100 + '%'}/>
    </div>
  )
}
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App