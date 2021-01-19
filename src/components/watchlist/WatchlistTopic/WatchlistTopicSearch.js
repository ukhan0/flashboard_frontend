import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FormControl, Chip, TextField } from '@material-ui/core';
import useStyles from './WatchlistTopicStyles';
import config from '../../../config/config';
import { debounce, get } from 'lodash';
import { setWatchlistSelectedSymbols } from '../../../reducers/Watchlist';

const WatchlistTopicSearch = props => {
  const classes = useStyles();
  const { selectedSymbols, setWatchlistSelectedSymbols } = props;
  const [availableSymbols, setAvailableSymbols] = useState([]);

  const handleSearchTextChange = debounce(async text => {
    try {
      const response = await axios.post(
        `${config.apiUrl}/api/get_wish_list_items`,
        { q: text }
      );
      const symbolCodes = get(response, 'data.data', []).map(d => d.ticker);
      setAvailableSymbols(symbolCodes);
    } catch (error) {
      // log exception here
    }
  }, 1000);

  const selectionChanged = (e, newSelectedSymbols) => {
    setWatchlistSelectedSymbols(newSelectedSymbols);
  };

  return (
    <FormControl className={classes.formControl}>
      <Autocomplete
        multiple
        id="watchlist-topic-search"
        onChange={selectionChanged}
        options={availableSymbols}
        getOptionLabel={option => option}
        defaultValue={selectedSymbols}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={params => (
          <TextField
            {...params}
            label="Symbol"
            variant="outlined"
            placeholder="Type Symbol here"
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
  setWatchlistSelectedSymbols: value =>
    dispatch(setWatchlistSelectedSymbols(value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WatchlistTopicSearch);
