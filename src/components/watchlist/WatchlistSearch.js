import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FormControl, TextField } from '@material-ui/core';
import useStyles from './watchlistStyles';
import { debounce, get } from 'lodash';
import {
  setSelectedTickerSymbol,
  setSelectedWatchlist,
  setIsTickerSelected
} from '../../reducers/Watchlist';
import { setSentimentResult } from '../../reducers/Sentiment';
import { getCompanyByIndex } from '../watchlist/WatchlistHelpers';
import { useHistory } from 'react-router-dom';

const createOptionLabel = option => {
  return `${option.ticker} - ${option.name} ${option.code ? `- ${option.code}` : ''} `;
};

const WatchlistTopicSearch = props => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [availableSymbols, setAvailableSymbols] = useState([]);
  const {
    selectedTickerSymbol,
    selectedFileType,
    completeCompaniesData,
    completeCompaniesDataGlobal
  } = useSelector(state => state.Watchlist);

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

  const handleSearchTextChange = debounce(async text => {
    if (!text || text.length < 1) {
      return;
    }
    setLoading(true);
    let filteredWatchlist = getSearchFilteredData(completeCompaniesData, text);
    if (filteredWatchlist.length < 1) {
      filteredWatchlist = getSearchFilteredData(completeCompaniesDataGlobal, text);
    }
    setAvailableSymbols(filteredWatchlist);

    setLoading(false);
  }, 0);

  const selectionChanged = async (e, newSelectedSymbol) => {
    if (newSelectedSymbol && newSelectedSymbol.ticker) {
      dispatch(setIsTickerSelected(true));
      dispatch(setSelectedTickerSymbol(newSelectedSymbol));

      let company = await getCompanyByIndex(newSelectedSymbol.ticker);
      company.recentId = selectedFileType === '10-K' ? company.recentId10k : company.recentId10q;
      company.oldId = selectedFileType === '10-K' ? company.oldId10k : company.oldId10q;
      company.documentType = selectedFileType;
      dispatch(setSentimentResult(null, null));
      dispatch(setSelectedWatchlist(company));
      setAvailableSymbols([]);
      setTimeout(() => {
        dispatch(setSelectedTickerSymbol(null));
        history.push('/filings');
      }, [300]);
    }
  };

  useEffect(() => {
    const filteredWatchlist = completeCompaniesData
      .concat(completeCompaniesDataGlobal)
      .slice(0, 100)
      .filter(c => get(c, 'b', '') || get(c, 'ticker', ''))
      .map(c => ({ ticker: c.ticker, name: c.b ? c.b : '', code: c.co ? c.co : '', type: c.type }));

    setAvailableSymbols(filteredWatchlist);
  }, [completeCompaniesData, completeCompaniesDataGlobal]);

  return (
    <FormControl className={classes.formControl}>
      <Autocomplete
        loading={loading}
        style={{ backgroundColor: 'white', borderRadius: '12px' }}
        loadingText={'Loading...'}
        className={classes.searchField}
        onChange={selectionChanged}
        options={availableSymbols}
        value={selectedTickerSymbol}
        closeIcon={false}
        getOptionLabel={option => createOptionLabel(option)}
        renderInput={params => (
          <TextField
            onBlur={() => { }}
            {...params}
            variant="outlined"
            placeholder="Type Company Name or Symbol"
            onChange={e => handleSearchTextChange(e.target.value)}
            fullWidth
            size="small"
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password'
            }}
          />
        )}
      />
    </FormControl>
  );
};

export default WatchlistTopicSearch;
