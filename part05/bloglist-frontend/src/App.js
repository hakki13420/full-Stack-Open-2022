import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Wrapper from './components/Wrapper'
import Notifications from './components/Notifications'

import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import Errors from './components/Errors'
//import { login } from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errors, setErrors]=useState([])
  const [notifications, setNotifications]=useState('')
  const [sort, setSort]=useState('Asc')

  const blogFormRef=useRef()


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])
  useEffect(() => {
    const userLogged=window.localStorage.getItem('user')
    if(userLogged){
      setUser(JSON.parse(userLogged))
    }
  },[])


  const addLike=(blog) => {
    updateBlog(blog.id,{ ...blog,likes:blog.likes+1 })
  }

  const addBlog=async (blog) => {
    try {
      blogService.setToken(user.token)
      const newBlog=await blogService.createBlog(blog)
      setBlogs([...blogs,newBlog])
      setNotifications(`a new blog ${blog.title}! by ${blog.author} added`)
      console.log(blogFormRef.current)
      blogFormRef.current.toggleDisplay()
    } catch (err) {
      setErrors([...errors,err.response.data.error])
    }
    setTimeout(() => {
      setErrors([])
      setNotifications('')
    }, 5000)
  }

  const updateBlog=async (id,blog) => {
    try {
      blogService.setToken(user.token)
      const blogUpdated=await blogService.updateBlog(id,blog)
      if (blogUpdated){
        const filtredBlogs= blogs.map(blg => {
          return blg.id===id?blog:blg
        })
        setBlogs([...filtredBlogs])
      }
    } catch (error) {
      setErrors([...errors,error.response.data.error])
    }
    setTimeout(() => {
      setErrors([])
      setNotifications('')
    },5000)
  }

  const removeBlog=async (id) => {
    try {
      blogService.setToken(user.token)
      await blogService.removeBlog(id)
      const arr=blogs.filter(blg => blg.id!==id)
      setBlogs(arr)
      setNotifications('blog deleted succefully')
    } catch (error) {
      setErrors([...errors,error.response.data.error])
    }

    setTimeout(() => {
      setErrors([])
      setNotifications('')
    }, 5000)
  }

  const logout=() => {
    window.localStorage.removeItem('user')
    setUser(null)
  }
  const ascSort=(arr) => {
    return arr.sort((a,b) => {
      if(a.likes<b.likes) return -1
      if(a.likes>b.likes) return 1
      return 0
    })
  }

  const desSort=(arr) => {
    return arr.sort((a,b) => {
      if(a.likes<b.likes) return 1
      if(a.likes>b.likes) return -1
      return 0
    })
  }

  const ascDesc=() => {

    if(sort==='Asc'){
      setSort('Des')
      const arr= ascSort(blogs)
      setBlogs([...arr])
    }else if(sort==='Des'){
      setSort('Asc')
      const arr= desSort(blogs)
      setBlogs([...arr])
    }

  }

  return (
    <>
      {console.log('re render')}
      <h2>blogs</h2>
      <Notifications notifications={notifications} />
      <Errors errors={errors} />
      { !user?
        (<div>
          <Wrapper
            titleBtnFirst="login"
            styling={false}
          >
            <LoginForm
              user={user}
              setUser={setUser}
              errors={errors}
              setErrors={setErrors}
              setNotifications={setNotifications}
            />
          </Wrapper>
        </div>)
        : (
          <div>
            <span>{user.name}</span><span>      logged in</span>
            <button onClick={logout}>logout</button>
            <Wrapper
              titleBtnFirst="create"
              ref={blogFormRef}
              styling={false}
            >
              <BlogForm
                addBlog={addBlog}
              />
            </Wrapper>
          </div>
        )
      }
      <button onClick={ascDesc}>{sort}</button>
      <div className="blogs">
      {
        blogs.map(blog => {
          return <Wrapper
            title={blog.title + blog.author}
            key={blog.id}
            titleBtnFirst="view"
            titleBtnSecond="hide"
            styling
          >
            <Blog blog={blog}
              removeBlog={removeBlog}
              addLike={addLike}
              user={user}
            />
          </Wrapper>
        })
      }
      </div>

    </>
  )
}

export default App
