import React from 'react';

import { Grid, Switch, Typography } from '@material-ui/core';

import { Box, ButtonGroup, Button } from '@material-ui/core';

import { metricsSelection, comparisionMethodTypes, comparisionDifferenceTypes } from '../../config/filterTypes';

import PerfectScrollbar from 'react-perfect-scrollbar';

const ComparisionFilters = props => {
  return (
    <Box p={0} className="theme-config-content">
      <PerfectScrollbar>
        <Typography variant="h5" color="primary" style={{ marginTop: '15px' }}>
          Comparison Preference
        </Typography>

        <Grid container direction="column" justify="flex-start" alignItems="flex-start">
          <Grid item>
            <div className="text-black-50 opacity-6" style={{ paddingTop: '10px' }}>
              Section
            </div>
          </Grid>
          <Grid item>
            <ButtonGroup color="primary">
              {metricsSelection.map((metric, i) => (
                <Button
                  size="small"
                  key={`met_${i}`}
                  onClick={() => props.handleComparisionSection(metric.key)}
                  variant={props.comparisionSection === metric.key ? 'contained' : 'outlined'}>
                  {metric.label}
                </Button>
              ))}
            </ButtonGroup>
            <Grid item>
              {' '}
              <div className="text-black-50 opacity-6" style={{ paddingTop: '10px' }}>
                Differences
              </div>
            </Grid>
            <Grid item>
              <ButtonGroup color="primary">
                {comparisionDifferenceTypes.map((diff, i) => (
                  <Button
                    size="small"
                    key={`diff_${i}`}
                    onClick={() => props.handleComparisionDifference(diff.key)}
                    variant={props.comparisionDifference === diff.key ? 'contained' : 'outlined'}>
                    {diff.label}
                  </Button>
                ))}
              </ButtonGroup>{' '}
            </Grid>
            <Grid item>
              <div className="text-black-50 opacity-6" style={{ paddingTop: '10px' }}>
                Comparision Method
              </div>
            </Grid>
            <Grid item>
              {' '}
              <ButtonGroup color="primary">
                {comparisionMethodTypes.map((method, i) => (
                  <Button
                    size="small"
                    key={`meth_${i}`}
                    onClick={() => props.handleComparisionMethod(method.key)}
                    variant={props.comparisionMethod === method.key ? 'contained' : 'outlined'}>
                    {method.label}
                  </Button>
                ))}
              </ButtonGroup>
            </Grid>
          </Grid>
        </Grid>
        <Grid container direction="row" justify="flex-start" alignItems="center">
          <Grid item>
            <Typography color="primary">Enable Email Alert</Typography>
          </Grid>
          <Grid item>
            <Switch color="primary" disabled={true} />
          </Grid>
        </Grid>
      </PerfectScrollbar>
    </Box>
  );
};
export default ComparisionFilters;
