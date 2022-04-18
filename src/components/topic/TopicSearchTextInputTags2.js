/* eslint-disable no-use-before-define */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchTextWithAnd } from '../../reducers/Topic';
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

export default function Tags() {
  const classes = useStyles();
  const inputRef = React.useRef();
  const [key, setKey] = React.useState('');
  const { searchTextWithAnd } = useSelector(state => state.Topic);
  const dispatch = useDispatch();
  const handleSearch = (event, values) => {
    handleSearchTags(values);
  };

  const handleKeyDown = event => {
    switch (event.key) {
      case 'Tab':
        // event.preventDefault();
        event.stopPropagation();
        let values = searchTextWithAnd;
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
    dispatch(setSearchTextWithAnd(values));
    setKey(value);
  };
  const handleSeachTagOnFocusOut = value => {
    let values = searchTextWithAnd;
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
        key={key}
        values={searchTextWithAnd}
        inputRef={inputRef}
      />
    </div>
  );
}
