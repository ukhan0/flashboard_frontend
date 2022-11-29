export default [
  {
    label: 'EC-FMP',
    value: [{ value: 'FMP-Transcript', color: 'rgb(244,91,91)' }],
    globalFlag: 0,
    documentTypeGroup: 'EC-FMP',
    documentTypeFillingGraph: ['FMP-Transcript', 'Earning Call'],
    color: 'rgb(244,91,91)',
    domestic: 1,
    canadian: 1,
    global: null,
    index: 'fillings_sec_ecfmp*',
    sections: {
      totdoc: ['fmp-transcript.*'],
      mda: [],
      rf: [],
      notes: []
    }
  },
  {
    label: '10-K',
    value: [
      { value: '10-K', color: 'rgb(244,91,91)' },
      { value: '10-K/A', color: 'rgb(244,91,91)' },
      { value: '10-K405', color: 'rgb(244,91,91)' },
      { value: '10-K405/A', color: 'rgb(244,91,91)' },
      { value: '10-KT', color: 'rgb(244,91,91)' },
      { value: '10-KT/A', color: 'rgb(244,91,91)' }
    ],
    globalFlag: 0,
    documentTypeGroup: '10-K',
    documentTypeFillingGraph: ['10-K', '10-K/A', '10-K405', '10-K405/A', '10-KT', '10-KT/A'],
    color: 'rgb(244,91,91)',
    domestic: 1,
    canadian: null,
    global: null,
    index: 'fillings_sec_10K*',
    sections: {
      totdoc: ['10-k.*'],
      mda: ['10k.p2.i7.*'],
      rf: ['10k.p1.i1a.*'],
      notes: ['10k.n.*']
    }
  },

  {
    label: '10-Q',
    value: [
      { value: '10-Q', color: 'rgb(247,163,92)' },
      { value: '10QSB', color: 'rgb(247,163,92)' },
      { value: '10-QT/A', color: 'rgb(247,163,92)' },
      { value: '10-QT', color: 'rgb(247,163,92)' },
      { value: '10-Q/A', color: 'rgb(247,163,92)' }
    ],
    globalFlag: 0,
    documentTypeGroup: '10-Q',
    documentTypeFillingGraph: ['10-Q', '10QSB', '10-QT/A', '10-QT', '10-Q/A'],
    color: 'rgb(247,163,92)',
    domestic: 1,
    canadian: null,
    global: null,
    index: 'fillings_sec_10Q*',
    sections: {
      totdoc: ['10-q.*'],
      mda: ['10q.p1.i2.*'],
      rf: ['10q.p2.i1a.*'],
      notes: ['10q.n.*']
    }
  },
  {
    label: '20-F',
    value: [
      { value: '20-F', color: 'rgb(200,91,144)' },
      { value: '20-F/A', color: 'rgb(200,91,144)' }
    ],
    globalFlag: 0,
    documentTypeGroup: '20-F',
    documentTypeFillingGraph: ['20-F', '20-F/A'],
    color: 'rgb(200,91,144)',
    domestic: 1,
    canadian: null,
    global: null,
    index: 'fillings_sec_20f*',
    sections: {
      totdoc: ['20-f.*'],
      mda: [],
      rf: [],
      notes: []
    }
  },
  {
    label: 'FIN-SUPP',
    value: [{ value: 'FIN-SUPP', color: 'rgb(50,91,91)' }],

    globalFlag: 1,
    documentTypeGroup: 'FIN-SUPP',
    documentTypeFillingGraph: ['FIN SUPP', 'FS'],
    color: 'rgb(50,91,91)',
    domestic: 1,
    canadian: 1,
    global: null,
    index: 'fillings_global_finsupp*',
    sections: {
      totdoc: ['fin supp.*'],
      mda: [],
      rf: [],
      notes: []
    }
  },
  {
    label: 'OTH-FIN',
    value: [{ value: 'Other Financials', color: 'rgb(248,91,91)' }],

    globalFlag: 1,
    documentTypeGroup: 'OTH-FIN',
    documentTypeFillingGraph: ['OTH FIN', 'Other Financials', 'OF'],
    color: 'rgb(248,91,91)',
    domestic: 1,
    canadian: 1,
    global: null,
    index: 'fillings_global_othfin*',
    sections: {
      totdoc: ['other financials.*'],
      mda: [],
      rf: [],
      notes: []
    }
  },

  {
    label: '40-F',
    value: [{ value: '40-F', color: 'rgb(80,91,144)' }, { value: '40-F' }],

    globalFlag: 0,
    documentTypeGroup: '40-F',
    documentTypeFillingGraph: ['40-F'],
    color: 'rgb(80,91,144)',
    domestic: 1,
    canadian: null,
    global: null,
    index: 'fillings_sec_20f*',
    sections: {
      totdoc: ['40-f.*'],
      mda: [],
      rf: [],
      notes: []
    }
  },
  {
    label: '6-K',
    value: [
      { value: '6-k', color: 'rgb(210,91,148)' },
      { value: '6-K/A', color: 'rgb(210,91,148)' }
    ],
    globalFlag: 0,
    documentTypeGroup: '6-K',
    documentTypeFillingGraph: ['6-K', '6-K/A'],
    color: 'rgb(210,91,148)',
    domestic: 1,
    canadian: null,
    global: null,
    index: 'fillings_sec_6k*',
    sections: {
      totdoc: ['6-k.*'],
      mda: [],
      rf: [],
      notes: []
    }
  },
  {
    label: '8-K',
    value: [
      { value: '8-K15D5', color: 'rgb(43,144,144)' },
      { value: '8-K12G3/A', color: 'rgb(43,144,144)' },
      { value: '8-K12G3', color: 'rgb(43,144,144)' },
      { value: '8-K12B/A', color: 'rgb(43,144,144)' },
      { value: '8-K12B', color: 'rgb(43,144,144)' },
      { value: '8-K/A', color: 'rgb(43,144,144)' },
      { value: '8-K', color: 'rgb(43,144,144)' }
    ],

    globalFlag: 0,
    documentTypeGroup: '8-K',
    documentTypeFillingGraph: ['8-K15D5', '8-K12G3/A', '8-K12G3', '8-K12B/A', '8-K12B', '8-K/A', '8-K'],
    color: 'rgb(43,144,144)',
    domestic: 1,
    canadian: null,
    global: null,
    index: 'fillings_sec_8k*',
    sections: {
      totdoc: ['8-k.*'],
      mda: [],
      rf: [],
      notes: []
    }
  },

  {
    label: 'AR',
    value: [
      { value: 'ARS/A', color: 'rgb(00,91,91)' },
      { value: 'ARS', color: 'rgb(00,91,91)' },
      { value: 'AR', color: 'rgb(00,91,91)' }
    ],
    globalFlag: 1,
    documentTypeGroup: 'AR',
    documentTypeFillingGraph: ['ARS/A', 'ARS', 'AR', 'Annual Report'],
    color: 'rgb(00,91,91)',
    domestic: 1,
    canadian: 1,
    global: null,
    index: 'fillings_global_ar*',
    sections: {
      totdoc: ['ar.*'],
      mda: [],
      rf: [],
      notes: []
    }
  },

  {
    label: 'ESG',
    value: [
      { value: 'TCFD Report', color: 'rgb(139,92,246)' },
      { value: 'Sustainability Report', color: 'rgb(139,92,246)' },
      { value: 'Environmental Report', color: 'rgb(139,92,246)' },
      { value: 'Corporate Governance Report', color: 'rgb(139,92,246)' },
      { value: 'Corporate Social Responsibility Report', color: 'rgb(139,92,246)' }
    ],

    globalFlag: 1,
    documentTypeGroup: 'ESG',
    documentTypeFillingGraph: [
      'Sustainability Report',
      'Corporate Social Responsibility Report',
      'Corporate Governance Report',
      'Environmental Report',
      'TCFD Report'
    ],
    color: 'rgb(139 92 246)',
    domestic: 1,
    canadian: 1,
    global: null,
    index: 'fillings_global_esg*',
    sections: {
      totdoc: ['corporate-governance-report.*'],
      mda: [],
      rf: [],
      notes: []
    }
  },

  {
    label: 'QR',
    value: [
      { value: 'QR', color: 'rgb(140,91,91)' },
      { value: 'QR/A', color: 'rgb(140,91,91)' }
    ],

    globalFlag: 1,
    documentTypeGroup: 'QR',
    documentTypeFillingGraph: ['QR', 'QR/A'],
    color: 'rgb(140,91,91)',
    domestic: 1,
    canadian: 1,
    global: null,
    index: 'fillings_global_qr*',
    sections: {
      totdoc: ['qr.*'],
      mda: [],
      rf: [],
      notes: []
    }
  },
  {
    label: 'SR',
    value: [{ value: 'SR', color: 'rgb(110,91,91)' }],

    globalFlag: 1,
    documentTypeGroup: 'SR',
    documentTypeFillingGraph: ['SR'],
    color: 'rgb(110,91,91)',
    domestic: 1,
    canadian: 1,
    global: null,
    index: 'fillings_global_sr*',
    sections: {
      totdoc: ['sr.*'],
      mda: [],
      rf: [],
      notes: []
    }
  }
];
