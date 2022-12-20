import { useDispatch } from 'react-redux'
import { increaseVote } from '../reducers/anecdoteReducer'
import { putMessage } from '../reducers/notificationReducer'



export default function Anecdote({ anecdote }) {
  const dispatch=useDispatch()

  const vote = async(anec) => {
    dispatch(increaseVote(anec))
    dispatch(putMessage({ message:`you voted '${anecdote.content}'`,time:6000 }))
  }

  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
            has {anecdote.votes}
        <button onClick={() => vote(anecdote)}>vote</button>
      </div>
    </div>

  )
}
