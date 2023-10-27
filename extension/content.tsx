
let rect_counter = 0
let rect_list = [ ]

// TODO send rect counter to the content file to set the rect name correctly,
// TODO send the rectangle itself back to the popup to store it in a list

// TODO turn constant values into constant variables
// TODO maybe combine stickynote_resizing with stickynote_dragging (just have the text be what action is happening)

//*Feature todos
//-make page not scrollable when resizing
//-make note only move from the top bar and don't ever relocate the mouse to the top of the note
//-look into getting rid of scrolling


console.log("Content script started")

const rectangle = document.createElement("div");
// rectangle.id = rect_list.length.toString()
rectangle.id = rect_counter.toString()
rectangle.setAttribute('stickynote_dragging', 'false')
rectangle.setAttribute('stickynote_resizing', 'false')
// rectangle.style.position = "absolute";
// rectangle.style.position = "relative";
rectangle.style.position = "fixed";
rectangle.style.backgroundColor = "rgba(204,230,255, 0.7)";
rectangle.style.border = "3px solid black";
// rectangle.style.borderRadius = '5%'
  //"Bring back when I redisign resizing (needs to not break if the mouse is off of the stickynote)
rectangle.style.top = '200px';
rectangle.style.height = '100px';
rectangle.style.left = '200px';
rectangle.style.width = '100px';

document.body.appendChild(rectangle);
rect_counter++
// rect_list.push(rectangle);


rectangle.addEventListener("mousedown", e => {
  let height = parseInt(rectangle.style.height)
  let width = parseInt(rectangle.style.width)

  let clicked_y = e.pageY - parseInt(rectangle.style.top)
  let clicked_x = e.pageX - parseInt(rectangle.style.left)

  // console.log(clicked_x + ', ' + clicked_y)
  // console.log(height + ', ' + width)

  let resize_x = clicked_x > (width - 20)
  let resize_y = clicked_y > (height - 20)
  switch(true){
    case resize_x && !resize_y:
      rectangle.setAttribute('stickynote_resizing', 'horizontal'); break
    case !resize_x && resize_y:
      rectangle.setAttribute('stickynote_resizing', 'vertical'); break
    case resize_x && resize_y:
      rectangle.setAttribute('stickynote_resizing', 'diagonal'); break
    case !resize_x && !resize_y:
      rectangle.setAttribute('stickynote_dragging', 'true'); break
  }
  
});

rectangle.addEventListener("mouseup", e => {
  rectangle.style.zIndex = 'auto'
  rectangle.setAttribute('stickynote_dragging', 'false')
  rectangle.setAttribute('stickynote_resizing', 'false')
});

document.addEventListener("mouseup", e => {
  if(rectangle.getAttribute('stickynote_resizing') != 'false'){
    rectangle.style.zIndex = 'auto'
    rectangle.setAttribute('stickynote_resizing', 'false')
  }
});

document.addEventListener("mousemove", e => { 
  // TODO make this not add everytime we create a note, but only the first time on the document
  if(rectangle.getAttribute('stickynote_dragging') == 'true'){
    
    let x = e.pageX
    let y = e.pageY
    
    let height = parseInt(rectangle.style.height)/2
    let width = parseInt(rectangle.style.width)/2
    
    const top = y - height // should be y - (height of note)
    const left = x - width // should be x - (width of note)
    
    // console.log('Stuff:')
    // console.log(height + ' ' + width)
    // console.log(y + ' ' + x)
    // console.log(top + ' ' + left)
    
    rectangle.style.top = top + "px"
    rectangle.style.left = left + "px"
  }
  else if(rectangle.getAttribute('stickynote_resizing') != 'false'){
    let resize_type = rectangle.getAttribute('stickynote_resizing')

    let height = e.pageY - parseInt(rectangle.style.top)
    let width = e.pageX - parseInt(rectangle.style.left)
    // console.log(height + ' ' + width)
    if(height < 10)
      height = 10
    if(width < 10)
      width = 10

    switch(resize_type){
      case 'horizontal':
        rectangle.style.width = width + "px"; break
      case 'vertical':
        rectangle.style.height = height + "px"; break
      case 'diagonal':
        rectangle.style.height = height + "px"
        rectangle.style.width = width + "px"
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
