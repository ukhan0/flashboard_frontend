import cjson from 'compressed-json';
export const getCompanyByTickerUniverse = (ticker, universe) => {
  let rawData = localStorage.getItem(`watchlist-data-${universe}`);
  if (rawData) {
    rawData = cjson.decompress.fromString(rawData);
  }
  let company = rawData.find(sd => sd.ticker === ticker);

  return company;
};
