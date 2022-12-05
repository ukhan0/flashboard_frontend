import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import useStyles from './watchlistStyles';
import { debounce, get } from 'lodash';
import { setSelectedWatchlist } from '../../reducers/Watchlist';
import { getCompanyByIndex, getCompanyByCompanyId } from '../watchlist/WatchlistHelpers';
import { useHistory } from 'react-router-dom';

const createOptionLabel = option => {
  return `${option.ticker} - ${option.name} ${option.code ? `- ${option.code}` : ''} `;
};

const WatchlistTopicSearch = () => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [availableSymbols, setAvailableSymbols] = useState([]);
  const [selectedTickerSymbol, setSelectedTickerSymbol] = useState(null);
  const { selectedFileType, completeCompaniesData, completeCompaniesDataGlobal } = useSelector(
    state => state.Watchlist
  );

  const combineData = useMemo(() => {
    return completeCompaniesData.concat(completeCompaniesDataGlobal);
  }, [completeCompaniesData, completeCompaniesDataGlobal]);

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
      .map(c => ({ ticker: c.ticker, name: c.b ?? '', code: c.co ?? '', companyId: c.cu }));
  };

  const handleSearchTextChange = debounce(async text => {
    if (!text || text.length < 1) {
      return;
    }
    let filteredWatchlist = getSearchFilteredData(combineData, text);
    setAvailableSymbols(filteredWatchlist);
  }, 250);

  const selectionChanged = async (e, newSelectedSymbol) => {
    if (newSelectedSymbol) {
      setSelectedTickerSymbol(newSelectedSymbol);
      let company = null;
      if (newSelectedSymbol.companyId && newSelectedSymbol.companyId !== '0') {
        company = await getCompanyByCompanyId(
          newSelectedSymbol.companyId,
          completeCompaniesData,
          completeCompaniesDataGlobal
        );
      } else if (newSelectedSymbol.ticker) {
        company = await getCompanyByIndex(newSelectedSymbol.ticker, completeCompaniesData, completeCompaniesDataGlobal);
      }
      if (company) {
        company.recentId = selectedFileType === '10-K' ? company.recentId10k : company.recentId10q;
        company.oldId = selectedFileType === '10-K' ? company.oldId10k : company.oldId10q;
        company.documentType = selectedFileType;
        dispatch(setSelectedWatchlist(company));
        setAvailableSymbols([]);
        setTimeout(() => {
          setSelectedTickerSymbol(null);
          history.push('/filings');
        }, [100]);
      }
    }
  };

  const getAvailableSymbols = useCallback(() => {
    const filteredWatchlist = combineData
      .slice(0, 100)
      .filter(c => get(c, 'b', '') || get(c, 'ticker', ''))
      .map(c => ({ ticker: c.ticker, name: c.b ?? '', code: c.co ?? '', companyId: c.cu }));

    setAvailableSymbols(filteredWatchlist);
  }, [combineData]);

  useEffect(() => {
    if (availableSymbols.length === 0) {
      getAvailableSymbols();
    }
  }, [availableSymbols.length, getAvailableSymbols]);

  return (
    <FormControl className={classes.formControl}>
      <Autocomplete
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
            onBlur={getAvailableSymbols}
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
