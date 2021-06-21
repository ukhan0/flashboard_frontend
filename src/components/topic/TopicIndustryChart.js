import React, { useCallback, useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useSelector, useDispatch } from 'react-redux';
import { get, findIndex, cloneDeep } from 'lodash';
import { setSelectedIndustries } from '../../reducers/Topic';

const baseGraphOptions = {
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
      },
      events: {
        click: function() {}
      }
    }
  },
  series: [
    {
      name: 'Documents Count',
      colorByPoint: true,
      data: []
    }
  ],
  credits: {
    enabled: false
  }
};

export default function TopicIndustryChart(props) {
  const { searchResult, selectedIndustries } = useSelector(state => state.Topic);
  const [graphOptions, setGraphOptions] = useState(cloneDeep(baseGraphOptions));
  const dispatch = useDispatch();

  const handleIndustryClick = useCallback(
    industryName => {
      dispatch(setSelectedIndustries([...selectedIndustries, industryName]));
      props.handleIndustryClick();
    },
    [dispatch, props, selectedIndustries]
  );

  useEffect(() => {
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
    const newGraphOptions = cloneDeep(baseGraphOptions);
    newGraphOptions.series[0].data = industryData;
    newGraphOptions.plotOptions.series.events.click = event => {
      handleIndustryClick(event.point.name);
    };
    setGraphOptions(newGraphOptions);
  }, [searchResult, handleIndustryClick]);

  return <HighchartsReact highcharts={Highcharts} options={graphOptions} />;
}
