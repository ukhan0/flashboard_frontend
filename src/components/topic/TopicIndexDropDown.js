import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce, get } from 'lodash';
import { setSearchIndex, setSelectedDocumentTypes } from '../../reducers/Topic';
import searchIndexs from '../../config/searchIndexs';
import TopicSearchDropDown from './TopicSearchDropDown';
const createOptionLabel = option => {
  return `${option.label}`;
};

const TopicIndexDropDown = props => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [availableSymbols, setAvailableSymbols] = useState(searchIndexs);
  const { searchIndex, documentTypes } = useSelector(state => state.Topic);
  const handleSearchTextChange = debounce(async text => {
    const searchabletext = text.toLowerCase();
    setLoading(true);
    const filteredWatchlist = searchIndexs
      .filter(c =>
        get(c, 'label', '')
          .toLowerCase()
          .includes(searchabletext)
      )
      .map(c => ({ label: c.label, value: c.value }));
    setAvailableSymbols(filteredWatchlist);
    setLoading(false);
  }, 200);

  const selectionChanged = async (e, newSelectedSymbol) => {
    if (newSelectedSymbol && newSelectedSymbol.value) {
      dispatch(setSearchIndex(newSelectedSymbol));
      let documentTypeValue = documentTypes.map(ee => ee.value);
      dispatch(setSelectedDocumentTypes(documentTypeValue));
      setAvailableSymbols([]);
    }
  };
  return (
    <TopicSearchDropDown
      selectionChanged={selectionChanged}
      handleSearchTextChange={handleSearchTextChange}
      selectedValue={searchIndex}
      availableSymbols={availableSymbols}
      createOptionLabel={createOptionLabel}
      loading={loading}
    />
  );
};

export default TopicIndexDropDown;
