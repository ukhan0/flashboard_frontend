import React from 'react';
import { useSelector } from 'react-redux';
import TopicSectorIndustry from './TopicSectorIndustry';
import TopicWatchlistDropDown from './TopicWatchlistDropDown';


const TopicUniverseSubFilters = props => {
  const { selectedUniverse } = useSelector(state => state.Topic);

  let component = null;
  switch (selectedUniverse) {
    case 'all':
      component = null;
      break;
    case 'watchlist':
      component = (
        <TopicWatchlistDropDown />
      );
      break;
    case 'sector':
      component = (
        <TopicSectorIndustry/>
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
