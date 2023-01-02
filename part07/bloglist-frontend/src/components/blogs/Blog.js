import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const blogStyle={
  border:'1px solid black',
  margin:'10px 0',
  padding:'10px',
  display:'flex',
  justifyContent:'space-between',
  alignItems:'center',
  backgroundColor:'#00800042'
}


const Blog = ({ blog,removeBlog }) => {

  const user=useSelector(state => state.users)

  const remove=() => {
    return window.confirm('are you sure to delete it?')
      ?removeBlog(blog.id)
      : null
  }

  return (
    <div style={blogStyle}>
      <div>
        <Link to={`/blogs/${blog.id}`}>
          {blog.title}
        </Link>
      </div>
      { user?
        (blog.user.id===user.id || blog.user.username===user.username)
            && <button className="button" onClick={remove}>Remove</button>
        :''
      }
    </div>
  )
}

Blog.propTypes={
  removeBlog:PropTypes.func,
  user:PropTypes.object,
  blog:PropTypes.object.isRequired
}

export default Blog