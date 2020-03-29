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

  render() {
    return (
      <div className="App">
        <SideBar
          selectedNoteIndex={this.state.selectedNoteIndex}
          notes={this.state.notes}
        />
        <Editor />
      </div>
    );
  }
}

export default App;
