import React, { useEffect, useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import Input from '@material-ui/core/Input';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedWatchlistCompanyNames } from '../../reducers/Topic';
import { getWatchlist } from '../watchlist/watchlistApiCalls';

const useStyles = makeStyles(theme => ({
  multiSelect: {
    width: '100%',
    height: '2.2rem'
  }
}));

const TopicWatchlistDropDown = props => {
  const classes = useStyles();
  const { selectedWatchlistCompanyNames } = useSelector(state => state.Topic);
  const dispatch = useDispatch();
  const [watchlistCompanies, setWatchlistCompanies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const rawData = await dispatch(getWatchlist('watchlist', ''));
      let selectAll = rawData.map(d => d.b);
      setWatchlistCompanies(selectAll);
      dispatch(setSelectedWatchlistCompanyNames(selectAll));
    };
    fetchData();
  }, [dispatch]);

  const handleSelectionChange = e => {
    dispatch(setSelectedWatchlistCompanyNames(e.target.value));
  };

  return (
    <Select
      labelId="TopicWatchListDropDownLabel"
      id="TopicWatchListDropDownId"
      multiple
      value={selectedWatchlistCompanyNames}
      onChange={handleSelectionChange}
      input={<Input />}
      renderValue={selectedValues => selectedValues.join(', ')}
      className={classes.multiSelect}>
      {watchlistCompanies.map(cmp => (
        <MenuItem key={cmp} value={cmp}>
          <Checkbox checked={selectedWatchlistCompanyNames.indexOf(cmp) > -1} />
          <ListItemText primary={cmp} />
        </MenuItem>
      ))}
    </Select>
  );
};

export default TopicWatchlistDropDown;
