import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useSelector } from 'react-redux';
import { get, findIndex } from 'lodash';

export default function TopicSectorSingleChart() {
  const { searchResult } = useSelector(state => state.Topic);

  const rawData = get(searchResult, 'buckets.groupBySectorIndustry', []);
  const industryData = [];
  rawData.forEach(rd => {
    const industryName = get(rd, 'key.gi', null);
    const docCount = get(rd, 'doc_count', 0);
    if (!industryName) {
      return;
    }
    const industryIndex = findIndex(industryData, id => id.name === industryName);
    if (industryIndex !== -1) {
      industryData[industryIndex].y += docCount;
    } else {
      industryData.push({
        name: industryName,
        y: docCount
      });
    }
  });

  const options = {
    chart: {
      type: 'pie',
      height: '300px'
    },
    title: {
      text: null
    },
    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat: '<span>{point.name}</span>: <b>{point.y}</b>',
      enabled: false
    },
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          format: '{point.name}'
        }
      }
    },
    series: [
      {
        name: 'Documents Count',
        colorByPoint: true,
        data: industryData
      }
    ],
    credits: {
      enabled: false
    }
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
