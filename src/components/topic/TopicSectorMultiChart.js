import React, { useCallback, useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useSelector, useDispatch } from 'react-redux';
import { get, findIndex, trim, cloneDeep } from 'lodash';
import drilldown from 'highcharts/modules/drilldown';
import { setSelectedSector, setSelectedUniverse } from '../../reducers/Topic';

// initialize Drilldown for HighCharts
drilldown(Highcharts);

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
        click: function() {
        }
      },
    },
  },
  series: [
    {
      name: 'Documents Count',
      colorByPoint: true,
      data: []
    }
  ],
  drilldown: {
    series: []
  },
  credits: {
    enabled: false
  }
};

export default function TopicSectorMultiChart(props) {

  const { searchResult } = useSelector(state => state.Topic);
  const dispatch = useDispatch();
  const [graphOptions, setGraphOptions] = useState(cloneDeep(baseGraphOptions))

  const handleSectorClick = useCallback((sectorName) => {
    dispatch(setSelectedUniverse('sector'))
    dispatch(setSelectedSector(sectorName))
    console.log('asd')
    props.handleSectorClick()
  }, [dispatch, props])

  useEffect(() => {
    const rawData = get(searchResult, 'buckets.groupBySectorIndustry', []);
    const sectorData = [];
    const industryData = [];

    // see the data format here. https://www.highcharts.com/demo/pie-drilldown
    rawData.forEach(rd => {
      const sectorName = trim(get(rd, 'key.gs', null));
      const industryName = trim(get(rd, 'key.gi', null));
      const docCount = get(rd, 'doc_count', 0);
      if (!sectorName) {
        return;
      }
      const sectorIndex = findIndex(sectorData, sd => sd.name === sectorName);
      if (sectorIndex !== -1) {
        sectorData[sectorIndex].docCount += docCount;
        industryData[sectorIndex].data.push([industryName, docCount]);
      } else {
        sectorData.push({
          name: sectorName,
          y: docCount,
          drilldown: sectorName
        });
        industryData.push({
          name: sectorName,
          id: sectorName,
          data: industryName ? [[industryName, docCount]] : []
        });
      }
    });
    const newGraphOptions = cloneDeep(baseGraphOptions)
    newGraphOptions.series[0].data = sectorData
    newGraphOptions.drilldown.series = industryData
    newGraphOptions.plotOptions.series.events.click = (event) => {
      handleSectorClick(event.point.name)
    }
    setGraphOptions(newGraphOptions)
  }, [searchResult, handleSectorClick]);

  return <HighchartsReact highcharts={Highcharts} options={graphOptions} />;
}
