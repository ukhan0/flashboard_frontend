import React, { useState } from 'react';
import { connect } from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FormControl, Chip, TextField } from '@material-ui/core';
import useStyles from './WatchlistTopicStyles';
import { debounce, get } from 'lodash';
import { setWatchlistSelectedSymbols } from '../../../reducers/Watchlist';
import { getCompleteWatchlist } from '../../../utils/helpers';

const createOptionLabel = option => {
  return `${option.ticker} - ${option.name}`;
};

const WatchlistTopicSearch = props => {
  const classes = useStyles();
  const { selectedSymbols, setWatchlistSelectedSymbols } = props;
  const [availableSymbols, setAvailableSymbols] = useState([]);

  const handleSearchTextChange = debounce(async text => {
    const completeWatchlist = getCompleteWatchlist() || [];
    const searchabletext = text.toLowerCase();
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
  }, 1000);

  const selectionChanged = (e, newSelectedSymbols) => {
    setWatchlistSelectedSymbols(newSelectedSymbols);
  };

  return (
    <FormControl className={classes.formControl}>
      <Autocomplete
        multiple
        id="watchlist-topic-search"
        loading={true}
        onChange={selectionChanged}
        options={availableSymbols}
        getOptionLabel={option => createOptionLabel(option)}
        defaultValue={selectedSymbols}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => <Chip label={createOptionLabel(option)} {...getTagProps({ index })} />)
        }
        renderInput={params => (
          <TextField
            {...params}
            label="Search"
            variant="outlined"
            placeholder="Type Company Name or Symbol"
            onChange={e => handleSearchTextChange(e.target.value)}
            fullWidth
          />
        )}
      />
    </FormControl>
  );
};

const mapStateToProps = state => ({
  selectedSymbols: state.Watchlist.selectedSymbols
});

const mapDispatchToProps = dispatch => ({
  setWatchlistSelectedSymbols: value => dispatch(setWatchlistSelectedSymbols(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(WatchlistTopicSearch);
