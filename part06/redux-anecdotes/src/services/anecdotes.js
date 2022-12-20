import axios from 'axios'

const baseUrl='http://localhost:3001/anecdotes'
export const getAll=async () => {
  const anecdotes=await axios.get(baseUrl)
  return anecdotes.data
}

export const addAnecdotes=async (anecdote) => {
  const response=await axios.post(baseUrl,anecdote)

  return response.data
}

export const upVote=async(anecdote) => {
  const updateRecord={
    ...anecdote,
    votes:anecdote.votes+1
  }
  const response=await axios.put(
    baseUrl+`/${anecdote.id}`,
    updateRecord
  )
  return response.data
}
