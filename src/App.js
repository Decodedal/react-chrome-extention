import React, { useEffect, useState } from 'react';
import './App.css';
 
function App() {

  const [title, setTitle] = useState('');
  const [headline, setHeadlines] = useState([])

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
            setTitle(response.title);
            setHeadlines(response.headlines);
          });
      });
    } else {
      // Provide a fallback for non-Chrome environments here
    }
  }, []);

 return (
   <div className="App">
     <h1>SEO Extension built with React!</h1>
 
     <ul className="SEOForm">
       <li className="SEOValidation">
         <div className="SEOValidationField">
           <span className="SEOValidationFieldTitle">Title</span>
           <span  className={`SEOValidationFieldStatus ${title.length < 30 || title.length > 65 ? 'Error' : 'Ok'}`}>
             {title.length} Characters
           </span>
         </div>
         <div className="SEOVAlidationFieldValue">
           {title}
         </div>
       </li>
 
       <li className="SEOValidation">
         <div className="SEOValidationField">
           <span className="SEOValidationFieldTitle">Main Heading</span>
           <span className={`SEOValidationFieldStatus ${headline.length !== 1 ? 'Error' : 'Ok'}`}>
             {headline.length}
           </span>
         </div>
         <div className="SEOVAlidationFieldValue">
         <ul>
           {headline.map((headline, index) => (<li key={index}>{headline}</li>))}
          </ul>
         </div>
       </li>
     </ul>
   </div>
 );
}
 
export default App;