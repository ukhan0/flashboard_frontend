import { get, isArray } from 'lodash';
import documentTypesData from '../../config/documentTypesData';
export const getCompanyByTickerUniverse = (ticker, completeWatchListData) => {
  let rawData = completeWatchListData;
  let company = rawData.find(sd => sd.ticker === ticker);
  return company;
};
export const getColorByDocType = type => {
  let color;
  let docType = documentTypesData.find(v => v.documentTypeGroup === type);

  // if not found by documentTypeGroup
  if (docType === undefined) {
    docType = documentTypesData.find(v => {
      return isArray(v.documentTypeFillingGraph) && v.documentTypeFillingGraph.includes(type)
    });
  }

  let docTypeValue = get(docType, 'value', null);
  if (docTypeValue) {
    const filterType = docTypeValue.find((item) => item.value === type)
    color = filterType.color;
  }

  return color ? color : 'rgb(120,91,91';
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


export const getGroupType = type => {
  let docType = documentTypesData.find(v => v.documentTypeGroup === type);

  // if not found by documentTypeGroup
  if (docType === undefined) {
    docType = documentTypesData.find(v => {
      return isArray(v.documentTypeFillingGraph) && v.documentTypeFillingGraph.includes(type)
    });
  }

  return docType?.documentTypeGroup;
}