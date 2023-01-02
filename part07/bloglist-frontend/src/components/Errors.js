import React from 'react'
import { useSelector } from 'react-redux'

const styleError={
  border:'2px solid red',
  borderRadius:'4px',
  color:'red',
  padding:'10px 30px',
  margin    :'20px 0'
}

const Errors = () => {
  const errors=useSelector(state => state.notifications.errors)
  return (
    <>
      {
        errors.length
          ?(
            <div className='error' style={styleError}>
              {
                errors.map((error,index) => <div key ={index}>{error}</div>)
              }
            </div>
          ):''
      }
    </>
  )
}

export default Errors