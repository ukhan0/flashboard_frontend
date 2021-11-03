export const fileTypesSelection = [
  { label: '10-K', key: '10k' },
  { label: '10-Q', key: '10q' }
];
export const universeSelection = [
  { label: 'Watchlist', key: 'watchlist' },
  { label: 'Recent', key: 'recent' },
  { label: 'Complete', key: 'all' }
];
export const metricsSelection = [
  { label: 'Total', key: 'totdoc' },
  { label: 'MD&A', key: 'mda' },
  { label: 'Risk', key: 'rf' },
  { label: 'Notes', key: 'notes' }
];
export const sentimentTypes = [
  { label: 'Hide', key: 'hide' },
  { label: 'Visible', key: 'visible' },
  { label: 'Extreme Only', key: 'extremeSentiment' }
];

export const comparisionDifferenceTypes = [
  { label: 'All', key: 0 },
  { label: 'Significant', key: 25 },
  { label: 'New Sections Only', key: 100 }
];

export const comparisionMethodTypes = [
  { label: 'Textual', key: 'text' },
  { label: 'Word Count', key: 'wordcount' }
];
export const comparisionViewTypes = [
  { label: 'All', key: 'all' },
  { label: 'New Sections Only', key: 'New Section ' }
];

export const searchVersionTypes = [
  { label: 'Simple', key: true },
  { label: 'Advanced', key: false }
];