import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeHTMLTags } from '../helpers';

class SideBarItem extends React.Component {
  render(){
    const {index, selectedNoteIndex, note, classes} = this.props;
    console.log(note)
    return(
      <div key={index}>
         <ListItem
          className = {classes.ListItem}
          selected = {selectedNoteIndex === index}
          alignItems='flex-start'>
          <div className={classes.textSection}
              onClick={() => this.selectNote(note, index)}>
              <ListItemText
               primary={note.title}
               secondary={note.body.substring(0, 30) + '...'}>
              </ListItemText>
          </div>
        </ListItem>
      </div>
      )
    }

}

export default withStyles(styles)(SideBarItem);