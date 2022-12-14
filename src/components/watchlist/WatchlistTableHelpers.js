import { isNull, includes, capitalize, lowerCase, round, get } from 'lodash';
import { sectorIndustry } from '../../config/sectorIndustry';
import moment from 'moment';
const changedStyles = {
  lowest: { backgroundColor: '#bf2828', color: '#ffffff', width: 80, textTransform: 'capitalize' },
  low: { backgroundColor: '#f50101', color: '#ffffff', width: 80, textTransform: 'capitalize' },
  median: { backgroundColor: '#263055', color: '#ffffff', width: 80, textTransform: 'capitalize' },
  high: { backgroundColor: '#0de63f', color: '#ffffff', width: 80, textTransform: 'capitalize' },
  highest: { backgroundColor: '#1bc943', color: '#ffffff', width: 80, textTransform: 'capitalize' }
};
const changeStylesValues = Object.keys(changedStyles);

export const numberWordComparator = (value1, value2, nodeA, nodeB, isInverted) => {
  let value1ComparableValue = value1 === null ? (!isInverted ? +1 * Infinity : -1 * Infinity) : Number(value1.number);
  let value2ComparableValue = value2 === null ? (!isInverted ? +1 * Infinity : -1 * Infinity) : Number(value2.number);
  return value1ComparableValue - value2ComparableValue;
};

export const formatExportValue = params => {
  const colId = params.column.colDef.colId;
  const value = params.value;
  if (colId) {
    if (colId === 'actions') {
      if (value === true) {
        return 'Yes';
      } else {
        return 'No';
      }
    } else if (colId === 'mktcap') {
      return currencyFormater(params.value, 0, 'USD');
    } else if (colId === 'adv') {
      return currencyFormater(params.value, 0, 'USD');
    } else if (colId === 'last') {
      return params.value;
    } else if (colId === 'sentiment') {
      return percentFormater(params, true);
    } else if (colId === 'sentimentWord') {
      const value = get(params.value, 'word', null);
      return changeWordFormatter(value);
    } else if (colId === 'sentimentChange') {
      return percentFormater(params, true);
    } else if (colId === 'sentimentChangeWord') {
      const value = get(params.value, 'word', null);
      return changeWordFormatter(value);
    } else if (colId === 'wordCountChange') {
      const value = get(params.value, 'number', 0);
      return currencyFormater(value);
    } else if (colId === 'wordCountChangePercent') {
      return percentFormater(params, false);
    } else if (colId === 'wordCountChangePercentWord') {
      const value = get(params.value, 'word', null);
      return changeWordFormatter(value);
    } else {
      return value;
    }
  }
};

export const dateFormater = value => {
  let formatedValue = null;
  if (value) {
    formatedValue = value.toLocaleDateString();
  }
  return formatedValue;
};

export const dateFormaterMoment = value => {
  let formatedValue = null;
  if (value) {
    formatedValue = value.format('MM/DD/YYYY');
  }
  return formatedValue;
};

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

export const parseDateStrMoment = dateStr => {
  let dateObj = null;
  if (dateStr) {
    try {
      dateObj = moment(dateStr);
    } catch (e) {
      dateObj = null;
    }
  }
  return dateObj;
};

export const parseDateAndFormatMoment = dateStr => {
  if (dateStr) {
    try {
      dateStr = moment(dateStr.split('.')[0]);
      return dateStr.format('MM/DD/YYYY');
    } catch (e) {
      console.log(e);
      return '';
    }
  } else {
    return '';
  }
};

export const parseNumber = number => {
  let parsedNumber = null;
  if (number) {
    try {
      parsedNumber = round(parseFloat(number), 2);
    } catch (e) {
      parsedNumber = null;
    }
  }
  return parsedNumber;
};

export const percentFormater = (params, flag) => {
  let formatedValue = null;
  if (!isNull(params.value)) {
    if (flag === false) {
      formatedValue = params.value.number ? `${params.value.number.toFixed(2)}%` : '';
    } else {
      formatedValue = params.value.number.toFixed(2);
    }
  }
  return formatedValue;
};

export const currencyFormater = (value, fractionDigits = 2, currencyType = 'USD', prefix = '', postfix = '') => {
  if (value === null || value === '') {
    return null;
  }
  let number = Number(value);
  let formatedNumber = '';
  if (currencyType === '') {
    formatedNumber = number.toLocaleString('en-US', {
      minimumFractionDigits: fractionDigits
    });
  } else {
    formatedNumber = number.toLocaleString('en-US', {
      style: 'currency',
      currency: currencyType,
      minimumFractionDigits: fractionDigits
    });
  }

  if (fractionDigits === 0) {
    if (formatedNumber.indexOf('.') !== -1) {
      formatedNumber = formatedNumber.split('.')[0];
    }
  }
  return `${prefix}${formatedNumber}${postfix}`;
};
export const currencyFormaterr = (currency, sign) => {
  var sansDec = currency.toFixed(0);
  var formatted = sansDec.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return sign + `${formatted}`;
};
export const descriptionValueStyler = params => {
  if (isNull(params.value)) {
    return null;
  }
  let value = params.value.word;
  let style = null;
  if (!isNull(value) && value) {
    if (includes(changeStylesValues, value)) {
      style = changedStyles[value];
    }

    if (!style) {
      return null;
    }
    return {
      color: style.backgroundColor
    };
  }
  return null;
};

export const changeWordGetter = value => {
  let actulaValue = null;
  if (!isNull(value) && typeof value !== 'object') {
    actulaValue = lowerCase(value);
  }
  return actulaValue;
};

export const changeWordFormatter = value => {
  let formatedValue = '';
  if (value && typeof value !== 'object') {
    formatedValue = capitalize(value);
  }
  return formatedValue;
};

export const changeWordStyler = value => {
  let style = null;
  if (!isNull(value)) {
    if (includes(changeStylesValues, value)) {
      style = changedStyles[value];
      // textTransform:'capitalize'
    }
  }
  return style;
};
export const getSectorIndustryById = id => {
  let data = sectorIndustry[id] || '';
  if (!data) {
    data = { id: '', sector: '', industry: '' };
  }
  return data;
};

export const lastReportedState = 'desc';

export const dateComparator = (date1, date2) => {
  var date1Number = date1 && new Date(date1).getTime();
  var date2Number = date2 && new Date(date2).getTime();
  if (date1Number == null && date2Number == null) {
    return 0;
  }

  if (date1Number == null) {
    return -1;
  } else if (date2Number == null) {
    return 1;
  }

  return date1Number - date2Number;
};

export const getCellStyle = currentStyle => {
  let style = currentStyle ? currentStyle : {};
  return style;
};
