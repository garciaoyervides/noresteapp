import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import LogoutButton from './LogoutButton.component.js';

function MenuBar (){

  return (
    <Navbar bg="light" expand="lg">
        <Navbar.Brand href="">Noreste App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link href="receipts" onClick =''>Recibos</Nav.Link>
            <Nav.Link href="customers" onClick =''>Alumnos</Nav.Link>
            <Nav.Link href="reports" onClick =''>Reportes</Nav.Link>
            <LogoutButton/>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}

export default MenuBar;