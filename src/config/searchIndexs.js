import config from './config';
export default [
  {
    id: 1,
    label: 'SEC Filings',
    value: config.secSearchIndex
  },
  {
    id: 2,
    label: 'SEDAR Filings',
    value: config.sedarSearchIndex
  },
  {
    id: 3,
    label: 'Global Filings',
    value: config.globalSearchIndex
  },
  {
    id: 4,
    label: 'Tweet',
    value: config.twitterSearchIndex
  }
];
