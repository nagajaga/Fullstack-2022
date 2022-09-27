const PersonForm = ({ handleSubmit, handleNameChange, handleNumberChange, nameValue, numberValue }) => {
  return (
    <form>
      <div>
        name: <input value = {nameValue} onChange={handleNameChange} />
        <br />
        number: <input value = {numberValue} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit" onClick={handleSubmit}>
          add
        </button>
      </div>
    </form>
  );
};
export default PersonForm;
