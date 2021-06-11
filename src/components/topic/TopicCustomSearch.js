import React, { useState } from 'react';
import axios from 'axios';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FormControl, TextField } from '@material-ui/core';
import useStyles from '../watchlist/watchlistStyles';
import config from '../../config/config';
import { debounce, get } from 'lodash';
import { useDispatch } from 'react-redux';
import { setSelectedWatchlistCompanyName } from '../../reducers/Topic';

const createOptionLabel = option => {
  return `${option.ticker} - ${option.name}`;
};

const TopicCustomSearch = props => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [availableCompanyNames, setAvailableCompanyNames] = useState([]);

  const handleSearchTextChange = debounce(async text => {
    try {
      setLoading(true);
      const response = await axios.post(`${config.apiUrl}/api/get_wish_list_items`, { q: text });
      const companies = get(response, 'data.data', []);
      setAvailableCompanyNames(companies);
      setLoading(false);
    } catch (error) {
      // log exception here
      setLoading(false);
    }
  }, 1000);

  const selectionChanged = (e, newSelectedCompany) => {
    if (newSelectedCompany) {
      setSelectedValue(newSelectedCompany);
      dispatch(setSelectedWatchlistCompanyName(newSelectedCompany.name));
    }
  };

  return (
    <FormControl className={classes.formControl}>
      <Autocomplete
        loading={loading}
        loadingText={'Loading...'}
        className={classes.searchField}
        onChange={selectionChanged}
        options={availableCompanyNames}
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
export default TopicCustomSearch;