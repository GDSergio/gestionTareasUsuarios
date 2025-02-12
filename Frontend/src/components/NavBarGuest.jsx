// src/components/Navbar.jsx
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const NavigationBar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">Gestion de tareas por usuario</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/login">Iniciar sesion</Nav.Link>
          <Nav.Link as={Link} to="/register">Registrarme</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
