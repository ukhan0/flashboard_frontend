import cjson from 'compressed-json';
export const getCompanyByTickerUniverse = (ticker, universe) => {
  let rawData = localStorage.getItem(`watchlist-data-${universe}`);
  if (rawData) {
    rawData = cjson.decompress.fromString(rawData);
  }
  let company = rawData.find(sd => sd.ticker === ticker);

  return company;
};

export const getColorByDocType = type => {
  let color = '';
  if (type === '8-K') {
    color = 'rgb(43,144,144)';
  }
  if (type === '10-K') {
    color = 'rgb(128,133,233)';
  }
  if (type === '10-Q') {
    color = 'rgb(247,163,92)';
  }

  if (type === 'FMP-transcript') {
    color = 'rgb(244,91,91)';
  }
  return color;
};
