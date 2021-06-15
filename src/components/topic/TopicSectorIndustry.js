import React from 'react';
import { Grid } from '@material-ui/core';
import TopicSectorDropDown from './TopicSectorDropDown';

const TopicSectorIndustry = () => {
  return (
    <>
      <Grid container direction="row" justify="flex-start" alignItems="center" spacing={1}>
        <Grid item xs={6}>
          <TopicSectorDropDown />
        </Grid>
      </Grid>
    </>
  );
};
export default TopicSectorIndustry;
