import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty, get } from 'lodash';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community';
import {
  parseDateStrMoment,
  parseNumber,
  percentFormater,
  currencyFormater,
  descriptionValueStyler,
  changeWordGetter,
  changeWordFormatter,
  dateFormaterMoment,
  numberWordComparator,
  lastReportedState
} from './WatchlistTableHelpers';
import { setSidebarToggle, setSidebarToggleMobile } from '../../reducers/ThemeOptions';
import WatchlistService from './WatchlistService';
import WordStatus from './WatchlistTableComponents/WordStatus';
import AddRemoveIcon from './WatchlistTableComponents/AddRemoveIcon';
import TickerLogo from './WatchlistTableComponents/TickerLogo';
import './watchlistTableStyles.css';
import Action from './WatchlistActions/WatchlistActions';
import { useLocation } from 'react-router-dom';
import { saveComparisionSettings, getComparisionSettings } from '../comparision/ComparisionHelper';
import { checkIsFilterActive } from './WatchlistHelpers';
import { setIsFilterActive } from '../../reducers/Watchlist';
import { getPriorityKeyValue } from '../../utils/helpers'
const frameworkComponents = {
  WordStatusRenderer: WordStatus,
  AddRemoveIcon: AddRemoveIcon,
  TickerLogo: TickerLogo,
  actions: Action
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
      id: 'Actions',
      labelDefault: 'Actions',
      labelKey: 'actions',
      iconKey: 'columns',
      toolPanel: 'actions'
    }
  ],
  position: 'right',
  defaultToolPanel: null
};

const colDefs = [
  {
    headerName: 'Actions',
    headerTooltip: 'Add/Remove Ticker',
    field: 'isTickerActive',
    colId: 'actions',
    filter: false,
    cellClass: ['center-align-left', 'no-padding'],
    cellRenderer: 'AddRemoveIcon',
    width: 36,
    resizable: false,
    suppressMenu: false,
    menuTabs: ['generalMenuTab'],
    pinned: 'left',
    headerClass: ['actionColumnHeader']
  },
  {
    headerName: 'Ticker',
    headerTooltip: 'Ticker',
    field: 'ticker',
    colId: 'ticker',
    width: 118,
    minWidth: 118,
    cellClass: ['center-align-text'],
    filter: 'agTextColumnFilter',
    suppressMenu: false,
    menuTabs: ['generalMenuTab'],
    pinned: 'left',
    cellRenderer: 'TickerLogo'
  },
  {
    headerName: 'Company Name',
    headerTooltip: 'Company Name',
    field: 'companyName',
    colId: 'companyName',
    width: 197,
    filter: 'agTextColumnFilter',
    menuTabs: ['generalMenuTab'],
    suppressMenu: false,
    pinned: 'left'
  },
  {
    headerName: 'Sector',
    headerTooltip: 'Sector',
    field: 'sector',
    width: 142,
    colId: 'sector',
    filter: 'agTextColumnFilter'
  },
  {
    headerName: 'Industry',
    headerTooltip: 'Industry',
    field: 'industry',
    colId: 'industry',
    width: 158,
    filter: 'agTextColumnFilter'
  },
  {
    headerName: 'Market Cap in Millions',
    headerTooltip: 'Market Cap',
    field: 'mktcap',
    colId: 'mktcap',
    width: 117,
    filter: 'agNumberColumnFilter',
    filterParams: {
      numberParser: text => {
        if (text === null) {
          text = null;
        } else {
          if (!isNaN(parseFloat(text.replace(',', '.')))) {
            text = parseFloat(text.replace(',', '.'));
          }
        }
        return text;
      }
    },
    valueGetter: params => parseNumber(get(params, 'data.mktcap', null)),
    valueFormatter: params => currencyFormater(params.value, 0, 'USD'),
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
    width: 127,
    filterParams: {
      numberParser: text => {
        if (text === null) {
          text = null;
        } else {
          if (!isNaN(parseFloat(text.replace(',', '.')))) {
            text = parseFloat(text.replace(',', '.'));
          }
        }
        return text;
      }
    },
    valueGetter: params => parseNumber(get(params, 'data.adv', null)),
    valueFormatter: params => currencyFormater(params.value, 0, 'USD'),
    cellStyle: () => {
      return { textAlign: 'right' };
    }
  },
  {
    headerName: 'Last Reported',
    headerTooltip: 'Last Reported',
    field: 'last',
    colId: 'last',
    width: 117,
    sort: lastReportedState,
    valueGetter: params => parseDateStrMoment(get(params, 'data.last', null)),
    valueFormatter: params => dateFormaterMoment(params.value),
    filter: 'agDateColumnFilter',
    cellClass: ['center-align-text'],
    getQuickFilterText: params => dateFormaterMoment(params.value)
  },
  {
    headerName: 'Period Date',
    headerTooltip: 'Period Date',
    field: 'periodDate',
    colId: 'periodDate',
    width: 117,
    sort: lastReportedState,
    valueGetter: params => parseDateStrMoment(get(params, 'data.periodDate', null)),
    valueFormatter: params => dateFormaterMoment(params.value),
    filter: 'agDateColumnFilter',
    cellClass: ['center-align-text'],
    getQuickFilterText: params => dateFormaterMoment(params.value)
  },
  {
    headerName: 'Aggregated Sentiment',
    headerTooltip: `The aggregated sentiment of the parsed text using \n SMA\`s proprietary Financial NLP`,
    field: 'sentiment',
    width: 112,
    colId: 'sentiment',
    type: 'numericColumn',
    filter: 'agNumberColumnFilter',
    valueGetter: params => {
      const sentimentValue = get(params, 'data.sentiment', null);
      let sentimentObj = null;
      if (sentimentValue) {
        sentimentObj = {
          number: parseNumber(get(params, 'data.sentiment', null)),
          word: changeWordGetter(getPriorityKeyValue(params, "sentimentWord"))
        };
      }
      return sentimentObj;
    },
    valueFormatter: params => percentFormater(params, true),
    comparator: numberWordComparator,
    filterParams: {
      valueGetter: params => {
        const value = get(params, 'data.sentiment', null);
        return value !== null ? parseNumber(value) : null;
      }
    },
    cellStyle: params => {
      return params.data.isColorEnable ? descriptionValueStyler(params) : null;
    }
  },
  {
    headerName: 'Sentiment Quintile',
    headerTooltip: 'Sentiment Quintile',
    field: 'sentimentWord',
    colId: 'sentimentWord',
    width: 106,
    valueGetter: params => {
      return {
        number: parseNumber(get(params, 'data.sentiment', null)),
        word: changeWordGetter(getPriorityKeyValue(params, "sentimentWord"))
      };
    },
    valueFormatter: params => {
      return changeWordFormatter(params.value.word);
    },
    comparator: numberWordComparator,
    filterParams: {
      valueGetter: params => {
        return getPriorityKeyValue(params, "sentimentWord")
      }
    },
    cellRenderer: 'WordStatusRenderer'
  },
  {
    headerName: 'Sentiment Change',
    headerTooltip: "The raw change in `Sentiment` from the company`s most recent filing of the same type.",
    field: 'sentimentChange',
    colId: 'sentimentChange',
    type: 'numericColumn',
    filter: 'agNumberColumnFilter',
    width: 104,
    valueGetter: params => {
      const sentimentValue = get(params, 'data.sentimentChange', null);
      let sentimentObj = null;
      if (sentimentValue) {
        sentimentObj = {
          number: parseNumber(sentimentValue),
          word: changeWordGetter(getPriorityKeyValue(params, "sentimentChangeWord"))
        };
      }
      return sentimentObj;
    },
    valueFormatter: params => percentFormater(params, true),
    comparator: numberWordComparator,
    filterParams: {
      valueGetter: params => {
        const value = get(params, 'data.sentimentChange', null);
        return value !== null ? parseNumber(value) : null;
      }
    },
    cellStyle: params => {
      return params.data.isColorEnable ? descriptionValueStyler(params) : null;
    }
  },
  {
    headerName: 'Sentiment Change Quintile',
    headerTooltip: 'Sentiment Change Quintile',
    field: 'sentimentChangeWord',
    colId: 'sentimentChangeWord',
    width: 118,
    valueGetter: params => {
      const sentimentValue = get(params, 'data.sentimentChange', null);
      let sentimentObj = null;
      if (sentimentValue) {
        sentimentObj = {
          number: parseNumber(sentimentValue),
          word: changeWordGetter(getPriorityKeyValue(params, "sentimentChangeWord"))
        };
      }
      return sentimentObj;
    },
    valueFormatter: params => {
      return changeWordFormatter(params.value ? params.value.word : null);
    },
    comparator: numberWordComparator,
    filterParams: {
      valueGetter: params => {
        return getPriorityKeyValue(params, "sentimentChangeWord")
      }
    },
    cellRenderer: 'WordStatusRenderer'
  },
  {
    headerName: 'Word Count Change',
    headerTooltip: `The raw change in Word Count of the parsed text from the company\`s most recent filing of the same type.`,
    field: 'wordCountChange',
    colId: 'wordCountChange',
    type: 'numericColumn',
    filter: 'agNumberColumnFilter',
    width: 93,
    valueGetter: params => {
      const sentimentValue = get(params, 'data.wordCountChange', null);
      let sentimentObj = null;
      if (sentimentValue) {
        sentimentObj = {
          number: parseNumber(sentimentValue),
          word: changeWordGetter(getPriorityKeyValue(params, "wordCountChangePercentWord"))
        };
      }
      return sentimentObj;
    },

    valueFormatter: params => {
      if (params.value !== null) {
        return currencyFormater(params.value.number, 0, '');
      }
      return null;
    },
    cellStyle: params => {
      return params.data.isColorEnable ? descriptionValueStyler(params) : null;
    },
    comparator: numberWordComparator,
    filterParams: {
      valueGetter: params => {
        const value = get(params, 'data.wordCountChange', null);
        return value !== null ? parseNumber(value) : null;
      }
    }
  },
  {
    headerName: 'Word Count Change Percentage',
    headerTooltip:
      "The percentage change in Word Count of the parsed text from the company`s most recent filing of the same type.",
    field: 'wordCountChangePercent',
    colId: 'wordCountChangePercent',
    type: 'numericColumn',
    filter: 'agNumberColumnFilter',
    width: 109,
    valueGetter: params => {
      const sentimentValue = get(params, 'data.wordCountChangePercent', null);
      let sentimentObj = null;
      if (sentimentValue) {
        sentimentObj = {
          number: parseNumber(sentimentValue),
          word: changeWordGetter(getPriorityKeyValue(params, "wordCountChangePercentWord"))
        };
      }
      return sentimentObj;
    },
    valueFormatter: params => percentFormater(params, false),
    comparator: numberWordComparator,
    filterParams: {
      valueGetter: params => {
        const value = get(params, 'data.wordCountChangePercent', null);
        return value !== null ? parseNumber(value) : null;
      }
    },
    cellStyle: params => {
      return params.data.isColorEnable ? descriptionValueStyler(params) : null;
    }
  },
  {
    headerName: 'Word Count Change Quintile',
    headerTooltip:
      'Quintile of the security for that Factor , ' +
      'Lowest – First quintile of the factor (1st - 20th percentile) ,  ' +
      'Low – Second quintile of the factor (21st - 40th percentile) ,  ' +
      'Median – Third quintile of the factor (41st - 60th percentile) ,  ' +
      'High – Fourth quintile of the factor (61st - 80th percentile)  , ' +
      'Highest – Fifth quintile of the factor (81st - 100th percentile)',
    field: 'wordCountChangePercentWord',
    colId: 'wordCountChangePercentWord',
    width: 115,
    valueGetter: params => {
      const sentimentValue = get(params, 'data.wordCountChangePercent', null);
      let sentimentObj = null;
      if (sentimentValue) {
        sentimentObj = {
          number: parseNumber(sentimentValue),
          word: changeWordGetter(getPriorityKeyValue(params, "wordCountChangePercentWord"))
        };
      }
      return sentimentObj;
    },
    valueFormatter: params => {
      return changeWordFormatter(params.value ? params.value.word : null);
    },
    comparator: numberWordComparator,
    filterParams: {
      valueGetter: params => {
        return getPriorityKeyValue(params, "wordCountChangePercentWord")
      }
    },
    cellRenderer: 'WordStatusRenderer'
  }
];

const WatchlistTable = props => {
  const dispatch = useDispatch();
  const { searchText, selectedMetric, isTickerSelected } = useSelector(state => state.Watchlist);
  const [gridApi, setGridApi] = useState(null);
  let getQueryParams = new URLSearchParams(useLocation().search);
  const storeColumnsState = params => {
    const columnState = params.columnApi.getColumnState();
    props.storeColumnsState(columnState);
    var padding = 40;
    var height = headerHeightGetter() + padding;
    params.api.setHeaderHeight(height);
    params.api.resetRowHeights();
  };
  React.useEffect(() => {
    if (!gridApi) {
      return;
    }
    const tickerFilterInstance = gridApi.getFilterInstance('ticker');
    if (isTickerSelected) {
      tickerFilterInstance.setModel({
        type: 'equals',
        filter: searchText
      });
    }
    gridApi.onFilterChanged();
  }, [isTickerSelected, gridApi, searchText]);

  const cellClicked = async params => {
    if (params.data) {
      let comparisionSection = getComparisionSettings() ? getComparisionSettings() : {};
      comparisionSection.comparisionSection = selectedMetric;
      saveComparisionSettings(comparisionSection);
      dispatch(setSidebarToggle(true));
      dispatch(setSidebarToggleMobile(true));
      props.onColumnClick(params.data, params.column.colId);
      gridApi.closeToolPanel();
    }
  };

  const storeFilteringState = params => {
    const filteringModel = params.api.getFilterModel();
    props.storeFilteringState(filteringModel);
    dispatch(setIsFilterActive(checkIsFilterActive()));
  };

  const handleGridReady = params => {
    WatchlistService.init(params.api, params.columnApi); // global service
    setGridApi(params.api);
    const stateKey = 'watchlist::state';
    const currentColumnsState = localStorage.getItem(stateKey);
    let columns = JSON.parse(currentColumnsState);
    if (columns) {
      props.storeColumnsState(columns);
    } else {
      const columnState = params.columnApi.getColumnState();
      props.storeColumnsState(columnState);
    }
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
  function headerHeightGetter() {
    var columnHeaderTexts = [...document.querySelectorAll('.ag-header-cell-text')];
    var clientHeights = columnHeaderTexts.map(headerText => headerText.clientHeight);
    var tallestHeaderTextHeight = Math.max(...clientHeights);

    return tallestHeaderTextHeight;
  }

  const handleFirstDataRendered = params => {
    const columnsState = props.columnsState;
    const filteringState = props.filteringState;
    var padding = 40;
    var height = headerHeightGetter() + padding;
    params.api.setHeaderHeight(height);
    params.api.resetRowHeights();

    if (columnsState && columnsState.length) {
      params.columnApi.applyColumnState({
        state: columnsState,
        applyOrder: true
      });
    }

    if (filteringState && !isEmpty(filteringState)) {
      params.api.setFilterModel(filteringState);
    }
    const tickerFilterInstance = gridApi.getFilterInstance('ticker');
    if (getQueryParams.get('ticker')) {
      tickerFilterInstance.setModel({
        type: 'equals',
        filter: getQueryParams.get('ticker')
      });
    }
    gridApi.onFilterChanged();
  };
  
  return (
    <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
      <AgGridReact
        sortingOrder={['asc', 'desc']}
        onGridReady={handleGridReady}
        onFirstDataRendered={handleFirstDataRendered}
        rowData={props.data}
        getRowNodeId={d => d.ticker}
        immutableData={true}
        quickFilterText={searchText}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        sideBar={sideBarConfiguration}
        tooltipShowDelay={0}
        pagination={true}
        rowSelection="single"
        gridOptions={gridOptions}
        multiSortKey="ctrl"
        frameworkComponents={frameworkComponents}
        onCellClicked={cellClicked}
        onColumnResized={storeColumnsState}
        onColumnMoved={storeColumnsState}
        onColumnVisible={storeColumnsState}
        onSortChanged={storeColumnsState}
        suppressScrollOnNewData={true}
        enableBrowserTooltips={true}
        onFilterChanged={storeFilteringState}></AgGridReact>
    </div>
  );
};

export default WatchlistTable;
