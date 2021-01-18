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
import { setSelectedWatchlist } from '../../reducers/Watchlist';
import WatchlistTopicDialog from './WatchlistTopic/WatchlistTopicDialog';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

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
  const history = useHistory();

  const {
    selectedFileType,
    selectedUniverse,
    selectedMetric,
    setSelectedWatchlist
  } = props;

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
        last:
          selectedFileType === '10k' ? watchlist.last10k : watchlist.last10q,
        recentId:
          selectedFileType === '10k'
            ? watchlist['recentId10k']
            : watchlist['recentId10q'],
        oldId:
          selectedFileType === '10k'
            ? watchlist['oldId10k']
            : watchlist['oldId10q']
      };
      delete data['10k'];
      delete data['10q'];
      filteredData.push(data);
    });
    return filteredData;
  }, [selectedFileType, selectedMetric, watchlistData]);

  const onColumnClick = rowData => {
    setSelectedWatchlist(rowData);
    history.push('/comparision');
  };

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
          onColumnClick={onColumnClick}
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

const mapDispatchToProps = dispatch => ({
  setSelectedWatchlist: value => dispatch(setSelectedWatchlist(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Watchlist);
