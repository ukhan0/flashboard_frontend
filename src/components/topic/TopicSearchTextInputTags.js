import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useSelector, useDispatch } from 'react-redux';
import { resetSuggestions, setSimpleSearchTextArray } from '../../reducers/Topic';
import TopicSearchTextTags from './TopicSearchTextTags';
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

export default function Tags(props) {
  const classes = useStyles();
  const inputRef = React.useRef();
  const [key, setKey] = React.useState('');
  const { searchText, simpleSearchTextArray } = useSelector(state => state.Topic);

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
        // event.preventDefault();
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
    const value = values.map(value => `"${value}"`).join(' OR ');
    dispatch(setSimpleSearchTextArray(values));
    setKey(value);
  };

  const handleSeachTagOnFocusOut = value => {
    let values = simpleSearchTextArray;
    if (value.length > 0) {
      values.push(value);
      handleSearchTags(values);
    }
  };

  return (
    <div className={classes.root}>
      <TopicSearchTextTags
        handleSeachTagOnFocusOut={handleSeachTagOnFocusOut}
        handleSearch={handleSearch}
        handleKeyDown={handleKeyDown}
        handleOnShowSuggestions={props.handleOnShowSuggestions}
        searchSuggestionType={props.searchSuggestionType}
        keey={key}
        values={simpleSearchTextArray}
        inputRef={inputRef}
      />
    </div>
  );
}
