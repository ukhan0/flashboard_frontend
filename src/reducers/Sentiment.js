export const SET_SENTIMENT_RESULT = 'SENTIMENT/SET_SENTIMENT_RESPONSE_DATA';
export const SET_SEARCH_ID = 'SENTIMENT/SET_SEARCH_ID';

export const setSentimentResult = sentimentData => ({
  type: SET_SENTIMENT_RESULT,
  sentimentData
});
export const setSearchId = searchId => ({
  type: SET_SEARCH_ID,
  searchId
});

const getDefaultState = () => {
  return {
    sentimentData: { },
    searchId: ''
  };
};

export default function reducer(
  state = {
    ...getDefaultState()
  },
  action
) {
  switch (action.type) {
    case SET_SENTIMENT_RESULT:
      return { ...state, sentimentData: action.sentimentData };
    case SET_SEARCH_ID:
      return { ...state, searchId: action.searchId };

    default:
      break;
  }
  return state;
}