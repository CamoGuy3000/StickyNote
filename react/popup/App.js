import React from 'react';
import { Container, Image, Button } from 'react-bootstrap';



function Popup() {
  return (
    <Container className="text-center m-1">
      <Image src="icons/StickyNoteLogo.png" alt="StickyNoteLogo" id="logo" className="mx-auto d-block w-75" />
      <Button variant="primary" className="w-100 mb-3" id="autofill" >Settings Page</Button>
    </Container>
  );
}

export default Popup;