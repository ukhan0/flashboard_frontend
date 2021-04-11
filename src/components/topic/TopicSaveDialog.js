import React, { useRef, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import TopicSaveForm from './TopicSaveForm'
import { setIsSaveDlgOpenAndError } from '../../reducers/Topic';
import { handleSaveSearch } from './topicActions'
import { useDispatch } from 'react-redux';

export default function TopicSuggestionsDialog(props) {
  const [selectedTopic, setSelectedTopic] = useState(null)
  const isNewTopic = useRef(null)
  const dispatch = useDispatch();
  const handleTopicSelect = (topic, isNew) => {
    setSelectedTopic(topic)
    isNewTopic.current = isNew
  }

  const closeDlg = () => {
    dispatch(setIsSaveDlgOpenAndError(false, false))
  }

  return (
    <Dialog open={props.isOpen} onClose={props.onClose} PaperProps={{style: {overflowY: 'visible'}}}>
      <DialogTitle id="max-width-dialog-title">Smart Synonyms</DialogTitle>
      <DialogContent style={{ overflowY: 'visible' }}>
        {
          props.showError ?
            <Typography color='error'>Error occred while saving.</Typography>
            :
            null
        }
        <TopicSaveForm 
          onTopicSelect={handleTopicSelect}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDlg} color="primary">
          Cancel
        </Button>
        <Button onClick={() => dispatch(handleSaveSearch(selectedTopic, isNewTopic.current))} color="primary" disabled={selectedTopic === null}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
