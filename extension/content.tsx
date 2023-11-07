import { hover } from "@testing-library/user-event/dist/types/setup/directApi"
import { getEventListeners } from "events"

let rect_counter = 0
let rect_list = [ ]

// TODO send rect counter to the content file to set the rect name correctly,
// TODO send the rectangle itself back to the popup to store it in a list

// TODO turn constant values into constant variables
// TODO maybe combine stickynote_resizing with stickynote_dragging (just have the text be what action is happening)

// TODO Turn the background color so it can be changed programatically

//*Feature todos
//-make page not scrollable when resizing
//-make note only move from the top bar and don't ever relocate the mouse to the top of the note
//-look into getting rid of scrolling

// https://stackoverflow.com/questions/17567624/pass-a-parameter-to-a-content-script-injected-using-chrome-tabs-executescript



const MIN_HEIGHT = 50
const MIN_WIDTH = 50
const Z_INDEX = '1000'
const MOVE_Z_INDEX = '1001'
let bar_size = "10px"
let normal_color = "rgba(204,230,255, 0.7)"
let editing_color = "rgba(204,255,255, 0.7)"


console.log("Content script started")

const rectangle = document.createElement("div");

//* Creating basic note
// rectangle.id = rect_list.length.toString()
rectangle.id = rect_counter.toString()
rectangle.setAttribute('stickynote_dragging', 'false')
rectangle.setAttribute('stickynote_resizing', 'false')
rectangle.style.position = "fixed";
rectangle.style.backgroundColor = normal_color;
rectangle.style.border = "3px solid black";
// rectangle.style.borderRadius = '5%'
//"Bring back when I redisign resizing (needs to not break if the mouse is off of the stickynote)
rectangle.style.top = '200px';
rectangle.style.height = '100px';
rectangle.style.left = '200px';
rectangle.style.width = '100px';
rectangle.style.zIndex = Z_INDEX

//* Adding bars to the note
const top_bar = document.createElement("div")
top_bar.id = rectangle.id + "_barT"
top_bar.style.position = "absolute";
top_bar.style.top = "0px"
top_bar.style.left = bar_size
top_bar.style.height = bar_size
top_bar.style.width = (parseInt(rectangle.style.width) - 2*parseInt(bar_size)).toString() + "px"
top_bar.style.backgroundColor = "rgba(204,230,255, 0.4)"

const resize_bar_x = document.createElement("div")
resize_bar_x.id = rectangle.id + "_barX"
resize_bar_x.style.position = "absolute";
resize_bar_x.style.top = "0px"
resize_bar_x.style.left = (parseInt(rectangle.style.width) - parseInt(bar_size)).toString() + "px"
resize_bar_x.style.height = (parseInt(rectangle.style.height) - parseInt(bar_size)).toString() + "px"
resize_bar_x.style.width = bar_size
resize_bar_x.style.backgroundColor = "rgba(204,230,255, 0.4)"

const resize_bar_y = document.createElement("div")
resize_bar_y.id = rectangle.id + "_barY"
resize_bar_y.style.position = "absolute";
resize_bar_y.style.top = (parseInt(rectangle.style.height) - parseInt(bar_size)).toString() + "px"
resize_bar_y.style.left = "0px"
resize_bar_y.style.height = bar_size
resize_bar_y.style.width = (parseInt(rectangle.style.width) - parseInt(bar_size)).toString() + "px"
resize_bar_y.style.backgroundColor = "rgba(204,230,255, 0.4)"

const resize_bar_xy = document.createElement("div")
resize_bar_xy.id = rectangle.id + "_barXY"
resize_bar_xy.style.position = "absolute";
resize_bar_xy.style.top = (parseInt(rectangle.style.height) - parseInt(bar_size)).toString() + "px"
resize_bar_xy.style.left = (parseInt(rectangle.style.width) - parseInt(bar_size)).toString() + "px"
resize_bar_xy.style.height = bar_size
resize_bar_xy.style.width = bar_size
resize_bar_xy.style.backgroundColor = "rgba(204,230,255, 0.4)"

const pin = document.createElement("div")
pin.id = rectangle.id + "_pin"
pin.style.position = "absolute";
pin.style.top = "0px"
pin.style.left = "0px"
pin.style.height = bar_size
pin.style.width = bar_size
pin.style.backgroundColor = "rgba(255,255,255, 0.4)"


rectangle.appendChild(top_bar)
rectangle.appendChild(resize_bar_x)
rectangle.appendChild(resize_bar_y)
rectangle.appendChild(resize_bar_xy)
rectangle.appendChild(pin)

document.body.appendChild(rectangle);


top_bar.addEventListener("mousedown", e => {
  rectangle.setAttribute('stickynote_dragging', 'true')
})
resize_bar_x.addEventListener("mousedown", e => {
  rectangle.setAttribute('stickynote_resizing', 'horizontal')
})
resize_bar_y.addEventListener("mousedown", e => {
  rectangle.setAttribute('stickynote_resizing', 'vertical')
})
resize_bar_xy.addEventListener("mousedown", e => {
  rectangle.setAttribute('stickynote_resizing', 'diagonal')
})
pin.addEventListener("mousedown", e => {
  let doc_bound = document.body.getBoundingClientRect()
  let rect_bound = rectangle.getBoundingClientRect()
  switch(rectangle.style.position){
    case "fixed": // Is floating, make pinned
      rectangle.style.top = rect_bound.y - doc_bound.y + "px"
      rectangle.style.left = rect_bound.x - doc_bound.x + "px"
      rectangle.style.position = "absolute"
      pin.style.backgroundColor = "rgba(0,0,0, 0.4)"
      break
    case "absolute": // Is pinned, make float
      rectangle.style.top = rect_bound.y + "px"
      rectangle.style.left = rect_bound.x + "px"  

      rectangle.style.position = "fixed"
      pin.style.backgroundColor = "rgba(255,255,255, 0.4)"
    break
  }
})

rectangle.addEventListener("mouseup", e => {
  rectangle.style.zIndex = Z_INDEX
  rectangle.setAttribute('stickynote_dragging', 'false')
  rectangle.setAttribute('stickynote_resizing', 'false')
});

document.addEventListener("mouseup", e => {
  if(rectangle.getAttribute('stickynote_resizing') != 'false'){
    rectangle.style.zIndex = Z_INDEX
    rectangle.setAttribute('stickynote_resizing', 'false')
  }
  if(rectangle.getAttribute('stickynote_dragging') != 'false'){
    rectangle.style.zIndex = Z_INDEX
    rectangle.setAttribute('stickynote_dragging', 'false')
  }
});

document.addEventListener("mousemove", e => { 
  // console.log(e.clientX + " " + e.clientY)
  // TODO make this not add everytime we create a note, but only the first time on the document
  if(rectangle.getAttribute('stickynote_dragging') == 'true'){
    window.getSelection()?.removeAllRanges()
    let dx = e.movementX
    let dy = e.movementY
    let prev_top = parseInt(rectangle.style.top)
    let prev_left = parseInt(rectangle.style.left)
    let top = prev_top + dy
    let left = prev_left + dx
    rectangle.style.top = top + "px"
    rectangle.style.left = left + "px"
  }
  else if(rectangle.getAttribute('stickynote_resizing') != 'false'){
    window.getSelection()?.removeAllRanges()

    let resize_type = rectangle.getAttribute('stickynote_resizing')
    // console.log(resize_type)

    let height = e.clientY - parseInt(rectangle.style.top)
    let width = e.clientX - parseInt(rectangle.style.left)

    if(height < MIN_HEIGHT)
      height = MIN_HEIGHT
    if(width < MIN_WIDTH)
      width = MIN_WIDTH

    switch(resize_type){
      case 'horizontal':
        rectangle.style.width = width + "px"
        top_bar.style.width = (parseInt(rectangle.style.width) - 2*parseInt(bar_size)).toString() + "px"
        resize_bar_x.style.left = (parseInt(rectangle.style.width) - parseInt(bar_size)).toString() + "px"
        resize_bar_y.style.width = (parseInt(rectangle.style.width) - parseInt(bar_size)).toString() + "px"
        resize_bar_xy.style.top = (parseInt(rectangle.style.height) - parseInt(bar_size)).toString() + "px"
        resize_bar_xy.style.left = (parseInt(rectangle.style.width) - parseInt(bar_size)).toString() + "px"
        break
      case 'vertical':
        rectangle.style.height = height + "px"
        resize_bar_x.style.height = (parseInt(rectangle.style.height) - parseInt(bar_size)).toString() + "px"
        resize_bar_y.style.top = (parseInt(rectangle.style.height) - parseInt(bar_size)).toString() + "px"
        resize_bar_xy.style.top = (parseInt(rectangle.style.height) - parseInt(bar_size)).toString() + "px"
        resize_bar_xy.style.left = (parseInt(rectangle.style.width) - parseInt(bar_size)).toString() + "px"
        break
      case 'diagonal':
        rectangle.style.height = height + "px"
        rectangle.style.width = width + "px"
        top_bar.style.width = (parseInt(rectangle.style.width) - 2*parseInt(bar_size)).toString() + "px"
        resize_bar_x.style.left = (parseInt(rectangle.style.width) - parseInt(bar_size)).toString() + "px"
        resize_bar_x.style.height = (parseInt(rectangle.style.height) - parseInt(bar_size)).toString() + "px"
        resize_bar_y.style.top = (parseInt(rectangle.style.height) - parseInt(bar_size)).toString() + "px"
        resize_bar_y.style.width = (parseInt(rectangle.style.width) - parseInt(bar_size)).toString() + "px"
        resize_bar_xy.style.top = (parseInt(rectangle.style.height) - parseInt(bar_size)).toString() + "px"
        resize_bar_xy.style.left = (parseInt(rectangle.style.width) - parseInt(bar_size)).toString() + "px"
        break
    }
  }
});



export { }
