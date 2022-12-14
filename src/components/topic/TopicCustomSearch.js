import React, { useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import useStyles from '../watchlist/watchlistStyles';
import { debounce } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedWatchlistCompanyNames } from '../../reducers/Topic';

const createOptionLabel = option => {
  return `${option.ticker} - ${option.name}`;
};

const TopicCustomSearch = props => {
  const { selectedWatchlistCompanyNames } = useSelector(state => state.Topic);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [availableCompanyNames, setAvailableCompanyNames] = useState([]);
  const { completeCompaniesData, completeCompaniesDataGlobal } = useSelector(state => state.Watchlist);
  const { searchIndex } = useSelector(state => state.Topic);

  const data =
    searchIndex.id === 1
      ? completeCompaniesData.concat(completeCompaniesDataGlobal)
      : searchIndex.id === 2
        ? completeCompaniesData
        : completeCompaniesDataGlobal;
  const availableCompanies = data.map(e => {
    return { name: e.b, ticker: e.ticker };
  });
  const createOptionLabelWithTicker = option => {
    let ticker = null;
    let comp = availableCompanies.find(v => v.name.toLowerCase() === option.toLowerCase());
    if (comp) {
      ticker = comp['ticker'];
    }
    return ticker;
  };

  const handleSearchTextChange = debounce(async text => {
    try {
      setLoading(true);
      setAvailableCompanyNames(availableCompanies);
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
        style={{ width: '321px' }}
        multiple
        id="topic-custom-search"
        loading={loading}
        onChange={selectionChanged}
        options={availableCompanyNames}
        getOptionLabel={option => createOptionLabel(option)}
        defaultValue={selectedWatchlistCompanyNames}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              label={createOptionLabelWithTicker(option['name'] ? option['name'] : option)}
              {...getTagProps({ index })}
            />
          ))
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
