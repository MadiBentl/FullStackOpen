import React, {useState} from 'react';
import ReactDOM from 'react-dom';



const Header = ({text}) => {
  return <h2>{text}</h2>
}
const PersonForm = ({persons, setPersons, setNewName, setNewNumber, handleChange, newNumber, newName, handleNumChange}) =>{
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

  return(
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
  </form>)
}
const PeopleList = ({notesToShow, persons}) => {
  return(
    <ul>
      {notesToShow.map(person =>
        <li key = {person.name}>{person.name} - {person.number}</li>)}
    </ul>
  )
}
const Filter = ({setFilterName, persons, filterName}) => {
  const handleFilterChange = (event) =>{
    setFilterName(event.target.value)
  }
  return(
    <>
      <p>filter shown with</p>
      <input name="filterName" value={filterName} onChange={handleFilterChange}/>
    </>
  )

}
const App = () => {
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName ] = useState('')
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const notesToShow = filterName.length == 0
  ? persons : persons.filter(person => person.name.includes(filterName))
  const handleChange = (event) =>{
    setNewName(event.target.value)
  }
  const handleNumChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <Header text= "Phonebook"/>
      <Filter persons= {persons} setFilterName = {setFilterName} />
      <Header text="Add new"/>
      <PersonForm
        persons={persons}
        setFilterName={setFilterName}
        newName = {newName}
        newNumber={newNumber}
        handleNumChange={handleNumChange}
        handleChange={handleChange}
      />
      <Header text="Numbers"/>
      <PeopleList notesToShow={notesToShow} persons={persons}/>
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
