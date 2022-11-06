import React,{useState} from 'react'

const Button=({name,text,handlClick})=>{
  return (
    <button onClick={handlClick} name={name}>{text}</button>
  )
}
const Buttons=({handlClick})=>{
  return (
    <div>
      <Button name={'vote'} text={'vote'} handlClick={handlClick} />
      <Button name={'next'} text={'next anecdotes'} handlClick={handlClick} />
    </div>
  )
}

const Anecdote=({title,anecdote, votes})=>{
  return (
    <>
      <h1>{title}</h1>
      {anecdote}
      <div>
        {`has ${votes} vote`}{votes>1?"s":""}
      </div>
    </>
  )
}

function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]   
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))
  console.log('point   ',points)
  
  const [selected, setSelected] = useState(0)  
  const max=Math.max(...points);
  const indexMax=points.indexOf(max)

  const getRandomIndex=()=>{        
    return Math.floor(Math.random()*anecdotes.length);    
  }
  const handlClick=(e)=>{
    if(e.target.name==="next"){
      const index=getRandomIndex()
      console.log(index);
      setSelected(index)
    }
    if(e.target.name==="vote"){
      const updatedPoints=[...points]
      updatedPoints[selected]++
      setPoints(updatedPoints)
    }
  }
  return (
    <div>      
      <Anecdote title={'Anecdote of the day'} anecdote={anecdotes[selected]} votes={points[selected]}/>      
      <Buttons handlClick={handlClick} />      
        {
         max===0
            ?"" 
            : <Anecdote title={'Anecdote with most votes'} anecdote={anecdotes[indexMax]} votes={points[indexMax]}/>                  
        }      
    </div>
  );
}

export default App;
