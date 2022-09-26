import { useState } from "react";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "123" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const addPerson = (event) => {
    const person = { name: newName, number: newNumber };
    event.preventDefault();
    if (persons.some((p) => p.name === newName)) {
      alert(newName + " is already added to phonebook");
      return;
    }
    setPersons(persons.concat(person));
  };

  const filterPersons = (person) =>
    person.name.toUpperCase().indexOf(filter.toUpperCase()) > -1;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={(event) => setFilter(event.target.value)} />
      <h2>add a new</h2>
      <PersonForm
        handleNameChange={(event) => setNewName(event.target.value)}
        handleNumberChange={(event) => setNewNumber(event.target.value)}
        handleSubmit={addPerson}
      />
      <h2>Numbers</h2>
      <Persons persons = {persons} filterP={filterPersons}/>
    </div>
  );
};

export default App;
