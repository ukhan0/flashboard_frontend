export const SET_SENTIMENT_RESULT = 'SENTIMENT/SET_SENTIMENT_RESPONSE_DATA';
export const SET_SEARCH_ID = 'SENTIMENT/SET_SEARCH_ID';
export const SET_CARD_GRAPH_DATA = 'SENTIMENT/SET_GRAPH_DATA';
export const SET_IS_LOADING = 'SENTIMENT/SET_IS_LOADING';

export const setSentimentResult = data => ({
  type: SET_SENTIMENT_RESULT,
  data
});

export const setSearchId = searchId => ({
  type: SET_SEARCH_ID,
  searchId
});
export const setCardGraphData = cardGraphData => ({
  type: SET_CARD_GRAPH_DATA,
  cardGraphData
});

export const setIsLoading = isLoading => ({
  type: SET_IS_LOADING,
  isLoading
});

const getDefaultState = () => {
  return {
    cardGraphData: [
      {
        heading: 'RISK & FACTORS',
        content: 'Neutral',
        num: 23,
        percent: 67,
        data:[0,10,5,3,6,12,17]
      },
      {
        heading: 'MANAGEMENT & DESCUSSION',
        content: 'Extermely High',
        num: 132,
        percent: 32,
        data:[0,10,6,3,10,12,56]
      },
      { heading: 'NOTES TO  FINANCIAL STATEMENT', content: 'High', num: 93, percent: 21,data:[0,10,6,3,9,5,17] }
    ],
    data: null,
    isLoading: false,
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
      return { ...state, data: action.data };
    case SET_SEARCH_ID:
      return { ...state, searchId: action.searchId };
    case SET_CARD_GRAPH_DATA:
      return { ...state, cardGraphData: action.cardGraphData };
    case SET_IS_LOADING:
      return { ...state, isLoading: action.isLoading };
  
    default:
      break;
  }
  return state;
}
