import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import Map from 'highcharts/modules/map';
import { isEmpty } from 'lodash';

export default function TopicTweetsMap(props) {
  //   const { tweetsCountryMapData } = useSelector(state => state.Topic);
  var data = [
    ['us-ca', 181],
    ['us-ny', 161],
    ['us-fl', 91],
    ['us-nj', 68],
    ['us-tx', 61],
    ['us-oh', 35],
    ['us-ma', 31],
    ['us-il', 30],
    ['us-co', 20],
    ['us-ct', 20],
    ['us-pa', 19],
    ['us-nv', 16],
    ['us-or', 15],
    ['us-va', 15],
    ['us-dc', 14],
    ['us-mn', 14],
    ['us-wa', 14],
    ['us-hi', 12],
    ['us-mi', 10],
    ['us-ga', 9],
    ['us-mt', 8],
    ['us-la', 8],
    ['us-tn', 7],
    ['us-sd', 6],
    ['us-me', 6],
    ['us-in', 6],
    ['us-wi', 6],
    ['us-ri', 5],
    ['us-wv', 4],
    ['us-mo', 4],
    ['us-nc', 3],
    ['us-ut', 3],
    ['us-ky', 3],
    ['us-md', 3],
    ['us-ar', 2],
    ['us-de', 2],
    ['us-ne', 2],
    ['us-wy', 2]
  ];

  const options = {
    title: {
      text: 'Highmaps basic demo'
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
        mapData: props.tweetsCountryMapData,
        data: data,
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
      },
      {
        name: 'Separators',
        type: 'mapline',
        // data: mapMockData,
        color: 'silver',
        showInLegend: false,
        enableMouseTracking: false
      }
    ]
  };

  return (
    <>
      {!isEmpty(props.tweetsCountryMapData) ? (
        <HighchartsReact options={options} constructorType={'mapChart'} highcharts={Map(Highcharts)} />
      ) : null}
    </>
  );
}
