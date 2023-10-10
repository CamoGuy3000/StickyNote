// This app is the settings page where users can enter their info, and tweak general options about the extension

import React from 'react';
import { Container, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

function Options() {

  return (
    <>
    <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/icons/StickyNoteLogo_NoText.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            StickyNote
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default Options;
