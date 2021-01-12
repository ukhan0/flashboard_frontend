import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import config from '../../config/config';
import { get } from 'lodash';
import {
  formatData,
  storeColumnsState,
  storeSortingsState,
  storeFilteringState,
  getColumnState,
  getSortingState,
  getFilteringState
} from './WatchlistHelpers';
import testData from './testData';
import { connect } from 'react-redux';

// components
import WatchlistFilters from './WatchlistFilters';
import WatchlistTable from './WatchlistTable';
// styles
import useStyles from './watchlistStyles';

const Watchlist = props => {
  const classes = useStyles();
  const [watchlistData, setWatchlistData] = useState([]);
  const { selectedFileType, selectedUniverse, selectedMetric } = props;

  const fetchData = useCallback(async () => {
    try {
      // const response = await axios.get(
      //   `${config.apiUrl}/get_saved_wish_list2?subject=${selectedUniverse}`
      // );
      // setWatchlistData(formatData(get(response, 'data.data.content', [])));
      setWatchlistData(formatData(get(testData, 'data.content', [])));
    } catch (error) {
      // log exception here
    }
  }, [selectedUniverse]);

  const processWatchlistData = useCallback(() => {
    const filteredData = [];
    watchlistData.forEach(watchlist => {
      const data = {
        ...watchlist,
        ...watchlist[selectedFileType][selectedMetric],
        last: selectedFileType === '10k' ? watchlist.last10k : watchlist.last10q
      };
      delete data['10k'];
      delete data['10q'];
      filteredData.push(data);
    });
    return filteredData;
  }, [selectedFileType, selectedMetric, watchlistData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <WatchlistFilters />
      <div className={classes.watchlistTableContainer}>
        <WatchlistTable
          data={processWatchlistData()}
          storeColumnsState={storeColumnsState}
          storeSortingsState={storeSortingsState}
          storeFilteringState={storeFilteringState}
          columnsState={getColumnState()}
          sortingState={getSortingState()}
          filteringState={getFilteringState()}
        />
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  selectedFileType: state.Watchlist.selectedFileType,
  selectedUniverse: state.Watchlist.selectedUniverse,
  selectedMetric: state.Watchlist.selectedMetric
});

export default connect(mapStateToProps)(Watchlist);
