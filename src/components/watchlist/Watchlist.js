import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Grid, Button } from '@material-ui/core';
import { get } from 'lodash';
import axios from 'axios';
import config from '../../config/config';
import cjson from 'compressed-json';
import {
  formatData,
  storeColumnsState,
  storeFilteringState,
  getColumnState,
  getFilteringState,
  checkIsFilterActive,
  checkIsSortActive
} from './WatchlistHelpers';
import {
  setSelectedWatchlist,
  setWatchlistSelectedSymbols,
  setOverwriteCheckBox,
  setCount
} from '../../reducers/Watchlist';
import { setSidebarDisplay } from '../../reducers/ThemeOptions';
import WatchlistTopicDialog from './WatchlistTopic/WatchlistTopicDialog';
import { connect } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import WatchlistService from './WatchlistService';
import Snackbar from '../Snackbar';
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
  const [isFilterActive, setIsFilterActive] = useState(checkIsFilterActive());
  const [isSortActive, setIsSortActive] = useState(checkIsSortActive());
  const [dataVersion, setDataVersion] = useState(1);
  const [topicDialogOpen, setTopicDialogOpen] = useState(false);
  const [topicAddingError, setTopicAddingError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addTickersnackbar, setAddTickersnackbar] = React.useState(false);
  const [removeTickersnackbar, setRemoveTickersnackbar] = React.useState(false);
  const [errorSnackbar, setErrorSnackbar] = React.useState(false);
  const firstTimeLoad = useRef(true);

  const {
    selectedFileType,
    selectedUniverse,
    overwriteCheckBox,
    selectedMetric,
    setSelectedWatchlist,
    setSidebarDisplay,
    selectedSymbols,
    setWatchlistSelectedSymbols,
    setOverwriteCheckBox,
    count,
    setCount
  } = props;

  const fetchData = useCallback(async () => {
    try {
      let rawData = [];
      if (selectedUniverse === 'all') {
        rawData = localStorage.getItem(`watchlist-data-${selectedUniverse}`);
        if (rawData) {
          rawData = cjson.decompress.fromString(rawData);
        }
      } else {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem('user'));
        const response = await axios.get(
          `${config.apiUrl}/api/get_saved_wish_list_raw?auth_token=${user.authentication_token}&user_id=${user.id}&subject=${selectedUniverse}&doc_type=${selectedFileType}`
        );
        rawData = get(response, 'data.data.content', []);
      }

      if (rawData.length === 0 && selectedUniverse === 'watchlist' && count === 0) {
        setTopicDialogOpen(true);
        setCount(count + 1);
      }
      setWatchlistData(formatData(rawData));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      // log exception here
    }
  }, [selectedUniverse, selectedFileType, count, setCount]);

  const processWatchlistData = useCallback(() => {
    const filteredData = [];
    watchlistData.forEach(watchlist => {
      const data = {
        ...watchlist,
        ...watchlist[selectedFileType][selectedMetric],
        last: selectedFileType === '10k' ? watchlist.last10k : watchlist.last10q,
        recentId: selectedFileType === '10k' ? watchlist['recentId10k'] : watchlist['recentId10q'],
        oldId: selectedFileType === '10k' ? watchlist['oldId10k'] : watchlist['oldId10q']
      };
      delete data['10k'];
      delete data['10q'];
      filteredData.push(data);
    });
    return filteredData;
  }, [selectedFileType, selectedMetric, watchlistData]);

  const onColumnClick = (rowData, columnId) => {
    if (columnId === 'actions') {
      if (rowData.isTickerActive) {
        // remove ticker
        deleteTicker(rowData.ticker);
        setSelectedWatchlist(rowData);
      } else {
        // add ticker
        handleUpload(rowData.ticker);
        setSelectedWatchlist(rowData);
      }
    } else {
      setSelectedWatchlist(rowData);
      setSidebarDisplay(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData, dataVersion]);

  useEffect(() => {
    firstTimeLoad.current = false;
  }, []);

  const deleteTicker = async ticker => {
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      const response = await axios.post(`${config.apiUrl}/api/delete_wishlist_item`, {
        tickers: ticker ? ticker : compileTikcerData(selectedSymbols).join(','),
        id: user.id,
        api_key: user.api_key,
        authentication_token: user.authentication_token
      });
      const responsePayload = get(response, 'data', null);
      if (responsePayload && !responsePayload.error) {
        setTopicDialogOpen(false);
        setDataVersion(dataVersion + 1);
        setRemoveTickersnackbar(true);
      } else {
        setTopicAddingError(true);
        setErrorSnackbar(true);
      }
    } catch (error) {
      setTopicAddingError(true);
      setErrorSnackbar(true);
    }
  };

  const handleUpload = async ticker => {
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      const response = await axios.post(`${config.apiUrl}/api/save_wishlist_item`, {
        ticker_limit: 10000,
        alerts: false,
        delimiter: 'comma',
        watched_tickers: ticker ? ticker : compileTikcerData(selectedSymbols).join(','),
        id: user.id,
        api_key: user.api_key,
        authentication_token: user.authentication_token,
        overWrite: overwriteCheckBox
      });
      const responsePayload = get(response, 'data', null);
      if (responsePayload && !responsePayload.error) {
        setTopicDialogOpen(false);
        setDataVersion(dataVersion + 1);
        setWatchlistSelectedSymbols([]);
        setOverwriteCheckBox(false);
        setAddTickersnackbar(true);
      } else {
        setTopicAddingError(true);
        setErrorSnackbar(true);
      }
    } catch (error) {
      setTopicAddingError(true);
      setErrorSnackbar(true);
    }
  };

  const onStoreColumnsState = state => {
    storeColumnsState(state);
    setIsSortActive(checkIsSortActive());
  };

  const onStoreFilteringState = state => {
    storeFilteringState(state);
    setIsFilterActive(checkIsFilterActive());
  };

  const gridData = firstTimeLoad.current ? null : processWatchlistData();

  return (
    <>
      <Grid container direction="row" justify="space-between" alignItems="flex-end">
        <Grid item>
          <WatchlistFilters />
        </Grid>
        <Grid item>{loading ? <BeatLoader color={'var(--primary)'} loading={true} size={10} /> : null}</Grid>
        <Grid item>
          <WatchlistSearch />
        </Grid>
        <Grid item>
          <WatchlistActions onTopicSelection={() => setTopicDialogOpen(true)} />
        </Grid>
        <Grid item xs={12}>
          <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
            <Button
              color="primary"
              className="m-2"
              variant="contained"
              disabled={!isFilterActive}
              onClick={() => {
                WatchlistService.clearFilter();
                setIsFilterActive(false);
              }}>
              Clear Filters
            </Button>
            <Button
              color="primary"
              variant="contained"
              className="m-2"
              disabled={!isSortActive}
              onClick={() => {
                WatchlistService.clearSort();
                setIsSortActive(false);
              }}>
              Clear Sorting
            </Button>
          </div>
        </Grid>
      </Grid>
      <div className={classes.watchlistTableContainer} style={{ height: window.innerHeight - 215 }}>
        <WatchlistTable
          data={gridData}
          storeColumnsState={onStoreColumnsState}
          storeFilteringState={onStoreFilteringState}
          columnsState={getColumnState()}
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
      <Snackbar
        open={addTickersnackbar}
        onClose={() => setAddTickersnackbar(false)}
        message="Ticker added in Watchlist"
        severity="success"
      />
      <Snackbar
        open={removeTickersnackbar}
        onClose={() => setRemoveTickersnackbar(false)}
        message="Tikcer removed from Watchlist"
        severity="info"
      />
      <Snackbar
        open={errorSnackbar}
        onClose={() => setErrorSnackbar(false)}
        message="Unable to Add/Remove Ticker To/From Watchlist"
        severity="error"
      />
    </>
  );
};

const mapStateToProps = state => ({
  selectedFileType: state.Watchlist.selectedFileType,
  selectedUniverse: state.Watchlist.selectedUniverse,
  selectedMetric: state.Watchlist.selectedMetric,
  selectedSymbols: state.Watchlist.selectedSymbols,
  overwriteCheckBox: state.Watchlist.overwriteCheckBox,
  count: state.Watchlist.count
});

const mapDispatchToProps = dispatch => ({
  setSelectedWatchlist: value => dispatch(setSelectedWatchlist(value)),
  setSidebarDisplay: value => dispatch(setSidebarDisplay(value)),
  setWatchlistSelectedSymbols: value => dispatch(setWatchlistSelectedSymbols(value)),
  setOverwriteCheckBox: value => dispatch(setOverwriteCheckBox(value)),
  setCount: value => dispatch(setCount(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Watchlist);
