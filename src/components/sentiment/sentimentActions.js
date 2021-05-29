import axios from 'axios';
import { setSentimentResult } from '../../reducers/Sentiment';
import { get } from 'lodash';
export const getSentimentData = () => {
  return async dispatch => {
    try {
      const response = await axios.get(`http://engine-spirit.s-factors.com/dictionary/downloaddatajson?id=${2700871}`);
      const sentimentRes = get(response, 'data', []);

      if (response) {
        dispatch(setSentimentResult(sentimentRes));
      } else {
        console.log('something wroung');
      }
    } catch (error) {
      console.log(error);
    }
  };
};
