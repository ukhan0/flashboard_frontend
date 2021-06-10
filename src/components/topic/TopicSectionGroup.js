import React from 'react';
import { ButtonGroup, Button } from '@material-ui/core';

const TopicSectionGroup = () => {
  const [selectedButton, setSelectedButton] = React.useState('all');
  
  const metricsSelection = [
    { label: 'Total', key: 'totdoc' },
    { label: 'MD&A', key: 'mda' },
    { label: 'Risk', key: 'rf' },
    { label: 'Notes', key: 'notes' }
  ];

  return (
    <ButtonGroup color="primary">
      {metricsSelection.map((mertric, i) => (
        <Button
          disabled={true}
          size="medium"
          key={`uni_${i}`}
          onClick={() => setSelectedButton(mertric.key)}
          variant={selectedButton === mertric.key ? 'contained' : 'outlined'}>
          {mertric.label}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default TopicSectionGroup;
