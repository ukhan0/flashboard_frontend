import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce, get } from 'lodash';
import countriesCode from '../../config/countriesCode';
import { setSelectedCountry } from '../../reducers/Topic';
import TopicSearchDropDown from './TopicSearchDropDown';
const createOptionLabel = option => {
  return `${option.name}`;
};

const TopicCountryDropDown = props => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [availableSymbols, setAvailableSymbols] = useState(countriesCode);
  const { selectedCountry } = useSelector(state => state.Topic);
  const handleSearchTextChange = debounce(async text => {
    if (!text) {
      onClose();
    }
    const searchabletext = text.toLowerCase();
    setLoading(true);
    const filteredWatchlist = countriesCode
      .filter(c =>
        get(c, 'name', '')
          .toLowerCase()
          .includes(searchabletext)
      )
      .map(c => ({ name: c.name, code: c.code }));
    setAvailableSymbols(filteredWatchlist);
    setLoading(false);
  }, 200);

  const selectionChanged = async (e, newSelectedSymbol) => {
    if (newSelectedSymbol && newSelectedSymbol.code) {
      dispatch(setSelectedCountry(newSelectedSymbol));
      setAvailableSymbols([]);
    }
  };
  const onClose = () => {
    dispatch(setSelectedCountry(null));
    setAvailableSymbols(countriesCode);
  };

  return (
    <TopicSearchDropDown
      selectionChanged={selectionChanged}
      handleSearchTextChange={handleSearchTextChange}
      availableSymbols={availableSymbols}
      selectedValue={selectedCountry}
      createOptionLabel={createOptionLabel}
      loading={loading}
      closeIcon={true}
      onClose={onClose}
      placeholder={'Type Country Name'}
    />
  );
};

export default TopicCountryDropDown;
