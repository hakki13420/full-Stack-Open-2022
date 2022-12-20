import { useSelector } from 'react-redux'
import Anecdote from './Anecdote'


export default function AnecdoteList() {
  const filter=useSelector(({ filter }) => filter.filter)
  const anecdotesData=
  filter!==''
    ?(
      useSelector(({ anecdotes }) => {
        return  anecdotes
          .filter(item => item.content.includes(filter))
          .sort((a,b) => b.votes-a.votes)
      })
    ):(
      useSelector(({ anecdotes }) => {
        return  anecdotes.slice().sort((a,b) => b.votes-a.votes)
      })
    )


  return (
    <>
      {anecdotesData.map(anecdote =>
        <Anecdote key={anecdote.id} anecdote={anecdote}/>
      )}
    </>
  )
}
