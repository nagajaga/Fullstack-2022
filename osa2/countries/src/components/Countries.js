const Countries = ({ countries, filterC }) => {
  if (countries.filter(filterC).length >= 10) {
    return <div>Too many matches, specify another filter.</div>;
  }

  if (countries.filter(filterC).length === 1) {
    const country = countries.filter(filterC)[0];
    return (
      <div>
        <h1> {country.name.common}</h1>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
        <h2>languages: </h2>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={country.name.common} />
      </div>
    );
  }

  return (
    <div>
      {countries.filter(filterC).map((country) => (
        <p key={country.name.common}>{country.name.common}</p>
      ))}
    </div>
  );
};
export default Countries;
