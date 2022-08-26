import { get } from 'lodash';
import axios from 'axios';
import config from '../config/config';

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

export const setItemInLocalStorage = (v, data, isStringify) => {
  localStorage.setItem(v, isStringify ? JSON.stringify(data) : data);
};

export const getItemFromLocalStorage = (v, isJsonParse) => {
  isJsonParse ? JSON.parse(localStorage.getItem(v)) : localStorage.getItem(v);
};

export const deleteToken = async () => {
  try {
    const response = await axios.delete(`${config.apiUrl}/api/users/sign_out`, {
      data: {
        user_id: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : null
      }
    });

    const data = get(response, 'data', null);
    if (data) {
      localStorage.clear();
      // following code will refresh the page and Context will be reset
      // window.location.href = '/PagesRegister';
    }
    return;
  } catch (error) {
    console.log(error);
  }
};

export const refreshToken = async () => {
  try {
    const response = await axios.put(`${config.apiUrl}/api/users/refresh_token`);
    let token = get(response, 'data.auth_token', null);
    if (token) {
      localStorage.setItem('auth_token', token);
      window.location.reload();
    }
    return;
  } catch (error) {
    console.log(error);
  }
};
