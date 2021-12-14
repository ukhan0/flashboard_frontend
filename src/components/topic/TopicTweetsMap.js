import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import { Paper } from '@material-ui/core';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Highcharts from 'highcharts';
import Map from 'highcharts/modules/map';
import { mapMockData } from '../../reducers/filingsMockData';
import { useSelector } from 'react-redux';
import { cloneDeep } from 'lodash';
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
  const mapData = calculateTweets.map(v => [v.key.toLowerCase(), v.doc_count]);

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
        data: cloneDeep(mapData),
        name: 'Tweets',
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
