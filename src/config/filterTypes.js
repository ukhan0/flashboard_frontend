export const fileTypesSelection = [
  { label: '10-K', key: '10k' },
  { label: '10-Q', key: '10q' }
];
export const fileTypesSelectionGlobal = [
  { label: 'AR', key: '10k' },
  { label: 'QR', key: '10q' }
];
export const typesSelection =
  process.env?.REACT_APP_DOMAIN_NAME === 'TMX'
    ? [
        { label: 'Canada', key: 'global' },
        { label: 'U.S.', key: 'domestic' },
        { label: 'Global', key: 'newGlobal' }
      ]
    : [
        { label: 'U.S.', key: 'domestic' },
        { label: 'Canada', key: 'global' },
        { label: 'Global', key: 'newGlobal' }
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
export const sentimentVersions = [{ label: 'Show Original', key: 'original' }];
export const homePageTypesSelection =
  process.env?.REACT_APP_DOMAIN_NAME === 'TMX'
    ? [
        { label: 'Canda', key: 'fillings_sedar*', type: 'SEDAR', id: 3 },
        { label: 'U.S.', key: 'fillings_sec*', type: 'SEC', id: 2 },
        { label: 'Watchlist', key: 'fillings_*', type: 'Watchlist', id: 1 }
      ]
    : [
        { label: 'U.S.', key: 'fillings_sec*', type: 'SEC', id: 2 },
        { label: 'Canda', key: 'fillings_sedar*', type: 'SEDAR', id: 3 },
        { label: 'Watchlist', key: 'fillings_*', type: 'Watchlist', id: 1 }
      ];

export const earningsCallType = [
  { label: 'All', key: 'all' },
  { label: 'Watchlist', key: 'watchlist' }
];

export const entityTypes = [
  { label: ' Emerging', key: 'emerging_entities' },
  { label: 'Disappearing', key: 'disappearing_entities' },
  { label: 'Common', key: 'common_entities' }
];
