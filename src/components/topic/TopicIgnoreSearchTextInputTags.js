import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { setIgnoreSearchTextArray } from '../../reducers/Topic';
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

  const { ignoreSearchTextArray } = useSelector(state => state.Topic);

  const dispatch = useDispatch();
  const handleSearch = (event, values) => {
    handleIgnoreSearch(values);
  };

  const handleKeyDown = event => {
    switch (event.key) {
      case 'Tab':
        // event.preventDefault();
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
      default:
        break;
    }
  };
  const handleIgnoreSearch = values => {
    const value = values.map(value => `-"${value}"`).join(' AND ');
    dispatch(setIgnoreSearchTextArray(values));
    setKey(value);
  };
  const handleSeachTagOnFocusOut = value => {
    let values = ignoreSearchTextArray;
    if (value.length > 0) {
      values.push(value);
      handleIgnoreSearch(values);
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
        key={key}
        values={ignoreSearchTextArray}
        inputRef={inputRef}
      />
    </div>
  );
}
