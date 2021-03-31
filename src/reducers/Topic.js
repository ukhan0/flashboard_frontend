import searchResults from './topicSearchResultData';
import searchSuggestions from './topSuggestionsData';

// export const SET_FILE_TYPE = 'WATCHLIST/SET_FILE_TYPE';

// export const setOverwriteCheckBox = overwriteCheckBox => ({
//   type: SET_OVERWRITE_CHECK_BOX,
//   overwriteCheckBox
// })


const getDefaultState = () => {
  return {
    searchText: '',
    documentType: null,
    selectedUniverse: null,
    startDate: null,
    endDate: null,
    orderBy: 'desc',
    sortBy: 'document_date',
    selectedSuggestions: [],
    suggestions: searchSuggestions,
    searchResult: searchResults,
    saveTopics: [],
  };
};

export default function reducer(
  state = {
    ...getDefaultState()
  },
  action
) {
  switch (action.type) {

    // case SET_OVERWRITE_CHECK_BOX:
    //   return { ...state, overwriteCheckBox: action.overwriteCheckBox };
    default:
      break;
  }
  return state;
}
