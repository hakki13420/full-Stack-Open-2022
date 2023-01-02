import { useState } from 'react'
import { Form } from 'react-bootstrap'
import { Button } from 'react-bootstrap'

const BlogForm = ({ addBlog }) => {
  const [blog,setBlog]=useState({
    title:'',
    author:'',
    url:''
  })


  const handelChange=(e) => {
    const { name, value }=e.target

    setBlog({ ...blog,[name]:value })
  }

  const createBlog=async (e) => {
    e.preventDefault()
    addBlog(blog)
  }


  return (
    <div>
      <h2>Create New Blog</h2>
      <Form onSubmit={createBlog} className='mb-3'>
        <Form.Group>
          <Form.Label>title</Form.Label>
          <Form.Control type="text" name="title" value={blog.title} onChange={handelChange}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Author</Form.Label>
          <Form.Control type="text" name="author" value={blog.author} onChange={handelChange}/>
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>url</Form.Label>
          <Form.Control type="text" name="url" value={blog.url} onChange={handelChange}/>
        </Form.Group>
        <Button variant='primary' type="submit">create</Button>
      </Form>
    </div>

  )
}

export default BlogForm