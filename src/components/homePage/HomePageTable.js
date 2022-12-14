import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { get, round, cloneDeep } from 'lodash';
import { parseDateAndFormatMoment } from '../watchlist/WatchlistTableHelpers';
import TickerLogo from '../watchlist/WatchlistTableComponents/TickerLogo';
import Card from '@material-ui/core/Card';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import clsx from 'clsx';
import './HomePageTableStyle.css';
import { setSelectedWatchlist } from '../../reducers/Watchlist';
import { setSidebarToggle, setSidebarToggleMobile } from '../../reducers/ThemeOptions';
import { useDispatch, useSelector } from 'react-redux';
import { setHomePageLoader, hideHomePageLoader } from '../../reducers/HomePage';
import config from '../../config/config';
import axios from 'axios';
import { renameDocumentTypes } from '../topic/topicHelpers';
import { homePageTypesSelection } from '../../config/filterTypes';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles/colorManipulator';
import makeStyles from '@material-ui/core/styles/makeStyles';
import HomePageService from './HomePageService';
import { getCompanyByIndex } from '../watchlist/WatchlistHelpers';
import AddRemoveIcon from '../watchlist/WatchlistTableComponents/AddRemoveIcon';
import { getUserWatchlist } from './HomePageAction';
import { setSnackBarObj } from '../../reducers/Alerts';
import { homePageTableColumnDefs } from '../../config/columnDefinations';

const frameworkComponents = {
  TickerLogo: TickerLogo,
  AddRemoveIcon: AddRemoveIcon
};
const defaultColDef = {
  resizable: true,
  headerComponentParams: {
    template:
      '<div class="ag-cell-label-container" role="presentation">' +
      '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
      '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
      '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
      '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
      '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
      '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
      '    <span ref="eText" class="ag-header-cell-text" role="columnheader" style="white-space: normal;"></span>' +
      '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
      '  </div>' +
      '</div>'
  }
};

const useStyles = makeStyles(theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(1),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto'
    }
  },
  searchIconContainer: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchIcon: {
    fontSize: '.8rem'
  },
  inputRoot: {
    color: 'inherit',
    borderBottom: '1px solid #ece1e1'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch'
      }
    }
  }
}));
const selectDefaultType = process.env?.REACT_APP_DOMAIN_NAME === 'TMX' ? 'SEDAR' : 'SEC';
const homePageSelectedIndexFromConfig = homePageTypesSelection.find(item => item.type === selectDefaultType);

export default function HomePageTable() {
  const classes = useStyles();
  const [recentCompaniesData, setRecentCompaniesData] = useState([]);
  const { globalWatchlist, domesticWatchlist, homePageSelectedWidgetRegion } = useSelector(state => state.HomePage);
  const { completeCompaniesData, completeCompaniesDataGlobal } = useSelector(state => state.Watchlist);
  const [cancelToken, setCancelToken] = useState(null);
  const [rowsOfRecentDocumentsTable, setRowsOfRecentDocumentsTable] = useState(0);
  const [recentDocumentSearchFilter, setRecentDocumentSearchFilter] = useState('');
  const [recentCompaniesDataTable, setRecentCompaniesDataTable] = useState([]);
  const [homePageSelectedSearchIndex, setHomePageSelectedSearchIndex] = useState(homePageSelectedIndexFromConfig);
  const dispatch = useDispatch();
  const tableRef = useRef();
  const selectedType = 'domestic';

  const setRecentOldId = (item, company, documentType = '10-K') => {
    if (documentType === '10-K') {
      item.recentId10k = company.recentId10k ? company.recentId10k : company.recentId10q;
      item.oldId10k = company.oldId10k ? company.oldId10k : company.oldId10q;
      item.recentId10q = company.recentId10q ? company.recentId10q : company.recentId10k;
      item.oldId10q = company.oldId10q ? company.oldId10q : company.oldId10k;
      item.oldId = company.oldId10k ? company.oldId10k : company.oldId10q;
      // item.recentId = company.recentId10k ? company.recentId10k : company.recentId10q;
      item.comparisonType = '10-K';
      item.documentType = '10-K';
    } else {
      item.recentId10k = company.recentId10k ? company.recentId10k : company.recentId10q;
      item.oldId10k = company.oldId10k ? company.oldId10k : company.oldId10q;
      item.recentId10q = company.recentId10q ? company.recentId10q : company.recentId10k;
      item.oldId10q = company.oldId10q ? company.oldId10q : company.oldId10k;
      item.oldId = company.oldId10q ? company.oldId10q : company.oldId10k;
      // item.recentId = company.recentId10q ? company.recentId10q : company.recentId10k;
      item.comparisonType = '10-Q';
      item.documentType = '10-Q';
    }
    item.isFromHomePage = true;
    return item;
  };

  const addTicker = async ticker => {
    const user = JSON.parse(localStorage.getItem('user'));

    try {
      const response = await axios.post(`${config.apiUrl}/api/save_watchlist`, {
        user_id: user.id,
        ticker: ticker,
        delete_old_values: false,
        watchlist_type: selectedType
      });
      const responsePayload = get(response, 'data', null);
      if (responsePayload && !responsePayload.error) {
        dispatch(setSnackBarObj({ message: 'Ticker added in Watchlist', severity: 'success' }));
        dispatch(getUserWatchlist(['domestic', 'global']));
      } else {
        dispatch(setSnackBarObj({ message: responsePayload.message, severity: 'error' }));
      }
    } catch (error) {
      console.log(error);
      dispatch(setSnackBarObj({ message: 'Unable to Add/Remove Ticker To/From Watchlist', severity: 'error' }));
    }
  };

  const deleteTicker = async ticker => {
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      const response = await axios.delete(`${config.apiUrl}/api/delete_watchlist/${user.id}/${ticker}/${selectedType}`);
      const responsePayload = get(response, 'data', null);
      if (responsePayload && !responsePayload.error) {
        dispatch(setSnackBarObj({ message: 'Ticker removed from Watchlist', severity: 'info' }));
        dispatch(getUserWatchlist(['domestic', 'global']));
      } else {
        dispatch(setSnackBarObj({ message: 'Unable to Add/Remove Ticker To/From Watchlist', severity: 'error' }));
      }
    } catch (error) {
      dispatch(setSnackBarObj({ message: 'Unable to Add/Remove Ticker To/From Watchlist', severity: 'error' }));
    }
  };

  const changeTickerStatus = (ticker, tickerStatus) => {
    let indexs = recentCompaniesDataTable.filter((word, _index, _arr) => {
      let data = word;
      if (word.ticker === ticker) {
        data.isTickerActive = tickerStatus;
      }
      return data;
    });
    setRecentCompaniesDataTable(indexs);
  };
  const cellClicked = async params => {
    if (params.data) {
      let rowId = params.column.colId;
      if (rowId === 'actions') {
        let ticker = params.data.ticker;
        if (params.data.isTickerActive) {
          changeTickerStatus(ticker, false);
          deleteTicker(ticker);
        } else {
          changeTickerStatus(ticker, true);
          addTicker(ticker);
        }
        return;
      }

      let company = await getCompanyByIndex(params.data.ticker, completeCompaniesData, completeCompaniesDataGlobal);
      let item = { ...params.data, companyName: params.data.company_name, recentId: params.data.document_id };
      if (company) {
        if (params.data.documentType === '10-K') {
          item = await setRecentOldId(item, company, '10-K');
        } else if (params.data.documentType === '10-Q') {
          item = await setRecentOldId(item, company, '10-Q');
        } else {
          item = await setRecentOldId(item, company, '10-K');
        }
      }
      dispatch(setSelectedWatchlist(item));
      dispatch(setSidebarToggle(false));
      dispatch(setSidebarToggleMobile(false));
    }
  };

  const getRecentCompaniesData = React.useCallback(async () => {
    dispatch(setHomePageLoader());
    const cancelToken = axios.CancelToken.source();
    try {
      setCancelToken(cancelToken);
      const response = await axios.get(
        `${config.apiUrl}/api/get_company_filing_listing?index=${homePageSelectedSearchIndex.key}&order=DESC&limit=100&type=${homePageSelectedSearchIndex.type}&from=${rowsOfRecentDocumentsTable}`,
        {
          cancelToken: cancelToken.token
        }
      );
      const data = get(response, 'data.data', []);
      if (response) {
        setCancelToken(null);
        const recentData = data.map(d => {
          return {
            isTickerActive: false,
            ticker: d.ticker,
            company_name: d.company_name ?? '',
            documentType: renameDocumentTypes(get(d, 'document_type', '')),
            document_date: parseDateAndFormatMoment(get(d, 'document_date', '')),
            sentiment: round(get(d, 'sentiment', null), 2),
            wordCount: round(get(d, 'word_count', null), 2)
          };
        });

        setRecentCompaniesData(prevState => [...prevState, ...recentData]);
      } else {
        setRecentCompaniesData([]);
        setRowsOfRecentDocumentsTable(0);
      }
    } catch (error) {
      setRecentCompaniesData([]);
      setRowsOfRecentDocumentsTable(0);
    } finally {
      dispatch(hideHomePageLoader());
    }
  }, [dispatch, rowsOfRecentDocumentsTable, homePageSelectedSearchIndex.key, homePageSelectedSearchIndex.type]);

  const onSearchTextChange = e => {
    setRecentDocumentSearchFilter(e.target.value);
  };

  useEffect(() => {
    getRecentCompaniesData();
  }, [getRecentCompaniesData]);

  const handleHomePageSearchIndex = diff => {
    if (cancelToken) {
      cancelToken.cancel();
    }
    setRecentDocumentSearchFilter('');
    setRecentCompaniesData([]);
    setRowsOfRecentDocumentsTable(0);
    setHomePageSelectedSearchIndex(diff);
  };
  useEffect(() => {
    if (HomePageService.agGridColumnAPI) {
      if (homePageSelectedSearchIndex.id === 3) {
        HomePageService.mangeAgGridColunms('ticker', false);
        HomePageService.mangeAgGridColunms('actions', false);
      } else {
        HomePageService.mangeAgGridColunms('ticker', true);
        HomePageService.mangeAgGridColunms('actions', true);
      }
    }
  }, [homePageSelectedSearchIndex]);

  const handleOnGridReady = params => {
    HomePageService.init(params.api, params.columnApi);
    const columnsState = HomePageService.getColumnState();
    if (columnsState && columnsState.length) {
      params.columnApi.applyColumnState({
        state: columnsState,
        applyOrder: true
      });
    } else {
      const columnState = params.columnApi.getColumnState();
      HomePageService.storeColumnsState(columnState);
    }
  };

  const storeColumnsState = params => {
    const columnState = params.columnApi.getColumnState();
    if (params.type === 'columnMoved') {
      HomePageService.storeColumnsState(columnState);
    }
    if (params.type === 'columnResized') {
      HomePageService.storeColumnsState(columnState);
    }
  };

  const handleOnViewportChanged = event => {
    if (event.lastRow && event.lastRow !== -1) {
      if (event.lastRow + 1 === rowsOfRecentDocumentsTable + 100) {
        setRowsOfRecentDocumentsTable(rowsOfRecentDocumentsTable + 100);
      }
    }
  };

  useEffect(() => {
    let userWatchlist = [];
    let watchlist = globalWatchlist.concat(domesticWatchlist);
    for (let i = 0; i < recentCompaniesData.length; i++) {
      let findTicker = watchlist.find(e => e.ticker === recentCompaniesData[i].ticker);
      if (findTicker) {
        recentCompaniesData[i].isTickerActive = true;
      }
      userWatchlist.push(recentCompaniesData[i]);
    }
    setTimeout(() => {
      setRecentCompaniesDataTable(userWatchlist);
    }, [100]);
  }, [globalWatchlist, domesticWatchlist, recentCompaniesData]);

  useEffect(() => {
    if (homePageSelectedWidgetRegion.type === 'Canada') {
      setHomePageSelectedSearchIndex(homePageTypesSelection.find(item => item.type === 'SEDAR'));
    } else {
      setHomePageSelectedSearchIndex(homePageTypesSelection.find(item => item.type === 'SEC'));
    }
  }, [homePageSelectedWidgetRegion]);

  return (
    <Card className="card-box mb-4" style={{ height: '100%' }}>
      <div className={clsx('card-header')}>
        <div className="card-header--title font-weight-bold drag-handle">Recent Documents</div>
        <>
          <div className={classes.search}>
            <div className={classes.searchIconContainer}>
              <SearchIcon className={classes.searchIcon} />
            </div>
            <InputBase
              placeholder="Search..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              value={recentDocumentSearchFilter}
              inputProps={{ 'aria-label': 'search' }}
              onChange={onSearchTextChange}
            />
          </div>
        </>
        <ButtonGroup color="primary">
          {homePageTypesSelection.map((diff, i) => (
            <Button
              size="small"
              key={`diff_${i}`}
              onClick={() => handleHomePageSearchIndex(diff)}
              variant={diff.key === homePageSelectedSearchIndex.key ? 'contained' : 'outlined'}>
              {diff.label}
            </Button>
          ))}
        </ButtonGroup>
      </div>
      <div className="ag-theme-alpine" style={{ height: '90.5%', width: '100%' }}>
        <AgGridReact
          ref={tableRef}
          alwaysShowHorizontalScroll={true}
          columnDefs={homePageTableColumnDefs}
          rowSelection="single"
          rowData={cloneDeep(recentCompaniesDataTable)}
          suppressCellSelection={true}
          frameworkComponents={frameworkComponents}
          onCellClicked={cellClicked}
          onColumnResized={storeColumnsState}
          onSortChanged={storeColumnsState}
          onColumnMoved={storeColumnsState}
          onGridReady={handleOnGridReady}
          multiSortKey={'ctrl'}
          quickFilterText={recentDocumentSearchFilter}
          defaultColDef={defaultColDef}
          suppressScrollOnNewData={true}
          onViewportChanged={handleOnViewportChanged}></AgGridReact>
      </div>
    </Card>
  );
}
