import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavbarElement() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="../">  
            <strong>IoTeacher</strong>  
          </Navbar.Brand>

          <Nav className="collapse navbar-collapse justify-content-end">
            <Nav.Link href="../login">Login</Nav.Link>
            <Nav.Link href="../register">Reigster</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
    </>
  );
}

export default NavbarElement;