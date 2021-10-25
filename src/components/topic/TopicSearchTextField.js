import React from 'react';
import { TextField } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { setTopicSearchText, resetSuggestions } from '../../reducers/Topic';

const TopicSearchTextField = props => {
  const { searchText } = useSelector(state => state.Topic);
  const dispatch = useDispatch();
  const handleSearch = event => {
    const regex = / or | and |/gi;
    const value = event.target.value.replaceAll(regex, function(v) {
      return v.toUpperCase();
    });

    dispatch(setTopicSearchText(value));
    if (value === null || value === '' || searchText !== value) {
      dispatch(resetSuggestions());
    }
  };

  return (
    <TextField
      size="small"
      fullWidth
      placeholder={props.text}
      value={searchText}
      onChange={e => {
        handleSearch(e);
      }}
      variant="outlined"
    />
  );
};
export default TopicSearchTextField;
