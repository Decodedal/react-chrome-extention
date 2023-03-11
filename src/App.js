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
  }, []);


const handleX = (key) =>{
    let text = [...userText]
    text.splice(key,1);
    setUserText(text)
}

const apiCaller = () =>{
  var myHeaders = new Headers();
myHeaders.append("x-api-key", );
myHeaders.append("Content-Type", "application/json");

var graphql = JSON.stringify({
  query: "mutation AddNoteMutation(\n        $createdAt: AWSDate!,\n	    $title: String,\n	    $content: String,\n    ){\n        addNote(input: {\n        content: $content,\n        createdAt: $createdAt,        \n        title: $title\n   }) {\n    content\n    createdAt\n    id\n    title\n    updatedAt\n  }\n}\n",
  variables: {"content":`${userText[0]}`,"createdAt":"2023-02-01","title":"test8"}
})
var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: graphql,
  redirect: 'follow'
};

fetch("https://qmwix3f25nbxxen6yz4fpj55q4.appsync-api.us-east-1.amazonaws.com/graphql?x-a", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
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
              <div className='cancle' onClick={() => handleX(key)}>X</div>
              </div>
            )
          })
          }
     </div>
     <button onClick={apiCaller}>Make Api call</button>
   </div>
 );
}
 
export default App;