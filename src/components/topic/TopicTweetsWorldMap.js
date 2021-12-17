import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import { Card } from '@material-ui/core';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Highcharts from 'highcharts';
import Map from 'highcharts/modules/map';
import { setTweetsCountryMapData } from '../../reducers/Topic';
import { useSelector, useDispatch } from 'react-redux';
import { cloneDeep } from 'lodash';
import { getMapDataByCountry } from './topicActions';
import TopicTweetsCountryMap from './TopicTweetsCountryMap';
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

export default function TopicTweetsMap() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [states, setState] = React.useState(false);
  const { tweetsMapData, tweetsCountryMapData } = useSelector(state => state.Topic);
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
        data: cloneDeep(mapData),
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
        },
        point: {
          events: {
            // On click, look for a detailed map
            click: function() {
              dispatch(getMapDataByCountry(this['hc-key']));
              setTimeout(() => {
                setState(true);
              }, [500]);
            }
          }
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
          {states ? (
            <span
              onClick={() => {
                setState(false);
                dispatch(setTweetsCountryMapData({}));
              }}
              className={clsx('font-weight-bold', classes.btnHover)}>
              Reset
            </span>
          ) : null}
        </div>
        <div className={clsx('mb-2', classes.contentSection)}>
          {states ? (
            <>
              <TopicTweetsCountryMap tweetsCountryMapData={tweetsCountryMapData} />
            </>
          ) : (
            <HighchartsReact options={options} constructorType={'mapChart'} highcharts={Map(Highcharts)} />
          )}
        </div>
      </Card>
    </div>
  );
}
