export default function CommentsList({ comments }) {
  return (
    <ul className='ml-3'>
      {comments &&
        comments.map((comment,i) => {
          return <li key={i}>{comment}</li>
        })}
    </ul>
  )
}
