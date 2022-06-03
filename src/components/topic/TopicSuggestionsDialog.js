import React from 'react';
import Dialog from '../shared/dialog';
import TopicSuggestions from './TopicSuggestions';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1)
  }
}));

export default function TopicSuggestionsDialog(props) {
  const classes = useStyles();
  return (
    <Dialog
      size={'md'}
      title={'Add Smart Synonyms to:'}
      isOpen={props.isOpen}
      closeBtnComponent={
        <Button className={classes.closeButton} variant="contained" color="primary" onClick={props.handleClose}>
          Done
        </Button>
      }>
      <TopicSuggestions />
    </Dialog>
  );
}
