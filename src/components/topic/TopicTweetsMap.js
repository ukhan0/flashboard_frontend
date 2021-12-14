import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import { Paper } from '@material-ui/core';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Highcharts from 'highcharts';
import Map from 'highcharts/modules/map';
import { mapMockData } from '../../reducers/filingsMockData';
import { useSelector } from 'react-redux';
const useStyles = makeStyles(theme => ({
  label: {
    marginLeft: '16px',
    marginRight: '16px',
    marginTop: '20px'
  }
}));

export default function TopicTweetsMap() {
  const classes = useStyles();
  const { tweetsMapData } = useSelector(state => state.Topic);
  let calculateTweets = [];
  tweetsMapData.forEach(v => {
    let isCountry = calculateTweets.find(c => c.key === v.key);
    if (isCountry) {
      isCountry.doc_count += v.doc_count;
    } else {
      calculateTweets.push(v);
    }
  });

  const mapData = calculateTweets.map(v => {
    return [v.key, v.doc_count];
  });
  var data = [
    ['au', 5],
    ['bd', 1],
    ['br', 2],
    ['ca', 7],
    ['co', 1],
    ['cy', 1],
    ['de', 2],
    ['es', 1],
    ['fr', 6],
    ['gb', 23],
    ['ge', 1],
    ['gh', 1],
    ['hk', 1],
    ['id', 3],
    ['in', 11],
    ['it', 1],
    ['jp', 1],
    ['kr', 1],
    ['lb', 1],
    ['my', 1],
    ['ng', 1],
    ['nl', 2],
    ['no', 1],
    ['ph', 3],
    ['sg', 1],
    ['th', 1],
    ['tr', 1],
    ['ua', 1],
    ['us', 58],
    ['za', 2]
  ];

  const options = {
    title: {
      text: ''
    },
    subtitle: {
      text: 'Tweets'
    },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        verticalAlign: 'bottom'
      }
    },
    colorAxis: {
      min: 0
    },
    credits: {
      enabled: false
    },

    series: [
      {
        mapData: mapMockData,
        data: mapData.length > 0 ? mapData : data,
        name: 'Random data',
        states: {
          hover: {
            color: '#BADA55'
          }
        },
        dataLabels: {
          enabled: true,
          format: '{point.name}'
        }
      }
    ]
  };

  return (
    <div className={classes.label}>
      <Paper elevation={6} className={clsx('app-page-title')}>
        <div style={{ height: '100%', width: '100%' }}>
          <HighchartsReact options={options} constructorType={'mapChart'} highcharts={Map(Highcharts)} />
        </div>
      </Paper>
    </div>
  );
}
