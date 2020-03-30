import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import List from "@material-ui/core/List";
import { Divider, Button } from "@material-ui/core";
import SideBarItem from "../sidebaritem/sidebarItem";

class SideBar extends React.Component {
  constructor() {
    super();
    this.state = {
      addingNote: false,
      title: null
    };
  }

  newNoteBtnClick = () => {
    this.setState({ title: null, addingNote: !this.state.addingNote });
  };

  updateTitle(text) {
    this.setState({ title: text });
  }

  newNote = () => {
    console.log(this.state);
  };

  selectNote = () => {};

  deleteNote = () => {};
  render() {
    const { notes, classes, selectedNoteIndex } = this.props;
    if (notes) {
      return (
        <div className={classes.sidebarContainer}>
          <Button onClick={this.newNoteBtnClick} className={classes.newNoteBtn}>
            {this.state.addingNote ? "Cancel" : "New Note"}
          </Button>
          {this.state.addingNote ? (
            <div>
              <input
                type="text"
                className={classes.newNoteInput}
                placeholder="Enter Note Title"
                onKeyUp={e => this.updateTitle(e.target.value)}
              ></input>
              <Button
                className={classes.newNoteSubmitBtn}
                onClick={this.newNote}
              >
                Submit
              </Button>
            </div>
          ) : null}

          <List>
            {notes.map((note, index) => {
              return (
                <div key={index}>
                  <SideBarItem
                    note={note}
                    index={index}
                    selectedNoteIndex={selectedNoteIndex}
                    selectNote={this.selectNote}
                    deleteNote={this.deleteNote}
                  ></SideBarItem>
                  <Divider />
                </div>
              );
            })}
          </List>
        </div>
      );
    } else {
      return <div>Add a note</div>;
    }
  }
}

export default withStyles(styles)(SideBar);
