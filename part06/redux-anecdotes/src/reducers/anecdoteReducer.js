import { createSlice, current } from '@reduxjs/toolkit'
import { addAnecdotes, getAll, upVote } from '../services/anecdotes'


//const dispatch=useDispatch()
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const initialState = anecdotesAtStart.map(asObject)


const anecdoteSlice=createSlice({
  name:'anecdotes',
  initialState:[],
  reducers:{
    addVote:(state, action) => {
      console.log('anecdotes reducer',current(state))
      //const itemToUpdate=state.find(el => el.id===action.payload.id)
      //const updatedItem={ ...itemToUpdate,votes:itemToUpdate.votes+1 }

      return [...state.map(el => el.id===action.payload.id?action.payload:el)]

    },
    newAnecdote:(state,action) => {
      return [...state,action.payload]
    },
    createAnecdote:(state, action) => {
      return [...state,{
        id:getId(),
        content:action.payload,
        votes:0
      }]
    },
    setAnecdotes:(state,action) => {
      return action.payload
    }

  }
})

export const initializeData=() => {
  return async (dispatch) => {
    const anecdotes=await getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const appendAnecdote=(anecdote) => {
  return async (dispatch) => {
    const createdAnecdote=await addAnecdotes(anecdote)
    dispatch(newAnecdote(createdAnecdote))
  }
}

export const increaseVote=(anecdote) => {
  return async(dispatch) => {
    const updatedAnecdote=await upVote(anecdote)
    dispatch(addVote(updatedAnecdote))
  }
}


export const { addVote, createAnecdote, newAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
