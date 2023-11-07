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
// rectangle.style.position = "absolute";
// rectangle.style.position = "relative";
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



// console.log(rectangle.classList)


//* Adding text box to note
// //<input type="text" id="Name" name="Name">
// //<input type="text" value="asdf" readonly="true" ondblclick="this.readOnly='';">
// let textbox = document.createElement("input")
// textbox.type = 'text'
// textbox.id = 'textbox'
// textbox.readOnly = true
// // textbox.setAttribute('ondblclick', 'this.readOnly=\'\'')
// // textbox.textContent = 'testing123'
// textbox.placeholder = 'testing123'
// textbox.style.color = '#000000'

// rectangle.appendChild(textbox)
// let editing_text : boolean = false

document.body.appendChild(rectangle);


// rectangle.addEventListener("dblclick", e => {
//   if(editing_text)
//     rectangle.style.backgroundColor = editing_color
//   else
//     rectangle.style.backgroundColor = normal_color
//   // textbox.readOnly = editing_text
//   // editing_text = !editing_text
// })

// rectangle.addEventListener("mouseover", e => {
//   console.log("want to hover")
//   console.log()
// })

// rectangle.addEventListener("mousedown", e => {

//   rectangle.style.zIndex = MOVE_Z_INDEX
//   let height = parseInt(rectangle.style.height)
//   let width = parseInt(rectangle.style.width)

//   let top = parseInt(rectangle.style.top)
//   let left = parseInt(rectangle.style.left)

//   let clicked_y = e.pageY - top
//   let clicked_x = e.pageX - left

//   // console.log(clicked_x + ', ' + clicked_y)
//   // console.log(height + ', ' + width)

//   let resize_x = clicked_x > (width - 20)
//   let resize_y = clicked_y > (height - 20)
//   let pin = (clicked_x < 20) && (clicked_y < 20)

//   console.log(resize_x + ", " + resize_y)
  
//   // console.log(pin)
//   let style_pos = rectangle.style.position
//   switch(true){
//     // case pin && style_pos == 'fixed':
//     //   rectangle.style.position = "absolute"; break
//     // case pin && style_pos == 'absolute':
//     //   rectangle.style.position = "fixed"; break
//     case resize_x && !resize_y:
//       rectangle.setAttribute('stickynote_resizing', 'horizontal'); break
//     case !resize_x && resize_y:
//       rectangle.setAttribute('stickynote_resizing', 'vertical'); break
//     case resize_x && resize_y:
//       rectangle.setAttribute('stickynote_resizing', 'diagonal'); break
//     case !resize_x && !resize_y:
//       rectangle.setAttribute('stickynote_dragging', 'true'); break
//   }
  
// });

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
  switch(rectangle.style.position){
    case "fixed": // Is floating, make pinned
      rectangle.style.position = "absolute"
      pin.style.backgroundColor = "rgba(0,0,0, 0.4)"
      break
      case "absolute": // Is pinned, make float
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
  console.log(e.clientX + " " + e.clientY)
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
    // console.log(e.pageY + ' ' + e.y + " " + e.clientY + " " + e.screenY)
    if(height < MIN_HEIGHT)
      height = MIN_HEIGHT
    if(width < MIN_WIDTH)
      width = MIN_WIDTH
    console.log(height + ' ' + width)

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

// document.addEventListener("click", () => {
//   console.log("click")
// })

// window.addEventListener('keypress',function(key){
//   console.log(key.key)
//   let keyvalue = key.key
//   chrome.runtime.sendMessage(null,keyvalue,(response)=>{
//   console.log("Sent key value"+response)
//     })
// })



export { }
