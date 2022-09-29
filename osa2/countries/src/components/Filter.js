const Filter = ({ handleFilter, value }) => {
  return (
    <div>
      Find countries: <input value = {value} onChange={handleFilter} />
    </div>
  );
};

export default Filter;
