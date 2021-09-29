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
  setCount,
  setWatchlistSearchText,
  setSelectedTickerSymbol,
  setIsNewWatchlistDataAvailable
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
import { getWatchlist } from './watchlistApiCalls';
import { useHistory } from 'react-router-dom';
import { lastReportedState } from './WatchlistTableHelpers';
import { storeCompleteWatchlist, getCompleteWatchlist } from '../../utils/helpers';
import { setHeadingRedirect } from '../../reducers/Topic';

const compileTikcerData = selectedSymbols => {
  return selectedSymbols.map(s => (isObject(s) ? s.ticker : s));
};

const Watchlist = props => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    selectedFileType,
    selectedUniverse,
    selectedMetric,
    selectedSymbols,
    count,
    searchText,
    selectedTickerSymbol,
    isNewWatchListDataAvailable,
    isColorEnable
  } = useSelector(state => state.Watchlist);
  const [watchlistData, setWatchlistData] = useState([]);
  const [isFilterActive, setIsFilterActive] = useState(checkIsFilterActive());
  const [isFilterActiveOnSearch, setIsFilterActiveOnSearch] = useState(null);
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

  const searchFromCompleteData = useCallback(() => {
    const rawData = getCompleteWatchlist();
    if (rawData) {
      dispatch(setIsNewWatchlistDataAvailable(true));
      setWatchlistData(formatData(rawData));
    }
  }, [dispatch]);

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
        rawData = await dispatch(getWatchlist(selectedUniverse, selectedFileType));
        syncCachedData(rawData);
        // update cached data of all (Complete) watchlist
        if (!firstTimeLoad.current) {
          dispatch(setIsNewWatchlistDataAvailable(false));
        }
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
        documentType: selectedFileType,
        isColorEnable: isColorEnable
      };
      delete data['10k'];
      delete data['10q'];
      filteredData.push(data);
    });
    return filteredData;
  }, [selectedFileType, selectedMetric, watchlistData, isColorEnable]);

  const onColumnClick = (rowData, columnId) => {
    dispatch(setHeadingRedirect(null));
    if (columnId === 'actions') {
      if (rowData.isTickerActive) {
        if (selectedUniverse === 'watchlist') {
          let updatedTickerDetail = watchlistData.findIndex(d => (d.ticker ? d.ticker === rowData.ticker : null));
          watchlistData.splice(updatedTickerDetail, 1);
        }
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
      if (
        columnId === 'wordCountChange' ||
        columnId === 'wordCountChangePercent' ||
        columnId === 'wordCountChangePercentWord'
      ) {
        history.push('/comparision');
      }
    }
  };

  useEffect(() => {
    if (searchText.length >= 2) {
      searchFromCompleteData();
    }
    if (isNewWatchListDataAvailable) {
      if (searchText.length === 0) {
        setWatchlistData([]);
        fetchData();
      }
    }
  }, [fetchData, dataVersion, searchText, isNewWatchListDataAvailable, searchFromCompleteData]);

  useEffect(() => {
    firstTimeLoad.current = false;
  }, []);

  useEffect(() => {
    if (history.location.pathname === '/watchlist') {
      dispatch(setIsNewWatchlistDataAvailable(true));
    }
  }, [dispatch, history.location.pathname]);

  useEffect(() => {
    setIsFilterActiveOnSearch(searchText);
  }, [searchText]);

  const updateTickerValue = (rawCompleteData, ticker, isTicker) => {
    let updatedTickerDetail = rawCompleteData.findIndex(d => (d.ticker ? d.ticker === ticker : null));
    if (updatedTickerDetail !== -1) {
      rawCompleteData[updatedTickerDetail].isTickerActive = isTicker;
      storeCompleteWatchlist(rawCompleteData);
    } else {
      return;
    }
  };
  const updateChacheData = (ticker, isTicker) => {
    let rawCompleteData = getCompleteWatchlist();
    if (Array.isArray(ticker)) {
      for (let i = 0; i < ticker.length; i++) {
        let updatedTickerDetail = rawCompleteData.findIndex(d => (d.ticker ? d.ticker === ticker[i] : null));
        if (updatedTickerDetail !== -1) {
          rawCompleteData[updatedTickerDetail].isTickerActive = isTicker;
        }
      }
    } else {
      updateTickerValue(rawCompleteData, ticker, isTicker);
    }
    storeCompleteWatchlist(rawCompleteData);
  };

  const deleteTicker = async ticker => {
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      const response = await axios.delete(`${config.apiUrl}/api/delete_watchlist/${user.id}/${ticker}`);
      const responsePayload = get(response, 'data', null);
      if (responsePayload && !responsePayload.error) {
        let isTicker = false;
        updateChacheData(ticker, isTicker);
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
      const response = await axios.post(`${config.apiUrl}/api/save_watchlist`, {
        user_id: user.id,
        ticker: ticker ? ticker : compileTikcerData(selectedSymbols).join(',')
      });
      const responsePayload = get(response, 'data', null);
      if (responsePayload && !responsePayload.error) {
        let isTicker = true;
        setTopicDialogOpen(false);
        setLoading(false);
        const debouncedSave = debounce(() => setDataVersion(dataVersion + 1), 3000);
        debouncedSave();
        updateChacheData(ticker ? ticker : compileTikcerData(selectedSymbols), isTicker);
        dispatch(setWatchlistSelectedSymbols([]));
        dispatch(setOverwriteCheckBox(false));
        setAddTickersnackbar(true);
        fetchData();
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
    dispatch(setSelectedTickerSymbol(null));
    WatchlistService.clearFilter();
    setIsFilterActive(false);
    setConfirmationClearFilterDialog(false);
    dispatch(setWatchlistSearchText(''));
  };

  const clearSortHandler = state => {
    const columnState = getColumnState();
    let sortLast = null;
    columnState.forEach(elements => {
      if (elements.colId === 'last') {
        sortLast = lastReportedState;
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
        <Grid item xs={8}>
          <Grid container direction="row" justify="flex-start" alignItems="flex-end">
            <Grid item>
              <WatchlistFilters />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container direction="row" justify="flex-end" alignItems="center">
            {/* {isSortActive ? (
              // <Grid item xs={3}>
              //   <Button
              //     style={{ visibility: 'hidden' }}
              //     color="primary"
              //     variant="contained"
              //     className={classes.button}
              //     size="small"
              //     disabled={!isSortActive}
              //     onClick={() => {
              //       setConfirmationClearSortDialog(true);
              //     }}>
              //     Clear Sorting
              //   </Button>
              // </Grid>
            ) : null} */}
            {isFilterActive || isFilterActiveOnSearch ? (
              <Grid item xs={3}>
                <Button
                  color="primary"
                  className={classes.button}
                  size="small"
                  variant="contained"
                  onClick={() => {
                    setConfirmationClearFilterDialog(true);
                  }}>
                  Clear Filtering
                </Button>
              </Grid>
            ) : null}
            <Grid item className={classes.spaceBetween} xs={3}>
              <WatchlistSearch />
            </Grid>
            <Grid item xs={3}>
              <Button
                color="primary"
                variant="contained"
                className={classes.button}
                size="small"
                onClick={
                  selectedTickerSymbol
                    ? () => handleUpload(selectedTickerSymbol.ticker)
                    : () => setTopicDialogOpen(true)
                }>
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
        message="Ticker removed from Watchlist"
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
