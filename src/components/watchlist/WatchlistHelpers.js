import { forEach, get } from 'lodash';

const fields10k = {
  totdoc: [
    '10k_sentiment',
    '10k_sentiment_word',
    '10k_sentiment_change',
    '10k_sentiment_change_word',
    '10k_word_count_change',
    '10k_word_count_change_percent',
    '10k_word_count_change_percent_word'
  ],
  mda: [
    'mda_10k_sentiment',
    'mda_10k_sentiment_word',
    'mda_10k_sentiment_change',
    'mda_10k_sentiment_change_word',
    'mda_10k_word_count_change',
    'mda_10k_word_count_change_percent',
    'mda_10k_word_count_change_percent_word'
  ],
  rf: [
    'rf_10k_sentiment',
    'rf_10k_sentiment_word',
    'rf_10k_sentiment_change',
    'rf_10k_sentiment_change_word',
    'rf_10k_word_count_change',
    'rf_10k_word_count_change_percent',
    'rf_10k_word_count_change_percent_word'
  ],
  notes: [
    '10k_notes_sum_sent',
    '10k_notes_sum_sent_word',
    '10k_raw_change_in_notes_sum_sent',
    '10k_raw_change_in_notes_sum_sent_word',
    '10k_raw_change_in_notes_word_count',
    '10k_change_in_notes_word_count_percent',
    '10k_change_in_notes_word_count_percent_word'
    // "10k_notes_count": 18,		// available in respone but not required
    // "10k_raw_change_in_notes_count": 21,		// available in respone but not required
  ],
  fss: [
    'fss_10k_sentiment', // not available in response
    'fss_10k_sentiment_word', // not available in response
    'fss_10k_sentiment_change', // not available in response
    'fss_10k_sentiment_change_word', // not available in response
    'fss_10k_word_count_change',
    'fss_10k_word_count_change_percent',
    'fss_10k_word_count_change_percent_word' // not available in response
  ]
};

const fields10q = {
  totdoc: [
    '10q_sentiment',
    '10q_sentiment_word',
    '10q_sentiment_change',
    '10q_sentiment_change_word',
    '10q_word_count_change',
    '10q_word_count_change_percent',
    '10q_word_count_change_percent_word'
  ],
  mda: [
    'mda_10q_sentiment',
    'mda_10q_sentiment_word',
    'mda_10q_sentiment_change',
    'mda_10q_sentiment_change_word',
    'mda_10q_word_count_change',
    'mda_10q_word_count_change_percent',
    'mda_10q_word_count_change_percent_word'
  ],
  rf: [
    'rf_10q_sentiment',
    'rf_10q_sentiment_word',
    'rf_10q_sentiment_change',
    'rf_10q_sentiment_change_word',
    'rf_10q_word_count_change',
    'rf_10q_word_count_change_percent',
    'rf_10q_word_count_change_percent_word'
  ],
  notes: [
    '10q_notes_sum_sent',
    '10q_notes_sum_sent_word',
    '10q_raw_change_in_notes_sum_sent',
    '10q_raw_change_in_notes_sum_sent_word',
    '10q_raw_change_in_notes_word_count',
    '10q_change_in_notes_word_count_percent',
    '10q_change_in_notes_word_count_percent_word'
    // "10q_notes_count": 18,		// available in respone but not required
    // "10q_raw_change_in_notes_count": 21,		// available in respone but not required
  ],
  fss: [
    'fss_10k_sentiment', // not available in response
    'fss_10k_sentiment_word', // not available in response
    'fss_10k_sentiment_change', // not available in response
    'fss_10k_sentiment_change_word', // not available in response
    'fss_10q_word_count_change',
    'fss_10q_word_count_change_percent',
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
      fileTypeData[metricName][fieldKey] = get(
        rawData,
        fields10k[metricName][index],
        null
      );
    });
  });
  return fileTypeData;
};

export const formatData = rawDataArr => {
  return rawDataArr.map(rawData => {
    return {
      ticker: rawData.ticker,
      companyName: rawData.company_name,
      industry: rawData.industry,
      sector: rawData.sector,
      mktcap: rawData.mktcap,
      adv: rawData.adv,
      last10k: rawData.last_10k,
      last10q: rawData.last_10q,
      '10k': formatFileTypeData(fields10k, rawData),
      '10q': formatFileTypeData(fields10q, rawData)
    };
  });
};

const stateKey = 'watchlist::state';
const sortingModelKey = 'watchlist::sortingorder';
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
export const getSortingState = () => {
  const offRampAlertsTableSortingState = localStorage.getItem(sortingModelKey);
  let sortingState = [];
  if (offRampAlertsTableSortingState) {
    try {
      sortingState = JSON.parse(offRampAlertsTableSortingState);
    } catch (error) {
      // logException(error)
    }
  }
  return sortingState;
};

export const getFilteringState = () => {
  const offRampAlertsTableFilteringState = localStorage.getItem(
    filteringModelKey
  );
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

export const storeSortingsState = state => {
  localStorage.setItem(sortingModelKey, JSON.stringify(state));
};

export const storeFilteringState = state => {
  localStorage.setItem(filteringModelKey, JSON.stringify(state));
};
