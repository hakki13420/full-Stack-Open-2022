import React,{useState} from 'react'


const Title=({title})=>{
  return (
    <h1>{title}</h1>
  )
}
const Button=({text, handlClick})=>{
  return (
    <button name={text} onClick={handlClick}>{text}</button>
  )
}
const Buttons=({handlClick})=>{
  return (
    <>
      <Button text="good" handlClick={handlClick} />
      <Button text="neutral" handlClick={handlClick} />
      <Button text="bad" handlClick={handlClick} />
    </>
  )
}
const Statistics=({good,neutral,bad})=>{
  return (
    <>
      <Title title={"statistics"}/>
      {(good+neutral+bad)>0?      
        (<table>
          <tbody>
          <StatisticLine name={'good'} value={good}/>
          <StatisticLine name={'neutral'} value={neutral}/>
          <StatisticLine name={'bad'} value={bad}/>
          <StatisticLine name={'all'} value={good + neutral + bad}/>
          <StatisticLine name={'average'} value={(good  + neutral * 0 + bad * -1) / (good + neutral + bad) }/>
          <StatisticLine name={'positive'} value={ `${(good / (good + neutral + bad) * 100)} %` }/>
          </tbody>
        </table>)      
        :(<p>no feedback given</p>)
      }

    </>
  )
}

const StatisticLine=({name, value})=>{
  return (
    <tr>
      <td>{name}</td>
      <td>{value}</td>       
    </tr>
  )
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const handlClick=(e)=>{
    if(e.target.name==='good') setGood(good+1)
    if(e.target.name==='neutral') setNeutral(neutral+1)
    if(e.target.name==='bad') setBad(bad+1)
  }
  return (
    <div className="App">
      <Title title={"give feedback"} />
      <Buttons handlClick={handlClick} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

export default App;
