import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [ newName, setNewName ] = useState('')

  const [ newNumber, setNewNumber ] = useState('')

  const handleSubmit = (event) =>{
    let isduplicate = false;
    event.preventDefault();
    persons.forEach(person => {
      if (person.name === event.target.name.value){
        window.alert(`${event.target.name.value} is already in phonebook`)
        isduplicate = true;
      }
    });
    if (!(isduplicate)){
      setPersons(persons.concat({
        name: event.target.name.value,
        number: event.target.num.value
      }))
      setNewName('');
      setNewNumber('');
      isduplicate = false;
    }
  }

  const handleChange = (event) =>{
    console.log(event.target.value);
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNumber(event.target.value)
  }

  const PeopleList = ({persons}) => {
    return(
      <ul>
        {persons.map(person =>
          <li key = {person.name}>{person.name} - {person.number}</li>)}
      </ul>
    )

  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit = {handleSubmit}>
        <div>
          name: <input name="name" value={newName} onChange = {handleChange}/>
        </div>
        <div>
          number: <input name="num" value={newNumber} onChange = {handleNumChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <PeopleList persons={persons}/>
    </div>
  )
}

export default App

ReactDOM.render(
    <App />
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
