import { connect } from 'react-redux'
import { appendAnecdote } from '../reducers/anecdoteReducer'
import { putMessage } from '../reducers/notificationReducer'
//import { addAnecdotes } from '../services/anecdotes'


function AnecdoteForm(props) {

  const createAnecdote=(event) => {
    event.preventDefault()
    props.appendAnecdote({
      content:event.target.name.value,votes:0
    })
    event.target.name.value=''
    props.putMessage({ message:'anecdote create',time:10000 })
  }

  return (
    <>
      {console.log('render anecdote form')}
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div><input type="text" name="name" /></div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

const mapDispatchToProps={
  putMessage,
  appendAnecdote
}

const connectAnecdoteForm=connect(null, mapDispatchToProps)(AnecdoteForm)

export default connectAnecdoteForm