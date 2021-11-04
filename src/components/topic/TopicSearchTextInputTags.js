/* eslint-disable no-use-before-define */
import React from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useSelector, useDispatch } from 'react-redux';
import { setTopicSearchText, resetSuggestions, setSimpleSearchTextArray } from '../../reducers/Topic';
const useStyles = makeStyles(theme => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(3)
    }
  },

  chipStyle: {
    borderRadius: 0,
    backgroundColor: '#cde69c'
  }
}));

export default function Tags() {
  const classes = useStyles();

  const { searchText, simpleSearchTextArray } = useSelector(state => state.Topic);
  const dispatch = useDispatch();
  const handleSearch = (event, values) => {
    const value = values.map(value => `"${value}"`).join(' OR ');
    dispatch(setSimpleSearchTextArray(values));
    dispatch(setTopicSearchText(value));
    if (value === null || value === '' || searchText !== value) {
      dispatch(resetSuggestions());
    }
  };
  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        size="small"
        id="tags-outlined"
        closeIcon={false}
        onChange={(event, value) => {
          handleSearch(event, value);
        }}
        options={[]}
        value={simpleSearchTextArray.length > 0 ? simpleSearchTextArray : []}
        freeSolo
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              color="primary"
              style={{ maxHeight: '22px' }}
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={params => <TextField size="small" {...params} variant="outlined" fullWidth />}
      />
    </div>
  );
}
