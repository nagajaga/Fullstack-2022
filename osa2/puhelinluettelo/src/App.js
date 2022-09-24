import { useState } from 'react'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const addName = (event) => {
    event.preventDefault()

    setPersons(persons.concat({name: newName}))
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input onChange = {(event) => setNewName(event.target.value)}/>
        </div>
        <div>
          <button type="submit" onClick = {addName}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key= {person.name}>{person.name}</p>) }
    </div>
  )

}

export default App
