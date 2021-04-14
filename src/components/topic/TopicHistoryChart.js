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
      backgroundColor: "#ffffff",
      borderRadius: 0,
      marginTop: 0,
    },
    title: {
      text: 'Documents Count Over Time'
    },
    colors: ["#339900", "#0088cc"],
    credits: {
      enabled: false
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      area: {
          lineWidth: 2.5,
          fillOpacity: .1,
          marker: {
              lineColor: "#fff",
              lineWidth: 1,
              radius: 3.5,
              symbol: "circle"
          },
          shadow: !1
      },
      column: {
          lineWidth: 16,
          shadow: !1,
          borderWidth: 0,
          groupPadding: .05
      }
    },
    xAxis: [
      {
        type: "datetime",
        title: {
            text: null
        },
        tickmarkPlacement: "off",
        // dateTimeLabelFormats: {
        //     day: "%b %e"
        // },
        gridLineColor: "#eeeeee",
        gridLineWidth: 0,
        labels: {
            style: {
                color: "#999999"
            },
            formatter: function() {
              return Highcharts.dateFormat('%b %e', new Date(this.value));
            }
          
        }
      }
    ],
    yAxis: [
      {
        showFirstLabel: !1,
        showLastLabel: !1,
        tickPixelInterval: 50,
        endOnTick: !1,
        title: {
          text: 'File Count',
        },
        gridLineColor: "#eeeeee",
        gridLineWidth: .5,
        zIndex: 2,
        labels: {
          format: '{value}',
          align: "right",
          style: {
              color: "#999999"
          },
          x: -4
        }
      }
    ],
    tooltip: {
      shared: true
    },
    series: [
      {
        type: "area",
        name: 'Documents Count',
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
    <HighchartsReact highcharts={Highcharts} options={options} />
  );
};
export default TopicHistoryChart;
