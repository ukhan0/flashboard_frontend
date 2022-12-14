import { get } from 'lodash';
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
} from '../components/watchlist/WatchlistTableHelpers';

export const watchlistTableDefaultColDef = {
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
export const watchlistTableColDefs = [
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
    width: 130,
    minWidth: 130,
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
    colId: 'sector_',
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
    colId: 'industry_',
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
    headerTooltip: `The aggregated sentiment of the parsed text using \n CA\`s proprietary Financial NLP`,
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
      'Lowest ??? First quintile of the factor (1st - 20th percentile) ,  ' +
      'Low ??? Second quintile of the factor (21st - 40th percentile) ,  ' +
      'Median ??? Third quintile of the factor (41st - 60th percentile) ,  ' +
      'High ??? Fourth quintile of the factor (61st - 80th percentile)  , ' +
      'Highest ??? Fifth quintile of the factor (81st - 100th percentile)',
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
    field: 'countryName',
    colId: 'countryCode',
    width: 158,
    filter: 'agTextColumnFilter',
    cellRenderer: 'CountryCodeRenderer',
    cellStyle: params => {
      return getCellStyle({});
    }
  }
];

export const watchlistTableColDefs1 = [
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
    width: 130,
    minWidth: 130,
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
    menuTabs: false,
    editable: false,
    sortable: true,
    colId: 'companyName',
    width: 150
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
    headerName: 'Country',
    headerTooltip: 'Country',
    field: 'countryName',
    colId: 'country',
    width: 150,
    filter: 'agTextColumnFilter',
    cellRenderer: 'CountryCodeRenderer',
    cellStyle: params => {
      return getCellStyle({});
    },
    floatingFilterComponentParams: {
      suppressFilterButton: true
    }
  },
  {
    headerName: 'Aggregate Sentiment',
    field: 'sentiment',
    menuTabs: false,
    editable: false,
    sortable: true,
    colId: 'agrregate_sentiment',
    type: 'numericColumn',
    filter: 'agNumberColumnFilter',
    width: 150,
    sortingOrder: ['desc', 'asc']
  },
  {
    headerName: 'Word Count',
    field: 'wordCount',
    menuTabs: false,
    editable: false,
    sortable: true,
    sortingOrder: ['desc', 'asc'],
    colId: 'word_count',
    type: 'numericColumn',
    filter: 'agNumberColumnFilter',
    width: 150
  },
  {
    headerName: 'Document Date',
    headerTooltip: 'document_date',
    field: 'document_date',
    colId: 'document_date',
    sortable: true,
    filter: 'agDateColumnFilter',
    cellClass: ['center-align-text'],
    width: 150,
    sortingOrder: ['desc', 'asc']
  },
  {
    headerName: 'Document Type',
    field: 'documentType',
    menuTabs: false,
    editable: false,
    sortable: true,
    colId: 'document_type',
    width: 150,
    floatingFilterComponentParams: {
      suppressFilterButton: true
    }
  },
  {
    headerName: 'Sector',
    headerTooltip: 'Sector',
    field: 'sector',
    menuTabs: false,
    editable: false,
    sortable: true,
    colId: 'sector',
    width: 150,
    floatingFilterComponentParams: {
      suppressFilterButton: true
    }
  },
  {
    headerName: 'Industry',
    headerTooltip: 'Industry',
    field: 'industry',
    menuTabs: false,
    editable: false,
    sortable: true,
    colId: 'industry',
    width: 150,
    floatingFilterComponentParams: {
      suppressFilterButton: true
    }
  },
  {
    headerName: 'Source',
    headerTooltip: 'Source',
    field: 'source_name',
    menuTabs: false,
    editable: false,
    sortable: true,
    colId: 'source',
    width: 150,
    floatingFilterComponentParams: {
      suppressFilterButton: true
    }
  }
];

export const watchlistTableSideBarConfiguration = {
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

export const homePageTableColumnDefs = [
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
    field: 'documentType',
    menuTabs: false,
    editable: false,
    sortable: true,
    flex: 1,
    colId: 'document_type',
    minWidth: 100
  },
  {
    headerName: 'Document Date',
    headerTooltip: 'document_date',
    field: 'document_date',
    colId: 'document_date',
    sortable: true,
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
    minWidth: 100
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
    minWidth: 100
  }
];
