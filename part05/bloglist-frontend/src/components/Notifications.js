import React from 'react'

const styleSuccess={
    border:"2px solid green",
    borderRadius:'4px',
    color:"green",
    padding:"10px 30px",
    margin    :"20px 0"
  }

const Notofications = ({notifications}) => {
  return (
    <>
        {
            notifications
            ?(
              <div style={styleSuccess}>
                {
                  <div>{notifications}</div>
                }                
              </div>
            ):""
        }
    </>
  )
}

export default Notofications