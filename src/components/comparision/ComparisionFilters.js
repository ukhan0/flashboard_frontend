import React from 'react';

import { Grid, } from '@material-ui/core';

import { ButtonGroup, Button } from '@material-ui/core';

import { metricsSelection, comparisionMethodTypes, comparisionDifferenceTypes } from '../../config/filterTypes';

const ComparisionFilters = props => {
  return (
    <>
      <Grid container direction="row" justify="flex-start" alignItems="center" spacing={2}>
        <Grid item>
          <div className="text-black-50 opacity-6"> Differences</div>
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
          <div className="text-black-50 opacity-6"> Comparision Method</div>
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
        <Grid item>
          <div className="text-black-50 opacity-6">Section</div>
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
        </Grid>
        {/* <Grid item>
          <Grid container direction="row" alignItems="center">
            <Grid item>
              <Typography style={{ paddingTop: '20px' }} color="primary">
                Enable Email Alert
              </Typography>
            </Grid>
            <Grid item>
              <div style={{ paddingTop: '20px' }}>
                <Switch color="primary" disabled={true} />
              </div>
            </Grid>
          </Grid>
        </Grid> */}
      </Grid>
    </>
  );
};
export default ComparisionFilters;
