import React from 'react';
import Card from '@material-ui/core/Card';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { cloneDeep } from 'lodash';

const baseGraphOptions = {
  chart: {
    type: 'pie'
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

const useStyles = makeStyles(theme => ({
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

export default function TopicTwitterPieChart() {
  const classes = useStyles();
  const { twitterMapData } = useSelector(state => state.Topic);
  const mapData = twitterMapData.filter(v => (v[0] !== "" ? { name: v[0].toUpperCase(), y: v[1] } : null));

  const newGraphOptions = cloneDeep(baseGraphOptions);
  newGraphOptions.series[0].data = mapData;

  return (
    <div className={classes.label}>
      <Card className="card-box mb-4">
        <div className="card-header">
          <div className="card-header--title">
            <span className={'font-weight-bold'}>Tweets Count</span>
          </div>
        </div>
        <div className={clsx('mb-2')}>
          <div style={{ height: '100%', width: '100%' }}>
            <HighchartsReact highcharts={Highcharts} options={newGraphOptions} />
          </div>
        </div>
      </Card>
    </div>
  );
}
