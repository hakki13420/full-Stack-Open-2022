import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = (event) => {
    switch(event.target.name){
    case 'good':
      return store.dispatch({
        type: 'GOOD'
      })
    case 'ok':
      return store.dispatch({
        type: 'OK'
      })
    case 'bad':
      return store.dispatch({
        type: 'BAD'
      })
    case 'reset':
      return store.dispatch({
        type: 'ZERO'
      })
    default:
      return store.dispatch({
        type: 'DO_NOTHING'
      })
    }
  }

  return (
    <div>
      <button name="good" onClick={good}>good</button>
      <button name="ok" onClick={good}>ok</button>
      <button name="bad" onClick={good}>bad</button>
      <button name="reset" onClick={good}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
