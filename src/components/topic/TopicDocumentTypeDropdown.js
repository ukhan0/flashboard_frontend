import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import Input from '@material-ui/core/Input';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedDocumentTypes } from '../../reducers/Topic';
import { renameDocumentTypes, renameDocumentTypesLabel } from './topicHelpers';

const useStyles = makeStyles(theme => ({
  multiSelect: {
    width: '100%',
    height: '2.2rem'
  }
}));

const TopicDocumentTypeDropdown = () => {
  const classes = useStyles();
  const { documentTypes, selectedDocumentTypes,  searchIndex } = useSelector(state => state.Topic);
  const dispatch = useDispatch();
  let documentTypeValue = documentTypes.map(e => e.documentTypeGroup);
  const isAllSelected = documentTypeValue.length > 0 && selectedDocumentTypes.length === documentTypeValue.length;
  const handleSelectionChange = e => {
    const value = e.target.value;
    if (value[value.length - 1] === 'All') {
      dispatch(
        setSelectedDocumentTypes(selectedDocumentTypes.length === documentTypeValue.length ? [] : documentTypeValue)
      );
      return;
    }

    dispatch(setSelectedDocumentTypes(value));
  };

  return (
    <Select
      labelId="topicDocumentTypeDropdownLabel"
      id="topicDocumentTypeDropdownId"
      multiple
      value={selectedDocumentTypes}
      onChange={handleSelectionChange}
      input={<Input />}
      renderValue={selectedValues => (isAllSelected ? ['All'] : renameDocumentTypes(selectedValues))}
      autoWidth={true}
      disabled={searchIndex['id'] === 5 ? true : false}
      MenuProps={{
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left'
        },
        transformOrigin: {
          vertical: 'top',
          horizontal: 'left'
        },
        getContentAnchorEl: null
      }}
      className={classes.multiSelect}>
      <MenuItem
        value="All"
        classes={{
          root: isAllSelected ? classes.selectedAll : ''
        }}
        style={{ width: '300px' }}>
        <Checkbox
          classes={{ indeterminate: classes.indeterminateColor }}
          checked={isAllSelected}
          indeterminate={selectedDocumentTypes.length > 0 && selectedDocumentTypes.length < documentTypeValue.length}
        />

        <ListItemText classes={{ primary: classes.selectAllText }} primary="Select All" />
      </MenuItem>
      {documentTypes.map((documentType, index) => (
        <MenuItem key={index} value={documentType.documentTypeGroup}>
          <Checkbox checked={selectedDocumentTypes.indexOf(documentType.documentTypeGroup) > -1} />
          <ListItemText primary={renameDocumentTypesLabel(documentType.label)} />
        </MenuItem>
      ))}
    </Select>
  );
};
export default TopicDocumentTypeDropdown;
