import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FormControl, Chip, TextField } from '@material-ui/core';
import useStyles from './WatchlistTopicStyles';
import { debounce, get } from 'lodash';
import { setWatchlistSelectedSymbols } from '../../../reducers/Watchlist';

const createOptionLabel = option => {
  return `${option.ticker} - ${option.name}`;
};

const WatchlistTopicSearch = props => {
  const classes = useStyles();
  const { selectedSymbols, setWatchlistSelectedSymbols } = props;
  const [availableSymbols, setAvailableSymbols] = useState([]);
  const { completeCompaniesData, completeCompaniesDataGlobal } = useSelector(
    state => state.Watchlist
  );



  const handleSearchTextChange = debounce(async (text, e) => {


    const searchabletext = text.toLowerCase();
    const filteredWatchlist = completeCompaniesData
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

  // useEffect(() => {
  //   if (availableSymbols.length === 0) {
  //     const filteredWatchlist = completeCompaniesData
  //       .concat(completeCompaniesDataGlobal)
  //       .slice(0, 100)
  //       .filter(c => get(c, 'b', '') || get(c, 'ticker', ''))
  //       .map(c => ({ ticker: c.ticker, name: c.b ? c.b : '', code: c.co ? c.co : '', type: c.type }));

  //     setAvailableSymbols(filteredWatchlist);
  //   }
  // }, [completeCompaniesData, completeCompaniesDataGlobal, availableSymbols.length]);

  return (
    <FormControl className={classes.formControl}>
      <Autocomplete
        disableClearable={true}
        multiple
        id="watchlist-topic-search"
        loading={true}
        disableCloseOnSelect
        onChange={selectionChanged}
        onClose={() => setAvailableSymbols([])}
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
