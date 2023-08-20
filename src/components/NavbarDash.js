import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import DateTime from "./DateTime";
import { useNavigate } from "react-router-dom";

const NavbarDash = () => {
  const navigate = useNavigate();

  const handleOnclickHome = () => {
    navigate("/dashboard");
  };

  const handleOnclickAboutUs = () => {
    navigate("/about");
  };

  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      {" "}
      {/* Add fixed="top" to keep the navbar fixed at the top */}
      <Container>
        <Nav className="me-auto">
          <Nav.Link onClick={handleOnclickHome}>Home</Nav.Link>
          {/* <Nav.Link onClick={handleOnclickTransactions}>
            Transactions
          </Nav.Link> */}
          <Nav.Link onClick={handleOnclickAboutUs}>About</Nav.Link>
        </Nav>
        <Nav className="text-light">
          <DateTime />
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarDash;

// Your map and popup components here
