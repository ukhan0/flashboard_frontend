import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Grid, Button } from '@material-ui/core';
import { get, debounce } from 'lodash';
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
  checkIsSortActive,
  syncCachedData
} from './WatchlistHelpers';
import {
  setSelectedWatchlist,
  setWatchlistSelectedSymbols,
  setOverwriteCheckBox,
  setCount
} from '../../reducers/Watchlist';
import { setSidebarDisplay } from '../../reducers/ThemeOptions';
import WatchlistTopicDialog from './WatchlistTopic/WatchlistTopicDialog';
import WatchlistConfirmationDialog from './ActionConfirmation';
import { useSelector, useDispatch } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import WatchlistService from './WatchlistService';
import Snackbar from '../Snackbar';
// components
import WatchlistFilters from './WatchlistFilters';
import WatchlistTable from './WatchlistTable';
// styles
import useStyles from './watchlistStyles';
import WatchlistSearch from './WatchlistSearch';
import { isObject } from 'lodash';
import watchlistApiCalls from './watchlistApiCalls';

const compileTikcerData = selectedSymbols => {
  return selectedSymbols.map(s => (isObject(s) ? s.ticker : s));
};

const Watchlist = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { selectedFileType, selectedUniverse, selectedMetric, selectedSymbols, overwriteCheckBox, count } = useSelector(
    state => state.Watchlist
  );
  const [watchlistData, setWatchlistData] = useState([]);
  const [isFilterActive, setIsFilterActive] = useState(checkIsFilterActive());
  const [isSortActive, setIsSortActive] = useState(checkIsSortActive());
  const [dataVersion, setDataVersion] = useState(1);
  const [topicDialogOpen, setTopicDialogOpen] = useState(false);
  const [confirmationClearFilterDialog, setConfirmationClearFilterDialog] = useState(false);
  const [confirmationClearSortDialog, setConfirmationClearSortDialog] = useState(false);
  const [topicAddingError, setTopicAddingError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addTickersnackbar, setAddTickersnackbar] = React.useState(false);
  const [removeTickersnackbar, setRemoveTickersnackbar] = React.useState(false);
  const [errorSnackbar, setErrorSnackbar] = React.useState(false);
  const firstTimeLoad = useRef(true);

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
        rawData = await watchlistApiCalls.getWatchlist(selectedUniverse, selectedFileType);
        // update cached data of all (Complete) watchlist
        syncCachedData(rawData);
      }

      if (rawData.length === 0 && selectedUniverse === 'watchlist' && count === 0) {
        setTopicDialogOpen(true);
        dispatch(setCount(count + 1));
      }
      setWatchlistData(formatData(rawData));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      // log exception here
    }
  }, [selectedUniverse, selectedFileType, count, dispatch]);

  const processWatchlistData = useCallback(() => {
    const filteredData = [];
    watchlistData.forEach(watchlist => {
      const data = {
        ...watchlist,
        ...watchlist[selectedFileType][selectedMetric],
        last: selectedFileType === '10k' ? watchlist.last10k : watchlist.last10q,
        recentId: selectedFileType === '10k' ? watchlist['recentId10k'] : watchlist['recentId10q'],
        oldId: selectedFileType === '10k' ? watchlist['oldId10k'] : watchlist['oldId10q'],
        documentType: selectedFileType
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
        dispatch(setSelectedWatchlist(rowData));
      } else {
        // add ticker
        handleUpload(rowData.ticker);
        dispatch(setSelectedWatchlist(rowData));
      }
    } else {
      dispatch(setSelectedWatchlist(rowData));
      dispatch(setSidebarDisplay(true));
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
        const debouncedSave = debounce(() => setDataVersion(dataVersion + 1), 3000);
        debouncedSave();
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
      setLoading(true);
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
        const debouncedSave = debounce(() => setDataVersion(dataVersion + 1), 3000);
        debouncedSave();
        dispatch(setWatchlistSelectedSymbols([]));
        dispatch(setOverwriteCheckBox(false));
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

  const clearFilterHandler = state => {
    WatchlistService.clearFilter();
    setIsFilterActive(false);
    setConfirmationClearFilterDialog(false);
  };

  const clearSortHandler = state => {
    const columnState = getColumnState();
    let sortLast = null;
    columnState.forEach(elements => {
      if (elements.colId === 'last') {
        sortLast = elements.sort;
      }
    });

    WatchlistService.clearSort(sortLast);
    setIsSortActive(false);
    setConfirmationClearSortDialog(false);
  };

  const gridData = firstTimeLoad.current ? null : processWatchlistData();

  return (
    <>
      {loading ? (
        <div className={classes.loaderContainer}>
          <div className={classes.loaderSection}>
            <BeatLoader color={'var(--primary)'} loading={true} size={10} />
          </div>
        </div>
      ) : null}
      <Grid container direction="row" alignItems="flex-end" className={classes.space}>
        <Grid item xs={6}>
          <Grid container direction="row" justify="flex-start" alignItems="flex-end">
            <Grid item>
              <WatchlistFilters />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container direction="row" justify="flex-end" alignItems="center">
            {isFilterActive ? (
              <Grid item>
                <Button
                  color="primary"
                  className={classes.button}
                  size="small"
                  variant="contained"
                  disabled={!isFilterActive}
                  onClick={() => {
                    setConfirmationClearFilterDialog(true);
                  }}>
                  Clear Filtering
                </Button>
              </Grid>
            ) : null}
            {isSortActive ? (
              <Grid item>
                <Button
                  color="primary"
                  variant="contained"
                  className={classes.button}
                  size="small"
                  disabled={!isSortActive}
                  onClick={() => {
                    setConfirmationClearSortDialog(true);
                  }}>
                  Clear Sorting
                </Button>
              </Grid>
            ) : null}
            <Grid item className={classes.spaceBetween} xs={4}>
              <WatchlistSearch handleUpload={handleUpload} />
            </Grid>
            <Grid item>
              <Button
                color="primary"
                variant="contained"
                className={classes.button}
                size="small"
                onClick={() => {
                  setTopicDialogOpen(true);
                }}>
                Add to Watchlist
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <div className={classes.watchlistTableContainer} style={{ height: window.innerHeight - 160 }}>
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
      <WatchlistConfirmationDialog
        isOpen={confirmationClearFilterDialog}
        Agree={() => clearFilterHandler()}
        disAgree={() => setConfirmationClearFilterDialog(false)}
        actionName="filter"
        error={topicAddingError}
      />
      <WatchlistConfirmationDialog
        isOpen={confirmationClearSortDialog}
        Agree={() => clearSortHandler()}
        disAgree={() => setConfirmationClearSortDialog(false)}
        actionName="sort"
        error={topicAddingError}
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

export default Watchlist;
