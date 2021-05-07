import { get, forEach, uniq, cloneDeep } from 'lodash';
import searchHeadingMapping from '../../config/searchHeadingMapping'

export function getSearchCombinations(suggestions) {
  // remove special character from search text
  const combinations = createCombinations(cloneDeep(suggestions), Object.keys(suggestions).length);
  const quotedCombinations = combinations.map(c => `'${c}'`)
  return quotedCombinations.join(' OR ');
}

function getSearchKeyWords(searchText) {
  let cleanSearchText = searchText.replace(/[^a-zA-Z ]/g, "");
  return cleanSearchText.split(' ').filter(c => c)
}

export function getSelectedSuggestionAsArr(suggestionsObjOrignal, searchText) {
  const suggestionsArr = []
  let suggestionsSingleArr = []
  const suggestionsObj = cloneDeep(suggestionsObjOrignal)
  const searchKeyWords = getSearchKeyWords(searchText)
  for(const searchKeyWord of searchKeyWords) {
    if(suggestionsObj[searchKeyWord]){
      suggestionsObj[searchKeyWord] = [searchKeyWord, ...suggestionsObj[searchKeyWord]]
    }
  }
  forEach(suggestionsObj, (values) => {
    if(values.length) {
      suggestionsArr.push(uniq([...values]))
      suggestionsSingleArr = [...suggestionsSingleArr, ...values]
    }
  })
  return {suggestionsArr, suggestionsSingleArr}
}

/*
  this fuction create combinations
  suggestion is a 2d array
  [
    ['corona', 'austalia', 'high risk'],
    ['virus', 'sever', 'deadly virus'],
    [, , ,]
    [, , ,]
  ]
*/
function createCombinations(suggestions, length) {
  const result = [];
  if (length === 1) {
    for (let i = 0; i < suggestions.length; i++) {
      for (let j = 0; j < suggestions[i].length; j++) {
        result.push([suggestions[i][j]]);
      }
    }
  } else {
    for (let i = 0; i < suggestions.length; i++) {
      var elem = suggestions.shift();
      for (let j = 0; j < elem.length; j++) {
        var childperm = createCombinations(suggestions.slice(), length - 1);
        for (let k = 0; k < childperm.length; k++) {
          result.push(`${[elem[j]]} ${childperm[k]}`);
        }
      }
    }
  }
  return result;
}

export const createResultTitle = (rawTitle) => {
  if(!rawTitle) {
    return ''
  }
  // rawTitle is "sma_data_json.10-q.P1.I2.l4"
  const actualTitle = rawTitle.replace('sma_data_json.', '')
  // actualTitle is 10-q.P1.I2.l4
  const actualTitleArr = actualTitle.split('.')
  let titleText = null
  for(let i = actualTitleArr.length; i > 0; i--){
    const titleCode = actualTitleArr.slice(0, i).join('.')
    if(!titleText) {
      titleText = get(searchHeadingMapping, titleCode.toUpperCase(), null)
    }
  }
  if(!titleText) {
    titleText = actualTitle
  } 
  return titleText
}

export const removeDuplicateSuggestions = (suggestionsObj) => {
  let suggestionsArr = []
  const cleanSuggestionsObj = {}
  forEach(suggestionsObj, (values, keyWord) => {
    const uniqValues = uniq(values)  
    uniqValues.forEach(value => {
      if(!suggestionsArr.includes(value)){
        if(!cleanSuggestionsObj[keyWord]) {
          cleanSuggestionsObj[keyWord] = []
        }
        cleanSuggestionsObj[keyWord].push(value)
        suggestionsArr.push(value)
      }
    })
  })
  return cleanSuggestionsObj
}
