import config from '../../config/config';
import { get, round } from 'lodash';
import axios from 'axios';
import { setCancelExistingDocumentTypeCalls } from './../../reducers/Watchlist';

export const getWatchlist = (selectedUniverse, selectedFileType, selectedType) => {
  let rawData = [];
  const cancelToken = axios.CancelToken.source();
  return async dispatch => {
    try {
      dispatch(setCancelExistingDocumentTypeCalls(cancelToken));
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await axios.get(
        `${config.apiUrl}/api/get_companies_data?auth_token=${user.authentication_token}&user_id=${
          user.id
        }&subject=${selectedUniverse}&doc_type=${selectedFileType}&selected_type=${
          selectedType === 'newGlobal' ? 'domestic' : selectedType
        }`,
        {
          cancelToken: cancelToken.token
        }
      );
      rawData = get(response, 'data.data.content', []);
      dispatch(setCancelExistingDocumentTypeCalls(null));
    } catch (e) {
      rawData = [];
    }
    return rawData;
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
      const response = await axios.get(`${config.apiUrl}/api/get_companies_with_file_type`, {
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
        sector: get(d, 'gics_sector', null),
        industry: get(d, 'gics_industry', null)
        // wordCountChangePercentWord: get(d['10k'].totdoc, 'wordCountChangePercentWord', null)
      };
    });

    return rawData;
  };
};
