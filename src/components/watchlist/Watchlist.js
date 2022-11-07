import React, { useState, useEffect, useCallback } from 'react';
import { get, cloneDeep, isObject, isEmpty } from 'lodash';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import config from '../../config/config';
import { parseDateStrMoment, dateFormaterMoment } from './WatchlistTableHelpers';
import {
  formatData,
  getColumnState,
  getFilteringState,
  isBigAgGrid,
  setTickerActiveStatus,
  isItSocialCompany
} from './WatchlistHelpers';
import {
  setSelectedWatchlist,
  setWatchlistSelectedSymbols,
  setOverwriteCheckBox,
  setIsTickerSelected,
  setCompleteCompaniesData,
  setCompleteGlobalCompaniesData,
  setSelectedFilter,
  setFilterLabel,
  setIsFilterUpdate
} from '../../reducers/Watchlist';
import { setSidebarDisplay } from '../../reducers/ThemeOptions';
import WatchlistTopicDialog from './WatchlistTopic/WatchlistTopicDialog';
import { useSelector, useDispatch } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import WatchlistService from './WatchlistService';
import WatchlistFilters from './WatchlistFilters';
import WatchlistTable from './WatchlistTable';
import useStyles from './watchlistStyles';
import {
  getWatchlist,
  getWatchlistTable2Data,
  getWatchlistFileTypeEmailAlertStatus,
  syncCompleteDataOnPage
} from './watchlistApiCalls';
import { useHistory } from 'react-router-dom';
import { setIsFromThemex } from '../../reducers/Topic';
import WatchlistCustomColumnsSideBar from './WatchlistCustomColumnsSideBar';
import WatchListCustomEmailAlertsSideBar from './WatchListCustomEmailAlertsSideBar';
import WatchlistFiltersList from './WatchlistFiltersList';
import WatchlistFilterLabelDialog from './WatchlistFilterLabelDialog';
import { FileTypes } from '../../config/watchlistFileTyes';
import { setSnackBarObj } from '../../reducers/Alerts';

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
const Watchlist = () => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    selectedFileType,
    selectedType,
    selectedUniverse,
    selectedMetric,
    selectedSymbols,
    isFilterActive,
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
  const [topicAddingError, setTopicAddingError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAgGridSideBarOpen, setIsAgGridSideBarOpen] = useState(false);
  const [isAgGridActions, setIsAgGridActions] = useState(false);
  const [isAgGridEmailAlerts, setIsAgGridEmailAlerts] = useState(false);
  const [isSavedFilterDialog, setIsSavedFilterDialog] = useState(false);
  const [isFilterLabelOpen, setIsFilterLabelOpen] = useState(false);
  const [savedFiltersList, setSavedFilters] = useState([]);
  const [gridData, setGridData] = useState(null);
  const [gridData2, setGridData2] = useState([]);
  const [dispalyedColumns, setDispalyedColumns] = useState([]);
  const [col, setCol] = useState(null);
  const [currentCol, setCurrentCol] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      let columns = getColumnState(selectedFileType);
      let displayedColumnsState = columns.filter(v => !v.hide).map(v => v.colId);
      setDispalyedColumns(displayedColumnsState);
    }, [100]);
    setCurrentCol(WatchlistService.getAgGridAColunms().columns);
  }, [col, isAgGridSideBarOpen, selectedFileType]);

  const handleColumns = (e, status) => {
    const coldId = e.target.value;
    setCol(`${coldId}${status}`);
    WatchlistService.mangeAgGridColunms(coldId, status);
  };

  useEffect(() => {
    dispatch(getWatchlistFileTypeEmailAlertStatus());
  }, [dispatch]);

  useEffect(() => {
    if (selectedFileType === '10-K' || selectedFileType === '10-Q') {
      let rawData = [];
      if (selectedUniverse === 'all') {
        if (selectedType === 'domestic' || selectedType === 'newGlobal') {
          rawData = completeCompaniesData;
        } else if (selectedType === 'global' && (selectedFileType === '10-K' || selectedFileType === '10-Q')) {
          rawData = completeCompaniesData.filter(company => company.co === 'CA');
        } else {
          rawData = completeCompaniesDataGlobal;
        }
        setWatchlistData(formatData(rawData));
      }
    }
  }, [selectedUniverse, selectedType, completeCompaniesData, completeCompaniesDataGlobal, selectedFileType]);

  const getWatchlistTable2Dataa = useCallback(async () => {
    if (selectedFileType !== '10-Q' && selectedFileType !== '10-K') {
      setLoading(true);
      let fileTypes = [];
      if (selectedType === 'domestic') {
        fileTypes = FileTypes.usFileTypes.find(
          e => e.documentTypeGroup.toLocaleLowerCase() === selectedFileType.toLocaleLowerCase()
        );
      } else if (selectedType === 'global') {
        fileTypes = FileTypes.canadaFileTypes.find(
          e => e.documentTypeGroup.toLocaleLowerCase() === selectedFileType.toLocaleLowerCase()
        );
      } else if (selectedType === 'newGlobal') {
        fileTypes = FileTypes.globalFileTypes.find(
          e => e.documentTypeGroup.toLocaleLowerCase() === selectedFileType.toLocaleLowerCase()
        );
      }
      let index = 'fillings_*';
      if (selectedFileType === 'all') {
        index = fileTypes.index;
      }
      const countryCode = get(fileTypes, 'countryCode', null);
      const sourceName = get(fileTypes, 'sourceName', null);
      fileTypes = get(fileTypes, 'value', []).map(e => e.value);
      let data = await dispatch(
        getWatchlistTable2Data(index, selectedUniverse, fileTypes.join(','), selectedType, countryCode, sourceName)
      );
      setLoading(false);
      setGridData2(data);
    }
  }, [dispatch, selectedUniverse, selectedFileType, selectedType]);
  useEffect(() => {
    getWatchlistTable2Dataa();
    return () => {
      setGridData2([]);
    };
  }, [getWatchlistTable2Dataa]);

  const fetchData = useCallback(async () => {
    if (selectedFileType === '10-Q' || selectedFileType === '10-K') {
      try {
        let rawData = [];
        if (selectedUniverse !== 'all') {
          setLoading(true);
          setWatchlistData([]);
          rawData = await dispatch(getWatchlist(selectedUniverse, selectedFileType, selectedType));
          if (rawData !== null && rawData.length === 0 && selectedUniverse === 'watchlist') {
            setTopicDialogOpen(true);
          }
          if (rawData && rawData.length) {
            dispatch(syncCompleteDataOnPage(selectedType, rawData));
            setWatchlistData(formatData(rawData));
          }
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        // log exception here
      }
    }
  }, [selectedUniverse, selectedFileType, selectedType, dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
        if (selectedType === 'domestic' || selectedType === 'newGlobal') {
          dispatch(setCompleteCompaniesData(rawCompleteData));
        } else {
          dispatch(setCompleteGlobalCompaniesData(rawCompleteData));
        }
      }
    },
    [dispatch, selectedType]
  );

  const updateChacheData = (ticker, isTicker) => {
    let rawCompleteData = cloneDeep(
      selectedType === 'domestic' || selectedType === 'newGlobal' ? completeCompaniesData : completeCompaniesDataGlobal
    );
    if (Array.isArray(ticker)) {
      for (let i = 0; i < ticker.length; i++) {
        let updatedTickerDetail = rawCompleteData.findIndex(d => (d.ticker ? d.ticker === ticker[i] : null));
        if (updatedTickerDetail !== -1) {
          rawCompleteData[updatedTickerDetail].isTickerActive = isTicker;
        }
      }
      if (selectedType === 'domestic' || selectedType === 'newGlobal') {
        dispatch(setCompleteCompaniesData(rawCompleteData));
      } else {
        dispatch(setCompleteGlobalCompaniesData(rawCompleteData));
      }
    } else {
      updateTickerValue(rawCompleteData, ticker, isTicker);
    }
  };

  const deleteTicker = async (ticker, isTable2 = false) => {
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      const response = await axios.delete(`${config.apiUrl}/api/delete_watchlist/${user.id}/${ticker}/${selectedType}`);
      const responsePayload = get(response, 'data', null);
      if (responsePayload && !responsePayload.error) {
        let isTicker = false;
        if (!isTable2) {
          updateChacheData(ticker, isTicker);
        }
        dispatch(setSnackBarObj({ message: 'Ticker removed from Watchlist', severity: 'info' }));
        if (selectedFileType === '10-K' || selectedFileType === '10-Q') {
          setTickerActiveStatus(ticker, false);
        }
      } else {
        setTopicAddingError(true);
        dispatch(
          setSnackBarObj({
            message: 'Unable to Add/Remove Ticker To/From Watchlist',
            severity: 'error'
          })
        );
      }
    } catch (error) {
      setTopicAddingError(true);
      dispatch(setSnackBarObj({ message: 'Unable to Add/Remove Ticker To/From Watchlist', severity: 'error' }));
    }
  };

  const handleUpload = async (ticker, isTable2 = false) => {
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
        setLoading(false);
        if (!isTable2) {
          updateChacheData(ticker ? ticker : compileTikcerData(selectedSymbols), isTicker);
          dispatch(setWatchlistSelectedSymbols([]));
        }
        dispatch(setOverwriteCheckBox(false));
        dispatch(setSnackBarObj({ message: 'Ticker added in Watchlist', severity: 'success' }));
        if (selectedFileType === '10-K' || selectedFileType === '10-Q') {
          setTickerActiveStatus(ticker, true);
        }
      } else {
        setTopicAddingError(true);
        dispatch(setSnackBarObj({ message: responsePayload.message, severity: 'error' }));
      }
    } catch (error) {
      setTopicAddingError(true);
      dispatch(setSnackBarObj({ message: 'Unable to Add/Remove Ticker To/From Watchlist', severity: 'error' }));
    }
  };

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
          dispatch(setSnackBarObj({ message: 'filter saved successfully', severity: 'success' }));
          getSavedFilters();
        } else {
          dispatch(setSnackBarObj({ message: 'filter not saved', severity: 'error' }));
        }
      } catch (error) {
        dispatch(setSnackBarObj({ message: 'something went wrong', severity: 'error' }));
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
        dispatch(setSnackBarObj({ message: 'filter deleted successfully', severity: 'info' }));
      } else {
        dispatch(setSnackBarObj({ message: 'filter not deleted', severity: 'error' }));
      }
    } catch (error) {
      dispatch(setSnackBarObj({ message: 'something went wroung', severity: 'error' }));
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
        getSavedFilters();
        dispatch(setSnackBarObj({ message: 'filter updated successfully', severity: 'success' }));
      } else {
        dispatch(setSnackBarObj({ message: 'filter not updated', severity: 'error' }));
      }
    } catch (error) {
      dispatch(setSnackBarObj({ message: 'something went wroung', severity: 'error' }));
    }
    setIsFilterLabelOpen(false);
  };

  const clearFilterHandler = state => {
    WatchlistService.clearFilter();
    dispatch(setIsTickerSelected(false));
    dispatch(setSelectedFilter(null));
    dispatch(setIsFilterUpdate(false));
    dispatch(setFilterLabel(''));
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
    rowData.documentType = selectedFileType;
    if (columnId === 'tweetsFlag' && isItSocialCompany(rowData.flag)) {
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
        dispatch(setSelectedWatchlist(rowData));
      } else {
        // add ticker
        watchListDataArr[updatedTickerDetailIndex].isTickerActive = true;
        setWatchlistData(watchListDataArr);
        handleUpload(rowData.ticker);
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

  const handleWatchlistTickers = (ticker, isTickerAdded) => {
    let index = gridData2.findIndex(d => d.ticker === ticker);
    let data = cloneDeep(gridData2);
    if (isTickerAdded) {
      if (selectedUniverse === 'watchlist') {
        data.splice(index, 1);
      } else {
        data[index].isTickerActive = false;
      }
      deleteTicker(ticker, true);
    } else {
      handleUpload(ticker, true);
      data[index].isTickerActive = true;
    }
    setGridData2(data);
  };
  useEffect(() => {
    if (selectedFileType === '10-Q' || selectedFileType === '10-K') {
      setGridData(processWatchlistData());
    }
  }, [processWatchlistData, selectedFileType]);
  return (
    <>
      <WatchlistFilterLabelDialog
        saveFilter={saveFilter}
        updateFilter={updateFilter}
        isFilterLabelOpen={isFilterLabelOpen}
        closeDialog={handleCloseAgGridFilterLabelDialog}
      />
      <WatchlistFiltersList
        deleteFilter={deleteFilter}
        savedFiltersList={savedFiltersList}
        isSavedFilterDialog={isSavedFilterDialog}
        handleCloseAgGridFilterDialog={handleCloseAgGridFilterDialog}
      />
      {WatchlistService.getAgGridAColunms().columns.length > 0 && (
        <WatchlistCustomColumnsSideBar
          handleColumns={handleColumns}
          dispalyedColumns={dispalyedColumns}
          currentCol={currentCol}
          open={isAgGridSideBarOpen}
          handleCloseAgGridSideBar={handleCloseAgGridSideBar}
          isAgGridActions={isAgGridActions}
          title={isAgGridActions ? 'Actions' : 'Show/Hide Columns'}
        />
      )}
      <WatchListCustomEmailAlertsSideBar
        open={isAgGridEmailAlerts}
        handleCloseAgGridSideBar={() => setIsAgGridEmailAlerts(false)}
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
        alignItems="center"
        spacing={1}
        className={classes.space}>
        <Grid item xs={12} sm={5} md={6} lg={8}>
          <WatchlistFilters clearFilterHandler={clearFilterHandler} />
        </Grid>
        <Grid item xs={12} sm={7} md={6} lg={4} className={classes.screenBtnGroupContainer}>
          <Box className={`d-flex align-items-center ${classes.screenBtnGroup}`}>
            {isFilterActive ? (
              <>
                {isFilterUpdate && savedFiltersList.length >= 1 ? (
                  <>
                    <Button
                      color="primary"
                      variant="contained"
                      className={classes.button}
                      size="small"
                      onClick={handleOpenAgGridFilterLabelDialog}>
                      Update Screen
                    </Button>
                  </>
                ) : (
                  <Button
                    color="primary"
                    variant="contained"
                    className={classes.button}
                    size="small"
                    onClick={handleOpenAgGridFilterLabelDialog}>
                    Save Screen
                  </Button>
                )}
                <Button
                  color="primary"
                  className={classes.button}
                  size="small"
                  variant="contained"
                  onClick={clearFilterHandler}>
                  Clear Filters
                </Button>
              </>
            ) : null}
            <Button
              color="primary"
              variant="contained"
              className={classes.button}
              size="small"
              onClick={() => setTopicDialogOpen(true)}>
              Add Watchlist
            </Button>
          </Box>
        </Grid>
      </Grid>
      <>
        <span style={filterLabel ? screenTitle : { display: 'none' }}>{filterLabel}</span>
        <div className={classes.watchlistTableContainer} style={{ display: 'flex', height: window.innerHeight - 160 }}>
          <WatchlistTable
            tableData={isBigAgGrid(selectedFileType) ? gridData : gridData2}
            onColumnClick={onColumnClick}
            handleWatchlistTickers={handleWatchlistTickers}
          />
          <div style={{ width: 20, marginTop: 5 }}>
            <div className={classes.agButtons} onClick={() => handleOpenAgGridSideBar(false)}>
              Columns
            </div>
            <br />
            <div className={classes.agButtons} onClick={() => handleOpenAgGridSideBar(true)}>
              Actions
            </div>
            <div className={classes.agButtons} style={{ marginTop: '20px' }} onClick={handleOpenAgGridFilterDialog}>
              Screens
            </div>
            <div
              className={classes.agButtons}
              style={{ marginTop: '20px' }}
              onClick={() => setIsAgGridEmailAlerts(true)}>
              Email Alerts
            </div>
          </div>
        </div>
      </>

      <WatchlistTopicDialog
        open={topicDialogOpen}
        onClose={() => setTopicDialogOpen(false)}
        error={topicAddingError}
        onUpload={handleUpload}
      />
    </>
  );
};

export default Watchlist;
