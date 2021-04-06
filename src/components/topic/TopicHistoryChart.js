import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { get } from 'lodash';
import { useSelector } from 'react-redux';

const TopicHistoryChart = () => {
  const options = {
    chart: {
      zoomType: 'xy'
    },
    title: {
      text: 'Documents Count Over Time'
    },
    xAxis: [
      {
        categories: [],
        crosshair: true
      }
    ],
    yAxis: [
      {
        title: {
          text: 'File Count',
          style: {
            color: Highcharts.getOptions().colors[0]
          }
        },
        labels: {
          format: '{value}',
          style: {
            color: Highcharts.getOptions().colors[0]
          }
        }
      }
    ],
    tooltip: {
      shared: true
    },
    legend: {
      enabled: false
    },
    series: [
      {
        name: 'File Count',
        type: 'spline',
        data: []
      }
    ]
  };
  const { searchResult } = useSelector(state => state.Topic);
  const history = get(searchResult, 'buckets.history', []);
  const xAxisValues = [];
  const yAxisValues = [];
  for (const historyItem of history) {
    xAxisValues.push(historyItem.key_as_string);
    yAxisValues.push(historyItem.doc_count);
  }
  options.xAxis[0].categories = xAxisValues;
  options.series[0].data = yAxisValues;
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};
export default TopicHistoryChart;
