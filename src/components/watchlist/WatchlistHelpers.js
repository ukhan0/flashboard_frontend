import { forEach, get } from 'lodash';
import { getSectorIndustryById } from '../watchlist/WatchlistTableHelpers';
import Localbase from 'localbase';
import config from '../../config/config';
import countriesCode from '../../config/countriesCode';

const watchlistStateKey1 = 'watchlistBigGridState';
const watchlistStateKey2 = 'watchlistSmallGridState';

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

export const getStateKeyName = fileType => {
  if (fileType) {
    if (fileType === '10-K' || fileType === '10-Q') {
      return watchlistStateKey1;
    } else {
      return watchlistStateKey2;
    }
  } else {
    return null;
  }
};

export const formatData = rawDataArr => {
  return rawDataArr.map(rawData => formatComapnyData(rawData));
};

export const formatComapnyData = rawData => {
  let isActive = Boolean(parseInt(get(rawData, 'cq', '0')));
  return {
    isActiveFlag: isActive,
    ticker: get(rawData, 'ticker', null),
    companyName: get(rawData, 'b', null),
    industry: getSectorIndustryById(rawData.cc).industry
      ? getSectorIndustryById(rawData.cc).industry
      : get(rawData, 'd'),
    sector: getSectorIndustryById(rawData.cc).sector ? getSectorIndustryById(rawData.cc).sector : get(rawData, 'c'),
    mktcap: rawData.e,
    adv: rawData.f,
    last10k: rawData.last_10k,
    last10q: rawData.last_10q,
    '10-K': formatFileTypeData(fields10k, rawData),
    '10-Q': formatFileTypeData(fields10q, rawData),
    recentId10k: rawData['bu'],
    recentId10q: rawData['bw'],
    oldId10k: rawData['bv'],
    oldId10q: rawData['bx'],
    oldId: rawData['bv'],
    periodDate10k: rawData['ca'],
    periodDate10q: rawData['cb'],
    isTickerActive: get(rawData, 'isTickerActive', false),
    documentId: get(rawData, 'document_id', null),
    cid: get(rawData, 'cid', null),
    companyId: get(rawData, 'cid', null),
    countryCode: get(rawData, 'co', ''),
    countryName: get(
      countriesCode.find(c => c.code === get(rawData, 'co', '')),
      'name',
      ''
    ),
    flag: get(rawData, 'cp', null)
  };
};

// const stateKey = 'watchlist::state';
const filteringModelKey = 'watchlist::filtering';

export const getColumnState = selectedFileType => {
  const stateKey = getStateKeyName(selectedFileType);
  const previousState = localStorage.getItem(stateKey);
  let columnState = [];
  if (previousState) {
    try {
      columnState = JSON.parse(previousState);
    } catch (error) {
      // logException(error)
    }
  }
  return columnState;
};

export const getFilteringState = (onlyFilters = false) => {
  const offRampAlertsTableFilteringState = localStorage.getItem(filteringModelKey);
  let state = {};
  if (offRampAlertsTableFilteringState) {
    try {
      state = JSON.parse(offRampAlertsTableFilteringState);
      if (onlyFilters) {
        delete state['selectedType'];
        delete state['selectedFileType'];
        delete state['selectedUniverse'];
        delete state['selectedMetric'];
      }
    } catch (error) {
      // logException(error)
    }
  }
  return state;
};

export const storeColumnsState = (selectedFileType, state) => {
  const stateKey = getStateKeyName(selectedFileType);
  localStorage.setItem(stateKey, JSON.stringify(state));
};

export const storeFilteringState = state => {
  localStorage.setItem(filteringModelKey, JSON.stringify(state));
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

export const getUser = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user;
};
export const saveUser = user => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const getWatchlistType = () => {
  const watchlistSetting = getWatchlistSettings();
  return watchlistSetting.selectedType;
};

export const getWatchlistSettings = () => {
  const settings = JSON.parse(localStorage.getItem('watchlistSetting'));
  return settings;
};
export const saveWatchlistSettings = setting => {
  localStorage.setItem('watchlistSetting', JSON.stringify(setting));
};

export const isItSocialCompany = flag => {
  const socialCompanyFlags = [2, 6, 13, 15];
  if (flag) {
    flag = parseInt(flag);
    return socialCompanyFlags.includes(flag);
  } else {
    return false;
  }
};

export const isActive = (page, selectedItem) => {
  let disableButton = page.disabled;
  if (page.label === 'Comparison' && (!selectedItem.oldId || selectedItem.document_type === 'AR')) {
    disableButton = true;
  }
  if (page.label === 'Social Sentiment' && !isItSocialCompany(selectedItem.flag)) {
    disableButton = true;
  }
  return disableButton;
};

export const indexedDB = () => {
  let indexDB = new Localbase('db');
  indexDB.config.debug = false;
  return indexDB;
};

export const getCompanyByIndex = async (ticker, completeCompaniesData, completeCompaniesDataGlobal) => {
  try {
    let searchedData = null;
    searchedData = completeCompaniesData.find(a => a.ticker === ticker);
    if (searchedData) {
      return formatComapnyData(searchedData);
    } else {
      searchedData = completeCompaniesDataGlobal.find(a => a.ticker === ticker);
      if (searchedData) {
        return formatComapnyData(searchedData);
      } else {
        return {};
      }
    }
  } catch (error) {
    console.log('error', error);
  }
};

export const getCompanyByCompanyId = async (companyId, completeCompaniesData, completeCompaniesDataGlobal) => {
  try {
    let searchedData = null;
    searchedData = completeCompaniesData.find(a => a.cu === companyId);
    if (searchedData) {
      return formatComapnyData(searchedData);
    } else {
      searchedData = completeCompaniesDataGlobal.find(a => a.cu === companyId);
      if (searchedData) {
        return formatComapnyData(searchedData);
      } else {
        return {};
      }
    }
  } catch (error) {
    console.log('error', error);
  }
};

export const setTickerActiveStatus = async (ticker, status) => {
  try {
    await indexedDB()
      .collection(config.indexDbDomesticCompniesData)
      .doc({ ticker })
      .update({ isTickerActive: status });
  } catch (error) {
    console.log('error', error);
  }
};

export const isBigAgGrid = selectedFileType => {
  let status = true;
  if (!(selectedFileType === '10-K' || selectedFileType === '10-Q')) {
    status = false;
  }
  return status;
};

export const getFilterCountriesArray = filterString => {
  if (filterString) {
    let countryiesArray = countriesCode
      .filter(countryObj => countryObj.name.toLowerCase().includes(filterString.toLowerCase()))
      .map(countryObj => countryObj.code)
      .join(',');
    return countryiesArray;
  } else {
    return '';
  }
};
