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
    this.setState({title:null, addingNote: !this.state.addingNote})
  }

  updateTitle(e){
    console.log("This is the title", e)
  }

  render() {
    const { notes, classes, selectedNoteIndex } = this.props;
    return (
      <div className={classes.sidebarContainer}>
        <Button onClick={this.newNoteBtnClick} className={classes.newNoteBtn}>new Note</Button>
         {
         this.state.addingNote ?
         (<div>
           <input type="text"
            classes={classes.newNoteInput}
            placeholder="Enter Note Title"
            onKeyUp={(e) => this.updateTitle(e.target.value)}>
            </input>
          </div>)
          : null
          }
      </div>
    );
  }
}

export default withStyles(styles)(SideBar);
