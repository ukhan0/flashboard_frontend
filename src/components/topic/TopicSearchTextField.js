import React from 'react';
import { TextField } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { setTopicSearchText, setSelectedSuggestions } from '../../reducers/Topic';

const TopicSearchTextField = props => {
  const { searchText } = useSelector(state => state.Topic);
  const dispatch = useDispatch();

  return (
    <TextField
      size="small"
      fullWidth
      placeholder={props.text}
      value={searchText}
      onChange={event => {
        const value = event.target.value
        dispatch(setTopicSearchText(value));
        if(value === null || value === '' || searchText !== value) {
          dispatch(setSelectedSuggestions({}));
        }
      }}
      variant="outlined"
    />
  );
};
export default TopicSearchTextField;
