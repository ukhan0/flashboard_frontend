import React, { Fragment, useState } from 'react';
import { Card } from '@material-ui/core';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useSelector } from 'react-redux';
import { get } from 'lodash';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(_theme => ({
  clickable: {
    cursor: 'pointer',
  },
}));

export default function TopicSectorChart() {
  const classes = useStyles()
  const { searchResult } = useSelector(state => state.Topic);
  const [selectedType, setSelectedType] = useState('sector')

  let rawData = []
  if(selectedType === 'sector') {
    rawData = get(searchResult, 'buckets.docSector', [])
  } else {
    rawData = get(searchResult, 'buckets.docIndustry', [])
  }
  const data = rawData.map(s => ({name: s.key, y: s.doc_count}))

  const options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: null
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false
        },
        showInLegend: true
      }
    },
    legend: {
      align: 'left',
      layout: 'vertical',
      verticalAlign: 'top',
      width: 100,
      itemStyle: {
        color: '#000000',
        fontWeight: 'bold',
        textOverflow: "ellipsis",
        width: 80
      }
    },
    series: [
      {
        name: 'documents count:',
        colorByPoint: true,
        data: data
      },
    ],
    credits: {
      enabled: false
    },
  };

  return (
    <Fragment>
      <Card className="card-box mb-4">
        <div className="card-header">
          <div className="card-header--title">
            <span onClick={() => setSelectedType('sector')} className={clsx(classes.clickable, selectedType === 'sector' ? 'font-weight-bold' : null)}>Sector</span>
            <span> / </span>
            <span onClick={() => setSelectedType('industry')} className={clsx(classes.clickable, selectedType === 'industry' ? 'font-weight-bold' : null)}>Industry</span>
          </div>
        </div>
        <div className="scroll-area-md mb-2 d-flex justify-content-center">
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      </Card>
    </Fragment>
  );
}
