import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { resetSuccessNotif, setErrorNotif, setSuccessNotif } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'

import { login } from '../reducers/userReducer'

const LoginForm = () => {
  console.log('loginForm')
  const [username, setUsername]=useState('')
  const [password, setPassword]= useState('')

  const dispatch=useDispatch()

  const submitForm=async (e) => {
    e.preventDefault()
    try {
      const credential={
        username,
        password
      }
      dispatch(login(credential))

      //setNotifications(`${username} logged in`)
      dispatch(setSuccessNotif(`${username} logged in`))
      setUsername('')
      setPassword('')
    } catch (err) {
      console.log('error  ', err)
      //setErrors([...errors,err.response.data.error])
      dispatch(setErrorNotif(err.response.data.error))
    }
    setTimeout(() => {
      //setErrors([])
      dispatch(resetSuccessNotif())
      //setNotifications('')
    }, 5000)
  }

  const handelChange=(e) => {
    const { name, value }=e.target
    if(name==='username') setUsername(value)
    else if(name==='password') setPassword(value)
  }



  return (
    <div>
      <h1 className='title'>log in to application</h1>
      <Form onSubmit={submitForm} className='mb-3'>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control type="text" name="username" onChange={handelChange} value={username}/>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>password</Form.Label>
          <Form.Control type="password" name="password" onChange={handelChange} value={password}/>
        </Form.Group>
        <Button variant='primary' type="submit">login</Button>
      </Form>
    </div>
  )
}

export default LoginForm