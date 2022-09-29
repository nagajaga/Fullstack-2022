const Persons = ({ persons, filterP, handleDelete }) => {
  return (
    <div>
      {persons.filter(filterP).map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
          <button onClick={() => handleDelete(person)}>Delete</button>
        </p>
      ))}
    </div>
  );
};
export default Persons;
