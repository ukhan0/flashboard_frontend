import React from 'react';
import { ButtonGroup, Button } from '@material-ui/core';
import { metricsSelection } from '../../config/filterTypes'

const TopicSectionGroup = () => {

  const [selectedButton, setSelectedButton] = React.useState('all');

  const handleSectionChange = (sectionKey) => {
    
  }

  return (
    <ButtonGroup color="primary">
      {metricsSelection.map((mertric, i) => (
        <Button
          disabled={false}
          size="medium"
          key={`uni_${i}`}
          onClick={() => handleSectionChange(mertric.key)}
          variant={selectedButton === mertric.key ? 'contained' : 'outlined'}>
          {mertric.label}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default TopicSectionGroup;
