import { useState } from 'react'
import CommentForm from './CommentForm'
import CommentsList from './CommentsList'



const Comments = ({ id, comments }) => {
  const [commentsDisplay, setCommentsDisplay]=useState(true)
  const addComment=() => {
    setCommentsDisplay(false)
  }

  const showComments=() => {
    setCommentsDisplay(true)
  }
  return (
    <>
      <h2>Comments</h2>
      <hr className='m-b-10'/>
      <div className='comments-btns m-b-10'>
        <button className='button m-r-10' onClick={showComments}>show Comments</button>
        <button className='button m-r-10' onClick={addComment}>Add Comment</button>
      </div>
      {!commentsDisplay && <CommentForm id={id} setCommentsDisplay={setCommentsDisplay}/>}
      {commentsDisplay && <CommentsList comments={comments}/> }

    </>
  )
}

export default Comments