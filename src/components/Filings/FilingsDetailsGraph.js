import React, { Fragment } from 'react';
import { Grid, Card, Divider } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { isEmpty, get } from 'lodash';
import moment from 'moment';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
Highcharts.setOptions({
  lang: {
    thousandsSep: ','
  }
});
const FilingsDetailsGraph = props => {
  const { fillingsGraphData } = useSelector(state => state.Filings);
  let mdas = [];
  let risks = [];
  let notes = [];
  let dates = [];
  let totals = [];
  if (!isEmpty(fillingsGraphData)) {
    dates = fillingsGraphData.map(s => moment(s.document_date).format('DD MMMM, YYYY'));
    mdas = fillingsGraphData.map(s => get(s, 'mda.wwwccc', ''));
    risks = fillingsGraphData.map(s => get(s, 'risk_factors.wwwccc', ''));
    notes = fillingsGraphData.map(s => get(s, 'notes.wwwccc', ''));
    totals = fillingsGraphData.map(s => {
      let totalWc = get(s, 'total.wwwccc', 0);
      let mdaWc = get(s, 'mda.wwwccc', 0);
      let noteWc = get(s, 'notes.wwwccc', 0);
      let riskWc = get(s, 'risk_factors.wwwccc.wwwccc', 0);
      let wc = mdaWc + noteWc + riskWc;
      return totalWc - wc;
    });
  }

  const options = {
    chart: {
      type: 'column'
      // height: 500,
    },
    title: {
      text: null
    },
    xAxis: {
      categories: dates
    },
    yAxis: {
      visible: false,
      labels: {
        enabled: false
      },
      title: {
        text: null
      }
    },
    legend: {
      align: 'right',
      x: -30,
      verticalAlign: 'top',
      y: 25,
      floating: true,
      backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || 'white',
      borderColor: '#CCC',
      borderWidth: 1,
      shadow: false
    },
    credits: {
      enabled: false
    },
    tooltip: {
      headerFormat: '<b>{point.x}</b><br/>',
      pointFormat: '{series.name} WORD COUNT: {point.y}<br/>'
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: true
        }
      }
    },

    series: [
      {
        name: 'RISK',
        data: risks.filter(e => e),
        color: '#ff98a4'
      },
      {
        name: 'NOTES',
        data: notes.filter(e => e),
        color: '#7fc8fd'
      },
      {
        name: 'MDA',
        data: mdas.filter(e => e),
        color: '#7fe4a6'
      }
      // {
      //   name: 'total',
      //   data: totals.filter(e => e),
      //   color: '#7fe4a6'
      // }
    ]
  };

  return (
    <Fragment>
      <Card className="mb-4">
        <div className="card-header-alt d-flex justify-content-between p-4">
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <div>
                <h6 className="font-weight-bold font-size-lg mb-1 text-black">Word Count</h6>
                <p className="text-black-50 mb-0">Changes in Major items over time</p>
              </div>
            </Grid>
          </Grid>
        </div>
        <div className="mx-4 divider" />
        <div className="mx-4 divider" />
        <div className="p-4">
          <Grid container spacing={4}>
            <Grid item xs={12} md={12}>
              {!isEmpty(fillingsGraphData) ? (
                <HighchartsReact highcharts={Highcharts} options={options} />
              ) : (
                'No Data Available'
              )}
            </Grid>
          </Grid>
          <Divider />
          <Divider />
        </div>
      </Card>
    </Fragment>
  );
};
export default FilingsDetailsGraph;
