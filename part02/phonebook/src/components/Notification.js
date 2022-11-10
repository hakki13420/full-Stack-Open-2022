import React from 'react'

export default function Notification({message, error}) {    
    if(!message && !error){
        return null
    }
  return (
    <>
      {
        error
          ?(<div className='error'>
              {error}
            </div>
            )
          :""
      }
      {
        message
          ?(<div className='notification'>
              {message}
            </div>
            )
          :""
      }      
    </>
  )
}
