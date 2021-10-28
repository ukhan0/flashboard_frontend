export const getComparisionSettings = () => {
  const settings = JSON.parse(localStorage.getItem('comparisionSetting'));

  return settings;
};
export const saveComparisionSettings = setting => {
  localStorage.setItem('comparisionSetting', JSON.stringify(setting));
};
