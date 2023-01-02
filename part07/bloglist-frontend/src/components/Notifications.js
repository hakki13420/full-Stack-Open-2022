import React from 'react'
import { Alert } from 'react-bootstrap'

const Notofications = ({ notifications }) => {
  return (
    <>
      {
        notifications
          ?(
            <Alert variant='success' >
              {
                <div>{notifications}</div>
              }
            </Alert>
          ):''
      }
    </>
  )
}


export default Notofications