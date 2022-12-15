import {useState} from 'react'
import blogService from '../services/blogs'
import { login } from '../services/login'

const LoginForm = ({user, setUser,errors, setErrors, setNotifications}) => {
    
    const [username, setUsername]=useState('')
    const [password, setPassword]= useState('')


    const submitForm=async (e)=>{
        e.preventDefault()
        try {
          const credential={
            username,
            password
          }
          const user=await login(credential)    
          setUser(user)
          blogService.setToken(user.token)
          window.localStorage.setItem('user',JSON.stringify(user))
          setNotifications(`${username} logged in`)
          setUsername('')
          setPassword('')  
        } catch (err) {              
          setErrors([...errors,err.response.data.error])
        }   
        setTimeout(() => {
          setErrors([])
          setNotifications('')
        }, 5000);
      }

      const handelChange=(e)=>{
        const {name, value}=e.target
        if(name==="username") setUsername(value)
        else if(name==="password") setPassword(value)       
      }
    
 
  
  return (
    <div>
      <h1>log in to application</h1>
        <form onSubmit={submitForm}>
        <div>
          username
          <input type="text" name="username" onChange={handelChange} value={username}/>  
        </div>
        <div>
          password
          <input type="password" name="password" onChange={handelChange} value={password}/>
        </div>                
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm