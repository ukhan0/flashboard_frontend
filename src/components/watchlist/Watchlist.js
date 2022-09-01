import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Grid, Button } from '@material-ui/core';
import { get, isArray, cloneDeep } from 'lodash';
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
  setCompleteGlobalCompaniesData,
  setSelectedFilter,
  setFilterLabel,
  setIsFilterUpdate
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
import WatchlistTable2 from './WatchlistTable2';
// styles
import useStyles from './watchlistStyles';
import { isObject, isEmpty } from 'lodash';
import { getWatchlist, getWatchlistTable2Data } from './watchlistApiCalls';
import { useHistory } from 'react-router-dom';
import { lastReportedState } from './WatchlistTableHelpers';
import { setHeadingRedirect, setIsFromThemex } from '../../reducers/Topic';
import WatchlistCustomColumnsSideBar from './WatchlistCustomColumnsSideBar';
import WatchListCustomEmailAlertsSideBar from './WatchListCustomEmailAlertsSideBar';
import WatchlistFiltersList from './WatchlistFiltersList';
import WatchlistFilterLabelDialog from './WatchlistFilterLabelDialog';
import FileTypes from '../../config/watchlistFileTyes';

const compileTikcerData = selectedSymbols => {
  return selectedSymbols.map(s => (isObject(s) ? s.ticker : s));
};
const screenTitle = {
  border: '1px solid #d1d1d1',
  padding: '5px',
  backgroundColor: '#ebebeb',
  fontWeight: 'bold',
  position: 'relative',
  top: '12px',
  zIndex: '1',
  textAlign: 'center'
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

    isColorEnable,
    overwriteCheckBox,
    completeCompaniesData,
    completeCompaniesDataGlobal,
    filterLabel,
    selectedFilter,
    isFilterUpdate,
    isActiveCompanies
  } = useSelector(state => state.Watchlist);

  const [watchlistData, setWatchlistData] = useState([]);
  const [topicDialogOpen, setTopicDialogOpen] = useState(false);
  const [confirmationClearFilterDialog, setConfirmationClearFilterDialog] = useState(false);
  const [confirmationClearSortDialog, setConfirmationClearSortDialog] = useState(false);
  const [topicAddingError, setTopicAddingError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackBar] = useState({ isSnackBar: false, message: '', severity: 'success' });
  const firstTimeLoad = useRef(true);
  const [isFilterActiveOnSearch, setIsFilterActiveOnSearch] = useState(null);
  const [isAgGridSideBarOpen, setIsAgGridSideBarOpen] = useState(false);
  const [isAgGridActions, setIsAgGridActions] = useState(false);
  const [isAgGridEmailAlerts, setIsAgGridEmailAlerts] = useState(false);
  const [isSavedFilterDialog, setIsSavedFilterDialog] = useState(false);
  const [isFilterLabelOpen, setIsFilterLabelOpen] = useState(false);
  const [savedFiltersList, setSavedFilters] = useState([]);
  const [syncData, setSyncData] = useState([]);
  const [gridData, setGridData] = useState(null);
  const [gridData2, setGridData2] = useState([]);
  const [fileTypesEmailAlertStatus, setFileTypesEmailAlertStatus] = useState([]);

  let completeCompaniesDatalocal = useRef(completeCompaniesData);
  let completeCompaniesDataGloballocal = useRef(completeCompaniesDataGlobal);
  const anchorOrigin = { vertical: 'bottom', horizontal: 'left' };

  useEffect(() => {
    completeCompaniesDatalocal.current = completeCompaniesData;
    completeCompaniesDataGloballocal.current = completeCompaniesDataGlobal;
  }, [completeCompaniesData, completeCompaniesDataGlobal]);

  const syncCompleteDataOnPage = useCallback(
    newData => {
      const rawCompleteData = cloneDeep(
        selectedType === 'domestic' ? completeCompaniesDatalocal.current : completeCompaniesDataGloballocal.current
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
    [selectedType, dispatch]
  );

  const getWatchlistFileTypeEmailAlertStatus = useCallback(async () => {
    let fileTypesEmailStatus = [];
    try {
      const response = await axios.get(`${config.apiUrl}/api/get_doc_type_email_status`);
      const responseData = get(response, 'data.data', []);
      fileTypesEmailStatus = responseData.map(document => {
        return {
          doc_type: get(document, 'doc_type', '').toUpperCase(),
          send_email: document.send_email === 1
        };
      });
    } catch (e) {
      console.log(e);
      fileTypesEmailStatus = [];
    } finally {
      setFileTypesEmailAlertStatus(fileTypesEmailStatus);
    }
  }, []);

  useEffect(() => {
    getWatchlistFileTypeEmailAlertStatus();
  }, [getWatchlistFileTypeEmailAlertStatus]);

  useEffect(() => {
    firstTimeLoad.current = false;
  }, []);

  useEffect(() => {
    syncCompleteDataOnPage(syncData);
  }, [syncData, syncCompleteDataOnPage]);

  useEffect(() => {
    let rawData = [];
    if (selectedUniverse === 'all') {
      if (selectedType === 'domestic') {
        rawData = completeCompaniesData;
      } else {
        rawData = completeCompaniesDataGlobal;
      }
      setWatchlistData(formatData(rawData));
    }
  }, [selectedUniverse, selectedType, completeCompaniesData, completeCompaniesDataGlobal]);
  const fetchData = useCallback(async () => {
    if (selectedFileType === '10-Q' || selectedFileType === '10-K') {
      try {
        let rawData = [];
        if (selectedUniverse !== 'all') {
          setLoading(true);
          setWatchlistData([]);
          rawData = await dispatch(getWatchlist(selectedUniverse, selectedFileType, selectedType));
          setSyncData(rawData);
          // syncCompleteDataOnPage(rawData);
          // update cached data of all (Complete) watchlist
          if (!firstTimeLoad.current) {
            dispatch(setIsNewWatchlistDataAvailable(false));
          }
        }
        if (rawData.length === 0 && selectedUniverse === 'watchlist' && count === 0) {
          setTopicDialogOpen(true);
          dispatch(setCount(count + 1));
        }
        if (selectedUniverse !== 'all') {
          setWatchlistData(formatData(rawData));
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        // log exception here
      }
    }
  }, [selectedUniverse, selectedFileType, selectedType, count, dispatch]);

  const getWatchlistTable2Dataa = useCallback(async () => {
    if (selectedFileType !== '10-Q' && selectedFileType !== '10-K') {
      setLoading(true);
      let fileTypes = FileTypes.find(
        e => e.documentTypeGroup.toLocaleLowerCase() === selectedFileType.toLocaleLowerCase()
      );
      fileTypes = get(fileTypes, 'value', []).map(e => e.value);
      let data = await dispatch(
        getWatchlistTable2Data('fillings_*', selectedUniverse, fileTypes.join(','), selectedType)
      );
      setLoading(false);
      setGridData2(data);
    }
  }, [dispatch, selectedUniverse, selectedFileType, selectedType]);
  useEffect(() => {
    getWatchlistTable2Dataa();
  }, [getWatchlistTable2Dataa]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (history.location.pathname === '/watchlist') {
      dispatch(setIsNewWatchlistDataAvailable(true));
    }
  }, [dispatch, history.location.pathname]);

  useEffect(() => {
    setIsFilterActiveOnSearch(searchText);
  }, [searchText]);

  // useEffect(() => {
  //   let tickers = [];
  //   watchlistData.forEach(function(value) {
  //     tickers.push(value.ticker);
  //   });
  //   dispatch(setUserWatchlist(tickers));
  // }, [watchlistData, dispatch]);
  const preProcess = useCallback(
    watchlist => {
      const data = {
        ...watchlist,
        ...watchlist[selectedFileType][selectedMetric],
        last: dateFormaterMoment(
          parseDateStrMoment(selectedFileType === '10-K' ? watchlist.last10k : watchlist.last10q)
        ),

        recentId: selectedFileType === '10-K' ? watchlist['recentId10k'] : watchlist['recentId10q'],
        oldId: selectedFileType === '10-K' ? watchlist['oldId10k'] : watchlist['oldId10q'],
        periodDate: dateFormaterMoment(
          parseDateStrMoment(selectedFileType === '10-K' ? watchlist['periodDate10k'] : watchlist['periodDate10q'])
        ),

        documentType: selectedFileType,
        isColorEnable: isColorEnable
      };
      delete data['10-K'];
      delete data['10-Q'];
      return data;
    },
    [isColorEnable, selectedFileType, selectedMetric]
  );
  const processWatchlistData = useCallback(() => {
    const filteredData = [];

    watchlistData.forEach(watchlist => {
      if (isActiveCompanies === true) {
        //show active companies only
        let isActiveFlag = get(watchlist, 'isActiveFlag', false);
        if (isActiveFlag === isActiveCompanies) {
          const data = preProcess(watchlist);
          filteredData.push(data);
        }
      } else {
        const data = preProcess(watchlist);
        filteredData.push(data);
        //show all companies
      }
    });

    return filteredData;
  }, [watchlistData, isActiveCompanies, preProcess]);

  const getSavedFilters = useCallback(async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/api/user_watchlist_searches`);
      const responsePayload = get(response, 'data', null);
      if (responsePayload && !responsePayload.error) {
        let respData = get(responsePayload, 'data', []);
        setSavedFilters(respData);
        if (respData.length < 1) {
          dispatch(setFilterLabel(''));
        }
      } else {
        setSavedFilters([]);
      }
    } catch (error) {
      setSavedFilters([]);
    }
  }, [dispatch]);

  useEffect(() => {
    getSavedFilters();
  }, [getSavedFilters]);

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
        selectedType === 'domestic' ? completeCompaniesDatalocal.current : completeCompaniesDataGloballocal.current
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
    [dispatch, selectedType, updateTickerValue]
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
          setSnackBar({ isSnackBar: true, message: 'Ticker removed from Watchlist', severity: 'info' });
        } else {
          setTopicAddingError(true);
          setSnackBar({
            isSnackBar: true,
            message: 'Unable to Add/Remove Ticker To/From Watchlist',
            severity: 'error'
          });
        }
      } catch (error) {
        setTopicAddingError(true);
        setSnackBar({ isSnackBar: true, message: 'Unable to Add/Remove Ticker To/From Watchlist', severity: 'error' });
      }
    },
    [updateChacheData, selectedType]
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
          updateChacheData(ticker ? ticker : compileTikcerData(selectedSymbols), isTicker);
          dispatch(setWatchlistSelectedSymbols([]));
          dispatch(setOverwriteCheckBox(false));
          setSnackBar({ isSnackBar: true, message: 'Ticker added in Watchlist', severity: 'success' });
        } else {
          setTopicAddingError(true);
          setSnackBar({ isSnackBar: true, message: responsePayload.message, severity: 'error' });
        }
      } catch (error) {
        setTopicAddingError(true);
        setSnackBar({ isSnackBar: true, message: 'Unable to Add/Remove Ticker To/From Watchlist', severity: 'error' });
      }
    },
    [dispatch, overwriteCheckBox, updateChacheData, selectedSymbols, selectedType]
  );

  const saveFilter = async text => {
    if (!isEmpty(getFilteringState())) {
      try {
        const response = await axios.post(`${config.apiUrl}/api/save_watchlist_searches`, {
          searchJson: getFilteringState(),
          tableType: selectedType,
          filterLabel: text
        });
        const responsePayload = get(response, 'data', null);
        if (responsePayload && !responsePayload.error) {
          setSnackBar({ isSnackBar: true, message: 'filter saved successfully', severity: 'success' });
          getSavedFilters();
        } else {
          setSnackBar({ isSnackBar: true, message: 'filter not saved', severity: 'error' });
        }
      } catch (error) {
        setSnackBar({ isSnackBar: true, message: 'something went wrong', severity: 'error' });
      }
    }
    setIsFilterLabelOpen(false);
  };

  const deleteFilter = async id => {
    try {
      const response = await axios.delete(`${config.apiUrl}/api/delete_watchlist_search?filterId=${id}`, {});
      const responsePayload = get(response, 'data', null);
      if (responsePayload && !responsePayload.error) {
        getSavedFilters();
        setSnackBar({ isSnackBar: true, message: 'filter deleted successfully', severity: 'info' });
      } else {
        setSnackBar({ isSnackBar: true, message: 'filter not deleted', severity: 'error' });
      }
    } catch (error) {
      setSnackBar({ isSnackBar: true, message: 'something went wroung', severity: 'error' });
    }
  };

  const updateFilter = async text => {
    try {
      const response = await axios.put(`${config.apiUrl}/api/update_watchlist_search?filterId=${selectedFilter.id}`, {
        searchJson: getFilteringState(),
        tableType: selectedType,
        filterLabel: text
      });
      const responsePayload = get(response, 'data', null);
      if (!responsePayload.error) {
        // clearFilterHandler();
        getSavedFilters();
        setSnackBar({ isSnackBar: true, message: 'filter updated successfully', severity: 'success' });
      } else {
        setSnackBar({ isSnackBar: true, message: 'filter not updated', severity: 'error' });
      }
    } catch (error) {
      setSnackBar({ isSnackBar: true, message: 'something went wroung', severity: 'error' });
    }
    setIsFilterLabelOpen(false);
  };

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
    dispatch(setSelectedFilter(null));
    dispatch(setIsFilterUpdate(false));
    dispatch(setFilterLabel(''));
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
    setConfirmationClearSortDialog(false);
  };

  const handleOpenAgGridSideBar = isActions => {
    setIsAgGridActions(isActions);
    setIsAgGridSideBarOpen(true);
  };
  const handleCloseAgGridSideBar = () => {
    setIsAgGridSideBarOpen(false);
  };
  const onColumnClick = (rowData, columnId) => {
    dispatch(setIsFromThemex(false));
    dispatch(setCompanyFillingData([]));
    dispatch(setCompanyFillingGraphData([]));
    dispatch(setCompanyFillingRevenueData([]));
    dispatch(setCompanyPriceOverlay([]));
    dispatch(setHeadingRedirect(null));
    rowData.documentType = selectedFileType;
    if (columnId === 'tweetsFlag' && parseInt(rowData.flag) !== 0) {
      dispatch(setSelectedWatchlist(rowData));
      history.push('/socialSentiment');
    }
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
  useEffect(() => {
    if (selectedFileType === '10-Q' || selectedFileType === '10-K') {
      firstTimeLoad.current ? setGridData(null) : setGridData(processWatchlistData());
    }
  }, [processWatchlistData, selectedFileType]);
  return (
    <>
      <WatchlistFilterLabelDialog
        saveFilter={saveFilter}
        updateFilter={updateFilter}
        isFilterLabelOpen={isFilterLabelOpen}
        handleOpenAgGridFilterLabelDialog={handleOpenAgGridFilterLabelDialog}
        handleCloseAgGridFilterLabelDialog={handleCloseAgGridFilterLabelDialog}
        filterLabel={filterLabel}
      />
      <WatchlistFiltersList
        deleteFilter={deleteFilter}
        savedFiltersList={savedFiltersList}
        isSavedFilterDialog={isSavedFilterDialog}
        handleOpenAgGridFilterDialog={handleOpenAgGridFilterDialog}
        handleCloseAgGridFilterDialog={handleCloseAgGridFilterDialog}
        handleOpenAgGridFilterLabelDialog={handleOpenAgGridFilterLabelDialog}
        handleCloseAgGridFilterLabelDialog={handleCloseAgGridFilterLabelDialog}
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
      <WatchListCustomEmailAlertsSideBar
        open={isAgGridEmailAlerts}
        data={fileTypesEmailAlertStatus}
        updateData={setFileTypesEmailAlertStatus}
        handleCloseAgGridSideBar={() => {
          setIsAgGridEmailAlerts(false);
        }}
        title="Enable Email Alerts for Watchlist"
      />
      {loading ? (
        <div className={classes.loaderContainer}>
          <div className={classes.loaderSection}>
            <BeatLoader color={'var(--primary)'} loading={true} size={10} />
          </div>
        </div>
      ) : null}
      <Grid
        container
        sx={{
          direction: { xs: 'column', md: 'column', lg: 'column', xl: 'row' }
        }}
        justify="flex-end"
        alignItems="center"
        spacing={1}
        className={classes.space}>
        <Grid item xs={12} sm={12} lg={12} xl={8}>
          <WatchlistFilters clearFilterHandler={clearFilterHandler} />
        </Grid>
        <Grid item xs={12} sm={12} lg={12} xl={4}>
          <Grid container direction="row" justify="flex-end" alignItems="center">
            <Grid item>
              <Box className="d-flex align-items-center">
                {isFilterActive || isFilterActiveOnSearch ? (
                  <>
                    {isFilterUpdate && savedFiltersList.length >= 1 ? (
                      <>
                        <Button
                          color="primary"
                          variant="contained"
                          className={classes.button}
                          size="small"
                          onClick={() => {
                            handleOpenAgGridFilterLabelDialog();
                          }}>
                          Update Screen
                        </Button>
                      </>
                    ) : (
                      <Button
                        color="primary"
                        variant="contained"
                        className={classes.button}
                        size="small"
                        onClick={() => {
                          handleOpenAgGridFilterLabelDialog();
                        }}>
                        Save Screen
                      </Button>
                    )}
                    <Button
                      color="primary"
                      className={classes.button}
                      size="small"
                      variant="contained"
                      onClick={() => {
                        // setConfirmationClearFilterDialog(true);
                        clearFilterHandler();
                      }}>
                      Clear Filters
                    </Button>
                  </>
                ) : null}
              </Box>
            </Grid>
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
      {selectedFileType === '10-Q' || selectedFileType === '10-K' ? (
        <>
          <span style={filterLabel ? screenTitle : { display: 'none' }}>{filterLabel}</span>
          <div
            className={classes.watchlistTableContainer}
            style={{ display: 'flex', height: window.innerHeight - 160 }}>
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
                Screens
              </div>
              <div
                className={classes.agButtons}
                style={{ marginTop: '20px' }}
                onClick={() => {
                  setIsAgGridEmailAlerts(true);
                }}>
                Email alerts
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className={classes.watchlistTableContainer} style={{ display: 'flex', height: window.innerHeight - 160 }}>
          <WatchlistTable2
            data={gridData2}
            storeColumnsState={onStoreColumnsState}
            storeFilteringState={onStoreFilteringState}
            columnsState={getColumnState()}
            filteringState={getFilteringState()}
            onColumnClick={onColumnClick}
          />
        </div>
      )}

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
        open={get(snackbar, 'isSnackBar', false)}
        onClose={() =>
          setSnackBar({
            isSnackBar: false,
            message: get(snackbar, 'message', null),
            severity: get(snackbar, 'severity', '')
          })
        }
        message={get(snackbar, 'message', null)}
        severity={get(snackbar, 'severity', '')}
        anchorOrigin={anchorOrigin}
      />
    </>
  );
};

export default Watchlist;
