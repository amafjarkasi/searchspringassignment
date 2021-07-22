import React from 'react'
import {
    Navbar,
    Container,
  } from "react-bootstrap";
function Topbar() {
    return (
        <div>
             <Navbar style={{backgroundColor: '#3a23ad'}} variant="dark">
    <Container>
    <Navbar.Brand>searchspring</Navbar.Brand>
    {/* <Nav className="me-auto">
      <Nav.Link href="#home">Home</Nav.Link>
    </Nav> */}
    </Container>
  </Navbar>
        </div>
    )
}

export default Topbar
