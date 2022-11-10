import {useEffect, useState} from "react";
import axios from 'axios'
import Weather from "./Weather";

export default function Country({ country }) {
    const [weather, setWeather]=useState({})
    useEffect(()=>{        
        const PROXY_CORS=`https://corsanywhere.herokuapp.com/`        
        const URL=`${PROXY_CORS}${process.env.REACT_APP_URL_WEATHER}lat=${country.latlng[0]}&lon=${country.latlng[1]}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
        
        axios.get(URL)
            .then(res=>setWeather(res.data))
            console.log("effect", weather)
    },[])
  return (
    <div>
       
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <h4>languages:</h4>
      <ul>
        { 
          //console.log(Object.values(country.languages))             
          Object.values(country.languages)
            .map(lan=><li key={lan}>{lan}</li>)
        }
      </ul>
      <img src={country.flags.png} alt={country.name.common} />
        {
          Object.keys(weather).length>0
            ?<Weather capital={country.capital[0]} 
                      temp={weather.main.temp}
                      weatherIcon={weather.weather[0].icon}
                      wind={weather.wind.speed}
            />
            :""
        }
    </div>
  );
}
