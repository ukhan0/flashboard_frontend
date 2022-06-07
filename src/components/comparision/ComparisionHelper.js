import { get } from 'lodash';
export const getComparisionSettings = () => {
  const settings = JSON.parse(localStorage.getItem('comparisionSetting'));

  return settings;
};
export const saveComparisionSettings = setting => {
  localStorage.setItem('comparisionSetting', JSON.stringify(setting));
};

export const getOldId = (getQueryParams, selectedFileType, selectedItem) => {
  return getQueryParams.oldId
    ? getQueryParams.oldId
    : selectedFileType === '10k'
    ? get(selectedItem, 'oldId10k', null)
      ? get(selectedItem, 'oldId10k', null)
      : get(selectedItem, 'oldId10q', null)
    : get(selectedItem, 'oldId10q', null)
    ? get(selectedItem, 'oldId10q', null)
    : get(selectedItem, 'oldId10k', null);
};
export const getRecentId = (getQueryParams, selectedFileType, selectedItem) => {
  return getQueryParams.recentId
    ? getQueryParams.recentId
    : selectedFileType === '10k'
    ? get(selectedItem, 'recentId10k', null)
      ? get(selectedItem, 'recentId10k', null)
      : get(selectedItem, 'recentId10q', null)
    : get(selectedItem, 'recentId10q', null)
    ? get(selectedItem, 'recentId10q', null)
    : get(selectedItem, 'recentId10k', null);
};
