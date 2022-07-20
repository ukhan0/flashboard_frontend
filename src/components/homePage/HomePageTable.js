import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { get, round } from 'lodash';
import { parseDateStrMoment, dateFormaterMoment } from '../watchlist/WatchlistTableHelpers';
import TickerLogo from '../watchlist/WatchlistTableComponents/TickerLogo';
import { Card, ButtonGroup, Button, InputBase } from '@material-ui/core';
import clsx from 'clsx';
import './HomePageTableStyle.css';
import { setSelectedWatchlist } from '../../reducers/Watchlist';
import { setSidebarToggle, setSidebarToggleMobile } from '../../reducers/ThemeOptions';
import { useDispatch, useSelector } from 'react-redux';
import { setHomePageSelectedItem, setHomePageSearchIndex, setHomePageLoader } from '../../reducers/HomePage';
import config from '../../config/config';
import axios from 'axios';
import { renameDocumentTypes } from '../topic/topicHelpers';
import { homePageTypesSelection } from '../../config/filterTypes';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles, fade } from '@material-ui/core/styles';
import HomePageService from './HomePageService';
import { formatComapnyData } from '../watchlist/WatchlistHelpers';
const frameworkComponents = {
  TickerLogo: TickerLogo
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
//Table headers

const columnDefs = [
  {
    headerName: 'Ticker',
    headerTooltip: 'Ticker',
    field: 'ticker',
    colId: 'ticker',
    width: 100,
    minWidth: 100,
    cellClass: ['center-align-text'],
    filter: 'agTextColumnFilter',
    suppressMenu: false,
    menuTabs: ['generalMenuTab'],
    pinned: 'left',
    cellRenderer: 'TickerLogo',
    sortable: true
  },
  {
    headerName: 'Company Name',
    headerTooltip: 'Company Name',
    field: 'company_name',
    menuTabs: false,
    editable: false,
    sortable: true,
    flex: 1,
    colId: 'company_name',
    minWidth: 150
  },
  {
    headerName: 'Document Type',
    field: 'docType',
    menuTabs: false,
    editable: false,
    sortable: true,
    flex: 1,
    colId: 'document_type',
    minWidth: 100,
    valueFormatter: params => renameDocumentTypes(params.data.document_type)
  },

  {
    headerName: 'Document Date',
    headerTooltip: 'document_date',
    field: 'document_date',
    colId: 'document_date',
    sortable: true,
    valueGetter: params => parseDateStrMoment(get(params, 'data.docDate', null)),
    valueFormatter: params => dateFormaterMoment(params.value),
    filter: 'agDateColumnFilter',
    cellClass: ['center-align-text'],
    minWidth: 50,
    width: 120
  },
  {
    headerName: 'Aggregate Sentiment',
    field: 'sentiment',
    menuTabs: false,
    editable: false,
    sortable: true,
    flex: 1,
    colId: 'agrregate_sentiment',
    type: 'numericColumn',
    filter: 'agNumberColumnFilter',
    minWidth: 100,
    valueGetter: params => {
      const sentimentValue = get(params, 'data.sentiment', 0);
      return sentimentValue;
    }
  },
  {
    headerName: 'Word Count',
    field: 'wordCount',
    menuTabs: false,
    editable: false,
    sortable: true,
    flex: 1,
    colId: 'word_count',
    type: 'numericColumn',
    filter: 'agNumberColumnFilter',
    minWidth: 100,
    valueGetter: params => {
      const sentimentValue = get(params, 'data.wordCount', 0);
      return sentimentValue;
    }
  }
];
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

export default function HomePageTable(props) {
  const classes = useStyles();
  const [recentCompaniesData, setRecentCompaniesData] = useState([]);
  const { homePageSelectedSearchIndex } = useSelector(state => state.HomePage);
  const [cancelToken, setCancelToken] = useState(null);
  const [recentDocumentSearchFilter, setRecentDocumentSearchFilter] = useState(null);
  const [allCompletedCompaniesData, setAllCompletedCompaniesData] = useState([]);
  const {
    isCompleteCompaniesDataLoaded,
    isCompleteCompaniesDataGlobalLoaded,
    completeCompaniesData,
    completeCompaniesDataGlobal
  } = useSelector(state => state.Watchlist);
  const dispatch = useDispatch();
  const tableRef = useRef();

  useEffect(() => {
    setAllCompletedCompaniesData(completeCompaniesData.concat(completeCompaniesDataGlobal));
  }, [completeCompaniesData, completeCompaniesDataGlobal]);

  const setRecentOldId = (item, company, docType = '10-K') => {
    if (docType === '10-K') {
      item.recentId10k = company.recentId10k ? company.recentId10k : company.recentId10q;
      item.oldId10k = company.oldId10k ? company.oldId10k : company.oldId10q;
      item.recentId10q = company.recentId10q ? company.recentId10q : company.recentId10k;
      item.oldId10q = company.oldId10q ? company.oldId10q : company.oldId10k;
      item.oldId = company.oldId10k ? company.oldId10k : company.oldId10q;
      // item.recentId = company.recentId10k ? company.recentId10k : company.recentId10q;
      item.comparisonType = '10-K';
    } else {
      item.recentId10k = company.recentId10k ? company.recentId10k : company.recentId10q;
      item.oldId10k = company.oldId10k ? company.oldId10k : company.oldId10q;
      item.recentId10q = company.recentId10q ? company.recentId10q : company.recentId10k;
      item.oldId10q = company.oldId10q ? company.oldId10q : company.oldId10k;
      item.oldId = company.oldId10q ? company.oldId10q : company.oldId10k;
      // item.recentId = company.recentId10q ? company.recentId10q : company.recentId10k;
      item.comparisonType = '10-Q';
    }
    return item;
  };

  const cellClicked = params => {
    if (params.data) {
      let item = { ...params.data, companyName: params.data.company_name, recentId: params.data.document_id };
      if (isCompleteCompaniesDataGlobalLoaded && isCompleteCompaniesDataLoaded) {
        let company = allCompletedCompaniesData.find(item => item.ticker === params.data.ticker);
        company = formatComapnyData(company);
        if (params.data.docType === '10-K') {
          item = setRecentOldId(item, company, '10-K');
        } else if (params.data.docType === '10-Q') {
          item = setRecentOldId(item, company, '10-Q');
        } else {
          item = setRecentOldId(item, company, '10-K');
        }
      }
      dispatch(setSelectedWatchlist(item));
      dispatch(setHomePageSelectedItem(params.data));
      dispatch(setSidebarToggle(false));
      dispatch(setSidebarToggleMobile(false));
    }
  };

  const getRecentCompaniesData = React.useCallback(
    async searchIndex => {
      dispatch(setHomePageLoader(true));
      const cancelToken = axios.CancelToken.source();
      try {
        setCancelToken(cancelToken);
        const response = await axios.get(
          `${config.apiUrl}/api/get_company_filing_listing?index=${searchIndex.key}&order=DESC&limit=100&type=${searchIndex.type}`,
          {
            cancelToken: cancelToken.token
          }
        );
        const data = get(response, 'data.data', []);
        if (response) {
          setCancelToken(null);
          const recentData = data.map(d => {
            return {
              ...d,
              docType: get(d, 'document_type', null),
              sentiment: round(get(d, 'sentiment', null), 2),
              // sentimentWord: get(d['10k'].totdoc, 'sentimentWord', null),
              docDate: get(d, 'document_date', null),
              wordCount: round(get(d, 'word_count', null), 2)
              // wordCountChangePercentWord: get(d['10k'].totdoc, 'wordCountChangePercentWord', null)
            };
          });

          setRecentCompaniesData(recentData);
          dispatch(setHomePageSelectedItem(get(recentData, '[0]', null)));
          dispatch(setHomePageLoader(false));
        } else {
          dispatch(setHomePageSelectedItem({}));
          setRecentCompaniesData([]);
          dispatch(setHomePageLoader(false));
        }
      } catch (error) {
        dispatch(setHomePageSelectedItem({}));
        setRecentCompaniesData([]);
        dispatch(setHomePageLoader(false));
      }
    },
    [dispatch]
  );

  const onSearchTextChange = e => {
    setRecentDocumentSearchFilter(e.target.value);
  };

  useEffect(() => {
    getRecentCompaniesData(homePageSelectedSearchIndex);
  }, [getRecentCompaniesData, homePageSelectedSearchIndex]);

  const handleHomePageSearchIndex = diff => {
    if (cancelToken) {
      cancelToken.cancel();
    }
    setRecentDocumentSearchFilter('');
    dispatch(setHomePageSearchIndex(diff));
  };
  useEffect(() => {
    if (HomePageService.agGridColumnAPI) {
      if (homePageSelectedSearchIndex.id === 3) {
        HomePageService.mangeAgGridColunms('ticker', false);
      } else {
        HomePageService.mangeAgGridColunms('ticker', true);
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

  return (
    <Card className="card-box mb-4" style={{ height: '600px' }}>
      <div className={clsx('card-header')}>
        <div className="card-header--title font-weight-bold">Recent Documents Rehan</div>
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
      <div className="ag-theme-alpine" style={{ height: '90%', width: '100%' }}>
        <AgGridReact
          ref={tableRef}
          alwaysShowHorizontalScroll={true}
          columnDefs={columnDefs}
          rowSelection="single"
          rowData={recentCompaniesData}
          suppressCellSelection={true}
          frameworkComponents={frameworkComponents}
          onCellClicked={cellClicked}
          onColumnResized={storeColumnsState}
          onSortChanged={storeColumnsState}
          onColumnMoved={storeColumnsState}
          onGridReady={handleOnGridReady}
          multiSortKey={'ctrl'}
          quickFilterText={recentDocumentSearchFilter}
          defaultColDef={defaultColDef}></AgGridReact>
      </div>
    </Card>
  );
}
