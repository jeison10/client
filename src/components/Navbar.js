import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import jwt from 'jsonwebtoken'
import userImage from '../pages/user.png'






function App (newMsg) {


    const [Image, setImage] = useState(userImage)
    const [UserName, setUserName] = useState('')
    
  
  
    async function populateImage() {
          const req = await fetch('http://localhost:3001/api/users', {
              headers: {
                  'x-access-token': localStorage.getItem('token'),
              },
          })
  
          const data = await req.json()
          if (data.status === 'ok') {
            setImage(data.idImage)
            setUserName(data.idUser)
                    
          } else {
              alert(data.error)
        //setImage(userImage)
          }
      }
  
      useEffect(() => {
          const token = localStorage.getItem('token')
          if (token) {
              const user = jwt.decode(token)
              if (!user) {
                  localStorage.removeItem('token')
                 
              } else {
                  populateImage()
              }
            }

          })
      




  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/alluser">Users</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto" > 
              <Nav.Link href="/chat">Messages <i className= {newMsg.newMsg === UserName ? "fa fa-circle offline" : ''}></i></Nav.Link>
            
    
            </Nav>
           
              <Nav>
                 <img src = {Image} class="rounded float-left" alt="" width={50} height={50}/>
                <NavDropdown title={UserName} id="collasible-nav-dropdown" >
                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item href="/login">LogOut</NavDropdown.Item>
                </NavDropdown>
              
              
              
            </Nav>
            </Navbar.Collapse>
         
        </Container>
      </Navbar>

  )
}

export default App