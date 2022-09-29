import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [override, setOverride] = useState(null)

  useEffect(() => {
    console.log("effect");
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      console.log("promise fulfilled");
      setCountries(response.data);
    });
  }, []);

  const filterCountries = (country) =>
    country.name.common.toUpperCase().indexOf(filter.toUpperCase()) > -1;

  return (
    <div>
      <Filter handleFilter={(event) => {setFilter(event.target.value); setOverride(null)}} value = {filter} />
      <Countries
        countries={countries}
        filterC={filterCountries}
        setCountriesToShow={setOverride}
        override={override}
      />
    </div>
  );
};
export default App;
