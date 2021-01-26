import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { get } from 'lodash';
import axios from 'axios';
import config from '../../config/config';
import cjson from 'compressed-json';
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
import { setSidebarDisplay } from '../../reducers/ThemeOptions';
import WatchlistTopicDialog from './WatchlistTopic/WatchlistTopicDialog';
import { connect } from 'react-redux';

// components
import WatchlistFilters from './WatchlistFilters';
import WatchlistTable from './WatchlistTable';
// styles
import useStyles from './watchlistStyles';
import WatchlistSearch from './WatchlistSearch';
import WatchlistActions from './WatchlistActions';
import { isObject } from 'lodash';

const compileTikcerData = selectedSymbols => {
  return selectedSymbols.map(s => (isObject(s) ? s.ticker : s));
};

const Watchlist = props => {
  const classes = useStyles();
  const [watchlistData, setWatchlistData] = useState([]);
  const [dataVersion, setDataVersion] = useState(1);
  const [topicDialogOpen, setTopicDialogOpen] = useState(false);
  const [topicAddingError, setTopicAddingError] = useState(false);
  const [loading, setLoading] = useState(false);
  const firstTimeLoad = useRef(true);

  const {
    selectedFileType,
    selectedUniverse,
    selectedMetric,
    setSelectedWatchlist,
    setSidebarDisplay,
    selectedSymbols
  } = props;

  const fetchData = useCallback(async () => {
    try {
      let rawData = [];
      if (selectedUniverse === 'recent' || selectedUniverse === 'all') {
        rawData = localStorage.getItem(`watchlist-data-${selectedUniverse}`);
        if (rawData) {
          rawData = cjson.decompress.fromString(rawData);
        }
      } else {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem('user'));
        const response = await axios.get(
          `${config.apiUrl}/api/get_saved_wish_list_raw?auth_token=${user.authentication_token}&user_id=${user.id}&subject=${selectedUniverse}`
        );
        rawData = get(response, 'data.data.content', []);
      }
      setWatchlistData(formatData(rawData));
      setLoading(false);
    } catch (error) {
      setLoading(false);
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
    setSidebarDisplay(true);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData, dataVersion]);

  useEffect(() => {
    firstTimeLoad.current = false;
  }, [])

  const handleUpload = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      const response = await axios.post(
        `${config.apiUrl}/api/save_wishlist_item`,
        {
          ticker_limit: 10000,
          alerts: false,
          elimiter: 'comma',
          watched_tickers: compileTikcerData(selectedSymbols),
          id: user.id,
          api_key: user.api_key,
          authentication_token: user.authentication_token
        }
      );
      const responsePayload = get(response, 'data', null);
      if (responsePayload && !responsePayload.error) {
        setTopicDialogOpen(false);
        setDataVersion(dataVersion + 1);
      } else {
        setTopicAddingError(true);
      }
    } catch (error) {
      setTopicAddingError(true);
    }
  };

  const gridData = firstTimeLoad.current ? null : processWatchlistData()

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
          {
            loading ?
              <Typography>Loading...</Typography>
              :
              null
          }
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
          data={gridData}
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
        error={topicAddingError}
        onUpload={handleUpload}
      />
    </>
  );
};

const mapStateToProps = state => ({
  selectedFileType: state.Watchlist.selectedFileType,
  selectedUniverse: state.Watchlist.selectedUniverse,
  selectedMetric: state.Watchlist.selectedMetric,
  selectedSymbols: state.Watchlist.selectedSymbols
});

const mapDispatchToProps = dispatch => ({
  setSelectedWatchlist: value => dispatch(setSelectedWatchlist(value)),
  setSidebarDisplay: value => dispatch(setSidebarDisplay(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Watchlist);
