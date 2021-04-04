import React from 'react';
import { TextField, MenuItem } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { setTopicSelectedDocumentType } from '../../reducers/Topic';

const TopicDocumentTypeDropdown = props => {
  const { documentTypes, selectedDocumentType } = useSelector(state => state.Topic);
  const dispatch = useDispatch();
  
  return (
    <TextField
      size="small"
      fullWidth
      select
      value={selectedDocumentType}
      onChange={event => {
        console.log(event.target.value)
        dispatch(setTopicSelectedDocumentType(event.target.value));
      }}
      variant="outlined">
      {documentTypes.map(documentType => (
        <MenuItem key={documentType.value} value={documentType.value}>
          { documentType.label }
        </MenuItem>
      ))}
    </TextField>
  );
};
export default TopicDocumentTypeDropdown;
