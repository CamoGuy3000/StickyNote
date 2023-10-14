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

  const rectangle = document.createElement("div");
  rectangle.id = rect_list.length.toString()
  rectangle.setAttribute('stickynote_dragging', 'false')
  // rectangle.style.position = "absolute";
  // rectangle.style.position = "relative";
  rectangle.style.position = "fixed";
  rectangle.style.backgroundColor = "rgba(204,230,255, 0.7)";
  rectangle.style.border = "1px solid black";
  rectangle.style.top = '200px';
  rectangle.style.height = '100px';
  rectangle.style.left = '200px';
  rectangle.style.width = '100px';
  
  document.body.appendChild(rectangle);
  rect_list.push(rectangle);
  

  rectangle.addEventListener("mousedown", e => {
    rectangle.style.zIndex = '2'
    rectangle.setAttribute('stickynote_dragging', 'true')
  });

  rectangle.addEventListener("mouseup", e => {
    rectangle.style.zIndex = 'auto'
    rectangle.setAttribute('stickynote_dragging', 'false')
  });

  rectangle.addEventListener("mousemove", e => {
    if(rectangle.getAttribute('stickynote_dragging') == 'true'){
      
      let x = e.pageX
      let y = e.pageY

      const top = y - 50 // should be y - (height of note)
      const left = x - 50 // should be x - (width of note)

      rectangle.style.top = top + "px";
      rectangle.style.left = left + "px";
    }
  });
  


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
