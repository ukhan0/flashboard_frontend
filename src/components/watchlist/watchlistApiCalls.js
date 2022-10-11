import config from '../../config/config';
import { get, round } from 'lodash';
import axios from 'axios';
import { setCancelExistingDocumentTypeCalls } from './../../reducers/Watchlist';
import { setDocTypeSendEmail } from '../../reducers/Watchlist';

const getSelectedType = (selectedType, selectedFileType, selectedUniverse) => {
  if (selectedType === 'newGlobal') {
    return 'domestic';
  } else if (isCanadaWatchlistRecent10K10Q(selectedType, selectedFileType, selectedUniverse)) {
    return 'domestic';
  } else {
    return selectedType;
  }
};
const isCanadaWatchlistRecent10K10Q = (selectedType, selectedFileType, selectedUniverse) => {
  if (
    selectedType === 'global' &&
    (selectedFileType === '10-K' || selectedFileType === '10-Q') &&
    (selectedUniverse === 'recent' || selectedUniverse === 'watchlist')
  ) {
    return true;
  } else {
    return false;
  }
};

const changeDocType = docType => {
  const doc = { '10-K': '10k', '10-Q': '10q' };

  return doc[docType] ? doc[docType] : '10k';
};
export const getWatchlistFileTypeEmailAlertStatus = () => {
  let fileTypesEmailStatus = [];
  return async dispatch => {
    try {
      const response = await axios.get(`${config.apiUrl}/api/get_doc_type_email_status`);
      const responseData = get(response, 'data.data', []);
      fileTypesEmailStatus = responseData.map(document => {
        return {
          doc_type: get(document, 'doc_type', '').toUpperCase(),
          send_email: document.send_email === 1
        };
      });
    } catch (e) {
      fileTypesEmailStatus = [];
    } finally {
      dispatch(setDocTypeSendEmail(fileTypesEmailStatus));
    }
  }
};
export const getWatchlist = (selectedUniverse, selectedFileType, selectedType) => {
  let rawData = [];
  const cancelToken = axios.CancelToken.source();
  return async dispatch => {
    try {
      dispatch(setCancelExistingDocumentTypeCalls(cancelToken));
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await axios.get(`${config.apiUrl}/api/get_companies_data`, {
        params: {
          auth_token: user.authentication_token,
          user_id: user.id,
          subject: selectedUniverse,
          doc_type: changeDocType(selectedFileType),
          selected_type: getSelectedType(selectedType, selectedFileType, selectedUniverse),
          countrycode: isCanadaWatchlistRecent10K10Q(selectedType, selectedFileType, selectedUniverse)
            ? 'ca'
            : undefined
        },
        cancelToken: cancelToken.token
      });
      rawData = get(response, 'data.data.content', []);
      dispatch(setCancelExistingDocumentTypeCalls(null));
    } catch (e) {
      rawData = [];
    }
    if (isCanadaWatchlistRecent10K10Q(selectedType, selectedFileType, selectedUniverse)) {
      return rawData.filter(item => item.co === 'CA');
    } else {
      return rawData;
    }
  };
};

export const getWatchlistTable2Data = (
  searchIndex,
  selectedUniverse,
  selectedFileTypes,
  selectedType,
  countryCode,
  sourceName
) => {
  let rawData = [];
  let limit = 100;
  if (selectedUniverse === 'recent') {
    limit = 50;
  }
  if (selectedUniverse === 'all') {
    limit = 1000;
  }
  const cancelToken = axios.CancelToken.source();
  return async dispatch => {
    try {
      dispatch(setCancelExistingDocumentTypeCalls(cancelToken));
      const response = await axios.get(`${config.apiUrl}/api/get_company_filing_listing`, {
        cancelToken: cancelToken.token,
        params: {
          index: searchIndex,
          order: 'desc',
          limit: limit,
          subject: selectedUniverse,
          document_type: selectedFileTypes,
          selected_type: selectedType,
          ...(countryCode && { country_code: countryCode }),
          ...(sourceName && { source_name: sourceName })
        }
      });

      rawData = get(response, 'data.data', []);
      dispatch(setCancelExistingDocumentTypeCalls(null));
    } catch (e) {
      rawData = [];
    }
    rawData = rawData.map(d => {
      return {
        ...d,
        companyName: get(d, 'company_name', null),
        documentType: get(d, 'document_type', null),
        sentiment: round(get(d, 'sentiment', null), 2),
        // sentimentWord: get(d['10k'].totdoc, 'sentimentWord', null),
        docDate: get(d, 'document_date', null),
        wordCount: round(get(d, 'word_count', null), 2),
        countryCode: get(d, 'countrycode', null),
        sector: get(d, 'sector', null),
        industry: get(d, 'industry', null)
        // wordCountChangePercentWord: get(d['10k'].totdoc, 'wordCountChangePercentWord', null)
      };
    });

    return rawData;
  };
};
