import { get, forEach, uniq, cloneDeep } from 'lodash';
import searchHeadingMapping from '../../config/searchHeadingMapping';

export function getSearchCombinations(suggestions) {
  const quotedCombinations = suggestions.map(c => `"${c}"`);
  return quotedCombinations.join(' OR ');
}

export function getSelectedSuggestionAsArr(suggestionsObjOrignal, searchText) {
  const suggestionsArr = [];
  let suggestionsSingleArr = [];
  let onlySuggestionSingleArr = [];
  const suggestionsObj = cloneDeep(suggestionsObjOrignal);
  const cleanSearchText = searchText.replace(/[^a-zA-Z ]/g, '');

  forEach(suggestionsObj, values => {
    if (values.length) {
      suggestionsArr.push(uniq([...values]));
      suggestionsSingleArr = [...suggestionsSingleArr, ...values];
      onlySuggestionSingleArr = [...suggestionsSingleArr, ...values];
    }
  });
  suggestionsSingleArr.unshift(cleanSearchText);
  return { suggestionsArr, suggestionsSingleArr, onlySuggestionSingleArr };
}

export const createResultTitle = (rawTitle, docType) => {
  if (!rawTitle) {
    return '';
  }
  // rawTitle is "sma_data_json.10-q.P1.I2.l4"
  const actualTitle = rawTitle.replace('sma_data_json.', '').toLowerCase();
  // actualTitle is 10-q.P1.I2.l4
  const actualTitleArr = actualTitle.split('.');
  let titleText = null;
  for (let i = actualTitleArr.length; i > 0; i--) {
    const titleCode = actualTitleArr.slice(0, i).join('.');
    if (!titleText) {
      titleText = get(searchHeadingMapping[docType], titleCode.toLowerCase(), null);
    }
  }
  if (!titleText) {
    titleText = actualTitle;
  }
  return titleText;
};

export const removeDuplicateSuggestions = suggestionsObj => {
  let suggestionsArr = [];
  const cleanSuggestionsObj = {};
  forEach(suggestionsObj, (values, keyWord) => {
    const uniqValues = uniq(values);
    uniqValues.forEach(value => {
      if (!suggestionsArr.includes(value)) {
        if (!cleanSuggestionsObj[keyWord]) {
          cleanSuggestionsObj[keyWord] = [];
        }
        cleanSuggestionsObj[keyWord].push(value);
        suggestionsArr.push(value);
      }
    });
  });
  return cleanSuggestionsObj;
};
