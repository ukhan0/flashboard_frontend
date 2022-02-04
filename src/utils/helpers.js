import cjson from 'compressed-json';
import { get } from 'lodash';

export const priorityMappingObj = (valueKey = false) => {
  let reverseMappingArray = {
    '0': 'Lowest',
    '1': 'Low',
    '2': 'Median',
    '3': 'High',
    '4': 'Highest'
  };
  // return value=>key in reverse
  if (valueKey) {
    const res = {};
    Object.keys(reverseMappingArray).forEach(key => {
      res[reverseMappingArray[key]] = key;
    });
    return res;
  }
  return reverseMappingArray;
};

const getKeysToConvert = () => {
  return [
    'ac',
    'ae',
    'ag',
    'aj',
    'al',
    'an',
    'aq',
    'as',
    'au',
    'ax',
    'az',
    'bb',
    'be',
    'bi',
    'bk',
    'bn',
    'j',
    'l',
    'o',
    'q',
    's',
    'v',
    'x',
    'z'
  ];
};

export const createHash = function(str, seed = 0) {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

const convertPriorityTextToInteger = data => {
  const keys_arr = getKeysToConvert();
  const mappingObj = priorityMappingObj(true);
  data.forEach(element => {
    delete element['c'];
    delete element['d'];
    for (const [key, value] of Object.entries(element)) {
      if (keys_arr.includes(key)) {
        element[key] = mappingObj[value];
      }
    }
  });
  return data;
};

export const getPriorityKeyValue = (params, key) => {
  const priorityMapping = priorityMappingObj();
  return get(params, `data.${key}`, null)
    ? priorityMapping[get(params, `data.${key}`)]
      ? priorityMapping[get(params, `data.${key}`)]
      : get(params, `data.${key}`)
    : null;
};

export const storeCompleteWatchlist = data => {
  const dataChanged = convertPriorityTextToInteger(data);
  localStorage.setItem(`watchlist-data-all`, cjson.compress.toString(dataChanged));
};

export const getCompleteWatchlist = () => {
  const companiesListcompressed = localStorage.getItem(`watchlist-data-all`);
  if (!companiesListcompressed) {
    return null;
  } else {
    return cjson.decompress.fromString(companiesListcompressed);
  }
};

export const eraseCompleteWatchlist = () => {
  localStorage.removeItem('watchlist-data-all');
};
