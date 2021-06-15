import React from 'react';
import { ButtonGroup, Button } from '@material-ui/core';
import { setSelectedUniverse, setSelectedSector, setSelectedWatchlistCompanyNames, setSelectedIndustries } from '../../reducers/Topic'
import { useSelector, useDispatch } from 'react-redux';

const TopicUniverseGroup = () => {
  
  const { selectedUniverse, selectedSector } = useSelector(state => state.Topic);
  const dispatch = useDispatch();
  let showSelectedSector = selectedSector ? selectedSector : 'Sector'

  const universeSelection = [
    { label: 'All', key: 'all', disabled: false },
    { label: 'Watchlist', key: 'watchlist', disabled: false },
    { label: showSelectedSector, key: 'sector', disabled:false },
    { label: 'Custom', key: 'custom', disabled:false }
  ];

  const handleUniverseSelection = (universeKey) => {
    if(universeKey === 'all') {
      dispatch(setSelectedSector(null))
      dispatch(setSelectedIndustries([]))
      dispatch(setSelectedWatchlistCompanyNames([]))
    } else if(universeKey === 'sector') {
      dispatch(setSelectedWatchlistCompanyNames([]))
    } else if(universeKey === 'watchlist') {
      dispatch(setSelectedWatchlistCompanyNames([]))
      dispatch(setSelectedSector(null))
      dispatch(setSelectedIndustries([]))
    } else if(universeKey === 'custom' ) {
      dispatch(setSelectedWatchlistCompanyNames([]))
      dispatch(setSelectedSector(null))
      dispatch(setSelectedIndustries([]))
    }
    dispatch(setSelectedUniverse(universeKey))
  }

  return (
    <ButtonGroup color="primary">
      {universeSelection.map((universe, i) => (
        <Button
          disabled={universe.disabled}
          size="medium"
          key={`uni_${i}`}
          onClick={() => handleUniverseSelection(universe.key)}
          variant={selectedUniverse === universe.key ? 'contained' : 'outlined'}>
          {universe.label}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default TopicUniverseGroup;
