import React from 'react';
import { useSelector } from 'react-redux';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './FilingsResultsTableStyles.css';

import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import highchartsGantt from 'highcharts/highcharts-more';

import { Paper } from '@material-ui/core';
import clsx from 'clsx';

export default function FilingsCompanyRevenueGraph() {
  const { filingsRevenueData } = useSelector(state => state.Filings);
  let filingsRevenue1 = filingsRevenueData.map(v => {
    return { name: v.name, low: v.oldCount, high: 0 };
  });
  let filingsRevenue2 = filingsRevenueData.map(v => {
    return { name: v.name, low: 0, high: v.newCount };
  });

  const options = {
    chart: {
      type: 'columnrange',
      inverted: true,
      panning: true,
      panKey: 'shift'
    },

    legend: {
      enabled: false
    },

    title: {
      text: 'Old vs New Entities Mentioned'
    },

    tooltip: {
      enabled: false
    },

    xAxis: {
      type: 'category',
      min: 0,
      max: 10,
      scrollbar: {
        enabled: true
      },
      tickLength: 0
    },
    credits: {
      enabled: false
    },

    yAxis: {
      title: {
        text: 'Mentions'
      },
      labels: {
        formatter: function() {
          return Math.abs(this.value);
        }
      },
      gridLineColor: '#197F07',
      gridLineWidth: 0,
      lineWidth: 1,
      plotLines: [
        {
          color: '#888888',
          width: 1,
          value: 0,
          zIndex: 4
        }
      ]
    },

    plotOptions: {
      columnrange: {
        negativeColor: 'red',
        dataLabels: {
          enabled: true,
          grouping: true,
          formatter: function() {
            if (this.y === 0) return '';
            else return Math.abs(this.y);
          }
        }
      },
      series: {
        lineWidth: 1
        //className: 'main-color',
        //negativeColor: true
      }
    },
    series: [
      {
        name: 'Mentions',
        data: filingsRevenue1.concat(filingsRevenue2),
        dataLabels: {
          enabled: true
        }
      }
    ]
  };
  return (
    <Paper className={clsx('app-page-title')}>
      <div style={{ height: '100%', width: '100%' }}>
        <HighchartsReact highcharts={highchartsGantt(Highcharts)} options={options} />
      </div>
    </Paper>
  );
}
