
//! Not in use right now



export default function createNote(){

  const rectangle = document.createElement("div");
  rectangle.style.position = "absolute";
  rectangle.style.backgroundColor = "rgba(204,230,255, 0.7)";
  rectangle.style.border = "1px solid black";
  rectangle.style.top = '200px';
  rectangle.style.height = '100px';
  rectangle.style.left = '200px';
  rectangle.style.width = '100px';
  document.body.appendChild(rectangle);
  
  


  console.log('clicked')

}