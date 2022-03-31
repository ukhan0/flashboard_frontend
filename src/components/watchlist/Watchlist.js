import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Grid, Button } from '@material-ui/core';
import { get, debounce, isArray, cloneDeep } from 'lodash';
import axios from 'axios';
import config from '../../config/config';
import { parseDateStrMoment, dateFormaterMoment } from './WatchlistTableHelpers';
// import cjson from 'compressed-json';
import { Box } from '@material-ui/core';
import {
  formatData,
  storeColumnsState,
  storeFilteringState,
  getColumnState,
  getFilteringState
} from './WatchlistHelpers';
import {
  setSelectedWatchlist,
  setWatchlistSelectedSymbols,
  setOverwriteCheckBox,
  setCount,
  setWatchlistSearchText,
  setSelectedTickerSymbol,
  setIsNewWatchlistDataAvailable,
  setIsTickerSelected,
  setCompleteCompaniesData,
  setCompleteGlobalCompaniesData
} from '../../reducers/Watchlist';
import {
  setCompanyFillingData,
  setCompanyFillingGraphData,
  setCompanyFillingRevenueData,
  setCompanyPriceOverlay
} from '../../reducers/Filings';
import { setSentimentResult } from '../../reducers/Sentiment';
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
import { isObject, isEmpty } from 'lodash';
import { getWatchlist } from './watchlistApiCalls';
import { useHistory } from 'react-router-dom';
import { lastReportedState } from './WatchlistTableHelpers';
import { setHeadingRedirect, setIsFromThemex } from '../../reducers/Topic';
import WatchlistCustomColumnsSideBar from './WatchlistCustomColumnsSideBar';
import WatchlistFiltersList from './WatchlistFiltersList';
import WatchlistFilterLabelDialog from './WatchlistFilterLabelDialog';

const compileTikcerData = selectedSymbols => {
  return selectedSymbols.map(s => (isObject(s) ? s.ticker : s));
};

const Watchlist = props => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    selectedFileType,
    selectedType,
    selectedUniverse,
    selectedMetric,
    selectedSymbols,
    count,
    searchText,
    isFilterActive,
    selectedTickerSymbol,
    isNewWatchListDataAvailable,
    isColorEnable,
    overwriteCheckBox,
    completeCompaniesData,
    completeCompaniesDataGlobal
  } = useSelector(state => state.Watchlist);
  const [watchlistData, setWatchlistData] = useState([]);
  const [dataVersion, setDataVersion] = useState(1);
  const [topicDialogOpen, setTopicDialogOpen] = useState(false);
  const [confirmationClearFilterDialog, setConfirmationClearFilterDialog] = useState(false);
  const [confirmationClearSortDialog, setConfirmationClearSortDialog] = useState(false);
  const [topicAddingError, setTopicAddingError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successSnackbar, setSuccessSnackBar] = useState(false);
  const [successSnackbarMessage, setSuccessSnackBarMessage] = useState('');
  const [errorSnackbar, setErrorSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('Unable to Add/Remove Ticker To/From Watchlist');
  const firstTimeLoad = useRef(true);
  const [isFilterActiveOnSearch, setIsFilterActiveOnSearch] = useState(null);
  const [isAgGridSideBarOpen, setIsAgGridSideBarOpen] = useState(false);
  const [isAgGridActions, setIsAgGridActions] = useState(false);
  const [isSavedFilterDialog, setIsSavedFilterDialog] = useState(false);
  const [isFilterLabelOpen, setIsFilterLabelOpen] = useState(false);
  const [filterLabel, setFilterLabel] = useState('');
  const [savedFiltersList, setSavedFilters] = useState([]);
  const [severity, setSeverity] = useState('');

  const searchFromCompleteData = useCallback(() => {
    const rawData = selectedType === 'domestic' ? completeCompaniesData : completeCompaniesDataGlobal;
    if (rawData) {
      dispatch(setIsNewWatchlistDataAvailable(true));
      setWatchlistData(formatData(rawData));
    }
  }, [dispatch, completeCompaniesData, completeCompaniesDataGlobal, selectedType]);

  const syncCompleteDataOnPage = useCallback(
    newData => {
      const rawCompleteData = cloneDeep(
        selectedType === 'domestic' ? completeCompaniesData : completeCompaniesDataGlobal
      );
      if (!rawCompleteData || !isArray(rawCompleteData)) {
        return;
      }
      newData.forEach(nd => {
        const tickerIndex = rawCompleteData.findIndex(rd => rd.ticker === nd.ticker);
        rawCompleteData[tickerIndex] = nd;
      });
      if (selectedType === 'domestic') {
        dispatch(setCompleteCompaniesData(rawCompleteData));
      } else {
        dispatch(setCompleteGlobalCompaniesData(rawCompleteData));
      }
    },
    [completeCompaniesData, completeCompaniesDataGlobal, selectedType, dispatch]
  );

  const fetchData = useCallback(async () => {
    try {
      let rawData = [];
      if (selectedUniverse === 'all') {
        if (selectedType === 'domestic') {
          rawData = completeCompaniesData;
        } else {
          rawData = completeCompaniesDataGlobal;
        }
      } else {
        setLoading(true);
        rawData = await dispatch(getWatchlist(selectedUniverse, selectedFileType, selectedType));
        syncCompleteDataOnPage(rawData);
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
  }, [
    selectedUniverse,
    completeCompaniesData,
    completeCompaniesDataGlobal,
    syncCompleteDataOnPage,
    selectedFileType,
    selectedType,
    count,
    dispatch
  ]);

  const processWatchlistData = useCallback(() => {
    const filteredData = [];
    watchlistData.forEach(watchlist => {
      const data = {
        ...watchlist,
        ...watchlist[selectedFileType][selectedMetric],
        last: dateFormaterMoment(
          parseDateStrMoment(selectedFileType === '10k' ? watchlist.last10k : watchlist.last10q)
        ),

        recentId: selectedFileType === '10k' ? watchlist['recentId10k'] : watchlist['recentId10q'],
        oldId: selectedFileType === '10k' ? watchlist['oldId10k'] : watchlist['oldId10q'],
        periodDate: dateFormaterMoment(
          parseDateStrMoment(selectedFileType === '10k' ? watchlist['periodDate10k'] : watchlist['periodDate10q'])
        ),

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
    dispatch(setIsFromThemex(false));
    dispatch(setCompanyFillingData([]));
    dispatch(setCompanyFillingGraphData([]));
    dispatch(setCompanyFillingRevenueData([]));
    dispatch(setCompanyPriceOverlay([]));
    dispatch(setHeadingRedirect(null));
    rowData.documentType = selectedFileType;
    if (columnId === 'actions') {
      let updatedTickerDetailIndex = watchlistData.findIndex(d => (d.ticker ? d.ticker === rowData.ticker : null));
      let watchListDataArr = cloneDeep(watchlistData);
      if (rowData.isTickerActive) {
        if (selectedUniverse === 'watchlist') {
          watchListDataArr.splice(updatedTickerDetailIndex, 1);
          setWatchlistData(watchListDataArr);
        } else {
          watchListDataArr[updatedTickerDetailIndex].isTickerActive = false;
          setWatchlistData(watchListDataArr);
        }
        deleteTicker(rowData.ticker);
        dispatch(setSentimentResult(null, null));
        dispatch(setSelectedWatchlist(rowData));
      } else {
        // add ticker
        watchListDataArr[updatedTickerDetailIndex].isTickerActive = true;
        setWatchlistData(watchListDataArr);
        handleUpload(rowData.ticker);
        dispatch(setSentimentResult(null, null));
        dispatch(setSelectedWatchlist(rowData));
      }
    } else {
      dispatch(setSentimentResult(null, null));
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

  const updateTickerValue = useCallback(
    (rawCompleteData, ticker, isTicker) => {
      let updatedTickerDetail = rawCompleteData.findIndex(d => (d.ticker ? d.ticker === ticker : null));
      if (updatedTickerDetail !== -1) {
        rawCompleteData[updatedTickerDetail].isTickerActive = isTicker;
        if (selectedType === 'domestic') {
          dispatch(setCompleteCompaniesData(rawCompleteData));
        } else {
          dispatch(setCompleteGlobalCompaniesData(rawCompleteData));
        }
      }
    },
    [dispatch, selectedType]
  );

  const updateChacheData = useCallback(
    (ticker, isTicker) => {
      let rawCompleteData = cloneDeep(
        selectedType === 'domestic' ? completeCompaniesData : completeCompaniesDataGlobal
      );
      if (Array.isArray(ticker)) {
        for (let i = 0; i < ticker.length; i++) {
          let updatedTickerDetail = rawCompleteData.findIndex(d => (d.ticker ? d.ticker === ticker[i] : null));
          if (updatedTickerDetail !== -1) {
            rawCompleteData[updatedTickerDetail].isTickerActive = isTicker;
          }
        }
        if (selectedType === 'domestic') {
          dispatch(setCompleteCompaniesData(rawCompleteData));
        } else {
          dispatch(setCompleteGlobalCompaniesData(rawCompleteData));
        }
      } else {
        updateTickerValue(rawCompleteData, ticker, isTicker);
      }
    },
    [dispatch, selectedType, completeCompaniesData, completeCompaniesDataGlobal, updateTickerValue]
  );

  const deleteTicker = useCallback(
    async ticker => {
      const user = JSON.parse(localStorage.getItem('user'));
      try {
        const response = await axios.delete(
          `${config.apiUrl}/api/delete_watchlist/${user.id}/${ticker}/${selectedType}`
        );
        const responsePayload = get(response, 'data', null);
        if (responsePayload && !responsePayload.error) {
          let isTicker = false;
          updateChacheData(ticker, isTicker);
          setTopicDialogOpen(false);
          const debouncedSave = debounce(() => setDataVersion(dataVersion + 1), 3000);
          debouncedSave();
          setSuccessSnackBarMessage('Ticker removed from Watchlist');
          setSuccessSnackBar(true);
          setSeverity('info');
        } else {
          setTopicAddingError(true);
          setErrorSnackbar(true);
        }
      } catch (error) {
        setTopicAddingError(true);
        setErrorSnackbar(true);
      }
    },
    [dataVersion, updateChacheData, selectedType]
  );

  const handleUpload = useCallback(
    async ticker => {
      const user = JSON.parse(localStorage.getItem('user'));
      try {
        setLoading(true);
        const response = await axios.post(`${config.apiUrl}/api/save_watchlist`, {
          user_id: user.id,
          ticker: ticker ? ticker : compileTikcerData(selectedSymbols).join(','),
          delete_old_values: overwriteCheckBox,
          watchlist_type: selectedType
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
          setSuccessSnackBar(true);
          setSuccessSnackBarMessage('Ticker added in Watchlist');
          setSeverity('success');
          fetchData();
        } else {
          setTopicAddingError(true);
          setErrorSnackbar(true);
          setSnackbarMessage(responsePayload.message);
        }
      } catch (error) {
        setTopicAddingError(true);
        setErrorSnackbar(true);
      }
    },
    [dispatch, dataVersion, fetchData, overwriteCheckBox, updateChacheData, selectedSymbols, selectedType]
  );

  const onStoreColumnsState = state => {
    storeColumnsState(state);
  };

  const onStoreFilteringState = state => {
    storeFilteringState(state);
  };

  const clearFilterHandler = state => {
    dispatch(setSelectedTickerSymbol(null));
    WatchlistService.clearFilter();
    setConfirmationClearFilterDialog(false);
    dispatch(setWatchlistSearchText(''));
    setIsFilterActiveOnSearch('');
    dispatch(setIsTickerSelected(false));
  };

  useEffect(() => {
    setIsFilterActiveOnSearch(searchText);
  }, [searchText]);

  const clearSortHandler = state => {
    const columnState = getColumnState();
    let sortLast = null;
    columnState.forEach(elements => {
      if (elements.colId === 'last') {
        sortLast = lastReportedState;
      }
    });

    WatchlistService.clearSort(sortLast);
    setConfirmationClearSortDialog(false);
  };

  const handleOpenAgGridSideBar = isActions => {
    setIsAgGridActions(isActions);
    setIsAgGridSideBarOpen(true);
  };
  const handleCloseAgGridSideBar = () => {
    setIsAgGridSideBarOpen(false);
  };

  const getSavedFilters = useCallback(async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/api/user_watchlist_searches`);
      const responsePayload = get(response, 'data', null);
      if (responsePayload && !responsePayload.error) {
        setSavedFilters(get(responsePayload, 'data', []));
      } else {
        setSavedFilters([]);
      }
    } catch (error) {
      setSavedFilters([]);
    }
  }, []);
  useEffect(() => {
    getSavedFilters();
  }, [getSavedFilters]);

  const saveFilter = async () => {
    if (!isEmpty(getFilteringState())) {
      try {
        const response = await axios.post(`${config.apiUrl}/api/save_watchlist_searches`, {
          searchJson: getFilteringState(),
          tableType: selectedType,
          filterLabel: filterLabel
        });
        const responsePayload = get(response, 'data', null);
        if (responsePayload && !responsePayload.error) {
          setSuccessSnackBar(true);
          setSuccessSnackBarMessage('filter saved successfully');
          setSeverity('success');
          getSavedFilters();

        } else {
          setErrorSnackbar(true);
          setSnackbarMessage('filter not saved');
        }
      } catch (error) {
        setErrorSnackbar(true);
        setSnackbarMessage('something went wroung');
      }
    }
    setFilterLabel('')
    setIsFilterLabelOpen(false);
  };

  const deleteFilter = async id => {
    try {
      const response = await axios.delete(`${config.apiUrl}/api/delete_watchlist_search?filterId=${id}`);
      const responsePayload = get(response, 'data', null);
      if (responsePayload && !responsePayload.error) {
        getSavedFilters();
        setSuccessSnackBar(true);
        setSuccessSnackBarMessage('filter deleted successfully');
        setSeverity('info');
      } else {
        setErrorSnackbar(true);
        setSnackbarMessage('filter not delete');
      }
    } catch (error) {
      setErrorSnackbar(true);
      setSnackbarMessage('something went wroung');
    }
  };
  const handleOpenAgGridFilterDialog = () => {
    setIsSavedFilterDialog(true);
  };
  const handleCloseAgGridFilterDialog = () => {
    setIsSavedFilterDialog(false);
  };

  const handleOpenAgGridFilterLabelDialog = () => {
    setIsFilterLabelOpen(true);
  };
  const handleCloseAgGridFilterLabelDialog = () => {
    setIsFilterLabelOpen(false);
  };
  const hanldeFilterLabel = e => {
    setFilterLabel(e.target.value);
  };

  const gridData = firstTimeLoad.current ? null : processWatchlistData();

  return (
    <>
      <WatchlistFilterLabelDialog
        saveFilter={saveFilter}
        hanldeFilterLabel={hanldeFilterLabel}
        filterLabel={filterLabel}
        isFilterLabelOpen={isFilterLabelOpen}
        handleOpenAgGridFilterLabelDialog={handleOpenAgGridFilterLabelDialog}
        handleCloseAgGridFilterLabelDialog={handleCloseAgGridFilterLabelDialog}
      />
      <WatchlistFiltersList
        deleteFilter={deleteFilter}
        savedFiltersList={savedFiltersList}
        isSavedFilterDialog={isSavedFilterDialog}
        handleOpenAgGridFilterDialog={handleOpenAgGridFilterDialog}
        handleCloseAgGridFilterDialog={handleCloseAgGridFilterDialog}
      />
      {WatchlistService.getAgGridAColunms().columns.length > 0 ? (
        <>
          <WatchlistCustomColumnsSideBar
            storeColumnsState={onStoreColumnsState}
            open={isAgGridSideBarOpen}
            handleCloseAgGridSideBar={handleCloseAgGridSideBar}
            isAgGridActions={isAgGridActions}
            title={isAgGridActions ? 'Actions' : 'Show/Hide Columns'}
          />
        </>
      ) : null}
      {loading ? (
        <div className={classes.loaderContainer}>
          <div className={classes.loaderSection}>
            <BeatLoader color={'var(--primary)'} loading={true} size={10} />
          </div>
        </div>
      ) : null}
      <Grid container direction="row" alignItems="flex-end" className={classes.space}>
        <Grid item xs={9}>
          <Grid container direction="row" justify="flex-start" alignItems="flex-end">
            <Grid item>
              <WatchlistFilters />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Grid container direction="row" justify="flex-end" alignItems="center">
            <Box className="d-flex align-items-center">
              {isFilterActive || isFilterActiveOnSearch ? (
                <>
                  <Button
                    color="primary"
                    className={classes.button}
                    size="small"
                    variant="contained"
                    onClick={() => {
                      setConfirmationClearFilterDialog(true);
                    }}>
                    Clear Filters
                  </Button>

                  <Button
                    color="primary"
                    variant="contained"
                    className={classes.button}
                    size="small"
                    onClick={() => {
                      handleOpenAgGridFilterLabelDialog();
                    }}>
                    Save Filter
                  </Button>
                </>
              ) : null}
            </Box>
            <Grid item>
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
                Add Watchlist
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <div className={classes.watchlistTableContainer} style={{ display: 'flex', height: window.innerHeight - 160 }}>
        <WatchlistTable
          data={gridData}
          storeColumnsState={onStoreColumnsState}
          storeFilteringState={onStoreFilteringState}
          columnsState={getColumnState()}
          filteringState={getFilteringState()}
          onColumnClick={onColumnClick}
        />
        <div style={{ width: 20, marginTop: 5 }}>
          <div
            className={classes.agButtons}
            onClick={() => {
              handleOpenAgGridSideBar(false);
            }}>
            Columns
          </div>
          <br />
          <div
            className={classes.agButtons}
            onClick={() => {
              handleOpenAgGridSideBar(true);
            }}>
            Actions
          </div>
          <div
            className={classes.agButtons}
            style={{ marginTop: '20px' }}
            onClick={() => {
              handleOpenAgGridFilterDialog();
            }}>
           Filters
          </div>
        </div>
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
        open={successSnackbar}
        onClose={() => setSuccessSnackBar(false)}
        message={successSnackbarMessage}
        severity={severity}
      />

      <Snackbar
        open={errorSnackbar}
        onClose={() => setErrorSnackbar(false)}
        message={snackbarMessage}
        severity="error"
      />
    </>
  );
};

export default Watchlist;
