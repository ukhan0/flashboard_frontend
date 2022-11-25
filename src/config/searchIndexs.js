import config from './config';
export default [
  {
    id: 2,
    label: 'SEDAR Filings',
    value: config.sedarSearchIndex
  },
  {
    id: 1,
    label: 'SEC Filings',
    value: config.secSearchIndex
  },
  {
    id: 3,
    label: 'Global Filings',
    value: config.globalSearchIndex
  },
  {
    id: 4,
    label: 'Financial Tweets',
    value: config.twitterSearchIndex
  },
  {
    id: 5,
    label: 'Twitter Firehose',
    value: 'twitter-firehose'
  }
];
