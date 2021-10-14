import React from 'react';
import { MenuItem, Select, Checkbox, ListItemText, Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedDocumentTypes } from '../../reducers/Topic';
import { renameDocumentTypes } from './topicHelpers';

const useStyles = makeStyles(theme => ({
  multiSelect: {
    width: '100%',
    height: '2.2rem'
  }
}));

const TopicDocumentTypeDropdown = props => {
  const classes = useStyles();
  const { documentTypes, selectedDocumentTypes } = useSelector(state => state.Topic);
  const dispatch = useDispatch();

  const handleSelectionChange = e => {
    dispatch(setSelectedDocumentTypes(e.target.value));
  };

  return (
    <Select
      labelId="topicDocumentTypeDropdownLabel"
      id="topicDocumentTypeDropdownId"
      multiple
      value={selectedDocumentTypes}
      onChange={handleSelectionChange}
      input={<Input />}
      renderValue={selectedValues => renameDocumentTypes(selectedValues)}
      className={classes.multiSelect}
      // MenuProps={MenuProps}
    >
      {documentTypes.map(documentType => (
        <MenuItem key={documentType.value} value={documentType.value}>
          <Checkbox checked={selectedDocumentTypes.indexOf(documentType.value) > -1} />
          <ListItemText primary={documentType.label} />
        </MenuItem>
      ))}
    </Select>
  );
};
export default TopicDocumentTypeDropdown;
