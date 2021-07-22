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
    </Container>
  </Navbar>
        </div>
    )
}

export default Topbar
