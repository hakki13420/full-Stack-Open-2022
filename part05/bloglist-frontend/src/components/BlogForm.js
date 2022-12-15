import { useState } from 'react'

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
      <form onSubmit={createBlog}>
        <div>
            title
          <input type="text" name="title" value={blog.title} onChange={handelChange}/>
        </div>
        <div>
            Author
          <input type="text" name="author" value={blog.author} onChange={handelChange}/>
        </div>
        <div>
            url
          <input type="text" name="url" value={blog.url} onChange={handelChange}/>
        </div>
        <button type="submit">create</button>
      </form>
    </div>

  )
}

export default BlogForm