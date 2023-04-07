import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
const NavbarDash = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="#features">Home</Nav.Link>
            <Nav.Link href="#Transactions">Transactions</Nav.Link>
            <Nav.Link href="#About">About Us</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarDash;
