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

const Weather = ({weather}) => {
  return(
    <>
      <h2>Current Weather </h2>
      <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} />
      <p>{weather.description}</p>
      <p>Wind: {weather.wind} km/h</p>
    </>
  )

}

const CountryInfo = ({country}) =>{
  const APIKEY = "7341f66d131be4663e75d126e95b4ed0"
  const capital = country.capital

  const [currentWeather, setCurrentWeather] = useState({
    icon: "https://stancedlife.com/wp-content/uploads/2017/03/default-user-icon-8-1.jpg",
    description: "",
    wind: 0
  })

  useEffect(()=>{
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${APIKEY}`)
      .then(response =>{
        console.log(response.data);
        setCurrentWeather({
          icon: response.data.weather[0].icon,
          description: response.data.weather[0].description,
          wind: response.data.wind.speed
        })})
      .then(console.log("then", currentWeather))
  }, []);
  return (
    <div>
      <h2>{country.name}</h2>
      <img style={{maxWidth: '30%'}} src={country.flag} />
      <h5>Capital City: {country.capital} </h5>
      <h5>Population: {country.population} </h5>
      <Languages country={country} />
      <Weather weather={currentWeather} />
    </div>
  )
}
const ViewButton = ({country}) =>{
  const [viewCountry, setViewCountry] = useState(false);
  const handleClick = (event) =>{
    setViewCountry(!viewCountry)
  }
  if (!(viewCountry)){
    return(<button name={country.name} onClick={handleClick}>View</button>)
  }
  else if (viewCountry){
    return(
      <>
        <button name={country.name} onClick={handleClick}>View</button>
        <CountryInfo country={country} />
      </>)
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
