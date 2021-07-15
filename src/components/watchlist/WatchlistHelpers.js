import { forEach, get, isEmpty, isArray } from 'lodash';
import { storeCompleteWatchlist, getCompleteWatchlist } from '../../utils/helpers';

const fields10k = {
  totdoc: ['i', 'j', 'k', 'l', 'm', 'n', 'o'],
  mda: ['w', 'x', 'y', 'z', 'aa', 'ab', 'ac'],
  rf: ['ak', 'al', 'am', 'an', 'ao', 'ap', 'aq'],
  notes: [
    'ay',
    'az',
    'ba',
    'bb',
    'bc',
    'bd',
    'be'
    // "bf": 18,		// available in respone but not required
    // "bg": 21,		// available in respone but not required
  ],
  fss: [
    'fss_10k_sentiment', // not available in response
    'fss_10k_sentiment_word', // not available in response
    'fss_10k_sentiment_change', // not available in response
    'fss_10k_sentiment_change_word', // not available in response
    'bq',
    'br',
    'fss_10k_word_count_change_percent_word' // not available in response
  ]
};

const fields10q = {
  totdoc: ['p', 'q', 'r', 's', 't', 'u', 'v'],
  mda: ['ad', 'ae', 'af', 'ag', 'ah', 'ai', 'aj'],
  rf: ['ar', 'as', 'at', 'au', 'av', 'aw', 'ax'],
  notes: [
    'bh',
    'bi',
    'bj',
    'bk',
    'bl',
    'bm',
    'bn'
    // "bo": 18,		// available in respone but not required
    // "bp": 21,		// available in respone but not required
  ],
  fss: [
    'fss_10k_sentiment', // not available in response
    'fss_10k_sentiment_word', // not available in response
    'fss_10k_sentiment_change', // not available in response
    'fss_10k_sentiment_change_word', // not available in response
    'bs',
    'bt',
    'fss_10k_word_count_change_percent_word' // not available in response
  ]
};

const commonColumns = [
  'sentiment',
  'sentimentWord',
  'sentimentChange',
  'sentimentChangeWord',
  'wordCountChange',
  'wordCountChangePercent',
  'wordCountChangePercentWord'
];

const formatFileTypeData = (fileTypeFields, rawData) => {
  const fileTypeData = {};
  forEach(fileTypeFields, (_metricFields, metricName) => {
    fileTypeData[metricName] = {};
    commonColumns.forEach((fieldKey, index) => {
      fileTypeData[metricName][fieldKey] = get(rawData, fileTypeFields[metricName][index], null);
    });
  });
  return fileTypeData;
};

export const formatData = rawDataArr => {
  return rawDataArr.map(rawData => formatComapnyData(rawData));
};

export const formatComapnyData = rawData => {
  return {
    ticker: rawData.ticker,
    companyName: rawData.b,
    industry: rawData.d,
    sector: rawData.c,
    mktcap: rawData.e,
    adv: rawData.f,
    last10k: rawData.last_10k,
    last10q: rawData.last_10q,
    '10k': formatFileTypeData(fields10k, rawData),
    '10q': formatFileTypeData(fields10q, rawData),
    recentId10k: rawData['bu'],
    recentId10q: rawData['bw'],
    oldId10k: rawData['bv'],
    oldId10q: rawData['bx'],
    isTickerActive: get(rawData, 'isTickerActive', false)
  };
};

const stateKey = 'watchlist::state';
const filteringModelKey = 'watchlist::filtering';

export const getColumnState = () => {
  const offRampAlertsTableState = localStorage.getItem(stateKey);
  let columnState = [];
  if (offRampAlertsTableState) {
    try {
      columnState = JSON.parse(offRampAlertsTableState);
    } catch (error) {
      // logException(error)
    }
  }
  return columnState;
};

export const getFilteringState = () => {
  const offRampAlertsTableFilteringState = localStorage.getItem(filteringModelKey);
  let sortingState = [];
  if (offRampAlertsTableFilteringState) {
    try {
      sortingState = JSON.parse(offRampAlertsTableFilteringState);
    } catch (error) {
      // logException(error)
    }
  }
  return sortingState;
};

export const storeColumnsState = state => {
  localStorage.setItem(stateKey, JSON.stringify(state));
};

export const storeFilteringState = state => {
  localStorage.setItem(filteringModelKey, JSON.stringify(state));
};

export const checkIsFilterActive = () => {
  const filteringState = getFilteringState();
  return !isEmpty(filteringState);
};

export const checkIsSortActive = () => {
  const sortingState = getColumnState();
  const activeSortColumns = sortingState.filter(state => state.sort);
  if (activeSortColumns.length === 1) {
    if (activeSortColumns[0].colId === 'last') {
      return false;
    }
  }
  return activeSortColumns.length === 0 ? false : true;
};

export const syncCachedData = newData => {
  const rawCompleteData = getCompleteWatchlist();
  if (!rawCompleteData || !isArray(rawCompleteData)) {
    return;
  }
  newData.forEach(nd => {
    const tickerIndex = rawCompleteData.findIndex(rd => rd.ticker === nd.ticker);
    rawCompleteData[tickerIndex] = nd;
  });
  storeCompleteWatchlist(rawCompleteData);
};
