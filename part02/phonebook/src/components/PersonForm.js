import React,{useState} from 'react'
import {createPerson, updatePerson} from '../services/servicesPerson'

export default function PersonForm({persons, setPersons, setNotification, setError}) {    
    const [newName, setNewName]=useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

    const handlChange=(e)=>{
        if(e.target.name==='name')
          setNewName(e.target.value)
        if(e.target.name==='phone')
          setPhoneNumber(e.target.value)
      }
    const existPerson=()=>{
      return persons.find(person=>person.name===newName)
    }
    const submitForm=(e)=>{
        e.preventDefault()       

        if(existPerson()) {
          if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
            const id=existPerson().id
            const personUpdated={id:id,name:newName,number:phoneNumber}
            updatePerson(id,personUpdated)
              .then(res=>{
                setPersons(persons.map(person=>person.id===id?personUpdated:person))
                setNotification(`Updated the number of ${newName}`)
              })
              .catch(err=>{
                setError(`information of ${newName} has been already been removed from server`)
                setPersons(persons.filter(person=>person.id!==id))
                console.log(err)
              })
          }
        }
        else if(newName){
            createPerson({name:newName,number:phoneNumber})
            .then(res=>{              
              setPersons([...persons,{...res}])                
              setNotification(`Added ${newName}`)
              })
            .catch(err=>{
              console.log(err)
              setError(err.message)
            })                 
        }
        setNewName('')
        setPhoneNumber('')
        setTimeout(()=>{
          setNotification('')
          setError('')
        },5000)
      }
  return (
    <>
      <h2>add a new</h2>
      <form onSubmit={submitForm}>
        <div>
          name: <input onChange={handlChange} value={newName} name="name" />
        </div>
        <div>
          number: <input onChange={handlChange} value={phoneNumber} name="phone" />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}
