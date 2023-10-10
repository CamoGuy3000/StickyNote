// This app is the popup window that has buttons for the user to triger actions, and links to the options page

import React from 'react';
import { Container, Image, Button } from 'react-bootstrap';

let clickSettings = () => {
  // We need to use the chrome api to open the settings page, https://developer.chrome.com/docs/extensions/reference/
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  }
}
let clickNotes = () => {
  // We need to use the chrome api to open the settings page, https://developer.chrome.com/docs/extensions/reference/
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  }
}

function StickyNotePopup() {
  return (
      <Container className="text-center m-1">
        <Image src="icons/StickyNoteLogo.png" alt="StickyNote Logo" id="logo" className="mx-auto d-block w-75" />
        <Button variant="secondary" className="w-100 mb-3" id="notes" onClick={clickNotes}>Created Notes</Button>
        <Button variant="secondary" className="w-100 mb-3" id="settings" onClick={clickSettings}>Settings</Button>

      </Container>
    
  );
}

export default StickyNotePopup;
