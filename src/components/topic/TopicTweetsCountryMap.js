import React, { memo } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import Map from 'highcharts/modules/map';
import { isEmpty } from 'lodash';
import { useSelector } from 'react-redux';
import { usaStates } from '../../config/worldMapData';
import { cloneDeep } from 'lodash';
const TopicTweetsCountryMap = ({ tweetsCountryMapData, selectedCountry }) => {
  const tweetsCountryStatesMapData = useSelector(state => state.Topic.tweetsCountryStatesMapData);
  const tweetsDataBySelectedCountry = tweetsCountryStatesMapData.filter(
    v => v.key.gc.toLowerCase() === selectedCountry
  );
  let data = [];
  tweetsDataBySelectedCountry.forEach(c => {
    let state = usaStates.find(v => v.name === c.key.gr);
    if (state) {
      data.push([`${c.key.gc.toLowerCase()}-${state.abbreviation.toLowerCase()}`, c.doc_count]);
    }
  });

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
        mapData: tweetsCountryMapData,
        data: cloneDeep(data),
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
    <>
      {!isEmpty(tweetsCountryMapData) ? (
        <HighchartsReact options={options} constructorType={'mapChart'} highcharts={Map(Highcharts)} />
      ) : null}
    </>
  );
};

export default memo(TopicTweetsCountryMap);
