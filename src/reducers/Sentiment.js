import { getSentimentSettings } from '../components/sentiment/SentimentHelpers';
export const SET_SENTIMENT_RESULT = 'SENTIMENT/SET_SENTIMENT_RESPONSE_DATA';
export const SET_SEARCH_ID = 'SENTIMENT/SET_SEARCH_ID';
export const SET_IS_LOADING = 'SENTIMENT/SET_IS_LOADING';
export const SET_SELECTED_HEADING_ID = 'SENTIMENT/SET_SELECTED_HEADING_ID';
export const SET_IS_PIN = 'SENTIMENT/SET_IS_PIN';
export const SET_SENTIMENT_DRAWER_OPEN = 'TOPIC/SET_SENTIMENT_DRAWER_OPEN ';
export const SET_CURRENT_TOC = 'TOPIC/SET_CURRENT_TOC ';
export const SET_SENTIMENT = 'TOPIC/SET_SENTIMENT ';
export const SET_SENTIMENT_SEARCH_INDEX = 'TOPIC/SET_SENTIMENT_SEARCH_INDEX ';
export const SET_IS_HIGHLIGHTED_TEXT = 'TOPIC/SET_IS_HIGHLIGHTED_TEXT';

export const setSentimentSearchIndex = sentimentSearchIndex => ({
  type: SET_SENTIMENT_SEARCH_INDEX,
  sentimentSearchIndex
});

export const setSentimentResult = (data, recentId) => ({
  type: SET_SENTIMENT_RESULT,
  data,
  recentId
});

export const setSearchId = searchId => ({
  type: SET_SEARCH_ID,
  searchId
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

export const setCurrentToc = currentToc => ({
  type: SET_CURRENT_TOC,
  currentToc
});

export const setSentimentFilters = sentiment => ({
  type: SET_SENTIMENT,
  sentiment
});

export const setIsHighlightedText = isHighLightedText => ({
  type: SET_IS_HIGHLIGHTED_TEXT,
  isHighLightedText
});

const getDefaultState = () => {
  return {
    data: null,
    sentimentRecentId: null,
    isLoading: false,
    selectedHeadingId: null,
    isPin: false,
    isSentimentDrawerOpen: false,
    currentToc: false,
    sentiment: getSentimentSettings() ? getSentimentSettings() : 'visible',
    sentimentSearchIndex: '',
    isHighLightedText: false
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
      return { ...state, data: action.data, sentimentRecentId: action.recentId };
    case SET_SEARCH_ID:
      return { ...state, searchId: action.searchId };
    case SET_IS_LOADING:
      return { ...state, isLoading: action.isLoading };
    case SET_SELECTED_HEADING_ID:
      return { ...state, selectedHeadingId: action.selectedHeadingId };
    case SET_IS_PIN:
      return { ...state, isPin: action.isPin };
    case SET_SENTIMENT_DRAWER_OPEN:
      return { ...state, isSentimentDrawerOpen: action.isSentimentDrawerOpen };
    case SET_CURRENT_TOC:
      return { ...state, currentToc: action.currentToc };
    case SET_SENTIMENT:
      return { ...state, sentiment: action.sentiment };
    case SET_SENTIMENT_SEARCH_INDEX:
      return { ...state, sentimentSearchIndex: action.sentimentSearchIndex };
    case SET_IS_HIGHLIGHTED_TEXT:
      return { ...state, isHighLightedText: action.isHighLightedText };

    default:
      break;
  }
  return state;
}
