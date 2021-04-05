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
    saveTopics: [],
    searchListVersion: 0,
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
      console.log(action.suggestions)
      return { ...state, suggestions: action.suggestions };
    case SET_SUGGESTIONS_RESULT_AND_SELECTIONS:
      return { ...state, suggestions: action.data.suggestions, selectedSuggestions: action.data.selectedSuggestions };
    case SET_SELECTED_SUGGESTIONS:
      return { ...state, selectedSuggestions: action.selectedSuggestions };
      
    default:
      break;
  }
  return state;
}
