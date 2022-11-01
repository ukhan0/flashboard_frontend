import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


import { setWatchlistTopicTab, setWatchlistSelectedSymbols } from '../../../reducers/Watchlist';

const WatchlistTopicTabs = () => {
  const disptach = useDispatch();
  const { selectedTab } = useSelector(state => state.Watchlist);

  const handleTabChange = (e, newValue) => {
    disptach(setWatchlistSelectedSymbols([]));
    disptach(setWatchlistTopicTab(newValue));
  };

  return (
    <Tabs
      value={selectedTab}
      indicatorColor="secondary"
      textColor="primary"
      variant="fullWidth"
      onChange={handleTabChange}>
      <Tab className="p-3" label="Search" />
      <Tab className="p-3" label="Upload .CSV" />
      <Tab className="p-3" label="Paste" />
    </Tabs>
  );
};

export default WatchlistTopicTabs;
