import React from 'react';
import { connect } from 'react-redux';
import { forEach, isEmpty, get, isNull } from 'lodash';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import {
  parseDateStr,
  parseNumber,
  percentFormater,
  currencyFormater,
  currencyStyler,
  changeWordGetter,
  changeWordFormatter,
  changeWordStyler,
  dateFormater
} from './WatchlistTableHelpers';
import WatchlistService from './WatchlistService';
import WordStatus from './WatchlistTableComponents/WordStatus';
import './watchlistTableStyles.css';

const defaultColDef = {
  sortable: true,
  filter: true,
  resizable: true,
  floatingFilter: true
};

const sideBarConfiguration = {
  toolPanels: [
    {
      id: 'columns',
      labelDefault: 'Columns',
      labelKey: 'columns',
      iconKey: 'columns',
      toolPanel: 'agColumnsToolPanel',
      toolPanelParams: {
        suppressRowGroups: true,
        suppressValues: true
      }
    },
    {
      id: 'filters',
      labelDefault: 'Filters',
      labelKey: 'filters',
      iconKey: 'filter',
      toolPanel: 'agFiltersToolPanel'
    }
  ],
  position: 'right',
  defaultToolPanel: null
};

const colDefs = [
  {
    headerName: 'Ticker',
    headerTooltip: 'Ticker',
    field: 'ticker',
    colId: 'ticker',
    cellClass: ['center-align-text']
  },
  {
    headerName: 'Company Name',
    headerTooltip: 'Company Name',
    field: 'companyName',
    colId: 'companyName',
    filter: 'agTextColumnFilter'
  },
  {
    headerName: 'Sector',
    headerTooltip: 'Sector',
    field: 'sector',
    colId: 'sector'
  },
  {
    headerName: 'Industry',
    headerTooltip: 'Industry',
    field: 'industry',
    colId: 'industry',
    filter: 'agTextColumnFilter'
  },
  {
    headerName: 'Market Cap',
    headerTooltip: 'Market Cap',
    field: 'mktcap',
    colId: 'mktcap',
    filter: 'agNumberColumnFilter',
    valueGetter: params => parseNumber(get(params, 'data.mktcap', null)),
    valueFormatter: params => currencyFormater(params.value, 0),
    cellStyle: currencyStyler
  },
  {
    headerName: 'Average Daily Volume',
    headerTooltip: 'Average Daily Volume',
    field: 'adv',
    colId: 'adv',
    filter: 'agNumberColumnFilter',
    valueGetter: params => parseNumber(get(params, 'data.adv', null)),
    valueFormatter: params => currencyFormater(params.value, 0),
    cellStyle: currencyStyler
  },
  {
    headerName: 'Last Reported',
    headerTooltip: 'Last Reported',
    field: 'last',
    colId: 'last',
    valueGetter: params => parseDateStr(get(params, 'data.last', null)),
    valueFormatter: params => dateFormater(params.value),
    filter: 'agDateColumnFilter',
    cellClass: ['center-align-text']
  },
  {
    headerName: 'Sentiment',
    children: [
      {
        headerName: 'Percent',
        headerTooltip: 'Sentiment Percentage',
        field: 'sentiment',
        colId: 'sentiment',
        filter: 'agNumberColumnFilter',
        valueGetter: params => parseNumber(get(params, 'data.sentiment', null)),
        valueFormatter: percentFormater,
        cellStyle: currencyStyler
      },
      {
        headerName: 'Description',
        headerTooltip: 'Sentiment Word',
        field: 'sentimentWord',
        colId: 'sentimentWord',
        valueGetter: params =>
          changeWordGetter(get(params, 'data.sentimentWord', null)),
        valueFormatter: params => changeWordFormatter(params.value),
        cellRenderer: 'WordStatusRenderer'
      }
    ]
  },
  {
    headerName: 'Sentiment Change',
    children: [
      {
        headerName: 'Percent',
        headerTooltip: 'Sentiment Change Percentage',
        field: 'sentimentChange',
        colId: 'sentimentChange',
        filter: 'agNumberColumnFilter',
        valueGetter: params =>
          parseNumber(get(params, 'data.sentimentChange', null)),
        valueFormatter: percentFormater,
        cellStyle: currencyStyler
      },
      {
        headerName: 'Description',
        headerTooltip: 'Sentiment Change Word',
        field: 'sentimentChangeWord',
        colId: 'sentimentChangeWord',
        valueGetter: params =>
          changeWordGetter(get(params, 'data.sentimentChangeWord', null)),
        valueFormatter: params => changeWordFormatter(params.value),
        cellRenderer: 'WordStatusRenderer'
      }
    ]
  },
  {
    headerName: 'Word Count Change',
    children: [
      {
        headerName: 'Value',
        headerTooltip: 'Word Count Change',
        field: 'wordCountChange',
        colId: 'wordCountChange',
        filter: 'agNumberColumnFilter',
        cellStyle: currencyStyler
      },
      {
        headerName: 'Percent',
        headerTooltip: 'Word Count Change Percentage',
        field: 'wordCountChangePercent',
        colId: 'wordCountChangePercent',
        filter: 'agNumberColumnFilter',
        valueGetter: params =>
          parseNumber(get(params, 'data.wordCountChangePercent', null)),
        valueFormatter: percentFormater,
        cellStyle: currencyStyler
      },
      {
        headerName: 'Description',
        headerTooltip: 'Word Count Change Percent Word',
        field: 'wordCountChangePercentWord',
        colId: 'wordCountChangePercentWord',
        valueGetter: params =>
          changeWordGetter(
            get(params, 'data.wordCountChangePercentWord', null)
          ),
        valueFormatter: params => changeWordFormatter(params.value),
        cellRenderer: 'WordStatusRenderer'
      }
    ]
  }
];

const WatchlistTable = props => {
  const { searchText } = props;

  const storeColumnsState = params => {
    const columnState = params.columnApi.getColumnState();
    props.storeColumnsState(columnState);
  };

  const cellClicked = async params => {
    if (params.data) {
      props.onColumnClick(params.data, params.column.colId);
    }
  };

  const storeSortState = params => {
    const sortingsModel = params.api.getSortModel();
    props.storeSortingsState(sortingsModel);
  };

  const storeFilteringState = params => {
    const filteringModel = params.api.getFilterModel();
    console.log(filteringModel);
    props.storeFilteringState(filteringModel);
  };

  const handleGridReady = params => {
    const columnsState = props.columnsState;
    WatchlistService.init(params.api, params.columnApi); // global service
    // const sortingState = props.sortingState
    // const filteringState = props.filteringState
    // if (columnsState && columnsState.length) {
    //   params.columnApi.setColumnState(columnsState);
    // }

    // if(sortingState && sortingState.length) {
    // 	params.api.setSortModel(sortingState)
    // 	params.api.onSortChanged()
    // }

    // if(filteringState && !isEmpty(filteringState)) {
    // 	console.log(filteringState)
    // 	forEach(filteringState, (columnFilterQuery, columnKey) => {
    // 		params.api.getFilterInstance(columnKey).setModel(columnFilterQuery)
    // 	})
    // 	params.api.onFilterChanged()
    // }
  };

  return (
    <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
      <AgGridReact
        onGridReady={handleGridReady}
        rowData={props.data}
        quickFilterText={searchText}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        sideBar={sideBarConfiguration}
        tooltipShowDelay={0}
        onCellClicked={cellClicked}
        frameworkComponents={{ WordStatusRenderer: WordStatus }}
        onColumnResized={storeColumnsState}
        onColumnMoved={storeColumnsState}
        onColumnVisible={storeColumnsState}
        onSortChanged={storeColumnsState}
        onFilterChanged={storeColumnsState}></AgGridReact>
    </div>
  );
};

const mapStateToProps = state => ({
  searchText: state.Watchlist.searchText
});

export default connect(mapStateToProps)(WatchlistTable);
