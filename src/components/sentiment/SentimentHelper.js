export const getSentimentSettings = () => {
    const settings = JSON.parse(localStorage.getItem('sentimentSetting'));
  
    return settings;
  };
  export const saveSentimentSettings = setting => {
    localStorage.setItem('sentimentSetting', JSON.stringify(setting));
  };
  