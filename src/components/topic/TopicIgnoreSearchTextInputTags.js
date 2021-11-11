/* eslint-disable no-use-before-define */
import React from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useSelector, useDispatch } from 'react-redux';
import { setTopicSearchText,  setIgnoreSearchTextArray } from '../../reducers/Topic';
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
  const [v, setV] = React.useState('');

  const { searchText, simpleSearchTextArray, ignoreSearchTextArray } = useSelector(state => state.Topic);

  const dispatch = useDispatch();
  const handleSearch = (event, values) => {
    handleIgnoreSearch(values);
  };

  const handleKeyDown = event => {
    switch (event.key) {
      case 'Tab': {
        event.preventDefault();
        event.stopPropagation();
        let values = ignoreSearchTextArray;
        if (event.target.value.length > 0) {
          values.push(event.target.value);
          handleIgnoreSearch(values);

          if (inputRef.current && inputRef.current.value) {
            inputRef.current.value = '';
          }
        }
        break;
      }

      default:
    }
  };
  const handleIgnoreSearch = values => {
    const value1 = simpleSearchTextArray.map(value => `"${value}"`).join(' OR ');
    const value = values.map(value => `-"${value}"`).join(' AND ');
    dispatch(setIgnoreSearchTextArray(values));
    dispatch(setTopicSearchText(`${value1} AND ${value}`));
    setV(searchText);
  };
  return (
    <div className={classes.root}>
      <Autocomplete
        key={v}
        multiple
        size="small"
        id="tags-outlined"
        closeIcon={false}
        onChange={(event, value) => {
          handleSearch(event, value);
        }}
        options={[]}
        value={ignoreSearchTextArray.length > 0 ? ignoreSearchTextArray : []}
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
