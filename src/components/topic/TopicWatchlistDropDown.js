import React, { useEffect, useState } from 'react';
import { MenuItem, ListItemText, Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedWatchlistCompanyName } from '../../reducers/Topic';
import watchlistApiCalls from '../watchlist/watchlistApiCalls'
import Select from 'react-select';

const useStyles = makeStyles(theme => ({
  singleSelect: {
    width: '100%',
    height: '2.2rem',
  },
}));

const TopicWatchlistDropDown = props => {
  const classes = useStyles()
  const { selectedWatchlistCompanyName } = useSelector(state => state.Topic);
  const dispatch = useDispatch();
  const [watchlistCompanies, setWatchlistCompanies] = useState([])
  const [selectedCompany, setSelectedCompany] =  useState(selectedWatchlistCompanyName ? {value: selectedWatchlistCompanyName, label: selectedWatchlistCompanyName} : null)

  useEffect(() => {
    const fetchData = async () => {
      const rawData = await watchlistApiCalls.getWatchlist('watchlist', '')
      setWatchlistCompanies(rawData.map(d => ({value: d.b, label: d.b})))
    }
    fetchData()
  }, []);

  const handleSelectionChange = (newSelectedCompany) => {
    setSelectedCompany(newSelectedCompany)
    console.log(newSelectedCompany)
    let newValue = null
    if(newSelectedCompany) {
      newValue = newSelectedCompany.value
    }
    dispatch(setSelectedWatchlistCompanyName(newValue))
  }

  return (
    <Select
      isClearable={true}
      isSearchable={true}
      value={selectedCompany}
      onChange={handleSelectionChange}
      className={classes.singleSelect}
      options={watchlistCompanies}
    />
     
  );
};

export default TopicWatchlistDropDown;
