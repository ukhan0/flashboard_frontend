import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import config from '../../config/config';

const useStyles = makeStyles(theme => ({
  tickerLogo: {
    display: 'flex',
    height: 40,
    alignItems: 'center'
  },
  logo: {
    height: 20,
    width: 20
  }
}));

export default function TickerLogo(props) {
  const classes = useStyles();

  return (
    <Box className={classes.tickerLogo}>
      <Avatar alt="-" src={`${config.companyLogoPath}${props.value}.png`} className={classes.logo} />
    </Box>
  );
}
