import React from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from '@material-ui/core';
import {
  setWatchlistTopicTab,
  setWatchlistSelectedSymbols
} from '../../../reducers/Watchlist';

const WatchlistTopicTabs = props => {
  const {
    selectedTab,
    setWatchlistTopicTab,
    setWatchlistSelectedSymbols
  } = props;

  const handleTabChange = (e, newValue) => {
    setWatchlistSelectedSymbols([]);
    setWatchlistTopicTab(newValue);
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

const mapStateToProps = state => ({
  selectedTab: state.Watchlist.selectedTab
});

const mapDispatchToProps = dispatch => ({
  setWatchlistTopicTab: value => dispatch(setWatchlistTopicTab(value)),
  setWatchlistSelectedSymbols: value =>
    dispatch(setWatchlistSelectedSymbols(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(WatchlistTopicTabs);
