import Weather from "./Weather";
const Country = ({ country }) => {
  return (
    <div>
      <h1> {country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area code: {country.area}</p>
      <h2>Languages: </h2>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img border="1px" src={country.flags.png} alt={country.name.common} />
      <Weather country={country} />
    </div>
  );
};

export default Country;
