import React from 'react';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import { Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  star: {
    fontSize: '1rem',
    cursor: 'pointer'
  }
}));

export default function AddRemoveIcon(props) {
  const [flagStarIcon, setFlagStarIcon] = React.useState(props.value);
  const classes = useStyles();
  const toggle = () => {
    if (flagStarIcon === true) {
      setFlagStarIcon(false);
    } else {
      setFlagStarIcon(true);
    }
  };

  return (
    <Tooltip arrow title={flagStarIcon ? 'Remove from Watchlist' : 'Add to Watchlist'}>
      {flagStarIcon === true ? (
        <StarIcon onClick={toggle} className={classes.star} />
      ) : (
        <StarBorderIcon onClick={toggle} className={classes.star} />
      )}
    </Tooltip>
  );
}
