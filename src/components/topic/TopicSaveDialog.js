import React, { useRef, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import TopicSaveForm from './TopicSaveForm'

export default function TopicSuggestionsDialog(props) {
  const [selectedTopic, setSelectedTopic] = useState(null)
  const isNewTopic = useRef(null)
  const handleTopicSelect = (topic, isNew) => {
    setSelectedTopic(topic)
    isNewTopic.current = isNew
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
        <Button onClick={props.onCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={() => props.onSave(selectedTopic, isNewTopic.current)} color="primary" disabled={selectedTopic === null}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
