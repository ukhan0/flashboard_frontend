import React, { useState } from 'react';
import { Card, Grid } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  details: {
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flex: '1 0 auto'
  },
  
}));
let cardArray = [
  { heading: 'RISK & FACTORS', content: 'Neutral', num: 23 },
  { heading: 'MANAGEMENT & DESCUSSION', content: 'Extermely High', num: 132 },
  { heading: 'NOTES TO  FINANCIAL STATEMENT', content: 'High', num: 93 }
];
const SentimentCard = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div>
      <Grid container spacing={2}>
        {cardArray.map((data, index) => (
          <Grid item xs={4} key={index}>
            <Card className={classes.root}>
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Typography component="h5" variant="h5">
                    {data.heading}
                  </Typography>
                  <Typography variant="subtitle1" color="h5">
                    {(data.content, `(${data.num})`)}
                  </Typography>
                </CardContent>
              </div>
              <h1>Charts</h1>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default SentimentCard;
