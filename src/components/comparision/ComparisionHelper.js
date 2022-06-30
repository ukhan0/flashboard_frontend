import { get } from 'lodash';
export const getComparisionSettings = () => {
  const settings = JSON.parse(localStorage.getItem('comparisionSetting'));

  return settings;
};
export const saveComparisionSettings = setting => {
  localStorage.setItem('comparisionSetting', JSON.stringify(setting));
};

export const getOldId = (getQueryParams, selectedFileType, selectedItem) => {
  let id = null;
  if (selectedItem.comparisonType) {
    id = get(selectedItem, 'comparisonType', null);
    id = id === '10-K' ? get(selectedItem, 'oldId10k') : get(selectedItem, 'oldId10q', null);
  } else {
    id = getQueryParams.oldId
      ? getQueryParams.oldId
      : selectedFileType === '10k'
      ? get(selectedItem, 'oldId10k', null)
        ? get(selectedItem, 'oldId10k', null)
        : get(selectedItem, 'oldId10q', null)
      : get(selectedItem, 'oldId10q', null)
      ? get(selectedItem, 'oldId10q', null)
      : get(selectedItem, 'oldId10k', null);
  }

  return id;
};

export const getRecentId = (getQueryParams, selectedFileType, selectedItem) => {
  let id = null;
  if (selectedItem.comparisonType) {
    id = get(selectedItem, 'comparisonType', null);
    id = id === '10-K' ? get(selectedItem, 'recentId10k') : get(selectedItem, 'recentId10q', null);
  } else {
    id = getQueryParams.oldId
      ? getQueryParams.oldId
      : selectedFileType === '10k'
      ? get(selectedItem, 'recentId10k', null)
        ? get(selectedItem, 'recentId10k', null)
        : get(selectedItem, 'recentId10q', null)
      : get(selectedItem, 'recentId10q', null)
      ? get(selectedItem, 'recentId10q', null)
      : get(selectedItem, 'recentId10k', null);
  }

  return id;
};
