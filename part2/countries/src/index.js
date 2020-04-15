import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const Search = ({handleQuery}) =>{
   return(
     <>
      <p>find countries</p>
      <input onChange={handleQuery}/>
     </>
   )
}
const Languages = ({country}) =>{
  return(
    <>
      <h3>Languages</h3>
      <ul>
        {country.languages.map(language =>  <li key={language.name}>{language.name}</li>)}
      </ul>
    </>)
}
const CountryInfo = ({country}) =>{
  console.log("Country Info", {country})
  return (
    <div>
      <h2>{country.name}</h2>
      <img style={{maxWidth: '30%'}} src={country.flag} />
      <h5>Capital City: {country.capital} </h5>
      <h5>Population: {country.population} </h5>
      <Languages country={country} />
    </div>
  )
}
const ViewButton = ({country}) =>{
  const [focusCountry, setFocusCountry] = useState([]);
  const handleClick = (event) =>{
    setFocusCountry({country})
    console.log({country});
  }
  if (focusCountry.length === 0){
    console.log(focusCountry)
    return(<button name={country.name} onClick={handleClick}>View</button>)
  }else{
    console.log(focusCountry.length)
    return(<CountryInfo country={country} />)
  }
}

const CountryList = ({countriesToShow}) =>{
  if (countriesToShow.length == 1){
    return <CountryInfo country={countriesToShow[0]} />
  }
  else if (countriesToShow.length < 5){
    return (<ul>
    {countriesToShow.map(country => {
      return <li key ={country.name}>
        {country.name}
        <ViewButton country={country} />
      </li>})}
    </ul>)
  }
  else{
    return(<p> too long please be more precise </p>)
  }

}

const App = () => {
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => setCountries(response["data"]))
  }, [])

  const countriesToShow =
    countries.filter(country => country.name.includes(query))


  const handleQuery = (event) =>{
    setQuery(event.target.value);
  }

  return(
    <div>
      <Search handleQuery={handleQuery} />
      <CountryList countriesToShow={countriesToShow} />
    </div>
  )
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
