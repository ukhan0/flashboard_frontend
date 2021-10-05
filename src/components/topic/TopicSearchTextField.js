import React from 'react';
import { TextField } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { setTopicSearchText, resetSuggestions } from '../../reducers/Topic';

const TopicSearchTextField = props => {
  const { searchText } = useSelector(state => state.Topic);
  const dispatch = useDispatch();
  const handleSearch = event => {
    const value = event.target.value.replaceAll(' or ', ' OR ').replaceAll(' and ', ' AND ');

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
