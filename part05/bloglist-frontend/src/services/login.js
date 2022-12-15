const axios=require('axios')

module.exports.login=async (credential)=>{
    const {data} =await axios.post('http://localhost:3001/api/auth/login',  credential)
    return data
}
