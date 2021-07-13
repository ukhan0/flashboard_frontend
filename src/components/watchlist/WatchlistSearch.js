import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TextField } from '@material-ui/core';
import { setWatchlistSearchText } from '../../reducers/Watchlist';

const WatchlistTopicSearch = props => {
  const dispatch = useDispatch();
  const { searchText } = useSelector(state => state.Watchlist);

  const handleSearchTextChange = text => {
    dispatch(setWatchlistSearchText(text));
  };

  return (
    <>
      <TextField
        label="Search"
        variant="outlined"
        value={searchText}
        placeholder="Type Company Name or Symbol"
        onChange={e => handleSearchTextChange(e.target.value)}
        fullWidth
        size="small"
      />
    </>
  );
};

export default WatchlistTopicSearch;
