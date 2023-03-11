const stringArr =[]
const getSelectedText = () => window.getSelection().toString();


const updateStringArr = () =>{
  let userSelection = getSelectedText()
  stringArr.push(userSelection)
  console.log(stringArr)
}



document.body.addEventListener("mouseup", updateStringArr)

const messagesFromReactAppListener = (msg, sender, sendResponse) => {
    console.log('[content.js]. Message received', msg);
  
    const headlines = Array.from(document.getElementsByTagName("h1")).map(h1 => h1.innerText);
  
    // const getSelectedText = () => window.getSelection().toString();
    // let userSelection = getSelectedText()

    // console.log(userSelection)
    
    const response = {
      title: document.title,
      headlines,
      stringArr
    };
  
    sendResponse(response);
  }
  
  chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
