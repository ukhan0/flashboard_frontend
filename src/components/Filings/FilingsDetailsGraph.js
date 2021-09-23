import React, { Fragment } from 'react';
import { Grid, Card, LinearProgress, Divider } from '@material-ui/core';
import Chart from 'react-apexcharts';

const SentimentCompanyDetails = props => {

  const chart5Options = {
    chart: {
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: true
      },
      stacked: true
    },
    dataLabels: {
      enabled: true
    },
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: 'rounded',
        columnWidth: '80%'
      }
    },
    colors: ['#7fe4a6', '#7fe2ec', '#7fc8fd', '#ff98a4'],
    fill: {
      opacity: 1
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    legend: {
      show: false
    },
    labels: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
      'Last week',
      'Last month'
    ]
  };

  const chart5Data = [
    {
      name: 'Net Profit',
      data: [2.3, 3.1, 4.0, 3.8, 5.1, 3.6, 4.0, 3.8, 5.1]
    },
    {
      name: 'Weekly Stats',
      data: [2.3, 3.1, 5.1, 3.6, 4.0, 4.0, 3.8, 3.6, 3.8]
    },
    {
      name: 'Sales reports',
      data: [2.3, 3.1, 5.1, 3.6, 4.0, 4.0, 3.8, 3.6, 3.8]
    },
    {
      name: 'Net Loss',
      data: [2.1, 2.1, 3.0, 2.8, 4.0, 3.8, 5.1, 3.6, 4.1]
    }
  ];

  return (
    <Fragment>
      <Card className="mb-4">
        <div className="card-header-alt d-flex justify-content-between p-4">
          <div>
            <h6 className="font-weight-bold font-size-lg mb-1 text-black">Revenue progress</h6>
            <p className="text-black-50 mb-0">Our company revenues, split by progress.</p>
          </div>
        </div>
        <div className="mx-4 divider" />
        <div className="mx-4 divider" />
        <div className="p-4">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <div className="p-5 mb-4 rounded bg-secondary">
                <div className="mb-4">
                  <div className="line-height-1">
                    <span className="font-size-lg font-weight-bold pr-3">54,126</span>
                    <span className="text-muted">dribbble.com</span>
                  </div>
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="flex-grow-1">
                      <LinearProgress value={50} color="primary" variant="determinate" />
                    </div>
                    <div className="text-dark font-weight-bold pl-3">50%</div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="line-height-1">
                    <span className="font-size-lg font-weight-bold pr-3">12,345</span>
                    <span className="text-muted">amazon.com</span>
                  </div>
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="flex-grow-1">
                      <LinearProgress value={76} color="primary" variant="determinate" />
                    </div>
                    <div className="text-dark font-weight-bold pl-3">76%</div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="line-height-1">
                    <span className="font-size-lg font-weight-bold pr-3">34,985</span>
                    <span className="text-muted">facebook.com</span>
                  </div>
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="flex-grow-1">
                      <LinearProgress value={87} color="primary" variant="determinate" />
                    </div>
                    <div className="text-dark font-weight-bold pl-3">87%</div>
                  </div>
                </div>
                <div>
                  <div className="line-height-1">
                    <span className="font-size-lg font-weight-bold pr-3">76,381</span>
                    <span className="text-muted">youtube.com</span>
                  </div>
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="flex-grow-1">
                      <LinearProgress value={59} color="primary" variant="determinate" />
                    </div>
                    <div className="text-dark font-weight-bold pl-3">59%</div>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <Chart options={chart5Options} series={chart5Data} type="bar" height={330} />
            </Grid>
          </Grid>
          <Divider />
          <Divider />
        </div>
      </Card>
    </Fragment>
  );
};
export default SentimentCompanyDetails;
