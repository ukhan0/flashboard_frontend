import config from './config';
const searchIndex =
  process.env?.REACT_APP_DOMAIN_NAME === 'TMX'
    ? [
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
      ]
    : [
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
          label: 'Financial Tweets',
          value: config.twitterSearchIndex
        },
        {
          id: 5,
          label: 'Twitter Firehose',
          value: 'twitter-firehose'
        }
      ];

export default searchIndex;
