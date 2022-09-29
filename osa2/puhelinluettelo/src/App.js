import { useState, useEffect } from "react";
import axios from "axios";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    const person = { name: newName, number: newNumber };
    event.preventDefault();
    if (persons.some((p) => p.name === newName)) {

      if (
        window.confirm(
          `${person.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const duplicate = persons.find(p => p.name === newName)
        personService.update(duplicate.id, person)
        setPersons(persons.map(p => p.name === duplicate.name ? person : p))
      }

      return;
    }

    personService.create(person).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
    });
  };

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}`)) {
      personService.yeet(person.id);
      setPersons(persons.filter((p) => p.name !== person.name));
    }
  };
  const filterPersons = (person) =>
    person.name.toUpperCase().indexOf(filter.toUpperCase()) > -1;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={(event) => setFilter(event.target.value)} />
      <h2>add a new</h2>
      <PersonForm
        nameValue={newName}
        numberValue={newNumber}
        handleNameChange={(event) => setNewName(event.target.value)}
        handleNumberChange={(event) => setNewNumber(event.target.value)}
        handleSubmit={addPerson}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filterP={filterPersons}
        handleDelete={deletePerson}
      />
    </div>
  );
};

export default App;
