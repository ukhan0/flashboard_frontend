import React, { useRef, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import TopicSaveForm from './TopicSaveForm'
import { setIsSaveDlgOpenAndError } from '../../reducers/Topic';
import { handleSaveSearch, updateSaveSearch } from './topicActions'
import { useSelector, useDispatch } from 'react-redux';

export default function TopicSuggestionsDialog(props) {
  const { selectedSearch, selectedTopic } = useSelector(state => state.Topic);
  const [selectedTopicLocal, setSelectedTopicLocal] = useState(selectedTopic ? {label: selectedTopic.topicText, value: selectedTopic.topicID} : null)
  
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
          selectedSearch ?
            <>
              {
                selectedTopicLocal && selectedTopic && selectedTopicLocal.value === selectedTopic.topicID ?
                  <Button onClick={() => dispatch(updateSaveSearch(selectedTopic.topicID, selectedSearch.searchId))} color="primary" disabled={selectedTopic === null}>
                    { 'Update' }
                  </Button>
                  :
                  null
              }
              <Button onClick={() => dispatch(handleSaveSearch(selectedTopicLocal, isNewTopic.current))} color="primary" disabled={selectedTopicLocal === null}>
                { 'Save as New' }
              </Button>
            </>
            :
            <Button onClick={() => dispatch(handleSaveSearch(selectedTopicLocal, isNewTopic.current))} color="primary" disabled={selectedTopicLocal === null}>
              { 'Save'}
            </Button>
        }
      </DialogActions>
    </Dialog>
  );
}
