import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community';
import { renameDocumentTypes } from '../topic/topicHelpers';
import { parseDateStrMoment, dateFormaterMoment } from '../watchlist/WatchlistTableHelpers';
import WatchlistService from './WatchlistService';
import TickerLogo from './WatchlistTableComponents/TickerLogo';
import './watchlistTableStyles.css';
import { get } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedWatchlist } from '../../reducers/Watchlist';
import { setSidebarToggle, setSidebarToggleMobile } from '../../reducers/ThemeOptions';
import { getCompanyByIndex } from '../watchlist/WatchlistHelpers';
import AddRemoveIcon from '../watchlist/WatchlistTableComponents/AddRemoveIcon';
const frameworkComponents = {
  TickerLogo: TickerLogo,
  AddRemoveIcon: AddRemoveIcon
};

const defaultColDef = {
  sortable: true,
  filter: true,
  resizable: true,
  floatingFilter: true,
  suppressMenu: true,
  filterParams: { newRowsAction: 'keep' },
  headerClass: ['allColumnHeader'],
  wrapText: true,
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

const gridOptions = {
  headerHeight: 80
};

const colDefs = [
  // {
  //   headerName: 'Actions',
  //   headerTooltip: 'Add/Remove Ticker',
  //   field: 'isTickerActive',
  //   colId: 'actions',
  //   filter: false,
  //   cellClass: ['center-align-left'],
  //   cellRenderer: 'AddRemoveIcon',
  //   width: 50,
  //   resizable: false,
  //   suppressMenu: false,
  //   menuTabs: ['generalMenuTab'],
  //   pinned: 'left',
  //   headerClass: ['actionColumnHeader']
  // },
  {
    headerName: 'Ticker',
    headerTooltip: 'Ticker',
    field: 'ticker',
    colId: 'ticker',

    minWidth: 150,
    cellClass: ['center-align-text'],
    filter: 'agTextColumnFilter',
    suppressMenu: false,
    menuTabs: ['generalMenuTab'],
    pinned: 'left',
    cellRenderer: 'TickerLogo'
    // hide: homePageSelectedSearchIndex.id === 3 ? true : false
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
    field: 'documentType',
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
    width: 120,
    sortingOrder: ['desc', 'asc']
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
    sortingOrder: ['desc', 'asc'],
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
    sortingOrder: ['desc', 'asc'],
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

const tableFooter = {
  border: '1px solid #d1d1d1',
  paddingRight: '1.7%',
  position: 'relative',
  top: 0,
  textAlign: 'right',
  width: '100%'
};
const WatchlistTable2 = props => {
  const dispatch = useDispatch();
  const {
    isCompleteCompaniesDataLoaded,
    isCompleteCompaniesDataGlobalLoaded,
    completeCompaniesData,
    completeCompaniesDataGlobal,
    completeCompaniesDataIndexs,
    completeCompaniesDataGlobalIndexs
  } = useSelector(state => state.Watchlist);
  const gridApi = React.useRef(null);
  const [rowCount, setRowCount] = React.useState(0);
  const handleOnGridReady = params => {
    gridApi.current = params.api;
    WatchlistService.initGrid2(params.api, params.columnApi);
    const columnsState = WatchlistService.getColumnStateTable2();
    if (columnsState && columnsState.length) {
      params.columnApi.applyColumnState({
        state: columnsState,
        applyOrder: true
      });
    } else {
      const columnState = params.columnApi.getColumnState();
      WatchlistService.storeColumnsStateTable2(columnState);
    }
  };

  const storeColumnsState = params => {
    const columnState = params.columnApi.getColumnState();
    if (params.type === 'columnMoved') {
      WatchlistService.storeColumnsStateTable2(columnState);
    }
    if (params.type === 'columnResized') {
      WatchlistService.storeColumnsStateTable2(columnState);
    }
  };
  const storeFilteringState = params => {
    if (params?.api?.rowModel?.rowsToDisplay) {
      let data = params?.api?.rowModel?.rowsToDisplay;
      setRowCount(data.length);
      if (data.length < 1) {
        setTimeout(() => {
          gridApi.current.showNoRowsOverlay();
        }, [200]);
      } else {
        gridApi.current.hideOverlay();
      }
    }
  };

  const setRecentOldId = (item, company, documentType = '10-K') => {
    if (documentType === '10-K') {
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

      let company = getCompanyByIndex(
        completeCompaniesDataIndexs,
        completeCompaniesDataGlobalIndexs,
        completeCompaniesData,
        completeCompaniesDataGlobal,
        params.data.ticker,
        isCompleteCompaniesDataGlobalLoaded,
        isCompleteCompaniesDataLoaded
      );
      if (company) {
        if (params.data.documentType === '10-K') {
          item = setRecentOldId(item, company, '10-K');
        } else if (params.data.documentType === '10-Q') {
          item = setRecentOldId(item, company, '10-Q');
        } else {
          item = setRecentOldId(item, company, '10-K');
        }
      }
      dispatch(setSelectedWatchlist(item));
      // dispatch(setHomePageSelectedItem(params.data));
      dispatch(setSidebarToggle(false));
      dispatch(setSidebarToggleMobile(false));
    }
    let rowId = params.column.colId;
    if (rowId === 'actions') {
      // let ticker = params.data.ticker;
      if (params.data.isTickerActive) {
        // changeTickerStatus(ticker, false);
        // deleteTicker(ticker);
      } else {
        // changeTickerStatus(ticker, true);
        // addTicker(ticker);
      }
    }
  };
  React.useEffect(() => {
    if (!gridApi.current) {
      return;
    }
    if (props.data.length > 0) {
      setTimeout(() => {
        let data = gridApi.current.rowModel?.rowsToDisplay;
        setRowCount(data.length);
      }, [100]);
    }
  }, [props]);
  return (
    <div className="ag-theme-alpine" style={{ height: '98%', width: '100%' }}>
      <AgGridReact
        rowData={props.data}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        gridOptions={gridOptions}
        multiSortKey="ctrl"
        frameworkComponents={frameworkComponents}
        alwaysShowHorizontalScroll={true}
        rowSelection="single"
        onCellClicked={cellClicked}
        suppressCellSelection={true}
        onColumnResized={storeColumnsState}
        onSortChanged={storeColumnsState}
        onColumnMoved={storeColumnsState}
        onGridReady={handleOnGridReady}
        onFilterChanged={storeFilteringState}></AgGridReact>
      <div style={tableFooter}>Total Rows : {rowCount}</div>
    </div>
  );
};

export default WatchlistTable2;
