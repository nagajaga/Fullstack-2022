import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  const [votes, setVotes] = useState(Array(7).fill(0))
  const [selected, setSelected] = useState(0)
  const [mostVotes, setMostVotes] = useState(0)

  const handleVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy) 
    if (votes[mostVotes] <= votes[selected]) {
      setMostVotes(selected)
    }

  }

  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>Has {votes[selected]} votes</p>
      <button onClick = {() => handleVote()}> vote </button> 
      <button onClick = {() => setSelected(Math.floor(Math.random()*anecdotes.length))}>next anecdotes</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostVotes]}</p>
      <p>has {votes[mostVotes]}</p>
    </div>
  )
}

export default App