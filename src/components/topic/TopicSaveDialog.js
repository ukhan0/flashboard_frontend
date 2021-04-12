import React, { useRef, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import TopicSaveForm from './TopicSaveForm'
import { setIsSaveDlgOpenAndError } from '../../reducers/Topic';
import { handleSaveSearch, updateSaveSearch } from './topicActions'
import { useSelector, useDispatch } from 'react-redux';

export default function TopicSuggestionsDialog(props) {
  const { selectedSearch, selectedTopic } = useSelector(state => state.Topic);
  const [selectedTopicLocal, setSelectedTopicLocal] = useState(selectedTopic ? {label: selectedTopic.topicText, value: selectedTopic.topicID} : null)
  console.log(selectedTopicLocal)
  const isNewTopic = useRef(null)
  const dispatch = useDispatch();
  
  const handleTopicSelect = (topic, isNew) => {
    setSelectedTopicLocal(topic)
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
          selectedTopicLocal={selectedTopicLocal}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch(setIsSaveDlgOpenAndError(false, false))} color="primary">
          Cancel
        </Button>
        {
          selectedTopicLocal && selectedTopic && selectedTopicLocal.value === selectedTopic.topicID ?
            <Button onClick={() => dispatch(updateSaveSearch(selectedTopic.topicID, selectedSearch.searchId))} color="primary" disabled={selectedTopic === null}>
              Save
            </Button>
            :
            <Button onClick={() => dispatch(handleSaveSearch(selectedTopicLocal, isNewTopic.current))} color="primary" disabled={selectedTopicLocal === null}>
              { selectedTopic === null ? 'Save' : 'Save as New' }
            </Button>
        }
      </DialogActions>
    </Dialog>
  );
}
