import './blog.css'
import { useDispatch } from 'react-redux'
import { updateBlog } from '../../reducers/blogReducer'
import Comments from '../comments/Comments'

export default function BlogEdit({ blog }) {
  const dispatch=useDispatch()
  const addLike=(blog) => {
    dispatch(updateBlog({ id:blog.id,blog:{ ...blog,likes:blog.likes+1 } }))
  }
  return (
    <>
      {
        blog && (
          <div className='blog'>
            <h1 className='title'>{blog.title}</h1>
            <div className='body'>
              <a href={blog.url}>{blog.url}</a> <br />
              <div className="blog-footer">
                <p><em>added by {blog.author}</em></p>
                <div className="likes">
                  <span>{blog.likes} like{blog.likes>1?'s':''}</span>
                  <button className='button' onClick={() => addLike(blog)}>like</button>
                </div>
              </div>

              <Comments id={blog.id} comments={blog.comments} />
            </div>
          </div>
        )
      }
    </>
  )
}
