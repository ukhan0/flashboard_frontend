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

const mapMockData = {
  title: 'World, Miller projection, high resolution',
  version: '1.1.4',
  type: 'FeatureCollection',
  copyright: 'Copyright (c) 2021 Highsoft AS, Based on data from Natural Earth',
  copyrightShort: 'Natural Earth',
  copyrightUrl: 'http://www.naturalearthdata.com',
  crs: { type: 'name', properties: { name: 'urn:ogc:def:crs:EPSG:54003' } },
  'hc-transform': {
    default: {
      crs: '+proj=mill +lat_0=0 +lon_0=0 +x_0=0 +y_0=0 +R_A +datum=WGS84 +units=m +no_defs',
      scale: 1.71096809122e-5,
      jsonres: 15.5,
      jsonmarginX: -999,
      jsonmarginY: 9851.0,
      xoffset: -19753395.3101,
      yoffset: 12635908.1982
    }
  },
  features: [
    {
      type: 'Feature',
      id: 'FO',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.66,
        'hc-middle-y': 0.41,
        'hc-key': 'fo',
        'hc-a2': 'FO',
        name: 'Faroe Islands',
        labelrank: '6',
        'country-abbrev': 'Faeroe Is.',
        subregion: 'Northern Europe',
        'region-wb': 'Europe & Central Asia',
        'iso-a3': 'FRO',
        'iso-a2': 'FO',
        'woe-id': '23424816',
        continent: 'Europe'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [4046, 8611],
            [4037, 8582],
            [4033, 8610],
            [4014, 8609],
            [4028, 8619],
            [4046, 8611]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'UM',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.57,
        'hc-middle-y': 0.58,
        'hc-key': 'um',
        'hc-a2': 'UM',
        name: 'United States Minor Outlying Islands',
        labelrank: '5',
        'country-abbrev': 'U.S. MOI',
        subregion: 'Seven seas (open ocean)',
        'region-wb': 'East Asia & Pacific',
        'iso-a3': 'UMI',
        'iso-a2': 'UM',
        'woe-id': '28289407',
        continent: 'North America'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-539, 6673],
            [-540, 6672],
            [-540, 6672],
            [-540, 6673],
            [-539, 6673]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'US',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.7,
        'hc-middle-y': 0.68,
        'hc-key': 'us',
        'hc-a2': 'US',
        name: 'United States of America',
        labelrank: '2',
        'country-abbrev': 'U.S.A.',
        subregion: 'Northern America',
        'region-wb': 'North America',
        'iso-a3': 'USA',
        'iso-a2': 'US',
        'woe-id': '23424977',
        continent: 'North America'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [-349, 7098],
              [-326, 7078],
              [-357, 7064],
              [-362, 7086],
              [-349, 7098]
            ]
          ],
          [
            [
              [-397, 7131],
              [-381, 7129],
              [-361, 7115],
              [-370, 7112],
              [-397, 7131]
            ]
          ],
          [
            [
              [2212, 7883],
              [2209, 7887],
              [2216, 7888],
              [2217, 7883],
              [2212, 7883]
            ]
          ],
          [
            [
              [614, 8046],
              [618, 8044],
              [608, 8047],
              [609, 8051],
              [614, 8046]
            ]
          ],
          [
            [
              [617, 8055],
              [620, 8053],
              [617, 8051],
              [612, 8052],
              [617, 8055]
            ]
          ],
          [
            [
              [-931, 8182],
              [-977, 8166],
              [-999, 8171],
              [-986, 8179],
              [-961, 8175],
              [-952, 8186],
              [-931, 8182]
            ]
          ],
          [
            [
              [-765, 8212],
              [-795, 8209],
              [-737, 8224],
              [-725, 8240],
              [-710, 8237],
              [-743, 8217],
              [-765, 8212]
            ]
          ],
          [
            [
              [325, 8299],
              [329, 8298],
              [328, 8293],
              [324, 8298],
              [325, 8299]
            ]
          ],
          [
            [
              [324, 8309],
              [327, 8304],
              [325, 8302],
              [321, 8304],
              [324, 8309]
            ]
          ],
          [
            [
              [316, 8310],
              [327, 8289],
              [314, 8300],
              [312, 8311],
              [316, 8310]
            ]
          ],
          [
            [
              [366, 8307],
              [365, 8303],
              [358, 8303],
              [361, 8313],
              [366, 8307]
            ]
          ],
          [
            [
              [309, 8315],
              [310, 8311],
              [305, 8311],
              [305, 8315],
              [309, 8315]
            ]
          ],
          [
            [
              [352, 8319],
              [358, 8315],
              [355, 8308],
              [351, 8318],
              [352, 8319]
            ]
          ],
          [
            [
              [299, 8321],
              [305, 8323],
              [305, 8318],
              [298, 8314],
              [299, 8321]
            ]
          ],
          [
            [
              [310, 8321],
              [308, 8320],
              [305, 8324],
              [310, 8324],
              [310, 8321]
            ]
          ],
          [
            [
              [370, 8341],
              [378, 8329],
              [371, 8310],
              [352, 8321],
              [370, 8341]
            ]
          ],
          [
            [
              [293, 8339],
              [297, 8346],
              [309, 8350],
              [306, 8345],
              [293, 8339]
            ]
          ],
          [
            [
              [333, 8352],
              [344, 8348],
              [338, 8340],
              [328, 8346],
              [333, 8352]
            ]
          ],
          [
            [
              [328, 8362],
              [328, 8355],
              [316, 8358],
              [320, 8362],
              [328, 8362]
            ]
          ],
          [
            [
              [343, 8358],
              [345, 8349],
              [337, 8355],
              [336, 8364],
              [343, 8358]
            ]
          ],
          [
            [
              [321, 8377],
              [331, 8368],
              [324, 8364],
              [319, 8365],
              [321, 8377]
            ]
          ],
          [
            [
              [295, 8389],
              [318, 8382],
              [313, 8363],
              [298, 8363],
              [295, 8389]
            ]
          ],
          [
            [
              [242, 8396],
              [240, 8386],
              [234, 8385],
              [238, 8393],
              [242, 8396]
            ]
          ],
          [
            [
              [-262, 8451],
              [-246, 8445],
              [-246, 8434],
              [-272, 8427],
              [-285, 8431],
              [-266, 8440],
              [-262, 8451]
            ]
          ],
          [
            [
              [-659, 8532],
              [-642, 8514],
              [-674, 8509],
              [-698, 8523],
              [-659, 8532]
            ]
          ],
          [
            [
              [1653, 8007],
              [1632, 7990],
              [1627, 7999],
              [1643, 8009],
              [1653, 8007]
            ]
          ],
          [
            [
              [1630, 8034],
              [1626, 8029],
              [1611, 8022],
              [1609, 8025],
              [1630, 8034]
            ]
          ],
          [
            [
              [1675, 7930],
              [1673, 7921],
              [1666, 7911],
              [1662, 7916],
              [1675, 7930]
            ]
          ],
          [
            [
              [1718, 7946],
              [1719, 7940],
              [1715, 7939],
              [1717, 7945],
              [1718, 7946]
            ]
          ],
          [
            [
              [1775, 7956],
              [1777, 7951],
              [1768, 7952],
              [1772, 7955],
              [1775, 7956]
            ]
          ],
          [
            [
              [285, 8340],
              [276, 8379],
              [288, 8381],
              [297, 8369],
              [285, 8340]
            ]
          ],
          [
            [
              [2112, 7778],
              [2090, 7765],
              [2058, 7759],
              [2073, 7772],
              [2112, 7778]
            ]
          ],
          [
            [
              [-659, 8266],
              [-658, 8255],
              [-673, 8243],
              [-699, 8234],
              [-683, 8250],
              [-690, 8256],
              [-659, 8266]
            ]
          ],
          [
            [
              [254, 8387],
              [239, 8401],
              [247, 8409],
              [263, 8396],
              [270, 8374],
              [269, 8351],
              [257, 8366],
              [254, 8387]
            ]
          ],
          [
            [
              [-288, 8425],
              [-247, 8412],
              [-282, 8386],
              [-292, 8386],
              [-310, 8369],
              [-309, 8381],
              [-326, 8400],
              [-288, 8425]
            ]
          ],
          [
            [
              [260, 8440],
              [282, 8433],
              [280, 8421],
              [289, 8398],
              [270, 8386],
              [274, 8402],
              [260, 8440]
            ]
          ],
          [
            [
              [-759, 8668],
              [-736, 8665],
              [-766, 8649],
              [-768, 8656],
              [-794, 8669],
              [-815, 8665],
              [-828, 8675],
              [-783, 8683],
              [-759, 8668]
            ]
          ],
          [
            [
              [611, 8065],
              [610, 8065],
              [610, 8065],
              [611, 8065]
            ]
          ],
          [
            [
              [1315, 7297],
              [1314, 7309],
              [1307, 7313],
              [1305, 7329],
              [1283, 7351],
              [1260, 7389],
              [1257, 7391],
              [1255, 7393],
              [1222, 7403],
              [1211, 7398],
              [1198, 7374],
              [1158, 7395],
              [1147, 7424],
              [1099, 7464],
              [1048, 7464],
              [1048, 7449],
              [964, 7449],
              [854, 7487],
              [857, 7494],
              [786, 7488],
              [780, 7507],
              [756, 7528],
              [749, 7517],
              [744, 7538],
              [706, 7539],
              [705, 7550],
              [682, 7556],
              [682, 7574],
              [663, 7592],
              [643, 7623],
              [648, 7630],
              [630, 7643],
              [626, 7665],
              [591, 7702],
              [587, 7734],
              [571, 7755],
              [581, 7790],
              [566, 7839],
              [579, 7877],
              [586, 7937],
              [579, 7987],
              [566, 8042],
              [581, 8035],
              [621, 8032],
              [628, 8020],
              [628, 8029],
              [620, 8037],
              [625, 8043],
              [621, 8037],
              [628, 8030],
              [628, 8051],
              [620, 8065],
              [1433, 8065],
              [1443, 8077],
              [1447, 8058],
              [1507, 8048],
              [1543, 8029],
              [1598, 8028],
              [1556, 8009],
              [1524, 7983],
              [1528, 7979],
              [1562, 7986],
              [1573, 7975],
              [1603, 7985],
              [1626, 7999],
              [1632, 7990],
              [1655, 7984],
              [1664, 7973],
              [1686, 7971],
              [1699, 7979],
              [1734, 7983],
              [1748, 7970],
              [1759, 7973],
              [1759, 7966],
              [1761, 7963],
              [1764, 7957],
              [1766, 7954],
              [1741, 7948],
              [1714, 7953],
              [1674, 7950],
              [1644, 7901],
              [1664, 7910],
              [1647, 7855],
              [1650, 7819],
              [1665, 7796],
              [1684, 7805],
              [1697, 7844],
              [1688, 7867],
              [1696, 7906],
              [1714, 7924],
              [1733, 7931],
              [1745, 7947],
              [1777, 7930],
              [1782, 7893],
              [1767, 7880],
              [1772, 7867],
              [1785, 7880],
              [1801, 7878],
              [1809, 7846],
              [1806, 7832],
              [1802, 7829],
              [1797, 7833],
              [1790, 7820],
              [1778, 7800],
              [1807, 7788],
              [1831, 7793],
              [1906, 7830],
              [1912, 7843],
              [1908, 7849],
              [1908, 7855],
              [1936, 7859],
              [1977, 7857],
              [1993, 7866],
              [1988, 7886],
              [1993, 7889],
              [1993, 7889],
              [2005, 7899],
              [2020, 7912],
              [2036, 7917],
              [2036, 7917],
              [2131, 7918],
              [2167, 7950],
              [2175, 7980],
              [2198, 8008],
              [2208, 7998],
              [2224, 8004],
              [2240, 7994],
              [2240, 7945],
              [2245, 7939],
              [2251, 7939],
              [2250, 7927],
              [2259, 7924],
              [2265, 7910],
              [2228, 7894],
              [2229, 7894],
              [2223, 7887],
              [2222, 7891],
              [2219, 7890],
              [2205, 7896],
              [2203, 7884],
              [2159, 7856],
              [2152, 7842],
              [2157, 7800],
              [2128, 7787],
              [2090, 7783],
              [2069, 7775],
              [2051, 7755],
              [2055, 7731],
              [2025, 7698],
              [2025, 7681],
              [2002, 7649],
              [2009, 7669],
              [1989, 7687],
              [1998, 7690],
              [1987, 7713],
              [1983, 7683],
              [1991, 7667],
              [1984, 7634],
              [1998, 7635],
              [2006, 7591],
              [1983, 7557],
              [1965, 7559],
              [1949, 7549],
              [1940, 7532],
              [1923, 7532],
              [1905, 7510],
              [1871, 7487],
              [1846, 7462],
              [1837, 7430],
              [1844, 7399],
              [1865, 7357],
              [1879, 7305],
              [1870, 7253],
              [1848, 7252],
              [1843, 7270],
              [1817, 7294],
              [1797, 7339],
              [1803, 7371],
              [1762, 7410],
              [1734, 7394],
              [1702, 7416],
              [1655, 7414],
              [1620, 7420],
              [1598, 7411],
              [1578, 7418],
              [1581, 7407],
              [1596, 7411],
              [1594, 7397],
              [1610, 7374],
              [1586, 7389],
              [1567, 7377],
              [1537, 7398],
              [1517, 7391],
              [1491, 7399],
              [1465, 7396],
              [1393, 7353],
              [1378, 7338],
              [1363, 7306],
              [1375, 7278],
              [1343, 7282],
              [1315, 7297]
            ]
          ],
          [
            [
              [307, 8333],
              [303, 8331],
              [299, 8337],
              [308, 8337],
              [308, 8336],
              [313, 8357],
              [348, 8311],
              [347, 8290],
              [321, 8317],
              [306, 8328],
              [307, 8333]
            ]
          ],
          [
            [
              [368, 8302],
              [367, 8297],
              [362, 8300],
              [368, 8302],
              [368, 8302],
              [368, 8302]
            ]
          ],
          [
            [
              [217, 8424],
              [216, 8421],
              [213, 8425],
              [215, 8432],
              [217, 8430],
              [217, 8431],
              [235, 8440],
              [261, 8429],
              [243, 8421],
              [261, 8417],
              [257, 8405],
              [236, 8418],
              [238, 8401],
              [217, 8421],
              [217, 8424]
            ]
          ],
          [
            [
              [278, 8438],
              [280, 8436],
              [270, 8438],
              [271, 8442],
              [266, 8444],
              [246, 8484],
              [257, 8443],
              [232, 8444],
              [227, 8463],
              [212, 8464],
              [226, 8442],
              [209, 8438],
              [180, 8455],
              [162, 8475],
              [115, 8495],
              [122, 8510],
              [93, 8502],
              [29, 8520],
              [-14, 8516],
              [-14, 8522],
              [-69, 8536],
              [-69, 8552],
              [-121, 8552],
              [-129, 8544],
              [-116, 8515],
              [-121, 8505],
              [-137, 8514],
              [-166, 8515],
              [-176, 8500],
              [-240, 8477],
              [-242, 8485],
              [-218, 8497],
              [-239, 8504],
              [-226, 8524],
              [-225, 8546],
              [-197, 8561],
              [-172, 8559],
              [-200, 8574],
              [-227, 8560],
              [-252, 8537],
              [-264, 8511],
              [-304, 8488],
              [-307, 8473],
              [-282, 8468],
              [-299, 8454],
              [-312, 8431],
              [-332, 8429],
              [-343, 8416],
              [-367, 8406],
              [-377, 8385],
              [-384, 8388],
              [-400, 8365],
              [-413, 8372],
              [-445, 8338],
              [-474, 8337],
              [-495, 8322],
              [-465, 8304],
              [-489, 8313],
              [-503, 8307],
              [-506, 8324],
              [-523, 8318],
              [-530, 8305],
              [-557, 8304],
              [-575, 8296],
              [-562, 8282],
              [-578, 8293],
              [-620, 8278],
              [-613, 8298],
              [-584, 8305],
              [-577, 8297],
              [-577, 8307],
              [-544, 8331],
              [-520, 8342],
              [-486, 8337],
              [-490, 8355],
              [-448, 8379],
              [-413, 8409],
              [-405, 8448],
              [-393, 8466],
              [-424, 8454],
              [-436, 8464],
              [-451, 8446],
              [-466, 8467],
              [-476, 8461],
              [-489, 8474],
              [-531, 8452],
              [-539, 8483],
              [-529, 8493],
              [-547, 8520],
              [-585, 8506],
              [-639, 8539],
              [-616, 8551],
              [-590, 8540],
              [-579, 8548],
              [-613, 8553],
              [-660, 8582],
              [-644, 8598],
              [-648, 8606],
              [-620, 8633],
              [-623, 8643],
              [-601, 8663],
              [-577, 8652],
              [-549, 8670],
              [-514, 8674],
              [-502, 8685],
              [-507, 8709],
              [-522, 8717],
              [-502, 8728],
              [-514, 8742],
              [-571, 8717],
              [-583, 8724],
              [-627, 8718],
              [-661, 8725],
              [-667, 8740],
              [-684, 8752],
              [-660, 8758],
              [-697, 8764],
              [-717, 8779],
              [-636, 8815],
              [-589, 8823],
              [-596, 8804],
              [-587, 8797],
              [-533, 8793],
              [-525, 8806],
              [-508, 8805],
              [-534, 8817],
              [-556, 8837],
              [-547, 8840],
              [-526, 8815],
              [-502, 8811],
              [-485, 8819],
              [-505, 8826],
              [-523, 8819],
              [-534, 8828],
              [-528, 8844],
              [-550, 8842],
              [-588, 8848],
              [-601, 8873],
              [-639, 8896],
              [-675, 8910],
              [-663, 8921],
              [-663, 8937],
              [-607, 8940],
              [-571, 8964],
              [-572, 8978],
              [-554, 9001],
              [-535, 9014],
              [-504, 9015],
              [-469, 9039],
              [-421, 9041],
              [-385, 9066],
              [-350, 9060],
              [-364, 9048],
              [-357, 9041],
              [-334, 9057],
              [-306, 9038],
              [-281, 9046],
              [-252, 9042],
              [-261, 9026],
              [-242, 9020],
              [-161, 9026],
              [-136, 9013],
              [-99, 9005],
              [-62, 9006],
              [-45, 8996],
              [-24, 8995],
              [14, 9002],
              [44, 8989],
              [81, 8978],
              [82, 8528],
              [111, 8523],
              [138, 8530],
              [135, 8518],
              [182, 8481],
              [187, 8467],
              [211, 8478],
              [219, 8497],
              [244, 8506],
              [260, 8483],
              [306, 8445],
              [340, 8394],
              [352, 8368],
              [403, 8348],
              [405, 8340],
              [406, 8314],
              [406, 8314],
              [395, 8299],
              [379, 8294],
              [380, 8331],
              [371, 8342],
              [355, 8339],
              [348, 8323],
              [348, 8359],
              [315, 8389],
              [281, 8437],
              [278, 8438]
            ]
          ],
          [
            [
              [368, 8302],
              [369, 8305],
              [369, 8302],
              [368, 8302],
              [368, 8302],
              [368, 8302]
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'JP',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.51,
        'hc-middle-y': 0.65,
        'hc-key': 'jp',
        'hc-a2': 'JP',
        name: 'Japan',
        labelrank: '2',
        'country-abbrev': 'Japan',
        subregion: 'Eastern Asia',
        'region-wb': 'East Asia & Pacific',
        'iso-a3': 'JPN',
        'iso-a2': 'JP',
        'woe-id': '23424856',
        continent: 'Asia'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [8399, 7927],
              [8399, 7929],
              [8407, 7923],
              [8403, 7922],
              [8399, 7927]
            ]
          ],
          [
            [
              [8160, 7541],
              [8140, 7530],
              [8125, 7538],
              [8108, 7534],
              [8101, 7550],
              [8115, 7551],
              [8151, 7584],
              [8164, 7590],
              [8171, 7608],
              [8174, 7585],
              [8207, 7592],
              [8242, 7586],
              [8249, 7602],
              [8273, 7632],
              [8272, 7649],
              [8288, 7655],
              [8279, 7632],
              [8316, 7643],
              [8334, 7665],
              [8324, 7668],
              [8351, 7676],
              [8368, 7716],
              [8361, 7735],
              [8376, 7768],
              [8378, 7784],
              [8389, 7769],
              [8401, 7770],
              [8404, 7784],
              [8391, 7779],
              [8395, 7794],
              [8409, 7780],
              [8412, 7759],
              [8426, 7739],
              [8428, 7720],
              [8400, 7683],
              [8399, 7650],
              [8385, 7613],
              [8393, 7595],
              [8366, 7567],
              [8362, 7588],
              [8315, 7560],
              [8280, 7556],
              [8271, 7571],
              [8266, 7557],
              [8277, 7546],
              [8257, 7539],
              [8249, 7523],
              [8234, 7522],
              [8222, 7533],
              [8233, 7558],
              [8213, 7562],
              [8183, 7554],
              [8160, 7541],
              [8177, 7535],
              [8196, 7554],
              [8210, 7546],
              [8197, 7512],
              [8183, 7521],
              [8170, 7515],
              [8162, 7499],
              [8149, 7495],
              [8141, 7519],
              [8160, 7541]
            ]
          ],
          [
            [
              [8093, 7492],
              [8073, 7477],
              [8078, 7497],
              [8056, 7510],
              [8049, 7540],
              [8068, 7514],
              [8088, 7532],
              [8124, 7523],
              [8133, 7502],
              [8123, 7488],
              [8112, 7450],
              [8093, 7439],
              [8097, 7450],
              [8080, 7447],
              [8080, 7469],
              [8093, 7492]
            ]
          ],
          [
            [
              [8383, 7830],
              [8377, 7819],
              [8403, 7802],
              [8389, 7803],
              [8374, 7788],
              [8372, 7809],
              [8362, 7818],
              [8364, 7833],
              [8383, 7845],
              [8382, 7858],
              [8403, 7850],
              [8411, 7858],
              [8421, 7904],
              [8415, 7923],
              [8425, 7936],
              [8456, 7902],
              [8481, 7887],
              [8508, 7878],
              [8526, 7890],
              [8518, 7873],
              [8531, 7851],
              [8508, 7842],
              [8491, 7844],
              [8473, 7831],
              [8464, 7807],
              [8422, 7831],
              [8397, 7822],
              [8383, 7830]
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'SC',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.58,
        'hc-middle-y': 0.41,
        'hc-key': 'sc',
        'hc-a2': 'SC',
        name: 'Seychelles',
        labelrank: '6',
        'country-abbrev': 'Syc.',
        subregion: 'Eastern Africa',
        'region-wb': 'Sub-Saharan Africa',
        'iso-a3': 'SYC',
        'iso-a2': 'SC',
        'woe-id': '23424941',
        continent: 'Seven seas (open ocean)'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [5874, 6366],
            [5877, 6363],
            [5876, 6359],
            [5868, 6370],
            [5874, 6366]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'IN',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.33,
        'hc-middle-y': 0.44,
        'hc-key': 'in',
        'hc-a2': 'IN',
        name: 'India',
        labelrank: '2',
        'country-abbrev': 'India',
        subregion: 'Southern Asia',
        'region-wb': 'South Asia',
        'iso-a3': 'IND',
        'iso-a2': 'IN',
        'woe-id': '23424848',
        continent: 'Asia'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [6970, 6817],
              [6969, 6848],
              [6983, 6903],
              [6982, 6869],
              [6970, 6817]
            ]
          ],
          [
            [
              [6837, 7150],
              [6839, 7151],
              [6839, 7144],
              [6836, 7145],
              [6837, 7150]
            ]
          ],
          [
            [
              [6838, 7338],
              [6859, 7342],
              [6861, 7321],
              [6867, 7305],
              [6888, 7301],
              [6944, 7305],
              [6955, 7309],
              [6942, 7335],
              [6971, 7340],
              [6995, 7364],
              [7030, 7384],
              [7049, 7376],
              [7075, 7386],
              [7099, 7353],
              [7110, 7349],
              [7110, 7339],
              [7091, 7322],
              [7075, 7319],
              [7042, 7294],
              [7041, 7271],
              [7029, 7260],
              [7032, 7249],
              [7015, 7212],
              [6991, 7217],
              [6993, 7190],
              [6987, 7167],
              [6970, 7154],
              [6957, 7209],
              [6940, 7184],
              [6927, 7205],
              [6934, 7220],
              [6956, 7229],
              [6967, 7246],
              [6954, 7254],
              [6904, 7253],
              [6888, 7260],
              [6889, 7279],
              [6848, 7294],
              [6837, 7276],
              [6862, 7253],
              [6848, 7254],
              [6835, 7237],
              [6856, 7226],
              [6851, 7206],
              [6866, 7159],
              [6842, 7141],
              [6839, 7158],
              [6811, 7141],
              [6801, 7127],
              [6805, 7114],
              [6787, 7093],
              [6759, 7091],
              [6719, 7041],
              [6667, 7004],
              [6667, 6990],
              [6636, 6982],
              [6623, 6964],
              [6607, 6964],
              [6600, 6943],
              [6609, 6893],
              [6595, 6854],
              [6594, 6803],
              [6581, 6803],
              [6567, 6778],
              [6571, 6773],
              [6547, 6763],
              [6541, 6746],
              [6525, 6737],
              [6497, 6762],
              [6476, 6826],
              [6446, 6878],
              [6432, 6930],
              [6405, 6975],
              [6390, 7044],
              [6382, 7089],
              [6389, 7110],
              [6373, 7166],
              [6366, 7131],
              [6333, 7115],
              [6314, 7122],
              [6280, 7154],
              [6281, 7163],
              [6309, 7172],
              [6315, 7184],
              [6295, 7178],
              [6264, 7191],
              [6250, 7212],
              [6270, 7224],
              [6303, 7222],
              [6335, 7238],
              [6306, 7279],
              [6308, 7296],
              [6288, 7305],
              [6291, 7317],
              [6317, 7344],
              [6325, 7334],
              [6359, 7341],
              [6373, 7367],
              [6390, 7376],
              [6403, 7404],
              [6438, 7442],
              [6436, 7462],
              [6460, 7476],
              [6443, 7486],
              [6422, 7510],
              [6415, 7549],
              [6432, 7562],
              [6474, 7553],
              [6500, 7561],
              [6512, 7573],
              [6534, 7586],
              [6548, 7558],
              [6567, 7549],
              [6563, 7522],
              [6580, 7509],
              [6584, 7495],
              [6567, 7483],
              [6551, 7488],
              [6562, 7470],
              [6562, 7449],
              [6575, 7449],
              [6586, 7437],
              [6628, 7413],
              [6610, 7399],
              [6600, 7369],
              [6615, 7364],
              [6654, 7338],
              [6680, 7326],
              [6734, 7321],
              [6736, 7312],
              [6771, 7297],
              [6815, 7290],
              [6840, 7302],
              [6834, 7314],
              [6838, 7338]
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'FR',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.29,
        'hc-middle-y': 0.05,
        'hc-key': 'fr',
        'hc-a2': 'FR',
        name: 'France',
        labelrank: '2',
        'country-abbrev': 'Fr.',
        subregion: 'Western Europe',
        'region-wb': 'Europe & Central Asia',
        'iso-a3': 'FRA',
        'iso-a2': 'FR',
        'woe-id': '-90',
        continent: 'Europe'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [2583, 7984],
              [2578, 7982],
              [2577, 7995],
              [2579, 7987],
              [2583, 7984]
            ]
          ],
          [
            [
              [4518, 7832],
              [4521, 7814],
              [4511, 7787],
              [4499, 7794],
              [4492, 7818],
              [4496, 7830],
              [4518, 7832]
            ]
          ],
          [
            [
              [9075, 5904],
              [9081, 5904],
              [9124, 5867],
              [9165, 5838],
              [9160, 5832],
              [9114, 5858],
              [9087, 5883],
              [9075, 5904]
            ]
          ],
          [
            [
              [6278, 4935],
              [6290, 4940],
              [6296, 4925],
              [6319, 4931],
              [6307, 4907],
              [6277, 4914],
              [6268, 4907],
              [6268, 4940],
              [6278, 4935]
            ]
          ],
          [
            [
              [2379, 7035],
              [2381, 7037],
              [2381, 7034],
              [2379, 7035]
            ]
          ],
          [
            [
              [4461, 7873],
              [4460, 7872],
              [4459, 7872],
              [4458, 7872],
              [4457, 7871],
              [4420, 7848],
              [4356, 7864],
              [4329, 7843],
              [4333, 7825],
              [4314, 7821],
              [4298, 7825],
              [4297, 7825],
              [4297, 7825],
              [4290, 7827],
              [4290, 7831],
              [4282, 7831],
              [4259, 7839],
              [4238, 7834],
              [4200, 7848],
              [4187, 7859],
              [4196, 7866],
              [4209, 7955],
              [4187, 7972],
              [4181, 7992],
              [4157, 8009],
              [4101, 8030],
              [4113, 8035],
              [4100, 8049],
              [4148, 8061],
              [4161, 8047],
              [4199, 8053],
              [4183, 8093],
              [4202, 8092],
              [4205, 8082],
              [4233, 8076],
              [4245, 8093],
              [4276, 8103],
              [4285, 8112],
              [4286, 8138],
              [4314, 8146],
              [4348, 8116],
              [4363, 8113],
              [4361, 8103],
              [4381, 8102],
              [4400, 8085],
              [4410, 8086],
              [4415, 8083],
              [4427, 8083],
              [4441, 8074],
              [4481, 8064],
              [4463, 8033],
              [4463, 8012],
              [4447, 8003],
              [4420, 7975],
              [4423, 7964],
              [4425, 7967],
              [4428, 7968],
              [4440, 7969],
              [4439, 7959],
              [4447, 7951],
              [4451, 7932],
              [4434, 7921],
              [4446, 7911],
              [4446, 7889],
              [4465, 7887],
              [4461, 7873]
            ]
          ],
          [
            [
              [2642, 6657],
              [2649, 6668],
              [2678, 6660],
              [2706, 6636],
              [2716, 6618],
              [2677, 6564],
              [2667, 6569],
              [2643, 6562],
              [2629, 6568],
              [2647, 6601],
              [2637, 6618],
              [2633, 6644],
              [2642, 6657]
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'FM',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.5,
        'hc-middle-y': 0.52,
        'hc-key': 'fm',
        'hc-a2': 'FM',
        name: 'Federated States of Micronesia',
        labelrank: '6',
        'country-abbrev': 'F.S.M.',
        subregion: 'Micronesia',
        'region-wb': 'East Asia & Pacific',
        'iso-a3': 'FSM',
        'iso-a2': 'FM',
        'woe-id': '23424815',
        continent: 'Oceania'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [8905, 6704],
            [8908, 6703],
            [8908, 6699],
            [8905, 6699],
            [8905, 6704]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'CN',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.41,
        'hc-middle-y': 0.55,
        'hc-key': 'cn',
        'hc-a2': 'CN',
        name: 'China',
        labelrank: '2',
        'country-abbrev': 'China',
        subregion: 'Eastern Asia',
        'region-wb': 'East Asia & Pacific',
        'iso-a3': 'CHN',
        'iso-a2': 'CN',
        'woe-id': '23424781',
        continent: 'Asia'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [7445, 7068],
              [7471, 7094],
              [7503, 7099],
              [7513, 7084],
              [7496, 7053],
              [7475, 7039],
              [7445, 7049],
              [7445, 7068]
            ]
          ],
          [
            [
              [6861, 7321],
              [6859, 7342],
              [6838, 7338],
              [6810, 7337],
              [6792, 7346],
              [6775, 7339],
              [6767, 7353],
              [6749, 7352],
              [6719, 7382],
              [6703, 7380],
              [6692, 7394],
              [6662, 7408],
              [6660, 7417],
              [6628, 7413],
              [6586, 7437],
              [6575, 7449],
              [6562, 7449],
              [6562, 7470],
              [6551, 7488],
              [6567, 7483],
              [6584, 7495],
              [6580, 7509],
              [6563, 7522],
              [6567, 7549],
              [6548, 7558],
              [6534, 7586],
              [6522, 7585],
              [6504, 7591],
              [6486, 7597],
              [6480, 7619],
              [6455, 7637],
              [6438, 7638],
              [6433, 7641],
              [6448, 7645],
              [6444, 7689],
              [6416, 7691],
              [6411, 7720],
              [6421, 7741],
              [6446, 7757],
              [6468, 7762],
              [6471, 7750],
              [6499, 7761],
              [6503, 7772],
              [6542, 7776],
              [6550, 7788],
              [6604, 7810],
              [6605, 7816],
              [6603, 7832],
              [6622, 7850],
              [6602, 7918],
              [6648, 7930],
              [6672, 7921],
              [6666, 7936],
              [6688, 7998],
              [6738, 7984],
              [6761, 7992],
              [6761, 8025],
              [6769, 8043],
              [6792, 8048],
              [6801, 8070],
              [6815, 8069],
              [6820, 8070],
              [6829, 8072],
              [6833, 8051],
              [6865, 8028],
              [6881, 8029],
              [6904, 8015],
              [6924, 7974],
              [6923, 7954],
              [6913, 7935],
              [6919, 7924],
              [6998, 7915],
              [7042, 7890],
              [7052, 7891],
              [7067, 7854],
              [7081, 7835],
              [7106, 7837],
              [7173, 7829],
              [7189, 7833],
              [7237, 7828],
              [7248, 7816],
              [7298, 7801],
              [7321, 7805],
              [7342, 7800],
              [7388, 7820],
              [7430, 7826],
              [7468, 7825],
              [7495, 7837],
              [7512, 7856],
              [7540, 7870],
              [7525, 7897],
              [7543, 7920],
              [7590, 7908],
              [7617, 7931],
              [7651, 7934],
              [7665, 7943],
              [7678, 7965],
              [7699, 7966],
              [7727, 7980],
              [7769, 7975],
              [7775, 7987],
              [7735, 8027],
              [7712, 8027],
              [7710, 8026],
              [7705, 8020],
              [7685, 8023],
              [7656, 8017],
              [7646, 8033],
              [7680, 8097],
              [7712, 8085],
              [7738, 8102],
              [7755, 8105],
              [7753, 8118],
              [7781, 8168],
              [7801, 8186],
              [7800, 8203],
              [7779, 8212],
              [7803, 8232],
              [7875, 8244],
              [7917, 8227],
              [7947, 8221],
              [7971, 8188],
              [7968, 8182],
              [8002, 8112],
              [8001, 8096],
              [8016, 8087],
              [8055, 8082],
              [8081, 8061],
              [8097, 8039],
              [8104, 8016],
              [8146, 8017],
              [8164, 8032],
              [8203, 8042],
              [8212, 8038],
              [8214, 8017],
              [8196, 8000],
              [8188, 7963],
              [8176, 7940],
              [8157, 7919],
              [8149, 7928],
              [8132, 7925],
              [8101, 7911],
              [8110, 7883],
              [8111, 7861],
              [8102, 7840],
              [8089, 7828],
              [8069, 7844],
              [8064, 7825],
              [8041, 7810],
              [8015, 7809],
              [8018, 7788],
              [7973, 7798],
              [7955, 7771],
              [7923, 7756],
              [7907, 7743],
              [7900, 7734],
              [7878, 7732],
              [7851, 7719],
              [7833, 7703],
              [7812, 7696],
              [7831, 7718],
              [7816, 7718],
              [7824, 7735],
              [7846, 7757],
              [7833, 7768],
              [7813, 7772],
              [7791, 7746],
              [7765, 7736],
              [7749, 7712],
              [7712, 7709],
              [7706, 7692],
              [7722, 7676],
              [7744, 7676],
              [7748, 7646],
              [7762, 7641],
              [7800, 7665],
              [7825, 7651],
              [7858, 7651],
              [7847, 7631],
              [7838, 7636],
              [7800, 7619],
              [7799, 7608],
              [7768, 7589],
              [7755, 7571],
              [7768, 7555],
              [7786, 7547],
              [7805, 7504],
              [7804, 7493],
              [7832, 7469],
              [7833, 7453],
              [7807, 7465],
              [7837, 7436],
              [7807, 7424],
              [7838, 7406],
              [7845, 7421],
              [7849, 7401],
              [7837, 7401],
              [7835, 7376],
              [7825, 7384],
              [7827, 7353],
              [7807, 7342],
              [7794, 7317],
              [7774, 7300],
              [7762, 7279],
              [7771, 7261],
              [7745, 7251],
              [7701, 7207],
              [7688, 7205],
              [7675, 7184],
              [7655, 7178],
              [7624, 7180],
              [7608, 7161],
              [7590, 7187],
              [7588, 7159],
              [7562, 7144],
              [7555, 7150],
              [7504, 7135],
              [7491, 7124],
              [7495, 7103],
              [7481, 7101],
              [7473, 7122],
              [7476, 7139],
              [7438, 7151],
              [7424, 7139],
              [7405, 7143],
              [7381, 7166],
              [7387, 7178],
              [7361, 7183],
              [7345, 7197],
              [7305, 7171],
              [7286, 7179],
              [7277, 7168],
              [7261, 7179],
              [7251, 7167],
              [7233, 7163],
              [7239, 7128],
              [7223, 7141],
              [7221, 7148],
              [7194, 7137],
              [7187, 7156],
              [7163, 7160],
              [7174, 7188],
              [7155, 7191],
              [7147, 7219],
              [7118, 7212],
              [7121, 7250],
              [7150, 7276],
              [7150, 7329],
              [7138, 7328],
              [7133, 7346],
              [7116, 7359],
              [7110, 7349],
              [7099, 7353],
              [7075, 7386],
              [7049, 7376],
              [7030, 7384],
              [6995, 7364],
              [6971, 7340],
              [6942, 7335],
              [6900, 7354],
              [6881, 7347],
              [6861, 7321]
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'SW',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.86,
        'hc-middle-y': 0.57,
        'hc-key': 'sw',
        'hc-a2': 'SW',
        name: 'Serranilla Bank',
        labelrank: '5',
        'country-abbrev': 'S.B.',
        subregion: 'Caribbean',
        'region-wb': 'Latin America & Caribbean',
        'iso-a3': '-99',
        'iso-a2': 'SW',
        'woe-id': '-99',
        continent: 'North America'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [1921, 6969],
            [1921, 6969],
            [1921, 6969],
            [1921, 6969]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'SH',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.54,
        'hc-middle-y': 0.51,
        'hc-key': 'sh',
        'hc-a2': 'SH',
        name: 'Scarborough Reef',
        labelrank: '6',
        'country-abbrev': 'S.R.',
        subregion: 'South-Eastern Asia',
        'region-wb': 'East Asia & Pacific',
        'iso-a3': '-99',
        'iso-a2': 'SH',
        'woe-id': '-99',
        continent: 'Asia'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [7712, 6947],
            [7712, 6947],
            [7712, 6947],
            [7712, 6947],
            [7712, 6947]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'BR',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.54,
        'hc-middle-y': 0.34,
        'hc-key': 'br',
        'hc-a2': 'BR',
        name: 'Brazil',
        labelrank: '2',
        'country-abbrev': 'Brazil',
        subregion: 'South America',
        'region-wb': 'Latin America & Caribbean',
        'iso-a3': 'BRA',
        'iso-a2': 'BR',
        'woe-id': '23424768',
        continent: 'South America'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [2774, 6496],
              [2812, 6492],
              [2799, 6457],
              [2771, 6447],
              [2747, 6448],
              [2741, 6483],
              [2755, 6497],
              [2774, 6496]
            ]
          ],
          [
            [
              [2661, 5478],
              [2673, 5503],
              [2689, 5510],
              [2687, 5523],
              [2672, 5507],
              [2629, 5546],
              [2611, 5553],
              [2600, 5566],
              [2588, 5559],
              [2582, 5575],
              [2564, 5590],
              [2541, 5588],
              [2576, 5623],
              [2595, 5650],
              [2621, 5669],
              [2652, 5684],
              [2657, 5712],
              [2650, 5732],
              [2629, 5734],
              [2630, 5735],
              [2629, 5738],
              [2640, 5762],
              [2639, 5781],
              [2628, 5789],
              [2605, 5784],
              [2599, 5825],
              [2576, 5843],
              [2569, 5838],
              [2530, 5843],
              [2535, 5877],
              [2525, 5901],
              [2542, 5961],
              [2535, 5981],
              [2518, 5989],
              [2516, 6017],
              [2466, 6019],
              [2456, 6093],
              [2439, 6103],
              [2416, 6101],
              [2406, 6113],
              [2380, 6127],
              [2341, 6133],
              [2323, 6147],
              [2311, 6172],
              [2314, 6200],
              [2309, 6215],
              [2274, 6209],
              [2226, 6177],
              [2188, 6178],
              [2156, 6176],
              [2160, 6223],
              [2140, 6208],
              [2111, 6206],
              [2107, 6220],
              [2081, 6224],
              [2088, 6233],
              [2057, 6279],
              [2065, 6298],
              [2083, 6312],
              [2080, 6322],
              [2089, 6349],
              [2119, 6368],
              [2152, 6378],
              [2176, 6376],
              [2192, 6458],
              [2187, 6485],
              [2173, 6495],
              [2174, 6517],
              [2201, 6519],
              [2194, 6531],
              [2180, 6531],
              [2180, 6550],
              [2230, 6550],
              [2254, 6561],
              [2261, 6534],
              [2268, 6536],
              [2289, 6521],
              [2306, 6519],
              [2319, 6533],
              [2348, 6546],
              [2371, 6571],
              [2351, 6572],
              [2346, 6605],
              [2333, 6616],
              [2369, 6616],
              [2388, 6606],
              [2389, 6618],
              [2424, 6625],
              [2453, 6645],
              [2448, 6652],
              [2471, 6649],
              [2467, 6632],
              [2484, 6615],
              [2475, 6606],
              [2470, 6579],
              [2477, 6555],
              [2505, 6535],
              [2520, 6547],
              [2556, 6559],
              [2574, 6557],
              [2588, 6554],
              [2589, 6574],
              [2618, 6574],
              [2629, 6568],
              [2643, 6562],
              [2667, 6569],
              [2677, 6564],
              [2716, 6618],
              [2720, 6630],
              [2733, 6614],
              [2735, 6589],
              [2745, 6564],
              [2768, 6549],
              [2764, 6515],
              [2770, 6500],
              [2748, 6500],
              [2725, 6486],
              [2746, 6447],
              [2788, 6443],
              [2817, 6475],
              [2833, 6484],
              [2878, 6473],
              [2889, 6461],
              [2913, 6460],
              [2927, 6444],
              [2923, 6421],
              [2938, 6417],
              [2951, 6434],
              [2988, 6419],
              [3012, 6415],
              [3060, 6416],
              [3105, 6392],
              [3143, 6356],
              [3191, 6350],
              [3200, 6339],
              [3214, 6289],
              [3213, 6267],
              [3198, 6230],
              [3166, 6191],
              [3151, 6183],
              [3118, 6128],
              [3091, 6110],
              [3088, 6067],
              [3094, 6032],
              [3083, 5992],
              [3085, 5977],
              [3071, 5961],
              [3069, 5925],
              [3028, 5860],
              [3032, 5846],
              [3002, 5828],
              [2999, 5815],
              [2932, 5816],
              [2900, 5795],
              [2855, 5775],
              [2829, 5754],
              [2806, 5719],
              [2804, 5698],
              [2812, 5677],
              [2802, 5641],
              [2771, 5611],
              [2756, 5579],
              [2729, 5587],
              [2723, 5559],
              [2700, 5537],
              [2688, 5493],
              [2666, 5472],
              [2661, 5475],
              [2661, 5478]
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'EC',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.71,
        'hc-middle-y': 0.37,
        'hc-key': 'ec',
        'hc-a2': 'EC',
        name: 'Ecuador',
        labelrank: '3',
        'country-abbrev': 'Ecu.',
        subregion: 'South America',
        'region-wb': 'Latin America & Caribbean',
        'iso-a3': 'ECU',
        'iso-a2': 'EC',
        'woe-id': '23424801',
        continent: 'South America'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [1561, 6490],
              [1607, 6478],
              [1580, 6480],
              [1544, 6470],
              [1561, 6490]
            ]
          ],
          [
            [
              [1915, 6542],
              [1955, 6519],
              [1957, 6511],
              [1986, 6507],
              [1990, 6513],
              [2020, 6497],
              [2011, 6455],
              [1978, 6425],
              [1943, 6412],
              [1929, 6401],
              [1920, 6367],
              [1908, 6353],
              [1895, 6367],
              [1865, 6380],
              [1876, 6386],
              [1870, 6401],
              [1887, 6422],
              [1874, 6420],
              [1854, 6432],
              [1859, 6443],
              [1853, 6469],
              [1879, 6501],
              [1877, 6522],
              [1905, 6532],
              [1915, 6542]
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'AU',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.56,
        'hc-middle-y': 0.41,
        'hc-key': 'au',
        'hc-a2': 'AU',
        name: 'Australia',
        labelrank: '2',
        'country-abbrev': 'Auz.',
        subregion: 'Australia and New Zealand',
        'region-wb': 'East Asia & Pacific',
        'iso-a3': 'AUS',
        'iso-a2': 'AU',
        'woe-id': '-90',
        continent: 'Oceania'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [8298, 5411],
              [8311, 5405],
              [8293, 5394],
              [8271, 5395],
              [8268, 5405],
              [8298, 5411]
            ]
          ],
          [
            [
              [8087, 6159],
              [8084, 6170],
              [8115, 6169],
              [8117, 6159],
              [8102, 6149],
              [8087, 6159]
            ]
          ],
          [
            [
              [8528, 6017],
              [8549, 5978],
              [8545, 5963],
              [8555, 5954],
              [8559, 5934],
              [8587, 5924],
              [8591, 5915],
              [8620, 5905],
              [8637, 5891],
              [8623, 5889],
              [8640, 5873],
              [8651, 5837],
              [8659, 5840],
              [8687, 5823],
              [8689, 5796],
              [8699, 5799],
              [8705, 5783],
              [8719, 5779],
              [8740, 5746],
              [8762, 5752],
              [8753, 5727],
              [8758, 5687],
              [8768, 5676],
              [8765, 5655],
              [8769, 5630],
              [8751, 5570],
              [8749, 5546],
              [8738, 5514],
              [8716, 5500],
              [8690, 5452],
              [8685, 5424],
              [8667, 5400],
              [8660, 5366],
              [8663, 5346],
              [8648, 5337],
              [8613, 5335],
              [8592, 5326],
              [8559, 5304],
              [8557, 5290],
              [8537, 5307],
              [8514, 5312],
              [8515, 5333],
              [8472, 5300],
              [8439, 5317],
              [8417, 5315],
              [8388, 5327],
              [8360, 5357],
              [8364, 5375],
              [8356, 5396],
              [8338, 5412],
              [8312, 5409],
              [8325, 5439],
              [8311, 5459],
              [8299, 5424],
              [8276, 5420],
              [8310, 5492],
              [8293, 5492],
              [8286, 5475],
              [8268, 5467],
              [8239, 5432],
              [8226, 5467],
              [8211, 5489],
              [8199, 5491],
              [8195, 5514],
              [8155, 5530],
              [8139, 5528],
              [8107, 5546],
              [8043, 5539],
              [7993, 5520],
              [7961, 5521],
              [7899, 5491],
              [7882, 5465],
              [7837, 5469],
              [7778, 5466],
              [7763, 5450],
              [7744, 5448],
              [7731, 5433],
              [7694, 5428],
              [7660, 5436],
              [7630, 5461],
              [7630, 5479],
              [7650, 5487],
              [7651, 5540],
              [7630, 5587],
              [7630, 5610],
              [7606, 5654],
              [7602, 5679],
              [7570, 5728],
              [7587, 5736],
              [7604, 5707],
              [7606, 5727],
              [7585, 5766],
              [7594, 5798],
              [7591, 5827],
              [7602, 5849],
              [7607, 5829],
              [7620, 5850],
              [7649, 5866],
              [7644, 5886],
              [7658, 5874],
              [7694, 5888],
              [7712, 5886],
              [7806, 5917],
              [7847, 5962],
              [7842, 5989],
              [7866, 6010],
              [7883, 5981],
              [7892, 5991],
              [7884, 6023],
              [7908, 6017],
              [7909, 6050],
              [7923, 6047],
              [7928, 6069],
              [7973, 6080],
              [7983, 6095],
              [8019, 6066],
              [8015, 6048],
              [8030, 6065],
              [8063, 6055],
              [8054, 6075],
              [8077, 6119],
              [8092, 6135],
              [8152, 6143],
              [8147, 6162],
              [8130, 6169],
              [8149, 6175],
              [8167, 6156],
              [8185, 6155],
              [8223, 6139],
              [8247, 6152],
              [8252, 6140],
              [8264, 6152],
              [8277, 6138],
              [8247, 6095],
              [8277, 6093],
              [8263, 6081],
              [8248, 6088],
              [8234, 6060],
              [8266, 6036],
              [8302, 6020],
              [8318, 6005],
              [8339, 6000],
              [8347, 6013],
              [8346, 5987],
              [8368, 5976],
              [8393, 5984],
              [8410, 6025],
              [8417, 6054],
              [8412, 6089],
              [8415, 6131],
              [8426, 6146],
              [8431, 6201],
              [8445, 6184],
              [8459, 6137],
              [8469, 6129],
              [8472, 6095],
              [8484, 6072],
              [8500, 6082],
              [8526, 6059],
              [8528, 6017]
            ]
          ],
          [
            [
              [8507, 5242],
              [8488, 5259],
              [8507, 5244],
              [8507, 5242],
              [8507, 5242],
              [8507, 5242]
            ]
          ],
          [
            [
              [8507, 5241],
              [8509, 5240],
              [8551, 5220],
              [8599, 5229],
              [8610, 5240],
              [8600, 5264],
              [8613, 5262],
              [8612, 5197],
              [8604, 5179],
              [8603, 5147],
              [8589, 5160],
              [8571, 5135],
              [8546, 5135],
              [8523, 5169],
              [8506, 5223],
              [8507, 5241],
              [8507, 5241],
              [8507, 5241]
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'KI',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.28,
        'hc-middle-y': 0.65,
        'hc-key': 'ki',
        'hc-a2': 'KI',
        name: 'Kiribati',
        labelrank: '6',
        'country-abbrev': 'Kir.',
        subregion: 'Micronesia',
        'region-wb': 'East Asia & Pacific',
        'iso-a3': 'KIR',
        'iso-a2': 'KI',
        'woe-id': '23424867',
        continent: 'Oceania'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-403, 6559],
            [-400, 6554],
            [-395, 6550],
            [-402, 6552],
            [-403, 6559]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'PH',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.41,
        'hc-middle-y': 0.18,
        'hc-key': 'ph',
        'hc-a2': 'PH',
        name: 'Philippines',
        labelrank: '2',
        'country-abbrev': 'Phil.',
        subregion: 'South-Eastern Asia',
        'region-wb': 'East Asia & Pacific',
        'iso-a3': 'PHL',
        'iso-a2': 'PH',
        'woe-id': '23424934',
        continent: 'Asia'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [7820, 6675],
              [7805, 6662],
              [7772, 6650],
              [7805, 6669],
              [7826, 6695],
              [7820, 6675]
            ]
          ],
          [
            [
              [7879, 6795],
              [7898, 6831],
              [7897, 6805],
              [7868, 6765],
              [7849, 6789],
              [7863, 6797],
              [7861, 6809],
              [7873, 6823],
              [7884, 6818],
              [7879, 6795]
            ]
          ],
          [
            [
              [7907, 6844],
              [7927, 6831],
              [7925, 6805],
              [7905, 6782],
              [7892, 6783],
              [7901, 6798],
              [7920, 6803],
              [7919, 6818],
              [7908, 6822],
              [7907, 6844]
            ]
          ],
          [
            [
              [7921, 6839],
              [7904, 6869],
              [7931, 6870],
              [7940, 6861],
              [7947, 6827],
              [7933, 6826],
              [7921, 6839]
            ]
          ],
          [
            [
              [7786, 6903],
              [7814, 6896],
              [7829, 6881],
              [7815, 6860],
              [7786, 6903]
            ]
          ],
          [
            [
              [7772, 6836],
              [7775, 6863],
              [7788, 6856],
              [7772, 6836],
              [7772, 6836]
            ]
          ],
          [
            [
              [7771, 6836],
              [7772, 6836],
              [7772, 6836],
              [7772, 6836],
              [7771, 6836],
              [7771, 6836],
              [7771, 6836]
            ]
          ],
          [
            [
              [7839, 6850],
              [7872, 6837],
              [7855, 6815],
              [7836, 6807],
              [7840, 6843],
              [7839, 6850],
              [7839, 6850],
              [7839, 6850]
            ]
          ],
          [
            [
              [7904, 6717],
              [7880, 6729],
              [7861, 6714],
              [7852, 6726],
              [7840, 6702],
              [7840, 6727],
              [7865, 6740],
              [7878, 6756],
              [7893, 6740],
              [7908, 6753],
              [7918, 6750],
              [7919, 6767],
              [7941, 6765],
              [7941, 6796],
              [7965, 6760],
              [7973, 6713],
              [7963, 6698],
              [7950, 6716],
              [7937, 6696],
              [7947, 6679],
              [7938, 6664],
              [7903, 6681],
              [7897, 6709],
              [7904, 6717]
            ]
          ],
          [
            [
              [7908, 6903],
              [7899, 6870],
              [7888, 6872],
              [7898, 6845],
              [7879, 6859],
              [7872, 6896],
              [7853, 6912],
              [7855, 6888],
              [7829, 6912],
              [7812, 6902],
              [7797, 6907],
              [7796, 6928],
              [7781, 6937],
              [7772, 6970],
              [7773, 6984],
              [7790, 6977],
              [7788, 7020],
              [7795, 7043],
              [7814, 7065],
              [7811, 7052],
              [7846, 7041],
              [7841, 7025],
              [7853, 7006],
              [7843, 6980],
              [7825, 6971],
              [7823, 6945],
              [7829, 6918],
              [7851, 6923],
              [7869, 6912],
              [7908, 6903]
            ]
          ],
          [
            [
              [7839, 6850],
              [7836, 6851],
              [7837, 6860],
              [7839, 6850],
              [7839, 6850],
              [7839, 6850]
            ]
          ],
          [
            [
              [7771, 6836],
              [7766, 6829],
              [7770, 6809],
              [7741, 6791],
              [7734, 6774],
              [7700, 6749],
              [7759, 6815],
              [7764, 6836],
              [7771, 6836],
              [7771, 6836],
              [7771, 6836]
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'MX',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.51,
        'hc-middle-y': 0.49,
        'hc-key': 'mx',
        'hc-a2': 'MX',
        name: 'Mexico',
        labelrank: '2',
        'country-abbrev': 'Mex.',
        subregion: 'Central America',
        'region-wb': 'Latin America & Caribbean',
        'iso-a3': 'MEX',
        'iso-a2': 'MX',
        'woe-id': '23424900',
        continent: 'North America'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [1681, 7111],
              [1674, 7102],
              [1673, 7106],
              [1676, 7110],
              [1681, 7111]
            ]
          ],
          [
            [
              [1094, 7147],
              [1098, 7145],
              [1107, 7133],
              [1100, 7138],
              [1094, 7147]
            ]
          ],
          [
            [
              [938, 7233],
              [942, 7233],
              [946, 7228],
              [945, 7226],
              [938, 7233]
            ]
          ],
          [
            [
              [932, 7248],
              [931, 7243],
              [928, 7242],
              [931, 7249],
              [932, 7248]
            ]
          ],
          [
            [
              [843, 7345],
              [841, 7344],
              [838, 7346],
              [843, 7354],
              [843, 7345]
            ]
          ],
          [
            [
              [753, 7372],
              [752, 7371],
              [749, 7379],
              [753, 7376],
              [753, 7372]
            ]
          ],
          [
            [
              [921, 7365],
              [923, 7380],
              [931, 7375],
              [928, 7366],
              [921, 7365]
            ]
          ],
          [
            [
              [893, 7391],
              [902, 7384],
              [904, 7374],
              [890, 7387],
              [893, 7391]
            ]
          ],
          [
            [
              [1255, 7393],
              [1253, 7390],
              [1260, 7389],
              [1283, 7351],
              [1305, 7329],
              [1307, 7313],
              [1313, 7304],
              [1315, 7297],
              [1343, 7282],
              [1375, 7278],
              [1360, 7233],
              [1354, 7172],
              [1360, 7144],
              [1375, 7114],
              [1395, 7090],
              [1414, 7056],
              [1433, 7054],
              [1454, 7037],
              [1506, 7052],
              [1531, 7052],
              [1558, 7068],
              [1572, 7091],
              [1576, 7125],
              [1592, 7133],
              [1641, 7143],
              [1682, 7132],
              [1661, 7101],
              [1658, 7070],
              [1649, 7040],
              [1642, 7044],
              [1636, 7048],
              [1619, 7030],
              [1610, 7027],
              [1557, 7027],
              [1556, 7010],
              [1543, 7010],
              [1574, 6984],
              [1571, 6975],
              [1534, 6975],
              [1520, 6951],
              [1519, 6929],
              [1471, 6975],
              [1443, 6986],
              [1425, 6972],
              [1392, 6962],
              [1356, 6972],
              [1327, 6989],
              [1302, 6993],
              [1260, 7011],
              [1237, 7030],
              [1188, 7043],
              [1164, 7065],
              [1143, 7074],
              [1123, 7106],
              [1138, 7138],
              [1125, 7154],
              [1120, 7175],
              [1087, 7212],
              [1055, 7237],
              [1045, 7256],
              [1012, 7273],
              [1019, 7290],
              [1012, 7302],
              [980, 7323],
              [970, 7337],
              [932, 7374],
              [904, 7433],
              [906, 7444],
              [861, 7463],
              [853, 7456],
              [858, 7413],
              [867, 7399],
              [889, 7383],
              [904, 7358],
              [915, 7361],
              [914, 7338],
              [926, 7328],
              [957, 7282],
              [957, 7274],
              [980, 7244],
              [978, 7225],
              [1002, 7222],
              [1012, 7193],
              [999, 7182],
              [987, 7203],
              [933, 7244],
              [930, 7281],
              [903, 7304],
              [890, 7301],
              [863, 7318],
              [847, 7337],
              [873, 7341],
              [877, 7357],
              [849, 7386],
              [828, 7398],
              [817, 7432],
              [799, 7456],
              [786, 7488],
              [857, 7494],
              [854, 7487],
              [964, 7449],
              [1048, 7449],
              [1048, 7464],
              [1099, 7464],
              [1147, 7424],
              [1158, 7395],
              [1198, 7374],
              [1211, 7398],
              [1222, 7403],
              [1255, 7393]
            ],
            [
              [1363, 7262],
              [1357, 7247],
              [1360, 7234],
              [1367, 7261],
              [1363, 7262]
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'ES',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.75,
        'hc-middle-y': 0.27,
        'hc-key': 'es',
        'hc-a2': 'ES',
        name: 'Spain',
        labelrank: '2',
        'country-abbrev': 'Sp.',
        subregion: 'Southern Europe',
        'region-wb': 'Europe & Central Asia',
        'iso-a3': 'ESP',
        'iso-a2': 'ES',
        'woe-id': '23424950',
        continent: 'Europe'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [4352, 7741],
              [4336, 7718],
              [4309, 7726],
              [4333, 7738],
              [4352, 7741]
            ]
          ],
          [
            [
              [4153, 7581],
              [4154, 7579],
              [4153, 7579],
              [4152, 7580],
              [4153, 7581]
            ]
          ],
          [
            [
              [4080, 7601],
              [4083, 7600],
              [4082, 7598],
              [4081, 7599],
              [4080, 7601]
            ]
          ],
          [
            [
              [4082, 7608],
              [4058, 7613],
              [4048, 7635],
              [4021, 7643],
              [4018, 7656],
              [4032, 7672],
              [4023, 7686],
              [4034, 7705],
              [4017, 7728],
              [4033, 7729],
              [4039, 7752],
              [4035, 7775],
              [4057, 7794],
              [4046, 7807],
              [3998, 7803],
              [3997, 7815],
              [3982, 7808],
              [3979, 7834],
              [3968, 7851],
              [3994, 7859],
              [4006, 7872],
              [4025, 7865],
              [4081, 7865],
              [4116, 7859],
              [4134, 7864],
              [4187, 7859],
              [4200, 7848],
              [4238, 7834],
              [4259, 7839],
              [4282, 7831],
              [4284, 7825],
              [4290, 7827],
              [4297, 7825],
              [4297, 7826],
              [4298, 7827],
              [4299, 7825],
              [4298, 7825],
              [4314, 7821],
              [4333, 7825],
              [4335, 7808],
              [4300, 7784],
              [4269, 7776],
              [4230, 7723],
              [4246, 7697],
              [4225, 7682],
              [4219, 7658],
              [4190, 7649],
              [4179, 7629],
              [4109, 7627],
              [4082, 7608],
              [4082, 7608]
            ]
          ],
          [
            [
              [3736, 7346],
              [3735, 7346],
              [3735, 7346],
              [3735, 7346],
              [3735, 7346],
              [3736, 7346],
              [3736, 7346]
            ]
          ],
          [
            [
              [3736, 7346],
              [3764, 7361],
              [3785, 7347],
              [3780, 7334],
              [3755, 7347],
              [3736, 7346],
              [3736, 7346]
            ]
          ],
          [
            [
              [3735, 7346],
              [3728, 7346],
              [3714, 7357],
              [3717, 7366],
              [3735, 7346],
              [3735, 7346],
              [3735, 7346]
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'BU',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.49,
        'hc-middle-y': 0.73,
        'hc-key': 'bu',
        'hc-a2': 'BU',
        name: 'Bajo Nuevo Bank (Petrel Is.)',
        labelrank: '8',
        'country-abbrev': null,
        subregion: 'Caribbean',
        'region-wb': 'Latin America & Caribbean',
        'iso-a3': '-99',
        'iso-a2': 'BU',
        'woe-id': '-99',
        continent: 'North America'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [1881, 6967],
            [1881, 6966],
            [1881, 6967],
            [1881, 6967],
            [1881, 6967]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'MV',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.57,
        'hc-middle-y': 0.53,
        'hc-key': 'mv',
        'hc-a2': 'MV',
        name: 'Maldives',
        labelrank: '5',
        'country-abbrev': 'Mald.',
        subregion: 'Southern Asia',
        'region-wb': 'South Asia',
        'iso-a3': 'MDV',
        'iso-a2': 'MV',
        'woe-id': '23424899',
        continent: 'Seven seas (open ocean)'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [6404, 6668],
            [6411, 6657],
            [6402, 6657],
            [6406, 6662],
            [6404, 6668]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'SP',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.5,
        'hc-middle-y': 0.5,
        'hc-key': 'sp',
        'hc-a2': 'SP',
        name: 'Spratly Islands',
        labelrank: '6',
        'country-abbrev': 'Spratly Is.',
        subregion: 'South-Eastern Asia',
        'region-wb': 'East Asia & Pacific',
        'iso-a3': 'SPI',
        'iso-a2': 'SP',
        'woe-id': '23424921',
        continent: 'Asia'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [7656, 6818],
            [7655, 6818],
            [7655, 6819],
            [7656, 6819],
            [7656, 6818]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'GB',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.69,
        'hc-middle-y': 0.09,
        'hc-key': 'gb',
        'hc-a2': 'GB',
        name: 'United Kingdom',
        labelrank: '2',
        'country-abbrev': 'U.K.',
        subregion: 'Northern Europe',
        'region-wb': 'Europe & Central Asia',
        'iso-a3': 'GBR',
        'iso-a2': 'GB',
        'woe-id': '-90',
        continent: 'Europe'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [4054, 8383],
              [4040, 8405],
              [4053, 8415],
              [4060, 8397],
              [4073, 8397],
              [4054, 8383]
            ]
          ],
          [
            [
              [4144, 8467],
              [4146, 8463],
              [4142, 8461],
              [4138, 8466],
              [4144, 8467]
            ]
          ],
          [
            [
              [4148, 8478],
              [4147, 8471],
              [4152, 8469],
              [4140, 8472],
              [4148, 8478]
            ]
          ],
          [
            [
              [4155, 8481],
              [4149, 8486],
              [4161, 8480],
              [4158, 8477],
              [4155, 8481]
            ]
          ],
          [
            [
              [4209, 8530],
              [4202, 8508],
              [4200, 8524],
              [4191, 8529],
              [4209, 8530]
            ]
          ],
          [
            [
              [4212, 8543],
              [4217, 8541],
              [4205, 8538],
              [4207, 8547],
              [4212, 8543]
            ]
          ],
          [
            [
              [4217, 8550],
              [4215, 8545],
              [4211, 8545],
              [4212, 8550],
              [4217, 8550]
            ]
          ],
          [
            [
              [1840, 7073],
              [1843, 7075],
              [1848, 7073],
              [1843, 7071],
              [1840, 7073]
            ]
          ],
          [
            [
              [2129, 7148],
              [2121, 7148],
              [2121, 7151],
              [2126, 7150],
              [2129, 7148]
            ]
          ],
          [
            [
              [2114, 7151],
              [2112, 7148],
              [2107, 7148],
              [2111, 7149],
              [2114, 7151]
            ]
          ],
          [
            [
              [4030, 8413],
              [4030, 8436],
              [4055, 8450],
              [4052, 8430],
              [4030, 8413]
            ]
          ],
          [
            [
              [2441, 4827],
              [2452, 4844],
              [2466, 4838],
              [2493, 4842],
              [2474, 4820],
              [2453, 4809],
              [2465, 4830],
              [2452, 4841],
              [2441, 4827]
            ]
          ],
          [
            [
              [2479, 4806],
              [2480, 4819],
              [2494, 4830],
              [2501, 4848],
              [2532, 4843],
              [2537, 4830],
              [2498, 4810],
              [2479, 4806]
            ]
          ],
          [
            [
              [3117, 4738],
              [3137, 4739],
              [3162, 4732],
              [3178, 4718],
              [3175, 4702],
              [3164, 4716],
              [3117, 4738]
            ]
          ],
          [
            [
              [5239, 7568],
              [5238, 7568],
              [5236, 7569],
              [5236, 7569],
              [5235, 7569],
              [5236, 7569],
              [5233, 7569],
              [5233, 7569],
              [5234, 7570],
              [5233, 7571],
              [5235, 7571],
              [5239, 7572],
              [5239, 7572],
              [5236, 7571],
              [5239, 7568]
            ],
            [
              [5235, 7570],
              [5235, 7570],
              [5235, 7570],
              [5235, 7570]
            ]
          ],
          [
            [
              [4082, 7608],
              [4082, 7607],
              [4082, 7608],
              [4082, 7608]
            ]
          ],
          [
            [
              [5213, 7558],
              [5210, 7558],
              [5206, 7558],
              [5208, 7560],
              [5213, 7558]
            ]
          ],
          [
            [
              [4026, 8305],
              [4054, 8315],
              [4076, 8288],
              [4061, 8263],
              [4055, 8266],
              [4044, 8263],
              [4033, 8278],
              [4024, 8266],
              [3999, 8280],
              [4026, 8305]
            ]
          ],
          [
            [
              [4102, 8452],
              [4151, 8455],
              [4145, 8441],
              [4119, 8425],
              [4128, 8421],
              [4114, 8406],
              [4137, 8416],
              [4183, 8414],
              [4188, 8405],
              [4165, 8368],
              [4164, 8355],
              [4146, 8346],
              [4177, 8340],
              [4192, 8326],
              [4204, 8287],
              [4223, 8281],
              [4237, 8266],
              [4249, 8225],
              [4240, 8217],
              [4277, 8219],
              [4289, 8212],
              [4286, 8185],
              [4260, 8161],
              [4282, 8158],
              [4280, 8148],
              [4248, 8133],
              [4206, 8134],
              [4167, 8127],
              [4139, 8128],
              [4132, 8113],
              [4115, 8121],
              [4079, 8111],
              [4117, 8151],
              [4149, 8151],
              [4159, 8162],
              [4135, 8158],
              [4111, 8173],
              [4094, 8166],
              [4083, 8176],
              [4116, 8193],
              [4119, 8218],
              [4099, 8213],
              [4116, 8230],
              [4146, 8237],
              [4155, 8269],
              [4144, 8266],
              [4132, 8282],
              [4140, 8298],
              [4110, 8299],
              [4111, 8278],
              [4107, 8290],
              [4088, 8296],
              [4103, 8323],
              [4079, 8342],
              [4073, 8360],
              [4045, 8371],
              [4069, 8377],
              [4076, 8401],
              [4069, 8422],
              [4086, 8426],
              [4081, 8439],
              [4093, 8455],
              [4102, 8452]
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'GR',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.32,
        'hc-middle-y': 0.74,
        'hc-key': 'gr',
        'hc-a2': 'GR',
        name: 'Greece',
        labelrank: '3',
        'country-abbrev': 'Greece',
        subregion: 'Southern Europe',
        'region-wb': 'Europe & Central Asia',
        'iso-a3': 'GRC',
        'iso-a2': 'GR',
        'woe-id': '23424833',
        continent: 'Europe'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [5036, 7583],
              [5042, 7597],
              [5040, 7590],
              [5043, 7586],
              [5036, 7583]
            ]
          ],
          [
            [
              [5054, 7611],
              [5072, 7618],
              [5067, 7607],
              [5059, 7599],
              [5054, 7611]
            ]
          ],
          [
            [
              [5041, 7624],
              [5034, 7626],
              [5041, 7633],
              [5040, 7629],
              [5041, 7624]
            ]
          ],
          [
            [
              [5033, 7640],
              [5037, 7637],
              [5033, 7635],
              [5034, 7638],
              [5033, 7640]
            ]
          ],
          [
            [
              [4983, 7636],
              [4993, 7644],
              [4994, 7637],
              [4988, 7625],
              [4983, 7636]
            ]
          ],
          [
            [
              [5016, 7658],
              [5008, 7654],
              [5006, 7655],
              [5009, 7658],
              [5016, 7658]
            ]
          ],
          [
            [
              [5034, 7662],
              [5038, 7661],
              [5030, 7659],
              [5024, 7663],
              [5034, 7662]
            ]
          ],
          [
            [
              [5008, 7691],
              [5011, 7681],
              [5006, 7682],
              [5002, 7691],
              [5008, 7691]
            ]
          ],
          [
            [
              [4961, 7702],
              [4949, 7684],
              [4917, 7701],
              [4952, 7693],
              [4961, 7702]
            ]
          ],
          [
            [
              [5018, 7716],
              [5024, 7707],
              [5019, 7704],
              [5001, 7711],
              [5018, 7716]
            ]
          ],
          [
            [
              [4990, 7740],
              [4983, 7740],
              [4990, 7756],
              [4997, 7756],
              [4990, 7740]
            ]
          ],
          [
            [
              [5015, 7579],
              [5010, 7570],
              [4969, 7567],
              [4968, 7573],
              [4933, 7580],
              [4953, 7588],
              [5015, 7579]
            ]
          ],
          [
            [
              [4859, 7763],
              [4863, 7766],
              [4859, 7764],
              [4857, 7766],
              [4858, 7767],
              [4860, 7769],
              [4862, 7769],
              [4886, 7778],
              [4915, 7786],
              [4962, 7794],
              [4984, 7783],
              [5010, 7787],
              [5016, 7799],
              [5025, 7788],
              [5008, 7765],
              [4978, 7775],
              [4970, 7761],
              [4964, 7773],
              [4938, 7763],
              [4959, 7746],
              [4939, 7752],
              [4928, 7747],
              [4908, 7756],
              [4905, 7741],
              [4928, 7711],
              [4911, 7698],
              [4946, 7681],
              [4949, 7660],
              [4925, 7670],
              [4910, 7656],
              [4924, 7618],
              [4919, 7608],
              [4912, 7630],
              [4903, 7619],
              [4893, 7638],
              [4885, 7628],
              [4875, 7656],
              [4862, 7665],
              [4870, 7678],
              [4887, 7682],
              [4914, 7672],
              [4924, 7674],
              [4887, 7685],
              [4863, 7681],
              [4855, 7698],
              [4848, 7665],
              [4843, 7680],
              [4850, 7707],
              [4829, 7729],
              [4841, 7734],
              [4859, 7763]
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'AS',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.56,
        'hc-middle-y': 0.57,
        'hc-key': 'as',
        'hc-a2': 'AS',
        name: 'American Samoa',
        labelrank: '4',
        'country-abbrev': 'Am. Samoa',
        subregion: 'Polynesia',
        'region-wb': 'East Asia & Pacific',
        'iso-a3': 'ASM',
        'iso-a2': 'AS',
        'woe-id': '23424746',
        continent: 'Oceania'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-792, 6080],
            [-793, 6079],
            [-796, 6076],
            [-798, 6078],
            [-792, 6080]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'DK',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.3,
        'hc-middle-y': 0.43,
        'hc-key': 'dk',
        'hc-a2': 'DK',
        name: 'Denmark',
        labelrank: '4',
        'country-abbrev': 'Den.',
        subregion: 'Northern Europe',
        'region-wb': 'Europe & Central Asia',
        'iso-a3': 'DNK',
        'iso-a2': 'DK',
        'woe-id': '23424796',
        continent: 'Europe'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [4572, 8300],
              [4587, 8288],
              [4577, 8287],
              [4564, 8293],
              [4572, 8300]
            ]
          ],
          [
            [
              [4545, 8298],
              [4550, 8296],
              [4546, 8295],
              [4540, 8301],
              [4545, 8298]
            ]
          ],
          [
            [
              [4609, 8302],
              [4600, 8298],
              [4599, 8302],
              [4603, 8304],
              [4609, 8302]
            ]
          ],
          [
            [
              [4528, 8306],
              [4535, 8301],
              [4534, 8297],
              [4528, 8299],
              [4528, 8306]
            ]
          ],
          [
            [
              [4559, 8300],
              [4556, 8292],
              [4553, 8296],
              [4563, 8309],
              [4559, 8300]
            ]
          ],
          [
            [
              [4550, 8335],
              [4558, 8312],
              [4541, 8306],
              [4525, 8323],
              [4550, 8335]
            ]
          ],
          [
            [
              [4611, 8331],
              [4601, 8325],
              [4592, 8290],
              [4583, 8310],
              [4572, 8311],
              [4567, 8329],
              [4584, 8340],
              [4587, 8331],
              [4601, 8349],
              [4611, 8331]
            ]
          ],
          [
            [
              [4518, 8295],
              [4500, 8298],
              [4495, 8298],
              [4494, 8320],
              [4478, 8325],
              [4487, 8340],
              [4479, 8367],
              [4492, 8368],
              [4528, 8390],
              [4502, 8385],
              [4491, 8369],
              [4483, 8378],
              [4494, 8391],
              [4517, 8392],
              [4534, 8410],
              [4553, 8417],
              [4542, 8382],
              [4545, 8367],
              [4563, 8362],
              [4520, 8322],
              [4527, 8302],
              [4518, 8295]
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'GL',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.55,
        'hc-middle-y': 0.4,
        'hc-key': 'gl',
        'hc-a2': 'GL',
        name: 'Greenland',
        labelrank: '3',
        'country-abbrev': 'Grlnd.',
        subregion: 'Northern America',
        'region-wb': 'Europe & Central Asia',
        'iso-a3': 'GRL',
        'iso-a2': 'GL',
        'woe-id': '23424828',
        continent: 'North America'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [2678, 8916],
              [2681, 8914],
              [2674, 8911],
              [2670, 8915],
              [2678, 8916]
            ]
          ],
          [
            [
              [2702, 8929],
              [2673, 8922],
              [2676, 8925],
              [2688, 8928],
              [2702, 8929]
            ]
          ],
          [
            [
              [2628, 9017],
              [2620, 9016],
              [2617, 9022],
              [2624, 9021],
              [2628, 9017]
            ]
          ],
          [
            [
              [3424, 9036],
              [3421, 9043],
              [3453, 9044],
              [3492, 9054],
              [3493, 9031],
              [3467, 9021],
              [3456, 9024],
              [3412, 9019],
              [3424, 9036]
            ]
          ],
          [
            [
              [2662, 9052],
              [2648, 9056],
              [2659, 9067],
              [2665, 9056],
              [2662, 9052]
            ]
          ],
          [
            [
              [2687, 9059],
              [2674, 9061],
              [2678, 9071],
              [2697, 9066],
              [2687, 9059]
            ]
          ],
          [
            [
              [2601, 9094],
              [2594, 9099],
              [2601, 9101],
              [2606, 9098],
              [2601, 9094]
            ]
          ],
          [
            [
              [2598, 9147],
              [2591, 9141],
              [2582, 9143],
              [2589, 9147],
              [2598, 9147]
            ]
          ],
          [
            [
              [2618, 9149],
              [2602, 9135],
              [2600, 9147],
              [2610, 9150],
              [2618, 9149]
            ]
          ],
          [
            [
              [3554, 9164],
              [3594, 9155],
              [3594, 9143],
              [3572, 9143],
              [3557, 9153],
              [3516, 9155],
              [3516, 9160],
              [3554, 9164]
            ]
          ],
          [
            [
              [2590, 9192],
              [2604, 9184],
              [2600, 9184],
              [2585, 9192],
              [2590, 9192]
            ]
          ],
          [
            [
              [2580, 9211],
              [2589, 9209],
              [2570, 9207],
              [2570, 9213],
              [2580, 9211]
            ]
          ],
          [
            [
              [3622, 9242],
              [3645, 9227],
              [3612, 9222],
              [3593, 9229],
              [3596, 9238],
              [3622, 9242]
            ]
          ],
          [
            [
              [2574, 9246],
              [2556, 9246],
              [2542, 9246],
              [2567, 9250],
              [2574, 9246]
            ]
          ],
          [
            [
              [3715, 9294],
              [3703, 9290],
              [3728, 9277],
              [3682, 9276],
              [3684, 9293],
              [3706, 9301],
              [3715, 9294]
            ]
          ],
          [
            [
              [2187, 9369],
              [2175, 9370],
              [2176, 9372],
              [2188, 9373],
              [2187, 9369]
            ]
          ],
          [
            [
              [2110, 9425],
              [2135, 9420],
              [2125, 9417],
              [2101, 9421],
              [2110, 9425]
            ]
          ],
          [
            [
              [2149, 9427],
              [2168, 9421],
              [2144, 9421],
              [2137, 9425],
              [2149, 9427]
            ]
          ],
          [
            [
              [3729, 9590],
              [3714, 9574],
              [3694, 9570],
              [3667, 9581],
              [3716, 9598],
              [3729, 9590]
            ]
          ],
          [
            [
              [2267, 9638],
              [2276, 9633],
              [2270, 9632],
              [2267, 9634],
              [2267, 9638]
            ]
          ],
          [
            [
              [2729, 9730],
              [2703, 9730],
              [2671, 9739],
              [2667, 9749],
              [2683, 9754],
              [2729, 9730]
            ]
          ],
          [
            [
              [3059, 9809],
              [3044, 9816],
              [3081, 9810],
              [3064, 9802],
              [3039, 9806],
              [3018, 9817],
              [3059, 9809]
            ]
          ],
          [
            [
              [2655, 8957],
              [2641, 8968],
              [2665, 8967],
              [2618, 8981],
              [2623, 9007],
              [2637, 9013],
              [2669, 9007],
              [2685, 8992],
              [2706, 8986],
              [2702, 8969],
              [2655, 8957]
            ]
          ],
          [
            [
              [3585, 9111],
              [3521, 9138],
              [3518, 9150],
              [3557, 9151],
              [3592, 9131],
              [3572, 9130],
              [3590, 9119],
              [3585, 9111]
            ]
          ],
          [
            [
              [3555, 9173],
              [3503, 9179],
              [3562, 9166],
              [3518, 9162],
              [3481, 9171],
              [3495, 9183],
              [3518, 9184],
              [3555, 9173]
            ]
          ],
          [
            [
              [2674, 8775],
              [2670, 8778],
              [2658, 8799],
              [2658, 8818],
              [2671, 8830],
              [2698, 8839],
              [2658, 8838],
              [2648, 8846],
              [2702, 8861],
              [2651, 8854],
              [2653, 8863],
              [2696, 8884],
              [2682, 8882],
              [2657, 8868],
              [2656, 8883],
              [2672, 8887],
              [2672, 8903],
              [2708, 8895],
              [2723, 8903],
              [2693, 8902],
              [2689, 8911],
              [2707, 8920],
              [2731, 8921],
              [2733, 8951],
              [2760, 8945],
              [2751, 8960],
              [2739, 8953],
              [2741, 8981],
              [2758, 8984],
              [2748, 8992],
              [2728, 8972],
              [2723, 8994],
              [2696, 8999],
              [2670, 9015],
              [2652, 9016],
              [2630, 9034],
              [2648, 9040],
              [2693, 9034],
              [2719, 9019],
              [2746, 9014],
              [2721, 9032],
              [2722, 9045],
              [2703, 9042],
              [2711, 9053],
              [2694, 9058],
              [2699, 9069],
              [2677, 9073],
              [2713, 9082],
              [2683, 9085],
              [2670, 9078],
              [2663, 9085],
              [2674, 9086],
              [2678, 9086],
              [2645, 9089],
              [2649, 9073],
              [2609, 9070],
              [2591, 9087],
              [2610, 9100],
              [2600, 9104],
              [2621, 9118],
              [2616, 9122],
              [2616, 9122],
              [2603, 9112],
              [2599, 9117],
              [2614, 9124],
              [2603, 9133],
              [2617, 9133],
              [2629, 9151],
              [2614, 9157],
              [2616, 9158],
              [2602, 9163],
              [2601, 9162],
              [2598, 9163],
              [2610, 9182],
              [2587, 9196],
              [2598, 9211],
              [2576, 9221],
              [2585, 9233],
              [2550, 9223],
              [2584, 9239],
              [2556, 9271],
              [2525, 9280],
              [2531, 9285],
              [2510, 9298],
              [2522, 9302],
              [2516, 9319],
              [2499, 9318],
              [2492, 9328],
              [2445, 9345],
              [2406, 9349],
              [2368, 9359],
              [2351, 9344],
              [2332, 9352],
              [2332, 9343],
              [2287, 9353],
              [2281, 9341],
              [2266, 9352],
              [2255, 9346],
              [2279, 9332],
              [2222, 9340],
              [2186, 9359],
              [2235, 9377],
              [2208, 9376],
              [2163, 9384],
              [2136, 9397],
              [2149, 9409],
              [2202, 9414],
              [2223, 9421],
              [2271, 9419],
              [2290, 9424],
              [2285, 9436],
              [2260, 9439],
              [2246, 9430],
              [2198, 9425],
              [2167, 9433],
              [2190, 9440],
              [2155, 9442],
              [2173, 9451],
              [2137, 9445],
              [2090, 9470],
              [2099, 9494],
              [2130, 9502],
              [2194, 9512],
              [2204, 9524],
              [2233, 9530],
              [2294, 9532],
              [2327, 9558],
              [2322, 9593],
              [2297, 9592],
              [2280, 9599],
              [2262, 9596],
              [2250, 9615],
              [2271, 9629],
              [2319, 9645],
              [2329, 9659],
              [2382, 9676],
              [2425, 9665],
              [2443, 9673],
              [2432, 9686],
              [2447, 9696],
              [2427, 9712],
              [2468, 9727],
              [2505, 9721],
              [2509, 9708],
              [2525, 9707],
              [2515, 9722],
              [2486, 9731],
              [2511, 9738],
              [2634, 9758],
              [2660, 9739],
              [2653, 9699],
              [2679, 9721],
              [2679, 9734],
              [2724, 9724],
              [2757, 9711],
              [2735, 9728],
              [2770, 9721],
              [2781, 9727],
              [2748, 9742],
              [2733, 9768],
              [2794, 9764],
              [2802, 9757],
              [2883, 9733],
              [2908, 9716],
              [2935, 9720],
              [2914, 9734],
              [2917, 9739],
              [2857, 9757],
              [2814, 9788],
              [2816, 9796],
              [2839, 9791],
              [2833, 9777],
              [2874, 9780],
              [2929, 9760],
              [2911, 9747],
              [2917, 9740],
              [2919, 9744],
              [2950, 9760],
              [2891, 9787],
              [3000, 9786],
              [3010, 9766],
              [3014, 9785],
              [3053, 9772],
              [3066, 9757],
              [3061, 9781],
              [3031, 9787],
              [2894, 9795],
              [2858, 9802],
              [2882, 9811],
              [2909, 9803],
              [2961, 9798],
              [2909, 9806],
              [2898, 9812],
              [2923, 9817],
              [2975, 9812],
              [2942, 9819],
              [2998, 9822],
              [3040, 9803],
              [3077, 9801],
              [3100, 9785],
              [3087, 9804],
              [3100, 9812],
              [3041, 9824],
              [3046, 9831],
              [3094, 9816],
              [3099, 9835],
              [3131, 9841],
              [3154, 9836],
              [3156, 9844],
              [3200, 9844],
              [3281, 9851],
              [3287, 9846],
              [3336, 9849],
              [3395, 9843],
              [3403, 9839],
              [3483, 9826],
              [3471, 9819],
              [3333, 9814],
              [3265, 9804],
              [3191, 9798],
              [3209, 9797],
              [3301, 9803],
              [3352, 9813],
              [3432, 9808],
              [3496, 9816],
              [3518, 9796],
              [3572, 9789],
              [3610, 9776],
              [3578, 9755],
              [3535, 9751],
              [3359, 9741],
              [3357, 9737],
              [3303, 9728],
              [3273, 9719],
              [3275, 9709],
              [3292, 9708],
              [3305, 9719],
              [3421, 9735],
              [3514, 9730],
              [3511, 9715],
              [3464, 9703],
              [3461, 9690],
              [3484, 9699],
              [3539, 9713],
              [3547, 9710],
              [3556, 9732],
              [3609, 9737],
              [3620, 9714],
              [3613, 9696],
              [3558, 9655],
              [3592, 9662],
              [3654, 9698],
              [3653, 9707],
              [3677, 9704],
              [3678, 9718],
              [3660, 9738],
              [3677, 9734],
              [3690, 9718],
              [3715, 9713],
              [3737, 9700],
              [3774, 9719],
              [3829, 9717],
              [3885, 9705],
              [3904, 9692],
              [3881, 9683],
              [3846, 9661],
              [3810, 9659],
              [3818, 9645],
              [3785, 9636],
              [3736, 9637],
              [3691, 9631],
              [3707, 9625],
              [3741, 9631],
              [3774, 9619],
              [3755, 9606],
              [3713, 9602],
              [3674, 9610],
              [3686, 9599],
              [3660, 9593],
              [3660, 9607],
              [3639, 9584],
              [3651, 9570],
              [3673, 9572],
              [3663, 9550],
              [3681, 9535],
              [3652, 9526],
              [3668, 9506],
              [3637, 9516],
              [3611, 9477],
              [3608, 9453],
              [3627, 9458],
              [3673, 9455],
              [3672, 9485],
              [3697, 9501],
              [3720, 9538],
              [3702, 9500],
              [3683, 9485],
              [3682, 9463],
              [3669, 9443],
              [3680, 9436],
              [3720, 9448],
              [3702, 9437],
              [3692, 9415],
              [3701, 9392],
              [3688, 9368],
              [3693, 9332],
              [3676, 9364],
              [3687, 9382],
              [3635, 9394],
              [3599, 9376],
              [3583, 9388],
              [3569, 9378],
              [3600, 9368],
              [3600, 9351],
              [3652, 9351],
              [3659, 9343],
              [3642, 9335],
              [3595, 9333],
              [3652, 9332],
              [3669, 9319],
              [3667, 9289],
              [3653, 9285],
              [3645, 9296],
              [3630, 9293],
              [3601, 9311],
              [3611, 9297],
              [3635, 9284],
              [3617, 9281],
              [3651, 9276],
              [3647, 9258],
              [3673, 9251],
              [3700, 9259],
              [3668, 9233],
              [3644, 9233],
              [3639, 9243],
              [3598, 9243],
              [3584, 9223],
              [3630, 9211],
              [3634, 9186],
              [3604, 9188],
              [3582, 9174],
              [3558, 9180],
              [3532, 9194],
              [3530, 9207],
              [3518, 9191],
              [3494, 9187],
              [3468, 9174],
              [3501, 9165],
              [3498, 9154],
              [3482, 9155],
              [3511, 9142],
              [3516, 9128],
              [3576, 9099],
              [3560, 9088],
              [3594, 9090],
              [3578, 9081],
              [3580, 9064],
              [3598, 9076],
              [3596, 9064],
              [3606, 9025],
              [3580, 9020],
              [3578, 9041],
              [3571, 9020],
              [3551, 9020],
              [3534, 9029],
              [3524, 9054],
              [3477, 9081],
              [3450, 9079],
              [3417, 9103],
              [3400, 9101],
              [3434, 9089],
              [3424, 9083],
              [3453, 9076],
              [3481, 9075],
              [3485, 9060],
              [3448, 9046],
              [3402, 9048],
              [3416, 9043],
              [3407, 9016],
              [3451, 9022],
              [3417, 9001],
              [3435, 8996],
              [3448, 9010],
              [3463, 9007],
              [3493, 9018],
              [3545, 9002],
              [3580, 9002],
              [3554, 8978],
              [3529, 8972],
              [3514, 8958],
              [3464, 8928],
              [3437, 8920],
              [3413, 8921],
              [3373, 8903],
              [3325, 8895],
              [3305, 8898],
              [3284, 8924],
              [3296, 8895],
              [3256, 8871],
              [3258, 8857],
              [3218, 8811],
              [3167, 8785],
              [3135, 8781],
              [3151, 8776],
              [3123, 8772],
              [3125, 8795],
              [3142, 8810],
              [3119, 8805],
              [3119, 8791],
              [3104, 8777],
              [3056, 8767],
              [3075, 8760],
              [3052, 8745],
              [3029, 8749],
              [3045, 8736],
              [3035, 8715],
              [3045, 8684],
              [3026, 8675],
              [3028, 8661],
              [2996, 8631],
              [2985, 8592],
              [2984, 8568],
              [2966, 8569],
              [2983, 8555],
              [2977, 8542],
              [2959, 8536],
              [2965, 8513],
              [2932, 8509],
              [2901, 8523],
              [2899, 8543],
              [2871, 8547],
              [2893, 8563],
              [2887, 8570],
              [2867, 8549],
              [2826, 8552],
              [2818, 8568],
              [2793, 8577],
              [2784, 8594],
              [2786, 8611],
              [2756, 8627],
              [2761, 8647],
              [2747, 8649],
              [2724, 8672],
              [2728, 8716],
              [2704, 8703],
              [2701, 8735],
              [2706, 8744],
              [2683, 8770],
              [2678, 8773],
              [2677, 8772],
              [2672, 8772],
              [2672, 8775],
              [2674, 8775]
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'GU',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.45,
        'hc-middle-y': 0.44,
        'hc-key': 'gu',
        'hc-a2': 'GU',
        name: 'Guam',
        labelrank: '6',
        'country-abbrev': 'Guam',
        subregion: 'Micronesia',
        'region-wb': 'East Asia & Pacific',
        'iso-a3': 'GUM',
        'iso-a2': 'GU',
        'woe-id': '23424832',
        continent: 'Oceania'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [8510, 6896],
            [8506, 6890],
            [8504, 6896],
            [8512, 6902],
            [8510, 6896]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'MP',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.45,
        'hc-middle-y': 0.49,
        'hc-key': 'mp',
        'hc-a2': 'MP',
        name: 'Northern Mariana Islands',
        labelrank: '6',
        'country-abbrev': 'N.M.I.',
        subregion: 'Micronesia',
        'region-wb': 'East Asia & Pacific',
        'iso-a3': 'MNP',
        'iso-a2': 'MP',
        'woe-id': '23424788',
        continent: 'Oceania'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [8535, 6943],
            [8536, 6949],
            [8540, 6951],
            [8538, 6946],
            [8535, 6943]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'PR',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.48,
        'hc-middle-y': 0.65,
        'hc-key': 'pr',
        'hc-a2': 'PR',
        name: 'Puerto Rico',
        labelrank: '5',
        'country-abbrev': 'P.R.',
        subregion: 'Caribbean',
        'region-wb': 'Latin America & Caribbean',
        'iso-a3': 'PRI',
        'iso-a2': 'PR',
        'woe-id': '23424935',
        continent: 'North America'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [2315, 7041],
            [2287, 7031],
            [2261, 7031],
            [2261, 7049],
            [2315, 7041]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'VI',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.48,
        'hc-middle-y': 0.19,
        'hc-key': 'vi',
        'hc-a2': 'VI',
        name: 'United States Virgin Islands',
        labelrank: '6',
        'country-abbrev': 'V.I. (U.S.)',
        subregion: 'Caribbean',
        'region-wb': 'Latin America & Caribbean',
        'iso-a3': 'VIR',
        'iso-a2': 'VI',
        'woe-id': '23424985',
        continent: 'North America'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [2331, 7026],
            [2336, 7025],
            [2326, 7023],
            [2326, 7026],
            [2331, 7026]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'CA',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.29,
        'hc-middle-y': 0.66,
        'hc-key': 'ca',
        'hc-a2': 'CA',
        name: 'Canada',
        labelrank: '2',
        'country-abbrev': 'Can.',
        subregion: 'Northern America',
        'region-wb': 'North America',
        'iso-a3': 'CAN',
        'iso-a2': 'CA',
        'woe-id': '23424775',
        continent: 'North America'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [1908, 7849],
              [1909, 7845],
              [1912, 7843],
              [1875, 7838],
              [1865, 7830],
              [1840, 7833],
              [1826, 7819],
              [1803, 7811],
              [1790, 7820],
              [1809, 7821],
              [1802, 7829],
              [1806, 7832],
              [1809, 7846],
              [1829, 7857],
              [1829, 7884],
              [1843, 7903],
              [1830, 7925],
              [1842, 7926],
              [1858, 7907],
              [1877, 7898],
              [1889, 7909],
              [1858, 7951],
              [1830, 7958],
              [1759, 7966],
              [1759, 7973],
              [1748, 7970],
              [1740, 7990],
              [1745, 8002],
              [1733, 8014],
              [1738, 8025],
              [1708, 8027],
              [1691, 8057],
              [1667, 8057],
              [1644, 8065],
              [1630, 8060],
              [1623, 8042],
              [1598, 8028],
              [1543, 8029],
              [1507, 8048],
              [1447, 8058],
              [1443, 8077],
              [1433, 8065],
              [620, 8065],
              [614, 8069],
              [611, 8065],
              [610, 8065],
              [604, 8080],
              [584, 8086],
              [561, 8102],
              [565, 8113],
              [558, 8115],
              [560, 8114],
              [563, 8111],
              [558, 8108],
              [556, 8115],
              [547, 8117],
              [548, 8119],
              [545, 8121],
              [544, 8118],
              [535, 8119],
              [532, 8119],
              [539, 8117],
              [544, 8110],
              [544, 8109],
              [549, 8104],
              [549, 8104],
              [567, 8080],
              [584, 8075],
              [596, 8060],
              [595, 8063],
              [603, 8059],
              [611, 8058],
              [600, 8055],
              [604, 8051],
              [596, 8040],
              [563, 8050],
              [528, 8069],
              [527, 8072],
              [525, 8072],
              [526, 8073],
              [522, 8083],
              [507, 8081],
              [505, 8090],
              [506, 8090],
              [502, 8098],
              [502, 8098],
              [501, 8102],
              [471, 8107],
              [453, 8134],
              [469, 8138],
              [495, 8126],
              [531, 8119],
              [527, 8120],
              [530, 8119],
              [533, 8120],
              [517, 8123],
              [517, 8126],
              [511, 8124],
              [506, 8125],
              [510, 8128],
              [517, 8126],
              [518, 8132],
              [516, 8129],
              [506, 8129],
              [515, 8136],
              [518, 8133],
              [519, 8137],
              [502, 8134],
              [472, 8149],
              [469, 8179],
              [490, 8194],
              [484, 8193],
              [484, 8192],
              [468, 8180],
              [472, 8191],
              [469, 8190],
              [461, 8212],
              [446, 8226],
              [439, 8208],
              [430, 8222],
              [431, 8226],
              [426, 8227],
              [426, 8230],
              [430, 8234],
              [431, 8227],
              [433, 8233],
              [444, 8229],
              [440, 8233],
              [447, 8263],
              [434, 8247],
              [441, 8250],
              [439, 8245],
              [433, 8242],
              [431, 8244],
              [426, 8237],
              [392, 8274],
              [406, 8303],
              [406, 8314],
              [405, 8340],
              [403, 8348],
              [352, 8368],
              [340, 8394],
              [306, 8445],
              [260, 8483],
              [244, 8506],
              [219, 8497],
              [211, 8478],
              [187, 8467],
              [182, 8481],
              [135, 8518],
              [138, 8530],
              [111, 8523],
              [82, 8528],
              [81, 8978],
              [136, 8971],
              [151, 8959],
              [193, 8941],
              [233, 8939],
              [234, 8960],
              [254, 8958],
              [255, 8969],
              [274, 8967],
              [279, 8982],
              [295, 8970],
              [280, 8956],
              [311, 8965],
              [321, 8978],
              [344, 8982],
              [395, 9005],
              [421, 8998],
              [375, 8977],
              [348, 8972],
              [323, 8956],
              [306, 8936],
              [327, 8936],
              [321, 8947],
              [348, 8957],
              [370, 8974],
              [378, 8958],
              [396, 8979],
              [430, 8987],
              [436, 8979],
              [454, 9001],
              [477, 9010],
              [460, 9016],
              [465, 9028],
              [490, 9010],
              [505, 8982],
              [540, 8960],
              [539, 8971],
              [568, 9002],
              [569, 8982],
              [581, 8982],
              [571, 8963],
              [608, 8970],
              [614, 8988],
              [659, 8984],
              [693, 8965],
              [740, 8956],
              [759, 8945],
              [820, 8934],
              [821, 8944],
              [847, 8937],
              [872, 8921],
              [877, 8905],
              [849, 8907],
              [833, 8890],
              [882, 8877],
              [950, 8879],
              [986, 8891],
              [1010, 8877],
              [1021, 8881],
              [1030, 8860],
              [1055, 8856],
              [1051, 8835],
              [1068, 8819],
              [1078, 8849],
              [1055, 8878],
              [1072, 8895],
              [1091, 8898],
              [1101, 8911],
              [1121, 8914],
              [1124, 8925],
              [1098, 8920],
              [1066, 8901],
              [1031, 8907],
              [1047, 8924],
              [1076, 8928],
              [1106, 8939],
              [1120, 8938],
              [1134, 8911],
              [1155, 8905],
              [1158, 8894],
              [1192, 8893],
              [1224, 8879],
              [1246, 8876],
              [1270, 8885],
              [1339, 8882],
              [1363, 8872],
              [1367, 8875],
              [1364, 8874],
              [1363, 8877],
              [1369, 8879],
              [1369, 8877],
              [1376, 8881],
              [1359, 8894],
              [1348, 8888],
              [1329, 8911],
              [1371, 8917],
              [1385, 8894],
              [1412, 8908],
              [1395, 8866],
              [1416, 8861],
              [1429, 8837],
              [1428, 8870],
              [1418, 8878],
              [1425, 8896],
              [1442, 8894],
              [1469, 8917],
              [1480, 8936],
              [1449, 8931],
              [1464, 8951],
              [1458, 8967],
              [1403, 8989],
              [1393, 9014],
              [1402, 9027],
              [1390, 9040],
              [1395, 9066],
              [1424, 9076],
              [1410, 9080],
              [1432, 9101],
              [1449, 9104],
              [1434, 9102],
              [1434, 9130],
              [1417, 9149],
              [1421, 9169],
              [1417, 9197],
              [1431, 9203],
              [1431, 9218],
              [1477, 9227],
              [1519, 9217],
              [1539, 9219],
              [1580, 9212],
              [1531, 9152],
              [1515, 9144],
              [1463, 9147],
              [1483, 9130],
              [1464, 9106],
              [1452, 9104],
              [1491, 9075],
              [1501, 9058],
              [1496, 9042],
              [1514, 9032],
              [1540, 9004],
              [1501, 8981],
              [1533, 8969],
              [1544, 8979],
              [1573, 8970],
              [1567, 8963],
              [1568, 8963],
              [1572, 8956],
              [1568, 8954],
              [1566, 8962],
              [1562, 8957],
              [1549, 8959],
              [1573, 8938],
              [1568, 8915],
              [1578, 8905],
              [1594, 8926],
              [1595, 8946],
              [1617, 8956],
              [1646, 8930],
              [1651, 8910],
              [1633, 8907],
              [1640, 8876],
              [1660, 8860],
              [1659, 8848],
              [1677, 8862],
              [1706, 8895],
              [1713, 8930],
              [1741, 8946],
              [1719, 8958],
              [1718, 8984],
              [1753, 8989],
              [1770, 8981],
              [1803, 8978],
              [1817, 8959],
              [1841, 8954],
              [1827, 8939],
              [1843, 8925],
              [1821, 8915],
              [1803, 8915],
              [1821, 8899],
              [1819, 8888],
              [1844, 8865],
              [1836, 8842],
              [1823, 8841],
              [1804, 8821],
              [1781, 8810],
              [1752, 8841],
              [1733, 8841],
              [1753, 8831],
              [1772, 8803],
              [1725, 8807],
              [1719, 8821],
              [1680, 8815],
              [1708, 8801],
              [1690, 8781],
              [1663, 8760],
              [1647, 8761],
              [1595, 8790],
              [1554, 8790],
              [1587, 8783],
              [1614, 8760],
              [1673, 8756],
              [1676, 8751],
              [1650, 8721],
              [1645, 8706],
              [1614, 8695],
              [1586, 8705],
              [1581, 8681],
              [1557, 8677],
              [1532, 8684],
              [1565, 8667],
              [1567, 8653],
              [1544, 8640],
              [1513, 8641],
              [1530, 8634],
              [1506, 8626],
              [1506, 8617],
              [1485, 8606],
              [1490, 8595],
              [1457, 8553],
              [1443, 8512],
              [1444, 8474],
              [1455, 8459],
              [1493, 8460],
              [1513, 8404],
              [1507, 8383],
              [1555, 8397],
              [1619, 8380],
              [1645, 8362],
              [1657, 8346],
              [1713, 8327],
              [1744, 8312],
              [1765, 8316],
              [1812, 8305],
              [1809, 8271],
              [1818, 8254],
              [1813, 8220],
              [1834, 8200],
              [1828, 8192],
              [1852, 8182],
              [1868, 8156],
              [1888, 8147],
              [1900, 8169],
              [1912, 8152],
              [1909, 8173],
              [1925, 8196],
              [1910, 8223],
              [1906, 8267],
              [1887, 8288],
              [1946, 8314],
              [1978, 8345],
              [1984, 8376],
              [1967, 8426],
              [1923, 8455],
              [1923, 8467],
              [1945, 8484],
              [1945, 8501],
              [1960, 8506],
              [1935, 8553],
              [1953, 8581],
              [1937, 8599],
              [1935, 8618],
              [1955, 8632],
              [2035, 8611],
              [2067, 8626],
              [2104, 8606],
              [2110, 8593],
              [2126, 8589],
              [2122, 8575],
              [2152, 8562],
              [2194, 8550],
              [2180, 8538],
              [2190, 8501],
              [2183, 8494],
              [2192, 8466],
              [2212, 8468],
              [2241, 8448],
              [2244, 8433],
              [2274, 8451],
              [2282, 8465],
              [2299, 8465],
              [2312, 8483],
              [2307, 8503],
              [2327, 8531],
              [2341, 8526],
              [2346, 8504],
              [2350, 8509],
              [2353, 8505],
              [2349, 8502],
              [2347, 8503],
              [2350, 8488],
              [2370, 8484],
              [2384, 8454],
              [2417, 8405],
              [2411, 8396],
              [2430, 8390],
              [2413, 8369],
              [2434, 8363],
              [2413, 8353],
              [2438, 8351],
              [2476, 8307],
              [2499, 8309],
              [2502, 8296],
              [2545, 8288],
              [2551, 8282],
              [2486, 8255],
              [2468, 8252],
              [2460, 8237],
              [2499, 8250],
              [2529, 8271],
              [2547, 8267],
              [2555, 8251],
              [2594, 8240],
              [2600, 8190],
              [2560, 8159],
              [2539, 8161],
              [2512, 8150],
              [2475, 8117],
              [2420, 8108],
              [2402, 8115],
              [2315, 8116],
              [2280, 8114],
              [2260, 8097],
              [2253, 8079],
              [2233, 8077],
              [2203, 8057],
              [2177, 8019],
              [2139, 7984],
              [2144, 7986],
              [2145, 7985],
              [2147, 7987],
              [2160, 7991],
              [2203, 8037],
              [2228, 8052],
              [2287, 8074],
              [2324, 8074],
              [2346, 8062],
              [2343, 8044],
              [2310, 8028],
              [2296, 8036],
              [2278, 8032],
              [2304, 8016],
              [2337, 8022],
              [2319, 7998],
              [2337, 7965],
              [2350, 7955],
              [2397, 7939],
              [2414, 7950],
              [2441, 7929],
              [2380, 7905],
              [2356, 7906],
              [2305, 7860],
              [2287, 7884],
              [2293, 7902],
              [2327, 7922],
              [2371, 7930],
              [2335, 7932],
              [2337, 7950],
              [2297, 7925],
              [2259, 7924],
              [2250, 7927],
              [2251, 7939],
              [2244, 7941],
              [2240, 7945],
              [2240, 7994],
              [2224, 8004],
              [2208, 7998],
              [2198, 8008],
              [2175, 7980],
              [2167, 7950],
              [2131, 7918],
              [2036, 7917],
              [2072, 7933],
              [2082, 7955],
              [2120, 7978],
              [2125, 7980],
              [2120, 7979],
              [2087, 7961],
              [2072, 7944],
              [2070, 7942],
              [2068, 7939],
              [2073, 7943],
              [2071, 7936],
              [2069, 7933],
              [2058, 7933],
              [2036, 7917],
              [2020, 7912],
              [2005, 7899],
              [1974, 7887],
              [1965, 7876],
              [1951, 7882],
              [1911, 7876],
              [1887, 7857],
              [1908, 7855],
              [1909, 7851],
              [1908, 7849]
            ],
            [
              [2064, 7937],
              [2059, 7934],
              [2065, 7937],
              [2064, 7937]
            ],
            [
              [603, 8082],
              [602, 8086],
              [599, 8085],
              [599, 8083],
              [603, 8082]
            ]
          ],
          [
            [
              [592, 8070],
              [596, 8065],
              [603, 8062],
              [597, 8063],
              [592, 8070]
            ]
          ],
          [
            [
              [522, 8076],
              [517, 8076],
              [517, 8080],
              [521, 8080],
              [522, 8076]
            ]
          ],
          [
            [
              [2348, 8102],
              [2371, 8097],
              [2415, 8079],
              [2404, 8068],
              [2364, 8081],
              [2341, 8096],
              [2348, 8102]
            ]
          ],
          [
            [
              [554, 8105],
              [552, 8108],
              [554, 8111],
              [557, 8107],
              [554, 8105]
            ]
          ],
          [
            [
              [469, 8161],
              [462, 8162],
              [460, 8167],
              [465, 8171],
              [469, 8161]
            ]
          ],
          [
            [
              [466, 8184],
              [461, 8172],
              [458, 8176],
              [461, 8183],
              [466, 8184]
            ]
          ],
          [
            [
              [1908, 8186],
              [1900, 8181],
              [1892, 8179],
              [1891, 8183],
              [1908, 8186]
            ]
          ],
          [
            [
              [376, 8186],
              [374, 8184],
              [373, 8182],
              [373, 8188],
              [376, 8186]
            ]
          ],
          [
            [
              [469, 8189],
              [467, 8185],
              [463, 8185],
              [461, 8188],
              [469, 8189]
            ]
          ],
          [
            [
              [459, 8182],
              [456, 8186],
              [458, 8189],
              [461, 8189],
              [459, 8182]
            ]
          ],
          [
            [
              [457, 8191],
              [455, 8188],
              [450, 8188],
              [452, 8191],
              [457, 8191]
            ]
          ],
          [
            [
              [466, 8193],
              [468, 8190],
              [463, 8189],
              [464, 8192],
              [466, 8193]
            ]
          ],
          [
            [
              [445, 8201],
              [447, 8195],
              [445, 8192],
              [442, 8200],
              [445, 8201]
            ]
          ],
          [
            [
              [450, 8205],
              [451, 8201],
              [449, 8199],
              [443, 8205],
              [450, 8205]
            ]
          ],
          [
            [
              [357, 8210],
              [363, 8211],
              [363, 8207],
              [359, 8205],
              [357, 8210]
            ]
          ],
          [
            [
              [454, 8197],
              [452, 8207],
              [454, 8213],
              [457, 8201],
              [454, 8197]
            ]
          ],
          [
            [
              [426, 8213],
              [437, 8207],
              [438, 8201],
              [432, 8204],
              [426, 8213]
            ]
          ],
          [
            [
              [457, 8206],
              [457, 8209],
              [455, 8213],
              [460, 8213],
              [457, 8206]
            ]
          ],
          [
            [
              [419, 8224],
              [419, 8220],
              [417, 8220],
              [414, 8227],
              [419, 8224]
            ]
          ],
          [
            [
              [423, 8227],
              [427, 8221],
              [424, 8221],
              [420, 8229],
              [423, 8227]
            ]
          ],
          [
            [
              [1838, 8231],
              [1847, 8230],
              [1860, 8209],
              [1820, 8222],
              [1838, 8231]
            ]
          ],
          [
            [
              [1885, 8228],
              [1886, 8226],
              [1883, 8225],
              [1884, 8229],
              [1885, 8228]
            ]
          ],
          [
            [
              [438, 8235],
              [432, 8234],
              [431, 8236],
              [436, 8243],
              [438, 8235]
            ]
          ],
          [
            [
              [389, 8241],
              [391, 8247],
              [410, 8237],
              [408, 8228],
              [389, 8241]
            ]
          ],
          [
            [
              [403, 8246],
              [396, 8246],
              [394, 8249],
              [399, 8253],
              [403, 8246]
            ]
          ],
          [
            [
              [413, 8248],
              [426, 8236],
              [419, 8230],
              [397, 8255],
              [413, 8248]
            ]
          ],
          [
            [
              [387, 8266],
              [396, 8264],
              [399, 8260],
              [388, 8253],
              [387, 8266]
            ]
          ],
          [
            [
              [375, 8285],
              [384, 8286],
              [386, 8276],
              [378, 8280],
              [375, 8285]
            ]
          ],
          [
            [
              [1902, 8298],
              [1892, 8295],
              [1891, 8296],
              [1909, 8300],
              [1902, 8298]
            ]
          ],
          [
            [
              [393, 8293],
              [392, 8295],
              [401, 8304],
              [398, 8295],
              [393, 8293]
            ]
          ],
          [
            [
              [1911, 8347],
              [1917, 8362],
              [1920, 8362],
              [1920, 8351],
              [1911, 8347]
            ]
          ],
          [
            [
              [1893, 8369],
              [1893, 8362],
              [1881, 8352],
              [1892, 8362],
              [1893, 8369]
            ]
          ],
          [
            [
              [1885, 8380],
              [1882, 8379],
              [1885, 8383],
              [1889, 8378],
              [1885, 8380]
            ]
          ],
          [
            [
              [2248, 8441],
              [2244, 8442],
              [2245, 8445],
              [2247, 8446],
              [2248, 8441]
            ]
          ],
          [
            [
              [2203, 8471],
              [2194, 8469],
              [2194, 8477],
              [2201, 8477],
              [2203, 8471]
            ]
          ],
          [
            [
              [1869, 8501],
              [1874, 8503],
              [1876, 8501],
              [1873, 8498],
              [1869, 8501]
            ]
          ],
          [
            [
              [1881, 8509],
              [1884, 8509],
              [1880, 8505],
              [1875, 8504],
              [1881, 8509]
            ]
          ],
          [
            [
              [2332, 8541],
              [2340, 8527],
              [2331, 8531],
              [2328, 8536],
              [2332, 8541]
            ]
          ],
          [
            [
              [2232, 8541],
              [2239, 8535],
              [2235, 8528],
              [2222, 8528],
              [2232, 8541]
            ]
          ],
          [
            [
              [1933, 8552],
              [1929, 8549],
              [1919, 8546],
              [1922, 8549],
              [1933, 8552]
            ]
          ],
          [
            [
              [2329, 8587],
              [2327, 8574],
              [2308, 8586],
              [2321, 8591],
              [2329, 8587]
            ]
          ],
          [
            [
              [2300, 8597],
              [2302, 8593],
              [2295, 8595],
              [2299, 8599],
              [2300, 8597]
            ]
          ],
          [
            [
              [1502, 8602],
              [1495, 8597],
              [1491, 8601],
              [1496, 8601],
              [1502, 8602]
            ]
          ],
          [
            [
              [2321, 8601],
              [2328, 8594],
              [2318, 8595],
              [2315, 8599],
              [2321, 8601]
            ]
          ],
          [
            [
              [1897, 8622],
              [1900, 8604],
              [1888, 8586],
              [1875, 8594],
              [1874, 8611],
              [1897, 8622]
            ]
          ],
          [
            [
              [1516, 8622],
              [1517, 8624],
              [1522, 8623],
              [1520, 8621],
              [1516, 8622]
            ]
          ],
          [
            [
              [2332, 8629],
              [2340, 8629],
              [2335, 8621],
              [2325, 8624],
              [2332, 8629]
            ]
          ],
          [
            [
              [1944, 8630],
              [1937, 8631],
              [1951, 8631],
              [1947, 8629],
              [1944, 8630]
            ]
          ],
          [
            [
              [2326, 8630],
              [2319, 8629],
              [2322, 8632],
              [2325, 8632],
              [2326, 8630]
            ]
          ],
          [
            [
              [2044, 8638],
              [2056, 8635],
              [2058, 8632],
              [2046, 8633],
              [2044, 8638]
            ]
          ],
          [
            [
              [2152, 8643],
              [2170, 8631],
              [2154, 8630],
              [2139, 8645],
              [2152, 8643]
            ]
          ],
          [
            [
              [1818, 8649],
              [1823, 8636],
              [1788, 8612],
              [1772, 8611],
              [1765, 8627],
              [1784, 8647],
              [1818, 8649]
            ]
          ],
          [
            [
              [2271, 8648],
              [2270, 8647],
              [2262, 8655],
              [2266, 8653],
              [2271, 8648]
            ]
          ],
          [
            [
              [1927, 8673],
              [1949, 8671],
              [1952, 8659],
              [1941, 8654],
              [1927, 8673]
            ]
          ],
          [
            [
              [1566, 8673],
              [1564, 8671],
              [1563, 8674],
              [1557, 8676],
              [1566, 8673]
            ]
          ],
          [
            [
              [2347, 8678],
              [2343, 8673],
              [2345, 8666],
              [2338, 8679],
              [2347, 8678]
            ]
          ],
          [
            [
              [1965, 8681],
              [1982, 8672],
              [1969, 8669],
              [1956, 8678],
              [1965, 8681]
            ]
          ],
          [
            [
              [2345, 8686],
              [2342, 8686],
              [2342, 8690],
              [2347, 8688],
              [2345, 8686]
            ]
          ],
          [
            [
              [1953, 8698],
              [1947, 8694],
              [1940, 8696],
              [1941, 8698],
              [1953, 8698]
            ]
          ],
          [
            [
              [2325, 8707],
              [2323, 8706],
              [2321, 8713],
              [2326, 8710],
              [2325, 8707]
            ]
          ],
          [
            [
              [2072, 8720],
              [2071, 8712],
              [2068, 8712],
              [2067, 8722],
              [2072, 8720]
            ]
          ],
          [
            [
              [2314, 8731],
              [2316, 8727],
              [2303, 8721],
              [2309, 8729],
              [2314, 8731]
            ]
          ],
          [
            [
              [2398, 8781],
              [2404, 8781],
              [2407, 8776],
              [2397, 8777],
              [2398, 8781]
            ]
          ],
          [
            [
              [1783, 8786],
              [1777, 8784],
              [1776, 8787],
              [1781, 8787],
              [1783, 8786]
            ]
          ],
          [
            [
              [1730, 8796],
              [1740, 8787],
              [1742, 8772],
              [1730, 8781],
              [1730, 8796]
            ]
          ],
          [
            [
              [1752, 8799],
              [1770, 8791],
              [1781, 8775],
              [1758, 8782],
              [1752, 8799]
            ]
          ],
          [
            [
              [1788, 8808],
              [1795, 8806],
              [1792, 8803],
              [1783, 8806],
              [1788, 8808]
            ]
          ],
          [
            [
              [2399, 8852],
              [2400, 8851],
              [2387, 8843],
              [2392, 8851],
              [2399, 8852]
            ]
          ],
          [
            [
              [1073, 8847],
              [1068, 8847],
              [1066, 8851],
              [1067, 8852],
              [1073, 8847]
            ]
          ],
          [
            [
              [2365, 8859],
              [2371, 8857],
              [2368, 8856],
              [2357, 8857],
              [2365, 8859]
            ]
          ],
          [
            [
              [1058, 8863],
              [1056, 8858],
              [1051, 8863],
              [1058, 8867],
              [1058, 8863]
            ]
          ],
          [
            [
              [1043, 8870],
              [1046, 8870],
              [1044, 8866],
              [1040, 8869],
              [1043, 8870]
            ]
          ],
          [
            [
              [2359, 8868],
              [2351, 8869],
              [2354, 8875],
              [2358, 8870],
              [2359, 8868]
            ]
          ],
          [
            [
              [1057, 8870],
              [1051, 8870],
              [1051, 8876],
              [1055, 8875],
              [1057, 8870]
            ]
          ],
          [
            [
              [900, 8889],
              [894, 8889],
              [909, 8890],
              [909, 8889],
              [900, 8889]
            ]
          ],
          [
            [
              [1053, 8888],
              [1047, 8887],
              [1049, 8890],
              [1052, 8892],
              [1053, 8888]
            ]
          ],
          [
            [
              [1020, 8892],
              [1029, 8890],
              [1027, 8886],
              [1021, 8889],
              [1020, 8892]
            ]
          ],
          [
            [
              [1015, 8895],
              [1016, 8892],
              [1011, 8895],
              [1011, 8898],
              [1015, 8895]
            ]
          ],
          [
            [
              [1000, 8901],
              [1008, 8904],
              [998, 8897],
              [988, 8895],
              [1000, 8901]
            ]
          ],
          [
            [
              [2049, 8897],
              [2075, 8891],
              [2075, 8881],
              [2046, 8881],
              [2035, 8896],
              [2049, 8897]
            ]
          ],
          [
            [
              [1693, 8889],
              [1686, 8879],
              [1675, 8889],
              [1682, 8908],
              [1693, 8889]
            ]
          ],
          [
            [
              [946, 8904],
              [944, 8904],
              [945, 8908],
              [951, 8909],
              [946, 8904]
            ]
          ],
          [
            [
              [2010, 8909],
              [2024, 8905],
              [2026, 8870],
              [2002, 8855],
              [1969, 8854],
              [1959, 8878],
              [1978, 8906],
              [2010, 8909]
            ]
          ],
          [
            [
              [1910, 8902],
              [1905, 8904],
              [1906, 8910],
              [1916, 8907],
              [1910, 8902]
            ]
          ],
          [
            [
              [1818, 8911],
              [1821, 8910],
              [1819, 8908],
              [1814, 8911],
              [1818, 8911]
            ]
          ],
          [
            [
              [2052, 8905],
              [2046, 8915],
              [2050, 8915],
              [2055, 8910],
              [2052, 8905]
            ]
          ],
          [
            [
              [973, 8922],
              [974, 8920],
              [975, 8918],
              [964, 8917],
              [973, 8922]
            ]
          ],
          [
            [
              [1157, 8913],
              [1141, 8921],
              [1153, 8922],
              [1159, 8919],
              [1157, 8913]
            ]
          ],
          [
            [
              [1922, 8925],
              [1920, 8917],
              [1911, 8917],
              [1919, 8923],
              [1922, 8925]
            ]
          ],
          [
            [
              [2042, 8921],
              [2034, 8921],
              [2031, 8925],
              [2034, 8927],
              [2042, 8921]
            ]
          ],
          [
            [
              [2031, 8921],
              [2033, 8910],
              [2016, 8919],
              [2021, 8930],
              [2031, 8921]
            ]
          ],
          [
            [
              [1238, 8933],
              [1236, 8922],
              [1221, 8928],
              [1231, 8935],
              [1238, 8933]
            ]
          ],
          [
            [
              [1286, 8940],
              [1278, 8929],
              [1272, 8932],
              [1272, 8944],
              [1286, 8940]
            ]
          ],
          [
            [
              [1290, 8941],
              [1284, 8944],
              [1287, 8952],
              [1290, 8949],
              [1290, 8941]
            ]
          ],
          [
            [
              [227, 8951],
              [229, 8949],
              [223, 8949],
              [223, 8953],
              [227, 8951]
            ]
          ],
          [
            [
              [1242, 8948],
              [1243, 8956],
              [1246, 8954],
              [1245, 8950],
              [1242, 8948]
            ]
          ],
          [
            [
              [1926, 8964],
              [1926, 8956],
              [1914, 8939],
              [1898, 8940],
              [1926, 8964]
            ]
          ],
          [
            [
              [242, 8974],
              [247, 8978],
              [241, 8967],
              [234, 8970],
              [242, 8974]
            ]
          ],
          [
            [
              [1830, 8966],
              [1836, 8965],
              [1837, 8962],
              [1825, 8966],
              [1830, 8966]
            ]
          ],
          [
            [
              [1580, 8964],
              [1576, 8956],
              [1571, 8961],
              [1575, 8966],
              [1580, 8964]
            ]
          ],
          [
            [
              [1968, 8966],
              [1979, 8964],
              [1964, 8950],
              [1958, 8958],
              [1968, 8966]
            ]
          ],
          [
            [
              [1254, 8973],
              [1262, 8969],
              [1255, 8964],
              [1252, 8967],
              [1254, 8973]
            ]
          ],
          [
            [
              [1390, 8973],
              [1404, 8973],
              [1404, 8962],
              [1392, 8969],
              [1390, 8973]
            ]
          ],
          [
            [
              [2255, 8973],
              [2245, 8970],
              [2242, 8971],
              [2249, 8976],
              [2255, 8973]
            ]
          ],
          [
            [
              [1418, 8976],
              [1427, 8971],
              [1417, 8961],
              [1417, 8973],
              [1418, 8976]
            ]
          ],
          [
            [
              [144, 8975],
              [137, 8972],
              [133, 8974],
              [137, 8978],
              [144, 8975]
            ]
          ],
          [
            [
              [2238, 8981],
              [2242, 8977],
              [2235, 8972],
              [2225, 8975],
              [2238, 8981]
            ]
          ],
          [
            [
              [1940, 8980],
              [1924, 8969],
              [1914, 8970],
              [1931, 8982],
              [1940, 8980]
            ]
          ],
          [
            [
              [1890, 8987],
              [1894, 8977],
              [1858, 8979],
              [1874, 8986],
              [1890, 8987]
            ]
          ],
          [
            [
              [1807, 8984],
              [1805, 8983],
              [1797, 8985],
              [1802, 8987],
              [1807, 8984]
            ]
          ],
          [
            [
              [1776, 8985],
              [1771, 8982],
              [1766, 8984],
              [1767, 8987],
              [1776, 8985]
            ]
          ],
          [
            [
              [1532, 8987],
              [1534, 8990],
              [1541, 8987],
              [1540, 8982],
              [1532, 8987]
            ]
          ],
          [
            [
              [1369, 8991],
              [1365, 8991],
              [1365, 8994],
              [1369, 8994],
              [1369, 8991]
            ]
          ],
          [
            [
              [1674, 9003],
              [1686, 9002],
              [1681, 8995],
              [1663, 9002],
              [1674, 9003]
            ]
          ],
          [
            [
              [947, 9013],
              [934, 9012],
              [928, 9016],
              [940, 9013],
              [947, 9013]
            ]
          ],
          [
            [
              [806, 9025],
              [815, 9025],
              [801, 9022],
              [796, 9026],
              [806, 9025]
            ]
          ],
          [
            [
              [793, 9026],
              [783, 9025],
              [780, 9027],
              [782, 9028],
              [793, 9026]
            ]
          ],
          [
            [
              [463, 9029],
              [458, 9028],
              [455, 9025],
              [458, 9031],
              [463, 9029]
            ]
          ],
          [
            [
              [1270, 9033],
              [1276, 9033],
              [1284, 9021],
              [1271, 9026],
              [1270, 9033]
            ]
          ],
          [
            [
              [2082, 9073],
              [2092, 9074],
              [2087, 9067],
              [2079, 9069],
              [2082, 9073]
            ]
          ],
          [
            [
              [2095, 9079],
              [2087, 9080],
              [2089, 9085],
              [2095, 9086],
              [2095, 9079]
            ]
          ],
          [
            [
              [1155, 9178],
              [1135, 9152],
              [1099, 9184],
              [1083, 9188],
              [1096, 9201],
              [1138, 9203],
              [1158, 9192],
              [1155, 9178]
            ]
          ],
          [
            [
              [1356, 9245],
              [1360, 9221],
              [1345, 9210],
              [1322, 9206],
              [1307, 9212],
              [1345, 9223],
              [1356, 9245]
            ]
          ],
          [
            [
              [1180, 9293],
              [1166, 9277],
              [1146, 9283],
              [1169, 9302],
              [1180, 9293]
            ]
          ],
          [
            [
              [770, 9343],
              [761, 9319],
              [742, 9306],
              [718, 9312],
              [742, 9331],
              [770, 9343]
            ]
          ],
          [
            [
              [1193, 9337],
              [1221, 9336],
              [1182, 9329],
              [1162, 9340],
              [1164, 9349],
              [1210, 9355],
              [1216, 9345],
              [1193, 9337]
            ]
          ],
          [
            [
              [1175, 9374],
              [1202, 9361],
              [1162, 9355],
              [1154, 9372],
              [1175, 9374]
            ]
          ],
          [
            [
              [1577, 9437],
              [1596, 9418],
              [1583, 9410],
              [1550, 9423],
              [1551, 9436],
              [1577, 9437]
            ]
          ],
          [
            [
              [1143, 9423],
              [1160, 9416],
              [1159, 9407],
              [1137, 9407],
              [1111, 9443],
              [1128, 9442],
              [1143, 9423]
            ]
          ],
          [
            [
              [1263, 9444],
              [1218, 9443],
              [1220, 9453],
              [1242, 9453],
              [1263, 9444]
            ]
          ],
          [
            [
              [869, 9461],
              [890, 9448],
              [873, 9441],
              [845, 9458],
              [869, 9461]
            ]
          ],
          [
            [
              [1307, 9599],
              [1329, 9589],
              [1325, 9569],
              [1285, 9594],
              [1307, 9599]
            ]
          ],
          [
            [
              [1716, 8019],
              [1712, 8017],
              [1705, 8018],
              [1708, 8021],
              [1716, 8019]
            ]
          ],
          [
            [
              [1652, 8060],
              [1656, 8057],
              [1645, 8056],
              [1646, 8061],
              [1652, 8060]
            ]
          ],
          [
            [
              [1814, 7955],
              [1823, 7953],
              [1827, 7936],
              [1785, 7949],
              [1814, 7955]
            ]
          ],
          [
            [
              [1783, 7952],
              [1782, 7949],
              [1778, 7950],
              [1780, 7953],
              [1783, 7952]
            ]
          ],
          [
            [
              [1420, 9446],
              [1479, 9446],
              [1490, 9443],
              [1482, 9426],
              [1409, 9427],
              [1402, 9441],
              [1420, 9446]
            ]
          ],
          [
            [
              [2477, 7954],
              [2441, 7934],
              [2425, 7955],
              [2453, 7992],
              [2458, 7964],
              [2477, 7954]
            ]
          ],
          [
            [
              [2364, 7962],
              [2340, 7979],
              [2350, 7982],
              [2375, 7969],
              [2401, 7967],
              [2395, 7953],
              [2364, 7962]
            ]
          ],
          [
            [
              [338, 8220],
              [330, 8227],
              [353, 8232],
              [355, 8210],
              [338, 8220]
            ]
          ],
          [
            [
              [317, 8269],
              [343, 8262],
              [357, 8268],
              [347, 8232],
              [322, 8240],
              [317, 8269]
            ]
          ],
          [
            [
              [1894, 8346],
              [1880, 8339],
              [1902, 8371],
              [1908, 8362],
              [1894, 8346]
            ]
          ],
          [
            [
              [1013, 9481],
              [986, 9478],
              [962, 9485],
              [954, 9478],
              [932, 9484],
              [906, 9478],
              [900, 9486],
              [983, 9510],
              [1011, 9498],
              [1013, 9481]
            ]
          ],
          [
            [
              [1761, 7963],
              [1761, 7965],
              [1769, 7962],
              [1764, 7957],
              [1764, 7956],
              [1761, 7961],
              [1761, 7963]
            ]
          ],
          [
            [
              [576, 8086],
              [563, 8094],
              [573, 8093],
              [576, 8086],
              [576, 8086],
              [576, 8086]
            ]
          ],
          [
            [
              [2276, 8902],
              [2285, 8891],
              [2324, 8895],
              [2355, 8857],
              [2334, 8849],
              [2382, 8857],
              [2372, 8837],
              [2411, 8844],
              [2432, 8826],
              [2417, 8824],
              [2427, 8811],
              [2395, 8804],
              [2413, 8794],
              [2399, 8792],
              [2394, 8777],
              [2362, 8767],
              [2373, 8755],
              [2366, 8740],
              [2340, 8758],
              [2336, 8749],
              [2308, 8781],
              [2327, 8795],
              [2296, 8791],
              [2268, 8820],
              [2260, 8809],
              [2238, 8816],
              [2260, 8793],
              [2237, 8788],
              [2236, 8772],
              [2266, 8762],
              [2265, 8750],
              [2306, 8733],
              [2302, 8720],
              [2333, 8696],
              [2335, 8687],
              [2334, 8687],
              [2334, 8692],
              [2325, 8689],
              [2335, 8684],
              [2338, 8664],
              [2320, 8676],
              [2334, 8646],
              [2316, 8640],
              [2277, 8650],
              [2249, 8671],
              [2246, 8655],
              [2295, 8613],
              [2285, 8598],
              [2254, 8611],
              [2218, 8616],
              [2187, 8635],
              [2168, 8639],
              [2125, 8659],
              [2129, 8677],
              [2097, 8690],
              [2074, 8726],
              [2056, 8731],
              [2037, 8715],
              [2004, 8727],
              [1978, 8706],
              [1944, 8715],
              [1935, 8742],
              [1960, 8754],
              [1956, 8767],
              [2006, 8755],
              [2052, 8770],
              [2073, 8767],
              [2068, 8779],
              [2043, 8800],
              [2088, 8829],
              [2093, 8844],
              [2111, 8856],
              [2087, 8905],
              [2062, 8910],
              [2066, 8926],
              [2051, 8919],
              [2014, 8945],
              [1980, 8928],
              [1980, 8945],
              [1999, 8944],
              [2010, 8956],
              [1963, 8978],
              [1972, 8986],
              [1949, 8987],
              [1949, 9006],
              [1912, 9013],
              [1916, 8990],
              [1890, 8988],
              [1883, 8995],
              [1829, 9003],
              [1817, 8985],
              [1790, 8997],
              [1772, 8993],
              [1696, 9002],
              [1675, 9021],
              [1674, 9011],
              [1624, 9021],
              [1599, 9055],
              [1635, 9047],
              [1663, 9047],
              [1642, 9061],
              [1591, 9068],
              [1592, 9091],
              [1583, 9100],
              [1598, 9148],
              [1616, 9176],
              [1652, 9201],
              [1682, 9208],
              [1730, 9206],
              [1734, 9198],
              [1703, 9177],
              [1683, 9150],
              [1694, 9132],
              [1692, 9105],
              [1737, 9065],
              [1704, 9059],
              [1737, 9058],
              [1744, 9086],
              [1725, 9086],
              [1717, 9099],
              [1719, 9119],
              [1748, 9111],
              [1712, 9140],
              [1717, 9159],
              [1756, 9149],
              [1728, 9161],
              [1727, 9173],
              [1743, 9182],
              [1797, 9202],
              [1835, 9201],
              [1847, 9174],
              [1862, 9170],
              [1873, 9146],
              [1865, 9125],
              [1852, 9116],
              [1856, 9102],
              [1886, 9132],
              [1902, 9126],
              [1912, 9105],
              [1926, 9137],
              [1951, 9146],
              [2022, 9132],
              [2030, 9119],
              [2020, 9111],
              [2050, 9109],
              [2049, 9090],
              [2069, 9091],
              [2058, 9079],
              [2085, 9064],
              [2102, 9085],
              [2129, 9078],
              [2142, 9064],
              [2133, 9054],
              [2115, 9054],
              [2113, 9048],
              [2121, 9053],
              [2133, 9045],
              [2114, 9040],
              [2112, 9043],
              [2110, 9037],
              [2136, 9044],
              [2152, 9056],
              [2160, 9046],
              [2140, 9027],
              [2178, 9043],
              [2224, 9027],
              [2220, 9016],
              [2185, 9004],
              [2214, 9007],
              [2207, 8994],
              [2224, 9000],
              [2233, 9013],
              [2257, 8994],
              [2260, 8982],
              [2234, 8984],
              [2213, 8978],
              [2234, 8968],
              [2257, 8968],
              [2270, 8951],
              [2219, 8954],
              [2242, 8946],
              [2241, 8933],
              [2238, 8931],
              [2228, 8933],
              [2223, 8934],
              [2235, 8930],
              [2223, 8923],
              [2267, 8914],
              [2276, 8903],
              [2279, 8905],
              [2286, 8905],
              [2285, 8901],
              [2276, 8902]
            ]
          ],
          [
            [
              [1993, 7889],
              [1993, 7890],
              [1993, 7889],
              [1988, 7888],
              [1984, 7885],
              [1986, 7889],
              [1993, 7889]
            ]
          ],
          [
            [
              [785, 9426],
              [807, 9432],
              [837, 9416],
              [812, 9409],
              [822, 9378],
              [787, 9367],
              [779, 9351],
              [760, 9360],
              [768, 9383],
              [745, 9380],
              [728, 9341],
              [716, 9358],
              [716, 9338],
              [687, 9325],
              [675, 9348],
              [675, 9332],
              [646, 9338],
              [629, 9332],
              [617, 9350],
              [631, 9361],
              [655, 9362],
              [669, 9377],
              [690, 9386],
              [698, 9397],
              [736, 9420],
              [764, 9421],
              [783, 9415],
              [785, 9426]
            ]
          ],
          [
            [
              [2675, 8044],
              [2661, 8036],
              [2651, 8017],
              [2660, 8011],
              [2679, 8031],
              [2671, 8007],
              [2683, 8020],
              [2688, 8010],
              [2678, 7983],
              [2660, 7976],
              [2658, 7990],
              [2642, 7988],
              [2653, 8006],
              [2643, 8010],
              [2620, 8002],
              [2610, 7988],
              [2596, 7985],
              [2591, 8008],
              [2598, 8016],
              [2563, 8010],
              [2528, 8017],
              [2495, 8011],
              [2488, 8024],
              [2517, 8047],
              [2508, 8049],
              [2531, 8089],
              [2548, 8127],
              [2567, 8155],
              [2587, 8158],
              [2599, 8141],
              [2567, 8106],
              [2564, 8087],
              [2584, 8110],
              [2604, 8101],
              [2591, 8093],
              [2598, 8080],
              [2645, 8094],
              [2663, 8075],
              [2648, 8059],
              [2650, 8049],
              [2675, 8044]
            ]
          ],
          [
            [
              [1714, 8662],
              [1715, 8682],
              [1669, 8678],
              [1677, 8694],
              [1697, 8701],
              [1691, 8725],
              [1699, 8741],
              [1705, 8781],
              [1719, 8789],
              [1724, 8771],
              [1738, 8755],
              [1745, 8768],
              [1786, 8742],
              [1812, 8733],
              [1835, 8708],
              [1822, 8697],
              [1854, 8703],
              [1874, 8688],
              [1850, 8671],
              [1819, 8683],
              [1811, 8693],
              [1776, 8702],
              [1773, 8686],
              [1754, 8680],
              [1745, 8665],
              [1725, 8656],
              [1714, 8662]
            ]
          ],
          [
            [
              [1349, 8990],
              [1383, 8969],
              [1406, 8956],
              [1413, 8938],
              [1432, 8936],
              [1393, 8915],
              [1365, 8920],
              [1303, 8946],
              [1338, 8962],
              [1333, 8974],
              [1349, 8990]
            ]
          ],
          [
            [
              [1207, 9024],
              [1246, 9002],
              [1261, 9006],
              [1265, 8985],
              [1241, 8978],
              [1220, 8987],
              [1217, 8973],
              [1187, 8976],
              [1207, 8964],
              [1230, 8969],
              [1236, 8946],
              [1190, 8933],
              [1146, 8946],
              [1102, 8954],
              [1099, 8969],
              [1074, 8945],
              [1039, 8941],
              [1027, 8931],
              [967, 8921],
              [900, 8916],
              [888, 8934],
              [887, 8954],
              [866, 8959],
              [820, 8960],
              [800, 8968],
              [776, 8996],
              [790, 9003],
              [872, 9013],
              [921, 9007],
              [951, 9011],
              [932, 9023],
              [878, 9034],
              [817, 9026],
              [812, 9030],
              [772, 9029],
              [749, 9051],
              [816, 9070],
              [824, 9079],
              [773, 9070],
              [755, 9070],
              [758, 9086],
              [729, 9084],
              [728, 9100],
              [756, 9117],
              [742, 9128],
              [779, 9155],
              [861, 9182],
              [879, 9168],
              [877, 9149],
              [860, 9138],
              [886, 9138],
              [907, 9161],
              [960, 9145],
              [941, 9125],
              [947, 9120],
              [978, 9138],
              [1002, 9132],
              [975, 9161],
              [994, 9160],
              [1036, 9136],
              [1035, 9124],
              [1063, 9084],
              [1077, 9099],
              [1061, 9112],
              [1052, 9147],
              [1050, 9177],
              [1055, 9191],
              [1079, 9171],
              [1099, 9173],
              [1132, 9148],
              [1134, 9130],
              [1149, 9097],
              [1162, 9081],
              [1155, 9054],
              [1173, 9037],
              [1207, 9024]
            ]
          ],
          [
            [
              [1935, 9198],
              [1963, 9189],
              [1991, 9165],
              [1989, 9150],
              [1934, 9154],
              [1905, 9146],
              [1881, 9152],
              [1876, 9173],
              [1858, 9176],
              [1855, 9203],
              [1897, 9196],
              [1935, 9198]
            ]
          ],
          [
            [
              [1236, 9122],
              [1209, 9150],
              [1217, 9162],
              [1233, 9165],
              [1252, 9144],
              [1277, 9145],
              [1289, 9154],
              [1284, 9168],
              [1243, 9188],
              [1275, 9194],
              [1258, 9202],
              [1297, 9214],
              [1314, 9202],
              [1371, 9209],
              [1375, 9182],
              [1339, 9163],
              [1376, 9160],
              [1386, 9154],
              [1400, 9128],
              [1394, 9100],
              [1366, 9083],
              [1345, 9085],
              [1343, 9072],
              [1328, 9064],
              [1272, 9115],
              [1236, 9122]
            ]
          ],
          [
            [
              [654, 9250],
              [696, 9233],
              [727, 9229],
              [758, 9233],
              [793, 9222],
              [839, 9187],
              [805, 9175],
              [726, 9139],
              [720, 9123],
              [696, 9113],
              [682, 9076],
              [610, 9054],
              [581, 9088],
              [546, 9102],
              [527, 9102],
              [553, 9150],
              [569, 9156],
              [558, 9164],
              [590, 9204],
              [579, 9209],
              [561, 9237],
              [654, 9250]
            ]
          ],
          [
            [
              [1378, 9305],
              [1398, 9315],
              [1415, 9306],
              [1448, 9320],
              [1482, 9292],
              [1479, 9255],
              [1436, 9257],
              [1428, 9246],
              [1412, 9251],
              [1423, 9265],
              [1390, 9275],
              [1403, 9303],
              [1383, 9297],
              [1378, 9305]
            ]
          ],
          [
            [
              [1349, 9277],
              [1281, 9277],
              [1269, 9302],
              [1296, 9315],
              [1248, 9312],
              [1213, 9305],
              [1215, 9319],
              [1193, 9321],
              [1201, 9330],
              [1225, 9335],
              [1251, 9322],
              [1234, 9341],
              [1250, 9351],
              [1229, 9349],
              [1237, 9364],
              [1296, 9333],
              [1257, 9371],
              [1262, 9381],
              [1301, 9375],
              [1318, 9360],
              [1323, 9374],
              [1360, 9365],
              [1367, 9304],
              [1348, 9305],
              [1362, 9285],
              [1349, 9277]
            ]
          ],
          [
            [
              [1028, 9305],
              [1030, 9317],
              [994, 9329],
              [1016, 9342],
              [985, 9354],
              [1011, 9380],
              [1032, 9389],
              [1039, 9361],
              [1052, 9353],
              [1040, 9338],
              [1058, 9340],
              [1058, 9330],
              [1083, 9329],
              [1096, 9339],
              [1121, 9335],
              [1132, 9314],
              [1114, 9279],
              [1069, 9272],
              [1064, 9280],
              [1043, 9271],
              [1030, 9280],
              [1008, 9267],
              [987, 9267],
              [947, 9246],
              [907, 9240],
              [887, 9243],
              [865, 9258],
              [913, 9275],
              [943, 9275],
              [969, 9290],
              [927, 9283],
              [879, 9280],
              [876, 9297],
              [865, 9280],
              [850, 9274],
              [840, 9285],
              [827, 9274],
              [774, 9288],
              [783, 9304],
              [818, 9305],
              [847, 9318],
              [815, 9310],
              [784, 9310],
              [793, 9323],
              [852, 9328],
              [798, 9330],
              [798, 9339],
              [825, 9350],
              [821, 9357],
              [851, 9367],
              [852, 9383],
              [865, 9390],
              [892, 9387],
              [888, 9379],
              [865, 9380],
              [879, 9347],
              [908, 9352],
              [953, 9326],
              [959, 9307],
              [981, 9310],
              [1028, 9305]
            ]
          ],
          [
            [
              [1898, 9268],
              [1873, 9261],
              [1876, 9254],
              [1828, 9244],
              [1794, 9249],
              [1788, 9266],
              [1777, 9251],
              [1755, 9247],
              [1655, 9244],
              [1629, 9246],
              [1629, 9270],
              [1620, 9256],
              [1587, 9248],
              [1549, 9260],
              [1526, 9263],
              [1512, 9289],
              [1526, 9312],
              [1523, 9328],
              [1508, 9336],
              [1493, 9358],
              [1466, 9351],
              [1414, 9360],
              [1395, 9378],
              [1385, 9396],
              [1415, 9402],
              [1476, 9392],
              [1495, 9374],
              [1543, 9378],
              [1569, 9370],
              [1572, 9361],
              [1606, 9354],
              [1604, 9347],
              [1549, 9346],
              [1580, 9340],
              [1553, 9338],
              [1558, 9331],
              [1585, 9337],
              [1609, 9323],
              [1618, 9301],
              [1623, 9317],
              [1639, 9307],
              [1663, 9312],
              [1692, 9301],
              [1703, 9308],
              [1746, 9313],
              [1770, 9325],
              [1789, 9320],
              [1812, 9326],
              [1848, 9322],
              [1891, 9304],
              [1891, 9286],
              [1867, 9278],
              [1893, 9277],
              [1898, 9268]
            ]
          ],
          [
            [
              [901, 9430],
              [900, 9454],
              [910, 9456],
              [975, 9467],
              [1005, 9466],
              [1005, 9458],
              [971, 9452],
              [992, 9446],
              [989, 9429],
              [934, 9417],
              [901, 9430]
            ]
          ],
          [
            [
              [1345, 9513],
              [1366, 9512],
              [1404, 9500],
              [1411, 9491],
              [1443, 9483],
              [1427, 9476],
              [1441, 9467],
              [1427, 9458],
              [1383, 9447],
              [1356, 9463],
              [1383, 9469],
              [1355, 9475],
              [1338, 9492],
              [1345, 9513]
            ]
          ],
          [
            [
              [1131, 9547],
              [1181, 9549],
              [1199, 9544],
              [1219, 9526],
              [1242, 9530],
              [1304, 9499],
              [1294, 9488],
              [1319, 9465],
              [1320, 9453],
              [1293, 9446],
              [1273, 9451],
              [1259, 9473],
              [1227, 9479],
              [1209, 9473],
              [1210, 9485],
              [1159, 9478],
              [1142, 9493],
              [1154, 9498],
              [1186, 9492],
              [1188, 9511],
              [1166, 9511],
              [1170, 9524],
              [1142, 9513],
              [1153, 9526],
              [1127, 9527],
              [1131, 9547]
            ]
          ],
          [
            [
              [1490, 9686],
              [1533, 9671],
              [1564, 9630],
              [1606, 9628],
              [1614, 9605],
              [1640, 9598],
              [1624, 9611],
              [1631, 9621],
              [1653, 9620],
              [1657, 9604],
              [1675, 9585],
              [1669, 9563],
              [1685, 9568],
              [1716, 9563],
              [1735, 9544],
              [1689, 9529],
              [1658, 9503],
              [1647, 9500],
              [1615, 9471],
              [1585, 9500],
              [1602, 9471],
              [1582, 9481],
              [1575, 9469],
              [1526, 9474],
              [1501, 9493],
              [1534, 9496],
              [1491, 9498],
              [1460, 9523],
              [1490, 9536],
              [1530, 9536],
              [1510, 9545],
              [1532, 9548],
              [1509, 9555],
              [1470, 9542],
              [1472, 9551],
              [1452, 9547],
              [1416, 9552],
              [1420, 9562],
              [1446, 9565],
              [1459, 9575],
              [1413, 9568],
              [1390, 9584],
              [1388, 9602],
              [1443, 9595],
              [1465, 9604],
              [1426, 9600],
              [1392, 9610],
              [1410, 9618],
              [1408, 9631],
              [1433, 9633],
              [1404, 9637],
              [1452, 9641],
              [1423, 9647],
              [1442, 9665],
              [1493, 9667],
              [1491, 9675],
              [1456, 9678],
              [1462, 9686],
              [1490, 9686]
            ]
          ],
          [
            [
              [1934, 9458],
              [1951, 9448],
              [1931, 9421],
              [1906, 9415],
              [1857, 9418],
              [1834, 9429],
              [1848, 9415],
              [1889, 9412],
              [1910, 9404],
              [1899, 9392],
              [1942, 9395],
              [1946, 9376],
              [1925, 9364],
              [1917, 9371],
              [1903, 9355],
              [1916, 9342],
              [1914, 9327],
              [1888, 9328],
              [1902, 9338],
              [1900, 9354],
              [1849, 9343],
              [1858, 9361],
              [1823, 9366],
              [1813, 9360],
              [1765, 9364],
              [1735, 9361],
              [1750, 9354],
              [1662, 9363],
              [1655, 9356],
              [1633, 9360],
              [1628, 9381],
              [1618, 9361],
              [1584, 9365],
              [1569, 9379],
              [1586, 9387],
              [1597, 9374],
              [1599, 9388],
              [1636, 9406],
              [1656, 9403],
              [1677, 9414],
              [1654, 9419],
              [1639, 9447],
              [1668, 9454],
              [1704, 9442],
              [1710, 9424],
              [1761, 9422],
              [1781, 9429],
              [1806, 9458],
              [1798, 9461],
              [1780, 9435],
              [1765, 9428],
              [1717, 9431],
              [1728, 9448],
              [1714, 9457],
              [1731, 9464],
              [1734, 9483],
              [1719, 9468],
              [1697, 9464],
              [1695, 9473],
              [1660, 9468],
              [1660, 9489],
              [1686, 9512],
              [1726, 9519],
              [1786, 9512],
              [1828, 9516],
              [1837, 9528],
              [1806, 9517],
              [1754, 9522],
              [1740, 9527],
              [1753, 9538],
              [1732, 9566],
              [1690, 9575],
              [1694, 9590],
              [1685, 9602],
              [1691, 9613],
              [1769, 9609],
              [1816, 9583],
              [1832, 9564],
              [1862, 9565],
              [1836, 9573],
              [1838, 9588],
              [1817, 9593],
              [1786, 9613],
              [1870, 9624],
              [1879, 9627],
              [1939, 9632],
              [1882, 9633],
              [1924, 9645],
              [1982, 9649],
              [1981, 9653],
              [1914, 9650],
              [1913, 9661],
              [1951, 9683],
              [1934, 9681],
              [1900, 9660],
              [1892, 9648],
              [1845, 9634],
              [1795, 9628],
              [1789, 9636],
              [1817, 9641],
              [1822, 9649],
              [1783, 9639],
              [1767, 9644],
              [1768, 9630],
              [1751, 9626],
              [1700, 9628],
              [1681, 9633],
              [1709, 9656],
              [1727, 9662],
              [1810, 9673],
              [1721, 9664],
              [1700, 9660],
              [1666, 9635],
              [1642, 9638],
              [1604, 9652],
              [1632, 9660],
              [1683, 9660],
              [1741, 9680],
              [1726, 9681],
              [1688, 9669],
              [1591, 9661],
              [1575, 9672],
              [1604, 9678],
              [1588, 9684],
              [1633, 9701],
              [1571, 9686],
              [1561, 9693],
              [1598, 9704],
              [1565, 9708],
              [1542, 9697],
              [1528, 9704],
              [1556, 9719],
              [1593, 9725],
              [1604, 9718],
              [1613, 9730],
              [1642, 9738],
              [1711, 9730],
              [1740, 9730],
              [1682, 9741],
              [1679, 9747],
              [1723, 9752],
              [1711, 9764],
              [1772, 9756],
              [1804, 9738],
              [1793, 9752],
              [1880, 9728],
              [1801, 9758],
              [1819, 9780],
              [1863, 9771],
              [1834, 9788],
              [1884, 9786],
              [1876, 9799],
              [1900, 9802],
              [1910, 9794],
              [1944, 9798],
              [1965, 9794],
              [1982, 9780],
              [2002, 9774],
              [1979, 9795],
              [1958, 9803],
              [1994, 9808],
              [2052, 9804],
              [2062, 9794],
              [2099, 9782],
              [2068, 9798],
              [2088, 9809],
              [2185, 9812],
              [2187, 9803],
              [2229, 9804],
              [2281, 9799],
              [2283, 9796],
              [2216, 9776],
              [2251, 9778],
              [2298, 9792],
              [2310, 9787],
              [2332, 9797],
              [2339, 9786],
              [2369, 9791],
              [2363, 9783],
              [2385, 9768],
              [2424, 9766],
              [2437, 9758],
              [2432, 9745],
              [2404, 9732],
              [2341, 9711],
              [2312, 9714],
              [2298, 9704],
              [2256, 9700],
              [2274, 9695],
              [2173, 9671],
              [2191, 9673],
              [2301, 9695],
              [2336, 9699],
              [2332, 9687],
              [2294, 9676],
              [2274, 9663],
              [2226, 9643],
              [2194, 9619],
              [2162, 9615],
              [2177, 9609],
              [2111, 9595],
              [2156, 9601],
              [2155, 9591],
              [2132, 9574],
              [2110, 9569],
              [2085, 9579],
              [2051, 9584],
              [2033, 9581],
              [2076, 9576],
              [2082, 9561],
              [2057, 9555],
              [2026, 9558],
              [2027, 9550],
              [1993, 9558],
              [2001, 9548],
              [1957, 9555],
              [1959, 9543],
              [2044, 9540],
              [2043, 9527],
              [2002, 9532],
              [1996, 9538],
              [1938, 9537],
              [1995, 9533],
              [1942, 9529],
              [1948, 9523],
              [1977, 9527],
              [2005, 9524],
              [1985, 9516],
              [2019, 9517],
              [2039, 9511],
              [2034, 9498],
              [2016, 9493],
              [1984, 9495],
              [2025, 9484],
              [2009, 9473],
              [1973, 9472],
              [2011, 9467],
              [1972, 9454],
              [1934, 9458]
            ]
          ],
          [
            [
              [576, 8086],
              [578, 8085],
              [578, 8083],
              [576, 8086],
              [576, 8086],
              [576, 8086]
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'ST',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.55,
        'hc-middle-y': 0.5,
        'hc-key': 'st',
        'hc-a2': 'ST',
        name: 'Sao Tome and Principe',
        labelrank: '6',
        'country-abbrev': 'S.T.P.',
        subregion: 'Middle Africa',
        'region-wb': 'Sub-Saharan Africa',
        'iso-a3': 'STP',
        'iso-a2': 'ST',
        'woe-id': '23424966',
        continent: 'Africa'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [4435, 6502],
            [4430, 6506],
            [4435, 6512],
            [4439, 6508],
            [4435, 6502]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'TZ',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.5,
        'hc-middle-y': 0.5,
        'hc-key': 'tz',
        'hc-a2': 'TZ',
        name: 'United Republic of Tanzania',
        labelrank: '3',
        'country-abbrev': 'Tanz.',
        subregion: 'Eastern Africa',
        'region-wb': 'Sub-Saharan Africa',
        'iso-a3': 'TZA',
        'iso-a2': 'TZ',
        'woe-id': '23424973',
        continent: 'Africa'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [5178, 6471],
            [5172, 6440],
            [5181, 6429],
            [5219, 6426],
            [5237, 6435],
            [5208, 6439],
            [5227, 6446],
            [5244, 6469],
            [5350, 6411],
            [5353, 6393],
            [5395, 6363],
            [5415, 6346],
            [5399, 6332],
            [5406, 6312],
            [5391, 6310],
            [5403, 6299],
            [5399, 6271],
            [5400, 6244],
            [5413, 6210],
            [5432, 6192],
            [5419, 6182],
            [5375, 6164],
            [5363, 6169],
            [5345, 6155],
            [5332, 6160],
            [5307, 6156],
            [5296, 6164],
            [5271, 6159],
            [5271, 6162],
            [5269, 6164],
            [5269, 6165],
            [5265, 6166],
            [5264, 6168],
            [5264, 6168],
            [5263, 6169],
            [5256, 6208],
            [5251, 6215],
            [5248, 6218],
            [5248, 6218],
            [5245, 6220],
            [5245, 6221],
            [5245, 6221],
            [5241, 6219],
            [5240, 6214],
            [5225, 6218],
            [5210, 6224],
            [5183, 6233],
            [5159, 6248],
            [5141, 6280],
            [5141, 6296],
            [5116, 6323],
            [5123, 6326],
            [5114, 6370],
            [5124, 6375],
            [5148, 6405],
            [5137, 6416],
            [5141, 6430],
            [5149, 6431],
            [5149, 6453],
            [5138, 6469],
            [5149, 6471],
            [5177, 6471],
            [5177, 6469],
            [5178, 6471],
            [5178, 6471]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'CV',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.56,
        'hc-middle-y': 0.5,
        'hc-key': 'cv',
        'hc-a2': 'CV',
        name: 'Cape Verde',
        labelrank: '4',
        'country-abbrev': 'C.Vd.',
        subregion: 'Western Africa',
        'region-wb': 'Sub-Saharan Africa',
        'iso-a3': 'CPV',
        'iso-a2': 'CV',
        'woe-id': '23424794',
        continent: 'Africa'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [3540, 6952],
            [3546, 6946],
            [3547, 6940],
            [3539, 6944],
            [3540, 6952]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'DM',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.54,
        'hc-middle-y': 0.47,
        'hc-key': 'dm',
        'hc-a2': 'DM',
        name: 'Dominica',
        labelrank: '6',
        'country-abbrev': "D'inca",
        subregion: 'Caribbean',
        'region-wb': 'Latin America & Caribbean',
        'iso-a3': 'DMA',
        'iso-a2': 'DM',
        'woe-id': '23424798',
        continent: 'North America'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [2429, 6961],
            [2433, 6955],
            [2430, 6949],
            [2427, 6957],
            [2429, 6961]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'NL',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.99,
        'hc-middle-y': 0.0,
        'hc-key': 'nl',
        'hc-a2': 'NL',
        name: 'Netherlands',
        labelrank: '5',
        'country-abbrev': 'Neth.',
        subregion: 'Western Europe',
        'region-wb': 'Europe & Central Asia',
        'iso-a3': 'NLD',
        'iso-a2': 'NL',
        'woe-id': '-90',
        continent: 'Europe'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [4404, 8239],
              [4393, 8236],
              [4394, 8238],
              [4406, 8240],
              [4404, 8239]
            ]
          ],
          [
            [
              [2381, 7034],
              [2379, 7034],
              [2379, 7035],
              [2381, 7034]
            ]
          ],
          [
            [
              [4338, 8157],
              [4350, 8156],
              [4364, 8157],
              [4352, 8151],
              [4338, 8157]
            ]
          ],
          [
            [
              [4452, 8231],
              [4447, 8191],
              [4428, 8175],
              [4416, 8133],
              [4411, 8149],
              [4387, 8161],
              [4365, 8157],
              [4353, 8166],
              [4373, 8195],
              [4383, 8230],
              [4389, 8220],
              [4404, 8234],
              [4430, 8244],
              [4452, 8231]
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'JM',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.5,
        'hc-middle-y': 0.5,
        'hc-key': 'jm',
        'hc-a2': 'JM',
        name: 'Jamaica',
        labelrank: '4',
        'country-abbrev': 'Jam.',
        subregion: 'Caribbean',
        'region-wb': 'Latin America & Caribbean',
        'iso-a3': 'JAM',
        'iso-a2': 'JM',
        'woe-id': '23424858',
        continent: 'North America'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [1956, 7047],
            [1972, 7045],
            [1993, 7030],
            [1973, 7033],
            [1963, 7024],
            [1928, 7041],
            [1956, 7047]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'WS',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.5,
        'hc-middle-y': 0.54,
        'hc-key': 'ws',
        'hc-a2': 'WS',
        name: 'Samoa',
        labelrank: '4',
        'country-abbrev': 'Samoa',
        subregion: 'Polynesia',
        'region-wb': 'East Asia & Pacific',
        'iso-a3': 'WSM',
        'iso-a2': 'WS',
        'woe-id': '23424992',
        continent: 'Oceania'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-841, 6102],
            [-839, 6093],
            [-848, 6093],
            [-856, 6101],
            [-841, 6102]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'OM',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.88,
        'hc-middle-y': 0.44,
        'hc-key': 'om',
        'hc-a2': 'OM',
        name: 'Oman',
        labelrank: '4',
        'country-abbrev': 'Oman',
        subregion: 'Western Asia',
        'region-wb': 'Middle East & North Africa',
        'iso-a3': 'OMN',
        'iso-a2': 'OM',
        'woe-id': '23424898',
        continent: 'Asia'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [5899, 7255],
              [5898, 7255],
              [5898, 7258],
              [5901, 7257],
              [5899, 7255]
            ]
          ],
          [
            [
              [5893, 7281],
              [5902, 7291],
              [5899, 7268],
              [5895, 7269],
              [5893, 7281]
            ]
          ],
          [
            [
              [5772, 7063],
              [5861, 7094],
              [5880, 7154],
              [5867, 7177],
              [5884, 7224],
              [5885, 7244],
              [5902, 7247],
              [5925, 7215],
              [5972, 7203],
              [6003, 7162],
              [5990, 7138],
              [5970, 7119],
              [5969, 7105],
              [5953, 7111],
              [5941, 7085],
              [5945, 7064],
              [5910, 7051],
              [5901, 7031],
              [5875, 7028],
              [5862, 7003],
              [5835, 7003],
              [5805, 6992],
              [5794, 7012],
              [5772, 7063]
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'VC',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.5,
        'hc-middle-y': 0.5,
        'hc-key': 'vc',
        'hc-a2': 'VC',
        name: 'Saint Vincent and the Grenadines',
        labelrank: '6',
        'country-abbrev': 'St.V.G.',
        subregion: 'Caribbean',
        'region-wb': 'Latin America & Caribbean',
        'iso-a3': 'VCT',
        'iso-a2': 'VC',
        'woe-id': '23424981',
        continent: 'North America'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [2435, 6884],
            [2433, 6889],
            [2437, 6894],
            [2437, 6888],
            [2435, 6884]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'TR',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.34,
        'hc-middle-y': 0.49,
        'hc-key': 'tr',
        'hc-a2': 'TR',
        name: 'Turkey',
        labelrank: '2',
        'country-abbrev': 'Tur.',
        subregion: 'Western Asia',
        'region-wb': 'Europe & Central Asia',
        'iso-a3': 'TUR',
        'iso-a2': 'TR',
        'woe-id': '23424969',
        continent: 'Asia'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [5005, 7745],
              [4999, 7743],
              [4996, 7744],
              [5004, 7748],
              [5005, 7745]
            ]
          ],
          [
            [
              [5561, 7727],
              [5538, 7718],
              [5545, 7700],
              [5544, 7670],
              [5555, 7661],
              [5560, 7642],
              [5499, 7649],
              [5489, 7641],
              [5484, 7648],
              [5463, 7639],
              [5446, 7641],
              [5412, 7628],
              [5380, 7627],
              [5367, 7634],
              [5344, 7624],
              [5320, 7631],
              [5306, 7597],
              [5299, 7600],
              [5295, 7614],
              [5307, 7623],
              [5301, 7634],
              [5281, 7622],
              [5259, 7629],
              [5229, 7607],
              [5207, 7604],
              [5184, 7622],
              [5145, 7633],
              [5136, 7611],
              [5115, 7607],
              [5098, 7626],
              [5074, 7639],
              [5056, 7637],
              [5041, 7649],
              [5043, 7670],
              [5013, 7680],
              [5034, 7686],
              [5038, 7701],
              [5024, 7714],
              [5033, 7725],
              [5010, 7721],
              [5012, 7740],
              [5025, 7751],
              [5011, 7742],
              [5031, 7760],
              [5008, 7765],
              [5025, 7788],
              [5016, 7799],
              [5037, 7812],
              [5066, 7809],
              [5068, 7796],
              [5098, 7783],
              [5090, 7773],
              [5051, 7774],
              [5041, 7762],
              [5029, 7754],
              [5099, 7755],
              [5102, 7783],
              [5161, 7778],
              [5191, 7800],
              [5222, 7810],
              [5263, 7808],
              [5281, 7799],
              [5300, 7800],
              [5346, 7776],
              [5370, 7771],
              [5402, 7778],
              [5423, 7772],
              [5464, 7792],
              [5492, 7789],
              [5502, 7795],
              [5521, 7778],
              [5529, 7763],
              [5527, 7743],
              [5547, 7741],
              [5560, 7729],
              [5561, 7727]
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'BD',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.86,
        'hc-middle-y': 0.78,
        'hc-key': 'bd',
        'hc-a2': 'BD',
        name: 'Bangladesh',
        labelrank: '3',
        'country-abbrev': 'Bang.',
        subregion: 'Southern Asia',
        'region-wb': 'South Asia',
        'iso-a3': 'BGD',
        'iso-a2': 'BD',
        'woe-id': '23424759',
        continent: 'Asia'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [6960, 7126],
            [6937, 7180],
            [6899, 7149],
            [6880, 7154],
            [6870, 7144],
            [6866, 7159],
            [6851, 7206],
            [6856, 7226],
            [6835, 7237],
            [6848, 7254],
            [6862, 7253],
            [6837, 7276],
            [6848, 7294],
            [6889, 7279],
            [6888, 7260],
            [6904, 7253],
            [6954, 7254],
            [6967, 7246],
            [6956, 7229],
            [6934, 7220],
            [6927, 7205],
            [6940, 7184],
            [6957, 7209],
            [6970, 7154],
            [6972, 7133],
            [6960, 7126]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'SB',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.62,
        'hc-middle-y': 0.67,
        'hc-key': 'sb',
        'hc-a2': 'SB',
        name: 'Solomon Islands',
        labelrank: '3',
        'country-abbrev': 'S. Is.',
        subregion: 'Melanesia',
        'region-wb': 'East Asia & Pacific',
        'iso-a3': 'SLB',
        'iso-a2': 'SB',
        'woe-id': '23424766',
        continent: 'Oceania'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [8953, 6249],
              [8924, 6266],
              [8918, 6278],
              [8953, 6256],
              [8960, 6235],
              [8981, 6214],
              [8977, 6208],
              [8953, 6212],
              [8946, 6225],
              [8953, 6249]
            ]
          ],
          [
            [
              [9000, 6223],
              [8999, 6200],
              [9019, 6193],
              [9025, 6182],
              [8996, 6196],
              [8999, 6216],
              [8984, 6230],
              [8975, 6255],
              [8988, 6247],
              [9000, 6223]
            ]
          ],
          [
            [
              [8867, 6288],
              [8854, 6306],
              [8891, 6281],
              [8873, 6284],
              [8861, 6269],
              [8887, 6265],
              [8905, 6245],
              [8865, 6262],
              [8855, 6276],
              [8867, 6288]
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'LC',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.52,
        'hc-middle-y': 0.47,
        'hc-key': 'lc',
        'hc-a2': 'LC',
        name: 'Saint Lucia',
        labelrank: '6',
        'country-abbrev': 'S.L.',
        subregion: 'Caribbean',
        'region-wb': 'Latin America & Caribbean',
        'iso-a3': 'LCA',
        'iso-a2': 'LC',
        'woe-id': '23424951',
        continent: 'North America'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [2442, 6904],
            [2438, 6909],
            [2443, 6916],
            [2444, 6911],
            [2442, 6904]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'NR',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.53,
        'hc-middle-y': 0.5,
        'hc-key': 'nr',
        'hc-a2': 'NR',
        name: 'Nauru',
        labelrank: '6',
        'country-abbrev': 'Nauru',
        subregion: 'Micronesia',
        'region-wb': 'East Asia & Pacific',
        'iso-a3': 'NRU',
        'iso-a2': 'NR',
        'woe-id': '23424912',
        continent: 'Oceania'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [9163, 6484],
            [9162, 6484],
            [9162, 6485],
            [9163, 6485],
            [9163, 6484]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'NO',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.13,
        'hc-middle-y': 0.9,
        'hc-key': 'no',
        'hc-a2': 'NO',
        name: 'Norway',
        labelrank: '3',
        'country-abbrev': 'Nor.',
        subregion: 'Northern Europe',
        'region-wb': 'Europe & Central Asia',
        'iso-a3': 'NOR',
        'iso-a2': 'NO',
        'woe-id': '-90',
        continent: 'Europe'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [4653, 8902],
              [4617, 8883],
              [4638, 8905],
              [4687, 8916],
              [4653, 8902]
            ]
          ],
          [
            [
              [4682, 8921],
              [4663, 8928],
              [4686, 8945],
              [4692, 8926],
              [4682, 8921]
            ]
          ],
          [
            [
              [4820, 8989],
              [4813, 8989],
              [4823, 8996],
              [4825, 8995],
              [4820, 8989]
            ]
          ],
          [
            [
              [4858, 8998],
              [4862, 8997],
              [4856, 8993],
              [4852, 8996],
              [4858, 8998]
            ]
          ],
          [
            [
              [4800, 9004],
              [4817, 8996],
              [4811, 8987],
              [4778, 8972],
              [4776, 8981],
              [4801, 8988],
              [4790, 8999],
              [4800, 9004]
            ]
          ],
          [
            [
              [4853, 9003],
              [4847, 8999],
              [4841, 9002],
              [4847, 9009],
              [4853, 9003]
            ]
          ],
          [
            [
              [4829, 8997],
              [4822, 9001],
              [4816, 9009],
              [4834, 9002],
              [4829, 8997]
            ]
          ],
          [
            [
              [4909, 9017],
              [4918, 9009],
              [4901, 9012],
              [4903, 9017],
              [4909, 9017]
            ]
          ],
          [
            [
              [4933, 9029],
              [4937, 9021],
              [4921, 9011],
              [4914, 9018],
              [4933, 9029]
            ]
          ],
          [
            [
              [4942, 9034],
              [4951, 9029],
              [4940, 9024],
              [4937, 9033],
              [4942, 9034]
            ]
          ],
          [
            [
              [4930, 9041],
              [4920, 9027],
              [4893, 9022],
              [4904, 9034],
              [4930, 9041]
            ]
          ],
          [
            [
              [4949, 9050],
              [4950, 9045],
              [4945, 9047],
              [4946, 9051],
              [4949, 9050]
            ]
          ],
          [
            [
              [4997, 9058],
              [5005, 9050],
              [4993, 9046],
              [4985, 9052],
              [4997, 9058]
            ]
          ],
          [
            [
              [4873, 9498],
              [4891, 9498],
              [4896, 9477],
              [4861, 9473],
              [4835, 9492],
              [4873, 9498]
            ]
          ],
          [
            [
              [5028, 9501],
              [5020, 9506],
              [5024, 9512],
              [5031, 9506],
              [5028, 9501]
            ]
          ],
          [
            [
              [4572, 9496],
              [4598, 9474],
              [4566, 9489],
              [4549, 9518],
              [4559, 9517],
              [4572, 9496]
            ]
          ],
          [
            [
              [5096, 9519],
              [5068, 9513],
              [5061, 9515],
              [5078, 9523],
              [5096, 9519]
            ]
          ],
          [
            [
              [4836, 9533],
              [4854, 9529],
              [4841, 9525],
              [4831, 9528],
              [4836, 9533]
            ]
          ],
          [
            [
              [4834, 9549],
              [4821, 9547],
              [4818, 9551],
              [4821, 9552],
              [4834, 9549]
            ]
          ],
          [
            [
              [5232, 9606],
              [5208, 9601],
              [5172, 9596],
              [5168, 9599],
              [5232, 9606]
            ]
          ],
          [
            [
              [4959, 9618],
              [4952, 9618],
              [4952, 9622],
              [4954, 9623],
              [4959, 9618]
            ]
          ],
          [
            [
              [4952, 9626],
              [4956, 9625],
              [4954, 9623],
              [4948, 9624],
              [4952, 9626]
            ]
          ],
          [
            [
              [4829, 9625],
              [4825, 9626],
              [4828, 9628],
              [4833, 9627],
              [4829, 9625]
            ]
          ],
          [
            [
              [4869, 9639],
              [4863, 9636],
              [4860, 9639],
              [4865, 9640],
              [4869, 9639]
            ]
          ],
          [
            [
              [4852, 9635],
              [4853, 9640],
              [4845, 9644],
              [4858, 9641],
              [4852, 9635]
            ]
          ],
          [
            [
              [4695, 8938],
              [4714, 8960],
              [4709, 8928],
              [4719, 8942],
              [4728, 8929],
              [4700, 8908],
              [4682, 8909],
              [4697, 8925],
              [4695, 8938]
            ]
          ],
          [
            [
              [4746, 8954],
              [4766, 8974],
              [4770, 8954],
              [4736, 8947],
              [4746, 8954]
            ]
          ],
          [
            [
              [4848, 8986],
              [4846, 8986],
              [4846, 8991],
              [4850, 8991],
              [4849, 8986],
              [4870, 8998],
              [4887, 8985],
              [4887, 8995],
              [4865, 9007],
              [4876, 9013],
              [4879, 9012],
              [4879, 9011],
              [4880, 9010],
              [4881, 9012],
              [4917, 9007],
              [4919, 8998],
              [4933, 9016],
              [4966, 9038],
              [4970, 9048],
              [4984, 9038],
              [5004, 9042],
              [4979, 9023],
              [4981, 9000],
              [5017, 9043],
              [5027, 9047],
              [5021, 9015],
              [5052, 9041],
              [5053, 9055],
              [5081, 9049],
              [5061, 9022],
              [5073, 9018],
              [5089, 9043],
              [5124, 9034],
              [5156, 9011],
              [5129, 9000],
              [5088, 9005],
              [5115, 8995],
              [5115, 8982],
              [5119, 8985],
              [5127, 8987],
              [5125, 8988],
              [5125, 8988],
              [5129, 8990],
              [5149, 8986],
              [5149, 8971],
              [5131, 8977],
              [5123, 8963],
              [5105, 8958],
              [5093, 8945],
              [5091, 8955],
              [5105, 8968],
              [5099, 8979],
              [5077, 8986],
              [5062, 9000],
              [5039, 8991],
              [5021, 8992],
              [5006, 8980],
              [4995, 8937],
              [4973, 8921],
              [4945, 8934],
              [4924, 8924],
              [4900, 8929],
              [4878, 8958],
              [4848, 8946],
              [4839, 8939],
              [4829, 8911],
              [4801, 8918],
              [4775, 8920],
              [4767, 8891],
              [4750, 8898],
              [4735, 8887],
              [4715, 8863],
              [4724, 8845],
              [4695, 8817],
              [4696, 8806],
              [4668, 8799],
              [4668, 8760],
              [4642, 8725],
              [4655, 8719],
              [4651, 8698],
              [4630, 8701],
              [4614, 8695],
              [4593, 8664],
              [4600, 8650],
              [4596, 8631],
              [4603, 8617],
              [4598, 8592],
              [4619, 8576],
              [4614, 8561],
              [4601, 8559],
              [4611, 8536],
              [4609, 8520],
              [4589, 8509],
              [4588, 8482],
              [4577, 8471],
              [4548, 8482],
              [4525, 8469],
              [4490, 8439],
              [4463, 8429],
              [4432, 8433],
              [4401, 8460],
              [4403, 8473],
              [4418, 8467],
              [4412, 8486],
              [4394, 8477],
              [4401, 8503],
              [4390, 8509],
              [4407, 8518],
              [4387, 8525],
              [4396, 8540],
              [4377, 8562],
              [4398, 8584],
              [4381, 8597],
              [4400, 8607],
              [4404, 8620],
              [4445, 8638],
              [4443, 8647],
              [4498, 8667],
              [4501, 8673],
              [4469, 8669],
              [4499, 8688],
              [4510, 8674],
              [4526, 8680],
              [4537, 8665],
              [4578, 8688],
              [4566, 8689],
              [4532, 8674],
              [4521, 8686],
              [4540, 8694],
              [4539, 8706],
              [4563, 8726],
              [4589, 8735],
              [4571, 8736],
              [4595, 8749],
              [4599, 8767],
              [4628, 8813],
              [4640, 8839],
              [4683, 8865],
              [4700, 8880],
              [4676, 8884],
              [4708, 8892],
              [4690, 8894],
              [4724, 8904],
              [4714, 8913],
              [4748, 8930],
              [4752, 8947],
              [4773, 8953],
              [4779, 8969],
              [4834, 8993],
              [4844, 8984],
              [4848, 8986]
            ]
          ],
          [
            [
              [4979, 9366],
              [4980, 9369],
              [4994, 9379],
              [4979, 9366],
              [4979, 9366],
              [4979, 9366]
            ]
          ],
          [
            [
              [4960, 9449],
              [4925, 9414],
              [4902, 9413],
              [4905, 9426],
              [4911, 9432],
              [4857, 9425],
              [4855, 9433],
              [4878, 9455],
              [4855, 9466],
              [4879, 9474],
              [4917, 9477],
              [4936, 9452],
              [4960, 9449]
            ]
          ],
          [
            [
              [4691, 9565],
              [4697, 9547],
              [4722, 9519],
              [4702, 9571],
              [4712, 9593],
              [4727, 9595],
              [4758, 9585],
              [4773, 9573],
              [4763, 9552],
              [4781, 9567],
              [4796, 9554],
              [4798, 9535],
              [4823, 9536],
              [4827, 9526],
              [4874, 9515],
              [4870, 9503],
              [4850, 9505],
              [4800, 9490],
              [4802, 9466],
              [4788, 9464],
              [4776, 9428],
              [4763, 9426],
              [4735, 9370],
              [4692, 9398],
              [4663, 9409],
              [4650, 9431],
              [4685, 9441],
              [4737, 9448],
              [4735, 9452],
              [4644, 9445],
              [4640, 9464],
              [4683, 9468],
              [4705, 9482],
              [4739, 9483],
              [4721, 9489],
              [4736, 9504],
              [4727, 9506],
              [4711, 9491],
              [4695, 9490],
              [4676, 9507],
              [4664, 9492],
              [4674, 9485],
              [4648, 9474],
              [4623, 9473],
              [4606, 9495],
              [4583, 9508],
              [4601, 9518],
              [4584, 9529],
              [4596, 9545],
              [4572, 9531],
              [4555, 9562],
              [4564, 9571],
              [4588, 9581],
              [4598, 9570],
              [4646, 9584],
              [4645, 9572],
              [4623, 9571],
              [4611, 9561],
              [4636, 9564],
              [4654, 9542],
              [4649, 9561],
              [4669, 9579],
              [4691, 9565]
            ]
          ],
          [
            [
              [4940, 9612],
              [5030, 9603],
              [5043, 9598],
              [5040, 9582],
              [5001, 9566],
              [5005, 9559],
              [4982, 9547],
              [4956, 9545],
              [4949, 9537],
              [4916, 9540],
              [4915, 9553],
              [4853, 9550],
              [4819, 9565],
              [4843, 9570],
              [4884, 9572],
              [4885, 9580],
              [4794, 9573],
              [4777, 9584],
              [4795, 9594],
              [4765, 9600],
              [4774, 9611],
              [4810, 9598],
              [4801, 9616],
              [4818, 9607],
              [4841, 9620],
              [4855, 9606],
              [4884, 9610],
              [4899, 9592],
              [4910, 9626],
              [4926, 9622],
              [4918, 9602],
              [4935, 9601],
              [4940, 9612]
            ]
          ],
          [
            [
              [4979, 9366],
              [4977, 9362],
              [4978, 9366],
              [4979, 9366],
              [4979, 9366],
              [4979, 9366]
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'KN',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.57,
        'hc-middle-y': 0.49,
        'hc-key': 'kn',
        'hc-a2': 'KN',
        name: 'Saint Kitts and Nevis',
        labelrank: '6',
        'country-abbrev': 'St.K.N.',
        subregion: 'Caribbean',
        'region-wb': 'Latin America & Caribbean',
        'iso-a3': 'KNA',
        'iso-a2': 'KN',
        'woe-id': '23424940',
        continent: 'North America'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [2394, 7009],
            [2386, 7014],
            [2387, 7015],
            [2391, 7013],
            [2394, 7009]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'BH',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.45,
        'hc-middle-y': 0.5,
        'hc-key': 'bh',
        'hc-a2': 'BH',
        name: 'Bahrain',
        labelrank: '4',
        'country-abbrev': 'Bahr.',
        subregion: 'Western Asia',
        'region-wb': 'Middle East & North Africa',
        'iso-a3': 'BHR',
        'iso-a2': 'BH',
        'woe-id': '23424753',
        continent: 'Asia'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [5728, 7287],
            [5732, 7285],
            [5731, 7273],
            [5728, 7279],
            [5728, 7287]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'TO',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.54,
        'hc-middle-y': 0.34,
        'hc-key': 'to',
        'hc-a2': 'TO',
        name: 'Tonga',
        labelrank: '4',
        'country-abbrev': 'Tongo',
        subregion: 'Polynesia',
        'region-wb': 'East Asia & Pacific',
        'iso-a3': 'TON',
        'iso-a2': 'TO',
        'woe-id': '23424964',
        continent: 'Oceania'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-919, 5867],
            [-920, 5865],
            [-931, 5870],
            [-924, 5872],
            [-919, 5867]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'FI',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.53,
        'hc-middle-y': 0.75,
        'hc-key': 'fi',
        'hc-a2': 'FI',
        name: 'Finland',
        labelrank: '3',
        'country-abbrev': 'Fin.',
        subregion: 'Northern Europe',
        'region-wb': 'Europe & Central Asia',
        'iso-a3': 'FIN',
        'iso-a2': 'FI',
        'woe-id': '23424812',
        continent: 'Europe'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [4848, 8521],
              [4847, 8515],
              [4838, 8514],
              [4842, 8517],
              [4848, 8521]
            ]
          ],
          [
            [
              [4835, 8519],
              [4838, 8520],
              [4835, 8514],
              [4830, 8517],
              [4835, 8519]
            ]
          ],
          [
            [
              [4840, 8527],
              [4831, 8519],
              [4817, 8526],
              [4832, 8530],
              [4840, 8527]
            ]
          ],
          [
            [
              [4875, 8525],
              [4876, 8522],
              [4886, 8523],
              [4874, 8519],
              [4875, 8525]
            ]
          ],
          [
            [
              [4901, 8515],
              [4902, 8523],
              [4913, 8520],
              [4903, 8509],
              [4901, 8515]
            ]
          ],
          [
            [
              [4898, 8529],
              [4902, 8529],
              [4896, 8526],
              [4891, 8527],
              [4898, 8529]
            ]
          ],
          [
            [
              [4867, 8540],
              [4868, 8536],
              [4868, 8531],
              [4866, 8537],
              [4867, 8540]
            ]
          ],
          [
            [
              [4867, 8664],
              [4870, 8660],
              [4866, 8657],
              [4862, 8661],
              [4867, 8664]
            ]
          ],
          [
            [
              [4973, 8748],
              [4966, 8743],
              [4964, 8746],
              [4967, 8748],
              [4973, 8748]
            ]
          ],
          [
            [
              [4883, 8535],
              [4877, 8536],
              [4868, 8562],
              [4875, 8590],
              [4866, 8604],
              [4866, 8644],
              [4874, 8660],
              [4899, 8665],
              [4911, 8687],
              [4929, 8692],
              [4970, 8738],
              [4984, 8736],
              [4986, 8769],
              [4952, 8784],
              [4937, 8814],
              [4947, 8833],
              [4931, 8867],
              [4937, 8891],
              [4912, 8913],
              [4890, 8917],
              [4848, 8946],
              [4878, 8958],
              [4900, 8929],
              [4924, 8924],
              [4945, 8934],
              [4973, 8921],
              [4995, 8937],
              [5006, 8980],
              [5021, 8992],
              [5039, 8991],
              [5062, 9000],
              [5077, 8986],
              [5099, 8979],
              [5105, 8968],
              [5091, 8955],
              [5093, 8945],
              [5078, 8920],
              [5085, 8903],
              [5105, 8896],
              [5125, 8877],
              [5098, 8842],
              [5097, 8834],
              [5121, 8798],
              [5127, 8776],
              [5116, 8775],
              [5119, 8754],
              [5112, 8744],
              [5126, 8734],
              [5125, 8716],
              [5141, 8698],
              [5124, 8685],
              [5160, 8660],
              [5171, 8646],
              [5161, 8627],
              [5101, 8570],
              [5060, 8539],
              [5041, 8540],
              [5004, 8526],
              [4983, 8526],
              [4941, 8513],
              [4914, 8515],
              [4914, 8528],
              [4884, 8535],
              [4888, 8531],
              [4887, 8529],
              [4882, 8532],
              [4883, 8535]
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'ID',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.39,
        'hc-middle-y': 0.42,
        'hc-key': 'id',
        'hc-a2': 'ID',
        name: 'Indonesia',
        labelrank: '2',
        'country-abbrev': 'Indo.',
        subregion: 'South-Eastern Asia',
        'region-wb': 'East Asia & Pacific',
        'iso-a3': 'IDN',
        'iso-a2': 'ID',
        'woe-id': '23424846',
        continent: 'Asia'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [7779, 6225],
              [7802, 6207],
              [7792, 6197],
              [7767, 6213],
              [7747, 6219],
              [7779, 6225]
            ]
          ],
          [
            [
              [8329, 6260],
              [8335, 6253],
              [8298, 6253],
              [8309, 6276],
              [8333, 6284],
              [8341, 6278],
              [8329, 6260]
            ]
          ],
          [
            [
              [8201, 6314],
              [8206, 6341],
              [8213, 6334],
              [8210, 6310],
              [8197, 6297],
              [8201, 6314]
            ]
          ],
          [
            [
              [7853, 6341],
              [7836, 6340],
              [7833, 6350],
              [7867, 6371],
              [7861, 6333],
              [7853, 6341]
            ]
          ],
          [
            [
              [7954, 6430],
              [7944, 6444],
              [7907, 6442],
              [7908, 6451],
              [7965, 6447],
              [7955, 6441],
              [7958, 6409],
              [7980, 6410],
              [7992, 6401],
              [7977, 6387],
              [7955, 6401],
              [7954, 6430]
            ]
          ],
          [
            [
              [7409, 6417],
              [7426, 6424],
              [7431, 6408],
              [7413, 6414],
              [7381, 6409],
              [7365, 6417],
              [7359, 6437],
              [7340, 6443],
              [7353, 6455],
              [7367, 6454],
              [7373, 6431],
              [7390, 6425],
              [7383, 6415],
              [7409, 6417]
            ]
          ],
          [
            [
              [7177, 6441],
              [7202, 6412],
              [7189, 6417],
              [7147, 6465],
              [7157, 6472],
              [7167, 6448],
              [7177, 6441]
            ]
          ],
          [
            [
              [7994, 6477],
              [7988, 6492],
              [8010, 6479],
              [8005, 6464],
              [8019, 6451],
              [7996, 6452],
              [8004, 6463],
              [7994, 6477]
            ]
          ],
          [
            [
              [7314, 6525],
              [7329, 6494],
              [7317, 6481],
              [7324, 6503],
              [7307, 6535],
              [7330, 6530],
              [7314, 6525]
            ]
          ],
          [
            [
              [7083, 6569],
              [7109, 6564],
              [7111, 6544],
              [7128, 6529],
              [7121, 6517],
              [7107, 6537],
              [7104, 6561],
              [7083, 6569]
            ]
          ],
          [
            [
              [7706, 6254],
              [7723, 6262],
              [7729, 6254],
              [7749, 6258],
              [7750, 6247],
              [7690, 6232],
              [7656, 6241],
              [7672, 6259],
              [7685, 6250],
              [7706, 6254]
            ]
          ],
          [
            [
              [8005, 6405],
              [8013, 6414],
              [8060, 6419],
              [8090, 6408],
              [8097, 6387],
              [8059, 6403],
              [8040, 6406],
              [8027, 6397],
              [8018, 6410],
              [8005, 6405]
            ]
          ],
          [
            [
              [7897, 6226],
              [7904, 6221],
              [7910, 6230],
              [7914, 6231],
              [7923, 6237],
              [7924, 6229],
              [7928, 6221],
              [7910, 6202],
              [7881, 6195],
              [7887, 6217],
              [7897, 6226]
            ]
          ],
          [
            [
              [7717, 6622],
              [7709, 6617],
              [7711, 6622],
              [7717, 6622]
            ]
          ],
          [
            [
              [8397, 6424],
              [8397, 6298],
              [8397, 6232],
              [8370, 6263],
              [8336, 6257],
              [8341, 6278],
              [8329, 6289],
              [8330, 6305],
              [8303, 6346],
              [8249, 6368],
              [8226, 6370],
              [8181, 6398],
              [8159, 6380],
              [8156, 6404],
              [8138, 6422],
              [8154, 6418],
              [8163, 6427],
              [8191, 6430],
              [8189, 6438],
              [8152, 6432],
              [8134, 6439],
              [8130, 6450],
              [8103, 6461],
              [8077, 6439],
              [8065, 6445],
              [8099, 6461],
              [8088, 6473],
              [8081, 6497],
              [8097, 6500],
              [8110, 6489],
              [8092, 6485],
              [8108, 6464],
              [8110, 6476],
              [8153, 6489],
              [8173, 6479],
              [8190, 6479],
              [8199, 6460],
              [8196, 6437],
              [8207, 6428],
              [8220, 6402],
              [8236, 6402],
              [8258, 6425],
              [8258, 6444],
              [8247, 6452],
              [8243, 6475],
              [8218, 6469],
              [8233, 6481],
              [8256, 6469],
              [8256, 6452],
              [8283, 6447],
              [8304, 6457],
              [8364, 6430],
              [8397, 6424]
            ]
          ],
          [
            [
              [7616, 6261],
              [7619, 6242],
              [7579, 6257],
              [7562, 6252],
              [7504, 6259],
              [7465, 6274],
              [7434, 6271],
              [7407, 6280],
              [7381, 6282],
              [7381, 6293],
              [7350, 6300],
              [7367, 6327],
              [7389, 6321],
              [7396, 6327],
              [7415, 6317],
              [7434, 6316],
              [7442, 6302],
              [7498, 6296],
              [7511, 6312],
              [7545, 6297],
              [7601, 6298],
              [7609, 6292],
              [7638, 6299],
              [7616, 6291],
              [7564, 6290],
              [7565, 6279],
              [7581, 6271],
              [7603, 6277],
              [7615, 6270],
              [7616, 6262],
              [7637, 6263],
              [7648, 6245],
              [7638, 6241],
              [7616, 6261]
            ]
          ],
          [
            [
              [7785, 6256],
              [7823, 6247],
              [7828, 6255],
              [7846, 6246],
              [7865, 6259],
              [7928, 6260],
              [7950, 6270],
              [7974, 6278],
              [7929, 6255],
              [7898, 6249],
              [7890, 6256],
              [7831, 6239],
              [7776, 6241],
              [7785, 6256]
            ]
          ],
          [
            [
              [7862, 6370],
              [7822, 6363],
              [7826, 6380],
              [7805, 6396],
              [7810, 6419],
              [7784, 6413],
              [7791, 6405],
              [7792, 6364],
              [7788, 6338],
              [7766, 6334],
              [7759, 6343],
              [7767, 6373],
              [7758, 6400],
              [7747, 6395],
              [7743, 6423],
              [7759, 6443],
              [7758, 6463],
              [7770, 6481],
              [7772, 6507],
              [7780, 6521],
              [7795, 6523],
              [7805, 6540],
              [7826, 6531],
              [7894, 6524],
              [7914, 6535],
              [7929, 6552],
              [7934, 6541],
              [7910, 6513],
              [7874, 6509],
              [7869, 6515],
              [7788, 6512],
              [7778, 6494],
              [7781, 6481],
              [7798, 6459],
              [7811, 6459],
              [7828, 6486],
              [7840, 6492],
              [7843, 6478],
              [7879, 6481],
              [7873, 6466],
              [7883, 6462],
              [7875, 6448],
              [7859, 6467],
              [7824, 6443],
              [7851, 6408],
              [7845, 6401],
              [7862, 6370]
            ]
          ],
          [
            [
              [8001, 6550],
              [8019, 6567],
              [8010, 6554],
              [8015, 6538],
              [8035, 6546],
              [8035, 6531],
              [8023, 6526],
              [8039, 6507],
              [8013, 6514],
              [8011, 6499],
              [8027, 6473],
              [7996, 6501],
              [8002, 6512],
              [7996, 6535],
              [8001, 6550]
            ]
          ],
          [
            [
              [7707, 6622],
              [7714, 6605],
              [7701, 6597],
              [7722, 6567],
              [7715, 6556],
              [7749, 6530],
              [7743, 6524],
              [7712, 6522],
              [7703, 6485],
              [7691, 6465],
              [7677, 6458],
              [7678, 6436],
              [7667, 6412],
              [7669, 6386],
              [7660, 6395],
              [7620, 6378],
              [7609, 6401],
              [7591, 6399],
              [7572, 6407],
              [7537, 6396],
              [7534, 6419],
              [7503, 6410],
              [7491, 6412],
              [7481, 6467],
              [7468, 6462],
              [7458, 6485],
              [7459, 6503],
              [7450, 6524],
              [7456, 6545],
              [7473, 6561],
              [7473, 6547],
              [7500, 6525],
              [7545, 6533],
              [7547, 6542],
              [7571, 6546],
              [7590, 6536],
              [7616, 6542],
              [7624, 6566],
              [7645, 6589],
              [7656, 6629],
              [7695, 6627],
              [7707, 6622]
            ]
          ],
          [
            [
              [7367, 6404],
              [7360, 6334],
              [7328, 6326],
              [7304, 6349],
              [7257, 6383],
              [7213, 6437],
              [7197, 6476],
              [7169, 6507],
              [7153, 6505],
              [7162, 6518],
              [7145, 6557],
              [7119, 6571],
              [7118, 6584],
              [7093, 6610],
              [7085, 6611],
              [7054, 6641],
              [7043, 6666],
              [7050, 6670],
              [7083, 6653],
              [7115, 6654],
              [7137, 6622],
              [7181, 6593],
              [7187, 6579],
              [7216, 6555],
              [7215, 6567],
              [7232, 6552],
              [7262, 6544],
              [7262, 6533],
              [7278, 6531],
              [7277, 6520],
              [7299, 6507],
              [7288, 6479],
              [7318, 6470],
              [7327, 6430],
              [7354, 6430],
              [7367, 6404]
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'MU',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.63,
        'hc-middle-y': 0.58,
        'hc-key': 'mu',
        'hc-a2': 'MU',
        name: 'Mauritius',
        labelrank: '5',
        'country-abbrev': 'Mus.',
        subregion: 'Eastern Africa',
        'region-wb': 'Sub-Saharan Africa',
        'iso-a3': 'MUS',
        'iso-a2': 'MU',
        'woe-id': '23424894',
        continent: 'Seven seas (open ocean)'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [5942, 5903],
            [5941, 5892],
            [5932, 5891],
            [5936, 5905],
            [5942, 5903]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'SE',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.4,
        'hc-middle-y': 0.48,
        'hc-key': 'se',
        'hc-a2': 'SE',
        name: 'Sweden',
        labelrank: '3',
        'country-abbrev': 'Swe.',
        subregion: 'Northern Europe',
        'region-wb': 'Europe & Central Asia',
        'iso-a3': 'SWE',
        'iso-a2': 'SE',
        'woe-id': '23424954',
        continent: 'Europe'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [4801, 8424],
              [4791, 8396],
              [4780, 8383],
              [4775, 8410],
              [4801, 8424]
            ]
          ],
          [
            [
              [4586, 8430],
              [4583, 8426],
              [4580, 8426],
              [4579, 8430],
              [4586, 8430]
            ]
          ],
          [
            [
              [4781, 8470],
              [4781, 8470],
              [4781, 8474],
              [4785, 8475],
              [4781, 8470]
            ]
          ],
          [
            [
              [4895, 8765],
              [4895, 8771],
              [4899, 8769],
              [4899, 8765],
              [4895, 8765]
            ]
          ],
          [
            [
              [4587, 8438],
              [4588, 8433],
              [4579, 8432],
              [4577, 8435],
              [4587, 8438],
              [4570, 8443],
              [4567, 8471],
              [4577, 8471],
              [4588, 8482],
              [4589, 8509],
              [4609, 8520],
              [4611, 8536],
              [4601, 8559],
              [4614, 8561],
              [4619, 8576],
              [4598, 8592],
              [4603, 8617],
              [4596, 8631],
              [4600, 8650],
              [4593, 8664],
              [4614, 8695],
              [4630, 8701],
              [4651, 8698],
              [4655, 8719],
              [4642, 8725],
              [4668, 8760],
              [4668, 8799],
              [4696, 8806],
              [4695, 8817],
              [4724, 8845],
              [4715, 8863],
              [4735, 8887],
              [4750, 8898],
              [4767, 8891],
              [4775, 8920],
              [4801, 8918],
              [4829, 8911],
              [4839, 8939],
              [4848, 8946],
              [4890, 8917],
              [4912, 8913],
              [4937, 8891],
              [4931, 8867],
              [4947, 8833],
              [4937, 8814],
              [4952, 8784],
              [4910, 8779],
              [4884, 8770],
              [4863, 8729],
              [4877, 8718],
              [4852, 8691],
              [4820, 8670],
              [4814, 8676],
              [4801, 8659],
              [4787, 8659],
              [4786, 8646],
              [4766, 8627],
              [4751, 8627],
              [4757, 8614],
              [4744, 8577],
              [4750, 8548],
              [4768, 8541],
              [4785, 8522],
              [4793, 8524],
              [4802, 8503],
              [4783, 8477],
              [4733, 8453],
              [4734, 8423],
              [4724, 8423],
              [4732, 8405],
              [4725, 8393],
              [4737, 8384],
              [4726, 8354],
              [4719, 8370],
              [4707, 8347],
              [4673, 8350],
              [4659, 8336],
              [4658, 8318],
              [4622, 8319],
              [4608, 8355],
              [4619, 8371],
              [4604, 8382],
              [4584, 8421],
              [4589, 8438],
              [4587, 8438]
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'TT',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.5,
        'hc-middle-y': 0.5,
        'hc-key': 'tt',
        'hc-a2': 'TT',
        name: 'Trinidad and Tobago',
        labelrank: '5',
        'country-abbrev': 'Tr.T.',
        subregion: 'Caribbean',
        'region-wb': 'Latin America & Caribbean',
        'iso-a3': 'TTO',
        'iso-a2': 'TT',
        'woe-id': '23424958',
        continent: 'North America'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [2440, 6813],
            [2441, 6798],
            [2427, 6802],
            [2421, 6815],
            [2440, 6813]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'MY',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.89,
        'hc-middle-y': 0.31,
        'hc-key': 'my',
        'hc-a2': 'MY',
        name: 'Malaysia',
        labelrank: '3',
        'country-abbrev': 'Malay.',
        subregion: 'South-Eastern Asia',
        'region-wb': 'East Asia & Pacific',
        'iso-a3': 'MYS',
        'iso-a2': 'MY',
        'woe-id': '23424901',
        continent: 'Asia'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [7198, 6660],
              [7197, 6654],
              [7194, 6654],
              [7194, 6660],
              [7198, 6660]
            ]
          ],
          [
            [
              [7717, 6622],
              [7711, 6622],
              [7711, 6623],
              [7707, 6622],
              [7695, 6627],
              [7656, 6629],
              [7645, 6589],
              [7624, 6566],
              [7616, 6542],
              [7590, 6536],
              [7571, 6546],
              [7547, 6542],
              [7545, 6533],
              [7500, 6525],
              [7473, 6547],
              [7473, 6561],
              [7481, 6550],
              [7513, 6546],
              [7523, 6571],
              [7525, 6570],
              [7525, 6575],
              [7526, 6578],
              [7572, 6593],
              [7600, 6625],
              [7601, 6635],
              [7620, 6618],
              [7630, 6643],
              [7631, 6644],
              [7632, 6641],
              [7641, 6626],
              [7635, 6644],
              [7648, 6653],
              [7663, 6680],
              [7685, 6693],
              [7697, 6716],
              [7699, 6695],
              [7757, 6652],
              [7723, 6643],
              [7736, 6628],
              [7714, 6623],
              [7717, 6622]
            ]
          ],
          [
            [
              [7192, 6689],
              [7193, 6696],
              [7220, 6683],
              [7222, 6665],
              [7242, 6668],
              [7250, 6683],
              [7281, 6658],
              [7290, 6641],
              [7287, 6610],
              [7290, 6586],
              [7300, 6578],
              [7315, 6540],
              [7288, 6545],
              [7226, 6583],
              [7227, 6596],
              [7209, 6614],
              [7199, 6676],
              [7178, 6689],
              [7192, 6689]
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'BS',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.21,
        'hc-middle-y': 0.08,
        'hc-key': 'bs',
        'hc-a2': 'BS',
        name: 'The Bahamas',
        labelrank: '4',
        'country-abbrev': 'Bhs.',
        subregion: 'Caribbean',
        'region-wb': 'Latin America & Caribbean',
        'iso-a3': 'BHS',
        'iso-a2': 'BS',
        'woe-id': '23424758',
        continent: 'North America'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [1949, 7226],
              [1951, 7209],
              [1931, 7237],
              [1933, 7254],
              [1949, 7226]
            ]
          ],
          [
            [
              [2028, 7190],
              [2026, 7190],
              [2025, 7195],
              [2025, 7195],
              [2028, 7190],
              [2028, 7190],
              [2028, 7190]
            ]
          ],
          [
            [
              [2025, 7195],
              [2024, 7197],
              [1999, 7207],
              [2016, 7223],
              [1993, 7237],
              [1994, 7252],
              [1961, 7276],
              [1953, 7308],
              [1967, 7296],
              [1963, 7277],
              [1995, 7252],
              [2019, 7221],
              [2025, 7195],
              [2025, 7195]
            ]
          ],
          [
            [
              [2028, 7190],
              [2094, 7166],
              [2090, 7140],
              [2085, 7166],
              [2057, 7165],
              [2060, 7173],
              [2033, 7182],
              [2028, 7190],
              [2028, 7190],
              [2028, 7190]
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'PA',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.22,
        'hc-middle-y': 0.5,
        'hc-key': 'pa',
        'hc-a2': 'PA',
        name: 'Panama',
        labelrank: '4',
        'country-abbrev': 'Pan.',
        subregion: 'Central America',
        'region-wb': 'Latin America & Caribbean',
        'iso-a3': 'PAN',
        'iso-a2': 'PA',
        'woe-id': '23424924',
        continent: 'North America'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [1943, 6712],
            [1931, 6726],
            [1924, 6752],
            [1893, 6763],
            [1866, 6737],
            [1880, 6719],
            [1855, 6712],
            [1852, 6723],
            [1827, 6712],
            [1835, 6726],
            [1829, 6740],
            [1802, 6744],
            [1795, 6736],
            [1790, 6744],
            [1791, 6745],
            [1791, 6745],
            [1791, 6745],
            [1791, 6745],
            [1805, 6781],
            [1819, 6762],
            [1849, 6759],
            [1891, 6782],
            [1927, 6776],
            [1958, 6754],
            [1964, 6733],
            [1943, 6712]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'PW',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.38,
        'hc-middle-y': 0.44,
        'hc-key': 'pw',
        'hc-a2': 'PW',
        name: 'Palau',
        labelrank: '6',
        'country-abbrev': 'Palau',
        subregion: 'Micronesia',
        'region-wb': 'East Asia & Pacific',
        'iso-a3': 'PLW',
        'iso-a2': 'PW',
        'woe-id': '23424927',
        continent: 'Oceania'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [8207, 6715],
            [8205, 6719],
            [8208, 6723],
            [8211, 6723],
            [8207, 6715]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'TV',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.25,
        'hc-middle-y': 0.5,
        'hc-key': 'tv',
        'hc-a2': 'TV',
        name: 'Tuvalu',
        labelrank: '6',
        'country-abbrev': 'Tuv.',
        subregion: 'Polynesia',
        'region-wb': 'East Asia & Pacific',
        'iso-a3': 'TUV',
        'iso-a2': 'TV',
        'woe-id': '23424970',
        continent: 'Oceania'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [9524, 6249],
            [9524, 6250],
            [9524, 6252],
            [9525, 6250],
            [9524, 6249]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'MH',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.49,
        'hc-middle-y': 0.6,
        'hc-key': 'mh',
        'hc-a2': 'MH',
        name: 'Marshall Islands',
        labelrank: '6',
        'country-abbrev': 'M. Is.',
        subregion: 'Micronesia',
        'region-wb': 'East Asia & Pacific',
        'iso-a3': 'MHL',
        'iso-a2': 'MH',
        'woe-id': '23424932',
        continent: 'Oceania'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [9284, 6710],
            [9289, 6708],
            [9290, 6707],
            [9288, 6707],
            [9284, 6710]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'CL',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.4,
        'hc-middle-y': 0.93,
        'hc-key': 'cl',
        'hc-a2': 'CL',
        name: 'Chile',
        labelrank: '2',
        'country-abbrev': 'Chile',
        subregion: 'South America',
        'region-wb': 'Latin America & Caribbean',
        'iso-a3': 'CHL',
        'iso-a2': 'CL',
        'woe-id': '23424782',
        continent: 'South America'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [2164, 5957],
              [2176, 5959],
              [2190, 5982],
              [2205, 5938],
              [2221, 5923],
              [2212, 5893],
              [2228, 5867],
              [2238, 5820],
              [2258, 5820],
              [2263, 5814],
              [2254, 5783],
              [2227, 5771],
              [2217, 5759],
              [2225, 5692],
              [2210, 5685],
              [2199, 5659],
              [2186, 5645],
              [2174, 5614],
              [2178, 5583],
              [2171, 5582],
              [2158, 5543],
              [2182, 5484],
              [2164, 5425],
              [2164, 5395],
              [2145, 5380],
              [2140, 5339],
              [2150, 5306],
              [2134, 5298],
              [2131, 5274],
              [2118, 5235],
              [2124, 5187],
              [2113, 5181],
              [2112, 5155],
              [2126, 5122],
              [2122, 5105],
              [2140, 5104],
              [2137, 5090],
              [2115, 5092],
              [2137, 5072],
              [2122, 5056],
              [2128, 5047],
              [2119, 5001],
              [2107, 4993],
              [2100, 4975],
              [2108, 4959],
              [2099, 4942],
              [2070, 4914],
              [2071, 4891],
              [2082, 4867],
              [2107, 4871],
              [2103, 4836],
              [2119, 4819],
              [2177, 4818],
              [2221, 4804],
              [2201, 4810],
              [2154, 4789],
              [2145, 4746],
              [2113, 4751],
              [2106, 4758],
              [2106, 4757],
              [2081, 4769],
              [2088, 4785],
              [2129, 4796],
              [2107, 4797],
              [2086, 4785],
              [2054, 4790],
              [2059, 4799],
              [2045, 4813],
              [2066, 4809],
              [2045, 4824],
              [2034, 4815],
              [2031, 4833],
              [2065, 4815],
              [2061, 4847],
              [2048, 4856],
              [2063, 4859],
              [2037, 4889],
              [2014, 4867],
              [2026, 4889],
              [2047, 4893],
              [2044, 4915],
              [2046, 4949],
              [2039, 4972],
              [2064, 4971],
              [2071, 4979],
              [2036, 4983],
              [2050, 5017],
              [2037, 5014],
              [2016, 5023],
              [2044, 5067],
              [2058, 5045],
              [2074, 5073],
              [2079, 5112],
              [2094, 5155],
              [2093, 5182],
              [2102, 5188],
              [2088, 5209],
              [2084, 5199],
              [2064, 5199],
              [2059, 5227],
              [2066, 5261],
              [2080, 5278],
              [2067, 5338],
              [2070, 5358],
              [2081, 5358],
              [2097, 5411],
              [2110, 5426],
              [2116, 5458],
              [2127, 5480],
              [2134, 5517],
              [2126, 5556],
              [2127, 5586],
              [2137, 5596],
              [2130, 5628],
              [2148, 5669],
              [2162, 5740],
              [2158, 5811],
              [2165, 5813],
              [2174, 5862],
              [2172, 5904],
              [2164, 5957]
            ],
            [
              [2106, 4758],
              [2106, 4760],
              [2106, 4760],
              [2106, 4760],
              [2135, 4774],
              [2141, 4786],
              [2116, 4773],
              [2105, 4776],
              [2106, 4760],
              [2106, 4760],
              [2106, 4760],
              [2105, 4759],
              [2106, 4758]
            ]
          ],
          [
            [
              [2275, 4689],
              [2262, 4684],
              [2231, 4688],
              [2228, 4701],
              [2255, 4701],
              [2275, 4689]
            ]
          ],
          [
            [
              [2127, 4739],
              [2145, 4734],
              [2142, 4723],
              [2132, 4731],
              [2127, 4739]
            ]
          ],
          [
            [
              [2034, 4877],
              [2051, 4868],
              [2041, 4843],
              [2021, 4838],
              [2040, 4851],
              [2025, 4866],
              [2043, 4866],
              [2034, 4877]
            ]
          ],
          [
            [
              [2017, 4955],
              [2011, 4969],
              [2018, 4972],
              [2025, 4937],
              [2017, 4955]
            ]
          ],
          [
            [
              [2058, 5121],
              [2068, 5089],
              [2046, 5091],
              [2033, 5099],
              [2048, 5105],
              [2058, 5121]
            ]
          ],
          [
            [
              [2178, 4696],
              [2182, 4703],
              [2210, 4698],
              [2244, 4677],
              [2262, 4660],
              [2240, 4661],
              [2227, 4676],
              [2206, 4680],
              [2210, 4690],
              [2181, 4681],
              [2178, 4696]
            ]
          ],
          [
            [
              [2078, 4764],
              [2040, 4782],
              [2073, 4773],
              [2112, 4746],
              [2110, 4732],
              [2092, 4733],
              [2064, 4762],
              [2078, 4764]
            ]
          ],
          [
            [
              [2026, 4979],
              [2032, 4982],
              [2042, 4947],
              [2043, 4898],
              [2032, 4895],
              [2010, 4910],
              [2017, 4924],
              [2030, 4924],
              [2020, 4969],
              [2026, 4979]
            ]
          ],
          [
            [
              [2071, 5177],
              [2065, 5141],
              [2035, 5131],
              [2051, 5154],
              [2056, 5193],
              [2070, 5198],
              [2071, 5177]
            ]
          ],
          [
            [
              [2216, 4793],
              [2215, 4706],
              [2213, 4707],
              [2215, 4706],
              [2215, 4702],
              [2176, 4707],
              [2159, 4689],
              [2144, 4714],
              [2149, 4743],
              [2162, 4755],
              [2166, 4725],
              [2205, 4721],
              [2174, 4735],
              [2171, 4749],
              [2194, 4764],
              [2169, 4760],
              [2163, 4778],
              [2183, 4787],
              [2193, 4800],
              [2216, 4793]
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'TH',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.26,
        'hc-middle-y': 0.49,
        'hc-key': 'th',
        'hc-a2': 'TH',
        name: 'Thailand',
        labelrank: '3',
        'country-abbrev': 'Thai.',
        subregion: 'South-Eastern Asia',
        'region-wb': 'East Asia & Pacific',
        'iso-a3': 'THA',
        'iso-a2': 'TH',
        'woe-id': '23424960',
        continent: 'Asia'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [7255, 6858],
              [7258, 6856],
              [7261, 6853],
              [7256, 6852],
              [7255, 6858]
            ]
          ],
          [
            [
              [7250, 6683],
              [7242, 6668],
              [7222, 6665],
              [7220, 6683],
              [7193, 6696],
              [7192, 6689],
              [7170, 6711],
              [7168, 6724],
              [7135, 6751],
              [7142, 6787],
              [7152, 6804],
              [7152, 6814],
              [7178, 6848],
              [7162, 6884],
              [7164, 6904],
              [7137, 6937],
              [7145, 6952],
              [7146, 6974],
              [7154, 6977],
              [7142, 7004],
              [7120, 7028],
              [7113, 7048],
              [7130, 7088],
              [7145, 7084],
              [7187, 7107],
              [7191, 7103],
              [7205, 7096],
              [7202, 7079],
              [7225, 7078],
              [7219, 7046],
              [7222, 7017],
              [7250, 7039],
              [7265, 7028],
              [7289, 7046],
              [7306, 7043],
              [7331, 7014],
              [7329, 6989],
              [7354, 6964],
              [7353, 6942],
              [7341, 6923],
              [7296, 6926],
              [7275, 6918],
              [7257, 6900],
              [7262, 6872],
              [7274, 6843],
              [7266, 6858],
              [7242, 6873],
              [7217, 6871],
              [7217, 6897],
              [7190, 6895],
              [7189, 6859],
              [7168, 6813],
              [7167, 6771],
              [7184, 6773],
              [7197, 6744],
              [7201, 6710],
              [7234, 6701],
              [7250, 6683]
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'GD',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.5,
        'hc-middle-y': 0.5,
        'hc-key': 'gd',
        'hc-a2': 'GD',
        name: 'Grenada',
        labelrank: '6',
        'country-abbrev': 'Gren.',
        subregion: 'Caribbean',
        'region-wb': 'Latin America & Caribbean',
        'iso-a3': 'GRD',
        'iso-a2': 'GD',
        'woe-id': '23424826',
        continent: 'North America'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [2422, 6854],
            [2419, 6854],
            [2419, 6858],
            [2423, 6860],
            [2422, 6854]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'EE',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.35,
        'hc-middle-y': 0.41,
        'hc-key': 'ee',
        'hc-a2': 'EE',
        name: 'Estonia',
        labelrank: '6',
        'country-abbrev': 'Est.',
        subregion: 'Northern Europe',
        'region-wb': 'Europe & Central Asia',
        'iso-a3': 'EST',
        'iso-a2': 'EE',
        'woe-id': '23424805',
        continent: 'Europe'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [4907, 8453],
              [4918, 8443],
              [4894, 8434],
              [4883, 8450],
              [4907, 8453]
            ]
          ],
          [
            [
              [4928, 8455],
              [4924, 8451],
              [4920, 8454],
              [4923, 8457],
              [4928, 8455]
            ]
          ],
          [
            [
              [4924, 8473],
              [4928, 8473],
              [4929, 8470],
              [4922, 8470],
              [4924, 8473]
            ]
          ],
          [
            [
              [4910, 8472],
              [4919, 8464],
              [4903, 8458],
              [4890, 8468],
              [4910, 8472]
            ]
          ],
          [
            [
              [5057, 8471],
              [5034, 8462],
              [5055, 8428],
              [5051, 8420],
              [5046, 8408],
              [5021, 8407],
              [4985, 8431],
              [4956, 8422],
              [4964, 8442],
              [4951, 8438],
              [4933, 8452],
              [4932, 8480],
              [4964, 8491],
              [5006, 8499],
              [5031, 8492],
              [5066, 8492],
              [5068, 8490],
              [5071, 8487],
              [5069, 8486],
              [5065, 8486],
              [5065, 8486],
              [5067, 8485],
              [5067, 8485],
              [5068, 8485],
              [5067, 8485],
              [5064, 8484],
              [5061, 8478],
              [5057, 8471]
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'AG',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.5,
        'hc-middle-y': 0.48,
        'hc-key': 'ag',
        'hc-a2': 'AG',
        name: 'Antigua and Barbuda',
        labelrank: '6',
        'country-abbrev': 'Ant.B.',
        subregion: 'Caribbean',
        'region-wb': 'Latin America & Caribbean',
        'iso-a3': 'ATG',
        'iso-a2': 'AG',
        'woe-id': '23424737',
        continent: 'North America'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [2418, 7007],
            [2421, 7004],
            [2416, 7003],
            [2414, 7006],
            [2418, 7007]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'TW',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.49,
        'hc-middle-y': 0.41,
        'hc-key': 'tw',
        'hc-a2': 'TW',
        name: 'Taiwan',
        labelrank: '3',
        'country-abbrev': 'Taiwan',
        subregion: 'Eastern Asia',
        'region-wb': 'East Asia & Pacific',
        'iso-a3': 'TWN',
        'iso-a2': 'TW',
        'woe-id': '23424971',
        continent: 'Asia'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [7765, 7202],
            [7781, 7201],
            [7810, 7250],
            [7834, 7252],
            [7820, 7190],
            [7803, 7153],
            [7780, 7188],
            [7765, 7202]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'BB',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.31,
        'hc-middle-y': 0.56,
        'hc-key': 'bb',
        'hc-a2': 'BB',
        name: 'Barbados',
        labelrank: '5',
        'country-abbrev': 'Barb.',
        subregion: 'Caribbean',
        'region-wb': 'Latin America & Caribbean',
        'iso-a3': 'BRB',
        'iso-a2': 'BB',
        'woe-id': '23424754',
        continent: 'North America'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [2485, 6885],
            [2481, 6886],
            [2482, 6893],
            [2487, 6888],
            [2485, 6885]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'IT',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.46,
        'hc-middle-y': 0.47,
        'hc-key': 'it',
        'hc-a2': 'IT',
        name: 'Italy',
        labelrank: '2',
        'country-abbrev': 'Italy',
        subregion: 'Southern Europe',
        'region-wb': 'Europe & Central Asia',
        'iso-a3': 'ITA',
        'iso-a2': 'IT',
        'woe-id': '23424853',
        continent: 'Europe'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [4604, 7668],
              [4616, 7677],
              [4646, 7670],
              [4701, 7680],
              [4688, 7663],
              [4691, 7637],
              [4685, 7625],
              [4667, 7630],
              [4604, 7668]
            ]
          ],
          [
            [
              [4518, 7781],
              [4529, 7758],
              [4522, 7710],
              [4507, 7713],
              [4501, 7701],
              [4488, 7704],
              [4490, 7750],
              [4482, 7770],
              [4491, 7768],
              [4518, 7781]
            ]
          ],
          [
            [
              [4461, 7873],
              [4465, 7887],
              [4446, 7889],
              [4446, 7911],
              [4434, 7921],
              [4451, 7932],
              [4447, 7951],
              [4471, 7951],
              [4478, 7963],
              [4500, 7956],
              [4513, 7971],
              [4533, 7967],
              [4548, 7973],
              [4548, 7986],
              [4599, 7994],
              [4605, 7979],
              [4644, 7973],
              [4634, 7964],
              [4644, 7939],
              [4629, 7945],
              [4598, 7928],
              [4609, 7916],
              [4601, 7907],
              [4605, 7889],
              [4641, 7864],
              [4655, 7831],
              [4687, 7807],
              [4712, 7808],
              [4709, 7791],
              [4771, 7762],
              [4786, 7744],
              [4781, 7733],
              [4766, 7749],
              [4742, 7758],
              [4727, 7729],
              [4746, 7719],
              [4744, 7702],
              [4729, 7698],
              [4728, 7685],
              [4713, 7668],
              [4701, 7671],
              [4707, 7693],
              [4717, 7697],
              [4700, 7742],
              [4679, 7748],
              [4675, 7763],
              [4654, 7769],
              [4644, 7783],
              [4624, 7782],
              [4569, 7828],
              [4551, 7850],
              [4538, 7881],
              [4498, 7896],
              [4480, 7879],
              [4461, 7873]
            ],
            [
              [4607, 7806],
              [4607, 7806],
              [4607, 7806],
              [4607, 7806],
              [4607, 7806]
            ],
            [
              [4607, 7877],
              [4608, 7880],
              [4606, 7880],
              [4605, 7878],
              [4607, 7877]
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'MT',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.49,
        'hc-middle-y': 0.53,
        'hc-key': 'mt',
        'hc-a2': 'MT',
        name: 'Malta',
        labelrank: '5',
        'country-abbrev': 'Malta',
        subregion: 'Southern Europe',
        'region-wb': 'Middle East & North Africa',
        'iso-a3': 'MLT',
        'iso-a2': 'MT',
        'woe-id': '23424897',
        continent: 'Europe'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [4661, 7604],
            [4667, 7601],
            [4668, 7597],
            [4664, 7598],
            [4661, 7604]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'PG',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.23,
        'hc-middle-y': 0.54,
        'hc-key': 'pg',
        'hc-a2': 'PG',
        name: 'Papua New Guinea',
        labelrank: '2',
        'country-abbrev': 'P.N.G.',
        subregion: 'Melanesia',
        'region-wb': 'East Asia & Pacific',
        'iso-a3': 'PNG',
        'iso-a2': 'PG',
        'woe-id': '23424926',
        continent: 'Oceania'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [8800, 6340],
              [8812, 6337],
              [8839, 6303],
              [8816, 6308],
              [8800, 6340]
            ]
          ],
          [
            [
              [8397, 6232],
              [8397, 6298],
              [8397, 6424],
              [8487, 6389],
              [8501, 6388],
              [8539, 6357],
              [8538, 6339],
              [8588, 6325],
              [8600, 6304],
              [8573, 6302],
              [8580, 6281],
              [8608, 6264],
              [8622, 6233],
              [8643, 6234],
              [8640, 6221],
              [8663, 6217],
              [8674, 6225],
              [8691, 6218],
              [8699, 6200],
              [8673, 6195],
              [8683, 6190],
              [8603, 6201],
              [8577, 6222],
              [8547, 6263],
              [8479, 6277],
              [8485, 6266],
              [8466, 6254],
              [8468, 6237],
              [8446, 6226],
              [8397, 6232]
            ]
          ],
          [
            [
              [8691, 6419],
              [8662, 6427],
              [8653, 6454],
              [8670, 6430],
              [8713, 6410],
              [8721, 6422],
              [8723, 6405],
              [8755, 6375],
              [8748, 6358],
              [8730, 6395],
              [8691, 6419]
            ]
          ],
          [
            [
              [8652, 6315],
              [8627, 6328],
              [8606, 6331],
              [8607, 6340],
              [8640, 6336],
              [8693, 6341],
              [8710, 6354],
              [8708, 6378],
              [8734, 6373],
              [8726, 6343],
              [8677, 6316],
              [8652, 6315]
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'DE',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.53,
        'hc-middle-y': 0.34,
        'hc-key': 'de',
        'hc-a2': 'DE',
        name: 'Germany',
        labelrank: '2',
        'country-abbrev': 'Ger.',
        subregion: 'Western Europe',
        'region-wb': 'Europe & Central Asia',
        'iso-a3': 'DEU',
        'iso-a2': 'DE',
        'woe-id': '23424829',
        continent: 'Europe'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [4452, 8231],
              [4456, 8250],
              [4492, 8243],
              [4505, 8257],
              [4492, 8289],
              [4495, 8298],
              [4500, 8298],
              [4518, 8295],
              [4533, 8293],
              [4539, 8282],
              [4557, 8274],
              [4557, 8264],
              [4577, 8258],
              [4608, 8281],
              [4626, 8273],
              [4630, 8288],
              [4642, 8285],
              [4647, 8256],
              [4660, 8249],
              [4664, 8233],
              [4656, 8215],
              [4671, 8205],
              [4670, 8174],
              [4683, 8153],
              [4676, 8137],
              [4663, 8138],
              [4609, 8119],
              [4605, 8094],
              [4647, 8057],
              [4644, 8048],
              [4615, 8032],
              [4624, 8009],
              [4599, 8017],
              [4563, 8005],
              [4547, 8012],
              [4539, 8001],
              [4526, 8011],
              [4507, 8021],
              [4510, 8016],
              [4489, 8012],
              [4463, 8012],
              [4463, 8033],
              [4481, 8064],
              [4441, 8074],
              [4427, 8083],
              [4431, 8096],
              [4420, 8109],
              [4427, 8116],
              [4416, 8133],
              [4428, 8175],
              [4447, 8191],
              [4452, 8231]
            ]
          ],
          [
            [
              [4511, 8015],
              [4511, 8015],
              [4511, 8015],
              [4511, 8015]
            ]
          ],
          [
            [
              [4658, 8257],
              [4647, 8269],
              [4659, 8259],
              [4658, 8258],
              [4658, 8257]
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'VU',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.17,
        'hc-middle-y': 0.21,
        'hc-key': 'vu',
        'hc-a2': 'VU',
        name: 'Vanuatu',
        labelrank: '4',
        'country-abbrev': 'Van.',
        subregion: 'Melanesia',
        'region-wb': 'East Asia & Pacific',
        'iso-a3': 'VUT',
        'iso-a2': 'VU',
        'woe-id': '23424907',
        continent: 'Oceania'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [9176, 6081],
              [9167, 6053],
              [9171, 6035],
              [9157, 6038],
              [9158, 6053],
              [9176, 6081]
            ]
          ],
          [
            [
              [9199, 6027],
              [9199, 6028],
              [9199, 6028],
              [9199, 6028],
              [9199, 6027],
              [9199, 6027],
              [9199, 6027]
            ]
          ],
          [
            [
              [9199, 6027],
              [9201, 6010],
              [9201, 6010],
              [9191, 6020],
              [9199, 6027],
              [9199, 6027],
              [9199, 6027]
            ]
          ],
          [
            [
              [9207, 6003],
              [9201, 6006],
              [9201, 6010],
              [9201, 6010],
              [9207, 6003],
              [9207, 6003],
              [9207, 6003]
            ]
          ],
          [
            [
              [9207, 6003],
              [9211, 6000],
              [9210, 5973],
              [9199, 5977],
              [9209, 6000],
              [9207, 6003],
              [9207, 6003],
              [9207, 6003]
            ]
          ],
          [
            [
              [9199, 6028],
              [9190, 6043],
              [9198, 6045],
              [9199, 6028],
              [9199, 6028]
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'SG',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.5,
        'hc-middle-y': 0.57,
        'hc-key': 'sg',
        'hc-a2': 'SG',
        name: 'Singapore',
        labelrank: '6',
        'country-abbrev': 'Sing.',
        subregion: 'South-Eastern Asia',
        'region-wb': 'East Asia & Pacific',
        'iso-a3': 'SGP',
        'iso-a2': 'SG',
        'woe-id': '23424948',
        continent: 'Asia'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [7302, 6542],
            [7307, 6540],
            [7302, 6537],
            [7296, 6538],
            [7302, 6542]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'CY',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.39,
        'hc-middle-y': 0.51,
        'hc-key': 'cy',
        'hc-a2': 'CY',
        name: 'Cyprus',
        labelrank: '5',
        'country-abbrev': 'Cyp.',
        subregion: 'Western Asia',
        'region-wb': 'Europe & Central Asia',
        'iso-a3': 'CYP',
        'iso-a2': 'CY',
        'woe-id': '-90',
        continent: 'Asia'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [5235, 7570],
              [5235, 7570],
              [5235, 7570],
              [5235, 7570]
            ]
          ],
          [
            [
              [5243, 7572],
              [5245, 7569],
              [5239, 7568],
              [5236, 7571],
              [5239, 7572],
              [5242, 7571],
              [5243, 7572]
            ]
          ],
          [
            [
              [5235, 7569],
              [5236, 7569],
              [5236, 7569],
              [5236, 7569],
              [5235, 7569]
            ]
          ],
          [
            [
              [5233, 7569],
              [5231, 7564],
              [5213, 7558],
              [5208, 7560],
              [5206, 7558],
              [5191, 7571],
              [5200, 7576],
              [5202, 7575],
              [5203, 7576],
              [5204, 7576],
              [5204, 7576],
              [5205, 7576],
              [5205, 7576],
              [5205, 7576],
              [5205, 7576],
              [5225, 7575],
              [5233, 7569],
              [5233, 7569]
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'KM',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.41,
        'hc-middle-y': 0.51,
        'hc-key': 'km',
        'hc-a2': 'KM',
        name: 'Comoros',
        labelrank: '6',
        'country-abbrev': 'Com.',
        subregion: 'Eastern Africa',
        'region-wb': 'Sub-Saharan Africa',
        'iso-a3': 'COM',
        'iso-a2': 'KM',
        'woe-id': '23424786',
        continent: 'Africa'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [5521, 6149],
            [5514, 6154],
            [5516, 6165],
            [5519, 6165],
            [5521, 6149]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'FJ',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.29,
        'hc-middle-y': 0.59,
        'hc-key': 'fj',
        'hc-a2': 'FJ',
        name: 'Fiji',
        labelrank: '6',
        'country-abbrev': 'Fiji',
        subregion: 'Melanesia',
        'region-wb': 'East Asia & Pacific',
        'iso-a3': 'FJI',
        'iso-a2': 'FJ',
        'woe-id': '23424813',
        continent: 'Oceania'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [9550, 6006],
              [9511, 5997],
              [9516, 6013],
              [9545, 6020],
              [9550, 6006]
            ]
          ],
          [
            [
              [9462, 5988],
              [9472, 6001],
              [9478, 5984],
              [9497, 5987],
              [9510, 5976],
              [9503, 5939],
              [9494, 5937],
              [9493, 5959],
              [9469, 5964],
              [9462, 5988]
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'RU',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.57,
        'hc-middle-y': 0.57,
        'hc-key': 'ru',
        'hc-a2': 'RU',
        name: 'Russia',
        labelrank: '2',
        'country-abbrev': 'Rus.',
        subregion: 'Eastern Europe',
        'region-wb': 'Europe & Central Asia',
        'iso-a3': 'RUS',
        'iso-a2': 'RU',
        'woe-id': '23424936',
        continent: 'Europe'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [5839, 9180],
              [5840, 9194],
              [5821, 9203],
              [5856, 9216],
              [5873, 9243],
              [5899, 9245],
              [5877, 9255],
              [5902, 9259],
              [5888, 9267],
              [5911, 9273],
              [5904, 9280],
              [5922, 9299],
              [5942, 9295],
              [5937, 9307],
              [5955, 9311],
              [5971, 9329],
              [6002, 9331],
              [6017, 9342],
              [6041, 9341],
              [6041, 9353],
              [6079, 9348],
              [6128, 9355],
              [6174, 9371],
              [6214, 9394],
              [6233, 9398],
              [6269, 9389],
              [6273, 9370],
              [6255, 9357],
              [6220, 9342],
              [6050, 9296],
              [6033, 9284],
              [6005, 9254],
              [5988, 9255],
              [5984, 9243],
              [5955, 9251],
              [5971, 9231],
              [5957, 9228],
              [5938, 9195],
              [5913, 9197],
              [5928, 9186],
              [5913, 9174],
              [5886, 9178],
              [5904, 9173],
              [5895, 9148],
              [5883, 9148],
              [5873, 9121],
              [5876, 9099],
              [5894, 9064],
              [5939, 9035],
              [5925, 9023],
              [5875, 9036],
              [5866, 9026],
              [5811, 9042],
              [5820, 9060],
              [5810, 9074],
              [5800, 9070],
              [5804, 9052],
              [5759, 9080],
              [5757, 9101],
              [5769, 9113],
              [5785, 9109],
              [5796, 9140],
              [5791, 9152],
              [5812, 9153],
              [5806, 9166],
              [5825, 9177],
              [5839, 9180]
            ],
            [
              [5868, 9182],
              [5862, 9185],
              [5856, 9183],
              [5860, 9184],
              [5868, 9182]
            ]
          ],
          [
            [
              [8830, 8135],
              [8853, 8138],
              [8833, 8111],
              [8818, 8112],
              [8837, 8131],
              [8830, 8135]
            ]
          ],
          [
            [
              [8281, 8299],
              [8297, 8311],
              [8312, 8303],
              [8301, 8287],
              [8281, 8299]
            ]
          ],
          [
            [
              [9093, 8479],
              [9094, 8465],
              [9064, 8452],
              [9075, 8472],
              [9093, 8479]
            ]
          ],
          [
            [
              [5717, 8942],
              [5699, 8933],
              [5673, 8930],
              [5662, 8939],
              [5664, 8958],
              [5693, 8970],
              [5719, 8957],
              [5717, 8942]
            ]
          ],
          [
            [
              [9235, 8984],
              [9220, 8973],
              [9186, 8987],
              [9202, 8998],
              [9236, 8990],
              [9235, 8984]
            ]
          ],
          [
            [
              [6533, 9121],
              [6508, 9120],
              [6528, 9140],
              [6551, 9132],
              [6533, 9121]
            ]
          ],
          [
            [
              [6585, 9156],
              [6586, 9145],
              [6559, 9154],
              [6573, 9165],
              [6585, 9156]
            ]
          ],
          [
            [
              [6338, 9180],
              [6353, 9173],
              [6301, 9162],
              [6303, 9183],
              [6332, 9189],
              [6338, 9180]
            ]
          ],
          [
            [
              [8384, 9212],
              [8375, 9230],
              [8394, 9233],
              [8399, 9217],
              [8384, 9212]
            ]
          ],
          [
            [
              [7583, 9238],
              [7565, 9222],
              [7527, 9237],
              [7543, 9248],
              [7581, 9245],
              [7583, 9238]
            ]
          ],
          [
            [
              [6674, 9336],
              [6664, 9327],
              [6658, 9283],
              [6644, 9298],
              [6657, 9306],
              [6651, 9329],
              [6674, 9336]
            ]
          ],
          [
            [
              [7077, 9379],
              [7078, 9373],
              [7051, 9376],
              [7068, 9399],
              [7077, 9379]
            ]
          ],
          [
            [
              [6006, 9604],
              [6007, 9591],
              [5974, 9584],
              [5957, 9587],
              [6006, 9604]
            ]
          ],
          [
            [
              [5721, 9591],
              [5744, 9598],
              [5756, 9586],
              [5715, 9590],
              [5700, 9602],
              [5721, 9607],
              [5721, 9591]
            ]
          ],
          [
            [
              [5923, 9615],
              [5919, 9596],
              [5882, 9599],
              [5891, 9614],
              [5923, 9615]
            ]
          ],
          [
            [
              [5813, 9619],
              [5828, 9610],
              [5817, 9603],
              [5778, 9610],
              [5813, 9619]
            ]
          ],
          [
            [
              [5987, 9615],
              [5952, 9609],
              [5962, 9603],
              [5933, 9600],
              [5919, 9624],
              [5963, 9623],
              [5987, 9615]
            ]
          ],
          [
            [
              [5850, 9624],
              [5858, 9628],
              [5875, 9610],
              [5864, 9606],
              [5862, 9623],
              [5848, 9617],
              [5826, 9624],
              [5829, 9633],
              [5850, 9624]
            ]
          ],
          [
            [
              [5907, 9645],
              [5918, 9637],
              [5886, 9635],
              [5832, 9646],
              [5861, 9653],
              [5907, 9645]
            ]
          ],
          [
            [
              [6047, 9658],
              [6011, 9661],
              [6027, 9667],
              [6058, 9668],
              [6047, 9658]
            ]
          ],
          [
            [
              [5947, 9662],
              [5969, 9663],
              [5946, 9645],
              [5915, 9662],
              [5947, 9662]
            ]
          ],
          [
            [
              [5877, 9661],
              [5892, 9663],
              [5941, 9647],
              [5922, 9639],
              [5911, 9647],
              [5871, 9658],
              [5844, 9661],
              [5851, 9669],
              [5877, 9661]
            ]
          ],
          [
            [
              [6148, 9674],
              [6163, 9670],
              [6170, 9655],
              [6139, 9642],
              [6101, 9638],
              [6084, 9649],
              [6102, 9658],
              [6128, 9659],
              [6148, 9674]
            ]
          ],
          [
            [
              [6933, 9666],
              [6893, 9667],
              [6896, 9675],
              [6937, 9674],
              [6933, 9666]
            ]
          ],
          [
            [
              [5947, 9677],
              [5941, 9670],
              [5886, 9673],
              [5875, 9683],
              [5907, 9678],
              [5901, 9687],
              [5947, 9677]
            ]
          ],
          [
            [
              [5970, 9687],
              [6004, 9680],
              [6001, 9672],
              [5959, 9686],
              [5913, 9692],
              [5944, 9700],
              [5970, 9687]
            ]
          ],
          [
            [
              [6073, 9699],
              [6075, 9709],
              [6117, 9709],
              [6111, 9701],
              [6083, 9706],
              [6073, 9699]
            ]
          ],
          [
            [
              [5962, 9704],
              [5949, 9718],
              [5986, 9721],
              [5990, 9713],
              [5959, 9710],
              [5962, 9704]
            ]
          ],
          [
            [
              [9600, 9076],
              [9623, 9063],
              [9609, 9052],
              [9567, 9045],
              [9548, 9049],
              [9512, 9039],
              [9515, 9063],
              [9555, 9082],
              [9600, 9076]
            ]
          ],
          [
            [
              [8413, 9177],
              [8383, 9188],
              [8401, 9210],
              [8428, 9212],
              [8469, 9191],
              [8473, 9173],
              [8462, 9170],
              [8413, 9177]
            ]
          ],
          [
            [
              [6956, 9579],
              [6925, 9581],
              [6926, 9595],
              [6946, 9596],
              [7003, 9587],
              [6971, 9569],
              [6956, 9579]
            ]
          ],
          [
            [
              [5623, 9643],
              [5630, 9649],
              [5663, 9648],
              [5677, 9633],
              [5649, 9644],
              [5625, 9629],
              [5599, 9621],
              [5569, 9636],
              [5623, 9643]
            ]
          ],
          [
            [
              [5996, 9647],
              [6070, 9652],
              [6070, 9633],
              [6040, 9619],
              [6018, 9625],
              [6000, 9621],
              [5987, 9628],
              [5996, 9647]
            ]
          ],
          [
            [
              [4822, 8279],
              [4841, 8290],
              [4818, 8280],
              [4818, 8280],
              [4827, 8298],
              [4857, 8314],
              [4859, 8314],
              [4846, 8300],
              [4866, 8300],
              [4867, 8313],
              [4913, 8298],
              [4911, 8276],
              [4909, 8276],
              [4822, 8279]
            ]
          ],
          [
            [
              [8094, 7820],
              [8092, 7824],
              [8089, 7828],
              [8102, 7840],
              [8111, 7861],
              [8110, 7883],
              [8101, 7911],
              [8132, 7925],
              [8143, 7900],
              [8157, 7919],
              [8176, 7940],
              [8188, 7963],
              [8196, 8000],
              [8214, 8017],
              [8212, 8038],
              [8203, 8042],
              [8164, 8032],
              [8146, 8017],
              [8104, 8016],
              [8097, 8039],
              [8081, 8061],
              [8055, 8082],
              [8016, 8087],
              [8001, 8096],
              [8002, 8112],
              [7968, 8182],
              [7971, 8188],
              [7947, 8221],
              [7917, 8227],
              [7875, 8244],
              [7803, 8232],
              [7779, 8212],
              [7800, 8203],
              [7801, 8186],
              [7781, 8168],
              [7753, 8118],
              [7755, 8105],
              [7738, 8102],
              [7712, 8085],
              [7680, 8097],
              [7667, 8104],
              [7642, 8100],
              [7610, 8115],
              [7574, 8088],
              [7523, 8080],
              [7505, 8071],
              [7440, 8078],
              [7423, 8101],
              [7402, 8104],
              [7385, 8117],
              [7346, 8122],
              [7297, 8109],
              [7255, 8128],
              [7253, 8155],
              [7204, 8171],
              [7189, 8171],
              [7156, 8187],
              [7131, 8160],
              [7124, 8143],
              [7138, 8124],
              [7133, 8106],
              [7110, 8094],
              [7067, 8104],
              [7029, 8105],
              [7019, 8126],
              [6972, 8130],
              [6963, 8137],
              [6935, 8122],
              [6883, 8100],
              [6860, 8082],
              [6841, 8083],
              [6829, 8072],
              [6820, 8070],
              [6815, 8069],
              [6793, 8089],
              [6781, 8083],
              [6754, 8088],
              [6746, 8106],
              [6724, 8114],
              [6711, 8137],
              [6700, 8142],
              [6661, 8131],
              [6642, 8132],
              [6633, 8150],
              [6619, 8154],
              [6598, 8135],
              [6583, 8162],
              [6536, 8232],
              [6496, 8260],
              [6501, 8279],
              [6428, 8245],
              [6399, 8248],
              [6406, 8259],
              [6377, 8267],
              [6338, 8266],
              [6339, 8291],
              [6328, 8314],
              [6310, 8308],
              [6294, 8316],
              [6253, 8310],
              [6250, 8301],
              [6185, 8286],
              [6163, 8276],
              [6127, 8275],
              [6100, 8265],
              [6038, 8257],
              [6044, 8232],
              [6069, 8226],
              [6029, 8208],
              [6040, 8195],
              [6013, 8177],
              [6024, 8167],
              [6052, 8159],
              [6049, 8134],
              [6030, 8129],
              [6008, 8136],
              [6002, 8125],
              [5977, 8130],
              [5968, 8144],
              [5906, 8145],
              [5881, 8124],
              [5852, 8144],
              [5846, 8137],
              [5813, 8162],
              [5787, 8162],
              [5783, 8172],
              [5767, 8162],
              [5731, 8167],
              [5724, 8155],
              [5697, 8147],
              [5695, 8136],
              [5675, 8126],
              [5681, 8105],
              [5668, 8097],
              [5642, 8121],
              [5623, 8097],
              [5626, 8073],
              [5610, 8043],
              [5628, 8038],
              [5629, 8021],
              [5656, 8019],
              [5685, 7982],
              [5668, 7978],
              [5691, 7966],
              [5662, 7943],
              [5644, 7943],
              [5632, 7916],
              [5617, 7904],
              [5643, 7872],
              [5639, 7846],
              [5672, 7804],
              [5648, 7781],
              [5609, 7806],
              [5585, 7817],
              [5588, 7826],
              [5562, 7836],
              [5535, 7829],
              [5503, 7851],
              [5466, 7853],
              [5438, 7864],
              [5419, 7859],
              [5389, 7886],
              [5318, 7924],
              [5346, 7930],
              [5358, 7954],
              [5377, 7957],
              [5355, 7971],
              [5372, 7984],
              [5398, 7991],
              [5397, 8000],
              [5367, 7994],
              [5371, 8013],
              [5385, 8022],
              [5412, 8022],
              [5418, 8037],
              [5410, 8056],
              [5423, 8075],
              [5395, 8098],
              [5365, 8106],
              [5360, 8100],
              [5344, 8120],
              [5320, 8112],
              [5291, 8117],
              [5274, 8151],
              [5248, 8152],
              [5254, 8171],
              [5236, 8196],
              [5194, 8194],
              [5176, 8186],
              [5161, 8222],
              [5187, 8225],
              [5204, 8239],
              [5176, 8253],
              [5159, 8287],
              [5150, 8327],
              [5070, 8350],
              [5069, 8366],
              [5054, 8379],
              [5060, 8398],
              [5046, 8408],
              [5051, 8420],
              [5055, 8428],
              [5060, 8448],
              [5057, 8471],
              [5061, 8478],
              [5064, 8483],
              [5067, 8485],
              [5067, 8485],
              [5065, 8486],
              [5065, 8486],
              [5065, 8486],
              [5068, 8485],
              [5071, 8487],
              [5068, 8490],
              [5066, 8492],
              [5068, 8506],
              [5100, 8515],
              [5129, 8509],
              [5120, 8522],
              [5086, 8526],
              [5078, 8540],
              [5060, 8539],
              [5101, 8570],
              [5161, 8627],
              [5171, 8646],
              [5160, 8660],
              [5124, 8685],
              [5141, 8698],
              [5125, 8716],
              [5126, 8734],
              [5112, 8744],
              [5119, 8754],
              [5116, 8775],
              [5127, 8776],
              [5121, 8798],
              [5097, 8834],
              [5098, 8842],
              [5125, 8877],
              [5105, 8896],
              [5085, 8903],
              [5078, 8920],
              [5093, 8945],
              [5105, 8958],
              [5123, 8963],
              [5131, 8977],
              [5149, 8971],
              [5149, 8986],
              [5178, 8980],
              [5185, 8994],
              [5217, 8982],
              [5184, 8973],
              [5228, 8966],
              [5222, 8956],
              [5249, 8965],
              [5262, 8957],
              [5300, 8953],
              [5450, 8876],
              [5459, 8853],
              [5454, 8833],
              [5432, 8813],
              [5400, 8800],
              [5358, 8797],
              [5327, 8807],
              [5283, 8814],
              [5266, 8823],
              [5228, 8829],
              [5202, 8849],
              [5191, 8849],
              [5230, 8809],
              [5257, 8799],
              [5271, 8780],
              [5256, 8762],
              [5270, 8738],
              [5293, 8753],
              [5314, 8741],
              [5331, 8753],
              [5362, 8738],
              [5406, 8723],
              [5432, 8735],
              [5411, 8764],
              [5414, 8774],
              [5443, 8793],
              [5459, 8796],
              [5495, 8831],
              [5498, 8815],
              [5515, 8814],
              [5542, 8786],
              [5540, 8806],
              [5551, 8826],
              [5546, 8847],
              [5532, 8851],
              [5544, 8906],
              [5517, 8924],
              [5576, 8920],
              [5594, 8915],
              [5617, 8885],
              [5577, 8879],
              [5565, 8858],
              [5591, 8837],
              [5613, 8833],
              [5647, 8842],
              [5655, 8875],
              [5678, 8879],
              [5749, 8918],
              [5779, 8921],
              [5815, 8940],
              [5833, 8936],
              [5824, 8926],
              [5832, 8910],
              [5809, 8906],
              [5852, 8902],
              [5865, 8917],
              [5891, 8926],
              [5930, 8921],
              [5949, 8936],
              [5976, 8944],
              [5992, 8931],
              [5983, 8913],
              [5999, 8910],
              [6006, 8929],
              [6023, 8930],
              [6036, 8950],
              [6013, 8974],
              [6023, 8982],
              [5996, 8981],
              [5992, 8990],
              [5967, 9000],
              [5964, 9011],
              [5980, 9022],
              [5990, 9015],
              [6023, 8992],
              [6023, 8982],
              [6032, 8988],
              [6087, 8983],
              [6131, 8973],
              [6177, 8948],
              [6222, 8935],
              [6252, 8910],
              [6272, 8925],
              [6277, 8941],
              [6259, 8942],
              [6246, 8969],
              [6225, 8977],
              [6219, 8963],
              [6209, 8974],
              [6225, 9034],
              [6199, 9033],
              [6213, 9066],
              [6233, 9072],
              [6259, 9095],
              [6274, 9143],
              [6292, 9153],
              [6350, 9155],
              [6387, 9144],
              [6389, 9120],
              [6369, 9083],
              [6358, 9079],
              [6383, 9056],
              [6386, 9019],
              [6376, 9011],
              [6383, 8988],
              [6378, 8978],
              [6380, 8941],
              [6411, 8919],
              [6395, 8904],
              [6397, 8879],
              [6380, 8873],
              [6369, 8850],
              [6348, 8836],
              [6350, 8825],
              [6324, 8818],
              [6301, 8836],
              [6315, 8809],
              [6365, 8805],
              [6377, 8823],
              [6407, 8834],
              [6419, 8857],
              [6443, 8877],
              [6442, 8902],
              [6432, 8912],
              [6435, 8928],
              [6492, 8944],
              [6520, 8919],
              [6514, 8881],
              [6531, 8870],
              [6554, 8870],
              [6524, 8882],
              [6525, 8897],
              [6543, 8905],
              [6530, 8938],
              [6502, 8951],
              [6466, 8957],
              [6445, 8948],
              [6415, 8954],
              [6419, 8966],
              [6408, 8983],
              [6414, 9006],
              [6431, 9024],
              [6409, 9063],
              [6393, 9073],
              [6408, 9094],
              [6449, 9110],
              [6454, 9127],
              [6441, 9158],
              [6461, 9150],
              [6473, 9118],
              [6458, 9092],
              [6458, 9072],
              [6481, 9063],
              [6533, 9057],
              [6552, 9044],
              [6548, 9064],
              [6531, 9065],
              [6490, 9080],
              [6481, 9099],
              [6509, 9107],
              [6527, 9095],
              [6541, 9109],
              [6521, 9110],
              [6543, 9126],
              [6581, 9126],
              [6650, 9088],
              [6695, 9089],
              [6689, 9072],
              [6666, 9065],
              [6670, 9038],
              [6684, 9049],
              [6693, 9013],
              [6710, 9022],
              [6692, 9063],
              [6705, 9084],
              [6698, 9095],
              [6663, 9109],
              [6663, 9120],
              [6634, 9124],
              [6619, 9135],
              [6624, 9156],
              [6608, 9172],
              [6615, 9193],
              [6656, 9198],
              [6727, 9201],
              [6808, 9210],
              [6799, 9228],
              [6776, 9232],
              [6779, 9246],
              [6757, 9261],
              [6804, 9253],
              [6797, 9273],
              [6828, 9277],
              [6868, 9303],
              [6892, 9310],
              [6998, 9327],
              [6980, 9339],
              [7002, 9344],
              [7029, 9339],
              [7039, 9353],
              [7101, 9350],
              [7067, 9344],
              [7084, 9328],
              [7125, 9335],
              [7154, 9352],
              [7181, 9339],
              [7155, 9367],
              [7174, 9364],
              [7214, 9369],
              [7225, 9383],
              [7214, 9387],
              [7224, 9403],
              [7285, 9439],
              [7329, 9441],
              [7362, 9433],
              [7376, 9416],
              [7359, 9420],
              [7342, 9409],
              [7317, 9405],
              [7359, 9404],
              [7402, 9397],
              [7409, 9391],
              [7378, 9367],
              [7420, 9368],
              [7423, 9381],
              [7485, 9378],
              [7517, 9381],
              [7527, 9373],
              [7558, 9373],
              [7560, 9349],
              [7582, 9348],
              [7592, 9311],
              [7559, 9327],
              [7566, 9311],
              [7591, 9307],
              [7590, 9293],
              [7568, 9275],
              [7547, 9268],
              [7482, 9237],
              [7426, 9196],
              [7399, 9195],
              [7376, 9171],
              [7416, 9170],
              [7475, 9186],
              [7510, 9199],
              [7503, 9205],
              [7472, 9200],
              [7484, 9218],
              [7553, 9200],
              [7576, 9210],
              [7586, 9189],
              [7643, 9201],
              [7733, 9194],
              [7730, 9176],
              [7785, 9159],
              [7865, 9154],
              [7883, 9173],
              [7875, 9192],
              [7895, 9196],
              [7914, 9212],
              [7918, 9200],
              [7967, 9183],
              [7986, 9191],
              [8015, 9188],
              [8013, 9180],
              [8057, 9162],
              [8047, 9131],
              [8059, 9118],
              [8042, 9108],
              [8010, 9128],
              [8066, 9058],
              [8099, 9037],
              [8119, 9044],
              [8148, 9098],
              [8181, 9073],
              [8206, 9070],
              [8250, 9084],
              [8315, 9063],
              [8280, 9079],
              [8331, 9085],
              [8344, 9072],
              [8369, 9075],
              [8355, 9101],
              [8364, 9114],
              [8344, 9113],
              [8355, 9132],
              [8401, 9137],
              [8386, 9154],
              [8414, 9147],
              [8528, 9135],
              [8568, 9123],
              [8526, 9123],
              [8514, 9129],
              [8498, 9114],
              [8518, 9119],
              [8572, 9122],
              [8555, 9111],
              [8542, 9116],
              [8539, 9100],
              [8512, 9092],
              [8525, 9086],
              [8550, 9094],
              [8580, 9123],
              [8616, 9121],
              [8651, 9112],
              [8665, 9100],
              [8644, 9099],
              [8634, 9088],
              [8662, 9086],
              [8659, 9075],
              [8682, 9078],
              [8682, 9065],
              [8707, 9068],
              [8728, 9043],
              [8771, 9042],
              [8838, 9055],
              [8887, 9054],
              [8914, 9048],
              [8949, 9032],
              [8960, 9009],
              [8949, 8990],
              [8989, 8967],
              [9029, 8979],
              [9077, 8984],
              [9100, 8973],
              [9162, 8970],
              [9188, 8984],
              [9205, 8955],
              [9232, 8949],
              [9242, 8932],
              [9263, 8935],
              [9282, 8947],
              [9270, 8975],
              [9271, 9002],
              [9335, 8994],
              [9416, 8989],
              [9470, 8976],
              [9511, 8959],
              [9526, 8958],
              [9546, 8944],
              [9582, 8931],
              [9586, 8920],
              [9615, 8910],
              [9664, 8885],
              [9655, 8877],
              [9686, 8876],
              [9690, 8859],
              [9712, 8819],
              [9724, 8816],
              [9724, 8840],
              [9707, 8846],
              [9792, 8840],
              [9802, 8826],
              [9851, 8799],
              [9827, 8787],
              [9827, 8774],
              [9778, 8770],
              [9781, 8747],
              [9765, 8730],
              [9777, 8716],
              [9743, 8711],
              [9703, 8735],
              [9683, 8734],
              [9669, 8745],
              [9668, 8764],
              [9637, 8774],
              [9624, 8766],
              [9591, 8769],
              [9578, 8795],
              [9557, 8802],
              [9555, 8783],
              [9569, 8775],
              [9557, 8751],
              [9532, 8736],
              [9495, 8728],
              [9441, 8738],
              [9452, 8724],
              [9470, 8723],
              [9489, 8707],
              [9497, 8714],
              [9511, 8679],
              [9506, 8669],
              [9530, 8656],
              [9536, 8637],
              [9521, 8618],
              [9490, 8629],
              [9451, 8627],
              [9385, 8596],
              [9357, 8593],
              [9355, 8584],
              [9312, 8553],
              [9294, 8550],
              [9270, 8534],
              [9265, 8513],
              [9251, 8517],
              [9231, 8540],
              [9202, 8541],
              [9162, 8528],
              [9138, 8507],
              [9146, 8536],
              [9109, 8518],
              [9100, 8506],
              [9065, 8517],
              [9051, 8493],
              [9048, 8470],
              [9029, 8456],
              [9017, 8432],
              [9032, 8417],
              [9038, 8426],
              [9056, 8415],
              [9040, 8400],
              [9040, 8375],
              [9053, 8375],
              [9057, 8351],
              [9048, 8344],
              [9034, 8355],
              [9021, 8349],
              [9010, 8327],
              [9021, 8297],
              [9010, 8283],
              [8980, 8283],
              [8959, 8269],
              [8952, 8248],
              [8960, 8225],
              [8947, 8232],
              [8918, 8217],
              [8915, 8195],
              [8892, 8164],
              [8862, 8142],
              [8843, 8219],
              [8827, 8314],
              [8830, 8340],
              [8841, 8376],
              [8869, 8403],
              [8863, 8418],
              [8883, 8420],
              [8929, 8446],
              [8954, 8477],
              [9014, 8524],
              [9015, 8533],
              [9061, 8559],
              [9077, 8575],
              [9080, 8616],
              [9092, 8625],
              [9112, 8622],
              [9093, 8635],
              [9054, 8628],
              [9046, 8595],
              [8962, 8540],
              [8971, 8561],
              [8952, 8556],
              [8951, 8570],
              [8966, 8584],
              [8968, 8602],
              [8945, 8589],
              [8939, 8600],
              [8883, 8594],
              [8860, 8582],
              [8859, 8568],
              [8809, 8531],
              [8787, 8509],
              [8783, 8493],
              [8809, 8493],
              [8816, 8479],
              [8782, 8473],
              [8762, 8482],
              [8749, 8467],
              [8732, 8473],
              [8703, 8465],
              [8684, 8477],
              [8686, 8492],
              [8651, 8504],
              [8626, 8492],
              [8627, 8481],
              [8601, 8488],
              [8591, 8481],
              [8554, 8489],
              [8483, 8489],
              [8444, 8481],
              [8415, 8454],
              [8395, 8444],
              [8383, 8421],
              [8329, 8385],
              [8296, 8348],
              [8227, 8298],
              [8243, 8285],
              [8276, 8286],
              [8273, 8252],
              [8281, 8267],
              [8302, 8259],
              [8289, 8243],
              [8307, 8245],
              [8331, 8274],
              [8362, 8273],
              [8410, 8227],
              [8403, 8196],
              [8413, 8190],
              [8395, 8167],
              [8381, 8124],
              [8385, 8088],
              [8373, 8045],
              [8346, 8020],
              [8327, 7993],
              [8312, 7962],
              [8247, 7895],
              [8224, 7863],
              [8189, 7841],
              [8166, 7834],
              [8141, 7841],
              [8141, 7856],
              [8127, 7857],
              [8094, 7820]
            ]
          ],
          [
            [
              [8570, 7897],
              [8578, 7911],
              [8622, 7935],
              [8646, 7938],
              [8664, 7956],
              [8680, 7962],
              [8652, 7939],
              [8595, 7917],
              [8573, 7896],
              [8528, 7875],
              [8549, 7899],
              [8570, 7897]
            ]
          ],
          [
            [
              [8464, 8080],
              [8443, 8028],
              [8449, 8007],
              [8468, 7973],
              [8441, 7977],
              [8430, 7950],
              [8422, 7976],
              [8433, 8027],
              [8426, 8060],
              [8432, 8092],
              [8428, 8125],
              [8435, 8149],
              [8418, 8172],
              [8417, 8197],
              [8425, 8222],
              [8420, 8236],
              [8440, 8237],
              [8451, 8249],
              [8443, 8274],
              [8457, 8266],
              [8453, 8254],
              [8465, 8227],
              [8463, 8163],
              [8470, 8162],
              [8480, 8116],
              [8494, 8075],
              [8464, 8080]
            ]
          ],
          [
            [
              [8585, 9302],
              [8616, 9301],
              [8622, 9288],
              [8637, 9292],
              [8688, 9283],
              [8681, 9269],
              [8640, 9261],
              [8609, 9264],
              [8547, 9290],
              [8556, 9311],
              [8579, 9296],
              [8585, 9302]
            ]
          ],
          [
            [
              [8415, 9336],
              [8408, 9347],
              [8443, 9327],
              [8484, 9326],
              [8527, 9306],
              [8486, 9277],
              [8453, 9284],
              [8442, 9298],
              [8457, 9318],
              [8437, 9319],
              [8429, 9308],
              [8446, 9281],
              [8477, 9272],
              [8438, 9265],
              [8422, 9276],
              [8370, 9266],
              [8353, 9273],
              [8339, 9255],
              [8306, 9267],
              [8276, 9297],
              [8251, 9302],
              [8234, 9298],
              [8241, 9327],
              [8255, 9311],
              [8279, 9313],
              [8292, 9333],
              [8336, 9349],
              [8362, 9329],
              [8397, 9313],
              [8395, 9335],
              [8415, 9336]
            ]
          ],
          [
            [
              [7224, 9473],
              [7190, 9458],
              [7167, 9463],
              [7197, 9498],
              [7214, 9511],
              [7219, 9534],
              [7256, 9553],
              [7281, 9546],
              [7274, 9528],
              [7301, 9535],
              [7321, 9516],
              [7338, 9515],
              [7346, 9493],
              [7367, 9477],
              [7379, 9471],
              [7412, 9472],
              [7408, 9464],
              [7377, 9468],
              [7342, 9491],
              [7330, 9482],
              [7298, 9477],
              [7224, 9473]
            ]
          ],
          [
            [
              [7021, 9557],
              [7004, 9561],
              [6976, 9550],
              [6963, 9553],
              [6972, 9531],
              [6959, 9534],
              [6962, 9555],
              [6976, 9554],
              [7017, 9576],
              [7041, 9598],
              [7085, 9599],
              [7117, 9603],
              [7141, 9583],
              [7146, 9595],
              [7165, 9595],
              [7189, 9580],
              [7187, 9570],
              [7176, 9543],
              [7161, 9543],
              [7187, 9523],
              [7171, 9513],
              [7122, 9512],
              [7094, 9524],
              [7042, 9527],
              [7022, 9540],
              [7021, 9557]
            ]
          ],
          [
            [
              [5615, 9613],
              [5661, 9614],
              [5638, 9622],
              [5667, 9630],
              [5689, 9627],
              [5703, 9635],
              [5685, 9645],
              [5725, 9662],
              [5737, 9672],
              [5743, 9648],
              [5764, 9638],
              [5742, 9628],
              [5706, 9625],
              [5709, 9619],
              [5680, 9618],
              [5688, 9604],
              [5644, 9596],
              [5653, 9608],
              [5629, 9603],
              [5615, 9613]
            ]
          ],
          [
            [
              [7064, 9680],
              [7099, 9654],
              [7128, 9639],
              [7106, 9636],
              [7106, 9607],
              [7027, 9600],
              [7019, 9594],
              [7003, 9591],
              [6939, 9611],
              [6950, 9623],
              [6975, 9627],
              [6990, 9646],
              [6967, 9645],
              [6984, 9660],
              [7038, 9670],
              [7064, 9680]
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'VA',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.61,
        'hc-middle-y': 0.44,
        'hc-key': 'va',
        'hc-a2': 'VA',
        name: 'Vatican',
        labelrank: '6',
        'country-abbrev': 'Vat.',
        subregion: 'Southern Europe',
        'region-wb': 'Europe & Central Asia',
        'iso-a3': 'VAT',
        'iso-a2': 'VA',
        'woe-id': '23424986',
        continent: 'Europe'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [4607, 7806],
            [4607, 7806],
            [4607, 7806],
            [4607, 7806],
            [4607, 7806]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'SM',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.48,
        'hc-middle-y': 0.42,
        'hc-key': 'sm',
        'hc-a2': 'SM',
        name: 'San Marino',
        labelrank: '6',
        'country-abbrev': 'S.M.',
        subregion: 'Southern Europe',
        'region-wb': 'Europe & Central Asia',
        'iso-a3': 'SMR',
        'iso-a2': 'SM',
        'woe-id': '23424947',
        continent: 'Europe'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [4607, 7877],
            [4605, 7878],
            [4606, 7880],
            [4608, 7880],
            [4607, 7877]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'KZ',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.57,
        'hc-middle-y': 0.46,
        'hc-key': 'kz',
        'hc-a2': 'KZ',
        name: 'Kazakhstan',
        labelrank: '3',
        'country-abbrev': 'Kaz.',
        subregion: 'Central Asia',
        'region-wb': 'Europe & Central Asia',
        'iso-a3': 'KAZ',
        'iso-a2': 'KZ',
        'woe-id': '-90',
        continent: 'Asia'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [5720, 7912],
              [5714, 7915],
              [5715, 7919],
              [5724, 7920],
              [5720, 7912]
            ]
          ],
          [
            [
              [5972, 7934],
              [5982, 7947],
              [5993, 7922],
              [5972, 7934]
            ]
          ],
          [
            [
              [6022, 7952],
              [6045, 7962],
              [6032, 7978],
              [6009, 7975],
              [6031, 7968],
              [6028, 7956],
              [6004, 7959],
              [5998, 7945],
              [5972, 7949],
              [5967, 7937],
              [5890, 7917],
              [5890, 7786],
              [5877, 7783],
              [5859, 7807],
              [5838, 7821],
              [5802, 7814],
              [5786, 7801],
              [5794, 7835],
              [5771, 7839],
              [5739, 7888],
              [5721, 7895],
              [5723, 7905],
              [5753, 7902],
              [5743, 7911],
              [5755, 7929],
              [5788, 7932],
              [5805, 7954],
              [5804, 7987],
              [5776, 7984],
              [5750, 7995],
              [5727, 7987],
              [5691, 7966],
              [5668, 7978],
              [5685, 7982],
              [5656, 8019],
              [5629, 8021],
              [5628, 8038],
              [5610, 8043],
              [5626, 8073],
              [5623, 8097],
              [5642, 8121],
              [5668, 8097],
              [5681, 8105],
              [5675, 8126],
              [5695, 8136],
              [5697, 8147],
              [5724, 8155],
              [5731, 8167],
              [5767, 8162],
              [5783, 8172],
              [5787, 8162],
              [5813, 8162],
              [5846, 8137],
              [5852, 8144],
              [5881, 8124],
              [5906, 8145],
              [5968, 8144],
              [5977, 8130],
              [6002, 8125],
              [6008, 8136],
              [6030, 8129],
              [6049, 8134],
              [6052, 8159],
              [6024, 8167],
              [6013, 8177],
              [6040, 8195],
              [6029, 8208],
              [6069, 8226],
              [6044, 8232],
              [6038, 8257],
              [6100, 8265],
              [6127, 8275],
              [6163, 8276],
              [6185, 8286],
              [6250, 8301],
              [6253, 8310],
              [6294, 8316],
              [6310, 8308],
              [6328, 8314],
              [6339, 8291],
              [6338, 8266],
              [6377, 8267],
              [6406, 8259],
              [6399, 8248],
              [6428, 8245],
              [6501, 8279],
              [6496, 8260],
              [6536, 8232],
              [6583, 8162],
              [6598, 8135],
              [6619, 8154],
              [6633, 8150],
              [6642, 8132],
              [6661, 8131],
              [6700, 8142],
              [6711, 8137],
              [6724, 8114],
              [6746, 8106],
              [6754, 8088],
              [6781, 8083],
              [6793, 8089],
              [6815, 8069],
              [6801, 8070],
              [6792, 8048],
              [6769, 8043],
              [6761, 8025],
              [6761, 7992],
              [6738, 7984],
              [6688, 7998],
              [6666, 7936],
              [6672, 7921],
              [6648, 7930],
              [6602, 7918],
              [6622, 7850],
              [6603, 7832],
              [6605, 7816],
              [6570, 7836],
              [6552, 7841],
              [6474, 7842],
              [6457, 7840],
              [6427, 7854],
              [6409, 7846],
              [6407, 7824],
              [6358, 7839],
              [6333, 7829],
              [6332, 7818],
              [6275, 7787],
              [6262, 7760],
              [6245, 7768],
              [6243, 7781],
              [6206, 7781],
              [6201, 7809],
              [6186, 7810],
              [6189, 7845],
              [6180, 7841],
              [6154, 7871],
              [6139, 7865],
              [6104, 7867],
              [6069, 7862],
              [6039, 7895],
              [6011, 7911],
              [6011, 7930],
              [6001, 7942],
              [6020, 7951],
              [6012, 7954],
              [6019, 7954],
              [6022, 7954],
              [6022, 7952]
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'AZ',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.8,
        'hc-middle-y': 0.52,
        'hc-key': 'az',
        'hc-a2': 'AZ',
        name: 'Azerbaijan',
        labelrank: '5',
        'country-abbrev': 'Aze.',
        subregion: 'Western Asia',
        'region-wb': 'Europe & Central Asia',
        'iso-a3': 'AZE',
        'iso-a2': 'AZ',
        'woe-id': '23424741',
        continent: 'Asia'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [5567, 7776],
              [5566, 7775],
              [5566, 7777],
              [5567, 7777],
              [5567, 7776]
            ]
          ],
          [
            [
              [5573, 7774],
              [5572, 7773],
              [5572, 7774],
              [5572, 7774],
              [5573, 7774]
            ]
          ],
          [
            [
              [5561, 7727],
              [5560, 7729],
              [5590, 7724],
              [5600, 7700],
              [5580, 7705],
              [5561, 7727]
            ]
          ],
          [
            [
              [5672, 7804],
              [5702, 7761],
              [5716, 7760],
              [5698, 7742],
              [5690, 7706],
              [5684, 7711],
              [5681, 7686],
              [5655, 7699],
              [5665, 7718],
              [5654, 7729],
              [5611, 7701],
              [5607, 7718],
              [5585, 7740],
              [5595, 7747],
              [5578, 7763],
              [5584, 7770],
              [5567, 7785],
              [5574, 7790],
              [5611, 7776],
              [5616, 7784],
              [5601, 7797],
              [5609, 7806],
              [5648, 7781],
              [5672, 7804]
            ],
            [
              [5581, 7761],
              [5582, 7760],
              [5583, 7762],
              [5581, 7762],
              [5581, 7761]
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'AM',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.1,
        'hc-middle-y': 0.12,
        'hc-key': 'am',
        'hc-a2': 'AM',
        name: 'Armenia',
        labelrank: '6',
        'country-abbrev': 'Arm.',
        subregion: 'Western Asia',
        'region-wb': 'Europe & Central Asia',
        'iso-a3': 'ARM',
        'iso-a2': 'AM',
        'woe-id': '23424743',
        continent: 'Asia'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [5581, 7761],
              [5581, 7762],
              [5583, 7762],
              [5582, 7760],
              [5581, 7761]
            ]
          ],
          [
            [
              [5611, 7701],
              [5607, 7702],
              [5600, 7700],
              [5590, 7724],
              [5560, 7729],
              [5547, 7741],
              [5527, 7743],
              [5529, 7763],
              [5521, 7778],
              [5542, 7782],
              [5567, 7785],
              [5584, 7770],
              [5578, 7763],
              [5595, 7747],
              [5585, 7740],
              [5607, 7718],
              [5611, 7701]
            ],
            [
              [5567, 7776],
              [5567, 7777],
              [5566, 7777],
              [5566, 7775],
              [5567, 7776]
            ],
            [
              [5573, 7774],
              [5572, 7774],
              [5572, 7774],
              [5572, 7773],
              [5573, 7774]
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'TJ',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.49,
        'hc-middle-y': 0.5,
        'hc-key': 'tj',
        'hc-a2': 'TJ',
        name: 'Tajikistan',
        labelrank: '4',
        'country-abbrev': 'Tjk.',
        subregion: 'Central Asia',
        'region-wb': 'Europe & Central Asia',
        'iso-a3': 'TJK',
        'iso-a2': 'TJ',
        'woe-id': '23424961',
        continent: 'Asia'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [6323, 7773],
              [6322, 7772],
              [6320, 7775],
              [6321, 7775],
              [6323, 7773]
            ]
          ],
          [
            [
              [6322, 7734],
              [6325, 7733],
              [6321, 7731],
              [6318, 7735],
              [6322, 7734]
            ]
          ],
          [
            [
              [6411, 7720],
              [6416, 7691],
              [6444, 7689],
              [6448, 7645],
              [6432, 7651],
              [6413, 7644],
              [6401, 7653],
              [6382, 7638],
              [6351, 7627],
              [6346, 7639],
              [6351, 7667],
              [6343, 7680],
              [6322, 7683],
              [6308, 7655],
              [6289, 7656],
              [6282, 7640],
              [6265, 7646],
              [6245, 7634],
              [6238, 7643],
              [6255, 7679],
              [6248, 7704],
              [6226, 7713],
              [6237, 7726],
              [6258, 7723],
              [6271, 7736],
              [6287, 7768],
              [6294, 7762],
              [6317, 7775],
              [6326, 7764],
              [6315, 7756],
              [6332, 7748],
              [6319, 7741],
              [6303, 7747],
              [6281, 7731],
              [6283, 7723],
              [6318, 7726],
              [6327, 7718],
              [6347, 7726],
              [6370, 7712],
              [6381, 7719],
              [6411, 7720]
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'LS',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.5,
        'hc-middle-y': 0.51,
        'hc-key': 'ls',
        'hc-a2': 'LS',
        name: 'Lesotho',
        labelrank: '6',
        'country-abbrev': 'Les.',
        subregion: 'Southern Africa',
        'region-wb': 'Sub-Saharan Africa',
        'iso-a3': 'LSO',
        'iso-a2': 'LS',
        'woe-id': '23424880',
        continent: 'Africa'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [5070, 5635],
            [5084, 5639],
            [5108, 5615],
            [5099, 5596],
            [5077, 5589],
            [5068, 5572],
            [5047, 5584],
            [5036, 5606],
            [5070, 5635]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'UZ',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.46,
        'hc-middle-y': 0.53,
        'hc-key': 'uz',
        'hc-a2': 'UZ',
        name: 'Uzbekistan',
        labelrank: '3',
        'country-abbrev': 'Uzb.',
        subregion: 'Central Asia',
        'region-wb': 'Europe & Central Asia',
        'iso-a3': 'UZB',
        'iso-a2': 'UZ',
        'woe-id': '23424980',
        continent: 'Asia'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [6356, 7736],
              [6354, 7737],
              [6353, 7737],
              [6356, 7739],
              [6356, 7736]
            ]
          ],
          [
            [
              [6338, 7741],
              [6339, 7736],
              [6334, 7735],
              [6332, 7743],
              [6338, 7741]
            ]
          ],
          [
            [
              [5993, 7922],
              [5985, 7908],
              [6006, 7889],
              [6011, 7911],
              [6039, 7895],
              [6069, 7862],
              [6104, 7867],
              [6139, 7865],
              [6154, 7871],
              [6180, 7841],
              [6189, 7845],
              [6186, 7810],
              [6201, 7809],
              [6206, 7781],
              [6243, 7781],
              [6245, 7768],
              [6262, 7760],
              [6275, 7787],
              [6332, 7818],
              [6341, 7816],
              [6309, 7795],
              [6346, 7779],
              [6355, 7790],
              [6382, 7770],
              [6396, 7767],
              [6353, 7745],
              [6332, 7748],
              [6315, 7756],
              [6326, 7764],
              [6317, 7775],
              [6294, 7762],
              [6287, 7768],
              [6271, 7736],
              [6258, 7723],
              [6237, 7726],
              [6226, 7713],
              [6248, 7704],
              [6255, 7679],
              [6238, 7643],
              [6223, 7643],
              [6201, 7649],
              [6202, 7672],
              [6174, 7679],
              [6137, 7704],
              [6130, 7704],
              [6081, 7740],
              [6067, 7774],
              [6012, 7788],
              [6005, 7820],
              [5992, 7820],
              [5967, 7838],
              [5939, 7815],
              [5932, 7822],
              [5922, 7807],
              [5921, 7783],
              [5890, 7786],
              [5890, 7917],
              [5967, 7937],
              [5957, 7914],
              [5959, 7896],
              [5973, 7907],
              [5972, 7934],
              [5993, 7922]
            ],
            [
              [6323, 7773],
              [6321, 7775],
              [6320, 7775],
              [6322, 7772],
              [6323, 7773]
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'PT',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.46,
        'hc-middle-y': 0.51,
        'hc-key': 'pt',
        'hc-a2': 'PT',
        name: 'Portugal',
        labelrank: '2',
        'country-abbrev': 'Port.',
        subregion: 'Southern Europe',
        'region-wb': 'Europe & Central Asia',
        'iso-a3': 'PRT',
        'iso-a2': 'PT',
        'woe-id': '23424925',
        continent: 'Europe'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [4021, 7643],
            [4005, 7636],
            [3974, 7638],
            [3981, 7677],
            [3960, 7695],
            [3983, 7768],
            [3982, 7808],
            [3997, 7815],
            [3998, 7803],
            [4046, 7807],
            [4057, 7794],
            [4035, 7775],
            [4039, 7752],
            [4033, 7729],
            [4017, 7728],
            [4034, 7705],
            [4023, 7686],
            [4032, 7672],
            [4018, 7656],
            [4021, 7643]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'MA',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.6,
        'hc-middle-y': 0.21,
        'hc-key': 'ma',
        'hc-a2': 'MA',
        name: 'Morocco',
        labelrank: '3',
        'country-abbrev': 'Mor.',
        subregion: 'Northern Africa',
        'region-wb': 'Middle East & North Africa',
        'iso-a3': 'MAR',
        'iso-a2': 'MA',
        'woe-id': '23424893',
        continent: 'Africa'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [4153, 7579],
            [4154, 7579],
            [4155, 7574],
            [4174, 7573],
            [4187, 7561],
            [4190, 7512],
            [4209, 7488],
            [4203, 7474],
            [4165, 7475],
            [4156, 7464],
            [4132, 7460],
            [4132, 7429],
            [4111, 7423],
            [4070, 7394],
            [4014, 7386],
            [3984, 7364],
            [3984, 7332],
            [3980, 7315],
            [3953, 7306],
            [3918, 7311],
            [3904, 7307],
            [3894, 7283],
            [3885, 7280],
            [3873, 7243],
            [3854, 7229],
            [3826, 7199],
            [3820, 7165],
            [3802, 7138],
            [3738, 7137],
            [3747, 7164],
            [3779, 7218],
            [3800, 7239],
            [3812, 7283],
            [3838, 7301],
            [3858, 7340],
            [3901, 7353],
            [3928, 7374],
            [3950, 7401],
            [3956, 7419],
            [3948, 7428],
            [3949, 7452],
            [3966, 7477],
            [3967, 7490],
            [3988, 7513],
            [4038, 7538],
            [4054, 7566],
            [4065, 7596],
            [4080, 7601],
            [4081, 7599],
            [4082, 7598],
            [4085, 7589],
            [4111, 7575],
            [4153, 7581],
            [4153, 7581],
            [4153, 7579]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'CO',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.5,
        'hc-middle-y': 0.54,
        'hc-key': 'co',
        'hc-a2': 'CO',
        name: 'Colombia',
        labelrank: '2',
        'country-abbrev': 'Col.',
        subregion: 'South America',
        'region-wb': 'Latin America & Caribbean',
        'iso-a3': 'COL',
        'iso-a2': 'CO',
        'woe-id': '23424787',
        continent: 'South America'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [2020, 6497],
            [1990, 6513],
            [1986, 6507],
            [1957, 6511],
            [1955, 6519],
            [1915, 6542],
            [1919, 6564],
            [1930, 6578],
            [1944, 6580],
            [1966, 6613],
            [1953, 6623],
            [1959, 6631],
            [1962, 6670],
            [1959, 6693],
            [1943, 6712],
            [1964, 6733],
            [1958, 6754],
            [1976, 6733],
            [1971, 6751],
            [2010, 6778],
            [2012, 6811],
            [2033, 6827],
            [2047, 6817],
            [2054, 6834],
            [2078, 6832],
            [2131, 6866],
            [2136, 6849],
            [2117, 6843],
            [2089, 6807],
            [2087, 6788],
            [2075, 6769],
            [2087, 6773],
            [2105, 6745],
            [2102, 6720],
            [2114, 6708],
            [2172, 6705],
            [2192, 6680],
            [2249, 6682],
            [2239, 6655],
            [2238, 6633],
            [2255, 6600],
            [2239, 6585],
            [2258, 6570],
            [2268, 6536],
            [2261, 6534],
            [2254, 6561],
            [2230, 6550],
            [2180, 6550],
            [2180, 6531],
            [2194, 6531],
            [2201, 6519],
            [2174, 6517],
            [2173, 6495],
            [2187, 6485],
            [2192, 6458],
            [2176, 6376],
            [2154, 6389],
            [2174, 6420],
            [2145, 6436],
            [2124, 6437],
            [2105, 6428],
            [2081, 6435],
            [2081, 6448],
            [2068, 6463],
            [2050, 6471],
            [2033, 6495],
            [2020, 6497]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'TL',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.63,
        'hc-middle-y': 0.31,
        'hc-key': 'tl',
        'hc-a2': 'TL',
        name: 'East Timor',
        labelrank: '5',
        'country-abbrev': 'T.L.',
        subregion: 'South-Eastern Asia',
        'region-wb': 'East Asia & Pacific',
        'iso-a3': 'TLS',
        'iso-a2': 'TL',
        'woe-id': '23424968',
        continent: 'Asia'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [7897, 6226],
              [7903, 6228],
              [7910, 6230],
              [7904, 6221],
              [7897, 6226]
            ]
          ],
          [
            [
              [7923, 6237],
              [7930, 6246],
              [7984, 6256],
              [7994, 6253],
              [7969, 6237],
              [7928, 6221],
              [7924, 6229],
              [7923, 6237]
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'KH',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.83,
        'hc-middle-y': 0.49,
        'hc-key': 'kh',
        'hc-a2': 'KH',
        name: 'Cambodia',
        labelrank: '3',
        'country-abbrev': 'Camb.',
        subregion: 'South-Eastern Asia',
        'region-wb': 'East Asia & Pacific',
        'iso-a3': 'KHM',
        'iso-a2': 'KH',
        'woe-id': '23424776',
        continent: 'Asia'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [7320, 6806],
            [7295, 6809],
            [7297, 6825],
            [7280, 6822],
            [7274, 6843],
            [7262, 6872],
            [7257, 6900],
            [7275, 6918],
            [7296, 6926],
            [7341, 6923],
            [7362, 6910],
            [7365, 6924],
            [7381, 6930],
            [7389, 6922],
            [7410, 6934],
            [7404, 6916],
            [7413, 6898],
            [7410, 6863],
            [7378, 6844],
            [7366, 6846],
            [7358, 6824],
            [7337, 6821],
            [7320, 6806]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'AR',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.45,
        'hc-middle-y': 0.27,
        'hc-key': 'ar',
        'hc-a2': 'AR',
        name: 'Argentina',
        labelrank: '2',
        'country-abbrev': 'Arg.',
        subregion: 'South America',
        'region-wb': 'Latin America & Caribbean',
        'iso-a3': 'ARG',
        'iso-a2': 'AR',
        'woe-id': '23424747',
        continent: 'South America'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [2215, 4706],
              [2218, 4703],
              [2215, 4702],
              [2215, 4706]
            ]
          ],
          [
            [
              [2215, 4706],
              [2216, 4793],
              [2227, 4779],
              [2221, 4767],
              [2255, 4736],
              [2298, 4712],
              [2319, 4712],
              [2334, 4702],
              [2302, 4701],
              [2277, 4696],
              [2263, 4701],
              [2215, 4706]
            ]
          ],
          [
            [
              [2541, 5588],
              [2523, 5532],
              [2523, 5514],
              [2519, 5492],
              [2518, 5486],
              [2512, 5454],
              [2525, 5438],
              [2555, 5415],
              [2547, 5401],
              [2568, 5367],
              [2541, 5324],
              [2498, 5305],
              [2445, 5296],
              [2409, 5298],
              [2408, 5266],
              [2397, 5250],
              [2410, 5245],
              [2401, 5230],
              [2380, 5220],
              [2357, 5220],
              [2326, 5236],
              [2318, 5227],
              [2321, 5192],
              [2335, 5175],
              [2359, 5188],
              [2364, 5164],
              [2349, 5159],
              [2339, 5172],
              [2323, 5163],
              [2340, 5156],
              [2313, 5131],
              [2316, 5106],
              [2304, 5095],
              [2305, 5082],
              [2287, 5083],
              [2254, 5061],
              [2245, 5040],
              [2251, 5025],
              [2270, 5009],
              [2294, 5007],
              [2301, 4990],
              [2294, 4970],
              [2247, 4934],
              [2237, 4896],
              [2209, 4883],
              [2200, 4858],
              [2207, 4832],
              [2221, 4804],
              [2177, 4818],
              [2119, 4819],
              [2103, 4836],
              [2107, 4871],
              [2082, 4867],
              [2071, 4891],
              [2070, 4914],
              [2099, 4942],
              [2108, 4959],
              [2100, 4975],
              [2107, 4993],
              [2119, 5001],
              [2128, 5047],
              [2122, 5056],
              [2137, 5072],
              [2115, 5092],
              [2137, 5090],
              [2140, 5104],
              [2122, 5105],
              [2126, 5122],
              [2112, 5155],
              [2113, 5181],
              [2124, 5187],
              [2118, 5235],
              [2131, 5274],
              [2134, 5298],
              [2150, 5306],
              [2140, 5339],
              [2145, 5380],
              [2164, 5395],
              [2164, 5425],
              [2182, 5484],
              [2158, 5543],
              [2171, 5582],
              [2178, 5583],
              [2174, 5614],
              [2186, 5645],
              [2199, 5659],
              [2210, 5685],
              [2225, 5692],
              [2217, 5759],
              [2227, 5771],
              [2254, 5783],
              [2263, 5814],
              [2258, 5820],
              [2286, 5851],
              [2301, 5841],
              [2335, 5839],
              [2343, 5818],
              [2354, 5845],
              [2387, 5845],
              [2392, 5838],
              [2413, 5813],
              [2441, 5789],
              [2469, 5783],
              [2505, 5759],
              [2536, 5746],
              [2542, 5738],
              [2527, 5717],
              [2511, 5679],
              [2529, 5681],
              [2553, 5674],
              [2585, 5680],
              [2595, 5675],
              [2624, 5700],
              [2629, 5734],
              [2650, 5732],
              [2657, 5712],
              [2652, 5684],
              [2621, 5669],
              [2595, 5650],
              [2576, 5623],
              [2541, 5588]
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'SA',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.43,
        'hc-middle-y': 0.5,
        'hc-key': 'sa',
        'hc-a2': 'SA',
        name: 'Saudi Arabia',
        labelrank: '2',
        'country-abbrev': 'Saud.',
        subregion: 'Western Asia',
        'region-wb': 'Middle East & North Africa',
        'iso-a3': 'SAU',
        'iso-a2': 'SA',
        'woe-id': '23424938',
        continent: 'Asia'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [5668, 7360],
            [5681, 7329],
            [5719, 7300],
            [5718, 7271],
            [5738, 7240],
            [5743, 7235],
            [5750, 7236],
            [5752, 7226],
            [5760, 7225],
            [5789, 7184],
            [5865, 7174],
            [5867, 7177],
            [5880, 7154],
            [5861, 7094],
            [5772, 7063],
            [5688, 7052],
            [5660, 7038],
            [5638, 7006],
            [5571, 7016],
            [5512, 7013],
            [5514, 6997],
            [5501, 6984],
            [5494, 6999],
            [5483, 6990],
            [5472, 6997],
            [5489, 7008],
            [5455, 7054],
            [5447, 7079],
            [5409, 7108],
            [5392, 7134],
            [5392, 7172],
            [5374, 7210],
            [5346, 7225],
            [5338, 7253],
            [5319, 7272],
            [5308, 7299],
            [5278, 7343],
            [5259, 7346],
            [5270, 7386],
            [5302, 7380],
            [5323, 7402],
            [5345, 7406],
            [5360, 7422],
            [5329, 7454],
            [5394, 7475],
            [5432, 7468],
            [5480, 7441],
            [5558, 7381],
            [5612, 7377],
            [5638, 7374],
            [5645, 7359],
            [5668, 7360]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'PK',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.29,
        'hc-middle-y': 0.74,
        'hc-key': 'pk',
        'hc-a2': 'PK',
        name: 'Pakistan',
        labelrank: '2',
        'country-abbrev': 'Pak.',
        subregion: 'Southern Asia',
        'region-wb': 'South Asia',
        'iso-a3': 'PAK',
        'iso-a2': 'PK',
        'woe-id': '23424922',
        continent: 'Asia'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [6250, 7212],
            [6226, 7219],
            [6221, 7238],
            [6206, 7243],
            [6196, 7263],
            [6112, 7254],
            [6056, 7254],
            [6063, 7286],
            [6100, 7299],
            [6107, 7314],
            [6090, 7319],
            [6090, 7350],
            [6065, 7360],
            [6034, 7402],
            [6082, 7387],
            [6129, 7387],
            [6192, 7401],
            [6197, 7436],
            [6214, 7449],
            [6226, 7445],
            [6249, 7465],
            [6269, 7458],
            [6283, 7469],
            [6281, 7485],
            [6290, 7506],
            [6313, 7514],
            [6304, 7538],
            [6335, 7538],
            [6332, 7553],
            [6352, 7576],
            [6338, 7605],
            [6379, 7631],
            [6438, 7638],
            [6455, 7637],
            [6480, 7619],
            [6486, 7597],
            [6504, 7591],
            [6512, 7573],
            [6500, 7561],
            [6474, 7553],
            [6432, 7562],
            [6415, 7549],
            [6422, 7510],
            [6443, 7486],
            [6460, 7476],
            [6436, 7462],
            [6438, 7442],
            [6403, 7404],
            [6390, 7376],
            [6373, 7367],
            [6359, 7341],
            [6325, 7334],
            [6317, 7344],
            [6291, 7317],
            [6288, 7305],
            [6308, 7296],
            [6306, 7279],
            [6335, 7238],
            [6303, 7222],
            [6270, 7224],
            [6250, 7212]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'YE',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.39,
        'hc-middle-y': 0.75,
        'hc-key': 'ye',
        'hc-a2': 'YE',
        name: 'Yemen',
        labelrank: '3',
        'country-abbrev': 'Yem.',
        subregion: 'Western Asia',
        'region-wb': 'Middle East & North Africa',
        'iso-a3': 'YEM',
        'iso-a2': 'YE',
        'woe-id': '23425002',
        continent: 'Asia'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [5772, 7063],
            [5794, 7012],
            [5805, 6992],
            [5789, 6986],
            [5780, 6961],
            [5754, 6950],
            [5702, 6935],
            [5676, 6914],
            [5656, 6914],
            [5617, 6896],
            [5591, 6894],
            [5570, 6882],
            [5536, 6871],
            [5522, 6878],
            [5499, 6960],
            [5501, 6984],
            [5514, 6997],
            [5512, 7013],
            [5571, 7016],
            [5638, 7006],
            [5660, 7038],
            [5688, 7052],
            [5772, 7063]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'AE',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.59,
        'hc-middle-y': 0.64,
        'hc-key': 'ae',
        'hc-a2': 'AE',
        name: 'United Arab Emirates',
        labelrank: '4',
        'country-abbrev': 'U.A.E.',
        subregion: 'Western Asia',
        'region-wb': 'Middle East & North Africa',
        'iso-a3': 'ARE',
        'iso-a2': 'AE',
        'woe-id': '23424738',
        continent: 'Asia'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [5899, 7268],
            [5902, 7264],
            [5902, 7247],
            [5885, 7244],
            [5884, 7224],
            [5867, 7177],
            [5865, 7174],
            [5789, 7184],
            [5760, 7225],
            [5767, 7217],
            [5790, 7222],
            [5836, 7221],
            [5893, 7281],
            [5895, 7269],
            [5899, 7268]
          ],
          [
            [5899, 7255],
            [5901, 7257],
            [5898, 7258],
            [5898, 7255],
            [5899, 7255]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'KE',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.87,
        'hc-middle-y': 0.7,
        'hc-key': 'ke',
        'hc-a2': 'KE',
        name: 'Kenya',
        labelrank: '2',
        'country-abbrev': 'Ken.',
        subregion: 'Eastern Africa',
        'region-wb': 'Sub-Saharan Africa',
        'iso-a3': 'KEN',
        'iso-a2': 'KE',
        'woe-id': '23424863',
        continent: 'Africa'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [5395, 6363],
            [5353, 6393],
            [5350, 6411],
            [5244, 6469],
            [5250, 6493],
            [5242, 6507],
            [5271, 6548],
            [5269, 6573],
            [5255, 6593],
            [5255, 6607],
            [5242, 6624],
            [5253, 6635],
            [5284, 6647],
            [5299, 6635],
            [5326, 6630],
            [5363, 6606],
            [5405, 6600],
            [5415, 6613],
            [5442, 6626],
            [5453, 6616],
            [5475, 6617],
            [5448, 6582],
            [5448, 6474],
            [5464, 6450],
            [5424, 6419],
            [5423, 6404],
            [5401, 6364],
            [5395, 6363]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'PE',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.68,
        'hc-middle-y': 0.7,
        'hc-key': 'pe',
        'hc-a2': 'PE',
        name: 'Peru',
        labelrank: '2',
        'country-abbrev': 'Peru',
        subregion: 'South America',
        'region-wb': 'Latin America & Caribbean',
        'iso-a3': 'PER',
        'iso-a2': 'PE',
        'woe-id': '23424919',
        continent: 'South America'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [2194, 6042],
            [2184, 6048],
            [2175, 6032],
            [2202, 6020],
            [2203, 6021],
            [2206, 6021],
            [2202, 6012],
            [2204, 6011],
            [2185, 5988],
            [2190, 5982],
            [2176, 5959],
            [2164, 5957],
            [2135, 5976],
            [2131, 5988],
            [2105, 6005],
            [2066, 6021],
            [2022, 6046],
            [1990, 6085],
            [1992, 6106],
            [1950, 6168],
            [1925, 6230],
            [1910, 6259],
            [1896, 6273],
            [1882, 6301],
            [1848, 6322],
            [1855, 6334],
            [1845, 6347],
            [1844, 6376],
            [1870, 6401],
            [1876, 6386],
            [1865, 6380],
            [1895, 6367],
            [1908, 6353],
            [1920, 6367],
            [1929, 6401],
            [1943, 6412],
            [1978, 6425],
            [2011, 6455],
            [2020, 6497],
            [2033, 6495],
            [2050, 6471],
            [2068, 6463],
            [2081, 6448],
            [2081, 6435],
            [2105, 6428],
            [2124, 6437],
            [2145, 6436],
            [2174, 6420],
            [2154, 6389],
            [2176, 6376],
            [2152, 6378],
            [2119, 6368],
            [2089, 6349],
            [2080, 6322],
            [2083, 6312],
            [2065, 6298],
            [2057, 6279],
            [2088, 6233],
            [2081, 6224],
            [2107, 6220],
            [2111, 6206],
            [2140, 6208],
            [2160, 6223],
            [2156, 6176],
            [2188, 6178],
            [2214, 6132],
            [2205, 6120],
            [2202, 6097],
            [2209, 6081],
            [2194, 6058],
            [2194, 6042]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'DO',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.48,
        'hc-middle-y': 0.43,
        'hc-key': 'do',
        'hc-a2': 'DO',
        name: 'Dominican Republic',
        labelrank: '5',
        'country-abbrev': 'Dom. Rep.',
        subregion: 'Caribbean',
        'region-wb': 'Latin America & Caribbean',
        'iso-a3': 'DOM',
        'iso-a2': 'DO',
        'woe-id': '23424800',
        continent: 'North America'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [2119, 7048],
            [2119, 7048],
            [2118, 7049],
            [2118, 7049],
            [2116, 7051],
            [2125, 7056],
            [2124, 7085],
            [2146, 7092],
            [2177, 7084],
            [2187, 7066],
            [2213, 7062],
            [2224, 7053],
            [2217, 7036],
            [2207, 7045],
            [2178, 7047],
            [2159, 7039],
            [2155, 7046],
            [2134, 7021],
            [2123, 7034],
            [2125, 7042],
            [2119, 7048]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'HT',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.8,
        'hc-middle-y': 0.08,
        'hc-key': 'ht',
        'hc-a2': 'HT',
        name: 'Haiti',
        labelrank: '5',
        'country-abbrev': 'Haiti',
        subregion: 'Caribbean',
        'region-wb': 'Latin America & Caribbean',
        'iso-a3': 'HTI',
        'iso-a2': 'HT',
        'woe-id': '23424839',
        continent: 'North America'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [2119, 7048],
              [2118, 7048],
              [2118, 7049],
              [2118, 7049],
              [2119, 7048]
            ]
          ],
          [
            [
              [2124, 7085],
              [2125, 7056],
              [2116, 7051],
              [2117, 7048],
              [2119, 7048],
              [2125, 7042],
              [2123, 7034],
              [2114, 7040],
              [2078, 7041],
              [2060, 7034],
              [2043, 7046],
              [2050, 7053],
              [2095, 7046],
              [2095, 7076],
              [2074, 7087],
              [2094, 7092],
              [2124, 7085]
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'AO',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.5,
        'hc-middle-y': 0.67,
        'hc-key': 'ao',
        'hc-a2': 'AO',
        name: 'Angola',
        labelrank: '3',
        'country-abbrev': 'Ang.',
        subregion: 'Middle Africa',
        'region-wb': 'Sub-Saharan Africa',
        'iso-a3': 'AGO',
        'iso-a2': 'AO',
        'woe-id': '23424745',
        continent: 'Africa'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [4600, 6331],
              [4600, 6340],
              [4594, 6353],
              [4616, 6371],
              [4625, 6364],
              [4607, 6352],
              [4608, 6332],
              [4600, 6331]
            ]
          ],
          [
            [
              [4587, 5989],
              [4586, 6033],
              [4602, 6065],
              [4609, 6104],
              [4642, 6139],
              [4646, 6186],
              [4623, 6233],
              [4634, 6255],
              [4618, 6297],
              [4602, 6321],
              [4628, 6328],
              [4721, 6328],
              [4729, 6326],
              [4741, 6286],
              [4759, 6262],
              [4810, 6265],
              [4815, 6295],
              [4847, 6297],
              [4845, 6286],
              [4882, 6286],
              [4887, 6252],
              [4882, 6224],
              [4893, 6208],
              [4895, 6169],
              [4946, 6180],
              [4947, 6117],
              [4888, 6117],
              [4888, 6022],
              [4891, 6011],
              [4929, 5978],
              [4853, 5966],
              [4793, 5975],
              [4784, 5985],
              [4651, 5985],
              [4628, 5999],
              [4610, 5990],
              [4587, 5989]
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'VN',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.42,
        'hc-middle-y': 0.96,
        'hc-key': 'vn',
        'hc-a2': 'VN',
        name: 'Vietnam',
        labelrank: '2',
        'country-abbrev': 'Viet.',
        subregion: 'South-Eastern Asia',
        'region-wb': 'East Asia & Pacific',
        'iso-a3': 'VNM',
        'iso-a2': 'VN',
        'woe-id': '23424984',
        continent: 'Asia'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [7320, 6806],
            [7337, 6821],
            [7358, 6824],
            [7366, 6846],
            [7378, 6844],
            [7410, 6863],
            [7413, 6898],
            [7404, 6916],
            [7410, 6934],
            [7415, 6951],
            [7399, 6966],
            [7406, 6970],
            [7381, 7002],
            [7357, 7023],
            [7327, 7057],
            [7302, 7072],
            [7306, 7084],
            [7325, 7082],
            [7335, 7096],
            [7317, 7107],
            [7325, 7114],
            [7308, 7123],
            [7297, 7114],
            [7281, 7120],
            [7276, 7142],
            [7251, 7167],
            [7261, 7179],
            [7277, 7168],
            [7286, 7179],
            [7305, 7171],
            [7345, 7197],
            [7361, 7183],
            [7387, 7178],
            [7381, 7166],
            [7405, 7143],
            [7424, 7139],
            [7418, 7124],
            [7393, 7122],
            [7382, 7101],
            [7366, 7094],
            [7354, 7063],
            [7378, 7037],
            [7384, 7017],
            [7421, 6981],
            [7430, 6979],
            [7447, 6954],
            [7463, 6909],
            [7468, 6880],
            [7460, 6872],
            [7462, 6852],
            [7454, 6834],
            [7403, 6805],
            [7387, 6809],
            [7380, 6780],
            [7352, 6768],
            [7339, 6753],
            [7329, 6759],
            [7330, 6800],
            [7307, 6795],
            [7302, 6805],
            [7320, 6806]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'MZ',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.83,
        'hc-middle-y': 0.28,
        'hc-key': 'mz',
        'hc-a2': 'MZ',
        name: 'Mozambique',
        labelrank: '3',
        'country-abbrev': 'Moz.',
        subregion: 'Eastern Africa',
        'region-wb': 'Sub-Saharan Africa',
        'iso-a3': 'MOZ',
        'iso-a2': 'MZ',
        'woe-id': '23424902',
        continent: 'Africa'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [5268, 6102],
            [5263, 6141],
            [5271, 6159],
            [5296, 6164],
            [5307, 6156],
            [5332, 6160],
            [5345, 6155],
            [5363, 6169],
            [5375, 6164],
            [5419, 6182],
            [5432, 6192],
            [5431, 6167],
            [5438, 6124],
            [5435, 6098],
            [5444, 6063],
            [5437, 6043],
            [5416, 6015],
            [5357, 5986],
            [5333, 5971],
            [5308, 5940],
            [5305, 5943],
            [5268, 5910],
            [5262, 5893],
            [5286, 5842],
            [5283, 5788],
            [5275, 5764],
            [5234, 5749],
            [5208, 5734],
            [5198, 5722],
            [5210, 5694],
            [5194, 5694],
            [5187, 5694],
            [5184, 5712],
            [5182, 5722],
            [5183, 5770],
            [5169, 5800],
            [5162, 5833],
            [5195, 5867],
            [5198, 5889],
            [5213, 5905],
            [5206, 5922],
            [5214, 5956],
            [5212, 6007],
            [5181, 6014],
            [5161, 6027],
            [5136, 6027],
            [5136, 6038],
            [5131, 6058],
            [5219, 6087],
            [5232, 6069],
            [5252, 6076],
            [5259, 6048],
            [5249, 6031],
            [5280, 5993],
            [5276, 6011],
            [5295, 6026],
            [5297, 6068],
            [5268, 6102]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'CR',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.09,
        'hc-middle-y': 0.05,
        'hc-key': 'cr',
        'hc-a2': 'CR',
        name: 'Costa Rica',
        labelrank: '5',
        'country-abbrev': 'C.R.',
        subregion: 'Central America',
        'region-wb': 'Latin America & Caribbean',
        'iso-a3': 'CRI',
        'iso-a2': 'CR',
        'woe-id': '23424791',
        continent: 'North America'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [1773, 6821],
              [1778, 6808],
              [1805, 6781],
              [1791, 6745],
              [1791, 6745],
              [1787, 6754],
              [1743, 6784],
              [1730, 6781],
              [1707, 6804],
              [1712, 6826],
              [1752, 6823],
              [1773, 6821]
            ]
          ],
          [
            [
              [1795, 6736],
              [1790, 6744],
              [1791, 6745],
              [1791, 6745],
              [1795, 6736]
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'IR',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.58,
        'hc-middle-y': 0.5,
        'hc-key': 'ir',
        'hc-a2': 'IR',
        name: 'Iran',
        labelrank: '2',
        'country-abbrev': 'Iran',
        subregion: 'Southern Asia',
        'region-wb': 'Middle East & North Africa',
        'iso-a3': 'IRN',
        'iso-a2': 'IR',
        'woe-id': '23424851',
        continent: 'Asia'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [5560, 7642],
            [5555, 7661],
            [5544, 7670],
            [5545, 7700],
            [5538, 7718],
            [5561, 7727],
            [5580, 7705],
            [5600, 7700],
            [5607, 7702],
            [5611, 7701],
            [5654, 7729],
            [5665, 7718],
            [5655, 7699],
            [5681, 7686],
            [5685, 7662],
            [5720, 7650],
            [5746, 7628],
            [5770, 7623],
            [5816, 7633],
            [5832, 7631],
            [5829, 7648],
            [5855, 7655],
            [5875, 7674],
            [5927, 7680],
            [5931, 7670],
            [5974, 7660],
            [6010, 7638],
            [6019, 7625],
            [6044, 7622],
            [6046, 7590],
            [6035, 7547],
            [6023, 7540],
            [6034, 7522],
            [6026, 7506],
            [6033, 7479],
            [6033, 7455],
            [6059, 7451],
            [6062, 7434],
            [6034, 7402],
            [6065, 7360],
            [6090, 7350],
            [6090, 7319],
            [6107, 7314],
            [6100, 7299],
            [6063, 7286],
            [6056, 7254],
            [6051, 7250],
            [6025, 7262],
            [6006, 7258],
            [5930, 7272],
            [5921, 7306],
            [5901, 7317],
            [5887, 7303],
            [5869, 7304],
            [5855, 7295],
            [5791, 7322],
            [5787, 7331],
            [5755, 7340],
            [5733, 7389],
            [5716, 7413],
            [5702, 7407],
            [5683, 7419],
            [5671, 7405],
            [5655, 7421],
            [5655, 7438],
            [5645, 7438],
            [5650, 7463],
            [5638, 7484],
            [5604, 7502],
            [5593, 7524],
            [5578, 7536],
            [5579, 7551],
            [5606, 7597],
            [5576, 7603],
            [5560, 7642]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'SV',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.5,
        'hc-middle-y': 0.51,
        'hc-key': 'sv',
        'hc-a2': 'SV',
        name: 'El Salvador',
        labelrank: '6',
        'country-abbrev': 'El. S.',
        subregion: 'Central America',
        'region-wb': 'Latin America & Caribbean',
        'iso-a3': 'SLV',
        'iso-a2': 'SV',
        'woe-id': '23424807',
        continent: 'North America'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [1650, 6895],
            [1647, 6888],
            [1621, 6890],
            [1583, 6905],
            [1582, 6908],
            [1604, 6925],
            [1630, 6912],
            [1653, 6907],
            [1650, 6895]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'SL',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.48,
        'hc-middle-y': 0.48,
        'hc-key': 'sl',
        'hc-a2': 'SL',
        name: 'Sierra Leone',
        labelrank: '4',
        'country-abbrev': 'S.L.',
        subregion: 'Western Africa',
        'region-wb': 'Sub-Saharan Africa',
        'iso-a3': 'SLE',
        'iso-a2': 'SL',
        'woe-id': '23424946',
        continent: 'Africa'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [3901, 6703],
            [3858, 6722],
            [3847, 6766],
            [3871, 6789],
            [3908, 6794],
            [3925, 6773],
            [3936, 6749],
            [3927, 6728],
            [3901, 6703]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'GW',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.55,
        'hc-middle-y': 0.49,
        'hc-key': 'gw',
        'hc-a2': 'GW',
        name: 'Guinea Bissau',
        labelrank: '6',
        'country-abbrev': 'GnB.',
        subregion: 'Western Africa',
        'region-wb': 'Sub-Saharan Africa',
        'iso-a3': 'GNB',
        'iso-a2': 'GW',
        'woe-id': '23424929',
        continent: 'Africa'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [3797, 6823],
            [3785, 6833],
            [3771, 6830],
            [3758, 6858],
            [3746, 6863],
            [3777, 6866],
            [3792, 6873],
            [3835, 6873],
            [3828, 6858],
            [3835, 6845],
            [3806, 6838],
            [3797, 6823]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'HR',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.35,
        'hc-middle-y': 0.6,
        'hc-key': 'hr',
        'hc-a2': 'HR',
        name: 'Croatia',
        labelrank: '6',
        'country-abbrev': 'Cro.',
        subregion: 'Southern Europe',
        'region-wb': 'Europe & Central Asia',
        'iso-a3': 'HRV',
        'iso-a2': 'HR',
        'woe-id': '23424843',
        continent: 'Europe'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [4785, 7824],
              [4765, 7838],
              [4760, 7841],
              [4766, 7838],
              [4783, 7829],
              [4783, 7827],
              [4785, 7824]
            ]
          ],
          [
            [
              [4640, 7935],
              [4692, 7934],
              [4701, 7961],
              [4727, 7972],
              [4751, 7952],
              [4782, 7944],
              [4797, 7951],
              [4801, 7922],
              [4800, 7912],
              [4790, 7920],
              [4766, 7919],
              [4739, 7927],
              [4721, 7917],
              [4705, 7923],
              [4706, 7906],
              [4718, 7888],
              [4758, 7848],
              [4758, 7843],
              [4731, 7849],
              [4694, 7873],
              [4678, 7887],
              [4678, 7920],
              [4664, 7908],
              [4659, 7922],
              [4652, 7911],
              [4640, 7935]
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'BZ',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.48,
        'hc-middle-y': 0.5,
        'hc-key': 'bz',
        'hc-a2': 'BZ',
        name: 'Belize',
        labelrank: '6',
        'country-abbrev': 'Belize',
        subregion: 'Central America',
        'region-wb': 'Latin America & Caribbean',
        'iso-a3': 'BLZ',
        'iso-a2': 'BZ',
        'woe-id': '23424760',
        continent: 'North America'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [1610, 7027],
            [1619, 7030],
            [1636, 7048],
            [1642, 7044],
            [1642, 7044],
            [1638, 7002],
            [1618, 6969],
            [1608, 6969],
            [1610, 7027]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'ZA',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.36,
        'hc-middle-y': 0.7,
        'hc-key': 'za',
        'hc-a2': 'ZA',
        name: 'South Africa',
        labelrank: '2',
        'country-abbrev': 'S.Af.',
        subregion: 'Southern Africa',
        'region-wb': 'Sub-Saharan Africa',
        'iso-a3': 'ZAF',
        'iso-a2': 'ZA',
        'woe-id': '23424942',
        continent: 'Africa'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [5187, 5694],
            [5194, 5694],
            [5210, 5694],
            [5194, 5640],
            [5159, 5608],
            [5136, 5566],
            [5091, 5520],
            [5039, 5479],
            [4997, 5470],
            [4998, 5463],
            [4973, 5457],
            [4937, 5464],
            [4906, 5464],
            [4885, 5452],
            [4845, 5448],
            [4819, 5438],
            [4785, 5468],
            [4766, 5502],
            [4778, 5508],
            [4776, 5539],
            [4749, 5582],
            [4736, 5622],
            [4726, 5639],
            [4743, 5657],
            [4753, 5635],
            [4803, 5627],
            [4829, 5644],
            [4829, 5760],
            [4840, 5751],
            [4854, 5716],
            [4850, 5693],
            [4878, 5693],
            [4910, 5721],
            [4919, 5743],
            [4972, 5726],
            [4994, 5733],
            [5002, 5760],
            [5031, 5775],
            [5036, 5794],
            [5058, 5807],
            [5071, 5824],
            [5105, 5839],
            [5134, 5834],
            [5162, 5833],
            [5169, 5800],
            [5183, 5770],
            [5182, 5722],
            [5166, 5729],
            [5148, 5708],
            [5158, 5683],
            [5182, 5679],
            [5187, 5694]
          ],
          [
            [5070, 5635],
            [5036, 5606],
            [5047, 5584],
            [5068, 5572],
            [5077, 5589],
            [5099, 5596],
            [5108, 5615],
            [5084, 5639],
            [5070, 5635]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'CD',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.58,
        'hc-middle-y': 0.42,
        'hc-key': 'cd',
        'hc-a2': 'CD',
        name: 'Democratic Republic of the Congo',
        labelrank: '2',
        'country-abbrev': 'D.R.C.',
        subregion: 'Middle Africa',
        'region-wb': 'Sub-Saharan Africa',
        'iso-a3': 'COD',
        'iso-a2': 'CD',
        'woe-id': '23424780',
        continent: 'Africa'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [5101, 6402],
            [5098, 6351],
            [5100, 6326],
            [5109, 6303],
            [5128, 6287],
            [5141, 6259],
            [5092, 6251],
            [5075, 6233],
            [5081, 6224],
            [5086, 6212],
            [5076, 6163],
            [5096, 6135],
            [5118, 6142],
            [5118, 6104],
            [5100, 6104],
            [5075, 6134],
            [5055, 6138],
            [5041, 6160],
            [5027, 6146],
            [4987, 6157],
            [4986, 6171],
            [4956, 6165],
            [4946, 6180],
            [4895, 6169],
            [4893, 6208],
            [4882, 6224],
            [4887, 6252],
            [4882, 6286],
            [4845, 6286],
            [4847, 6297],
            [4815, 6295],
            [4810, 6265],
            [4759, 6262],
            [4741, 6286],
            [4729, 6326],
            [4721, 6328],
            [4628, 6328],
            [4606, 6323],
            [4600, 6331],
            [4608, 6332],
            [4607, 6352],
            [4625, 6364],
            [4635, 6357],
            [4664, 6375],
            [4664, 6357],
            [4677, 6359],
            [4718, 6403],
            [4718, 6438],
            [4736, 6463],
            [4763, 6485],
            [4769, 6511],
            [4766, 6530],
            [4773, 6563],
            [4789, 6602],
            [4786, 6627],
            [4802, 6644],
            [4821, 6651],
            [4846, 6629],
            [4903, 6623],
            [4915, 6641],
            [4927, 6635],
            [4962, 6649],
            [4986, 6647],
            [4994, 6658],
            [5021, 6648],
            [5049, 6649],
            [5076, 6625],
            [5088, 6633],
            [5101, 6627],
            [5118, 6634],
            [5130, 6616],
            [5149, 6602],
            [5145, 6572],
            [5162, 6564],
            [5139, 6544],
            [5138, 6536],
            [5123, 6524],
            [5115, 6497],
            [5104, 6485],
            [5114, 6486],
            [5111, 6473],
            [5112, 6459],
            [5105, 6456],
            [5101, 6451],
            [5093, 6443],
            [5091, 6427],
            [5092, 6422],
            [5095, 6420],
            [5102, 6411],
            [5101, 6402]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'KW',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.49,
        'hc-middle-y': 0.51,
        'hc-key': 'kw',
        'hc-a2': 'KW',
        name: 'Kuwait',
        labelrank: '6',
        'country-abbrev': 'Kwt.',
        subregion: 'Western Asia',
        'region-wb': 'Middle East & North Africa',
        'iso-a3': 'KWT',
        'iso-a2': 'KW',
        'woe-id': '23424870',
        continent: 'Asia'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [5668, 7360],
            [5645, 7359],
            [5638, 7374],
            [5612, 7377],
            [5629, 7405],
            [5654, 7406],
            [5665, 7400],
            [5646, 7386],
            [5658, 7385],
            [5668, 7360]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'IE',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.43,
        'hc-middle-y': 0.51,
        'hc-key': 'ie',
        'hc-a2': 'IE',
        name: 'Ireland',
        labelrank: '3',
        'country-abbrev': 'Ire.',
        subregion: 'Northern Europe',
        'region-wb': 'Europe & Central Asia',
        'iso-a3': 'IRL',
        'iso-a2': 'IE',
        'woe-id': '23424803',
        continent: 'Europe'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [4026, 8305],
            [3999, 8280],
            [4024, 8266],
            [4033, 8278],
            [4044, 8263],
            [4055, 8266],
            [4063, 8220],
            [4052, 8189],
            [4017, 8185],
            [3983, 8165],
            [3950, 8160],
            [3933, 8178],
            [3947, 8184],
            [3958, 8207],
            [3947, 8204],
            [3976, 8232],
            [3944, 8237],
            [3949, 8275],
            [3985, 8272],
            [4000, 8288],
            [3980, 8290],
            [3995, 8309],
            [4027, 8316],
            [4026, 8305]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'KP',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.32,
        'hc-middle-y': 0.64,
        'hc-key': 'kp',
        'hc-a2': 'KP',
        name: 'North Korea',
        labelrank: '3',
        'country-abbrev': 'N.K.',
        subregion: 'Eastern Asia',
        'region-wb': 'East Asia & Pacific',
        'iso-a3': 'PRK',
        'iso-a2': 'KP',
        'woe-id': '23424865',
        continent: 'Asia'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [8094, 7820],
            [8075, 7812],
            [8063, 7794],
            [8065, 7769],
            [8050, 7763],
            [8024, 7740],
            [8000, 7730],
            [7998, 7711],
            [8025, 7692],
            [8019, 7683],
            [7989, 7681],
            [7975, 7665],
            [7943, 7672],
            [7936, 7660],
            [7920, 7689],
            [7939, 7716],
            [7907, 7735],
            [7907, 7743],
            [7923, 7756],
            [7955, 7771],
            [7973, 7798],
            [8018, 7788],
            [8015, 7809],
            [8041, 7810],
            [8064, 7825],
            [8069, 7844],
            [8089, 7828],
            [8092, 7824],
            [8094, 7820]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'KR',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.46,
        'hc-middle-y': 0.49,
        'hc-key': 'kr',
        'hc-a2': 'KR',
        name: 'South Korea',
        labelrank: '2',
        'country-abbrev': 'S.K.',
        subregion: 'Eastern Asia',
        'region-wb': 'East Asia & Pacific',
        'iso-a3': 'KOR',
        'iso-a2': 'KR',
        'woe-id': '23424868',
        continent: 'Asia'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [7975, 7665],
            [7989, 7681],
            [8019, 7683],
            [8025, 7692],
            [8053, 7646],
            [8060, 7606],
            [8057, 7587],
            [8032, 7561],
            [8016, 7567],
            [7999, 7550],
            [7985, 7557],
            [7973, 7544],
            [7966, 7557],
            [7969, 7631],
            [7980, 7647],
            [7962, 7664],
            [7975, 7665]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'GY',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.26,
        'hc-middle-y': 0.07,
        'hc-key': 'gy',
        'hc-a2': 'GY',
        name: 'Guyana',
        labelrank: '4',
        'country-abbrev': 'Guy.',
        subregion: 'South America',
        'region-wb': 'Latin America & Caribbean',
        'iso-a3': 'GUY',
        'iso-a2': 'GY',
        'woe-id': '23424836',
        continent: 'South America'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [2470, 6751],
            [2497, 6735],
            [2529, 6699],
            [2554, 6678],
            [2551, 6661],
            [2550, 6647],
            [2537, 6646],
            [2527, 6622],
            [2539, 6599],
            [2550, 6599],
            [2554, 6583],
            [2574, 6557],
            [2556, 6559],
            [2520, 6547],
            [2505, 6535],
            [2477, 6555],
            [2470, 6579],
            [2475, 6606],
            [2484, 6615],
            [2467, 6632],
            [2471, 6649],
            [2448, 6652],
            [2430, 6673],
            [2435, 6692],
            [2461, 6709],
            [2452, 6711],
            [2455, 6729],
            [2476, 6743],
            [2470, 6751]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'HN',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.71,
        'hc-middle-y': 0.09,
        'hc-key': 'hn',
        'hc-a2': 'HN',
        name: 'Honduras',
        labelrank: '5',
        'country-abbrev': 'Hond.',
        subregion: 'Central America',
        'region-wb': 'Latin America & Caribbean',
        'iso-a3': 'HND',
        'iso-a2': 'HN',
        'woe-id': '23424841',
        continent: 'North America'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [1638, 6964],
            [1653, 6970],
            [1693, 6966],
            [1706, 6973],
            [1754, 6967],
            [1770, 6949],
            [1788, 6943],
            [1748, 6931],
            [1739, 6937],
            [1712, 6912],
            [1681, 6905],
            [1683, 6891],
            [1665, 6882],
            [1659, 6891],
            [1650, 6895],
            [1653, 6907],
            [1630, 6912],
            [1604, 6925],
            [1610, 6944],
            [1638, 6964]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'MM',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.17,
        'hc-middle-y': 0.49,
        'hc-key': 'mm',
        'hc-a2': 'MM',
        name: 'Myanmar',
        labelrank: '3',
        'country-abbrev': 'Myan.',
        subregion: 'South-Eastern Asia',
        'region-wb': 'East Asia & Pacific',
        'iso-a3': 'MMR',
        'iso-a2': 'MM',
        'woe-id': '23424763',
        continent: 'Asia'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [6960, 7126],
            [6972, 7133],
            [6970, 7154],
            [6987, 7167],
            [6993, 7190],
            [6991, 7217],
            [7015, 7212],
            [7032, 7249],
            [7029, 7260],
            [7041, 7271],
            [7042, 7294],
            [7075, 7319],
            [7091, 7322],
            [7110, 7339],
            [7110, 7349],
            [7116, 7359],
            [7133, 7346],
            [7138, 7328],
            [7150, 7329],
            [7150, 7276],
            [7121, 7250],
            [7118, 7212],
            [7147, 7219],
            [7155, 7191],
            [7174, 7188],
            [7163, 7160],
            [7187, 7156],
            [7194, 7137],
            [7221, 7148],
            [7223, 7141],
            [7210, 7134],
            [7191, 7103],
            [7187, 7107],
            [7145, 7084],
            [7130, 7088],
            [7113, 7048],
            [7120, 7028],
            [7142, 7004],
            [7154, 6977],
            [7146, 6974],
            [7145, 6952],
            [7137, 6937],
            [7164, 6904],
            [7162, 6884],
            [7178, 6848],
            [7152, 6814],
            [7152, 6804],
            [7143, 6815],
            [7152, 6846],
            [7145, 6867],
            [7147, 6888],
            [7123, 6939],
            [7119, 6981],
            [7106, 7003],
            [7089, 6988],
            [7067, 6980],
            [7053, 6964],
            [7018, 6974],
            [7030, 7019],
            [7016, 7058],
            [7002, 7059],
            [6996, 7074],
            [7011, 7076],
            [6993, 7096],
            [6983, 7094],
            [6960, 7126]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'GA',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.36,
        'hc-middle-y': 0.65,
        'hc-key': 'ga',
        'hc-a2': 'GA',
        name: 'Gabon',
        labelrank: '4',
        'country-abbrev': 'Gabon',
        subregion: 'Middle Africa',
        'region-wb': 'Sub-Saharan Africa',
        'iso-a3': 'GAB',
        'iso-a2': 'GA',
        'woe-id': '23424822',
        continent: 'Africa'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [4529, 6529],
            [4574, 6529],
            [4573, 6563],
            [4574, 6567],
            [4630, 6567],
            [4632, 6563],
            [4630, 6536],
            [4660, 6539],
            [4666, 6527],
            [4649, 6506],
            [4647, 6494],
            [4667, 6482],
            [4664, 6444],
            [4655, 6427],
            [4645, 6439],
            [4636, 6428],
            [4606, 6445],
            [4607, 6432],
            [4581, 6432],
            [4589, 6391],
            [4578, 6397],
            [4567, 6385],
            [4532, 6421],
            [4513, 6446],
            [4496, 6483],
            [4513, 6488],
            [4514, 6516],
            [4529, 6529]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'GQ',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.53,
        'hc-middle-y': 0.55,
        'hc-key': 'gq',
        'hc-a2': 'GQ',
        name: 'Equatorial Guinea',
        labelrank: '4',
        'country-abbrev': 'Eq. G.',
        subregion: 'Middle Africa',
        'region-wb': 'Sub-Saharan Africa',
        'iso-a3': 'GNQ',
        'iso-a2': 'GQ',
        'woe-id': '23424804',
        continent: 'Africa'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [4573, 6563],
            [4574, 6529],
            [4529, 6529],
            [4515, 6535],
            [4529, 6557],
            [4529, 6569],
            [4534, 6563],
            [4573, 6563]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'NI',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.45,
        'hc-middle-y': 0.86,
        'hc-key': 'ni',
        'hc-a2': 'NI',
        name: 'Nicaragua',
        labelrank: '5',
        'country-abbrev': 'Nic.',
        subregion: 'Central America',
        'region-wb': 'Latin America & Caribbean',
        'iso-a3': 'NIC',
        'iso-a2': 'NI',
        'woe-id': '23424915',
        continent: 'North America'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [1712, 6826],
            [1681, 6859],
            [1655, 6879],
            [1665, 6882],
            [1683, 6891],
            [1681, 6905],
            [1712, 6912],
            [1739, 6937],
            [1748, 6931],
            [1788, 6943],
            [1787, 6923],
            [1776, 6895],
            [1767, 6835],
            [1773, 6821],
            [1752, 6823],
            [1712, 6826]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'UG',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.16,
        'hc-middle-y': 0.55,
        'hc-key': 'ug',
        'hc-a2': 'UG',
        name: 'Uganda',
        labelrank: '3',
        'country-abbrev': 'Uga.',
        subregion: 'Eastern Africa',
        'region-wb': 'Sub-Saharan Africa',
        'iso-a3': 'UGA',
        'iso-a2': 'UG',
        'woe-id': '23424974',
        continent: 'Africa'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [5178, 6471],
              [5178, 6471],
              [5178, 6471],
              [5178, 6471]
            ]
          ],
          [
            [
              [5177, 6471],
              [5149, 6471],
              [5138, 6469],
              [5122, 6457],
              [5112, 6459],
              [5111, 6473],
              [5114, 6486],
              [5121, 6496],
              [5115, 6497],
              [5123, 6524],
              [5138, 6536],
              [5142, 6531],
              [5166, 6556],
              [5162, 6564],
              [5145, 6572],
              [5149, 6602],
              [5177, 6612],
              [5188, 6603],
              [5213, 6614],
              [5227, 6610],
              [5242, 6624],
              [5255, 6607],
              [5255, 6593],
              [5269, 6573],
              [5271, 6548],
              [5242, 6507],
              [5201, 6504],
              [5183, 6491],
              [5177, 6471]
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'MW',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.2,
        'hc-middle-y': 0.31,
        'hc-key': 'mw',
        'hc-a2': 'MW',
        name: 'Malawi',
        labelrank: '6',
        'country-abbrev': 'Mal.',
        subregion: 'Eastern Africa',
        'region-wb': 'Sub-Saharan Africa',
        'iso-a3': 'MWI',
        'iso-a2': 'MW',
        'woe-id': '23424889',
        continent: 'Africa'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [5269, 6164],
              [5269, 6164],
              [5269, 6165],
              [5269, 6164]
            ]
          ],
          [
            [
              [5264, 6168],
              [5264, 6169],
              [5263, 6169],
              [5264, 6168],
              [5264, 6168]
            ]
          ],
          [
            [
              [5251, 6215],
              [5248, 6218],
              [5248, 6218],
              [5251, 6215]
            ]
          ],
          [
            [
              [5245, 6220],
              [5245, 6221],
              [5245, 6221],
              [5245, 6220]
            ]
          ],
          [
            [
              [5210, 6224],
              [5225, 6218],
              [5240, 6214],
              [5252, 6156],
              [5244, 6136],
              [5251, 6106],
              [5279, 6075],
              [5268, 6102],
              [5297, 6068],
              [5295, 6026],
              [5276, 6011],
              [5280, 5993],
              [5249, 6031],
              [5259, 6048],
              [5252, 6076],
              [5232, 6069],
              [5219, 6087],
              [5207, 6096],
              [5213, 6129],
              [5223, 6131],
              [5220, 6180],
              [5233, 6189],
              [5210, 6224]
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'SX',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.76,
        'hc-middle-y': 0.53,
        'hc-key': 'sx',
        'hc-a2': 'SX',
        name: 'Somaliland',
        labelrank: '5',
        'country-abbrev': 'Solnd.',
        subregion: 'Eastern Africa',
        'region-wb': 'Sub-Saharan Africa',
        'iso-a3': '-99',
        'iso-a2': 'SX',
        'woe-id': '-99',
        continent: 'Africa'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [5515, 6838],
            [5545, 6807],
            [5565, 6806],
            [5589, 6820],
            [5609, 6814],
            [5638, 6829],
            [5683, 6831],
            [5683, 6778],
            [5654, 6735],
            [5625, 6735],
            [5538, 6764],
            [5520, 6776],
            [5497, 6813],
            [5505, 6823],
            [5515, 6838]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'TM',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.38,
        'hc-middle-y': 0.41,
        'hc-key': 'tm',
        'hc-a2': 'TM',
        name: 'Turkmenistan',
        labelrank: '4',
        'country-abbrev': 'Turkm.',
        subregion: 'Central Asia',
        'region-wb': 'Europe & Central Asia',
        'iso-a3': 'TKM',
        'iso-a2': 'TM',
        'woe-id': '23424972',
        continent: 'Asia'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [5922, 7807],
            [5931, 7793],
            [5946, 7798],
            [5939, 7815],
            [5967, 7838],
            [5992, 7820],
            [6005, 7820],
            [6012, 7788],
            [6067, 7774],
            [6081, 7740],
            [6130, 7704],
            [6137, 7704],
            [6174, 7679],
            [6202, 7672],
            [6201, 7649],
            [6179, 7656],
            [6171, 7645],
            [6149, 7640],
            [6141, 7612],
            [6108, 7598],
            [6100, 7584],
            [6076, 7574],
            [6068, 7584],
            [6046, 7590],
            [6044, 7622],
            [6019, 7625],
            [6010, 7638],
            [5974, 7660],
            [5931, 7670],
            [5927, 7680],
            [5875, 7674],
            [5855, 7655],
            [5829, 7648],
            [5827, 7689],
            [5831, 7702],
            [5820, 7716],
            [5819, 7738],
            [5795, 7741],
            [5800, 7773],
            [5824, 7761],
            [5842, 7765],
            [5853, 7778],
            [5835, 7791],
            [5829, 7812],
            [5807, 7813],
            [5797, 7788],
            [5786, 7801],
            [5802, 7814],
            [5838, 7821],
            [5859, 7807],
            [5877, 7783],
            [5890, 7786],
            [5921, 7783],
            [5922, 7807]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'ZM',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.24,
        'hc-middle-y': 0.67,
        'hc-key': 'zm',
        'hc-a2': 'ZM',
        name: 'Zambia',
        labelrank: '3',
        'country-abbrev': 'Zambia',
        subregion: 'Eastern Africa',
        'region-wb': 'Sub-Saharan Africa',
        'iso-a3': 'ZMB',
        'iso-a2': 'ZM',
        'woe-id': '23425003',
        continent: 'Africa'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [5081, 6224],
            [5099, 6245],
            [5092, 6251],
            [5141, 6259],
            [5155, 6242],
            [5159, 6248],
            [5183, 6233],
            [5210, 6224],
            [5233, 6189],
            [5220, 6180],
            [5223, 6131],
            [5213, 6129],
            [5207, 6096],
            [5219, 6087],
            [5131, 6058],
            [5136, 6038],
            [5119, 6039],
            [5091, 6026],
            [5088, 6011],
            [5068, 6001],
            [5052, 5993],
            [5036, 5968],
            [5027, 5965],
            [4984, 5973],
            [4954, 5983],
            [4929, 5978],
            [4891, 6011],
            [4888, 6022],
            [4888, 6117],
            [4947, 6117],
            [4946, 6180],
            [4956, 6165],
            [4986, 6171],
            [4987, 6157],
            [5027, 6146],
            [5041, 6160],
            [5055, 6138],
            [5075, 6134],
            [5100, 6104],
            [5118, 6104],
            [5118, 6142],
            [5096, 6135],
            [5076, 6163],
            [5086, 6212],
            [5081, 6224]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'NC',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.56,
        'hc-middle-y': 0.71,
        'hc-key': 'nc',
        'hc-a2': 'NC',
        name: 'Northern Cyprus',
        labelrank: '6',
        'country-abbrev': 'N. Cy.',
        subregion: 'Western Asia',
        'region-wb': 'Europe & Central Asia',
        'iso-a3': '-99',
        'iso-a2': 'NC',
        'woe-id': '-90',
        continent: 'Asia'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [5239, 7572],
              [5235, 7571],
              [5233, 7571],
              [5225, 7576],
              [5205, 7576],
              [5205, 7576],
              [5205, 7576],
              [5205, 7576],
              [5204, 7576],
              [5204, 7576],
              [5260, 7593],
              [5241, 7580],
              [5243, 7572],
              [5239, 7572]
            ]
          ],
          [
            [
              [5201, 7576],
              [5202, 7576],
              [5202, 7575],
              [5201, 7576]
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'MR',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.62,
        'hc-middle-y': 0.63,
        'hc-key': 'mr',
        'hc-a2': 'MR',
        name: 'Mauritania',
        labelrank: '3',
        'country-abbrev': 'Mrt.',
        subregion: 'Western Africa',
        'region-wb': 'Sub-Saharan Africa',
        'iso-a3': 'MRT',
        'iso-a2': 'MR',
        'woe-id': '23424896',
        continent: 'Africa'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [3984, 7320],
            [4077, 7261],
            [4097, 7248],
            [4045, 7248],
            [4074, 6989],
            [4082, 6982],
            [4077, 6957],
            [3964, 6958],
            [3923, 6956],
            [3918, 6946],
            [3903, 6961],
            [3894, 6959],
            [3891, 6940],
            [3878, 6936],
            [3849, 6961],
            [3842, 6977],
            [3832, 6976],
            [3817, 6992],
            [3758, 6986],
            [3752, 6967],
            [3754, 6992],
            [3767, 7032],
            [3762, 7063],
            [3752, 7075],
            [3762, 7100],
            [3741, 7129],
            [3737, 7117],
            [3740, 7135],
            [3856, 7135],
            [3856, 7186],
            [3885, 7200],
            [3885, 7279],
            [3983, 7279],
            [3984, 7320]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'DZ',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.63,
        'hc-middle-y': 0.5,
        'hc-key': 'dz',
        'hc-a2': 'DZ',
        name: 'Algeria',
        labelrank: '3',
        'country-abbrev': 'Alg.',
        subregion: 'Northern Africa',
        'region-wb': 'Middle East & North Africa',
        'iso-a3': 'DZA',
        'iso-a2': 'DZ',
        'woe-id': '23424740',
        continent: 'Africa'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [4097, 7248],
            [4077, 7261],
            [3984, 7320],
            [3984, 7332],
            [3984, 7364],
            [4014, 7386],
            [4070, 7394],
            [4111, 7423],
            [4132, 7429],
            [4132, 7460],
            [4156, 7464],
            [4165, 7475],
            [4203, 7474],
            [4209, 7488],
            [4190, 7512],
            [4187, 7561],
            [4174, 7573],
            [4188, 7574],
            [4205, 7589],
            [4270, 7620],
            [4316, 7623],
            [4326, 7630],
            [4381, 7633],
            [4394, 7625],
            [4457, 7640],
            [4473, 7632],
            [4493, 7635],
            [4486, 7618],
            [4482, 7558],
            [4460, 7533],
            [4468, 7511],
            [4485, 7488],
            [4506, 7473],
            [4520, 7414],
            [4513, 7410],
            [4529, 7378],
            [4533, 7338],
            [4526, 7320],
            [4530, 7295],
            [4517, 7283],
            [4535, 7258],
            [4535, 7244],
            [4580, 7226],
            [4593, 7202],
            [4460, 7120],
            [4410, 7077],
            [4364, 7068],
            [4331, 7067],
            [4334, 7087],
            [4295, 7101],
            [4274, 7116],
            [4273, 7127],
            [4097, 7248]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'LT',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.27,
        'hc-middle-y': 0.06,
        'hc-key': 'lt',
        'hc-a2': 'LT',
        name: 'Lithuania',
        labelrank: '5',
        'country-abbrev': 'Lith.',
        subregion: 'Northern Europe',
        'region-wb': 'Europe & Central Asia',
        'iso-a3': 'LTU',
        'iso-a2': 'LT',
        'woe-id': '23424875',
        continent: 'Europe'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [4867, 8313],
              [4863, 8330],
              [4860, 8347],
              [4891, 8361],
              [4961, 8354],
              [4973, 8362],
              [4980, 8351],
              [4996, 8349],
              [5024, 8330],
              [5029, 8315],
              [5002, 8300],
              [4990, 8274],
              [4958, 8257],
              [4932, 8259],
              [4931, 8268],
              [4911, 8276],
              [4913, 8298],
              [4867, 8313]
            ]
          ],
          [
            [
              [4857, 8314],
              [4861, 8323],
              [4859, 8314],
              [4857, 8314]
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'ET',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.45,
        'hc-middle-y': 0.58,
        'hc-key': 'et',
        'hc-a2': 'ET',
        name: 'Ethiopia',
        labelrank: '2',
        'country-abbrev': 'Eth.',
        subregion: 'Eastern Africa',
        'region-wb': 'Sub-Saharan Africa',
        'iso-a3': 'ETH',
        'iso-a2': 'ET',
        'woe-id': '23424808',
        continent: 'Africa'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [5472, 6832],
            [5469, 6829],
            [5472, 6826],
            [5476, 6821],
            [5505, 6823],
            [5497, 6813],
            [5520, 6776],
            [5538, 6764],
            [5625, 6735],
            [5654, 6735],
            [5609, 6691],
            [5565, 6644],
            [5536, 6645],
            [5511, 6636],
            [5503, 6626],
            [5475, 6617],
            [5453, 6616],
            [5442, 6626],
            [5415, 6613],
            [5405, 6600],
            [5363, 6606],
            [5326, 6630],
            [5299, 6635],
            [5295, 6656],
            [5282, 6657],
            [5264, 6695],
            [5234, 6725],
            [5214, 6729],
            [5220, 6748],
            [5241, 6748],
            [5244, 6778],
            [5259, 6820],
            [5267, 6815],
            [5278, 6850],
            [5292, 6873],
            [5305, 6874],
            [5317, 6921],
            [5339, 6926],
            [5347, 6916],
            [5357, 6939],
            [5373, 6925],
            [5390, 6932],
            [5422, 6927],
            [5444, 6916],
            [5489, 6867],
            [5471, 6839],
            [5472, 6832]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'SD',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.5,
        'hc-middle-y': 0.5,
        'hc-key': 'sd',
        'hc-a2': 'SD',
        name: 'Sudan',
        labelrank: '3',
        'country-abbrev': 'Sudan',
        subregion: 'Northern Africa',
        'region-wb': 'Sub-Saharan Africa',
        'iso-a3': 'SDN',
        'iso-a2': 'SD',
        'woe-id': '-90',
        continent: 'Africa'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [5317, 6921],
            [5305, 6874],
            [5292, 6873],
            [5278, 6850],
            [5267, 6815],
            [5259, 6820],
            [5244, 6778],
            [5240, 6799],
            [5218, 6819],
            [5219, 6859],
            [5186, 6853],
            [5195, 6825],
            [5161, 6788],
            [5147, 6786],
            [5125, 6802],
            [5090, 6774],
            [5067, 6774],
            [5062, 6782],
            [5023, 6780],
            [5001, 6806],
            [4979, 6802],
            [4964, 6761],
            [4952, 6755],
            [4932, 6758],
            [4937, 6790],
            [4914, 6821],
            [4915, 6836],
            [4894, 6875],
            [4883, 6877],
            [4896, 6893],
            [4891, 6906],
            [4904, 6917],
            [4921, 6964],
            [4947, 6964],
            [4947, 7078],
            [4947, 7094],
            [4976, 7094],
            [4976, 7155],
            [5161, 7155],
            [5327, 7155],
            [5339, 7119],
            [5336, 7094],
            [5347, 7055],
            [5378, 7033],
            [5366, 7019],
            [5331, 7005],
            [5329, 6981],
            [5314, 6947],
            [5317, 6921]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'ER',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.1,
        'hc-middle-y': 0.24,
        'hc-key': 'er',
        'hc-a2': 'ER',
        name: 'Eritrea',
        labelrank: '4',
        'country-abbrev': 'Erit.',
        subregion: 'Eastern Africa',
        'region-wb': 'Sub-Saharan Africa',
        'iso-a3': 'ERI',
        'iso-a2': 'ER',
        'woe-id': '23424806',
        continent: 'Africa'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [5489, 6867],
            [5444, 6916],
            [5422, 6927],
            [5390, 6932],
            [5373, 6925],
            [5357, 6939],
            [5347, 6916],
            [5339, 6926],
            [5317, 6921],
            [5314, 6947],
            [5329, 6981],
            [5331, 7005],
            [5366, 7019],
            [5378, 7033],
            [5388, 7015],
            [5399, 6969],
            [5410, 6946],
            [5415, 6958],
            [5424, 6942],
            [5454, 6932],
            [5469, 6911],
            [5487, 6900],
            [5511, 6874],
            [5498, 6864],
            [5489, 6867]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'GH',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.13,
        'hc-middle-y': 0.77,
        'hc-key': 'gh',
        'hc-a2': 'GH',
        name: 'Ghana',
        labelrank: '3',
        'country-abbrev': 'Ghana',
        subregion: 'Western Africa',
        'region-wb': 'Sub-Saharan Africa',
        'iso-a3': 'GHA',
        'iso-a2': 'GH',
        'woe-id': '23424824',
        continent: 'Africa'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [4275, 6679],
            [4268, 6670],
            [4247, 6669],
            [4216, 6653],
            [4178, 6639],
            [4148, 6649],
            [4148, 6650],
            [4152, 6649],
            [4156, 6651],
            [4145, 6701],
            [4166, 6741],
            [4160, 6779],
            [4153, 6813],
            [4158, 6823],
            [4215, 6824],
            [4235, 6827],
            [4237, 6813],
            [4250, 6800],
            [4246, 6781],
            [4255, 6776],
            [4250, 6758],
            [4259, 6715],
            [4255, 6701],
            [4275, 6679]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'SI',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.52,
        'hc-middle-y': 0.57,
        'hc-key': 'si',
        'hc-a2': 'SI',
        name: 'Slovenia',
        labelrank: '6',
        'country-abbrev': 'Slo.',
        subregion: 'Southern Europe',
        'region-wb': 'Europe & Central Asia',
        'iso-a3': 'SVN',
        'iso-a2': 'SI',
        'woe-id': '23424945',
        continent: 'Europe'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [4640, 7935],
            [4640, 7937],
            [4644, 7939],
            [4634, 7964],
            [4644, 7973],
            [4668, 7968],
            [4678, 7976],
            [4712, 7979],
            [4714, 7985],
            [4719, 7985],
            [4727, 7972],
            [4701, 7961],
            [4692, 7934],
            [4640, 7935]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'GT',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.23,
        'hc-middle-y': 0.79,
        'hc-key': 'gt',
        'hc-a2': 'GT',
        name: 'Guatemala',
        labelrank: '3',
        'country-abbrev': 'Guat.',
        subregion: 'Central America',
        'region-wb': 'Latin America & Caribbean',
        'iso-a3': 'GTM',
        'iso-a2': 'GT',
        'woe-id': '23424834',
        continent: 'North America'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [1618, 6969],
            [1626, 6965],
            [1638, 6964],
            [1610, 6944],
            [1604, 6925],
            [1582, 6908],
            [1583, 6905],
            [1547, 6911],
            [1519, 6929],
            [1520, 6951],
            [1534, 6975],
            [1571, 6975],
            [1574, 6984],
            [1543, 7010],
            [1556, 7010],
            [1557, 7027],
            [1610, 7027],
            [1608, 6969],
            [1618, 6969]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'BA',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.91,
        'hc-middle-y': 0.56,
        'hc-key': 'ba',
        'hc-a2': 'BA',
        name: 'Bosnia and Herzegovina',
        labelrank: '5',
        'country-abbrev': 'B.H.',
        subregion: 'Southern Europe',
        'region-wb': 'Europe & Central Asia',
        'iso-a3': 'BIH',
        'iso-a2': 'BA',
        'woe-id': '23424761',
        continent: 'Europe'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [4760, 7841],
            [4757, 7843],
            [4758, 7843],
            [4758, 7848],
            [4718, 7888],
            [4706, 7906],
            [4705, 7923],
            [4721, 7917],
            [4739, 7927],
            [4766, 7919],
            [4790, 7920],
            [4800, 7912],
            [4811, 7913],
            [4805, 7891],
            [4806, 7864],
            [4784, 7845],
            [4783, 7829],
            [4766, 7838],
            [4760, 7841]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'JO',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.07,
        'hc-middle-y': 0.78,
        'hc-key': 'jo',
        'hc-a2': 'JO',
        name: 'Jordan',
        labelrank: '4',
        'country-abbrev': 'Jord.',
        subregion: 'Western Asia',
        'region-wb': 'Middle East & North Africa',
        'iso-a3': 'JOR',
        'iso-a2': 'JO',
        'woe-id': '23424860',
        continent: 'Asia'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [5284, 7442],
            [5287, 7445],
            [5284, 7446],
            [5283, 7447],
            [5284, 7449],
            [5288, 7449],
            [5288, 7463],
            [5288, 7492],
            [5294, 7495],
            [5325, 7481],
            [5383, 7516],
            [5391, 7487],
            [5394, 7475],
            [5329, 7454],
            [5360, 7422],
            [5345, 7406],
            [5323, 7402],
            [5302, 7380],
            [5270, 7386],
            [5272, 7391],
            [5270, 7392],
            [5276, 7420],
            [5284, 7442]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'SY',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.25,
        'hc-middle-y': 0.54,
        'hc-key': 'sy',
        'hc-a2': 'SY',
        name: 'Syria',
        labelrank: '3',
        'country-abbrev': 'Syria',
        subregion: 'Western Asia',
        'region-wb': 'Middle East & North Africa',
        'iso-a3': 'SYR',
        'iso-a2': 'SY',
        'woe-id': '23424956',
        continent: 'Asia'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [5383, 7516],
            [5325, 7481],
            [5294, 7495],
            [5298, 7502],
            [5296, 7517],
            [5319, 7543],
            [5300, 7558],
            [5299, 7584],
            [5299, 7600],
            [5306, 7597],
            [5320, 7631],
            [5344, 7624],
            [5367, 7634],
            [5380, 7627],
            [5412, 7628],
            [5446, 7641],
            [5463, 7639],
            [5484, 7648],
            [5489, 7641],
            [5474, 7624],
            [5460, 7621],
            [5455, 7563],
            [5440, 7548],
            [5383, 7516]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'MC',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.5,
        'hc-middle-y': 0.67,
        'hc-key': 'mc',
        'hc-a2': 'MC',
        name: 'Monaco',
        labelrank: '6',
        'country-abbrev': 'Mco.',
        subregion: 'Western Europe',
        'region-wb': 'Europe & Central Asia',
        'iso-a3': 'MCO',
        'iso-a2': 'MC',
        'woe-id': '23424892',
        continent: 'Europe'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [4459, 7872],
            [4458, 7871],
            [4457, 7871],
            [4458, 7872],
            [4459, 7872]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'AL',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.39,
        'hc-middle-y': 0.49,
        'hc-key': 'al',
        'hc-a2': 'AL',
        name: 'Albania',
        labelrank: '6',
        'country-abbrev': 'Alb.',
        subregion: 'Southern Europe',
        'region-wb': 'Europe & Central Asia',
        'iso-a3': 'ALB',
        'iso-a2': 'AL',
        'woe-id': '23424742',
        continent: 'Europe'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [4858, 7770],
              [4857, 7770],
              [4857, 7771],
              [4858, 7770]
            ]
          ],
          [
            [
              [4811, 7813],
              [4811, 7818],
              [4812, 7821],
              [4821, 7833],
              [4831, 7829],
              [4844, 7817],
              [4846, 7805],
              [4842, 7794],
              [4848, 7777],
              [4849, 7772],
              [4851, 7771],
              [4854, 7772],
              [4857, 7771],
              [4857, 7771],
              [4858, 7769],
              [4858, 7769],
              [4856, 7767],
              [4858, 7767],
              [4857, 7766],
              [4859, 7764],
              [4859, 7763],
              [4859, 7763],
              [4841, 7734],
              [4829, 7729],
              [4809, 7762],
              [4817, 7803],
              [4811, 7804],
              [4810, 7808],
              [4811, 7813]
            ]
          ],
          [
            [
              [4811, 7820],
              [4811, 7819],
              [4811, 7819],
              [4811, 7820]
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'UY',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.81,
        'hc-middle-y': 0.63,
        'hc-key': 'uy',
        'hc-a2': 'UY',
        name: 'Uruguay',
        labelrank: '4',
        'country-abbrev': 'Ury.',
        subregion: 'South America',
        'region-wb': 'Latin America & Caribbean',
        'iso-a3': 'URY',
        'iso-a2': 'UY',
        'woe-id': '23424979',
        continent: 'South America'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [2672, 5507],
            [2658, 5493],
            [2661, 5478],
            [2661, 5475],
            [2666, 5472],
            [2654, 5450],
            [2619, 5432],
            [2607, 5437],
            [2584, 5432],
            [2554, 5448],
            [2534, 5448],
            [2518, 5465],
            [2518, 5486],
            [2518, 5491],
            [2519, 5492],
            [2527, 5495],
            [2523, 5514],
            [2523, 5532],
            [2541, 5588],
            [2564, 5590],
            [2582, 5575],
            [2588, 5559],
            [2600, 5566],
            [2611, 5553],
            [2629, 5546],
            [2672, 5507]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'CNM',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.39,
        'hc-middle-y': 0.11,
        'hc-key': 'cnm',
        'hc-a2': 'CN',
        name: 'Cyprus No Mans Area',
        labelrank: '9',
        'country-abbrev': null,
        subregion: 'Western Asia',
        'region-wb': 'Europe & Central Asia',
        'iso-a3': '-99',
        'iso-a2': null,
        'woe-id': '-99',
        continent: 'Asia'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [5243, 7572],
              [5243, 7572],
              [5242, 7571],
              [5239, 7572],
              [5239, 7572],
              [5243, 7572]
            ]
          ],
          [
            [
              [5200, 7576],
              [5201, 7576],
              [5202, 7575],
              [5202, 7576],
              [5203, 7576],
              [5202, 7575],
              [5200, 7576]
            ]
          ],
          [
            [
              [5204, 7576],
              [5204, 7576],
              [5204, 7576],
              [5205, 7576],
              [5205, 7576],
              [5204, 7576]
            ]
          ],
          [
            [
              [5233, 7571],
              [5234, 7570],
              [5233, 7569],
              [5225, 7575],
              [5205, 7576],
              [5205, 7576],
              [5225, 7576],
              [5233, 7571]
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'MN',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.49,
        'hc-middle-y': 0.53,
        'hc-key': 'mn',
        'hc-a2': 'MN',
        name: 'Mongolia',
        labelrank: '3',
        'country-abbrev': 'Mong.',
        subregion: 'Eastern Asia',
        'region-wb': 'East Asia & Pacific',
        'iso-a3': 'MNG',
        'iso-a2': 'MN',
        'woe-id': '23424887',
        continent: 'Asia'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [7705, 8020],
            [7716, 8023],
            [7712, 8027],
            [7735, 8027],
            [7775, 7987],
            [7769, 7975],
            [7727, 7980],
            [7699, 7966],
            [7678, 7965],
            [7665, 7943],
            [7651, 7934],
            [7617, 7931],
            [7590, 7908],
            [7543, 7920],
            [7525, 7897],
            [7540, 7870],
            [7512, 7856],
            [7495, 7837],
            [7468, 7825],
            [7430, 7826],
            [7388, 7820],
            [7342, 7800],
            [7321, 7805],
            [7298, 7801],
            [7248, 7816],
            [7237, 7828],
            [7189, 7833],
            [7173, 7829],
            [7106, 7837],
            [7081, 7835],
            [7067, 7854],
            [7052, 7891],
            [7042, 7890],
            [6998, 7915],
            [6919, 7924],
            [6913, 7935],
            [6923, 7954],
            [6924, 7974],
            [6904, 8015],
            [6881, 8029],
            [6865, 8028],
            [6833, 8051],
            [6829, 8072],
            [6841, 8083],
            [6860, 8082],
            [6883, 8100],
            [6935, 8122],
            [6963, 8137],
            [6972, 8130],
            [7019, 8126],
            [7029, 8105],
            [7067, 8104],
            [7110, 8094],
            [7133, 8106],
            [7138, 8124],
            [7124, 8143],
            [7131, 8160],
            [7156, 8187],
            [7189, 8171],
            [7204, 8171],
            [7253, 8155],
            [7255, 8128],
            [7297, 8109],
            [7346, 8122],
            [7385, 8117],
            [7402, 8104],
            [7423, 8101],
            [7440, 8078],
            [7505, 8071],
            [7523, 8080],
            [7574, 8088],
            [7610, 8115],
            [7642, 8100],
            [7667, 8104],
            [7680, 8097],
            [7646, 8033],
            [7656, 8017],
            [7685, 8023],
            [7705, 8020]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'RW',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.48,
        'hc-middle-y': 0.56,
        'hc-key': 'rw',
        'hc-a2': 'RW',
        name: 'Rwanda',
        labelrank: '3',
        'country-abbrev': 'Rwa.',
        subregion: 'Eastern Africa',
        'region-wb': 'Sub-Saharan Africa',
        'iso-a3': 'RWA',
        'iso-a2': 'RW',
        'woe-id': '23424937',
        continent: 'Africa'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [5095, 6420],
            [5092, 6422],
            [5091, 6427],
            [5106, 6440],
            [5101, 6451],
            [5105, 6456],
            [5112, 6459],
            [5122, 6457],
            [5138, 6469],
            [5149, 6453],
            [5149, 6431],
            [5141, 6430],
            [5122, 6432],
            [5121, 6422],
            [5095, 6420]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'SO',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.39,
        'hc-middle-y': 0.74,
        'hc-key': 'so',
        'hc-a2': 'SO',
        name: 'Somalia',
        labelrank: '6',
        'country-abbrev': 'Som.',
        subregion: 'Eastern Africa',
        'region-wb': 'Sub-Saharan Africa',
        'iso-a3': 'SOM',
        'iso-a2': 'SO',
        'woe-id': '-90',
        continent: 'Africa'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [5475, 6617],
            [5503, 6626],
            [5511, 6636],
            [5536, 6645],
            [5565, 6644],
            [5609, 6691],
            [5654, 6735],
            [5683, 6778],
            [5683, 6831],
            [5722, 6841],
            [5738, 6853],
            [5752, 6848],
            [5739, 6778],
            [5695, 6706],
            [5686, 6680],
            [5654, 6631],
            [5597, 6571],
            [5567, 6555],
            [5521, 6518],
            [5495, 6491],
            [5464, 6450],
            [5448, 6474],
            [5448, 6582],
            [5475, 6617]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'BO',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.48,
        'hc-middle-y': 0.59,
        'hc-key': 'bo',
        'hc-a2': 'BO',
        name: 'Bolivia',
        labelrank: '3',
        'country-abbrev': 'Bolivia',
        subregion: 'South America',
        'region-wb': 'Latin America & Caribbean',
        'iso-a3': 'BOL',
        'iso-a2': 'BO',
        'woe-id': '23424762',
        continent: 'South America'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [2202, 6020],
              [2201, 6026],
              [2206, 6021],
              [2203, 6021],
              [2202, 6020]
            ]
          ],
          [
            [
              [2190, 5982],
              [2185, 5988],
              [2204, 6011],
              [2217, 6017],
              [2194, 6042],
              [2194, 6058],
              [2209, 6081],
              [2202, 6097],
              [2205, 6120],
              [2214, 6132],
              [2188, 6178],
              [2226, 6177],
              [2274, 6209],
              [2309, 6215],
              [2314, 6200],
              [2311, 6172],
              [2323, 6147],
              [2341, 6133],
              [2380, 6127],
              [2406, 6113],
              [2416, 6101],
              [2439, 6103],
              [2456, 6093],
              [2466, 6019],
              [2516, 6017],
              [2518, 5989],
              [2535, 5981],
              [2542, 5961],
              [2525, 5901],
              [2524, 5912],
              [2497, 5928],
              [2470, 5928],
              [2419, 5917],
              [2403, 5889],
              [2403, 5874],
              [2392, 5838],
              [2387, 5845],
              [2354, 5845],
              [2343, 5818],
              [2335, 5839],
              [2301, 5841],
              [2286, 5851],
              [2258, 5820],
              [2238, 5820],
              [2228, 5867],
              [2212, 5893],
              [2221, 5923],
              [2205, 5938],
              [2190, 5982]
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'CM',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.27,
        'hc-middle-y': 0.67,
        'hc-key': 'cm',
        'hc-a2': 'CM',
        name: 'Cameroon',
        labelrank: '3',
        'country-abbrev': 'Cam.',
        subregion: 'Middle Africa',
        'region-wb': 'Sub-Saharan Africa',
        'iso-a3': 'CMR',
        'iso-a2': 'CM',
        'woe-id': '23424785',
        continent: 'Africa'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [4632, 6563],
              [4630, 6567],
              [4574, 6567],
              [4573, 6563],
              [4534, 6563],
              [4529, 6569],
              [4532, 6595],
              [4523, 6614],
              [4505, 6620],
              [4493, 6641],
              [4500, 6671],
              [4539, 6706],
              [4552, 6709],
              [4573, 6689],
              [4590, 6709],
              [4600, 6745],
              [4617, 6758],
              [4619, 6775],
              [4652, 6832],
              [4670, 6838],
              [4672, 6858],
              [4658, 6864],
              [4654, 6885],
              [4662, 6885],
              [4660, 6880],
              [4667, 6882],
              [4677, 6872],
              [4686, 6839],
              [4684, 6817],
              [4702, 6794],
              [4658, 6793],
              [4651, 6783],
              [4687, 6749],
              [4696, 6721],
              [4674, 6683],
              [4664, 6677],
              [4668, 6654],
              [4687, 6610],
              [4714, 6583],
              [4717, 6565],
              [4716, 6551],
              [4669, 6565],
              [4632, 6563]
            ]
          ],
          [
            [
              [4663, 6885],
              [4664, 6885],
              [4663, 6885],
              [4663, 6885]
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'CG',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.15,
        'hc-middle-y': 0.78,
        'hc-key': 'cg',
        'hc-a2': 'CG',
        name: 'Republic of Congo',
        labelrank: '4',
        'country-abbrev': 'Rep. Congo',
        subregion: 'Middle Africa',
        'region-wb': 'Sub-Saharan Africa',
        'iso-a3': 'COG',
        'iso-a2': 'CG',
        'woe-id': '23424779',
        continent: 'Africa'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [4625, 6364],
            [4616, 6371],
            [4594, 6353],
            [4588, 6366],
            [4567, 6385],
            [4578, 6397],
            [4589, 6391],
            [4581, 6432],
            [4607, 6432],
            [4606, 6445],
            [4636, 6428],
            [4645, 6439],
            [4655, 6427],
            [4664, 6444],
            [4667, 6482],
            [4647, 6494],
            [4649, 6506],
            [4666, 6527],
            [4660, 6539],
            [4630, 6536],
            [4632, 6563],
            [4669, 6565],
            [4716, 6551],
            [4717, 6565],
            [4728, 6601],
            [4754, 6609],
            [4789, 6602],
            [4773, 6563],
            [4766, 6530],
            [4769, 6511],
            [4763, 6485],
            [4736, 6463],
            [4718, 6438],
            [4718, 6403],
            [4677, 6359],
            [4664, 6357],
            [4664, 6375],
            [4635, 6357],
            [4625, 6364]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'EH',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.41,
        'hc-middle-y': 0.71,
        'hc-key': 'eh',
        'hc-a2': 'EH',
        name: 'Western Sahara',
        labelrank: '7',
        'country-abbrev': 'W. Sah.',
        subregion: 'Northern Africa',
        'region-wb': 'Middle East & North Africa',
        'iso-a3': 'ESH',
        'iso-a2': 'EH',
        'woe-id': '23424990',
        continent: 'Africa'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [3737, 7117],
            [3735, 7120],
            [3738, 7137],
            [3802, 7138],
            [3820, 7165],
            [3826, 7199],
            [3854, 7229],
            [3873, 7243],
            [3885, 7280],
            [3894, 7283],
            [3904, 7307],
            [3918, 7311],
            [3953, 7306],
            [3980, 7315],
            [3984, 7332],
            [3984, 7320],
            [3983, 7279],
            [3885, 7279],
            [3885, 7200],
            [3856, 7186],
            [3856, 7135],
            [3740, 7135],
            [3737, 7117]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'RS',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.43,
        'hc-middle-y': 0.51,
        'hc-key': 'rs',
        'hc-a2': 'RS',
        name: 'Republic of Serbia',
        labelrank: '5',
        'country-abbrev': 'Serb.',
        subregion: 'Southern Europe',
        'region-wb': 'Europe & Central Asia',
        'iso-a3': 'SRB',
        'iso-a2': 'RS',
        'woe-id': '-90',
        continent: 'Europe'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [4806, 7864],
            [4805, 7891],
            [4811, 7913],
            [4800, 7912],
            [4801, 7922],
            [4797, 7951],
            [4816, 7960],
            [4837, 7958],
            [4852, 7935],
            [4873, 7922],
            [4871, 7909],
            [4892, 7899],
            [4901, 7907],
            [4909, 7889],
            [4899, 7874],
            [4917, 7849],
            [4901, 7838],
            [4899, 7821],
            [4886, 7821],
            [4876, 7818],
            [4881, 7833],
            [4852, 7854],
            [4840, 7839],
            [4818, 7851],
            [4806, 7864]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'ME',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.42,
        'hc-middle-y': 0.47,
        'hc-key': 'me',
        'hc-a2': 'ME',
        name: 'Montenegro',
        labelrank: '6',
        'country-abbrev': 'Mont.',
        subregion: 'Southern Europe',
        'region-wb': 'Europe & Central Asia',
        'iso-a3': 'MNE',
        'iso-a2': 'ME',
        'woe-id': '20069817',
        continent: 'Europe'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [4806, 7864],
            [4818, 7851],
            [4840, 7839],
            [4830, 7835],
            [4831, 7829],
            [4821, 7833],
            [4812, 7821],
            [4811, 7820],
            [4811, 7819],
            [4804, 7819],
            [4811, 7813],
            [4810, 7808],
            [4811, 7804],
            [4793, 7819],
            [4785, 7824],
            [4783, 7827],
            [4783, 7829],
            [4784, 7845],
            [4806, 7864]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'BJ',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.57,
        'hc-middle-y': 0.5,
        'hc-key': 'bj',
        'hc-a2': 'BJ',
        name: 'Benin',
        labelrank: '5',
        'country-abbrev': 'Benin',
        subregion: 'Western Africa',
        'region-wb': 'Sub-Saharan Africa',
        'iso-a3': 'BEN',
        'iso-a2': 'BJ',
        'woe-id': '23424764',
        continent: 'Africa'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [4319, 6687],
            [4295, 6684],
            [4287, 6682],
            [4287, 6766],
            [4279, 6794],
            [4262, 6805],
            [4266, 6823],
            [4282, 6838],
            [4299, 6836],
            [4310, 6850],
            [4323, 6865],
            [4346, 6844],
            [4342, 6836],
            [4353, 6812],
            [4343, 6789],
            [4321, 6766],
            [4319, 6687]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'NG',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.5,
        'hc-middle-y': 0.33,
        'hc-key': 'ng',
        'hc-a2': 'NG',
        name: 'Nigeria',
        labelrank: '2',
        'country-abbrev': 'Nigeria',
        subregion: 'Western Africa',
        'region-wb': 'Sub-Saharan Africa',
        'iso-a3': 'NGA',
        'iso-a2': 'NG',
        'woe-id': '23424908',
        continent: 'Africa'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [4319, 6687],
            [4321, 6766],
            [4343, 6789],
            [4353, 6812],
            [4342, 6836],
            [4346, 6844],
            [4347, 6869],
            [4360, 6883],
            [4361, 6897],
            [4402, 6909],
            [4427, 6902],
            [4444, 6883],
            [4470, 6893],
            [4496, 6881],
            [4524, 6878],
            [4538, 6890],
            [4577, 6894],
            [4607, 6885],
            [4620, 6898],
            [4641, 6904],
            [4654, 6885],
            [4658, 6864],
            [4672, 6858],
            [4670, 6838],
            [4652, 6832],
            [4619, 6775],
            [4617, 6758],
            [4600, 6745],
            [4590, 6709],
            [4573, 6689],
            [4552, 6709],
            [4539, 6706],
            [4500, 6671],
            [4493, 6641],
            [4484, 6633],
            [4454, 6635],
            [4422, 6625],
            [4405, 6636],
            [4384, 6676],
            [4370, 6686],
            [4319, 6687]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'TG',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.76,
        'hc-middle-y': 0.81,
        'hc-key': 'tg',
        'hc-a2': 'TG',
        name: 'Togo',
        labelrank: '6',
        'country-abbrev': 'Togo',
        subregion: 'Western Africa',
        'region-wb': 'Sub-Saharan Africa',
        'iso-a3': 'TGO',
        'iso-a2': 'TG',
        'woe-id': '23424965',
        continent: 'Africa'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [4266, 6823],
            [4262, 6805],
            [4279, 6794],
            [4287, 6766],
            [4287, 6682],
            [4282, 6681],
            [4275, 6679],
            [4255, 6701],
            [4259, 6715],
            [4250, 6758],
            [4255, 6776],
            [4246, 6781],
            [4250, 6800],
            [4237, 6813],
            [4235, 6827],
            [4254, 6824],
            [4266, 6823]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'LA',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.88,
        'hc-middle-y': 0.75,
        'hc-key': 'la',
        'hc-a2': 'LA',
        name: 'Laos',
        labelrank: '4',
        'country-abbrev': 'Laos',
        subregion: 'South-Eastern Asia',
        'region-wb': 'East Asia & Pacific',
        'iso-a3': 'LAO',
        'iso-a2': 'LA',
        'woe-id': '23424872',
        continent: 'Asia'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [7191, 7103],
            [7210, 7134],
            [7223, 7141],
            [7239, 7128],
            [7233, 7163],
            [7251, 7167],
            [7276, 7142],
            [7281, 7120],
            [7297, 7114],
            [7308, 7123],
            [7325, 7114],
            [7317, 7107],
            [7335, 7096],
            [7325, 7082],
            [7306, 7084],
            [7302, 7072],
            [7327, 7057],
            [7357, 7023],
            [7381, 7002],
            [7406, 6970],
            [7399, 6966],
            [7415, 6951],
            [7410, 6934],
            [7389, 6922],
            [7381, 6930],
            [7365, 6924],
            [7362, 6910],
            [7341, 6923],
            [7353, 6942],
            [7354, 6964],
            [7329, 6989],
            [7331, 7014],
            [7306, 7043],
            [7289, 7046],
            [7265, 7028],
            [7250, 7039],
            [7222, 7017],
            [7219, 7046],
            [7225, 7078],
            [7202, 7079],
            [7205, 7096],
            [7191, 7103]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'AF',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.38,
        'hc-middle-y': 0.52,
        'hc-key': 'af',
        'hc-a2': 'AF',
        name: 'Afghanistan',
        labelrank: '3',
        'country-abbrev': 'Afg.',
        subregion: 'Southern Asia',
        'region-wb': 'South Asia',
        'iso-a3': 'AFG',
        'iso-a2': 'AF',
        'woe-id': '23424739',
        continent: 'Asia'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [6448, 7645],
            [6433, 7641],
            [6438, 7638],
            [6379, 7631],
            [6338, 7605],
            [6352, 7576],
            [6332, 7553],
            [6335, 7538],
            [6304, 7538],
            [6313, 7514],
            [6290, 7506],
            [6281, 7485],
            [6283, 7469],
            [6269, 7458],
            [6249, 7465],
            [6226, 7445],
            [6214, 7449],
            [6197, 7436],
            [6192, 7401],
            [6129, 7387],
            [6082, 7387],
            [6034, 7402],
            [6062, 7434],
            [6059, 7451],
            [6033, 7455],
            [6033, 7479],
            [6026, 7506],
            [6034, 7522],
            [6023, 7540],
            [6035, 7547],
            [6046, 7590],
            [6068, 7584],
            [6076, 7574],
            [6100, 7584],
            [6108, 7598],
            [6141, 7612],
            [6149, 7640],
            [6171, 7645],
            [6179, 7656],
            [6201, 7649],
            [6223, 7643],
            [6238, 7643],
            [6245, 7634],
            [6265, 7646],
            [6282, 7640],
            [6289, 7656],
            [6308, 7655],
            [6322, 7683],
            [6343, 7680],
            [6351, 7667],
            [6346, 7639],
            [6351, 7627],
            [6382, 7638],
            [6401, 7653],
            [6413, 7644],
            [6432, 7651],
            [6448, 7645]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'UA',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.7,
        'hc-middle-y': 0.46,
        'hc-key': 'ua',
        'hc-a2': 'UA',
        name: 'Ukraine',
        labelrank: '3',
        'country-abbrev': 'Ukr.',
        subregion: 'Eastern Europe',
        'region-wb': 'Europe & Central Asia',
        'iso-a3': 'UKR',
        'iso-a2': 'UA',
        'woe-id': '23424976',
        continent: 'Europe'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [4892, 8043],
            [4898, 8054],
            [4904, 8068],
            [4914, 8065],
            [4907, 8086],
            [4921, 8102],
            [4951, 8125],
            [4952, 8137],
            [4936, 8163],
            [4959, 8177],
            [4999, 8179],
            [5043, 8166],
            [5073, 8168],
            [5104, 8157],
            [5140, 8165],
            [5151, 8184],
            [5176, 8186],
            [5194, 8194],
            [5236, 8196],
            [5254, 8171],
            [5248, 8152],
            [5274, 8151],
            [5291, 8117],
            [5320, 8112],
            [5344, 8120],
            [5360, 8100],
            [5365, 8106],
            [5395, 8098],
            [5423, 8075],
            [5410, 8056],
            [5418, 8037],
            [5412, 8022],
            [5385, 8022],
            [5371, 8013],
            [5367, 7994],
            [5298, 7978],
            [5266, 7960],
            [5286, 7928],
            [5318, 7933],
            [5315, 7920],
            [5289, 7921],
            [5274, 7910],
            [5256, 7907],
            [5241, 7895],
            [5228, 7904],
            [5229, 7920],
            [5210, 7930],
            [5209, 7940],
            [5236, 7951],
            [5175, 7962],
            [5193, 7971],
            [5158, 7977],
            [5119, 7939],
            [5114, 7925],
            [5104, 7933],
            [5089, 7926],
            [5071, 7934],
            [5094, 7954],
            [5093, 7970],
            [5127, 7967],
            [5111, 7989],
            [5111, 8003],
            [5098, 8010],
            [5102, 8023],
            [5058, 8045],
            [5025, 8038],
            [5011, 8028],
            [4985, 8024],
            [4914, 8026],
            [4906, 8032],
            [4892, 8043]
          ],
          [
            [5128, 7967],
            [5137, 7957],
            [5139, 7959],
            [5130, 7968],
            [5128, 7967]
          ],
          [
            [5242, 7957],
            [5271, 7941],
            [5266, 7955],
            [5248, 7964],
            [5242, 7957]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'SK',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.21,
        'hc-middle-y': 0.57,
        'hc-key': 'sk',
        'hc-a2': 'SK',
        name: 'Slovakia',
        labelrank: '6',
        'country-abbrev': 'Svk.',
        subregion: 'Eastern Europe',
        'region-wb': 'Europe & Central Asia',
        'iso-a3': 'SVK',
        'iso-a2': 'SK',
        'woe-id': '23424877',
        continent: 'Europe'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [4904, 8068],
            [4898, 8054],
            [4892, 8043],
            [4871, 8049],
            [4844, 8048],
            [4827, 8033],
            [4795, 8029],
            [4794, 8022],
            [4765, 8019],
            [4745, 8028],
            [4736, 8042],
            [4739, 8051],
            [4773, 8069],
            [4795, 8085],
            [4813, 8089],
            [4831, 8072],
            [4839, 8081],
            [4883, 8080],
            [4904, 8068]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'JK',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.4,
        'hc-middle-y': 0.63,
        'hc-key': 'jk',
        'hc-a2': 'JK',
        name: 'Siachen Glacier',
        labelrank: '5',
        'country-abbrev': 'Siachen',
        subregion: 'Southern Asia',
        'region-wb': 'South Asia',
        'iso-a3': '-99',
        'iso-a2': 'JK',
        'woe-id': '23424928',
        continent: 'Asia'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [6534, 7586],
            [6512, 7573],
            [6504, 7591],
            [6522, 7585],
            [6534, 7586]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'BG',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.76,
        'hc-middle-y': 0.51,
        'hc-key': 'bg',
        'hc-a2': 'BG',
        name: 'Bulgaria',
        labelrank: '4',
        'country-abbrev': 'Bulg.',
        subregion: 'Eastern Europe',
        'region-wb': 'Europe & Central Asia',
        'iso-a3': 'BGR',
        'iso-a2': 'BG',
        'woe-id': '23424771',
        continent: 'Europe'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [5082, 7872],
            [5069, 7859],
            [5056, 7825],
            [5066, 7809],
            [5037, 7812],
            [5016, 7799],
            [5010, 7787],
            [4984, 7783],
            [4962, 7794],
            [4915, 7786],
            [4918, 7800],
            [4899, 7821],
            [4901, 7838],
            [4917, 7849],
            [4899, 7874],
            [4909, 7889],
            [4927, 7877],
            [4987, 7868],
            [5011, 7881],
            [5037, 7887],
            [5082, 7872]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'QA',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.46,
        'hc-middle-y': 0.5,
        'hc-key': 'qa',
        'hc-a2': 'QA',
        name: 'Qatar',
        labelrank: '5',
        'country-abbrev': 'Qatar',
        subregion: 'Western Asia',
        'region-wb': 'Middle East & North Africa',
        'iso-a3': 'QAT',
        'iso-a2': 'QA',
        'woe-id': '23424930',
        continent: 'Asia'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [5738, 7240],
            [5736, 7263],
            [5751, 7284],
            [5761, 7276],
            [5757, 7238],
            [5750, 7236],
            [5743, 7235],
            [5738, 7240]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'LI',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.61,
        'hc-middle-y': 0.53,
        'hc-key': 'li',
        'hc-a2': 'LI',
        name: 'Liechtenstein',
        labelrank: '6',
        'country-abbrev': 'Liech.',
        subregion: 'Western Europe',
        'region-wb': 'Europe & Central Asia',
        'iso-a3': 'LIE',
        'iso-a2': 'LI',
        'woe-id': '23424879',
        continent: 'Europe'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [4520, 8000],
            [4523, 7995],
            [4522, 7993],
            [4519, 7993],
            [4520, 8000]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'AT',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.51,
        'hc-middle-y': 0.6,
        'hc-key': 'at',
        'hc-a2': 'AT',
        name: 'Austria',
        labelrank: '4',
        'country-abbrev': 'Aust.',
        subregion: 'Western Europe',
        'region-wb': 'Europe & Central Asia',
        'iso-a3': 'AUT',
        'iso-a2': 'AT',
        'woe-id': '23424750',
        continent: 'Europe'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [4522, 7993],
            [4523, 7995],
            [4520, 8000],
            [4524, 8006],
            [4521, 8010],
            [4525, 8009],
            [4526, 8011],
            [4539, 8001],
            [4547, 8012],
            [4563, 8005],
            [4599, 8017],
            [4624, 8009],
            [4615, 8032],
            [4644, 8048],
            [4647, 8057],
            [4673, 8050],
            [4681, 8065],
            [4739, 8051],
            [4736, 8042],
            [4745, 8028],
            [4743, 8017],
            [4728, 8019],
            [4724, 7991],
            [4714, 7985],
            [4712, 7979],
            [4678, 7976],
            [4668, 7968],
            [4644, 7973],
            [4605, 7979],
            [4599, 7994],
            [4548, 7986],
            [4538, 7985],
            [4522, 7993]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'SZ',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.49,
        'hc-middle-y': 0.52,
        'hc-key': 'sz',
        'hc-a2': 'SZ',
        name: 'Swaziland',
        labelrank: '4',
        'country-abbrev': 'Swz.',
        subregion: 'Southern Africa',
        'region-wb': 'Sub-Saharan Africa',
        'iso-a3': 'SWZ',
        'iso-a2': 'SZ',
        'woe-id': '23424993',
        continent: 'Africa'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [5182, 5722],
            [5184, 5712],
            [5187, 5694],
            [5182, 5679],
            [5158, 5683],
            [5148, 5708],
            [5166, 5729],
            [5182, 5722]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'HU',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.27,
        'hc-middle-y': 0.59,
        'hc-key': 'hu',
        'hc-a2': 'HU',
        name: 'Hungary',
        labelrank: '5',
        'country-abbrev': 'Hun.',
        subregion: 'Eastern Europe',
        'region-wb': 'Europe & Central Asia',
        'iso-a3': 'HUN',
        'iso-a2': 'HU',
        'woe-id': '23424844',
        continent: 'Europe'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [4892, 8043],
            [4906, 8032],
            [4914, 8026],
            [4888, 8009],
            [4863, 7964],
            [4837, 7958],
            [4816, 7960],
            [4797, 7951],
            [4782, 7944],
            [4751, 7952],
            [4727, 7972],
            [4719, 7985],
            [4714, 7985],
            [4724, 7991],
            [4728, 8019],
            [4743, 8017],
            [4745, 8028],
            [4765, 8019],
            [4794, 8022],
            [4795, 8029],
            [4827, 8033],
            [4844, 8048],
            [4871, 8049],
            [4892, 8043]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'RO',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.67,
        'hc-middle-y': 0.5,
        'hc-key': 'ro',
        'hc-a2': 'RO',
        name: 'Romania',
        labelrank: '3',
        'country-abbrev': 'Rom.',
        subregion: 'Eastern Europe',
        'region-wb': 'Europe & Central Asia',
        'iso-a3': 'ROU',
        'iso-a2': 'RO',
        'woe-id': '23424933',
        continent: 'Europe'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [4909, 7889],
            [4901, 7907],
            [4892, 7899],
            [4871, 7909],
            [4873, 7922],
            [4852, 7935],
            [4837, 7958],
            [4863, 7964],
            [4888, 8009],
            [4914, 8026],
            [4985, 8024],
            [5011, 8028],
            [5025, 8038],
            [5036, 8034],
            [5045, 8015],
            [5066, 7992],
            [5073, 7976],
            [5068, 7954],
            [5071, 7934],
            [5089, 7926],
            [5104, 7933],
            [5114, 7925],
            [5111, 7911],
            [5098, 7909],
            [5084, 7892],
            [5082, 7872],
            [5037, 7887],
            [5011, 7881],
            [4987, 7868],
            [4927, 7877],
            [4909, 7889]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'LU',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.48,
        'hc-middle-y': 0.6,
        'hc-key': 'lu',
        'hc-a2': 'LU',
        name: 'Luxembourg',
        labelrank: '6',
        'country-abbrev': 'Lux.',
        subregion: 'Western Europe',
        'region-wb': 'Europe & Central Asia',
        'iso-a3': 'LUX',
        'iso-a2': 'LU',
        'woe-id': '23424881',
        continent: 'Europe'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [4427, 8083],
            [4415, 8083],
            [4410, 8086],
            [4408, 8099],
            [4420, 8109],
            [4431, 8096],
            [4427, 8083]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'AD',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.58,
        'hc-middle-y': 0.28,
        'hc-key': 'ad',
        'hc-a2': 'AD',
        name: 'Andorra',
        labelrank: '6',
        'country-abbrev': 'And.',
        subregion: 'Southern Europe',
        'region-wb': 'Europe & Central Asia',
        'iso-a3': 'AND',
        'iso-a2': 'AD',
        'woe-id': '23424744',
        continent: 'Europe'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [4282, 7831],
            [4290, 7831],
            [4290, 7827],
            [4284, 7825],
            [4282, 7831]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'CI',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.5,
        'hc-middle-y': 0.52,
        'hc-key': 'ci',
        'hc-a2': 'CI',
        name: 'Ivory Coast',
        labelrank: '3',
        'country-abbrev': 'I.C.',
        subregion: 'Western Africa',
        'region-wb': 'Sub-Saharan Africa',
        'iso-a3': 'CIV',
        'iso-a2': 'CI',
        'woe-id': '23424854',
        continent: 'Africa'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [4148, 6649],
              [4143, 6650],
              [4148, 6650],
              [4148, 6649]
            ]
          ],
          [
            [
              [4017, 6628],
              [4019, 6670],
              [4008, 6682],
              [3985, 6690],
              [3995, 6709],
              [3989, 6722],
              [3997, 6721],
              [3998, 6749],
              [4008, 6776],
              [3999, 6780],
              [4004, 6799],
              [4014, 6807],
              [4034, 6799],
              [4055, 6815],
              [4056, 6801],
              [4077, 6806],
              [4089, 6803],
              [4102, 6784],
              [4145, 6791],
              [4160, 6779],
              [4166, 6741],
              [4145, 6701],
              [4156, 6651],
              [4122, 6653],
              [4067, 6647],
              [4017, 6628]
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'LR',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.96,
        'hc-middle-y': 0.75,
        'hc-key': 'lr',
        'hc-a2': 'LR',
        name: 'Liberia',
        labelrank: '4',
        'country-abbrev': 'Liberia',
        subregion: 'Western Africa',
        'region-wb': 'Sub-Saharan Africa',
        'iso-a3': 'LBR',
        'iso-a2': 'LR',
        'woe-id': '23424876',
        continent: 'Africa'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [3989, 6722],
            [3995, 6709],
            [3985, 6690],
            [4008, 6682],
            [4019, 6670],
            [4017, 6628],
            [3966, 6651],
            [3935, 6680],
            [3901, 6703],
            [3927, 6728],
            [3936, 6749],
            [3959, 6745],
            [3971, 6711],
            [3989, 6722]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'BN',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.32,
        'hc-middle-y': 0.34,
        'hc-key': 'bn',
        'hc-a2': 'BN',
        name: 'Brunei',
        labelrank: '6',
        'country-abbrev': 'Brunei',
        subregion: 'South-Eastern Asia',
        'region-wb': 'East Asia & Pacific',
        'iso-a3': 'BRN',
        'iso-a2': 'BN',
        'woe-id': '23424773',
        continent: 'Asia'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [7632, 6641],
              [7635, 6642],
              [7635, 6644],
              [7641, 6626],
              [7632, 6641]
            ]
          ],
          [
            [
              [7601, 6635],
              [7617, 6638],
              [7630, 6643],
              [7620, 6618],
              [7601, 6635]
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'BE',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.51,
        'hc-middle-y': 0.36,
        'hc-key': 'be',
        'hc-a2': 'BE',
        name: 'Belgium',
        labelrank: '2',
        'country-abbrev': 'Belg.',
        subregion: 'Western Europe',
        'region-wb': 'Europe & Central Asia',
        'iso-a3': 'BEL',
        'iso-a2': 'BE',
        'woe-id': '23424757',
        continent: 'Europe'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [4420, 8109],
            [4408, 8099],
            [4410, 8086],
            [4400, 8085],
            [4381, 8102],
            [4361, 8103],
            [4363, 8113],
            [4348, 8116],
            [4314, 8146],
            [4332, 8155],
            [4338, 8157],
            [4352, 8151],
            [4364, 8157],
            [4366, 8155],
            [4365, 8157],
            [4387, 8161],
            [4411, 8149],
            [4416, 8133],
            [4427, 8116],
            [4420, 8109]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'IQ',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.46,
        'hc-middle-y': 0.44,
        'hc-key': 'iq',
        'hc-a2': 'IQ',
        name: 'Iraq',
        labelrank: '3',
        'country-abbrev': 'Iraq',
        subregion: 'Western Asia',
        'region-wb': 'Middle East & North Africa',
        'iso-a3': 'IRQ',
        'iso-a2': 'IQ',
        'woe-id': '23424855',
        continent: 'Asia'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [5671, 7405],
            [5659, 7408],
            [5654, 7406],
            [5629, 7405],
            [5612, 7377],
            [5558, 7381],
            [5480, 7441],
            [5432, 7468],
            [5394, 7475],
            [5391, 7487],
            [5383, 7516],
            [5440, 7548],
            [5455, 7563],
            [5460, 7621],
            [5474, 7624],
            [5489, 7641],
            [5499, 7649],
            [5560, 7642],
            [5576, 7603],
            [5606, 7597],
            [5579, 7551],
            [5578, 7536],
            [5593, 7524],
            [5604, 7502],
            [5638, 7484],
            [5650, 7463],
            [5645, 7438],
            [5655, 7438],
            [5655, 7421],
            [5671, 7405]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'GE',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.25,
        'hc-middle-y': 0.44,
        'hc-key': 'ge',
        'hc-a2': 'GE',
        name: 'Georgia',
        labelrank: '5',
        'country-abbrev': 'Geo.',
        subregion: 'Western Asia',
        'region-wb': 'Europe & Central Asia',
        'iso-a3': 'GEO',
        'iso-a2': 'GE',
        'woe-id': '23424823',
        continent: 'Asia'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [5567, 7785],
            [5542, 7782],
            [5521, 7778],
            [5502, 7795],
            [5492, 7789],
            [5464, 7792],
            [5471, 7803],
            [5463, 7832],
            [5449, 7845],
            [5419, 7859],
            [5438, 7864],
            [5466, 7853],
            [5503, 7851],
            [5535, 7829],
            [5562, 7836],
            [5588, 7826],
            [5585, 7817],
            [5609, 7806],
            [5601, 7797],
            [5616, 7784],
            [5611, 7776],
            [5574, 7790],
            [5567, 7785]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'GM',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.22,
        'hc-middle-y': 0.53,
        'hc-key': 'gm',
        'hc-a2': 'GM',
        name: 'Gambia',
        labelrank: '6',
        'country-abbrev': 'Gambia',
        subregion: 'Western Africa',
        'region-wb': 'Sub-Saharan Africa',
        'iso-a3': 'GMB',
        'iso-a2': 'GM',
        'woe-id': '23424821',
        continent: 'Africa'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [3746, 6885],
            [3743, 6893],
            [3751, 6900],
            [3782, 6900],
            [3801, 6906],
            [3831, 6893],
            [3816, 6890],
            [3793, 6901],
            [3773, 6888],
            [3746, 6885]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'CH',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.12,
        'hc-middle-y': 0.61,
        'hc-key': 'ch',
        'hc-a2': 'CH',
        name: 'Switzerland',
        labelrank: '4',
        'country-abbrev': 'Switz.',
        subregion: 'Western Europe',
        'region-wb': 'Europe & Central Asia',
        'iso-a3': 'CHE',
        'iso-a2': 'CH',
        'woe-id': '23424957',
        continent: 'Europe'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [4510, 8016],
            [4511, 8015],
            [4511, 8015],
            [4511, 8015],
            [4520, 8009],
            [4521, 8010],
            [4524, 8006],
            [4520, 8000],
            [4519, 7993],
            [4522, 7993],
            [4538, 7985],
            [4548, 7986],
            [4548, 7973],
            [4533, 7967],
            [4513, 7971],
            [4500, 7956],
            [4478, 7963],
            [4471, 7951],
            [4447, 7951],
            [4439, 7959],
            [4440, 7969],
            [4435, 7973],
            [4428, 7968],
            [4423, 7964],
            [4420, 7975],
            [4447, 8003],
            [4463, 8012],
            [4489, 8012],
            [4510, 8016]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'TD',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.47,
        'hc-middle-y': 0.63,
        'hc-key': 'td',
        'hc-a2': 'TD',
        name: 'Chad',
        labelrank: '3',
        'country-abbrev': 'Chad',
        subregion: 'Middle Africa',
        'region-wb': 'Sub-Saharan Africa',
        'iso-a3': 'TCD',
        'iso-a2': 'TD',
        'woe-id': '23424777',
        continent: 'Africa'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [4667, 6882],
            [4675, 6885],
            [4663, 6885],
            [4663, 6885],
            [4661, 6887],
            [4662, 6885],
            [4654, 6885],
            [4641, 6904],
            [4636, 6924],
            [4663, 6965],
            [4696, 7000],
            [4704, 7091],
            [4711, 7104],
            [4687, 7139],
            [4681, 7186],
            [4711, 7200],
            [4947, 7078],
            [4947, 6964],
            [4921, 6964],
            [4904, 6917],
            [4891, 6906],
            [4896, 6893],
            [4883, 6877],
            [4894, 6875],
            [4915, 6836],
            [4914, 6821],
            [4902, 6823],
            [4842, 6768],
            [4803, 6765],
            [4804, 6755],
            [4788, 6736],
            [4760, 6734],
            [4734, 6722],
            [4728, 6731],
            [4696, 6721],
            [4687, 6749],
            [4651, 6783],
            [4658, 6793],
            [4702, 6794],
            [4684, 6817],
            [4686, 6839],
            [4677, 6872],
            [4667, 6882]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'KV',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.49,
        'hc-middle-y': 0.52,
        'hc-key': 'kv',
        'hc-a2': 'KV',
        name: 'Kosovo',
        labelrank: '6',
        'country-abbrev': 'Kos.',
        subregion: 'Southern Europe',
        'region-wb': 'Europe & Central Asia',
        'iso-a3': '-99',
        'iso-a2': 'KV',
        'woe-id': '-90',
        continent: 'Europe'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [4846, 7805],
            [4844, 7817],
            [4831, 7829],
            [4830, 7835],
            [4840, 7839],
            [4852, 7854],
            [4881, 7833],
            [4876, 7818],
            [4862, 7816],
            [4846, 7805]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'LB',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.39,
        'hc-middle-y': 0.57,
        'hc-key': 'lb',
        'hc-a2': 'LB',
        name: 'Lebanon',
        labelrank: '5',
        'country-abbrev': 'Leb.',
        subregion: 'Western Asia',
        'region-wb': 'Middle East & North Africa',
        'iso-a3': 'LBN',
        'iso-a2': 'LB',
        'woe-id': '23424873',
        continent: 'Asia'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [5275, 7507],
            [5289, 7534],
            [5300, 7558],
            [5319, 7543],
            [5296, 7517],
            [5286, 7507],
            [5275, 7507]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'DJ',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.56,
        'hc-middle-y': 0.55,
        'hc-key': 'dj',
        'hc-a2': 'DJ',
        name: 'Djibouti',
        labelrank: '5',
        'country-abbrev': 'Dji.',
        subregion: 'Eastern Africa',
        'region-wb': 'Middle East & North Africa',
        'iso-a3': 'DJI',
        'iso-a2': 'DJ',
        'woe-id': '23424797',
        continent: 'Africa'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [5505, 6823],
            [5476, 6821],
            [5472, 6826],
            [5475, 6830],
            [5472, 6832],
            [5471, 6839],
            [5489, 6867],
            [5498, 6864],
            [5511, 6874],
            [5518, 6853],
            [5499, 6840],
            [5515, 6838],
            [5505, 6823]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'BI',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.56,
        'hc-middle-y': 0.47,
        'hc-key': 'bi',
        'hc-a2': 'BI',
        name: 'Burundi',
        labelrank: '6',
        'country-abbrev': 'Bur.',
        subregion: 'Eastern Africa',
        'region-wb': 'Sub-Saharan Africa',
        'iso-a3': 'BDI',
        'iso-a2': 'BI',
        'woe-id': '23424774',
        continent: 'Africa'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [5114, 6370],
            [5106, 6386],
            [5101, 6402],
            [5102, 6411],
            [5095, 6420],
            [5121, 6422],
            [5122, 6432],
            [5141, 6430],
            [5137, 6416],
            [5148, 6405],
            [5124, 6375],
            [5114, 6370]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'SR',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.93,
        'hc-middle-y': 0.13,
        'hc-key': 'sr',
        'hc-a2': 'SR',
        name: 'Suriname',
        labelrank: '4',
        'country-abbrev': 'Sur.',
        subregion: 'South America',
        'region-wb': 'Latin America & Caribbean',
        'iso-a3': 'SUR',
        'iso-a2': 'SR',
        'woe-id': '23424913',
        continent: 'South America'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [2629, 6568],
            [2618, 6574],
            [2589, 6574],
            [2588, 6554],
            [2574, 6557],
            [2554, 6583],
            [2550, 6599],
            [2539, 6599],
            [2527, 6622],
            [2537, 6646],
            [2550, 6647],
            [2551, 6661],
            [2560, 6676],
            [2647, 6671],
            [2642, 6657],
            [2633, 6644],
            [2637, 6618],
            [2647, 6601],
            [2629, 6568]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'IL',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.68,
        'hc-middle-y': 0.1,
        'hc-key': 'il',
        'hc-a2': 'IL',
        name: 'Israel',
        labelrank: '4',
        'country-abbrev': 'Isr.',
        subregion: 'Western Asia',
        'region-wb': 'Middle East & North Africa',
        'iso-a3': 'ISR',
        'iso-a2': 'IL',
        'woe-id': '23424852',
        continent: 'Asia'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [5248, 7449],
            [5267, 7480],
            [5275, 7507],
            [5286, 7507],
            [5296, 7517],
            [5298, 7502],
            [5294, 7495],
            [5288, 7492],
            [5288, 7463],
            [5283, 7455],
            [5284, 7449],
            [5283, 7447],
            [5284, 7446],
            [5282, 7444],
            [5284, 7442],
            [5276, 7420],
            [5270, 7392],
            [5269, 7390],
            [5268, 7390],
            [5267, 7398],
            [5248, 7449]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'ML',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.59,
        'hc-middle-y': 0.38,
        'hc-key': 'ml',
        'hc-a2': 'ML',
        name: 'Mali',
        labelrank: '3',
        'country-abbrev': 'Mali',
        subregion: 'Western Africa',
        'region-wb': 'Sub-Saharan Africa',
        'iso-a3': 'MLI',
        'iso-a2': 'ML',
        'woe-id': '23424891',
        continent: 'Africa'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [4077, 6806],
            [4056, 6801],
            [4055, 6815],
            [4034, 6799],
            [4014, 6807],
            [4004, 6799],
            [3993, 6834],
            [3979, 6843],
            [3969, 6867],
            [3953, 6854],
            [3937, 6860],
            [3924, 6850],
            [3904, 6865],
            [3904, 6881],
            [3883, 6904],
            [3878, 6936],
            [3891, 6940],
            [3894, 6959],
            [3903, 6961],
            [3918, 6946],
            [3923, 6956],
            [3964, 6958],
            [4077, 6957],
            [4082, 6982],
            [4074, 6989],
            [4045, 7248],
            [4097, 7248],
            [4273, 7127],
            [4274, 7116],
            [4295, 7101],
            [4334, 7087],
            [4331, 7067],
            [4364, 7068],
            [4363, 6985],
            [4343, 6953],
            [4279, 6951],
            [4268, 6942],
            [4246, 6940],
            [4218, 6945],
            [4177, 6917],
            [4156, 6914],
            [4135, 6888],
            [4119, 6895],
            [4105, 6858],
            [4087, 6851],
            [4077, 6806]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'SN',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.23,
        'hc-middle-y': 0.5,
        'hc-key': 'sn',
        'hc-a2': 'SN',
        name: 'Senegal',
        labelrank: '3',
        'country-abbrev': 'Sen.',
        subregion: 'Western Africa',
        'region-wb': 'Sub-Saharan Africa',
        'iso-a3': 'SEN',
        'iso-a2': 'SN',
        'woe-id': '23424943',
        continent: 'Africa'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [3746, 6863],
            [3744, 6877],
            [3746, 6885],
            [3773, 6888],
            [3793, 6901],
            [3816, 6890],
            [3831, 6893],
            [3801, 6906],
            [3782, 6900],
            [3751, 6900],
            [3740, 6924],
            [3722, 6935],
            [3734, 6941],
            [3752, 6967],
            [3758, 6986],
            [3817, 6992],
            [3832, 6976],
            [3842, 6977],
            [3849, 6961],
            [3878, 6936],
            [3883, 6904],
            [3904, 6881],
            [3904, 6865],
            [3875, 6862],
            [3835, 6873],
            [3792, 6873],
            [3777, 6866],
            [3746, 6863]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'GN',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.26,
        'hc-middle-y': 0.52,
        'hc-key': 'gn',
        'hc-a2': 'GN',
        name: 'Guinea',
        labelrank: '3',
        'country-abbrev': 'Gin.',
        subregion: 'Western Africa',
        'region-wb': 'Sub-Saharan Africa',
        'iso-a3': 'GIN',
        'iso-a2': 'GN',
        'woe-id': '23424835',
        continent: 'Africa'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [3835, 6873],
            [3875, 6862],
            [3904, 6865],
            [3924, 6850],
            [3937, 6860],
            [3953, 6854],
            [3969, 6867],
            [3979, 6843],
            [3993, 6834],
            [4004, 6799],
            [3999, 6780],
            [4008, 6776],
            [3998, 6749],
            [3997, 6721],
            [3989, 6722],
            [3971, 6711],
            [3959, 6745],
            [3936, 6749],
            [3925, 6773],
            [3908, 6794],
            [3871, 6789],
            [3847, 6766],
            [3831, 6790],
            [3797, 6823],
            [3806, 6838],
            [3835, 6845],
            [3828, 6858],
            [3835, 6873]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'ZW',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.81,
        'hc-middle-y': 0.43,
        'hc-key': 'zw',
        'hc-a2': 'ZW',
        name: 'Zimbabwe',
        labelrank: '3',
        'country-abbrev': 'Zimb.',
        subregion: 'Eastern Africa',
        'region-wb': 'Sub-Saharan Africa',
        'iso-a3': 'ZWE',
        'iso-a2': 'ZW',
        'woe-id': '23425004',
        continent: 'Africa'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [4984, 5973],
            [5027, 5965],
            [5036, 5968],
            [5068, 6001],
            [5069, 6002],
            [5088, 6011],
            [5091, 6026],
            [5119, 6039],
            [5136, 6038],
            [5136, 6027],
            [5161, 6027],
            [5181, 6014],
            [5212, 6007],
            [5214, 5956],
            [5206, 5922],
            [5213, 5905],
            [5198, 5889],
            [5195, 5867],
            [5162, 5833],
            [5134, 5834],
            [5105, 5839],
            [5096, 5850],
            [5066, 5858],
            [5055, 5873],
            [5056, 5891],
            [5010, 5921],
            [4984, 5973]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'PL',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.52,
        'hc-middle-y': 0.27,
        'hc-key': 'pl',
        'hc-a2': 'PL',
        name: 'Poland',
        labelrank: '3',
        'country-abbrev': 'Pol.',
        subregion: 'Eastern Europe',
        'region-wb': 'Europe & Central Asia',
        'iso-a3': 'POL',
        'iso-a2': 'PL',
        'woe-id': '23424923',
        continent: 'Europe'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [4818, 8280],
            [4811, 8273],
            [4822, 8279],
            [4909, 8276],
            [4911, 8276],
            [4931, 8268],
            [4932, 8259],
            [4944, 8227],
            [4943, 8208],
            [4923, 8193],
            [4937, 8185],
            [4936, 8163],
            [4952, 8137],
            [4951, 8125],
            [4921, 8102],
            [4907, 8086],
            [4914, 8065],
            [4904, 8068],
            [4883, 8080],
            [4839, 8081],
            [4831, 8072],
            [4813, 8089],
            [4795, 8085],
            [4787, 8100],
            [4766, 8103],
            [4746, 8119],
            [4732, 8108],
            [4717, 8120],
            [4724, 8127],
            [4676, 8137],
            [4683, 8153],
            [4670, 8174],
            [4671, 8205],
            [4656, 8215],
            [4664, 8233],
            [4660, 8249],
            [4671, 8256],
            [4658, 8257],
            [4658, 8258],
            [4659, 8259],
            [4715, 8273],
            [4728, 8284],
            [4780, 8296],
            [4788, 8279],
            [4818, 8280],
            [4818, 8280]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'MK',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.49,
        'hc-middle-y': 0.44,
        'hc-key': 'mk',
        'hc-a2': 'MK',
        name: 'Macedonia',
        labelrank: '6',
        'country-abbrev': 'Mkd.',
        subregion: 'Southern Europe',
        'region-wb': 'Europe & Central Asia',
        'iso-a3': 'MKD',
        'iso-a2': 'MK',
        'woe-id': '23424890',
        continent: 'Europe'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [4858, 7769],
              [4858, 7769],
              [4858, 7769],
              [4858, 7769]
            ]
          ],
          [
            [
              [4899, 7821],
              [4918, 7800],
              [4915, 7786],
              [4886, 7778],
              [4862, 7769],
              [4858, 7775],
              [4858, 7770],
              [4857, 7771],
              [4857, 7771],
              [4854, 7772],
              [4851, 7771],
              [4854, 7778],
              [4848, 7777],
              [4842, 7794],
              [4846, 7805],
              [4862, 7816],
              [4876, 7818],
              [4886, 7821],
              [4899, 7821]
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'PY',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.49,
        'hc-middle-y': 0.5,
        'hc-key': 'py',
        'hc-a2': 'PY',
        name: 'Paraguay',
        labelrank: '4',
        'country-abbrev': 'Para.',
        subregion: 'South America',
        'region-wb': 'Latin America & Caribbean',
        'iso-a3': 'PRY',
        'iso-a2': 'PY',
        'woe-id': '23424917',
        continent: 'South America'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [2639, 5781],
            [2636, 5769],
            [2629, 5738],
            [2630, 5735],
            [2629, 5734],
            [2624, 5700],
            [2595, 5675],
            [2585, 5680],
            [2553, 5674],
            [2529, 5681],
            [2511, 5679],
            [2527, 5717],
            [2542, 5738],
            [2536, 5746],
            [2505, 5759],
            [2469, 5783],
            [2441, 5789],
            [2413, 5813],
            [2392, 5838],
            [2403, 5874],
            [2403, 5889],
            [2419, 5917],
            [2470, 5928],
            [2497, 5928],
            [2524, 5912],
            [2525, 5901],
            [2535, 5877],
            [2530, 5843],
            [2569, 5838],
            [2576, 5843],
            [2599, 5825],
            [2605, 5784],
            [2628, 5789],
            [2639, 5781]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'BY',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.5,
        'hc-middle-y': 0.5,
        'hc-key': 'by',
        'hc-a2': 'BY',
        name: 'Belarus',
        labelrank: '4',
        'country-abbrev': 'Bela.',
        subregion: 'Eastern Europe',
        'region-wb': 'Europe & Central Asia',
        'iso-a3': 'BLR',
        'iso-a2': 'BY',
        'woe-id': '23424765',
        continent: 'Europe'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [4936, 8163],
            [4937, 8185],
            [4923, 8193],
            [4943, 8208],
            [4944, 8227],
            [4932, 8259],
            [4958, 8257],
            [4990, 8274],
            [5002, 8300],
            [5029, 8315],
            [5024, 8330],
            [5053, 8335],
            [5070, 8350],
            [5150, 8327],
            [5159, 8287],
            [5176, 8253],
            [5204, 8239],
            [5187, 8225],
            [5161, 8222],
            [5176, 8186],
            [5151, 8184],
            [5140, 8165],
            [5104, 8157],
            [5073, 8168],
            [5043, 8166],
            [4999, 8179],
            [4959, 8177],
            [4936, 8163]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'LV',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.05,
        'hc-middle-y': 0.36,
        'hc-key': 'lv',
        'hc-a2': 'LV',
        name: 'Latvia',
        labelrank: '5',
        'country-abbrev': 'Lat.',
        subregion: 'Northern Europe',
        'region-wb': 'Europe & Central Asia',
        'iso-a3': 'LVA',
        'iso-a2': 'LV',
        'woe-id': '23424874',
        continent: 'Europe'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [5070, 8350],
            [5053, 8335],
            [5024, 8330],
            [4996, 8349],
            [4980, 8351],
            [4973, 8362],
            [4961, 8354],
            [4891, 8361],
            [4860, 8347],
            [4861, 8379],
            [4880, 8410],
            [4906, 8417],
            [4926, 8390],
            [4938, 8384],
            [4959, 8395],
            [4956, 8422],
            [4985, 8431],
            [5021, 8407],
            [5046, 8408],
            [5060, 8398],
            [5054, 8379],
            [5069, 8366],
            [5070, 8350]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'CZ',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.49,
        'hc-middle-y': 0.56,
        'hc-key': 'cz',
        'hc-a2': 'CZ',
        name: 'Czech Republic',
        labelrank: '5',
        'country-abbrev': 'Cz. Rep.',
        subregion: 'Eastern Europe',
        'region-wb': 'Europe & Central Asia',
        'iso-a3': 'CZE',
        'iso-a2': 'CZ',
        'woe-id': '23424810',
        continent: 'Europe'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [4795, 8085],
            [4773, 8069],
            [4739, 8051],
            [4681, 8065],
            [4673, 8050],
            [4647, 8057],
            [4605, 8094],
            [4609, 8119],
            [4663, 8138],
            [4676, 8137],
            [4724, 8127],
            [4717, 8120],
            [4732, 8108],
            [4746, 8119],
            [4766, 8103],
            [4787, 8100],
            [4795, 8085]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'BF',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.64,
        'hc-middle-y': 0.41,
        'hc-key': 'bf',
        'hc-a2': 'BF',
        name: 'Burkina Faso',
        labelrank: '3',
        'country-abbrev': 'B.F.',
        subregion: 'Western Africa',
        'region-wb': 'Sub-Saharan Africa',
        'iso-a3': 'BFA',
        'iso-a2': 'BF',
        'woe-id': '23424978',
        continent: 'Africa'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [4266, 6823],
            [4254, 6824],
            [4235, 6827],
            [4215, 6824],
            [4158, 6823],
            [4153, 6813],
            [4160, 6779],
            [4145, 6791],
            [4102, 6784],
            [4089, 6803],
            [4077, 6806],
            [4087, 6851],
            [4105, 6858],
            [4119, 6895],
            [4135, 6888],
            [4156, 6914],
            [4177, 6917],
            [4218, 6945],
            [4246, 6940],
            [4244, 6929],
            [4269, 6884],
            [4286, 6872],
            [4304, 6871],
            [4310, 6850],
            [4299, 6836],
            [4282, 6838],
            [4266, 6823]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'NA',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.33,
        'hc-middle-y': 0.37,
        'hc-key': 'na',
        'hc-a2': 'NA',
        name: 'Namibia',
        labelrank: '3',
        'country-abbrev': 'Nam.',
        subregion: 'Southern Africa',
        'region-wb': 'Sub-Saharan Africa',
        'iso-a3': 'NAM',
        'iso-a2': 'NA',
        'woe-id': '23424987',
        continent: 'Africa'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [4929, 5978],
            [4954, 5983],
            [4984, 5973],
            [4954, 5967],
            [4935, 5953],
            [4926, 5967],
            [4858, 5957],
            [4858, 5846],
            [4829, 5845],
            [4829, 5760],
            [4829, 5644],
            [4803, 5627],
            [4753, 5635],
            [4743, 5657],
            [4726, 5639],
            [4702, 5659],
            [4691, 5679],
            [4670, 5766],
            [4664, 5836],
            [4635, 5880],
            [4610, 5933],
            [4594, 5952],
            [4587, 5989],
            [4610, 5990],
            [4628, 5999],
            [4651, 5985],
            [4784, 5985],
            [4793, 5975],
            [4853, 5966],
            [4929, 5978]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'NE',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.64,
        'hc-middle-y': 0.53,
        'hc-key': 'ne',
        'hc-a2': 'NE',
        name: 'Niger',
        labelrank: '3',
        'country-abbrev': 'Niger',
        subregion: 'Western Africa',
        'region-wb': 'Sub-Saharan Africa',
        'iso-a3': 'NER',
        'iso-a2': 'NE',
        'woe-id': '23424906',
        continent: 'Africa'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [4593, 7202],
            [4637, 7191],
            [4659, 7174],
            [4681, 7186],
            [4687, 7139],
            [4711, 7104],
            [4704, 7091],
            [4696, 7000],
            [4663, 6965],
            [4636, 6924],
            [4641, 6904],
            [4620, 6898],
            [4607, 6885],
            [4577, 6894],
            [4538, 6890],
            [4524, 6878],
            [4496, 6881],
            [4470, 6893],
            [4444, 6883],
            [4427, 6902],
            [4402, 6909],
            [4361, 6897],
            [4360, 6883],
            [4347, 6869],
            [4346, 6844],
            [4323, 6865],
            [4310, 6850],
            [4304, 6871],
            [4286, 6872],
            [4269, 6884],
            [4244, 6929],
            [4246, 6940],
            [4268, 6942],
            [4279, 6951],
            [4343, 6953],
            [4363, 6985],
            [4364, 7068],
            [4410, 7077],
            [4460, 7120],
            [4593, 7202]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'LY',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.5,
        'hc-middle-y': 0.39,
        'hc-key': 'ly',
        'hc-a2': 'LY',
        name: 'Libya',
        labelrank: '3',
        'country-abbrev': 'Libya',
        subregion: 'Northern Africa',
        'region-wb': 'Middle East & North Africa',
        'iso-a3': 'LBY',
        'iso-a2': 'LY',
        'woe-id': '23424882',
        continent: 'Africa'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [4681, 7186],
            [4659, 7174],
            [4637, 7191],
            [4593, 7202],
            [4580, 7226],
            [4535, 7244],
            [4535, 7258],
            [4517, 7283],
            [4530, 7295],
            [4526, 7320],
            [4533, 7338],
            [4529, 7378],
            [4513, 7410],
            [4520, 7414],
            [4542, 7436],
            [4538, 7452],
            [4560, 7475],
            [4581, 7486],
            [4579, 7510],
            [4604, 7498],
            [4633, 7501],
            [4687, 7484],
            [4696, 7460],
            [4713, 7447],
            [4752, 7441],
            [4802, 7415],
            [4822, 7423],
            [4834, 7446],
            [4827, 7463],
            [4846, 7489],
            [4877, 7502],
            [4893, 7502],
            [4921, 7492],
            [4920, 7482],
            [4950, 7471],
            [4976, 7470],
            [4981, 7460],
            [4973, 7451],
            [4977, 7432],
            [4968, 7412],
            [4976, 7380],
            [4976, 7155],
            [4976, 7094],
            [4947, 7094],
            [4947, 7078],
            [4711, 7200],
            [4681, 7186]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'TN',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.42,
        'hc-middle-y': 0.09,
        'hc-key': 'tn',
        'hc-a2': 'TN',
        name: 'Tunisia',
        labelrank: '3',
        'country-abbrev': 'Tun.',
        subregion: 'Northern Africa',
        'region-wb': 'Middle East & North Africa',
        'iso-a3': 'TUN',
        'iso-a2': 'TN',
        'woe-id': '23424967',
        continent: 'Africa'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [4579, 7510],
            [4581, 7486],
            [4560, 7475],
            [4538, 7452],
            [4542, 7436],
            [4520, 7414],
            [4506, 7473],
            [4485, 7488],
            [4468, 7511],
            [4460, 7533],
            [4482, 7558],
            [4486, 7618],
            [4493, 7635],
            [4527, 7649],
            [4543, 7643],
            [4544, 7628],
            [4565, 7640],
            [4568, 7632],
            [4550, 7614],
            [4553, 7598],
            [4569, 7578],
            [4552, 7555],
            [4538, 7547],
            [4544, 7527],
            [4566, 7530],
            [4569, 7511],
            [4579, 7510]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'BT',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.49,
        'hc-middle-y': 0.49,
        'hc-key': 'bt',
        'hc-a2': 'BT',
        name: 'Bhutan',
        labelrank: '5',
        'country-abbrev': 'Bhutan',
        subregion: 'Southern Asia',
        'region-wb': 'South Asia',
        'iso-a3': 'BTN',
        'iso-a2': 'BT',
        'woe-id': '23424770',
        continent: 'Asia'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [6861, 7321],
            [6881, 7347],
            [6900, 7354],
            [6942, 7335],
            [6955, 7309],
            [6944, 7305],
            [6888, 7301],
            [6867, 7305],
            [6861, 7321]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'MD',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.52,
        'hc-middle-y': 0.41,
        'hc-key': 'md',
        'hc-a2': 'MD',
        name: 'Moldova',
        labelrank: '6',
        'country-abbrev': 'Mda.',
        subregion: 'Eastern Europe',
        'region-wb': 'Europe & Central Asia',
        'iso-a3': 'MDA',
        'iso-a2': 'MD',
        'woe-id': '23424885',
        continent: 'Europe'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [5071, 7934],
            [5068, 7954],
            [5073, 7976],
            [5066, 7992],
            [5045, 8015],
            [5036, 8034],
            [5025, 8038],
            [5058, 8045],
            [5102, 8023],
            [5098, 8010],
            [5111, 8003],
            [5111, 7989],
            [5127, 7967],
            [5093, 7970],
            [5094, 7954],
            [5071, 7934]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'SS',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.49,
        'hc-middle-y': 0.58,
        'hc-key': 'ss',
        'hc-a2': 'SS',
        name: 'South Sudan',
        labelrank: '3',
        'country-abbrev': 'S. Sud.',
        subregion: 'Eastern Africa',
        'region-wb': 'Sub-Saharan Africa',
        'iso-a3': 'SSD',
        'iso-a2': 'SS',
        'woe-id': '-99',
        continent: 'Africa'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [5242, 6624],
            [5227, 6610],
            [5213, 6614],
            [5188, 6603],
            [5177, 6612],
            [5149, 6602],
            [5130, 6616],
            [5118, 6634],
            [5101, 6627],
            [5088, 6633],
            [5076, 6625],
            [5049, 6649],
            [5039, 6669],
            [5019, 6678],
            [5017, 6695],
            [4987, 6715],
            [4972, 6740],
            [4953, 6743],
            [4952, 6755],
            [4964, 6761],
            [4979, 6802],
            [5001, 6806],
            [5023, 6780],
            [5062, 6782],
            [5067, 6774],
            [5090, 6774],
            [5125, 6802],
            [5147, 6786],
            [5161, 6788],
            [5195, 6825],
            [5186, 6853],
            [5219, 6859],
            [5218, 6819],
            [5240, 6799],
            [5244, 6778],
            [5241, 6748],
            [5220, 6748],
            [5214, 6729],
            [5234, 6725],
            [5264, 6695],
            [5282, 6657],
            [5295, 6656],
            [5299, 6635],
            [5284, 6647],
            [5253, 6635],
            [5242, 6624]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'CF',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.47,
        'hc-middle-y': 0.46,
        'hc-key': 'cf',
        'hc-a2': 'CF',
        name: 'Central African Republic',
        labelrank: '4',
        'country-abbrev': 'C.A.R.',
        subregion: 'Middle Africa',
        'region-wb': 'Sub-Saharan Africa',
        'iso-a3': 'CAF',
        'iso-a2': 'CF',
        'woe-id': '23424792',
        continent: 'Africa'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [4717, 6565],
            [4714, 6583],
            [4687, 6610],
            [4668, 6654],
            [4664, 6677],
            [4674, 6683],
            [4696, 6721],
            [4728, 6731],
            [4734, 6722],
            [4760, 6734],
            [4788, 6736],
            [4804, 6755],
            [4803, 6765],
            [4842, 6768],
            [4902, 6823],
            [4914, 6821],
            [4937, 6790],
            [4932, 6758],
            [4952, 6755],
            [4953, 6743],
            [4972, 6740],
            [4987, 6715],
            [5017, 6695],
            [5019, 6678],
            [5039, 6669],
            [5049, 6649],
            [5021, 6648],
            [4994, 6658],
            [4986, 6647],
            [4962, 6649],
            [4927, 6635],
            [4915, 6641],
            [4903, 6623],
            [4846, 6629],
            [4821, 6651],
            [4802, 6644],
            [4786, 6627],
            [4789, 6602],
            [4754, 6609],
            [4728, 6601],
            [4717, 6565]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'NZ',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.24,
        'hc-middle-y': 0.82,
        'hc-key': 'nz',
        'hc-a2': 'NZ',
        name: 'New Zealand',
        labelrank: '2',
        'country-abbrev': 'N.Z.',
        subregion: 'Australia and New Zealand',
        'region-wb': 'East Asia & Pacific',
        'iso-a3': 'NZL',
        'iso-a2': 'NZ',
        'woe-id': '23424916',
        continent: 'Oceania'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [9271, 5057],
              [9242, 5025],
              [9202, 5027],
              [9193, 5021],
              [9198, 5005],
              [9180, 4999],
              [9188, 5014],
              [9185, 5039],
              [9157, 5038],
              [9149, 5053],
              [9163, 5077],
              [9205, 5118],
              [9244, 5134],
              [9286, 5169],
              [9296, 5199],
              [9307, 5202],
              [9315, 5230],
              [9334, 5242],
              [9344, 5215],
              [9365, 5228],
              [9365, 5215],
              [9377, 5195],
              [9350, 5157],
              [9334, 5145],
              [9344, 5124],
              [9324, 5129],
              [9292, 5109],
              [9288, 5086],
              [9271, 5057]
            ]
          ],
          [
            [
              [9463, 5272],
              [9432, 5221],
              [9407, 5204],
              [9389, 5215],
              [9407, 5250],
              [9399, 5263],
              [9364, 5281],
              [9388, 5301],
              [9396, 5337],
              [9381, 5376],
              [9383, 5391],
              [9371, 5388],
              [9344, 5423],
              [9332, 5447],
              [9343, 5450],
              [9349, 5430],
              [9367, 5430],
              [9387, 5410],
              [9385, 5397],
              [9405, 5390],
              [9425, 5372],
              [9430, 5342],
              [9472, 5330],
              [9488, 5345],
              [9505, 5339],
              [9497, 5311],
              [9485, 5292],
              [9471, 5293],
              [9456, 5280],
              [9463, 5272]
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'CU',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.67,
        'hc-middle-y': 0.64,
        'hc-key': 'cu',
        'hc-a2': 'CU',
        name: 'Cuba',
        labelrank: '3',
        'country-abbrev': 'Cuba',
        subregion: 'Caribbean',
        'region-wb': 'Latin America & Caribbean',
        'iso-a3': 'CUB',
        'iso-a2': 'CU',
        'woe-id': '23424793',
        continent: 'North America'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [1948, 7089],
            [1967, 7108],
            [1959, 7116],
            [1938, 7116],
            [1925, 7126],
            [1920, 7114],
            [1900, 7127],
            [1904, 7141],
            [1867, 7157],
            [1827, 7161],
            [1825, 7176],
            [1799, 7177],
            [1787, 7165],
            [1806, 7143],
            [1797, 7138],
            [1780, 7161],
            [1765, 7160],
            [1747, 7148],
            [1751, 7166],
            [1785, 7186],
            [1821, 7192],
            [1879, 7188],
            [1903, 7167],
            [1918, 7171],
            [1929, 7172],
            [1983, 7130],
            [2011, 7125],
            [2014, 7116],
            [2036, 7112],
            [2050, 7096],
            [2010, 7090],
            [1992, 7094],
            [1948, 7089]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'VE',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.44,
        'hc-middle-y': 0.25,
        'hc-key': 've',
        'hc-a2': 'VE',
        name: 'Venezuela',
        labelrank: '3',
        'country-abbrev': 'Ven.',
        subregion: 'South America',
        'region-wb': 'Latin America & Caribbean',
        'iso-a3': 'VEN',
        'iso-a2': 'VE',
        'woe-id': '23424982',
        continent: 'South America'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [2136, 6849],
            [2119, 6842],
            [2129, 6815],
            [2113, 6789],
            [2131, 6766],
            [2145, 6786],
            [2129, 6818],
            [2171, 6837],
            [2175, 6859],
            [2186, 6837],
            [2209, 6837],
            [2236, 6808],
            [2285, 6813],
            [2296, 6802],
            [2329, 6797],
            [2355, 6813],
            [2390, 6816],
            [2412, 6813],
            [2388, 6808],
            [2402, 6785],
            [2404, 6795],
            [2447, 6776],
            [2444, 6762],
            [2470, 6751],
            [2476, 6743],
            [2455, 6729],
            [2452, 6711],
            [2461, 6709],
            [2435, 6692],
            [2430, 6673],
            [2448, 6652],
            [2453, 6645],
            [2424, 6625],
            [2389, 6618],
            [2388, 6606],
            [2369, 6616],
            [2333, 6616],
            [2346, 6605],
            [2351, 6572],
            [2371, 6571],
            [2348, 6546],
            [2319, 6533],
            [2306, 6519],
            [2289, 6521],
            [2268, 6536],
            [2258, 6570],
            [2239, 6585],
            [2255, 6600],
            [2238, 6633],
            [2239, 6655],
            [2249, 6682],
            [2192, 6680],
            [2172, 6705],
            [2114, 6708],
            [2102, 6720],
            [2105, 6745],
            [2087, 6773],
            [2075, 6769],
            [2087, 6788],
            [2089, 6807],
            [2117, 6843],
            [2136, 6849]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'MG',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.45,
        'hc-middle-y': 0.48,
        'hc-key': 'mg',
        'hc-a2': 'MG',
        name: 'Madagascar',
        labelrank: '3',
        'country-abbrev': 'Mad.',
        subregion: 'Eastern Africa',
        'region-wb': 'Sub-Saharan Africa',
        'iso-a3': 'MDG',
        'iso-a2': 'MG',
        'woe-id': '23424883',
        continent: 'Africa'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [5700, 5975],
            [5661, 5851],
            [5652, 5830],
            [5642, 5788],
            [5628, 5753],
            [5571, 5733],
            [5538, 5752],
            [5528, 5770],
            [5530, 5800],
            [5514, 5837],
            [5523, 5866],
            [5551, 5907],
            [5551, 5921],
            [5539, 5954],
            [5535, 5983],
            [5550, 6006],
            [5550, 6021],
            [5585, 6028],
            [5640, 6055],
            [5661, 6105],
            [5676, 6104],
            [5692, 6148],
            [5712, 6116],
            [5728, 6044],
            [5721, 6028],
            [5703, 6041],
            [5710, 6011],
            [5697, 5989],
            [5700, 5975]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'IS',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.65,
        'hc-middle-y': 0.5,
        'hc-key': 'is',
        'hc-a2': 'IS',
        name: 'Iceland',
        labelrank: '3',
        'country-abbrev': 'Iceland',
        subregion: 'Northern Europe',
        'region-wb': 'Europe & Central Asia',
        'iso-a3': 'ISL',
        'iso-a2': 'IS',
        'woe-id': '23424845',
        continent: 'Europe'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [3578, 8735],
            [3530, 8739],
            [3596, 8746],
            [3574, 8753],
            [3591, 8764],
            [3556, 8772],
            [3535, 8764],
            [3516, 8769],
            [3540, 8782],
            [3548, 8803],
            [3567, 8793],
            [3578, 8797],
            [3557, 8814],
            [3574, 8816],
            [3611, 8792],
            [3606, 8772],
            [3623, 8762],
            [3630, 8778],
            [3642, 8782],
            [3646, 8799],
            [3667, 8781],
            [3669, 8797],
            [3684, 8803],
            [3699, 8791],
            [3700, 8802],
            [3721, 8792],
            [3730, 8801],
            [3753, 8802],
            [3752, 8818],
            [3776, 8812],
            [3786, 8800],
            [3807, 8796],
            [3802, 8780],
            [3833, 8770],
            [3841, 8748],
            [3811, 8716],
            [3768, 8703],
            [3750, 8691],
            [3716, 8683],
            [3687, 8669],
            [3644, 8676],
            [3614, 8692],
            [3570, 8689],
            [3570, 8700],
            [3591, 8701],
            [3599, 8716],
            [3581, 8723],
            [3578, 8735]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'EG',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.5,
        'hc-middle-y': 0.66,
        'hc-key': 'eg',
        'hc-a2': 'EG',
        name: 'Egypt',
        labelrank: '2',
        'country-abbrev': 'Egypt',
        subregion: 'Northern Africa',
        'region-wb': 'Middle East & North Africa',
        'iso-a3': 'EGY',
        'iso-a2': 'EG',
        'woe-id': '23424802',
        continent: 'Africa'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [5268, 7390],
            [5250, 7334],
            [5219, 7361],
            [5217, 7375],
            [5198, 7405],
            [5193, 7393],
            [5202, 7373],
            [5230, 7336],
            [5243, 7299],
            [5287, 7216],
            [5292, 7184],
            [5327, 7155],
            [5161, 7155],
            [4976, 7155],
            [4976, 7380],
            [4968, 7412],
            [4977, 7432],
            [4973, 7451],
            [4981, 7460],
            [5046, 7450],
            [5096, 7433],
            [5135, 7455],
            [5170, 7453],
            [5186, 7440],
            [5216, 7446],
            [5232, 7442],
            [5248, 7449],
            [5267, 7398],
            [5268, 7390]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'LK',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.54,
        'hc-middle-y': 0.93,
        'hc-key': 'lk',
        'hc-a2': 'LK',
        name: 'Sri Lanka',
        labelrank: '3',
        'country-abbrev': 'Sri L.',
        subregion: 'Southern Asia',
        'region-wb': 'South Asia',
        'iso-a3': 'LKA',
        'iso-a2': 'LK',
        'woe-id': '23424778',
        continent: 'Asia'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [6605, 6778],
            [6597, 6784],
            [6621, 6775],
            [6652, 6723],
            [6651, 6694],
            [6616, 6674],
            [6601, 6680],
            [6595, 6700],
            [6593, 6737],
            [6605, 6778]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'BW',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.49,
        'hc-middle-y': 0.6,
        'hc-key': 'bw',
        'hc-a2': 'BW',
        name: 'Botswana',
        labelrank: '4',
        'country-abbrev': 'Bwa.',
        subregion: 'Southern Africa',
        'region-wb': 'Sub-Saharan Africa',
        'iso-a3': 'BWA',
        'iso-a2': 'BW',
        'woe-id': '23424755',
        continent: 'Africa'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [4829, 5760],
            [4829, 5845],
            [4858, 5846],
            [4858, 5957],
            [4926, 5967],
            [4935, 5953],
            [4954, 5967],
            [4984, 5973],
            [5010, 5921],
            [5056, 5891],
            [5055, 5873],
            [5066, 5858],
            [5096, 5850],
            [5105, 5839],
            [5071, 5824],
            [5058, 5807],
            [5036, 5794],
            [5031, 5775],
            [5002, 5760],
            [4994, 5733],
            [4972, 5726],
            [4919, 5743],
            [4910, 5721],
            [4878, 5693],
            [4850, 5693],
            [4854, 5716],
            [4840, 5751],
            [4829, 5760]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'KG',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.49,
        'hc-middle-y': 0.43,
        'hc-key': 'kg',
        'hc-a2': 'KG',
        name: 'Kyrgyzstan',
        labelrank: '4',
        'country-abbrev': 'Kgz.',
        subregion: 'Central Asia',
        'region-wb': 'Europe & Central Asia',
        'iso-a3': 'KGZ',
        'iso-a2': 'KG',
        'woe-id': '23424864',
        continent: 'Asia'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [6332, 7748],
            [6353, 7745],
            [6396, 7767],
            [6382, 7770],
            [6355, 7790],
            [6346, 7779],
            [6309, 7795],
            [6341, 7816],
            [6332, 7818],
            [6333, 7829],
            [6358, 7839],
            [6407, 7824],
            [6409, 7846],
            [6427, 7854],
            [6457, 7840],
            [6474, 7842],
            [6552, 7841],
            [6570, 7836],
            [6605, 7816],
            [6604, 7810],
            [6550, 7788],
            [6542, 7776],
            [6503, 7772],
            [6499, 7761],
            [6471, 7750],
            [6468, 7762],
            [6446, 7757],
            [6421, 7741],
            [6411, 7720],
            [6381, 7719],
            [6370, 7712],
            [6347, 7726],
            [6327, 7718],
            [6318, 7726],
            [6283, 7723],
            [6281, 7731],
            [6303, 7747],
            [6319, 7741],
            [6332, 7748]
          ],
          [
            [6322, 7734],
            [6318, 7735],
            [6321, 7731],
            [6325, 7733],
            [6322, 7734]
          ],
          [
            [6356, 7736],
            [6356, 7739],
            [6353, 7737],
            [6354, 7737],
            [6356, 7736]
          ],
          [
            [6338, 7741],
            [6332, 7743],
            [6334, 7735],
            [6339, 7736],
            [6338, 7741]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'NP',
      properties: {
        'hc-group': 'admin0',
        'hc-middle-x': 0.52,
        'hc-middle-y': 0.55,
        'hc-key': 'np',
        'hc-a2': 'NP',
        name: 'Nepal',
        labelrank: '3',
        'country-abbrev': 'Nepal',
        subregion: 'Southern Asia',
        'region-wb': 'South Asia',
        'iso-a3': 'NPL',
        'iso-a2': 'NP',
        'woe-id': '23424911',
        continent: 'Asia'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [6838, 7338],
            [6834, 7314],
            [6840, 7302],
            [6815, 7290],
            [6771, 7297],
            [6736, 7312],
            [6734, 7321],
            [6680, 7326],
            [6654, 7338],
            [6615, 7364],
            [6600, 7369],
            [6610, 7399],
            [6628, 7413],
            [6660, 7417],
            [6662, 7408],
            [6692, 7394],
            [6703, 7380],
            [6719, 7382],
            [6749, 7352],
            [6767, 7353],
            [6775, 7339],
            [6792, 7346],
            [6810, 7337],
            [6838, 7338]
          ]
        ]
      }
    }
  ]
};

export { filingsData, revenueMockData, abc, mapMockData };
