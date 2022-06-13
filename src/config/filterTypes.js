export const fileTypesSelection = [
  { label: '10-K', key: '10k' },
  { label: '10-Q', key: '10q' }
];
export const fileTypesSelectionGlobal = [
  { label: 'AR', key: '10k' },
  { label: 'QR', key: '10q' }
];
export const typesSelection = [
  { label: 'SEC', key: 'domestic' },
  { label: 'SEDAR', key: 'global' }
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
export const sentimentVersions = [
  { label: 'Original', key: 'original' },
  { label: 'Flat Text', key: 'flatText' }
];
export const homePageTypesSelection = [
  { label: 'Watchlist', key: 'fillings_*', type: 'Watchlist', id: 1 },
  { label: 'SEC', key: 'fillings_sec*', type: 'SEC', id: 2 },
  { label: 'SEDAR', key: 'fillings_sedar*', type: 'SEDAR', id: 3 }
];

export const earningsCallType = [
  { label: 'All', key: 'all' },
  { label: 'Watchlist', key: 'watchlist' }
];
