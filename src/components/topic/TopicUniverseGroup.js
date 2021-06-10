import React from 'react';
import { ButtonGroup, Button } from '@material-ui/core';
import { setSelectedUniverse, setSelectedSector } from '../../reducers/Topic'
import { useSelector, useDispatch } from 'react-redux';

const TopicButtonGroup = () => {
  
  const { selectedUniverse } = useSelector(state => state.Topic);
  const dispatch = useDispatch();

  const universeSelection = [
    { label: 'All', key: 'all', disabled: false },
    { label: 'Watchlist', key: 'watchlist', disabled: true },
    { label: 'Sector', key: 'sector', disabled:false },
    { label: 'Custom', key: 'custom', disabled:true  }
  ];

  const handleUniverseSelection = (universeKey) => {
    if(universeKey === 'all') {
      dispatch(setSelectedSector(null))
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

export default TopicButtonGroup;
