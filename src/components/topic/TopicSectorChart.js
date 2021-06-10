import React from 'react';
import { Card } from '@material-ui/core';
import Highcharts from 'highcharts';
import TopicSectorSingleChart from './TopicSectorSingleChart'
import TopicSectorMultiChart from './TopicSectorMultiChart'
import { useSelector } from 'react-redux';
import { get, findIndex } from 'lodash';
import drilldown from 'highcharts/modules/drilldown';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

// initialize Drilldown for HighCharts
drilldown(Highcharts);

const useStyles = makeStyles(_theme => ({
  clickable: {
    cursor: 'pointer',
  },
  contentSection: {
    height: 300,
  },
}));

export default function TopicSectorChart(props) {
  const classes = useStyles()
  const { searchResult } = useSelector(state => state.Topic);

  const rawData = get(searchResult, 'buckets.groupBySectorIndustry', []);
  const sectorData = [];
  const industryData = [];
  // see the data format here. https://www.highcharts.com/demo/pie-drilldown
  rawData.forEach(rd => {
    const sectorName = get(rd, 'key.gs', null);
    const industryName = get(rd, 'key.gi', null);
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

  let chartComponent = null
  let title = 'Sector'
  if(sectorData.length === 1) {
    chartComponent = <TopicSectorSingleChart />
    title = 'Industry'
  } else if (sectorData.length > 1) {
    chartComponent = <TopicSectorMultiChart handleSectorClick={props.onSectorSelect} />
  }

  return (
    <>
      <Card className="card-box mb-4">
        <div className="card-header">
          <div className="card-header--title">
            <span className={'font-weight-bold'}>{title}</span>
          </div>
        </div>
        <div className={clsx('mb-2', classes.contentSection)}>
          { chartComponent }
        </div>
      </Card>
    </>
  );
}
