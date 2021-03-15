import React from 'react';
import { ButtonGroup, Button } from '@material-ui/core';

const TopicButtonGroup = () => {
  const [selectedButton, setSelectedButton] = React.useState('all');
  const universeSelection = [
    { label: 'All', key: 'all' },
    { label: 'Watchlist', key: 'watchlist' },
    { label: 'Sector', key: 'Sector' },
    { label: 'Custom', key: 'custom' }
  ];

  return (
    <ButtonGroup color="primary">
      {universeSelection.map((universe, i) => (
        <Button
          size="medium"
          key={`uni_${i}`}
          onClick={() => setSelectedButton(universe.key)}
          variant={selectedButton === universe.key ? 'contained' : 'outlined'}>
          {universe.label}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default TopicButtonGroup;
