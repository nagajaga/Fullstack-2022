const Persons = ({ persons, filterP }) => {
  return (
    <div>
      {persons.filter(filterP).map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};
export default Persons;
