const messagesFromReactAppListener = (msg, sender, sendResponse) => {
    console.log('[content.js]. Message received', msg);
  
    const headlines = Array.from(document.getElementsByTagName("h1")).map(h1 => h1.innerText);
  
    const getSelectedText = () => window.getSelection().toString();
    let userSelection = getSelectedText()

    console.log(userSelection)
    
    const response = {
      title: document.title,
      headlines,
      userSelection
    };
  
    sendResponse(response);
  }
  
  chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
