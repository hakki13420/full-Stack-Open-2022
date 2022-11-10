import axios from 'axios'
const baseUrl='http://localhost:3001/persons'

const createPerson=(data)=>{
    return axios.post(baseUrl,data)
            .then(res=>res.data)                         
}

const updatePerson=(id,data)=>{
    return axios.patch(baseUrl+`/${id}`,data)
            .then(res=>res.data)
}

const removePerson=(id)=>{
    return axios.delete(baseUrl+`/${id}`)
            .then(res=>res.data)          
}

export {
    createPerson,
    removePerson,
    updatePerson
}