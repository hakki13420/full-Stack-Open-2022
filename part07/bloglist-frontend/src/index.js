import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'
import { BrowserRouter } from 'react-router-dom'
import './index.css'


const store=configureStore({
  reducer:{
    blogs:blogReducer,
    users:userReducer,
    notifications:notificationReducer
  }
})

ReactDOM.createRoot(document.getElementById('root'))
  .render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  )
