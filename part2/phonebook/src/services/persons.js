import axios from 'axios';
const baseUrl = `http://localhost:3001/persons`

const getPersons = () =>{
  const request = axios.get(baseUrl);
  return request.then(response => response.data)
}

const addPerson = (personObj) =>{
  const request = axios.post(baseUrl, personObj);
  return request.then(response => response.data)
}

const updatePerson = (id, personObj) =>{
  const request = axios.put(baseUrl.concat("/", id), personObj);
  return request.then(response => response.data)
}

const deletePerson = (id) => {
  const request = axios.delete(baseUrl.concat("/", id));
  return request.then(response => response.data)
}

export default {getPersons, addPerson, updatePerson, deletePerson}
