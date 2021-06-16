import React from 'react';
import { useSelector } from 'react-redux';
import TopicSectorIndustry from './TopicSectorIndustry';
import TopicWatchlistDropDown from './TopicWatchlistDropDown';
import TopicCustomSearch from './TopicCustomSearch';


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
    case 'custom':
      component = (
        <TopicCustomSearch/>
      );
      break;
    default:
      component = null;
      break;
  }
  return component;
};

export default TopicUniverseSubFilters;
