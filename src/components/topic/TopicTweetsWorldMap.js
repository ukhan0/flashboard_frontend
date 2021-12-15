import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import { Button, Card } from '@material-ui/core';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Highcharts from 'highcharts';
import Map from 'highcharts/modules/map';
import { setTweetsCountryMapData } from '../../reducers/Topic';
import { useSelector, useDispatch } from 'react-redux';
import { cloneDeep } from 'lodash';
import { getMapDataByCountry } from './topicActions';
import TopicTweetsCountryMap from './TopicTweetsCountryMap';
const useStyles = makeStyles(theme => ({
  label: {
    marginLeft: '16px',
    marginRight: '16px',
    marginTop: '20px'
  }
}));

export default function TopicTweetsMap() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [states, setState] = React.useState(false);
  const { tweetsMapData, tweetsWorldMapData, tweetsCountryMapData } = useSelector(state => state.Topic);
  // const { tweetsCountryMapData } = useSelector(state => state.Topic);
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
      text: 'Tweets Count'
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
        mapData: tweetsWorldMapData,
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
        },
        point: {
          events: {
            // On click, look for a detailed map
            click: function() {
              dispatch(getMapDataByCountry(this['hc-key']));
              setState(true);
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
            {/* <span className={'font-weight-bold'}>Rehan</span> */}
          </div>
          {states ? (
            <Button
              onClick={() => {
                setState(!states);
                dispatch(setTweetsCountryMapData({}));
              }}>
              Reset
            </Button>
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
