import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import TopicSaveForm from './TopicSaveForm';
import { setIsSaveDlgOpenAndError } from '../../reducers/Topic';
import { handleSaveSearch } from './topicActions';
import { useDispatch } from 'react-redux';

export default function TopicSuggestionsDialog(props) {
  const [searchLabel, setSearchLabel] = useState(null);
  const dispatch = useDispatch();

  const handleTopicSelect = topic => {
    setSearchLabel(topic);
  };

  return (
    <Dialog open={props.isOpen} onClose={props.onClose} PaperProps={{ style: { overflowY: 'visible' } }}>
      <DialogTitle id="max-width-dialog-title">Smart Synonyms</DialogTitle>
      <DialogContent style={{ overflowY: 'visible' }}>
        {props.showError ? <Typography color="error">Error occred while saving.</Typography> : null}
        <TopicSaveForm onTopicSelect={handleTopicSelect} searchLabel={searchLabel} />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch(setIsSaveDlgOpenAndError(false, false))} color="primary">
          Cancel
        </Button>
        {searchLabel ? (
          <Button onClick={() => dispatch(handleSaveSearch(searchLabel))} color="primary">
            {'Save'}
          </Button>
        ) : null}
      </DialogActions>
    </Dialog>
  );
}
