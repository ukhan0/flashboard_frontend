const config = {
  apiUrl: process.env.REACT_APP_API_URL,
  // apiUrl: 'http://34.209.84.170/flashboard/public',
  comparisionSite: process.env.REACT_APP_COMPARISION_SITE_URL,
  agGridLicense: process.env.REACT_APP_AGGRID_LICENSE,
  sentimentUrl: process.env.REACT_APP_SENTIMENT_URL,
  companyLogoPath: 'https://sma-assets.s3.us-east-2.amazonaws.com/logos/',
  hideCard: process.env.REACT_APP_HIDE_CARD,
  hideGraph: process.env.REACT_APP_HIDE_GRAPH,
  completeDataUpdateDuration: 1 * 60 * 60 * 1000, // miliseconds in a hour
  domesticSearchIndex: process.env.REACT_APP_DOMESTIC_SEARCH_INDEX,
  globalSearchIndex: process.env.REACT_APP_GLOBAL_SEARCH_INDEX,
  twitterSearchIndex: process.env.REACT_APP_TWITTER_SEARCH_INDEX,
  fillingApiUrl: process.env.REACT_APP_FILING_URL
};

export default config;
