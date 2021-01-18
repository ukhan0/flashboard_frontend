import React, { useState, useEffect, useCallback } from 'react';
import { Grid } from '@material-ui/core';
import { get } from 'lodash';
import axios from 'axios';
import config from '../../config/config';
import {
  formatData,
  storeColumnsState,
  storeSortingsState,
  storeFilteringState,
  getColumnState,
  getSortingState,
  getFilteringState
} from './WatchlistHelpers';
import WatchlistTopicDialog from './WatchlistTopic/WatchlistTopicDialog';
import testData from './testData';
import { connect } from 'react-redux';

// components
import WatchlistFilters from './WatchlistFilters';
import WatchlistTable from './WatchlistTable';
// styles
import useStyles from './watchlistStyles';
import WatchlistSearch from './WatchlistSearch';
import WatchlistActions from './WatchlistActions';

const Watchlist = props => {
  const classes = useStyles();
  const [watchlistData, setWatchlistData] = useState([]);
  const [topicDialogOpen, setTopicDialogOpen] = useState(false);
  const { selectedFileType, selectedUniverse, selectedMetric } = props;

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        `${config.apiUrl}/api/get_saved_wish_list_raw?subject=${selectedUniverse}`
      );
      setWatchlistData(formatData(get(response, 'data.data.content', [])));
      // setWatchlistData(formatData(get(testData, 'data.content', [])));
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
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-end">
        <Grid item>
          <WatchlistFilters />
        </Grid>
        <Grid item>
          <WatchlistSearch />
        </Grid>
        <Grid item>
          <WatchlistActions onTopicSelection={() => setTopicDialogOpen(true)} />
        </Grid>
      </Grid>
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
      <WatchlistTopicDialog
        open={topicDialogOpen}
        onClose={() => setTopicDialogOpen(false)}
        onUpload={() => console.log('upload topics')}
      />
    </>
  );
};

const mapStateToProps = state => ({
  selectedFileType: state.Watchlist.selectedFileType,
  selectedUniverse: state.Watchlist.selectedUniverse,
  selectedMetric: state.Watchlist.selectedMetric
});

export default connect(mapStateToProps)(Watchlist);
