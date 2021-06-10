import config from '../../config/config';
import { get } from 'lodash';
import axios from 'axios';

export default {
  getWatchlist: async (selectedUniverse, selectedFileType) => {
    let rawData = []
    try {
      const user = JSON.parse(localStorage.getItem('user'));
        const response = await axios.get(
          `${config.apiUrl}/api/get_saved_wish_list_raw?auth_token=${user.authentication_token}&user_id=${user.id}&subject=${selectedUniverse}&doc_type=${selectedFileType}`
        );
        rawData = get(response, 'data.data.content', []);
    } catch(e) {
      rawData = []
    }
    return rawData
  }
}
