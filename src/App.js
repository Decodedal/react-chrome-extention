import React, { useEffect, useState } from 'react';
import './App.css';
 
function App() {


  const [userText, setUserText] = useState(["item one", "item two", "item three"])
  const [newSelction, setNewSelection] = useState("true")

  useEffect(() => {
    if (typeof window.chrome !== 'undefined') {
     window.chrome.tabs && window.chrome.tabs.query({
        active: true,
        currentWindow: true
      }, tabs => {
        window.chrome.tabs.sendMessage(
          tabs[0].id || 0,
          { type: 'GET_DOM' },
          (response) => {
            setUserText(response.stringArr)
            console.log(response.stringArr)
          });
      });
    } else {
      // Provide a fallback for non-Chrome environments here
    }
  }, [newSelction]);


const handleX = (key) =>{
    let splice = userText.splice(key,1);
    setUserText(splice)
}


 return (
   <div onMouseUp={()=>setNewSelection(!newSelction)} className="App">
     <h1>Text grabber tool!</h1>
 
     <div className="SEOForm">
          {userText.length === 1 ?
          userText
          :
          userText.map((text, key)=>{
            return(
              <div className='text-chunk' key={key}>
              <p>{text}</p>
              <div className='cancle' onClick={(key) => setUserText(userText.splice(key,1))}>X</div>
              </div>
            )
          })
          }
     </div>
   </div>
 );
}
 
export default App;