import PropTypes from 'prop-types'

const Blog = ({ blog,removeBlog,addLike, user }) => {


  const remove=() => {
    return window.confirm('are you sure to delete it?')
      ?removeBlog(blog.id)
      : null
  }

  return (
    <>
      <div>
        {blog.title}
      </div>
      <div className='url'>
        {blog.url}
      </div>
      <div className='likes'>
        likes:
        <span className='nbLikes'>{blog.likes}</span>
        <button className='likeBtn' onClick={() => addLike(blog)}>like</button>
      </div>
      <div>
        {blog.author}
      </div>
      { user?
        blog.user.username===user.username && <button className="removeBtn" onClick={remove}>Remove</button>
        :''
      }
    </>
  )
}

Blog.propTypes={
  addLike:PropTypes.func.isRequired,
  removeBlog:PropTypes.func,
  user:PropTypes.object,
  blog:PropTypes.object.isRequired
}

export default Blog