import React from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from '@material-ui/core';
import { setWatchlistTopicTab } from '../../../reducers/Watchlist';

const WatchlistTopicTabs = props => {
  const { selectedTab, setWatchlistTopicTab } = props;

  const handleTabChange = (e, newValue) => {
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
  setWatchlistTopicTab: value => dispatch(setWatchlistTopicTab(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(WatchlistTopicTabs);
