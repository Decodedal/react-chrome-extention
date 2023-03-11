import React, { useEffect, useState } from "react";
import "./App.css";
import { Amplify, API, graphqlOperation } from "aws-amplify";
import { addNote } from "./graphql/mutations";
import { getNotes } from "./graphql/queries";
import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const initialState = {
  content: "",
  createdAt: "",
  title: "",
};

function App() {
  const [newNote, setNewNote] = useState(initialState);
  const [notes, setNotes] = useState([]);
  const [userText, setUserText] = useState([
    "item one",
    "item two",
    "item three",
  ]);
  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    setNewNote(userText[userText.length - 1]);
  }, [userText]);

  async function fetchNotes() {
    try {
      const notesData = await API.graphql(graphqlOperation(getNotes));
      console.log({ notesData });
      const notes = notesData.data.getNotes.items;
      setNotes(notes);
    } catch (err) {
      console.log("error fetching todos");
    }
  }

  // async function addNotes() {
  //   try {
  //     if (!newNote.content || !newNote.createdAt || !newNote.title) return;
  //     const note = { ...newNote };
  //     setNotes([...notes, note]);
  //     setNewNote(initialState);
  //     await API.graphql(graphqlOperation(addNote, { input: note }));
  //   } catch (err) {
  //     console.log("error creating todo:", err);
  //   }
  // }

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
                setUserText([response.stringArr]);
                console.log(response.stringArr);
                // set;
              }
            );
          }
        );
    } else {
      // Provide a fallback for non-Chrome environments here
    }
  }, [newSelction]);

  const handleX = (key) => {
    let splice = userText.splice(key, 1);
    setUserText(splice);
  };

  return (
    <div onMouseUp={() => setNewSelection(!newSelction)} className="App">
      <h1>Text grabber tool!</h1>

      <div className="SEOForm">
        {userText.length === 1
          ? userText
          : userText.map((text, key) => {
              return (
                <div className="text-chunk" key={key}>
                  <p>{text}</p>
                  <div
                    className="cancle"
                    onClick={(key) => setUserText(userText.splice(key, 1))}
                  >
                    X
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default App;
