import React, { useState } from 'react';
import axios from 'axios';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FormControl, TextField, Chip } from '@material-ui/core';
import useStyles from '../watchlist/watchlistStyles';
import config from '../../config/config';
import { debounce, get } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedWatchlistCompanyNames } from '../../reducers/Topic';

const createOptionLabel = option => {
  return `${option.ticker} - ${option.name}`;
};
const createOptionLabelWithTicker = option => {
  return `${option.ticker}`;
};

const TopicCustomSearch = props => {
  const { selectedWatchlistCompanyNames } = useSelector(state => state.Topic);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
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

  const selectionChanged = (e, newSelectedCompanies) => {
    if (newSelectedCompanies) {
      let companies = newSelectedCompanies.map(c => c.name);
      dispatch(setSelectedWatchlistCompanyNames(companies));
    }
  };

  return (
    <FormControl className={classes.formControl}>
      <Autocomplete
        multiple
        id="topic-custom-search"
        loading={loading}
        onChange={selectionChanged}
        options={availableCompanyNames}
        getOptionLabel={option => createOptionLabel(option)}
        defaultValue={selectedWatchlistCompanyNames}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => <Chip label={createOptionLabelWithTicker(option)} {...getTagProps({ index })} />)
        }
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
