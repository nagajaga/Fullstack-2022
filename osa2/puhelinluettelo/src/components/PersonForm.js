

const PersonForm = ({handleSubmit, handleNameChange, handleNumberChange}) => {
    return (
        <form>
            <div>
                name: <input onChange={handleNameChange} />
                <br />
                number: <input onChange={handleNumberChange} />

            </div>
            <div>
                <button type="submit" onClick={handleSubmit}>add</button>
            </div>
        </form>
    )
}
export default PersonForm