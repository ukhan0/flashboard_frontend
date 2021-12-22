import React from 'react';
import { MenuItem, Select, ListItemText, Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchIndex, setSelectedDocumentTypes } from '../../reducers/Topic';
import searchIndexs from '../../config/searchIndexs';

const useStyles = makeStyles(theme => ({
  singleSelect: {
    width: '100%',
    height: '2.2rem'
  }
}));

const TopicIndexDropDown = props => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { searchIndex, documentTypes } = useSelector(state => state.Topic);
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSelectionChange = e => {
    let documentTypeValue = documentTypes.map(e => e.value);
    dispatch(setSelectedDocumentTypes(documentTypeValue));

    dispatch(setSearchIndex(e.target.value));
  };

  return (
    <Select
      labelId="topicSectorDropdown"
      id="topicSectorDropdown"
      value={searchIndex == null ? '' : searchIndex}
      onChange={handleSelectionChange}
      open={open}
      onClose={handleClose}
      onOpen={handleOpen}
      input={<Input />}
      className={classes.singleSelect}>
      {searchIndexs.map((searchInd, index) => (
        <MenuItem key={index} value={searchInd.value}>
          <ListItemText primary={searchInd.label} />
        </MenuItem>
      ))}
    </Select>
  );
};

export default TopicIndexDropDown;
