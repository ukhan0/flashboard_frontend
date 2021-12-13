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
const abc = {
  FUNCTION: 'searchTermAjaxData',
  QUERY: {
    index: 'tweets',
    from: 0,
    size: 12,
    _source: [
      'topic_names',
      'topic_ids',
      'score',
      'contents',
      'source',
      'date_posted',
      'date_posted_text',
      'posting_account_id',
      'twitter_account_id',
      'posting_account',
      'tweet_flag',
      'posting_account_rating',
      'pit_account_rating',
      'accuracy',
      'accuracy_end_date',
      'indicative'
    ],
    body: {
      size: 100,
      highlight: {
        pre_tags: ['<span class="yellowColor">'],
        post_tags: ['</span>'],
        type: 'unified',
        require_field_match: true,
        fragmenter: 'span',
        fields: {
          '*': {
            fragment_size: 450,
            number_of_fragments: 0,
            type: 'plain',
            fragmenter: 'simple',
            force_source: true
          }
        }
      },
      query: {
        bool: {
          filter: {
            query_string: {
              fields: ['*'],
              query: 'date_posted:[1607154900 TO 1638690900] AND (covid)',
              default_operator: 'AND'
            }
          }
        }
      }
    }
  },
  count: 99,
  buckets: [],
  data: [
    {
      twitter_account_id: '472122299',
      topic_ids: '4070,404445',
      tweet_flag: null,
      pit_account_rating: null,
      accuracy: null,
      source: 'https://about.twitter.com/products/tweetdeck',
      indicative: 'false',
      posting_account_id: '2629010',
      date_posted_text: '2021-11-25 05:00:00.0000',
      posting_account_rating: null,
      score: 0,
      date_posted: 1637838000,
      contents: 'The',
      posting_account: 'PhilippineStar',
      accuracy_end_date: null,
      topic_names: 'AZN,AZN.L',
      term: 'covid',
      es_index: 'tweets',
      highlighted_text: {
        'tweet_json.body':
          ' -- <span class="lineResult">The Philippines welcomed Thursday the arrival of more than three million doses of the <span class="yellowColor">COVID</span>-19 vaccine developed by\u2026 https://t.co/ORNFPpJo26</span><br/>',
        'tweet_json.long_object.body':
          ' -- <span class="lineResult">The Philippines welcomed Thursday the arrival of more than three million doses of the <span class="yellowColor">COVID</span>-19 vaccine developed by British-Swedish pharmaceutical company AstraZeneca.\nhttps://t.co/jiulEZkFlO</span><br/>',
        'tweet_json.object.summary':
          ' -- <span class="lineResult">The Philippines welcomed Thursday the arrival of more than three million doses of the <span class="yellowColor">COVID</span>-19 vaccine developed by\u2026 https://t.co/ORNFPpJo26</span><br/>'
      },
      totalHits: 3
    },
    {
      twitter_account_id: '1375420865278578688',
      topic_ids: '416965',
      tweet_flag: null,
      pit_account_rating: null,
      accuracy: null,
      source: 'http://twitter.com/download/iphone',
      indicative: 'false',
      posting_account_id: '36972839',
      date_posted_text: '2021-11-25 04:55:23.0000',
      posting_account_rating: null,
      score: 0,
      date_posted: 1637837723,
      contents: '$OCGN',
      posting_account: 'couchtrading',
      accuracy_end_date: null,
      topic_names: 'OCGN',
      term: 'covid',
      es_index: 'tweets',
      highlighted_text: {
        'tweet_json.long_object.body':
          ' -- <span class="lineResult">$OCGN \ud83d\udea8BREAKING - More great news for #Covaxin -&gt; WHO confirms significantly uogrades protection % against delta! \u2066@US_FDA -\u2069 Covaxin meets WHO efficacy criteria for <span class="yellowColor">Covid</span> vaccines for Delta variant: Bharat Biotech https://t.co/HsWSSF2oqy</span><br/>',
        'tweet_json.long_object.twitter_entities.urls.expanded_url':
          ' -- <span class="lineResult">https://www.livemint.com/science/health/covaxin-meets-who-efficacy-criteria-for-<span class="yellowColor">covid</span>-vaccines-for-delta-variant-bharat-biotech-11637809998281.html</span><br/>'
      },
      totalHits: 2
    },
    {
      twitter_account_id: '44728980',
      topic_ids: '4070,404445',
      tweet_flag: null,
      pit_account_rating: null,
      accuracy: null,
      source: 'https://about.twitter.com/products/tweetdeck',
      indicative: 'false',
      posting_account_id: '129461',
      date_posted_text: '2021-11-25 04:55:00.0000',
      posting_account_rating: null,
      score: 0,
      date_posted: 1637837700,
      contents: 'Nearly',
      posting_account: 'ANCALERTS',
      accuracy_end_date: null,
      topic_names: 'AZN,AZN.L',
      term: 'covid',
      es_index: 'tweets',
      highlighted_text: {
        'tweet_json.body':
          ' -- <span class="lineResult">Nearly 3.2-M doses of AstraZeneca <span class="yellowColor">COVID</span> vaccine donated by UK arrive in PH https://t.co/A2E699nUzl</span><br/>',
        'tweet_json.object.summary':
          ' -- <span class="lineResult">Nearly 3.2-M doses of AstraZeneca <span class="yellowColor">COVID</span> vaccine donated by UK arrive in PH https://t.co/A2E699nUzl</span><br/>',
        'tweet_json.twitter_entities.urls.expanded_url':
          ' -- <span class="lineResult">https://news.abs-cbn.com/news/11/25/21/nearly-32-m-doses-of-astrazeneca-<span class="yellowColor">covid</span>-vaccine-arrive</span><br/>'
      },
      totalHits: 3
    },
    {
      twitter_account_id: '28236035',
      topic_ids: '4070,404445',
      tweet_flag: null,
      pit_account_rating: null,
      accuracy: null,
      source: 'https://mobile.twitter.com',
      indicative: 'false',
      posting_account_id: '39257043',
      date_posted_text: '2021-11-25 04:42:21.0000',
      posting_account_rating: null,
      score: 0,
      date_posted: 1637836941,
      contents: 'MoH',
      posting_account: 'PatilAsoyents',
      accuracy_end_date: null,
      topic_names: 'AZN,AZN.L',
      term: 'covid',
      es_index: 'tweets',
      highlighted_text: {
        'tweet_json.body':
          ' -- <span class="lineResult">MoH is preparing to introduce a law allowing citizens to take a <span class="yellowColor">Covid</span> booster shot - giving those who were vaccinat\u2026 https://t.co/6QDuJbVpIc</span><br/>',
        'tweet_json.long_object.body':
          ' -- <span class="lineResult">MoH is preparing to introduce a law allowing citizens to take a <span class="yellowColor">Covid</span> booster shot - giving those who were vaccinated when vaccines first became available in Armenia in April a chance to receive a vaccine that is not Astrazeneca or Sputnik (at that time only available vaccines).</span><br/>',
        'tweet_json.object.summary':
          ' -- <span class="lineResult">MoH is preparing to introduce a law allowing citizens to take a <span class="yellowColor">Covid</span> booster shot - giving those who were vaccinat\u2026 https://t.co/6QDuJbVpIc</span><br/>'
      },
      totalHits: 3
    },
    {
      twitter_account_id: '20648704',
      topic_ids: '4070,404445',
      tweet_flag: null,
      pit_account_rating: '0.0038',
      accuracy: null,
      source: 'https://mobile.twitter.com',
      indicative: 'true',
      posting_account_id: '108731',
      date_posted_text: '2021-11-25 04:42:06.0000',
      posting_account_rating: '0.003800',
      score: 0,
      date_posted: 1637836926,
      contents: 'AstraZeneca',
      posting_account: 'markrmcqueen',
      accuracy_end_date: null,
      topic_names: 'AZN,AZN.L',
      term: 'covid',
      es_index: 'tweets',
      highlighted_text: {
        'tweet_json.body':
          ' -- <span class="lineResult">AstraZeneca vaccine may give longer protection that is shielding UK from new <span class="yellowColor">Covid</span> wave https://t.co/fef8kVBztJ</span><br/>',
        'tweet_json.object.summary':
          ' -- <span class="lineResult">AstraZeneca vaccine may give longer protection that is shielding UK from new <span class="yellowColor">Covid</span> wave https://t.co/fef8kVBztJ</span><br/>'
      },
      totalHits: 2
    },
    {
      twitter_account_id: '23123824',
      topic_ids: '4070,404445',
      tweet_flag: null,
      pit_account_rating: null,
      accuracy: null,
      source: 'https://about.twitter.com/products/tweetdeck',
      indicative: 'false',
      posting_account_id: '1481178',
      date_posted_text: '2021-11-25 04:35:20.0000',
      posting_account_rating: null,
      score: 0,
      date_posted: 1637836520,
      contents: "'no harm'",
      posting_account: 'dohanews',
      accuracy_end_date: null,
      topic_names: 'AZN,AZN.L',
      term: 'covid',
      es_index: 'tweets',
      highlighted_text: {
        'tweet_json.body':
          ' -- <span class="lineResult">\ud83d\udc89 \ud83d\udc69\ud83c\udffe\u200d\u2695\ufe0f\'No harm\' in #<span class="yellowColor">COVID</span> vaccine mix and match says a top health official in Qatar.\nDoha is yet to approve\u2026 https://t.co/7HQ0c8I1gY</span><br/>',
        'tweet_json.long_object.body':
          ' -- <span class="lineResult">\ud83d\udc89 \ud83d\udc69\ud83c\udffe\u200d\u2695\ufe0f\'No harm\' in #<span class="yellowColor">COVID</span> vaccine mix and match says a top health official in Qatar.\nDoha is yet to approve @astrazeneca booster shots, but has made third doses of @pfizer and @moderna_tx available to the general public\n\nRead more here \ud83d\udc47\n\nhttps://t.co/6r77RlMblE</span><br/>',
        'tweet_json.long_object.twitter_entities.hashtags.text':
          ' -- <span class="lineResult"><span class="yellowColor">COVID</span></span><br/>',
        'tweet_json.object.summary':
          ' -- <span class="lineResult">\ud83d\udc89 \ud83d\udc69\ud83c\udffe\u200d\u2695\ufe0f\'No harm\' in #<span class="yellowColor">COVID</span> vaccine mix and match says a top health official in Qatar.\nDoha is yet to approve\u2026 https://t.co/7HQ0c8I1gY</span><br/>',
        'tweet_json.twitter_entities.hashtags.text':
          ' -- <span class="lineResult"><span class="yellowColor">COVID</span></span><br/>',
        'tweet_json.long_object.twitter_entities.urls.expanded_url':
          ' -- <span class="lineResult">https://www.dohanews.co/can-you-mix-and-match-<span class="yellowColor">covid</span>-vaccines/</span><br/>'
      },
      totalHits: 6
    },
    {
      twitter_account_id: '1436280186924789764',
      topic_ids: '416774,4070,75,404445',
      tweet_flag: null,
      pit_account_rating: null,
      accuracy: null,
      source: 'http://twitter.com/download/android',
      indicative: 'false',
      posting_account_id: '39362041',
      date_posted_text: '2021-11-25 04:33:53.0000',
      posting_account_rating: null,
      score: 0,
      date_posted: 1637836433,
      contents: '@FinanceLancelot',
      posting_account: 'CONCENTRICAsset',
      accuracy_end_date: null,
      topic_names: 'MRNA,AZN,PFE,AZN.L',
      term: 'covid',
      es_index: 'tweets',
      highlighted_text: {
        'tweet_json.long_object.twitter_entities.urls.expanded_url':
          ' -- <span class="lineResult">https://edition.cnn.com/2021/11/23/health/merck-<span class="yellowColor">covid</span>-pill-molnupiravir/index.html</span><br/>'
      },
      totalHits: 1
    },
    {
      twitter_account_id: '257957727',
      topic_ids: '416547',
      tweet_flag: null,
      pit_account_rating: null,
      accuracy: null,
      source: 'http://twitter.com/#!/download/ipad',
      indicative: 'false',
      posting_account_id: '31816498',
      date_posted_text: '2021-11-25 04:31:57.0000',
      posting_account_rating: null,
      score: 0,
      date_posted: 1637836317,
      contents: '@Benjfent',
      posting_account: 'rupert11221',
      accuracy_end_date: null,
      topic_names: 'BNTX',
      term: 'covid',
      es_index: 'tweets',
      highlighted_text: {
        'tweet_json.body':
          ' -- <span class="lineResult">@Benjfent13 @gavlar87 @Mikenotsoyeadon <span class="yellowColor">covid</span>-19, at a rate of about 450 cases per million infections.\n\nThis compare\u2026 https://t.co/OJPAFqIXLj</span><br/>',
        'tweet_json.long_object.body':
          ' -- <span class="lineResult">@Benjfent13 @gavlar87 @Mikenotsoyeadon <span class="yellowColor">covid</span>-19, at a rate of about 450 cases per million infections.\n\nThis compares with 67 cases of myocarditis per million males of the same age following their second dose of a Pfizer/BioNTech</span><br/>',
        'tweet_json.object.summary':
          ' -- <span class="lineResult">@Benjfent13 @gavlar87 @Mikenotsoyeadon <span class="yellowColor">covid</span>-19, at a rate of about 450 cases per million infections.\n\nThis compare\u2026 https://t.co/OJPAFqIXLj</span><br/>'
      },
      totalHits: 3
    },
    {
      twitter_account_id: '1461233587672555525',
      topic_ids: '30',
      tweet_flag: null,
      pit_account_rating: null,
      accuracy: null,
      source: 'http://twitter.com/download/iphone',
      indicative: 'false',
      posting_account_id: '40527908',
      date_posted_text: '2021-11-25 04:31:32.0000',
      posting_account_rating: null,
      score: 0,
      date_posted: 1637836292,
      contents: '$DIS',
      posting_account: 'Nightmare_stop',
      accuracy_end_date: null,
      topic_names: 'DIS',
      term: 'covid',
      es_index: 'tweets',
      highlighted_text: {
        'tweet_json.long_object.body':
          ' -- <span class="lineResult">$DIS now a ton of investors will be signing as well. Sit in your cave and do nothing other than come out and blame <span class="yellowColor">COVID</span>. https://t.co/gICma5U0dG</span><br/>'
      },
      totalHits: 1
    },
    {
      twitter_account_id: '23214360',
      topic_ids: '4070,404445',
      tweet_flag: null,
      pit_account_rating: null,
      accuracy: null,
      source: 'http://twitter.com/download/iphone',
      indicative: 'false',
      posting_account_id: '13872635',
      date_posted_text: '2021-11-25 04:31:05.0000',
      posting_account_rating: null,
      score: 0,
      date_posted: 1637836265,
      contents: 'AstraZeneca',
      posting_account: 'chippawa3',
      accuracy_end_date: null,
      topic_names: 'AZN,AZN.L',
      term: 'covid',
      es_index: 'tweets',
      highlighted_text: {
        'tweet_json.twitter_entities.urls.expanded_url':
          ' -- <span class="lineResult">https://www.express.co.uk/news/science/1525672/astrazeneca-uk-vaccine-rollout-pascal-soirot-eu-cases-soar-<span class="yellowColor">covid</span>-lockdown-austria-germany-1525672</span><br/>'
      },
      totalHits: 1
    },
    {
      twitter_account_id: '1247665906752172033',
      topic_ids: '416547',
      tweet_flag: null,
      pit_account_rating: null,
      accuracy: null,
      source: 'https://mobile.twitter.com',
      indicative: 'false',
      posting_account_id: '34329897',
      date_posted_text: '2021-11-25 04:29:53.0000',
      posting_account_rating: null,
      score: 0,
      date_posted: 1637836193,
      contents: '@TheFrankmanMN',
      posting_account: 'PrinciplePonde2',
      accuracy_end_date: null,
      topic_names: 'BNTX',
      term: 'covid',
      es_index: 'tweets',
      highlighted_text: {
        'tweet_json.body':
          ' -- <span class="lineResult">@TheFrankmanMN @GameChangin @RATM29052542 @XT1LG @erikwill furthermore, also in the letter: "BioNTech <span class="yellowColor">COVID</span>-19 Vacc\u2026 https://t.co/6yTp3LLWXj</span><br/>',
        'tweet_json.long_object.body':
          ' -- <span class="lineResult">@TheFrankmanMN @GameChangin @RATM29052542 @XT1LG @erikwill furthermore, also in the letter: "BioNTech <span class="yellowColor">COVID</span>-19 Vaccine that uses tromethamine (Tris) buffer instead of phosphate buffered saline (PBS) used\nin the originally authorized Pfizer-BioNTech <span class="yellowColor">COVID</span>-19 Vaccine."</span><br/>',
        'tweet_json.object.summary':
          ' -- <span class="lineResult">@TheFrankmanMN @GameChangin @RATM29052542 @XT1LG @erikwill furthermore, also in the letter: "BioNTech <span class="yellowColor">COVID</span>-19 Vacc\u2026 https://t.co/6yTp3LLWXj</span><br/>'
      },
      totalHits: 3
    },
    {
      twitter_account_id: '975683933483556874',
      topic_ids: '4070,404445',
      tweet_flag: null,
      pit_account_rating: null,
      accuracy: null,
      source: 'http://twitter.com/download/iphone',
      indicative: 'false',
      posting_account_id: '25748765',
      date_posted_text: '2021-11-25 04:27:41.0000',
      posting_account_rating: null,
      score: 0,
      date_posted: 1637836061,
      contents: 'India',
      posting_account: 'SwedenOSI_India',
      accuracy_end_date: null,
      topic_names: 'AZN,AZN.L',
      term: 'covid',
      es_index: 'tweets',
      highlighted_text: {
        'tweet_json.long_object.body':
          ' -- <span class="lineResult">India\'s vaccine drive is an example of collective effort. It was an absolute pleasure to be at world\'s largest vaccine manufacturer @SerumInstIndia who in collaboration with @AstraZeneca has provided global access to <span class="yellowColor">Covid</span>-19 vaccine. Thank you @adarpoonawalla for the site visit. https://t.co/xF7ofxsClb</span><br/>'
      },
      totalHits: 1
    }
  ],
  totalHitsOfThisPage: 29
};

export { filingsData, revenueMockData, abc };
