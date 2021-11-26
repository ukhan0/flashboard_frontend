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

const revenueMockData = [
  {
    wordDifference: 0,
    percentage: 0,
    oldCount: 1,
    newCount: 1,
    name: 'OPERATIONS'
  },
  {
    wordDifference: 20,
    percentage: 40,
    oldCount: 50,
    newCount: 70,
    name: 'Company'
  },
  {
    wordDifference: 0,
    percentage: 0,
    oldCount: 2,
    newCount: 2,
    name: 'the Private Securities Litigation Reform Act'
  },
  {
    wordDifference: 3,
    percentage: 100,
    oldCount: 3,
    newCount: 6,
    name: 'AngioDynamics'
  },
  {
    wordDifference: 0,
    percentage: 0,
    oldCount: 1,
    newCount: 1,
    name: 'FDA'
  },
  {
    wordDifference: 0,
    percentage: 0,
    oldCount: 1,
    newCount: 1,
    name: 'the Securities and Exchange Commission'
  },
  {
    wordDifference: 0,
    percentage: 0,
    oldCount: 2,
    newCount: 2,
    name: 'SEC'
  },
  {
    wordDifference: 1,
    percentage: 100,
    oldCount: 0,
    newCount: 1,
    name: 'CARES'
  },
  {
    wordDifference: 3,
    percentage: 100,
    oldCount: 3,
    newCount: 6,
    name: 'AngioVac'
  },
  {
    wordDifference: 3,
    percentage: 150,
    oldCount: 2,
    newCount: 5,
    name: 'Auryon'
  },
  {
    wordDifference: 4,
    percentage: 100,
    oldCount: 4,
    newCount: 8,
    name: 'NanoKnife'
  },
  {
    wordDifference: 0,
    percentage: 0,
    oldCount: 1,
    newCount: 1,
    name: 'this Quarterly Report'
  },
  {
    wordDifference: 3,
    percentage: 300,
    oldCount: 1,
    newCount: 4,
    name: 'Midlines'
  },
  {
    wordDifference: 2,
    percentage: 200,
    oldCount: 0,
    newCount: 2,
    name: 'Balloon'
  },
  {
    wordDifference: 2,
    percentage: 200,
    oldCount: 0,
    newCount: 2,
    name: 'Pathfinder'
  },
  {
    wordDifference: 1,
    percentage: 50,
    oldCount: 2,
    newCount: 3,
    name: 'G&A'
  },
  {
    wordDifference: 4,
    percentage: 200,
    oldCount: 2,
    newCount: 6,
    name: 'Fluid Management'
  },
  {
    wordDifference: 0,
    percentage: 0,
    oldCount: 1,
    newCount: 1,
    name: 'Medline Industries, Inc.'
  },
  {
    wordDifference: 2,
    percentage: 200,
    oldCount: 0,
    newCount: 2,
    name: 'Medline'
  },
  {
    wordDifference: 5,
    percentage: 83.33333333333334,
    oldCount: 6,
    newCount: 11,
    name: 'the Revolving Facility'
  },
  {
    wordDifference: 0,
    percentage: 0,
    oldCount: 1,
    newCount: 1,
    name: 'PICCs'
  },
  {
    wordDifference: 2,
    percentage: 200,
    oldCount: 0,
    newCount: 2,
    name: 'Dialysis'
  },
  {
    wordDifference: 1,
    percentage: 100,
    oldCount: 0,
    newCount: 1,
    name: 'MedComp'
  },
  {
    wordDifference: 0,
    percentage: 0,
    oldCount: 1,
    newCount: 1,
    name: 'Ports'
  },
  {
    wordDifference: 0,
    percentage: 0,
    oldCount: 1,
    newCount: 1,
    name: 'BioSentry'
  },
  {
    wordDifference: 1,
    percentage: 100,
    oldCount: 0,
    newCount: 1,
    name: 'the Eximo Medical'
  },
  {
    wordDifference: 1,
    percentage: 100,
    oldCount: 0,
    newCount: 1,
    name: 'RadiaDyne'
  },
  {
    wordDifference: 1,
    percentage: 100,
    oldCount: 0,
    newCount: 1,
    name: 'Credit Facility'
  },
  {
    wordDifference: 0,
    percentage: 0,
    oldCount: 4,
    newCount: 4,
    name: 'Revolving Facility'
  },
  {
    wordDifference: 1,
    percentage: 100,
    oldCount: 0,
    newCount: 1,
    name: 'Eximo Medical Ltd'
  },
  {
    wordDifference: 1,
    percentage: 100,
    oldCount: 0,
    newCount: 1,
    name: 'C3'
  },
  {
    wordDifference: 3,
    percentage: 300,
    oldCount: 1,
    newCount: 4,
    name: 'Credit Agreement'
  },
  {
    wordDifference: 1,
    percentage: 100,
    oldCount: 0,
    newCount: 1,
    name: 'the Fluid Management'
  },
  {
    wordDifference: 2,
    percentage: 200,
    oldCount: 0,
    newCount: 2,
    name: 'Medical Components Inc.'
  },
  {
    wordDifference: 0,
    percentage: 0,
    oldCount: 1,
    newCount: 1,
    name: 'Euro'
  },
  {
    wordDifference: 0,
    percentage: 0,
    oldCount: 1,
    newCount: 1,
    name: 'the Credit Agreement'
  },
  {
    wordDifference: 0,
    percentage: 0,
    oldCount: 3,
    newCount: 3,
    name: 'the Securities Exchange Act'
  },
  {
    wordDifference: 2,
    percentage: 100,
    oldCount: 2,
    newCount: 4,
    name: 'Bard, Inc.'
  },
  {
    wordDifference: 2,
    percentage: 100,
    oldCount: 2,
    newCount: 4,
    name: 'Bard ('
  },
  {
    wordDifference: 1,
    percentage: 100,
    oldCount: 1,
    newCount: 2,
    name: 'the US Patent and Trademark Office'
  },
  {
    wordDifference: 3,
    percentage: 100,
    oldCount: 3,
    newCount: 6,
    name: 'the Federal Circuit'
  },
  {
    wordDifference: 1,
    percentage: 100,
    oldCount: 1,
    newCount: 2,
    name: 'USPTO'
  },
  {
    wordDifference: 3,
    percentage: 60,
    oldCount: 5,
    newCount: 8,
    name: 'Bard'
  },
  {
    wordDifference: 1,
    percentage: 100,
    oldCount: 1,
    newCount: 2,
    name: 'Bard Peripheral Vascular'
  },
  {
    wordDifference: 4,
    percentage: 100,
    oldCount: 4,
    newCount: 8,
    name: 'Bards'
  },
  {
    wordDifference: -4,
    percentage: -66.66666666666666,
    oldCount: 6,
    newCount: 2,
    name: 'Court'
  },
  {
    wordDifference: 1,
    percentage: 100,
    oldCount: 1,
    newCount: 2,
    name: 'USC Sec'
  },
  {
    wordDifference: 1,
    percentage: 100,
    oldCount: 1,
    newCount: 2,
    name: 'The Federal Circuit'
  },
  {
    wordDifference: 3,
    percentage: 300,
    oldCount: 1,
    newCount: 4,
    name: 'AngioDynamics, Inc.'
  },
  {
    wordDifference: 1,
    percentage: 100,
    oldCount: 1,
    newCount: 2,
    name: 'Bard Access Systems, Inc.'
  },
  {
    wordDifference: 0,
    percentage: 0,
    oldCount: 1,
    newCount: 1,
    name: 'ANGIODYNAMICS'
  },
  {
    wordDifference: 0,
    percentage: 0,
    oldCount: 1,
    newCount: 1,
    name: 'INC'
  },
  {
    wordDifference: 0,
    percentage: 0,
    oldCount: 1,
    newCount: 1,
    name: 'Executive'
  },
  {
    wordDifference: 1,
    percentage: 100,
    oldCount: 0,
    newCount: 1,
    name: 'Eximo Medical, Ltd.'
  },
  {
    wordDifference: 1,
    percentage: 100,
    oldCount: 0,
    newCount: 1,
    name: 'the Companys Vascular Interventions and Therapies'
  },
  {
    wordDifference: 1,
    percentage: 100,
    oldCount: 0,
    newCount: 1,
    name: 'Peripheral Artery'
  },
  {
    wordDifference: 1,
    percentage: 100,
    oldCount: 0,
    newCount: 1,
    name: 'Consolidated Statements of Operations'
  },
  {
    wordDifference: 0,
    percentage: 0,
    oldCount: 3,
    newCount: 3,
    name: 'ASC'
  },
  {
    wordDifference: 0,
    percentage: 0,
    oldCount: 1,
    newCount: 1,
    name: 'Global Business Unit'
  },
  {
    wordDifference: 0,
    percentage: 0,
    oldCount: 1,
    newCount: 1,
    name: 'Companys'
  },
  {
    wordDifference: 2,
    percentage: 200,
    oldCount: 0,
    newCount: 2,
    name: 'Consolidated Balance Sheets'
  },
  {
    wordDifference: 0,
    percentage: 0,
    oldCount: 1,
    newCount: 1,
    name: 'the Consolidated Statements of Operations'
  },
  {
    wordDifference: 0,
    percentage: 0,
    oldCount: 2,
    newCount: 2,
    name: 'NY'
  },
  {
    wordDifference: 2,
    percentage: 200,
    oldCount: 0,
    newCount: 2,
    name: 'ASU'
  },
  {
    wordDifference: -5,
    percentage: -500,
    oldCount: 5,
    newCount: 0,
    name: 'Med Tech'
  },
  {
    wordDifference: -1,
    percentage: -100,
    oldCount: 1,
    newCount: 0,
    name: 'Vascular Access'
  },
  {
    wordDifference: -2,
    percentage: -200,
    oldCount: 2,
    newCount: 0,
    name: 'Med'
  },
  {
    wordDifference: -1,
    percentage: -100,
    oldCount: 1,
    newCount: 0,
    name: 'Core, Venous and'
  },
  {
    wordDifference: -1,
    percentage: -100,
    oldCount: 1,
    newCount: 0,
    name: 'Travel'
  },
  {
    wordDifference: -1,
    percentage: -100,
    oldCount: 1,
    newCount: 0,
    name: 'OARtrac'
  },
  {
    wordDifference: -4,
    percentage: -400,
    oldCount: 4,
    newCount: 0,
    name: 'QX Medical'
  },
  {
    wordDifference: -1,
    percentage: -100,
    oldCount: 1,
    newCount: 0,
    name: 'LLC'
  },
  {
    wordDifference: -1,
    percentage: -100,
    oldCount: 1,
    newCount: 0,
    name: 'Contracts with Customers'
  },
  {
    wordDifference: -2,
    percentage: -200,
    oldCount: 2,
    newCount: 0,
    name: 'Motion'
  },
  {
    wordDifference: -1,
    percentage: -100,
    oldCount: 1,
    newCount: 0,
    name: 'USC'
  },
  {
    wordDifference: -1,
    percentage: -100,
    oldCount: 1,
    newCount: 0,
    name: 'Motion for Judgment'
  },
  {
    wordDifference: -1,
    percentage: -100,
    oldCount: 1,
    newCount: 0,
    name: 'the Companys Motion for Judgment'
  }
];

export { filingsData, revenueMockData };
