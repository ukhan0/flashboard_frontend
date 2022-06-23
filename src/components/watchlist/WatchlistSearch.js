import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FormControl, TextField } from '@material-ui/core';
import useStyles from './watchlistStyles';
import { debounce, get } from 'lodash';
import {
  setWatchlistSearchText,
  setSelectedTickerSymbol,
  setSelectedWatchlist,
  setIsTickerSelected,
  // setWatchlistType
} from '../../reducers/Watchlist';
import { setSentimentResult } from '../../reducers/Sentiment';
import { getCompanyByTickerUniverse } from '../Filings/FillingsHelper';
import { formatComapnyData } from '../watchlist/WatchlistHelpers';
import CloseIcon from '@material-ui/icons/Close';
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
    searchText,
    selectedFileType,
    isTickerSelected,
    completeCompaniesData,
    completeCompaniesDataGlobal
  } = useSelector(state => state.Watchlist);
  const data = completeCompaniesData.concat(completeCompaniesDataGlobal);
  const handleSearchTextChange = debounce(async text => {
    // free text search for Watchlist table
    if (!text || text.length < 1) {
      return;
    }
    const searchabletext = text.toLowerCase();
    setLoading(true);
    const filteredWatchlist = data
      .filter(
        c =>
          get(c, 'b', '')
            .toLowerCase()
            .includes(searchabletext) ||
          get(c, 'ticker', '')
            .toLowerCase()
            .includes(searchabletext)
      )
      .map(c => ({ ticker: c.ticker, name: c.b ? c.b : '', code: c.co ? c.co : '', type: c.type }));
    setAvailableSymbols(filteredWatchlist);
    setLoading(false);
  }, 500);

  const selectionChanged = async (e, newSelectedSymbol) => {
    if (newSelectedSymbol && newSelectedSymbol.ticker) {
      dispatch(setIsTickerSelected(true));
      dispatch(setSelectedTickerSymbol(newSelectedSymbol));
      // dispatch(setWatchlistType(newSelectedSymbol.type));
      // setTimeout(() => {
      //   dispatch(setWatchlistSearchText(newSelectedSymbol.ticker));
      // }, [100]);
      let selectedItem = getCompanyByTickerUniverse(newSelectedSymbol.ticker, data);
      let company = formatComapnyData(selectedItem);
      company.recentId = selectedFileType === '10k' ? company.recentId10k : company.recentId10q;
      company.oldId = selectedFileType === '10k' ? company.oldId10k : company.oldId10q;
      company.documentType = selectedFileType;
      dispatch(setSentimentResult(null, null));

      dispatch(setSelectedWatchlist(company));
      setAvailableSymbols([]);
      history.push('/filings');
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
        style={{ backgroundColor: 'white', borderRadius: '12px' }}
        loadingText={'Loading...'}
        className={classes.searchField}
        onChange={selectionChanged}
        options={availableSymbols}
        value={selectedTickerSymbol}
        closeIcon={
          <CloseIcon
            onClick={() => {
              dispatch(setWatchlistSearchText(''));
            }}
            fontSize="small"
          />
        }
        getOptionLabel={option => createOptionLabel(option)}
        renderInput={params => (
          <TextField
            onBlur={() => {
              if (!isTickerSelected) {
                dispatch(setWatchlistSearchText(''));
              }
            }}
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
