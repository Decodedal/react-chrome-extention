//This code lets us store the user selection persistently across extention window refresh 

// const stringArr =[]
const getSelectedText = () => window.getSelection().toString();
let userSelection = "null"

// const updateStringArr = () =>{
//   let userSelection = getSelectedText()
//   stringArr.push(userSelection)
//    console.log(stringArr)
// }

const updateStringArr = () =>{
  userSelection = getSelectedText()
}



document.body.addEventListener("mouseup", updateStringArr)

const messagesFromReactAppListener = (msg, sender, sendResponse) => {
    console.log('[content.js]. Message received', msg);
  
    const headlines = Array.from(document.getElementsByTagName("h1")).map(h1 => h1.innerText);
  
    // const getSelectedText = () => window.getSelection().toString();
    // let userSelection = getSelectedText()

    // console.log(userSelection)
    
    const response = {
      userSelection
    };
  
    sendResponse(response);
  }
  
  chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
