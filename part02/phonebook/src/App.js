import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
const URL='http://localhost:3001/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [search, setSearch] = useState('')
  const [notification, setNotification] = useState('')
  const [error, setError] = useState('')

  useEffect(()=>{
    axios.get(URL)
      .then(res=>setPersons(res.data))
  },[])

  const filtredData=()=>{    
    return search
              ?persons.filter(person=>person.name.toUpperCase().includes(search.toUpperCase()))
              :persons
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} error={error} />      
      <Filter setSearch={setSearch} filtredData={filtredData} />      
      <PersonForm persons={persons} 
                  setPersons={setPersons}                     
                  setNotification={setNotification}                     
                  setError={setError}                     
      />        
      <Persons  persons={persons} 
                setPersons={setPersons}
                filtredData={filtredData}                
                setNotification={setNotification}                     
      />             
    </div>
  )
}

export default App;