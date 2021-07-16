import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FormControl, TextField } from '@material-ui/core';
import useStyles from './watchlistStyles';
import { debounce, get } from 'lodash';
import { getCompleteWatchlist } from '../../utils/helpers';
import { setWatchlistSearchText, setSelectedTickerSymbol } from '../../reducers/Watchlist';

const createOptionLabel = option => {
  return `${option.ticker} - ${option.name}`;
};

const WatchlistTopicSearch = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [availableSymbols, setAvailableSymbols] = useState([]);
  const { selectedTickerSymbol, searchText } = useSelector(state => state.Watchlist);

  const handleSearchTextChange = debounce(async text => {
    // free text search for Watchlist table
    dispatch(setWatchlistSearchText(text));

    if (!text || text.length < 1) return;

    const searchabletext = text.toLowerCase();
    setLoading(true);
    const completeWatchlist = getCompleteWatchlist() || [];
    const filteredWatchlist = completeWatchlist
      .filter(
        c =>
          get(c, 'b', '')
            .toLowerCase()
            .includes(searchabletext) ||
          get(c, 'ticker', '')
            .toLowerCase()
            .includes(searchabletext)
      )
      .map(c => ({ ticker: c.ticker, name: c.b }));
    setAvailableSymbols(filteredWatchlist);
    setLoading(false);
  }, 200);

  const selectionChanged = async (e, newSelectedSymbol) => {
    if (newSelectedSymbol && newSelectedSymbol.ticker) {
      dispatch(setSelectedTickerSymbol(newSelectedSymbol));
      dispatch(setWatchlistSearchText(newSelectedSymbol.ticker));
      setAvailableSymbols([]);
    }
  };

  useEffect(() => {
    if (!searchText) {
      dispatch(setSelectedTickerSymbol(null));
      setAvailableSymbols([]);
    }
  }, [searchText, dispatch]);

  return (
    <FormControl className={classes.formControl}>
      <Autocomplete
        loading={loading}
        loadingText={'Loading...'}
        className={classes.searchField}
        onChange={selectionChanged}
        options={availableSymbols}
        value={selectedTickerSymbol}
        closeIcon={false}
        getOptionLabel={option => createOptionLabel(option)}
        renderInput={params => (
          <TextField
            {...params}
            label="Search"
            variant="outlined"
            placeholder="Type Company Name or Symbol"
            onChange={e => handleSearchTextChange(e.target.value)}
            fullWidth
            size="small"
          />
        )}
      />
    </FormControl>
  );
};

export default WatchlistTopicSearch;
