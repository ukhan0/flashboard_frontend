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
  const inputRef = React.useRef();
  const [key, setKey] = React.useState('');
  const { searchText, simpleSearchTextArray, ignoreSearchTextArray } = useSelector(state => state.Topic);

  const dispatch = useDispatch();
  const handleSearch = (event, values) => {
    const value = values.map(value => `"${value}"`).join(' OR ');
    handleSearchTags(values);
    if (value === null || value === '' || searchText !== value) {
      dispatch(resetSuggestions());
    }
  };

  const handleKeyDown = event => {
    switch (event.key) {
      case 'Tab':
        event.preventDefault();
        event.stopPropagation();
        let values = simpleSearchTextArray;
        if (event.target.value.length > 0) {
          values.push(event.target.value);
          handleSearchTags(values);
          if (inputRef.current && inputRef.current.value) {
            inputRef.current.value = '';
          }
        }
        break;

      default:
        break;
    }
  };
  const handleSearchTags = values => {
    const value1 = ignoreSearchTextArray.map(value => `"-${value}"`).join(' AND ');
    const value = values.map(value => `"${value}"`).join(' OR ');
    dispatch(setSimpleSearchTextArray(values));
    dispatch(setTopicSearchText(`${value} ${ignoreSearchTextArray.length > 0 ? `AND ${value1}` : ''} `));
    setKey(searchText);
  };
  return (
    <div className={classes.root}>
      <Autocomplete
        key={key}
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
        renderInput={params => {
          params.inputProps.onKeyDown = handleKeyDown;
          return <TextField inputRef={inputRef} size="small" {...params} variant="outlined" fullWidth />;
        }}
      />
    </div>
  );
}
