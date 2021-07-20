import React from 'react'
import {
    Navbar,
    Nav,
    Container,
  } from "react-bootstrap";
function Topbar() {
    return (
        <div>
             <Navbar bg="light" variant="light">
    <Container>
    <Navbar.Brand href="#home">searchspring</Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
    </Nav>
    </Container>
  </Navbar>
        </div>
    )
}

export default Topbar
