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

export const getPriorityKeyValue = (params, key) => {
  const priorityMapping = priorityMappingObj();
  return get(params, `data.${key}`, null)
    ? priorityMapping[get(params, `data.${key}`)]
      ? priorityMapping[get(params, `data.${key}`)]
      : get(params, `data.${key}`)
    : null;
};

export const eraseCompleteWatchlist = () => {
  localStorage.removeItem('watchlist-data-all');
};
