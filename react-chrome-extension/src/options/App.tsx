// This app is the settings page where users can enter their info, and tweak general options about the extension

import React from 'react';
import { Container, Image } from 'react-bootstrap';

function Options() {

    return (
        <Container>
            <Image src="icons/StickyNoteLogo.png" alt="StickyNote Logo" id="logo" className="mx-auto d-block w-75" />
        </Container>
    );
}

export default Options;
