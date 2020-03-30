import React from "react";
import "./App.css";
import SideBar from "./sidebar/sidebar";
import Editor from "./editor/editor";

const firebase = require("firebase");

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedNoteIndex: null,
      selectedNote: null,
      notes: null
    };
  }

  componentDidMount() {
    firebase
      .firestore()
      .collection("notes")
      .onSnapshot(serverUpdate => {
        const notes = serverUpdate.docs.map(doc => {
          const data = doc.data();
          data["id"] = doc.id;
          return data;
        });
        this.setState({ notes });
      });
  }

  // Manages the state of the currently selected Note
  selectNote = (note, index) => {
    this.setState({selectedNote: note, selectedNoteIndex: index });
  };

  // deletes a note from firebase
  deleteNote = () => {};

  // Creates a new note, and adds it to firebase
  newNote = async (title) => {
    const note = {
      title,
      body:''
    }

    const new_firebase_doc = await firebase.firestore().collection('notes').add({
      title: note.title,
      body:note.body,
      timestamp: firebase.firestore.FieldValue.seververTimestamp()
    })
    
  };


  // Updates a given note, specified by the given id
  noteUpdate = (id, note) =>{
    firebase
    .firestore()
    .collection('notes')
    .doc(id)
    .update({
      title:note.title,
      body:note.body,
      timestamp:firebase.firestore.FieldValue.serverTimestamp()
    })
    console.log(this.state)
  }

  render() {
    if (this.state.notes) {
      return (
        <div className="App">
          <SideBar
            selectedNoteIndex={this.state.selectedNoteIndex}
            deleteNote={this.deleteNote}
            selectNote={this.selectNote}
            newNote={this.newNote}
            notes={this.state.notes}
          />
          { this.state.selectedNote ? (
            <Editor
              selectedNoteIndex={this.state.selectNoteIndex}
              selectedNote={this.state.selectedNote}
              noteUpdate={this.noteUpdate}
              notes={this.state.notes}
            />
          ) : null}
        </div>
      );
    } else {
      return null;
    }
  }
}

export default App;
