import React from 'react';
import { TextField } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { setTopicSearchText } from '../../reducers/Topic';

const TopicSearchTextField = props => {
  const { searchText } = useSelector(state => state.Topic);
  const dispatch = useDispatch();

  return (
    <TextField
      size="small"
      fullWidth
      placeholder={props.text}
      value={searchText}
      onChange={text => {
        dispatch(setTopicSearchText(text.target.value));
      }}
      variant="outlined"
    />
  );
};
export default TopicSearchTextField;
