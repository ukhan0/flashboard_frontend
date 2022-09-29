import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty, get, forEach } from 'lodash';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community';
import countriesCode from '../../config/countriesCode';
import {
  parseNumber,
  percentFormater,
  currencyFormater,
  descriptionValueStyler,
  changeWordGetter,
  changeWordFormatter,
  numberWordComparator,
  lastReportedState,
  dateComparator,
  getCellStyle
} from './WatchlistTableHelpers';
import { renameDocumentTypes } from '../topic/topicHelpers';
import { parseDateStrMoment, dateFormaterMoment } from '../watchlist/WatchlistTableHelpers';
import { setSidebarToggle, setSidebarToggleMobile } from '../../reducers/ThemeOptions';
import WatchlistService from './WatchlistService';
import WordStatus from './WatchlistTableComponents/WordStatus';
import AddRemoveIcon from './WatchlistTableComponents/AddRemoveIcon';
import TickerLogo from './WatchlistTableComponents/TickerLogo';
import CountryCodeRenderer from './WatchlistTableComponents/CountryCodeRenderer';
import TweetsIcon from './WatchlistTableComponents/tweet';
import './watchlistTableStyles.css';
import Action from './WatchlistActions/WatchlistActions';
import { useLocation } from 'react-router-dom';
import { saveComparisionSettings, getComparisionSettings } from '../comparision/ComparisionHelper';
import {
  checkIsFilterActive,
  getWatchlistType,
  isBigAgGrid,
  getWatchlistSettings,
  getCompanyByIndex,
  storeColumnsState,
  getColumnState
} from './WatchlistHelpers';
import {
  setIsFilterActive,
  setSelectedTickerSymbol,
  setIsTickerSelected,
  setSelectedWatchlist
} from '../../reducers/Watchlist';
const frameworkComponents = {
  WordStatusRenderer: WordStatus,
  AddRemoveIcon: AddRemoveIcon,
  TickerLogo: TickerLogo,
  actions: Action,
  CountryCodeRenderer: CountryCodeRenderer,
  TweetIcon: TweetsIcon
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
    cellClass: ['center-align-left'],
    cellRenderer: 'AddRemoveIcon',
    width: 36,
    resizable: false,
    suppressMenu: false,
    menuTabs: ['generalMenuTab'],
    pinned: 'left',
    headerClass: ['actionColumnHeader']
  },
  {
    headerName: 'Tweets',
    headerTooltip: 'Tweets',
    field: 'flag',
    colId: 'tweetsFlag',
    filter: false,
    cellClass: ['align-left'],
    cellRenderer: 'TweetIcon',
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
    cellClass: ['center-align-text'],
    wrapText: false,
    filter: 'agTextColumnFilter',
    suppressMenu: false,
    menuTabs: ['generalMenuTab'],
    pinned: 'left',
    cellRenderer: 'TickerLogo',
    cellStyle: params => {
      return getCellStyle({});
    }
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
    pinned: 'left',
    cellStyle: params => {
      return getCellStyle({});
    }
  },
  {
    headerName: 'Sector',
    headerTooltip: 'Sector',
    field: 'sector',
    colId: 'sector',
    width: 142,
    filter: 'agTextColumnFilter',
    cellStyle: params => {
      return getCellStyle({});
    }
  },
  {
    headerName: 'Industry',
    headerTooltip: 'Industry',
    field: 'industry',
    colId: 'industry',
    width: 158,
    filter: 'agTextColumnFilter',
    cellStyle: params => {
      return getCellStyle({});
    }
  },
  {
    headerName: 'Market Cap in Millions',
    headerTooltip: 'Market Cap',
    field: 'mktcap',
    colId: 'mktcap',
    width: 117,
    filter: 'agNumberColumnFilter',
    filterParams: {
      defaultOption: 'greaterThan',
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
    cellStyle: params => {
      let style = { textAlign: 'right' };
      return getCellStyle(style);
    },
    sortingOrder: ['desc', 'asc']
  },
  {
    headerName: 'Avg Daily $ Value',
    headerTooltip: 'Avg Daily $ Value',
    field: 'adv',
    colId: 'adv',
    filter: 'agNumberColumnFilter',
    width: 127,
    filterParams: {
      defaultOption: 'greaterThan',
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
    cellStyle: params => {
      let style = { textAlign: 'right' };
      return getCellStyle(style);
    },
    sortingOrder: ['desc', 'asc']
  },
  {
    headerName: 'Last Reported',
    headerTooltip: 'Last Reported',
    field: 'last',
    colId: 'last',
    width: 117,
    sort: lastReportedState,
    filter: 'agDateColumnFilter',
    cellClass: ['center-align-text'],
    comparator: dateComparator,
    getQuickFilterText: params => params.value,
    cellStyle: params => {
      return getCellStyle({});
    },
    sortingOrder: ['desc', 'asc']
  },
  {
    headerName: 'Period Date',
    headerTooltip: 'Period Date',
    field: 'periodDate',
    colId: 'periodDate',
    width: 117,
    sort: lastReportedState,
    comparator: dateComparator,
    filter: 'agDateColumnFilter',
    cellClass: ['center-align-text'],
    getQuickFilterText: params => params.value,
    cellStyle: params => {
      return getCellStyle({});
    },
    sortingOrder: ['desc', 'asc']
  },
  {
    headerName: 'Aggregated Sentiment',
    headerTooltip: `The aggregated sentiment of the parsed text using \n SMA\`s proprietary Financial NLP`,
    field: 'sentiment',
    colId: 'sentiment',
    width: 112,
    type: 'numericColumn',
    filter: 'agNumberColumnFilter',
    valueGetter: params => {
      const sentimentValue = get(params, 'data.sentiment', null);
      let sentimentObj = null;
      if (sentimentValue) {
        sentimentObj = {
          number: parseNumber(get(params, 'data.sentiment', null)),
          word: changeWordGetter(get(params, 'data.sentimentWord', null))
        };
      }
      return sentimentObj;
    },
    valueFormatter: params => percentFormater(params, true),
    comparator: numberWordComparator,
    filterParams: {
      defaultOption: 'greaterThan',
      valueGetter: params => {
        const value = get(params, 'data.sentiment', null);
        return value !== null ? parseNumber(value) : null;
      }
    },
    cellStyle: params => {
      let style = get(params.data, 'isColorEnable ', false) ? descriptionValueStyler(params) : {};
      return getCellStyle(style);
    },
    sortingOrder: ['desc', 'asc']
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
        word: changeWordGetter(get(params, 'data.sentimentWord'))
      };
    },
    valueFormatter: params => {
      return changeWordFormatter(params.value.word);
    },
    comparator: numberWordComparator,
    filterParams: {
      valueGetter: params => {
        return get(params, 'data.sentimentWord', null);
      }
    },
    cellRenderer: 'WordStatusRenderer',
    cellStyle: params => {
      return getCellStyle({});
    }
  },
  {
    headerName: 'Sentiment Change',
    headerTooltip: 'The raw change in `Sentiment` from the company`s most recent filing of the same type.',
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
          word: changeWordGetter(get(params, 'data.sentimentChangeWord', null))
        };
      }
      return sentimentObj;
    },
    valueFormatter: params => percentFormater(params, true),
    comparator: numberWordComparator,
    filterParams: {
      defaultOption: 'greaterThan',
      valueGetter: params => {
        const value = get(params, 'data.sentimentChange', null);
        return value !== null ? parseNumber(value) : null;
      }
    },
    cellStyle: params => {
      let style = params.data.isColorEnable ? descriptionValueStyler(params) : {};
      return getCellStyle(style);
    },
    sortingOrder: ['desc', 'asc']
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
          word: changeWordGetter(get(params, 'data.sentimentChangeWord', null))
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
        return get(params, 'data.sentimentChangeWord', null);
      }
    },
    cellRenderer: 'WordStatusRenderer',
    cellStyle: params => {
      return getCellStyle({});
    }
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
          word: changeWordGetter(get(params, 'data.wordCountChangePercentWord', null))
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

    comparator: numberWordComparator,
    filterParams: {
      defaultOption: 'greaterThan',
      valueGetter: params => {
        const value = get(params, 'data.wordCountChange', null);
        return value !== null ? parseNumber(value) : null;
      }
    },
    cellStyle: params => {
      let style = params.data.isColorEnable ? descriptionValueStyler(params) : {};
      return getCellStyle(style);
    },
    sortingOrder: ['desc', 'asc']
  },
  {
    headerName: 'Word Count Change Percentage',
    headerTooltip:
      'The percentage change in Word Count of the parsed text from the company`s most recent filing of the same type.',
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
          number: isNaN(parseNumber(sentimentValue)) ? '' : parseNumber(sentimentValue),
          word: changeWordGetter(get(params, 'data.wordCountChangePercentWord', null))
        };
      }
      return sentimentObj;
    },
    valueFormatter: params => percentFormater(params, false),
    comparator: numberWordComparator,
    filterParams: {
      defaultOption: 'greaterThan',
      valueGetter: params => {
        const value = get(params, 'data.wordCountChangePercent', null);
        return value !== null ? parseNumber(value) : null;
      }
    },
    cellStyle: params => {
      let style = params.data.isColorEnable ? descriptionValueStyler(params) : {};
      return getCellStyle(style);
    },
    sortingOrder: ['desc', 'asc']
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
          word: changeWordGetter(get(params, 'data.wordCountChangePercentWord', null))
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
        return get(params, 'data.wordCountChangePercentWord', null);
      }
    },
    cellRenderer: 'WordStatusRenderer',
    cellStyle: params => {
      return getCellStyle({});
    }
  },
  {
    headerName: 'Country',
    headerTooltip: 'Country',
    field: 'countryCode',
    colId: 'countryCode',
    width: 158,
    filter: 'agTextColumnFilter',
    valueGetter: params => {
      const filteredWatchlist = countriesCode.find(c => get(c, 'code') === get(params, 'data.countryCode'));
      return get(filteredWatchlist, 'name', '');
    },
    cellRenderer: 'CountryCodeRenderer',
    cellStyle: params => {
      return getCellStyle({});
    }
  }
];
const colDefs1 = [
  {
    headerName: 'Actions',
    headerTooltip: 'Add/Remove Ticker',
    field: 'isTickerActive',
    colId: 'actions',
    filter: false,
    cellClass: ['center-align-left'],
    cellRenderer: 'AddRemoveIcon',
    width: 50,
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

    width: 150,
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
    field: 'companyName',
    menuTabs: false,
    editable: false,
    sortable: true,
    flex: 1,
    colId: 'companyName',
    width: 150
  },
  {
    headerName: 'Country',
    headerTooltip: 'Country',
    field: 'countryCode',
    colId: 'countryCode',
    width: 158,
    filter: 'agTextColumnFilter',
    valueGetter: params => {
      const filteredWatchlist = countriesCode.find(c => get(c, 'code') === get(params, 'data.countrycode'));

      return get(filteredWatchlist, 'name', '');
    },
    cellRenderer: 'CountryCodeRenderer',
    cellStyle: params => {
      return getCellStyle({});
    }
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
    width: 100,
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
    width: 100,
    valueGetter: params => {
      const sentimentValue = get(params, 'data.wordCount', 0);
      return sentimentValue;
    }
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
    width: 120,
    sort: lastReportedState,
    sortingOrder: ['desc', 'asc']
  },
  {
    headerName: 'Document Type',
    field: 'documentType',
    menuTabs: false,
    editable: false,
    sortable: true,
    flex: 1,
    colId: 'document_type',
    width: 100,
    valueFormatter: params => renameDocumentTypes(params.data.document_type)
  },
  {
    headerName: 'Sector',
    headerTooltip: 'Sector',
    field: 'gics_sector',
    menuTabs: false,
    editable: false,
    sortable: true,
    flex: 1,
    colId: 'gics_sector',
    width: 150
  },
  {
    headerName: 'Industry',
    headerTooltip: 'Industry',
    field: 'gics_industry',
    menuTabs: false,
    editable: false,
    sortable: true,
    flex: 1,
    colId: 'gics_industry',
    width: 150
  },

  {
    headerName: 'Source',
    headerTooltip: 'Source',
    field: 'source_name',
    menuTabs: false,
    editable: false,
    sortable: true,
    flex: 1,
    colId: 'source_name',
    width: 150
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
const WatchlistTable = props => {
  const dispatch = useDispatch();
  const { selectedMetric, isTickerSelected, selectedType, selectedFileType } = useSelector(state => state.Watchlist);
  const gridApi = React.useRef(null);
  const gridRef = React.useRef();
  const [isFilterData, setIsFilterData] = React.useState(false);
  const [isClear, setIsClear] = React.useState(false);
  let getQueryParams = new URLSearchParams(useLocation().search);
  let isTicker = React.useRef(false);
  const [columnDefination, setColumnDefination] = useState([]);
  const [rowCount, setRowCount] = React.useState(0);

  useEffect(() => {
    isBigAgGrid(selectedFileType) ? setColumnDefination(colDefs) : setColumnDefination(colDefs1);
  }, [selectedFileType]);
  //this function can be used to select first row on load
  const selectTableRow = (data, id, isAutoSelection, rowNode) => {
    let comparisionSection = getComparisionSettings() ? getComparisionSettings() : {};
    comparisionSection.comparisionSection = selectedMetric;
    saveComparisionSettings(comparisionSection);
    dispatch(setSidebarToggle(true));
    dispatch(setSidebarToggleMobile(true));
    props.onColumnClick(data, id);
    gridApi.current.closeToolPanel();
    if (isAutoSelection) {
      rowNode.setSelected(true, true);
    }
  };

  const storeColumnsStateComman = params => {
    const columnState = params.columnApi.getColumnState();

    storeColumnsState(selectedFileType, columnState);
    var padding = 40;
    var height = headerHeightGetter() + padding;
    params.api.setHeaderHeight(height);
    params.api.resetRowHeights();
  };
  const storeChangedColumnsState = params => {
    if (params.type === 'sortChanged' || params.type === 'columnResized' || params.type === 'columnMoved') {
      storeColumnsStateComman(params);
    }
  };

  const storeColumnsStateVisible = params => {
    storeColumnsStateComman(params);
  };

  React.useEffect(() => {
    if (!gridApi.current) {
      return;
    }
    isTicker.current = false;
    const tickerFilterInstance = gridApi.current.getFilterInstance('ticker');
    if (isTickerSelected) {
      isTicker.current = true;
      tickerFilterInstance.setModel({
        type: 'equals',
        filter: ''
      });
    }
    gridApi.current.onFilterChanged();
  }, [isTickerSelected]);
  const handleColumnHideForSedar = useCallback(
    gridApiLocal => {
      let columnDefs = columnDefination;
      columnDefs.forEach(function(colDef) {
        if (colDef.field === 'mktcap' || colDef.field === 'adv') {
          if (getWatchlistType() === 'global') {
            colDef.hide = true;
          } else {
            colDef.hide = false;
          }
        }
      });
      gridApiLocal.setColumnDefs(columnDefs);
    },
    [columnDefination]
  );
  useEffect(() => {
    if (!gridApi.current) {
      return;
    }
    handleColumnHideForSedar(gridApi.current);
  }, [selectedType, handleColumnHideForSedar]);
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
  const cellClicked = async params => {
    if (params.data) {
      let item = { ...params.data, companyName: params.data.company_name, recentId: params.data.id };
      let rowId = params.column.colId;

      if (!isBigAgGrid(selectedFileType)) {
        if (rowId === 'actions') {
          props.handleWatchlistTickers(params.data.ticker, params.data.isTickerActive);
          return;
        }
        let company = await getCompanyByIndex(params.data.ticker);
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
        return;
      }

      selectTableRow(params.data, rowId, false, null);
    }
  };

  const storeFilteringState = params => {
    if (params?.api?.rowModel?.rowsToDisplay) {
      let data = params?.api?.rowModel?.rowsToDisplay;
      setRowCount(data.length);
      if (data.length < 1) {
        setIsFilterData(true);
        setTimeout(() => {
          gridApi.current.showNoRowsOverlay();
        }, [200]);
      } else {
        setIsFilterData(false);
        gridApi.current.hideOverlay();
      }
    }
    setIsClear(WatchlistService.getTickerState());
    const filteringModel = params.api.getFilterModel();
    const watchlistSetting = getWatchlistSettings();
    let selectedType, selectedFileType, selectedUniverse, selectedMetric;
    if (watchlistSetting) {
      selectedType = watchlistSetting.selectedType ? watchlistSetting.selectedType : 'domestic';
      selectedFileType = watchlistSetting.selectedFileType ? watchlistSetting.selectedFileType : '10-K';
      selectedUniverse = watchlistSetting.selectedUniverse ? watchlistSetting.selectedUniverse : 'watchlist';
      selectedMetric = watchlistSetting.selectedMetric ? watchlistSetting.selectedMetric : 'totdoc';
    } else {
      selectedType = 'domestic';
      selectedFileType = '10-K';
      selectedUniverse = 'watchlist';
      selectedMetric = 'totdoc';
    }
    const allSelectedFilters = { ...filteringModel, selectedType, selectedFileType, selectedUniverse, selectedMetric };
    props.storeFilteringState(allSelectedFilters);
    dispatch(setIsFilterActive(checkIsFilterActive()));
  };

  const handleGridReady = params => {
    WatchlistService.init(params.api, params.columnApi); // global service
    gridApi.current = params.api;
    var inputFilters = document.getElementsByClassName('ag-text-field-input');
    forEach(inputFilters, function(data) {
      data.setAttribute('autoComplete', 'new-password');
    });
  };
  function headerHeightGetter() {
    var columnHeaderTexts = [...document.querySelectorAll('.ag-header-cell-text')];
    var clientHeights = columnHeaderTexts.map(headerText => headerText.clientHeight);
    var tallestHeaderTextHeight = Math.max(...clientHeights);

    return tallestHeaderTextHeight;
  }

  const handleFirstDataRendered = params => {
    handleColumnHideForSedar(params.api);
    if (params?.api?.rowModel?.rowsToDisplay) {
      let data = params?.api?.rowModel?.rowsToDisplay;
      setRowCount(data.length);
    }
    const filteringState = props.filteringState;
    var padding = 40;
    var height = headerHeightGetter() + padding;
    params.api.setHeaderHeight(height);
    params.api.resetRowHeights();

    if (filteringState && !isEmpty(filteringState)) {
      params.api.setFilterModel(filteringState);
    }
    const tickerFilterInstance = gridApi.current.getFilterInstance('ticker');
    if (getQueryParams.get('ticker')) {
      tickerFilterInstance.setModel({
        type: 'equals',
        filter: getQueryParams.get('ticker')
      });
    }
    gridApi.current.onFilterChanged();
    //by default select first row on load
    // let data = get(params.api.getDisplayedRowAtIndex(0), 'data', null);
    // if (data) {
    //   selectTableRow(data, 'ticker', true, params.api.getDisplayedRowAtIndex(0));
    // }
    const columnsState = getColumnState(selectedFileType);
    if (columnsState && columnsState.length) {
      gridRef.current.columnApi.applyColumnState({
        state: columnsState,
        applyOrder: true
      });
    }
  };

  React.useEffect(() => {
    if (isClear && isTicker.current) {
      dispatch(setSelectedTickerSymbol(null));
      setIsClear(false);
      dispatch(setIsTickerSelected(false));
    }
  }, [isClear, dispatch]);

  React.useEffect(() => {
    if (!gridApi.current) {
      return;
    }

    if (get(props, 'data', [])) {
      setTimeout(() => {
        let data = gridApi.current.rowModel?.rowsToDisplay;
        setRowCount(data.length);
      }, [100]);
    }
  }, [props]);

  useEffect(() => {
    const columnsState = getColumnState(selectedFileType);
    if (columnsState && columnsState.length) {
      setTimeout(() => {
        gridRef.current.columnApi.applyColumnState({
          state: columnsState,
          applyOrder: true
        });
      }, [500]);
    } else {
      storeColumnsState(selectedFileType, columnsState);
    }
  }, [selectedFileType]);

  return (
    <div className="ag-theme-alpine" style={{ height: '98%', width: '100%' }}>
      <AgGridReact
        ref={gridRef}
        sortingOrder={['asc', 'desc']}
        onGridReady={handleGridReady}
        onFirstDataRendered={handleFirstDataRendered}
        rowData={props.data}
        getRowNodeId={d => (d.ticker ? d.ticker : d.cid)}
        // immutableData={true}
        quickFilterText={''}
        columnDefs={columnDefination}
        defaultColDef={defaultColDef}
        sideBar={sideBarConfiguration}
        tooltipShowDelay={0}
        pagination={false}
        rowSelection="single"
        gridOptions={gridOptions}
        multiSortKey="ctrl"
        frameworkComponents={frameworkComponents}
        onCellClicked={cellClicked}
        onColumnResized={storeChangedColumnsState}
        onColumnMoved={storeChangedColumnsState}
        onColumnVisible={storeColumnsStateVisible}
        onSortChanged={storeChangedColumnsState}
        suppressScrollOnNewData={true}
        enableBrowserTooltips={true}
        context={countriesCode}
        overlayNoRowsTemplate={isFilterData ? 'No result for specified filters' : 'No Rows To Show'}
        onFilterChanged={storeFilteringState}></AgGridReact>
      <div style={tableFooter}>Total Rows : {rowCount}</div>
    </div>
  );
};

export default WatchlistTable;
