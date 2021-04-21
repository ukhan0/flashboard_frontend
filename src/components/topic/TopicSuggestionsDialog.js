import React from 'react';
import Dialog from '../shared/dialog';
import TopicSuggestions from './TopicSuggestions'

export default function TopicSuggestionsDialog(props) {
  
  return (
      <Dialog
        size={'md'}
        title={'Smart Synonyms'}
        isOpen={props.isOpen}
        onClose={props.handleClose}
      >
        <TopicSuggestions />
      </Dialog>
  );
}
