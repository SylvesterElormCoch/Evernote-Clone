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
    this.setState({ selectedNote: note, selectedNoteIndex: index });
  };

  // deletes a note from firebase
  deleteNote = async note => {
    const noteIndex = this.state.notes.indexOf(note);
    await this.setState({
      notes: this.state.notes.filter(_note => _note !== note)
    });
    if (this.state.selectedNoteIndex === noteIndex) {
      this.setState({ selectedNoteIndex: null, selectedNote: null });
    } else {
      this.state.notes.length > 1
        ? this.selectNote(
            this.state.notes[this.state.selectedNoteIndex - 1],
            this.state.selectedNoteIndex - 1
          )
        : this.setState({ selectedNoteIndex: null, selectedNote: null });
    }

    firebase
      .firestore()
      .collection("notes")
      .doc(note.id)
      .delete();
  };

  // Creates a new note, and adds it to firebase
  newNote = async title => {
    if (
      title === null &&
      !window.confirm("Do you wish to continue without a title?")
    ) {
      return;
    } else {
      const note = {
        title,
        body: ""
      };

      const new_doc = await firebase
        .firestore()
        .collection("notes")
        .add({
          title: note.title,
          body: note.body,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

      console.log(new_doc.id);
      await this.setState({ notes: [...this.state.notes, new_doc] });
      const new_doc_index = this.state.notes.indexOf(
        this.state.notes.filter(note => note.id === new_doc.id)[0]
      );

      this.setState({
        selectedNote: this.state.notes[new_doc_index],
        selectedNoteIndex: new_doc_index
      });
      console.log(this.state, new_doc_index);
    }
  };

  // Updates a given note, specified by the given id
  noteUpdate = (id, note) => {
    firebase
      .firestore()
      .collection("notes")
      .doc(id)
      .update({
        title: note.title,
        body: note.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    console.log(this.state);
  };

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
          {this.state.selectedNote ? (
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
