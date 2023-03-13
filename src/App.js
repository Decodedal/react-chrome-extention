import React, { useEffect, useState } from "react";
import "./App.css";
import { Amplify, API, graphqlOperation } from "aws-amplify";
import { addNote } from "./graphql/mutations";
import { getNotes } from "./graphql/queries";
import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const initialState = {
  content: "Dallas Test",
  createdAt: "2023-03-13",
  title: "test 9",
};

function App() {
  const [newNote, setNewNote] = useState(initialState);
  const [notes, setNotes] = useState([]);
  const [userText, setUserText] = useState(null)
  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    try {
      const notesData = await API.graphql(graphqlOperation(getNotes));
      // console.log(notesData.data.getNotes);
      const notes = notesData.data.getNotes;
      setNotes(notes);
    } catch (err) {
      console.log("error fetching todos");
    }
  }


  console.log(newNote)

  async function addNotes() {
    try {
      if (!newNote.content || !newNote.createdAt || !newNote.title){
        console.log("this condition is not met");
        console.log(newNote.content);
        return;
      };
      const note = { ...newNote };
      setNotes([...notes, note]);
      setNewNote(initialState);
      console.log(newNote);
      console.log("Before bing sent to api")
      await API.graphql(graphqlOperation(addNote, { input: note }));
      console.log("after sent to api")
      setUserText("new note added")
    } catch (err) {
      console.log("error creating todo:", err);
    }
  }

  // function setInput(key, value) {
  //   setNewNote({ ...newNote, [key]: value });
  // }

  const [newSelction, setNewSelection] = useState("true");

  useEffect(() => {
    if (typeof window.chrome !== "undefined") {
      window.chrome.tabs &&
        window.chrome.tabs.query(
          {
            active: true,
            currentWindow: true,
          },
          (tabs) => {
            window.chrome.tabs.sendMessage(
              tabs[0].id || 0,
              { type: "GET_DOM" },
              (response) => {
                setUserText(response.userSelection);
                // set;
              }
            );
          }
        );
    } else {
      // Provide a fallback for non-Chrome environments here
    }
  }, []);

//assigns user selection to the new note  
  useEffect(() => {
    setNewNote({
      ...newNote,
      content:userText
    });
    console.log(newNote)
  }, [userText]);

  const handleX = (key) => {
    let splice = [...notes]
    splice.splice(key, 1);
    setNotes(splice);
  };

  const Loading = () =>{
    return <h1>Loading...</h1>
  }

  return (
    <div className="App">
      <h1>Text grabber tool!</h1>

      <div className="SEOForm">
        {!notes
          ? <Loading/>
          : notes.map((note, key) => {
              return (
                <div className="text-chunk" key={key}>
                  <p>{note.content}</p>
                  <div
                    className="cancle"
                    onClick={() => handleX(key)}
                  >
                    X
                  </div>
                </div>
              );
            })}
      </div>
      <div className="SEOForm">
      <u><h4>Selected text</h4></u>
        <p>{userText ? 
            userText
            :
            <Loading/>  
            }</p>
      </div>
      <button onClick={()=>addNotes()}>Add New Note</button>
    </div>
  );
}

export default App;
