import React, { Fragment } from 'react';
import { Grid, Card, LinearProgress, Divider } from '@material-ui/core';
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
  const { fillingsGraphData, filingsRevenueData } = useSelector(state => state.Filings);
  let filingRevenue = Object.keys(filingsRevenueData);
  let mdas = [];
  let risks = [];
  let notes = [];
  let dates = [];
  let total = [];
  if (!isEmpty(fillingsGraphData)) {
    dates = fillingsGraphData.map(s => moment(s.document_date).format('DD MMMM, YYYY'));
    mdas = fillingsGraphData.map(s => get(s, 'mda.wwwccc', ''));
    risks = fillingsGraphData.map(s => get(s, 'risk_factors.wwwccc', ''));
    notes = fillingsGraphData.map(s => get(s, 'notes.wwwccc', ''));
    total = fillingsGraphData.map(s => {
      let totalWc = get(s, 'total.wwwccc', 0);
      let mdaWc = get(s, 'mda.wwwccc', 0);
      let noteWc = get(s, 'notes.wwwccc', 0);
      let riskWc = get(s, 'risk_factors.wwwccc.wwwccc', 0);
      let wc = mdaWc + noteWc + riskWc;
      // console.log(mdaWc, noteWc, riskWc, 'addition', mdaWc + noteWc + riskWc, 'total', totalWc, 'minus', totalWc - wc);
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
      //   name: 'otal',
      //   data: total.filter(e => e),
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
            {/* <Grid item xs={6}>
              <div>
                <h6 className="font-weight-bold font-size-lg mb-1 text-black">Word count changes</h6>
              </div>
            </Grid> */}
          </Grid>
        </div>
        <div className="mx-4 divider" />
        <div className="mx-4 divider" />
        <div className="p-4">
          <Grid container spacing={4}>
            {/* <Grid item xs={12} md={6}>
              <>
                <div className="p-5 mb-4 rounded bg-secondary" style={{ height: 400, overflow: 'scroll' }}>
                  {filingRevenue.map(v => {
                    return (
                      <div>
                        <div className="mb-4">
                          <div className="line-height-1">
                            <span className="font-size-lg font-weight-bold pr-3">
                              {filingsRevenueData[v].wordDifference}
                            </span>
                            <span className="text-muted">{v}</span>
                          </div>
                          <div className="d-flex justify-content-center align-items-center">
                            <div className="flex-grow-1">
                              <LinearProgress
                                value={filingsRevenueData[v].wordDifference}
                                color="primary"
                                variant="determinate"
                              />
                            </div>
                            <div className="text-dark font-weight-bold pl-3">{`${filingsRevenueData[v].percentage}%`}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            </Grid> */}
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
