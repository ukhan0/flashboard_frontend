export const getCompanyByTickerUniverse = (ticker, completeWatchListData) => {
  let rawData = completeWatchListData
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

export const sectionIds = {
  RISK: 1245845125803209,
  NOTES: 5402784905830826,
  MDA: 2862340249443704
};
const stateKey = 'filling::state';
export const storeColumnsState = state => {
  localStorage.setItem(stateKey, JSON.stringify(state));
};
export const getColumnState = () => {
  const offRampAlertsTableState = localStorage.getItem(stateKey);
  let columnState = [];
  if (offRampAlertsTableState) {
    try {
      columnState = JSON.parse(offRampAlertsTableState);
    } catch (error) {
      // logException(error);
    }
  }
  return columnState;
};
