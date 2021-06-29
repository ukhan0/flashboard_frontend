const config = {
  apiUrl: process.env.REACT_APP_API_URL,
  // apiUrl: 'http://34.209.84.170/flashboard/public',
  comparisionSite: process.env.REACT_APP_COMPARISION_SITE_URL,
  agGridLicense: process.env.REACT_APP_AGGRID_LICENSE,
  sentimentUrl: process.env.REACT_APP_SENTIMENT_URL,
  companyLogoPath: 'https://sma-assets.s3.us-east-2.amazonaws.com/logos/',
  hideCard:process.env.REACT_APP_HIDE_CARD,
};

export default config;