import React from 'react';
import { Nav, Navbar as Nb } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
  return (
    <Nb expand="lg" variant="dark" bg="primary" className="navbar">
      <Nb.Brand href="#home">GradeAid</Nb.Brand>
      <Nb.Toggle aria-controls="basic-navbar-nav" />
      <Nb.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} exact to="/courses">
            Browse Courses
          </Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          <Nav.Link as={NavLink} exact to="/register">
            Register
          </Nav.Link>
          <Nav.Link as={NavLink} exact to="/login">
            Log In
          </Nav.Link>
        </Nav>
      </Nb.Collapse>
    </Nb>
  );
};

export default Navbar;
