import searchResultsData from './topicSearchResultData';
// import searchSuggestionsData from './topSuggestionsData';
import documentTypesData from './documentTypesData';
import { subDays } from 'date-fns';

export const SET_DOCUMENT_TYPE = 'TOPIC/SET_DOCUMENT_TYPE';
export const SET_SEARCH_TEXT = 'TOPIC/SET_SEARCH_TEXT';
export const SET_DATE_RANGE = 'TOPIC/SET_DATE_RANGE';
export const SET_SEARCH_RESULT = 'TOPIC/SET_SEARCH_RESULT';
export const SET_SUGGESTIONS_RESULT = 'TOPIC/SET_SUGGESTIONS_RESULT';
export const SET_SUGGESTIONS_RESULT_AND_SELECTIONS = 'TOPIC/SET_SUGGESTIONS_RESULT_AND_SELECTIONS';
export const SET_SELECTED_SUGGESTIONS = 'TOPIC/SET_SELECTED_SUGGESTIONS';
export const SET_SEARCH_LIST_VERSION = 'TOPIC/SET_SEARCH_LIST_VERSION';
export const SET_ALL_SEARCH_PARAMS = 'TOPIC/SET_ALL_SEARCH_PARAMS';
export const SET_IS_SEARCH_LOADING = 'TOPIC/SET_IS_SEARCH_LOADING';

export const setTopicSelectedDocumentType = documentType => ({
  type: SET_DOCUMENT_TYPE,
  documentType
})

export const setTopicSearchText = text => ({
  type: SET_SEARCH_TEXT,
  text
})

export const setTopicSearchDateRange = dateRangeObj => ({
  type: SET_DATE_RANGE,
  dateRangeObj
})

export const setSearchResults = searchResult => ({
  type: SET_SEARCH_RESULT,
  searchResult
})

export const setSuggestions = suggestions => ({
  type: SET_SUGGESTIONS_RESULT,
  suggestions
})

export const setSuggestionsWithSelections = (suggestions, selectedSuggestions) => ({
  type: SET_SUGGESTIONS_RESULT_AND_SELECTIONS,
  data: {suggestions, selectedSuggestions}
})

export const setSelectedSuggestions = selectedSuggestions => ({
  type: SET_SELECTED_SUGGESTIONS,
  selectedSuggestions
})

export const setSearchListVersion = searchListVersion => ({
  type: SET_SEARCH_LIST_VERSION,
  searchListVersion
})

export const setAllSearchParams = searchObj => ({
  type: SET_ALL_SEARCH_PARAMS,
  searchObj
})

export const setIsSearchLoading = isSearchLoading => ({
  type: SET_IS_SEARCH_LOADING,
  isSearchLoading
})

const getDefaultState = () => {
  return {
    searchText: '',
    selectedDocumentType: 'all',
    selectedUniverse: null,
    startDate: subDays(new Date(), 365),
    endDate: new Date(),
    orderBy: 'desc',
    sortBy: 'document_date',
    selectedSuggestions: {},
    documentTypes: documentTypesData,
    suggestions: {},
    searchResult: {},
    searchListVersion: 0,
    isSearchLoading: false,
  };
};

export default function reducer(
  state = {
    ...getDefaultState()
  },
  action
) {
  switch (action.type) {
    case SET_DOCUMENT_TYPE:
      return { ...state, selectedDocumentType: action.documentType };
    case SET_SEARCH_TEXT:
      return { ...state, searchText: action.text };
    case SET_DATE_RANGE:
      return { ...state, startDate: action.dateRangeObj.startDate, endDate: action.dateRangeObj.endDate };
    case SET_SEARCH_RESULT:
      return { ...state, searchResult: action.searchResult };
    case SET_SUGGESTIONS_RESULT:
      return { ...state, suggestions: action.suggestions };
    case SET_SUGGESTIONS_RESULT_AND_SELECTIONS:
      return { ...state, suggestions: action.data.suggestions, selectedSuggestions: action.data.selectedSuggestions };
    case SET_SELECTED_SUGGESTIONS:
      return { ...state, selectedSuggestions: action.selectedSuggestions };
    case SET_SEARCH_LIST_VERSION:
      return { ...state, searchListVersion: action.searchListVersion };
    case SET_ALL_SEARCH_PARAMS:
      return { 
        ...state,
        searchText: action.searchObj.searchText,
        selectedDocumentType: action.searchObj.searchJSON.selectedDocumentType,
        startDate: new Date(action.searchObj.searchJSON.startDate),
        endDate: new Date(action.searchObj.searchJSON.endDate),
        orderBy: action.searchObj.searchJSON.orderBy,
        sortBy: action.searchObj.searchJSON.sortBy,
        selectedSuggestions: action.searchObj.searchJSON.selectedSuggestions,
      };
    case SET_IS_SEARCH_LOADING:
      return { ...state, isSearchLoading: action.isSearchLoading };
    default:
      break;
  }
  return state;
}
