import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchIndex, setSelectedDocumentTypes } from '../../reducers/Topic';
import searchIndexs from '../../config/searchIndexs';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import makeStyles from '@material-ui/core/styles/makeStyles';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import { setTopicIndexDropDownSearchCombineReducer } from '../../reducers/Topic';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  select: {
    height: '38px',
    minWidth: 120,
    width: '300px'
  },
  twitterNote: {
    color: theme.palette.text.secondary,
    display: 'flex',
    alignItems: 'center',
    fontSize: '12px',
    marginTop: '2px',
    '& svg': {
      fontSize: '12px',
      marginRight: '2px'
    }
  }
}));

const TopicIndexDropDown = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { searchIndex, documentTypes } = useSelector(state => state.Topic);
  const show = searchIndex['id'] === 4 || searchIndex['id'] === 5 ? true : false;
  const selectionChanged = selectedIndex => {
    dispatch(setTopicIndexDropDownSearchCombineReducer());

    if (selectedIndex.target.value) {
      const index = searchIndexs.find(s => s.value === selectedIndex.target.value);
      if (index) {
        dispatch(setSearchIndex(index));
        let documentTypeValue = documentTypes.map(ee => ee.documentTypeGroup);
        dispatch(setSelectedDocumentTypes(documentTypeValue));
      }
    }
  };
  return (
    <FormControl variant="outlined" size="small">
      <Select
        style={{ width: '321px' }}
        labelId="topicDocumentTypeDropdownLabel"
        id="topicDocumentTypeDropdownId"
        value={searchIndex['value']}
        onChange={selectionChanged}
        className={classes.select}>
        {searchIndexs.map(documentType => (
          <MenuItem key={documentType.value} value={documentType.value}>
            <ListItemText primary={documentType.label} />
          </MenuItem>
        ))}
      </Select>

      {show ? (
        <Typography className={classes.twitterNote}>
          <ErrorOutlineIcon />
          {searchIndex['id'] === 4 ? 'Pulling up latest records' : 'Pulling top 500 records'}
        </Typography>
      ) : null}
    </FormControl>
  );
};

export default TopicIndexDropDown;
