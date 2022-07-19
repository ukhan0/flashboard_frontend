import React from 'react';
import { TextField } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { setTopicSearchText, resetSuggestions } from '../../reducers/Topic';
import InputAdornment from '@material-ui/core/InputAdornment';
import TopicHelpPopup from './TopicHelpPopup';
import { get } from 'lodash';
const TopicSearchTextField = props => {
  const { searchText } = useSelector(state => state.Topic);
  const dispatch = useDispatch();
  const handleSearch = event => {
    const regex = / or | and |/gi;
    const value = event.target.value.replaceAll(regex, function(v) {
      return v.toUpperCase();
    });
    if (get(props, 'onChangeStatus', null)) {
      props.onChange();
    }
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
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <TopicHelpPopup />
          </InputAdornment>
        )
      }}
    />
  );
};
export default TopicSearchTextField;
