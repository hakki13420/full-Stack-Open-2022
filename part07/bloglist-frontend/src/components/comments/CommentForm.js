import { useDispatch } from 'react-redux'
import { commentingBlog } from '../../reducers/blogReducer'

export default function CommentForm({ id, setCommentsDisplay }) {
  const dispatch=useDispatch()

  const submitComment=(event) => {
    event.preventDefault()
    const comment=event.target.comment.value
    dispatch(commentingBlog(id,  comment ))
    event.target.comment.value=''
    setCommentsDisplay(true)
  }
  return (
    <div>
      <form onSubmit={submitComment}>
        comment :<input type="text" name="comment" />
      </form>
    </div>
  )
}
