import React from 'react';
import { ButtonGroup, Button } from '@material-ui/core';
import { metricsSelection } from '../../config/filterTypes';
import { setSelectedSection } from '../../reducers/Topic';
import { useSelector, useDispatch } from 'react-redux';

const TopicSectionGroup = () => {
  const { selectedSection } = useSelector(state => state.Topic);
  const dispatch = useDispatch();

  const handleSectionChange = sectionKey => {
    dispatch(setSelectedSection(sectionKey));
  };

  return (
    <ButtonGroup color="primary">
      {metricsSelection.map((mertric, i) => (
        <Button
          disabled={false}
          size="medium"
          key={`uni_${i}`}
          onClick={() => handleSectionChange(mertric.key)}
          variant={selectedSection === mertric.key ? 'contained' : 'outlined'}>
          {mertric.label}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default TopicSectionGroup;
