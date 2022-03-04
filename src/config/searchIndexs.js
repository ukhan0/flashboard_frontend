import config from './config';
export default [
  {
    label: 'SEC Filings',
    value: config.secSearchIndex
  },
  {
    label: 'SEDAR Filings',
    value: config.sedarSearchIndex
  },
  {
    label: 'Global Filings',
    value: config.globalSearchIndex
  },
  {
    label: 'Tweet',
    value: config.twitterSearchIndex
  }
];
