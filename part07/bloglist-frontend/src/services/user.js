import axios from 'axios'

const login=async (credential) => {
  const { data } =await axios.post('http://localhost:3001/api/auth/login',  credential)
  return data
}


export default { login }