import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FormControl, Chip, TextField } from '@material-ui/core';
import useStyles from './WatchlistTopicStyles';
import { debounce, get } from 'lodash';
import { setWatchlistSelectedSymbols } from '../../../reducers/Watchlist';

const createOptionLabel = option => {
  return `${option.ticker} - ${option.name} ${option.code ? `- ${option.code}` : ''} `;
};

const WatchlistTopicSearch = () => {
  const disptach = useDispatch();
  const classes = useStyles();
  const [availableSymbols, setAvailableSymbols] = useState([]);
  const { completeCompaniesData, completeCompaniesDataGlobal } = useSelector(state => state.Watchlist);

  const getSearchFilteredData = (dataArray, textToSearch) => {
    textToSearch = textToSearch.toLowerCase();
    return dataArray
      .filter(
        c =>
          get(c, 'b', '')
            .toLowerCase()
            .includes(textToSearch) ||
          get(c, 'ticker', '')
            .toLowerCase()
            .includes(textToSearch)
      )
      .map(c => ({ ticker: c.ticker, name: c.b ? c.b : '', code: c.co ? c.co : '', type: c.type }));
  };


  const handleSearchTextChange = debounce(async (text, e) => {

    if (!text || text.length < 1) {
      return;
    }

    let filteredWatchlist = getSearchFilteredData(completeCompaniesData, text);
    if (filteredWatchlist.length < 1) {
      filteredWatchlist = getSearchFilteredData(completeCompaniesDataGlobal, text);
    }
    setAvailableSymbols(filteredWatchlist);
  }, 800);

  const selectionChanged = (e, newSelectedSymbols) => {
    disptach(setWatchlistSelectedSymbols(newSelectedSymbols));
  };

  useEffect(() => {
    if (availableSymbols.length === 0) {
      const filteredWatchlist = completeCompaniesData
        .concat(completeCompaniesDataGlobal)
        .slice(0, 50)
        .filter(c => get(c, 'b', '') || get(c, 'ticker', ''))
        .map(c => ({ ticker: c.ticker, name: c.b ? c.b : '', code: c.co ? c.co : '', type: c.type }));

      setAvailableSymbols(filteredWatchlist);
    }
  }, [completeCompaniesData, completeCompaniesDataGlobal, availableSymbols.length]);

  return (
    <FormControl className={classes.formControl}>
      <Autocomplete
        disableClearable={true}
        multiple
        id="watchlist-topic-search"
        loading={true}
        disableCloseOnSelect
        onChange={selectionChanged}
        options={availableSymbols}
        getOptionLabel={option => createOptionLabel(option)}
        // defaultValue={selectedSymbols}
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

export default WatchlistTopicSearch;
