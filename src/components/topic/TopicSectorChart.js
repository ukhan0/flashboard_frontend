import React, { Fragment } from 'react';
import { Card } from '@material-ui/core';
import Chart from 'react-apexcharts';

export default function TopicSectorChart() {
  const options = {
    labels: ['Technology', 'Healthcare', 'Financial', 'Transportat', 'Energy']
  };
  const series = [44, 55, 41, 17, 15];

  return (
    <Fragment>
      <Card className="card-box mb-4">
        <div className="card-header" style={{ padding: 16 }}>
          <div className="card-header--title font-weight-bold">Sector</div>
        </div>
        <div className="scroll-area-sm mb-2 d-flex justify-content-center">
          <Chart options={options} series={series} type="donut" width="330" />
        </div>
      </Card>
    </Fragment>
  );
}
