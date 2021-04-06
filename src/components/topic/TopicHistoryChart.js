import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { get } from 'lodash';
import { useSelector } from 'react-redux';

const TopicHistoryChart = () => {
  const options = {
    chart: {
      zoomType: 'xy',
      height: 200,
    },
    title: {
      text: 'Documents Count Over Time'
    },
    xAxis: [
      {
        categories: [],
        crosshair: true,
        labels: {
          formatter: function() {
            return Highcharts.dateFormat('%e %b, %y', new Date(this.value));
          }
        }
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
        name: 'Documents Count',
        type: 'spline',
        data: []
      }
    ],
    credits: {
      enabled: false
    },
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
    <HighchartsReact highcharts={Highcharts} options={options} />
  );
};
export default TopicHistoryChart;
