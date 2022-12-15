import React from 'react'

const styleError={
  border:"2px solid red",
  borderRadius:'4px',
  color:"red",
  padding:"10px 30px",
  margin    :"20px 0"
}

const Errors = ({errors}) => {
  return (
    <>
        {
            errors.length
            ?(
              <div className='error' style={styleError}>
                {
                  errors.map((error,index)=><div key ={index}>{error}</div>)
                }                
              </div>
            ):""
        }
    </>
  )
}

export default Errors