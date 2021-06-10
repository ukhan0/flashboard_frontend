import React from 'react';
import { useSelector } from 'react-redux';
import TopicSectorDropDown from './TopicSectorDropDown';

const TopicUniverseSubFilters = props => {
  const { selectedUniverse } = useSelector(state => state.Topic);

  let component = null;
  switch (selectedUniverse) {
    case 'all':
      component = null;
      break;
    case 'watchlist':
      component = null;
      break;
    case 'sector':
      component = (
        <TopicSectorDropDown />
      );
      break;
    case 'Custom':
      component = null;
      break;
    default:
      component = null;
      break;
  }
  return component;
};

export default TopicUniverseSubFilters;
