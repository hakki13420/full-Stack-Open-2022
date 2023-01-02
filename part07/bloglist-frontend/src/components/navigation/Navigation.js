import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './navigation.css'
import { Navbar, Nav, Container } from 'react-bootstrap'

import { doLogin } from '../../reducers/userReducer'
import { Link } from 'react-router-dom'

export default function Navigation() {

  const user=useSelector(state => state.users)
  const dispatch=useDispatch()

  const logout=() => {
    window.localStorage.removeItem('user')
    dispatch(doLogin({}))
  }

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto ">
              <Link className="nav-link" to='/users'>users</Link>
              <Link className="nav-link" to='/blogs'>blogs</Link>
            </Nav>
            {Object.keys(user).length
              ?<div className='d-flex justify-content-between align-items-center p-1'>
                <span>{`${user.name} logged in`}</span>
                <button className="ms-1 button" onClick={logout}>logout</button>
              </div>
              :''
            }
          </Navbar.Collapse>
        </Container>

      </Navbar>
    </div>
  )
}
