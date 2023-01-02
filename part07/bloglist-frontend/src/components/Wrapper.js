import PropTypes from 'prop-types'
import { forwardRef, useImperativeHandle, useState } from 'react'
//import LoginForm from './LoginForm'


const Wrapper = forwardRef(({ children, title='', titleBtnFirst, titleBtnSecond='cancel',styling }, ref) => {
  const [display, setDisplay]=useState(false)
  const blogStyle=styling?{
    border:'1px solid black',
    margin:'10px 0',
    padding:'10px'
  }:{}

  const toggleDisplay=() => {
    console.log(display)
    setDisplay(display => !display)
  }

  useImperativeHandle(ref,() => {
    return { toggleDisplay }
  })

  return (
    <div className="wrapper" style={blogStyle}>
      {!display?<span>{title}</span>:''}
      {!display?<button className='button' onClick={toggleDisplay}>{titleBtnFirst}</button>:''}
      {display?children:''}
      {display?<button className='button' onClick={() => setDisplay(false)}>{titleBtnSecond}</button>:''}
    </div>
  )
})

Wrapper.displayName='Wrapper'

Wrapper.propTypes={
  titleBtnFirst:PropTypes.string.isRequired,
  titleBtnSecond:PropTypes.string
}


export default (Wrapper)
