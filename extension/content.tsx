
let rect_counter = 0
let rect_list = [ ]


console.log("Content script started")

const rectangle = document.createElement("div");
// rectangle.id = rect_list.length.toString()
rectangle.id = rect_counter.toString()
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
rect_counter++
// rect_list.push(rectangle);


rectangle.addEventListener("mousedown", e => {
  rectangle.style.zIndex = '2'
  rectangle.setAttribute('stickynote_dragging', 'true')
});

rectangle.addEventListener("mouseup", e => {
  rectangle.style.zIndex = 'auto'
  rectangle.setAttribute('stickynote_dragging', 'false')
});

document.addEventListener("mousemove", e => {
  if(rectangle.getAttribute('stickynote_dragging') == 'true'){
    
    let x = e.pageX
    let y = e.pageY

    const top = y - 50 // should be y - (height of note)
    const left = x - 50 // should be x - (width of note)

    rectangle.style.top = top + "px";
    rectangle.style.left = left + "px";
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
