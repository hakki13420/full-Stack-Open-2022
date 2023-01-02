import './blogs.css'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { appendBlog, ascSort, descSort, eraseBlog } from '../../reducers/blogReducer'
import { resetErrorNotif, resetSuccessNotif, setErrorNotif, setSuccessNotif } from '../../reducers/notificationReducer'
import Blog from './Blog'
import Wrapper from '../Wrapper'
import BlogForm from './BlogForm'
import { Button } from 'react-bootstrap'


const Blogs = () => {
  const [sort, setSort]=useState('Asc')
  const dispatch=useDispatch()
  const blogFormRef=useRef()
  const blogs=useSelector(state => state.blogs)


  const removeBlog=async (id) => {
    try {
      dispatch(eraseBlog(id))
      dispatch(setSuccessNotif('blog deleted succefully'))
    } catch (error) {
      dispatch(setErrorNotif(error.response.data.error))
    }

    setTimeout(() => {
      dispatch(resetErrorNotif())
      dispatch(resetSuccessNotif())
    }, 5000)
  }


  const ascDesc=() => {
    if(sort==='Asc'){
      setSort('Des')
      dispatch(ascSort())
    }else if(sort==='Des'){
      setSort('Asc')
      dispatch(descSort())
    }

  }

  const addBlog=async (blog) => {
    try {
      dispatch(appendBlog(blog))
      dispatch(setSuccessNotif(`a new blog ${blog.title}! by ${blog.author} added`))

      blogFormRef.current.toggleDisplay()
    } catch (err) {
      dispatch(setErrorNotif(err.response.data.error))
    }
    setTimeout(() => {
      dispatch(resetErrorNotif())
      dispatch(resetSuccessNotif())
    }, 5000)
  }


  return (
    <div className="blogs">
      <div className="fontions-section">
        <div>
          <Button variant='primary' onClick={ascDesc}>{sort}</Button>
          {/* <button className='button' onClick={ascDesc}>{sort}</button> */}
        </div>
        <Wrapper
          titleBtnFirst="create"
          ref={blogFormRef}
          styling={false}
        >
          <BlogForm addBlog={addBlog} />
        </Wrapper>
      </div>
      {
        blogs.map(blog => {
          return <Blog key={blog.id}
            blog={blog}
            removeBlog={removeBlog}
          />
        })
      }
    </div>
  )
}

export default Blogs