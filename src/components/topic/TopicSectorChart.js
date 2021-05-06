import React, { Fragment } from 'react';
import { Card } from '@material-ui/core';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
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

export default function TopicSectorChart() {
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

  const options = {
    chart: {
      type: 'pie',
      height: '300px',
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
            format: '{point.name} ({point.y})'
        }
      }
    },
    series: [
      {
        name: 'Documents Count',
        colorByPoint: true,
        data: sectorData
      }
    ],
    drilldown: {
      series: industryData
    },
    credits: {
      enabled: false
    }
  };

  return (
    <Fragment>
      <Card className="card-box mb-4">
        <div className="card-header">
          <div className="card-header--title">
            <span className={'font-weight-bold'}>Sector</span>
          </div>
        </div>
        <div className={clsx('mb-2', classes.contentSection)}>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      </Card>
    </Fragment>
  );
}
