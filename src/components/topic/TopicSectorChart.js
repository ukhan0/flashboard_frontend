import React, { useEffect, useState } from 'react';
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
  const [ sectorData, setSectorData] = useState([])

  useEffect(() => {
    const rawData = get(searchResult, 'buckets.groupBySectorIndustry', []);
    const sectorDataLocal = [];
    
    rawData.forEach(rd => {
      const sectorName = get(rd, 'key.gs', null);
      const docCount = get(rd, 'doc_count', 0);
      if (!sectorName) {
        return;
      }
      const sectorIndex = findIndex(sectorDataLocal, sd => sd.name === sectorName);
      if (sectorIndex !== -1) {
        sectorDataLocal[sectorIndex].docCount += docCount;
      } else {
        sectorDataLocal.push({
          name: sectorName,
          y: docCount,
          drilldown: sectorName
        });
      }
    });
    setSectorData(sectorDataLocal)
  }, [searchResult])

  return (
    <>
      <Card className="card-box mb-4">
        <div className="card-header">
          <div className="card-header--title">
            <span className={'font-weight-bold'}>{sectorData.length === 1 ? 'Industry' : 'Sector'}</span>
          </div>
        </div>
        <div className={clsx('mb-2', classes.contentSection)}>
          { sectorData.length === 1 ? 
            <TopicSectorSingleChart />
            :
            <TopicSectorMultiChart handleSectorClick={props.onSectorSelect} />
          }
        </div>
      </Card>
    </>
  );
}
