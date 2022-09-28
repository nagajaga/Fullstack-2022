import Country from "./Country";

const Countries = ({ countries, filterC, setCountriesToShow }) => {
  if (countries.filter(filterC).length >= 10) {
    return <div>Too many matches, specify another filter.</div>;
  }

  if (countries.filter(filterC).length === 1) {
    return <Country country={countries.filter(filterC)[0]} />;
  }

  return (
    <div>
      {countries.filter(filterC).map((country) => (
        <p key={country.name.common}>
          {country.name.common}
          <button onClick={() => setCountriesToShow(country.name.common)}>
            show
          </button>
        </p>
      ))}
    </div>
  );
};
export default Countries;
