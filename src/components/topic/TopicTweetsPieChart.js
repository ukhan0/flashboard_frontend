import React from 'react';
import { Paper } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { cloneDeep } from 'lodash';

const baseGraphOptions = {
  chart: {
    type: 'pie',
  },
  title: {
    text: null
  },
  tooltip: {
    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
    pointFormat: '<span>{point.name}</span>: <b>{point.y}</b>',
    enabled: true
  },
  plotOptions: {
    series: {
      dataLabels: {
        enabled: true,
        format: '{point.name}'
      },
      events: {
        click: function() {}
      }
    }
  },
  series: [
    {
      name: 'Tweets Count',
      colorByPoint: true,
      data: []
    }
  ],
  credits: {
    enabled: false
  }
};

const useStyles = makeStyles(_theme => ({
  clickable: {
    cursor: 'pointer'
  },
  contentSection: {
    height: 300
  },
  label: {
    marginLeft: '16px',
    marginRight: '16px',
    marginTop: '20px'
  }
}));

export default function TopicTweetsPieChart(props) {
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
  const mapData = calculateTweets.map(v => ({name: v.key.toUpperCase(), y: v.doc_count}));

  const newGraphOptions = cloneDeep(baseGraphOptions);
  newGraphOptions.series[0].data = mapData;

  return (
    <div className={classes.label}>
      <Paper elevation={6} className={clsx('app-page-title')}>
        <div style={{ height: '100%', width: '100%' }}>
          <HighchartsReact highcharts={Highcharts} options={newGraphOptions} />
        </div>
      </Paper>
    </div>
  );
}
