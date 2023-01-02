import { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)  
  useEffect(() => {
    const fetchData=async()=>{      
        const {data}=await axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`) 
        console.log('data in effect',data)
        setCountry(data)           
    }
    if(name!=='')  fetchData()
      
  },[name])
  return country
  
}

const Country = ({ country }) => {
  if (!country) {
    return <div>not found...</div>
  }

  return (
    <div>
    {console.log("country comp country",country[0].name.common)}
      <h3>{country[0].name.common}</h3>
      <div>capital {country[0].capital}</div>
      <div>population {country[0].population}</div> 
      <img src={country[0].flags.png} height='100' alt={`flag of ${country[0].name.common}`}/> 
    </div>
  )  
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)
  console.log('country',country)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
