import { getSentimentSettings } from '../components/sentiment/SentimentHelper';
export const SET_SENTIMENT_RESULT = 'SENTIMENT/SET_SENTIMENT_RESPONSE_DATA';
export const SET_SEARCH_ID = 'SENTIMENT/SET_SEARCH_ID';
export const SET_CARD_GRAPH_DATA = 'SENTIMENT/SET_GRAPH_DATA';
export const SET_IS_LOADING = 'SENTIMENT/SET_IS_LOADING';
export const SET_SELECTED_HEADING_ID = 'SENTIMENT/SET_SELECTED_HEADING_ID';
export const SET_IS_PIN = 'SENTIMENT/SET_IS_PIN';
export const SET_SENTIMENT_DRAWER_OPEN = 'TOPIC/SET_SENTIMENT_DRAWER_OPEN ';
export const SET_CURRENT_TOC = 'TOPIC/SET_CURRENT_TOC ';
export const SET_SHOW_TOC_BUTTON = 'TOPIC/SET_SHOW_TOC_BUTTON  ';
export const SET_IS_API_RESPONSE_RECEIVED = 'TOPIC/SET_IS_API_RESPONSE_RECEIVED ';
export const SET_SENTIMENT = 'TOPIC/SET_SENTIMENT ';
export const SET_SENTIMENT_HIGHLIGHTS = 'TOPIC/SET_SENTIMENT_HIGHLIGHTS';

export const setSentimentResult = (data, recentId) => ({
  type: SET_SENTIMENT_RESULT,
  data,
  recentId
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

export const setSelectedHeadingId = selectedHeadingId => ({
  type: SET_SELECTED_HEADING_ID,
  selectedHeadingId
});

export const setIsPin = isPin => ({
  type: SET_IS_PIN,
  isPin
});

export const setSentimentDrawerOpen = isSentimentDrawerOpen => ({
  type: SET_SENTIMENT_DRAWER_OPEN,
  isSentimentDrawerOpen
});

export const setShowTocButton = isTocButton => ({
  type: SET_SHOW_TOC_BUTTON,
  isTocButton
});

export const setCurrentToc = currentToc => ({
  type: SET_CURRENT_TOC,
  currentToc
});

export const setIsApiResponseReceived = isApiResponseReceived => ({
  type: SET_IS_API_RESPONSE_RECEIVED,
  isApiResponseReceived
});

export const setSentimentFilters = sentiment => ({
  type: SET_SENTIMENT,
  sentiment
});

export const setSentimentHighlights= sentimentHighlights => ({
  type: SET_SENTIMENT_HIGHLIGHTS,
  sentimentHighlights
});

const getDefaultState = () => {
  return {
    cardGraphData: [
      {
        heading: 'RISK & FACTORS',
        content: 'Neutral',
        num: 23,
        percent: 67,
        data: [0, 10, 5, 3, 6, 12, 17]
      },
      {
        heading: 'MANAGEMENT & DESCUSSION',
        content: 'Extermely High',
        num: 132,
        percent: 32,
        data: [0, 10, 6, 3, 10, 12, 56]
      },
      { heading: 'NOTES TO  FINANCIAL STATEMENT', content: 'High', num: 93, percent: 21, data: [0, 10, 6, 3, 9, 5, 17] }
    ],
    data: null,
    sentimentRecentId: null,
    isLoading: false,
    selectedHeadingId: null,
    isPin: false,
    isSentimentDrawerOpen: false,
    isTocButton: true,
    currentToc: false,
    isApiResponseReceived: false,
    sentiment: getSentimentSettings() ? getSentimentSettings() : 'visible',
    sentimentHighlights: [],
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
      return { ...state, data: action.data, sentimentRecentId: action.recentId};
    case SET_SEARCH_ID:
      return { ...state, searchId: action.searchId };
    case SET_CARD_GRAPH_DATA:
      return { ...state, cardGraphData: action.cardGraphData };
    case SET_IS_LOADING:
      return { ...state, isLoading: action.isLoading };
    case SET_SELECTED_HEADING_ID:
      return { ...state, selectedHeadingId: action.selectedHeadingId };
    case SET_IS_PIN:
      return { ...state, isPin: action.isPin };
    case SET_SENTIMENT_DRAWER_OPEN:
      return { ...state, isSentimentDrawerOpen: action.isSentimentDrawerOpen };
    case SET_SHOW_TOC_BUTTON:
      return { ...state, isTocButton: action.isTocButton };
    case SET_CURRENT_TOC:
      return { ...state, currentToc: action.currentToc };
    case SET_IS_API_RESPONSE_RECEIVED:
      return { ...state, isApiResponseReceived: action.isApiResponseReceived };
    case SET_SENTIMENT:
      return { ...state, sentiment: action.sentiment };
    case SET_SENTIMENT_HIGHLIGHTS:
      return { ...state, sentimentHighlights: action.sentimentHighlights };

    default:
      break;
  }
  return state;
}
