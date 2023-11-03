
//! Not in use right now

// console.log("Service worker started")

// let tab_id = -1

// chrome.tabs.onActivated.addListener(function(tab){
//   console.log(tab.tabId);
//   tab_id = tab.tabId
// })

// chrome.runtime.onMessage.addListener(
//   function(request) {
    
//     console.log("Service Worker processing message")

//     if (request.message === "create note"){
//       if(tab_id != -1){
//         console.log("Service Worker telling content to make note")

//         // This will just send the message to the content script to run (doesn't currently work)
//         // chrome.tabs.sendMessage(tab_id, {message:"create note"})
//         // chrome.tabs.sendMessage(tab_id, {message:"test"})

//         // Trying to just execute the script from here
//         chrome.scripting.executeScript({
//           target: {tabId: tab_id},
//           files: ["built/content.js"]
//         })
//       }  
//     }
//     else if(request.message === "test"){
//       console.log("Service Worker got test message")
//     }
//     else
//       console.log("Service Worker got unknown message")
//   }
// )

export { }