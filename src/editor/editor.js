import React from "react";
import ReactQuill from "react-quill";
import debounce from "../helpers";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      title: "",
      id: ""
    };
  }

  componentDidMount() {
    this.setState({
      text: this.props.selectedNote.body,
      title: this.props.selectedNote.title,
      id: this.props.selectedNote.id
    });
  }

  componentDidUpdate() {
    if (this.props.selectedNote.id !== this.state.id) {
      this.setState({
        text: this.props.selectedNote.body,
        title: this.props.selectedNote.title,
        id: this.props.selectedNote.id
      });
    }
  }

  update = debounce(() => {
    this.props.noteUpdate(this.state.id, {
      title: this.state.title,
      body: this.state.text
    });
  }, 1000);

  updateEditor = async val => {
    await this.setState({ text: val });
    this.update();
  };

  updateTitle = async title => {
    await this.setState({title});
    this.update();
  }
  render() {
    const { classes } = this.props;
    return (

      <div className={classes.editorContainer}>
        <BorderColorIcon className={classes.editIcon}></BorderColorIcon>
        <input
       className={classes.titleInput}
       placeHolder='Note Title'
       value= {this.state.title ? this.state.title : ''}
       onChange={(e) => this.updateTitle(e.target.value)}>
       </input>
        <ReactQuill
          value={this.state.text}
          onChange={this.updateEditor}
        ></ReactQuill>
      </div>
    );
  }
}

export default withStyles(styles)(Editor);
