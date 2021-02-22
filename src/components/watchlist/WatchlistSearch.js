import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FormControl, TextField } from '@material-ui/core';
import useStyles from './watchlistStyles';
import config from '../../config/config';
import { debounce, get } from 'lodash';
import { setWatchlistSelectedSymbols } from '../../reducers/Watchlist';

const createOptionLabel = option => {
  return `${option.ticker} - ${option.name}`;
};

const WatchlistTopicSearch = props => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  // const { selectedSymbols, setWatchlistSelectedSymbols } = props;
  const [availableSymbols, setAvailableSymbols] = useState([]);

  const handleSearchTextChange = debounce(async text => {
    try {
      console.log(loading);
      setLoading(true);
      const response = await axios.post(`${config.apiUrl}/api/get_wish_list_items`, { q: text });
      const symbolCodes = get(response, 'data.data', []);
      setAvailableSymbols(symbolCodes);
      setLoading(false);
    } catch (error) {
      // log exception here
      setLoading(false);
    }
  }, 1000);

  const selectionChanged = async (e, newSelectedSymbol) => {
    if (newSelectedSymbol && newSelectedSymbol.ticker) {
      setDisabled(true);
      setSelectedValue(newSelectedSymbol);
      await props.handleUpload(newSelectedSymbol.ticker);
      setDisabled(false);
      setSelectedValue(null);
      setAvailableSymbols([]);
    }
  };

  return (
    <FormControl className={classes.formControl}>
      <Autocomplete
        disabled={disabled}
        loading={loading}
        loadingText={'Loading...'}
        className={classes.searchField}
        onChange={selectionChanged}
        options={availableSymbols}
        value={selectedValue}
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

const mapStateToProps = state => ({
  selectedSymbols: state.Watchlist.selectedSymbols
});

const mapDispatchToProps = dispatch => ({
  setWatchlistSelectedSymbols: value => dispatch(setWatchlistSelectedSymbols(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(WatchlistTopicSearch);
