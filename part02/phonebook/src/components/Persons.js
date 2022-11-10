import {removePerson} from "../services/servicesPerson"

export default function Persons({persons, setPersons, filtredData, setNotification}) {
  
  const deleteClick=(id, name)=>{
    if(window.confirm(`Delete ${name} ?`)){
      removePerson(id)
      .then(res=>{console.log(res)        
        setPersons([...persons.filter(person=>person.id!==id)])
        setNotification(`deleted ${name}`)
      })      
      .catch(err=>console.log(err))
    }     
    setTimeout(()=>{
      setNotification('')
    },5000)
  }

  return (
    <>
      <h2>Numbers</h2>
      {       
        filtredData().map(person=>
            <div  key={person.name}>
                {person.name} <span> </span>
                {person.number} <span> </span>
                <button onClick={()=>deleteClick(person.id,person.name)}>delete</button>
            </div>
        )          
      }
    </>
  )
}
