const Filter = ({ handleFilter }) => {
  return (
    <div>
      Find countries: <input onChange={handleFilter} />
    </div>
  );
};

export default Filter;
