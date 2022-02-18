import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { get, debounce } from 'lodash';
import { setHomePageSelectedItem, setIsLoading } from './../../reducers/HomePage';
import { useDispatch, useSelector } from 'react-redux';

export default function ComboBox() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [availableSymbols, setAvailableSymbols] = useState([]);
  const { homePageSelectedItem } = useSelector(state => state.HomePage);
  const { completeCompaniesData } = useSelector(state => state.Watchlist);

  const createOptionLabel = option => {
    let ticker = '';
    ticker = option.ticker;
    if (option.name) {
      ticker = `${option.ticker}-${option.name}`;
    }
    return ticker;
  };

  const handleSearchTextChange = debounce(async text => {
    if (!text || text.length < 1) {
      return;
    }

    const searchabletext = text.toLowerCase();
    setLoading(true);
    const filteredWatchlist = (completeCompaniesData || [])
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
      dispatch(setHomePageSelectedItem({ ticker: newSelectedSymbol.ticker }));
      dispatch(setIsLoading(true));
      setAvailableSymbols([]);
    }
  };
  return (
    <Autocomplete
      id="combo-box-demo"
      options={availableSymbols}
      getOptionLabel={option => createOptionLabel(option)}
      style={{ width: 200 }}
      loading={loading}
      loadingText={'Loading...'}
      onChange={selectionChanged}
      value={homePageSelectedItem.ticker ? homePageSelectedItem : null}
      closeIcon={false}
      renderInput={params => (
        <TextField
          {...params}
          label="TICKER"
          variant="outlined"
          placeholder="Type Company Name or Symbol"
          onChange={e => handleSearchTextChange(e.target.value)}
          fullWidth
          size="small"
        />
      )}
    />
  );
}
