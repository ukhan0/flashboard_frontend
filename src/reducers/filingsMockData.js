const filingsData = [
  {
    documentType: '10K',
    periodDate: '05 June, 2021',
    postedDate: '25 Aug, 2021'
  },
  {
    documentType: '8Q',
    periodDate: '07 June, 2021',
    postedDate: '26 Aug, 2021'
  },
  {
    documentType: '10Q',
    periodDate: '08 June, 2021',
    postedDate: '27 Aug, 2021'
  },
  {
    documentType: '9K',
    periodDate: '09 June, 2021',
    postedDate: '28 Aug, 2021'
  },
  {
    documentType: '10K',
    periodDate: '05 June, 2021',
    postedDate: '25 Aug, 2021'
  },
  {
    documentType: '8Q',
    periodDate: '07 June, 2021',
    postedDate: '26 Aug, 2021'
  },
  {
    documentType: '10Q',
    periodDate: '08 June, 2021',
    postedDate: '27 Aug, 2021'
  },
  {
    documentType: '9K',
    periodDate: '09 June, 2021',
    postedDate: '28 Aug, 2021'
  },
  {
    documentType: '10K',
    periodDate: '05 June, 2021',
    postedDate: '25 Aug, 2021'
  },
  {
    documentType: '8Q',
    periodDate: '07 June, 2021',
    postedDate: '26 Aug, 2021'
  },
  {
    documentType: '10Q',
    periodDate: '08 June, 2021',
    postedDate: '27 Aug, 2021'
  },
  {
    documentType: '9K',
    periodDate: '09 June, 2021',
    postedDate: '28 Aug, 2021'
  }
];

const revenueMockData = {
  OPERATIONS: { wordDifference: 0, percentage: 0, oldCount: 1, newCount: 1 },
  Company: { wordDifference: 20, percentage: 40, oldCount: 50, newCount: 70 },
  'the Private Securities Litigation Reform Act': { wordDifference: 0, percentage: 0, oldCount: 2, newCount: 2 },
  AngioDynamics: { wordDifference: 3, percentage: 100, oldCount: 3, newCount: 6 },
  FDA: { wordDifference: 0, percentage: 0, oldCount: 1, newCount: 1 },
  'the Securities and Exchange Commission': { wordDifference: 0, percentage: 0, oldCount: 1, newCount: 1 },
  SEC: { wordDifference: 0, percentage: 0, oldCount: 2, newCount: 2 },
  CARES: { wordDifference: 1, percentage: 100, oldCount: 0, newCount: 1 },
  AngioVac: { wordDifference: 3, percentage: 100, oldCount: 3, newCount: 6 },
  Auryon: { wordDifference: 3, percentage: 150, oldCount: 2, newCount: 5 },
  NanoKnife: { wordDifference: 4, percentage: 100, oldCount: 4, newCount: 8 },
  'this Quarterly Report': { wordDifference: 0, percentage: 0, oldCount: 1, newCount: 1 },
  Midlines: { wordDifference: 3, percentage: 300, oldCount: 1, newCount: 4 },
  Balloon: { wordDifference: 2, percentage: 200, oldCount: 0, newCount: 2 },
  Pathfinder: { wordDifference: 2, percentage: 200, oldCount: 0, newCount: 2 },
  'G&A': { wordDifference: 1, percentage: 50, oldCount: 2, newCount: 3 },
  'Fluid Management': { wordDifference: 4, percentage: 200, oldCount: 2, newCount: 6 },
  'Medline Industries, Inc.': { wordDifference: 0, percentage: 0, oldCount: 1, newCount: 1 },
  Medline: { wordDifference: 2, percentage: 200, oldCount: 0, newCount: 2 },
  'the Revolving Facility': { wordDifference: 5, percentage: 83.33333333333334, oldCount: 6, newCount: 11 },
  PICCs: { wordDifference: 0, percentage: 0, oldCount: 1, newCount: 1 },
  Dialysis: { wordDifference: 2, percentage: 200, oldCount: 0, newCount: 2 },
  MedComp: { wordDifference: 1, percentage: 100, oldCount: 0, newCount: 1 },
  Ports: { wordDifference: 0, percentage: 0, oldCount: 1, newCount: 1 },
  BioSentry: { wordDifference: 0, percentage: 0, oldCount: 1, newCount: 1 },
  'the Eximo Medical': { wordDifference: 1, percentage: 100, oldCount: 0, newCount: 1 },
  RadiaDyne: { wordDifference: 1, percentage: 100, oldCount: 0, newCount: 1 },
  'Credit Facility': { wordDifference: 1, percentage: 100, oldCount: 0, newCount: 1 },
  'Revolving Facility': { wordDifference: 0, percentage: 0, oldCount: 4, newCount: 4 },
  'Eximo Medical Ltd': { wordDifference: 1, percentage: 100, oldCount: 0, newCount: 1 },
  C3: { wordDifference: 1, percentage: 100, oldCount: 0, newCount: 1 },
  'Credit Agreement': { wordDifference: 3, percentage: 300, oldCount: 1, newCount: 4 },
  'the Fluid Management': { wordDifference: 1, percentage: 100, oldCount: 0, newCount: 1 },
  'Medical Components Inc.': { wordDifference: 2, percentage: 200, oldCount: 0, newCount: 2 },
  Euro: { wordDifference: 0, percentage: 0, oldCount: 1, newCount: 1 },
  'the Credit Agreement': { wordDifference: 0, percentage: 0, oldCount: 1, newCount: 1 },
  'the Securities Exchange Act': { wordDifference: 0, percentage: 0, oldCount: 3, newCount: 3 },
  'Bard, Inc.': { wordDifference: 2, percentage: 100, oldCount: 2, newCount: 4 },
  'Bard (': { wordDifference: 2, percentage: 100, oldCount: 2, newCount: 4 },
  'the US Patent and Trademark Office': { wordDifference: 1, percentage: 100, oldCount: 1, newCount: 2 },
  'the Federal Circuit': { wordDifference: 3, percentage: 100, oldCount: 3, newCount: 6 },
  USPTO: { wordDifference: 1, percentage: 100, oldCount: 1, newCount: 2 },
  Bard: { wordDifference: 3, percentage: 60, oldCount: 5, newCount: 8 },
  'Bard Peripheral Vascular': { wordDifference: 1, percentage: 100, oldCount: 1, newCount: 2 },
  Bards: { wordDifference: 4, percentage: 100, oldCount: 4, newCount: 8 },
  Court: { wordDifference: -4, percentage: -66.66666666666666, oldCount: 6, newCount: 2 },
  'USC Sec': { wordDifference: 1, percentage: 100, oldCount: 1, newCount: 2 },
  'The Federal Circuit': { wordDifference: 1, percentage: 100, oldCount: 1, newCount: 2 },
  'AngioDynamics, Inc.': { wordDifference: 3, percentage: 300, oldCount: 1, newCount: 4 },
  'Bard Access Systems, Inc.': { wordDifference: 1, percentage: 100, oldCount: 1, newCount: 2 },
  ANGIODYNAMICS: { wordDifference: 0, percentage: 0, oldCount: 1, newCount: 1 },
  INC: { wordDifference: 0, percentage: 0, oldCount: 1, newCount: 1 },
  Executive: { wordDifference: 0, percentage: 0, oldCount: 1, newCount: 1 },
  'Eximo Medical, Ltd.': { wordDifference: 1, percentage: 100, oldCount: 0, newCount: 1 },
  'the Companys Vascular Interventions and Therapies': { wordDifference: 1, percentage: 100, oldCount: 0, newCount: 1 },
  'Peripheral Artery': { wordDifference: 1, percentage: 100, oldCount: 0, newCount: 1 },
  'Consolidated Statements of Operations': { wordDifference: 1, percentage: 100, oldCount: 0, newCount: 1 },
  ASC: { wordDifference: 0, percentage: 0, oldCount: 3, newCount: 3 },
  'Global Business Unit': { wordDifference: 0, percentage: 0, oldCount: 1, newCount: 1 },
  Companys: { wordDifference: 0, percentage: 0, oldCount: 1, newCount: 1 },
  'Consolidated Balance Sheets': { wordDifference: 2, percentage: 200, oldCount: 0, newCount: 2 },
  'the Consolidated Statements of Operations': { wordDifference: 0, percentage: 0, oldCount: 1, newCount: 1 },
  NY: { wordDifference: 0, percentage: 0, oldCount: 2, newCount: 2 },
  ASU: { wordDifference: 2, percentage: 200, oldCount: 0, newCount: 2 },
  'Med Tech': { wordDifference: -5, percentage: -500, oldCount: 5, newCount: 0 },
  'Vascular Access': { wordDifference: -1, percentage: -100, oldCount: 1, newCount: 0 },
  Med: { wordDifference: -2, percentage: -200, oldCount: 2, newCount: 0 },
  'Core, Venous and': { wordDifference: -1, percentage: -100, oldCount: 1, newCount: 0 },
  Travel: { wordDifference: -1, percentage: -100, oldCount: 1, newCount: 0 },
  OARtrac: { wordDifference: -1, percentage: -100, oldCount: 1, newCount: 0 },
  'QX Medical': { wordDifference: -4, percentage: -400, oldCount: 4, newCount: 0 },
  LLC: { wordDifference: -1, percentage: -100, oldCount: 1, newCount: 0 },
  'Contracts with Customers': { wordDifference: -1, percentage: -100, oldCount: 1, newCount: 0 },
  Motion: { wordDifference: -2, percentage: -200, oldCount: 2, newCount: 0 },
  USC: { wordDifference: -1, percentage: -100, oldCount: 1, newCount: 0 },
  'Motion for Judgment': { wordDifference: -1, percentage: -100, oldCount: 1, newCount: 0 },
  'the Companys Motion for Judgment': { wordDifference: -1, percentage: -100, oldCount: 1, newCount: 0 }
};

export { filingsData, revenueMockData };
