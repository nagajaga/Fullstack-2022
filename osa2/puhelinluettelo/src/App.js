import { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

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
        const duplicate = persons.find((p) => p.name === newName);
        console.log(duplicate);
        personService
          .update(duplicate.id, person)
          .then(() => {
            setSuccess(`Updated ${person.name}`);
            setTimeout(() => {
              setSuccess(null);
            }, 5000);
            setPersons(
              persons.map((p) => (p.name === duplicate.name ? person : p))
            );
          })
          .catch((error) => {
            setError(error.response.data.error);
            setTimeout(() => {
              setError(null);
            }, 5000);
          });
      }

      return;
    }

    personService.create(person).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
      setSuccess(`Added ${person.name}`);
      setTimeout(() => {
        setSuccess(null);
      }, 5000);
    });
  };

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}`)) {
      personService
        .yeet(person.id)
        .then(() => {
          setSuccess(`Deleted ${person.name}`);
          setTimeout(() => {
            setSuccess(null);
          }, 5000);
        })
        .catch((error) => {
          setError(
            `Information of ${person.name} has already been removed from server`
          );
          setTimeout(() => {
            setError(null);
          }, 5000);
        });
      setPersons(persons.filter((p) => p.name !== person.name));
    }
  };
  const filterPersons = (person) =>
    person.name.toUpperCase().indexOf(filter.toUpperCase()) > -1;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={success} error={false} />
      <Notification message={error} error={true} />

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
