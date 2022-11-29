import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useSelector } from 'react-redux';

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
  const { selectedType, selectedFileType } = useSelector(state => state.Watchlist);
  const classes = useStyles();
  const tickerValue = props.value.includes('-G') ? '' : props.value;

  const url =
    selectedType === 'global' && selectedFileType !== '10-K' || selectedFileType !== '10-Q'
      ? `https://sma-assets.s3.us-east-2.amazonaws.com/logos/${props.value}.TO.png`
      : `https://sma-assets.s3.us-east-2.amazonaws.com/logos/${props.value}.png`;
  return (
    <Box className={classes.tickerLogo}>
      <Avatar alt="-" src={url} className={classes.logo} />
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
