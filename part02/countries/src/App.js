import {useState, useEffect} from 'react'
import axios from 'axios'
import Country from './components/Country'
import SearchItem from './components/SearchItem'
//const URL='https://restcountries.com/v3.1/all'

const App = () => {
  const [search, setSearch]=useState('')
  const [countries, setCountries]=useState([])
  
  useEffect(()=>{    
    axios.get(process.env.REACT_APP_URL_COUNTRY)
      .then(res=>setCountries(res.data))
  },[])

  const handlChange=(e)=>{
    setSearch(e.target.value)
  }
  const displayData=()=>{
    return search
      ?countries.filter(country=>country.name.common.toLowerCase().includes(search.toLowerCase()))
      :[]
  }

  return (
    <div>
      found countries 
      <input  type="text"  
              value={search} 
              onChange={handlChange}            
      /> 
      <div>
        {
          displayData().length>10
            ?"Too many matches, specify another filter"
            :displayData().length>1 && displayData().length<10
              ?displayData().map(country=><SearchItem key={country.name.common} country={country} setSearch={setSearch}/>)
                :displayData().length===1 
                  ?<Country country={displayData()[0]} />
                  :""

        }        
      </div>
    </div>
  )
}

export default App;