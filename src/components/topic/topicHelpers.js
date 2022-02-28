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

export const extractResultTitleFromPath = (completeData) => {
  let matches = completeData.match(/<span path="(.*)"><\/span>/gm) || [];
  let completeHeading = [];
  if(matches.length > 0) {
    const spanData = matches[0];
    let pathDataArr = spanData.split('"')
    let pathData = pathDataArr[1]
    let decodedHeadingDataArr = atob(pathData)
    let splitdecodedHeadingDataArr = decodedHeadingDataArr.split("|")
    if(splitdecodedHeadingDataArr.length > 2){
      splitdecodedHeadingDataArr = splitdecodedHeadingDataArr.slice(-2);
      if(splitdecodedHeadingDataArr[1] === "data"){
        splitdecodedHeadingDataArr.splice(1, 1)
      }
      completeHeading = splitdecodedHeadingDataArr
    }
  }
  return completeHeading
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
export const renameDocumentTypes = type => {
  if (Array.isArray(type)) {
    let selected = type.map(v => {
      if (v.toLowerCase() === 'fmp-transcript') {
        v = 'Earning Call';
      }
      return v;
    });

    if (selected.length > 5) {
      selected = selected.slice(0, 5);
    }
    return selected.join(', ');
  }

  if (type.toLowerCase() === 'fmp-transcript') {
    type = 'Earning Call';
  }
  return type;
};

export const deleteSearchSuggestionsByKey = (suggestions, deleteKeys, deleteValues) => {
  let searchValues = [];
  if (Array.isArray(deleteValues)) {
    searchValues = deleteValues;
  } else {
    searchValues = deleteValues.split(' ');
  }
  let valuesWiths = searchValues.map(v => `${v}s`);
  let values = searchValues.concat(valuesWiths);
  deleteKeys.forEach(v => {
    delete suggestions[v];
  });

  values.forEach(val => {
    forEach(suggestions, (v, k) => {
      let filterValues = v.filter(function(item) {
        return item.toLowerCase() !== val.toLowerCase();
      });
      suggestions[k] = filterValues.length > 0 ? filterValues : [];
    });
  });

  return suggestions;
};

export const getSearchText = (
  simpleSearchTextArray,
  ignoreSearchTextArray,
  searchTextWithAnd,
  onlySuggestionSingleArr,
  searchText,
  isSimpleSearch
) => {
  const value1 = simpleSearchTextArray.map(value => `"${value}"`).join(' OR ');
  const value = ignoreSearchTextArray.map(value => `-"${value}"`).join(' AND ');
  const value2 = searchTextWithAnd.map(value => `"${value}"`).join(' AND ');
  const searchTerm = `(${value1})${value2.length > 0 ? `AND(${value2})` : ''}${
    value.length > 0 ? `AND(${value})` : ''
  }`;
  const fullSearchText = onlySuggestionSingleArr.length
    ? `${searchText} OR ${getSearchCombinations(onlySuggestionSingleArr)}`
    : searchText;

  return isSimpleSearch ? searchTerm : fullSearchText;
};

export const preventParentClick = e => {
  if (e) {
    e.stopPropagation();
  }
};

export const getCurrentSearchDispaly = (
  simpleSearchTextArray,
  ignoreSearchTextArray,
  searchTextWithAnd,
  onlySuggestionSingleArr,
  searchText,
  isSimpleSearch
) => {
  const value1 = simpleSearchTextArray.filter(value => `${value},`);
  const value = ignoreSearchTextArray.filter(value => `${value},`);
  const value2 = searchTextWithAnd.filter(value => `${value},`);
  const searchTerm = `${value1}${value}${value2}`;
  const fullSearchText = onlySuggestionSingleArr.length
    ? `${searchText} OR ${getSearchCombinations(onlySuggestionSingleArr)}`
    : searchText;

  return isSimpleSearch ? searchTerm : fullSearchText;
};
