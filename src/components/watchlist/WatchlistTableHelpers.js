import { isNull, includes, capitalize, lowerCase, round } from 'lodash';
import moment from 'moment';

const changedStyles = {
  lowest: { backgroundColor: '#bf2828', color: '#ffffff' },
  low: { backgroundColor: '#f50101', color: '#ffffff' },
  median: { backgroundColor: '#f4772f', color: '#2b2828' },
  high: { backgroundColor: '#0de63f', color: '#ffffff' },
  highest: { backgroundColor: '#1bc943', color: '#ffffff' }
};
const changeStylesValues = Object.keys(changedStyles);

export const formatExportValue = params => {
  const colId = params.column.colDef.colId;
  const value = params.value;
  if (colId) {
    if (colId === 'last') {
      return dateFormater(value);
    } else {
      return value;
    }
  }
};

export const dateFormater = value => {
  let formatedValue = null;
  if (value) {
    const momentDateObj = moment(value);
    formatedValue = momentDateObj.format('YYYY-MM-DD');
  }
  return formatedValue;
}

export const parseDateStr = dateStr => {
  let dateObj = null;
  if (dateStr) {
    try {
      dateObj = new Date(dateStr);
    } catch (e) {
      dateObj = null;
    }
  }
  return dateObj;
};

export const parseNumber = number => {
  let parsedNumber = null;
  if (number) {
    try {
      parsedNumber = parseFloat(number);
    } catch (e) {
      parsedNumber = null;
    }
  }
  return parsedNumber;
};

export const percentFormater = params => {
  let formatedValue = null;
  if (params.value) {
    formatedValue = `${round(params.value, 2)}%`;
  }
  return formatedValue;
};

export const currencyFormater = (
  value,
  fractionDigits = 2,
  currencyType = 'USD',
  prefix = '',
  postfix = ''
) => {
  if (value === null || value === '') {
    return '';
  }
  let number = Number(value);

  let formatedNumber = number.toLocaleString('en-US', {
    style: 'currency',
    currency: currencyType,
    minimumFractionDigits: fractionDigits
  });

  if (fractionDigits === 0) {
    if (formatedNumber.indexOf('.') !== -1) {
      formatedNumber = formatedNumber.split('.')[0];
    }
  }
  return `${prefix}${formatedNumber}${postfix}`;
};

export const currencyStyler = params => {
  if (!isNull(params.value)) {
    return { textAlign: 'right', color: params.value > 0 ? 'green' : 'red' };
  }
  return null;
};

export const changeWordGetter = value => {
  console.log(value);
  let actulaValue = null;
  if (!isNull(value)) {
    actulaValue = lowerCase(value);
  }
  return actulaValue;
};

export const changeWordFormatter = value => {
  let formatedValue = null;
  if (value) {
    formatedValue = capitalize(value);
  }
  return formatedValue;
};

export const changeWordStyler = value => {
  let style = null;
  // console.log(value, changeStylesValues, changedStyles)
  if (!isNull(value)) {
    if (includes(changeStylesValues, value)) {
      style = changedStyles[value];
    }
  }
  return style;
};
