import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Blogs from './components/blogs/Blogs'
import LoginForm from './components/LoginForm'
import Wrapper from './components/Wrapper'
import Notifications from './components/Notifications'

import Errors from './components/Errors'
import { initiliazeBlogs } from './reducers/blogReducer'
import { doLogin } from './reducers/userReducer'

import { useDispatch, useSelector } from 'react-redux'

import { Routes, Route, useMatch  } from 'react-router-dom'
import Users from './components/users/Users'
import User from './components/users/User'
import BlogEdit from './components/blogs/BlogEdit'
import Navigation from './components/navigation/Navigation'


const App = () => {
  const [users, setUsers]=useState([])
  let user=useSelector(state => state.users)
  const blogs=useSelector(state => state.blogs)
  const notifications=useSelector(state => state.notifications.success)
  const errors=useSelector(state => state.notifications.errors)
  const dispatch=useDispatch()

  useEffect(() => {
    dispatch(initiliazeBlogs())
  }, [dispatch])

  useEffect(() => {
    const userLogged=window.localStorage.getItem('user')

    if(userLogged){
      dispatch(doLogin(JSON.parse(userLogged)))
    }
  },[dispatch])

  useEffect(() => {
    axios.get('http://localhost:3001/api/users')
      .then(res => {
        console.log('users', res.data)
        return setUsers(res.data)
      })
  },[])

  const match=useMatch('/users/:id')
  const userInd=match
    ?users.find(u => u.id===match.params.id)
    :null

  const matchBlog=useMatch('/blogs/:id')
  const blogInd=matchBlog
    ?blogs.find(el => el.id===matchBlog.params.id)
    :null

  return (
    <div className='container'>
      {console.log('re render')}
      <Navigation />
      <div className="header">
        <Notifications notifications={notifications} />
        <Errors errors={errors} />
        <h2>blogs app</h2>
      </div>
      { !Object.keys(user).length?
        (<div className='App menu'>
          <Wrapper
            titleBtnFirst="login"
            styling={false}
          >
            <LoginForm />
          </Wrapper>
        </div>)
        : (
          <div className='App'>
            <Routes>
              <Route path='/users' element={<Users users={users}/>} />
              <Route path='/users/:id' element={<User user={userInd}/>} />
              <Route path='/blogs' element={<Blogs />} />
              <Route path='/blogs/:id' element={<BlogEdit blog={blogInd} />} />
            </Routes>
          </div>
        )
      }
    </div>
  )
}

export default App
