import React from 'react';
import { TextField } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchLabel } from '../../reducers/Topic';

const TopicSearchTextField = props => {
  const { searchLabel } = useSelector(state => state.Topic);
  const dispatch = useDispatch();
  const handleSearchLabel = event => {
    dispatch(setSearchLabel(event.target.value));
  };

  return (
    <TextField
      size="small"
      fullWidth
      placeholder={props.text}
      value={searchLabel}
      onChange={e => {
        handleSearchLabel(e);
      }}
      variant="outlined"
    />
  );
};
export default TopicSearchTextField;
