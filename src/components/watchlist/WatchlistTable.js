import React from 'react';
import { connect } from 'react-redux';
import { isEmpty, get } from 'lodash';
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
  dateFormater
} from './WatchlistTableHelpers';
import WatchlistService from './WatchlistService';
import WordStatus from './WatchlistTableComponents/WordStatus';
import AddRemoveIcon from './WatchlistTableComponents/AddRemoveIcon';
import './watchlistTableStyles.css';

const frameworkComponents = {
  WordStatusRenderer: WordStatus,
  AddRemoveIcon: AddRemoveIcon
};

const defaultColDef = {
  sortable: true,
  filter: true,
  resizable: true,
  floatingFilter: true,
  suppressMenu: true
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
    headerName: 'Edit',
    headerTooltip: 'Edit',
    field: 'edit',
    colId: 'edit',
    filter: false,
    cellClass: ['center-align-text'],
    cellRenderer: 'AddRemoveIcon'
  },
  {
    headerName: 'Ticker',
    headerTooltip: 'Ticker',
    field: 'ticker',
    colId: 'ticker',
    cellClass: ['center-align-text'],
    filter: 'agTextColumnFilter'
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
    colId: 'sector',
    filter: 'agTextColumnFilter'
  },
  {
    headerName: 'Industry',
    headerTooltip: 'Industry',
    field: 'industry',
    colId: 'industry',
    filter: 'agTextColumnFilter'
  },
  {
    headerName: 'Market Cap in Millions',
    headerTooltip: 'Market Cap',
    field: 'mktcap',
    colId: 'mktcap',
    filter: 'agNumberColumnFilter',
    valueGetter: params => parseNumber(get(params, 'data.mktcap', null)),
    cellStyle: () => {
      return { textAlign: 'right' };
    }
  },
  {
    headerName: 'Avg Daily $ Value',
    headerTooltip: 'Avg Daily $ Value',
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
    cellClass: ['center-align-text'],
    getQuickFilterText: params => dateFormater(params.value)
  },
  {
    headerName: 'Sentiment',
    children: [
      {
        headerName: 'Value',
        headerTooltip: 'Value',
        field: 'sentiment',
        colId: 'sentiment',
        filter: 'agNumberColumnFilter',
        valueGetter: params => parseNumber(get(params, 'data.sentiment', null)),
        valueFormatter: percentFormater,
        cellStyle: currencyStyler
      },
      {
        headerName: 'Value Description',
        headerTooltip: 'Value Description',
        field: 'sentimentWord',
        colId: 'sentimentWord',
        valueGetter: params => {
          return {
            number: parseNumber(get(params, 'data.sentiment', null)),
            word: changeWordGetter(get(params, 'data.sentimentWord', null))
          };
        },
        valueFormatter: params => {
          return changeWordFormatter(params.value.word);
        },
        comparator: (value1, value2) => value1.number - value2.number,
        cellRenderer: 'WordStatusRenderer'
      }
    ]
  },
  {
    headerName: 'Sentiment Change',
    children: [
      {
        headerName: '% Change',
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
        headerName: '% Change Description',
        headerTooltip: 'Sentiment Change Word',
        field: 'sentimentChangeWord',
        colId: 'sentimentChangeWord',
        valueGetter: params => {
          return {
            number: parseNumber(get(params, 'data.sentimentChange', null)),
            word: changeWordGetter(
              get(params, 'data.sentimentChangeWord', null)
            )
          };
        },
        valueFormatter: params => {
          return changeWordFormatter(params.value.word);
        },
        comparator: (value1, value2) => value1.number - value2.number,
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
        valueGetter: params => {
          return {
            number: parseNumber(get(params, 'data.wordCountChange', null)),
            word: changeWordGetter(
              get(params, 'data.wordCountChangePercentWord', null)
            )
          };
        },
        valueFormatter: params => {
          return changeWordFormatter(params.value.word);
        },
        comparator: (value1, value2) => value1.number - value2.number,
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

  const storeFilteringState = params => {
    const filteringModel = params.api.getFilterModel();
    props.storeFilteringState(filteringModel);
  };

  const handleGridReady = params => {
    WatchlistService.init(params.api, params.columnApi); // global service
  };

  const handleFirstDataRendered = params => {
    const columnsState = props.columnsState;
    const filteringState = props.filteringState;

    if (columnsState && columnsState.length) {
      params.columnApi.applyColumnState({
        state: columnsState,
        applyOrder: true
      });
    }

    if (filteringState && !isEmpty(filteringState)) {
      params.api.setFilterModel(filteringState);
    }
  };

  return (
    <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
      <AgGridReact
        onGridReady={handleGridReady}
        onFirstDataRendered={handleFirstDataRendered}
        rowData={props.data}
        quickFilterText={searchText}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        sideBar={sideBarConfiguration}
        tooltipShowDelay={0}
        pagination={true}
        domLayout="autoHeight"
        multiSortKey="ctrl"
        onCellClicked={cellClicked}
        frameworkComponents={frameworkComponents}
        onColumnResized={storeColumnsState}
        onColumnMoved={storeColumnsState}
        onColumnVisible={storeColumnsState}
        onSortChanged={storeColumnsState}
        onFilterChanged={storeFilteringState}></AgGridReact>
    </div>
  );
};

const mapStateToProps = state => ({
  searchText: state.Watchlist.searchText
});

export default connect(mapStateToProps)(WatchlistTable);
