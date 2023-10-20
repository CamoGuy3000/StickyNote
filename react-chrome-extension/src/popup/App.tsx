// This app is the popup window that has buttons for the user to triger actions, and links to the options page

import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client'
import { render } from 'react-dom'
import { Container, Image, Button } from 'react-bootstrap';
import note from './Note'

let rect_counter = 0
let rect_list = [ ]

let clickSettings = () => {
  // We need to use the chrome api to open the settings page, https://developer.chrome.com/docs/extensions/reference/
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  }
}


let createNote = () => {

  // chrome.runtime.sendMessage({message: "create note"})


  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentTab = tabs[0];

    // inject content.js file into the page.
    if (!currentTab.url?.includes('chrome://')) {
      if (currentTab?.id) {
        chrome.scripting.executeScript({
          target: { tabId: currentTab.id },
          files: ['built/content.js'],
        })
      }
    }

  })

}

function StickyNotePopup() {
  return (
      <Container className="text-center m-1">
        <Image src="icons/StickyNoteLogo.png" alt="StickyNote Logo" id="logo" className="mx-auto d-block w-75" />
        <Button variant="secondary" className="w-100 mb-3" id="notes" onClick={createNote}>Create Note</Button>
        <Button variant="secondary" className="w-100 mb-3" id="settings" onClick={clickSettings}>Settings</Button>

      </Container>
    
  );
}

export default StickyNotePopup;
