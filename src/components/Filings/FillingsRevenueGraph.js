import React, { Fragment } from 'react';
import { Grid, Card, LinearProgress, Divider } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Highcharts from 'highcharts';

Highcharts.setOptions({
  lang: {
    thousandsSep: ','
  }
});
const FilingsDetailsGraph = props => {
  const { filingsRevenueData } = useSelector(state => state.Filings);
  let filingRevenue = Object.keys(filingsRevenueData);

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
            <Grid item xs={12} md={6}>
              <div className="p-5 mb-4 rounded bg-secondary" style={{ height: 400, overflow: 'scroll' }}>
                {filingRevenue.map(v => {
                  return (
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
                  );
                })}
              </div>
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
