
let rect_counter = 0
let rect_list = [ ]

// TODO send rect counter to the content file to set the rect name correctly,
// TODO send the rectangle itself back to the popup to store it in a list

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

  console.log(clicked_x + ', ' + clicked_y)
  console.log(height + ', ' + width)

  if(clicked_x > (width - 20) && clicked_y > (height - 20)){
    console.log("should be resizing")
    rectangle.setAttribute('stickynote_resizing', 'true')
  } 
  else if(1){
    rectangle.style.zIndex = '2'
    rectangle.setAttribute('stickynote_dragging', 'true')
  }
});

rectangle.addEventListener("mouseup", e => {
  rectangle.style.zIndex = 'auto'
  rectangle.setAttribute('stickynote_dragging', 'false')
  rectangle.setAttribute('stickynote_resizing', 'false')
});

document.addEventListener("mousemove", e => {
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

    rectangle.style.top = top + "px";
    rectangle.style.left = left + "px";
  }
  else if(rectangle.getAttribute('stickynote_resizing') == 'true'){
    // return
    let height = e.pageY - parseInt(rectangle.style.top)
    let width = e.pageX - parseInt(rectangle.style.left)
    console.log(height + ' ' + width)
    if(height < 10)
      height = 10
    if(width < 10)
      width = 10

    rectangle.style.height = height + "px";
    rectangle.style.width = width + "px";
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
