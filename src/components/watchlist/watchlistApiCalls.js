import config from '../../config/config';
import { get } from 'lodash';
import axios from 'axios';
import { setCancelExistingDocumentTypeCalls } from './../../reducers/Watchlist';

export const getWatchlist = (selectedUniverse, selectedFileType) => {
  let rawData = [];
  const cancelToken = axios.CancelToken.source();
  return async dispatch => {
    try {
      dispatch(setCancelExistingDocumentTypeCalls(cancelToken));
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await axios.get(
        `${config.apiUrl}/api/get_companies_data?auth_token=${user.authentication_token}&user_id=${user.id}&subject=${selectedUniverse}&doc_type=${selectedFileType}`,
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
