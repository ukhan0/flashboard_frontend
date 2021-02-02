import React from 'react';
import { Avatar, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  tickerLogo: {
    display: 'flex',
    flexFlow: 'row',
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  logo: {
    height: 20,
    width: 20
  },
  tickerText: {
    textAlign: 'left',
    marginLeft: 10
  }
}));

export default function TickerLogo(props) {
  const classes = useStyles();

  return (
    <Box className={classes.tickerLogo}>
      <Avatar
        alt="Symbol"
        src={`https://activetraders.socialmarketanalytics.com/images/stock_icons/${props.value}.png`}
        className={classes.logo}
      />
      <Box variant="outlined" className={classes.tickerText}>
        {props.value}
      </Box>
    </Box>
  );
}
