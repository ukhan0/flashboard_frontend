import { getSearchCombinations, getSelectedSuggestionAsArr, removeDuplicateSuggestions } from './topicHelpers';
import { setSelectedSearch, setSearchBackdrop, setResultsPage, setSuggestionsWithSelections, setSuggestions, setSuggestionsIsLoading, setIsTopicDeleteErr, setIsSearchDeleteErr, setSearchResults, setSearchError, setSearchStart, setTopicsList, setIsSaveDlgOpenAndError, setIsSaveSearchError, setSearchResultHighlights, setSearchBackdropHighlights, setIsSearchHighlightLoading } from '../../reducers/Topic';
import axios from 'axios';
import config from '../../config/config';
import { format } from 'date-fns';
import { get, isEmpty, isArray, forEach, concat, uniqBy } from 'lodash';
import documentTypesData from '../../config/documentTypesData'

export const performTopicSearchAggregate = (showBackdrop = false, freshSearch = false) => {
  return async (dispatch, getState) => {
    const cancelTokenSource = axios.CancelToken.source();
    dispatch(setSearchStart())
    if(showBackdrop) {
      dispatch(setSearchBackdrop(cancelTokenSource, true))
    }
    try {
      const response = await axios.post(`${config.apiUrl}/api/dictionary/search_aggregate`, createSearchPayload(getState().Topic,freshSearch), 
       {
        cancelToken:cancelTokenSource.token,
      });
      let newSearchResults = get(response, 'data', null);
      const isError = get(newSearchResults, 'error', null)
      if(newSearchResults && !isError) {
        dispatch(setSearchResults(newSearchResults))
        dispatch(setSearchBackdrop(null, false))
      } else {
        dispatch(setSearchBackdrop(null, false))
        dispatch(setSearchError(true))
      }
    } catch (error) {
      dispatch(setSearchBackdrop(null, false))
      dispatch(setSearchError(true))
    }
  }
}

export const performTopicSearchHighlights = (showBackdrop = false, freshSearch = false) => {
  return async (dispatch, getState) => {
    const cancelTokenSourceHighlights = axios.CancelToken.source();
    const { selectedDocumentTypes } = getState().Topic
    dispatch(setSearchStart())
    if(showBackdrop) {
      dispatch(setSearchBackdropHighlights(cancelTokenSourceHighlights, true))
    }
    const documentTypeObjects = selectedDocumentTypes.map(sdt => documentTypesData.find(dtd => dtd.value === sdt))
    
    let searchFromsCount = 0
    documentTypeObjects.forEach((documentType) => {
      const searchFroms = get(documentType, 'searchFroms', [])
      searchFroms.forEach(() => {
        searchFromsCount += 1
      })
    })

    let apiResponseCount = 0
    for(const documentType of documentTypeObjects) {
      const searchFroms = get(documentType, 'searchFroms', [])
      for(const searchFrom of searchFroms) {
        try {
          const response = await axios.post(`${config.apiUrl}/api/dictionary/search_highlights_by_index`, createSearchPayload({...getState().Topic}, freshSearch, searchFrom), 
          {
            cancelToken: cancelTokenSourceHighlights.token,
          })
          apiResponseCount++
          let searchResults = get(response, 'data', null);
          const isError = get(searchResults, 'error', null)
          if(searchResults && !isError) {
            const { searchResultHighlights } = getState().Topic
            const existingData = searchResultHighlights
            const newData = get(searchResults, 'highlights', [])
            let newSearchResults = concat(existingData, newData)
            newSearchResults = uniqBy(newSearchResults, 'summary_id')
            dispatch(setSearchResultHighlights(newSearchResults))
            dispatch(setSearchBackdropHighlights(null, false))
          } else {
            dispatch(setSearchBackdropHighlights(null, false))
            dispatch(setSearchError(true))
          }
          if(searchFromsCount === apiResponseCount) {
            dispatch(setIsSearchHighlightLoading(false))
          }
        } catch(error) {
          apiResponseCount++
          dispatch(setSearchError(true))
          dispatch(setSearchBackdropHighlights(null, false))
          if(searchFromsCount === apiResponseCount) {
            dispatch(setIsSearchHighlightLoading(false))
          }
        }
      }
    }
  }
}

const createSearchPayload = (topicState, freshSearch, searchFrom = null) => {
      const searchId = get(topicState.selectedSearch, 'searchId', null);
      const { suggestionsArr, suggestionsSingleArr } = getSelectedSuggestionAsArr(topicState.selectedSuggestions, topicState.searchText)
      const fullSearchText = suggestionsSingleArr.length ? getSearchCombinations(suggestionsArr) : topicState.searchText
      const data = {
          searchTerm: fullSearchText,
          searchfrom: searchFrom ? `sma_data_json.${searchFrom}` : '',
          startDate: format(topicState.startDate, 'yyyy-MM-dd HH:mm:ss'),
          endDate: format(topicState.endDate, 'yyyy-MM-dd HH:mm:ss'),
          document_types: topicState.selectedDocumentTypes,
          orderBy:topicState.orderBy,
          sortBy:topicState.sortBy,
          page: topicState.pageNo,
          searchId: (!freshSearch && searchId && topicState.pageNo === 0 ) ? searchId : undefined,
          refresh_search: false,
      }
      return data
    }
export const goToNextPage = () => {
  return async (dispatch, getState) => {
    const { pageNo } = getState().Topic
    dispatch(setResultsPage(pageNo + 1))
    dispatch(performTopicSearchHighlights())
  }
}

export const fetchTopicsList = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return async (dispatch) => {
    const response = await axios.get(`${config.apiUrl}/api/topic/list/${user.id}`);
    const topics = get(response, 'data.data', [])
    if(topics && topics.length) {
      dispatch(setTopicsList(topics));
    } else {
      dispatch(setTopicsList([]));
    }
  }
}

const createSearchSaveMiniPayload = (topicState) => {
  const { suggestionsArr, suggestionsSingleArr } = getSelectedSuggestionAsArr(topicState.selectedSuggestions, topicState.searchText)
  const fullSearchText = suggestionsSingleArr.length ? getSearchCombinations(suggestionsArr) : topicState.searchText
  return {
    selectedSuggestions: topicState.selectedSuggestions,
    startDate: format(topicState.startDate, 'yyyy-MM-dd HH:mm:ss'),
    endDate: format(topicState.endDate, 'yyyy-MM-dd HH:mm:ss'),
    orderBy: topicState.orderBy,
    sortBy: topicState.sortBy,
    selectedDocumentTypes: topicState.selectedDocumentTypes,
    searchTerm: fullSearchText,
  }
}

export const handleSaveSearch = (topic, isNewTopic) => {
  const user = JSON.parse(localStorage.getItem('user'));
  return async (dispatch, getState) => {
    const { searchText } = getState().Topic
    const payload = {
      userId: user.id,
      searchText: searchText,
      searchJSON: createSearchSaveMiniPayload(getState().Topic)
    }
    if(isNewTopic) {
      payload.topicText = topic.value
    } else {
      payload.topicId = topic.value
    }
  
    try {
      const response = await axios.post(`${config.apiUrl}/api/topic/save`, payload);
      const responsePayload = get(response, 'data', null);
      if(responsePayload) {
        dispatch(setIsSaveDlgOpenAndError(false, false));
        dispatch(fetchTopicsList());
      } else {
        dispatch(setIsSaveSearchError(true))
      }
    } catch (error) {
      dispatch(setIsSaveSearchError(true))
    }
  }
}

export const updateSaveSearch = (topicId, searchId) => {
  const user = JSON.parse(localStorage.getItem('user'));
  return async (dispatch, getState) => {
    const { searchText } = getState().Topic
    const payload = {
      searchText: searchText,
      searchJSON: createSearchSaveMiniPayload(getState().Topic)
    }

    try {
      const response = await axios.put(`${config.apiUrl}/api/topic/${topicId}/update_search/${searchId}/${user.id}`, payload);
      const isSuccess = get(response, 'data.data', null);
      if(isSuccess) {
        dispatch(setIsSaveDlgOpenAndError(false, false));
        dispatch(fetchTopicsList());
      } else {
        dispatch(setIsSaveSearchError(true))
      }
    } catch (error) {
      dispatch(setIsSaveSearchError(true))
    }
  }
}

export const deleteTopic = (topicId) => {
  const user = JSON.parse(localStorage.getItem('user'));
  return async (dispatch, getState) => {
    const { selectedTopic } = getState().Topic
    const response = await axios.delete(`${config.apiUrl}/api/topic/${topicId}/${user.id}`);
    const isDeleted = get(response, 'data.data.status', false)
    if(isDeleted) {
      if(selectedTopic && selectedTopic.topicID === topicId) {
        dispatch(setSelectedSearch(null, null));
      }
      dispatch(fetchTopicsList());
    } else {
      dispatch(setIsTopicDeleteErr(true));
    }
  }
}

export const deleteSearch = (topicId, searchId) => {
  const user = JSON.parse(localStorage.getItem('user'));
  return async (dispatch, getState) => {
    const { selectedSearch } = getState().Topic
    const response = await axios.delete(`${config.apiUrl}/api/topic/${topicId}/search/${searchId}/${user.id}`);
    const isDeleted = get(response, 'data.data.status', false)
    if(isDeleted) {
      if(selectedSearch && selectedSearch.searchId === searchId) {
        dispatch(setSelectedSearch(null, null));
      }
      dispatch(fetchTopicsList());
    } else {
      dispatch(setIsSearchDeleteErr(true));
    }
  }
}

export const findSuggestions = () => {
  return async (dispatch, getState) => {
    const { searchText, suggestions, selectedSuggestions } = getState().Topic
    if(!isEmpty(suggestions) || !searchText){
      return
    }
    dispatch(setSuggestionsIsLoading(true))
    try {
      const response = await axios.post(`${config.apiUrl}/api/dictionary/search`, {
        searchTerm: searchText
      });
      const responsePayload = get(response, 'data', null);
      let rawSuggestions = get(responsePayload, 'results', {})
      if(isArray(rawSuggestions) &&  rawSuggestions.length === 0) {
        rawSuggestions = {}
      }
      // remove duplicated from suggestions
      let newSuggestions = removeDuplicateSuggestions(rawSuggestions)

      let newSelectedSuggestions = {}
      if(isEmpty(selectedSuggestions)) {
        forEach(newSuggestions, (_values, keyWord) => {
          newSelectedSuggestions[keyWord] = []
        })
        dispatch(setSuggestionsWithSelections(newSuggestions, newSelectedSuggestions));
      } else {
        dispatch(setSuggestions(newSuggestions));
      }
      dispatch(setSuggestionsIsLoading(false));
    } catch (error) {
      dispatch(setSuggestionsIsLoading(false));
    }
  }
}
