import React, { memo } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Card from '@material-ui/core/Card';
import makeStyles from '@material-ui/core/styles/makeStyles';
import clsx from 'clsx';
import Highcharts from 'highcharts';
import Map from 'highcharts/modules/map';
import { useSelector } from 'react-redux';
import { cloneDeep } from 'lodash';
import { worldMapData } from '../../config/worldMapData';
const useStyles = makeStyles(theme => ({
  label: {
    marginLeft: '16px',
    marginRight: '16px',
    marginTop: '20px'
  },
  btnHover: {
    cursor: 'pointer'
  }
}));

const TopicTwitterWorldMap = () => {
  const classes = useStyles();
  const twitterMapData = useSelector(state => state.Topic.twitterMapData);

  const options = {
    title: {
      text: ''
    },
    subtitle: {
      text: ''
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
        animation: true,
        mapData: worldMapData,
        data: cloneDeep(twitterMapData),
        name: 'Tweets',
        allowPointSelect: true,
        states: {
          hover: {
            color: '#BADA55'
          },
          select: {
            color: 'black'
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
      <Card className="card-box mb-4">
        <div className="card-header">
          <div className="card-header--title">
            <span className={'font-weight-bold'}>Tweets Count</span>
          </div>
        </div>
        <div className={clsx('mb-2', classes.contentSection)}>
          <HighchartsReact options={options} constructorType={'mapChart'} highcharts={Map(Highcharts)} />
        </div>
      </Card>
    </div>
  );
};

export default memo(TopicTwitterWorldMap);
