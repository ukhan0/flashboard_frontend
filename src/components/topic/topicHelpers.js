import { forEach, uniq, cloneDeep } from "lodash-es";

export function getSearchCombinations(suggestions) {
  // remove special character from search text
  const combinations = createCombinations(cloneDeep(suggestions), Object.keys(suggestions).length);
  const quotedCombinations = combinations.map(c => `"${c}"`)
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
        var childperm = createCombinations(suggestions, length - 1);
        for (let k = 0; k < childperm.length; k++) {
          result.push(`${[elem[j]]} ${childperm[k]}`);
        }
      }
    }
  }
  return result;
}
