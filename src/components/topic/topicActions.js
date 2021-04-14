import { getSearchCombinations, getSelectedSuggestionAsArr } from './topicHelpers';
import { setIsTopicDeleteErr, setIsSearchDeleteErr, setSearchResults, setSearchError, setSearchStart, setTopicsList, setIsSaveDlgOpenAndError, setIsSaveSearchError } from '../../reducers/Topic';
import axios from 'axios';
import config from '../../config/config';
import { format } from 'date-fns';
import { get } from 'lodash';
// import topicSearchResultData from '../../reducers/topicSearchResultData'

export const performTopicSearch = () => {
  return async (dispatch, getState) => {
    const { searchText, startDate, endDate, selectedDocumentType, orderBy, sortBy, selectedSuggestions } = getState().Topic
    dispatch(setSearchStart())
    const { suggestionsArr, suggestionsSingleArr } = getSelectedSuggestionAsArr(selectedSuggestions, searchText)
    const fullSearchText = suggestionsSingleArr.length ? getSearchCombinations(suggestionsArr) : searchText
    try {
      const response = await axios.post(`${config.apiUrl}/api/dictionary/search_results`, {
          searchTerm: fullSearchText,
          searchfrom: '',
          startDate: format(startDate, 'yyyy-MM-dd HH:mm:ss'),
          endDate: format(endDate, 'yyyy-MM-dd HH:mm:ss'),
          document_type: selectedDocumentType === 'all' ? '' : selectedDocumentType,
          orderBy,
          sortBy,
          page: 0
      });
      const responsePayload = get(response, 'data', null);
      // const responsePayload = topicSearchResultData
      if(responsePayload) {
        dispatch(setSearchResults(responsePayload))
      } else {
        dispatch(setSearchError(true))
      }
    } catch (error) {
      console.log(error)
      dispatch(setSearchError(true))
    }
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
  return {
    selectedSuggestions: topicState.selectedSuggestions,
    startDate: format(topicState.startDate, 'yyyy-MM-dd HH:mm:ss'),
    endDate: format(topicState.endDate, 'yyyy-MM-dd HH:mm:ss'),
    orderBy: topicState.orderBy,
    sortBy: topicState.sortBy,
    selectedDocumentType: topicState.selectedDocumentType,
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
  return async (dispatch) => {
    const response = await axios.delete(`${config.apiUrl}/api/topic/${topicId}/${user.id}`);
    const isDeleted = get(response, 'data.data.status', false)
    if(isDeleted) {
      dispatch(fetchTopicsList());
    } else {
      dispatch(setIsTopicDeleteErr(true));
    }
  }
}

export const deleteSearch = (topicId, searchId) => {
  const user = JSON.parse(localStorage.getItem('user'));
  return async (dispatch) => {
    const response = await axios.delete(`${config.apiUrl}/api/topic/${topicId}/search/${searchId}/${user.id}`);
    const isDeleted = get(response, 'data.data.status', false)
    if(isDeleted) {
      dispatch(fetchTopicsList());
    } else {
      dispatch(setIsSearchDeleteErr(true));
    }
  }
}
