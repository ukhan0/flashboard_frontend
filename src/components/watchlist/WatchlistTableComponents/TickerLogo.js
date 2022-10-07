import React from 'react';
import { Avatar, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  tickerLogo: {
    display: 'flex',
    height: 40,
    alignItems: 'center'
  },
  logo: {
    height: 20,
    width: 20,
    '& .MuiAvatar-img': {
      objectFit: 'contain'
    }
  },
  tickerText: {
    textAlign: 'left',
    marginLeft: 10
  }
}));

function TickerLogo(props) {
  const classes = useStyles();
  const tickerValue = props.value.includes('-G') ? '' : props.value.slice(0, 6);
  return (
    <Box className={classes.tickerLogo}>
      <Avatar
        alt="-"
        src={`https://sma-assets.s3.us-east-2.amazonaws.com/logos/${props.value}.png`}
        className={classes.logo}
      />
      <Box variant="outlined" className={classes.tickerText}>
        {tickerValue}
      </Box>
    </Box>
  );
}

function areEqual(prevProps, nextProps) {
  return true;
}

export default React.memo(TickerLogo, areEqual);
