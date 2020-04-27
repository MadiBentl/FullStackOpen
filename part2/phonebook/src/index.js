import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import personsService from './services/persons.js';
import './index.css';

const Message = ({message}) =>{
  if (message.person === ""){
    return null
  }
  else if (message.msg == "successfully added"){
    return (
      <div className='success'>
        {`${message.msg} ${message.person}`}
      </div>
    )
  }else if (message.msg == "doesnt exist"){
    return (
      <div className='error'>
        {` ${message.person} ${message.msg}`}
      </div>
    )
  }else{
    return(
      <div className='error'>
        {`${message.msg}`}
      </div>
    )
  }
}
const DeleteButton = ({persons, person, setPersons, setMessage}) => {
  const handleClick = (event) => {
    let result = window.confirm("delete????");
    if (result){
      personsService
        .deletePerson(event.target.name)
        .then(response => {
          setPersons(persons.filter(p =>p.id !== person.id))
        })
        .catch(error => {
          setMessage({person: person.name, msg: 'doesnt exist'});
          setTimeout(() => setMessage({person:"", msg:""}), 5000)
        })
      }
  }
  return <button name={person.id} onClick={handleClick}>Delete</button>
}
const Header = ({text}) => {
  return <h2>{text}</h2>
}
const PersonForm = ({persons, setPersons, setNewName, setNewNumber, handleChange, newNumber, newName, handleNumChange, setMessage}) =>{
  const handleSubmit = (event) =>{
    let isduplicate = false;
    event.preventDefault();
    persons.forEach(person => {
      if (person.name === event.target.name.value){
        let result = window.confirm("Do you want to update?");
        if (result){
          const personObj = {
            name: person.name,
            number: event.target.num.value,
            id: person.id
          }
          personsService
            .updatePerson(person.id, personObj)
            .then(updatedPerson => setPersons(persons.map(p => p.id !== person.id? p : updatedPerson)))
            .catch(error => console.log("person doesnf exist"))
          isduplicate = true;
        }
      }
    });
    if (!(isduplicate)){
      const personObj = {
        name: event.target.name.value,
        number: event.target.num.value
      }
      personsService
        .addPerson(personObj)
        .then(newPerson => setPersons(persons.concat(newPerson)))
        .then(setNewName(''))
        .then(setNewNumber(''))
        .then(response => {
          console.log("res", response)
          setMessage({person:personObj.name, msg: "successfully added"})
          setTimeout(() => setMessage({person:"", msg: ""}), 5000)
        })
        .catch(error =>  {
          //if (error.response){
            console.log("err:", error.response.data.message)
            setMessage({person:personObj.name, msg: error.response.data.message})
            setTimeout(() => setMessage({person:"", msg: ""}), 5000)
        })
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
const PeopleList = ({notesToShow, persons, setPersons, setMessage}) => {
  return(
    <ul>
      {notesToShow.map(person =>
        <li key = {person.id}>{person.name} - {person.number} <DeleteButton setMessage={setMessage} persons={persons} person={person} setPersons={setPersons} /></li>)}
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
  const [ persons, setPersons] = useState([])
  const [ message, setMessage ] = useState({person:"", msg:""})

  useEffect(() => {
    personsService.getPersons().then(initialData => {
          setPersons(initialData)
        })
      }, [])

  const notesToShow = filterName.length === 0
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
      <Message message = {message}/>
      <PersonForm
        persons={persons}
        setFilterName={setFilterName}
        newName = {newName}
        setNewName = {setNewName}
        setNewNumber = {setNewNumber}
        newNumber={newNumber}
        handleNumChange={handleNumChange}
        handleChange={handleChange}
        setPersons={setPersons}
        setMessage={setMessage}
      />
      <Header text="Numbers"/>
      <PeopleList notesToShow={notesToShow} setPersons = {setPersons} setMessage={setMessage} persons={persons}/>
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
