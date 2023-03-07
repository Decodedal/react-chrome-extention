const messagesFromReactAppListener = (msg, sender, sendResponse) => {
    console.log('[content.js]. Message received', msg);
  
    const headlines = Array.from(document.getElementsByTagName("h1")).map(h1 => h1.innerText);
  
    const response = {
      title: document.title,
      headlines
    };
  
    sendResponse(response);
  }
  
  chrome.runtime.onMessage.addListener(messagesFromReactAppListener);