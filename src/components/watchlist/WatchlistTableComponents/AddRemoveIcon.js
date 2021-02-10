import React from 'react';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import { Button, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  star: {
    fontSize: '1rem'
  }
}));

export default function AddRemoveIcon(props) {
  const [flagStarIcon, setFlagStarIcon] = React.useState(props.value);
  const classes = useStyles();

  return (
    <Tooltip arrow title={flagStarIcon ? 'Remove from Watchlist' : 'Add to Watchlist'}>
      <Button
        onClick={() => {
          if (flagStarIcon === true) {
            setFlagStarIcon(false);
          } else {
            setFlagStarIcon(true);
          }
        }}>
        {flagStarIcon === true ? <StarIcon className={classes.star} /> : <StarBorderIcon className={classes.star} />}
      </Button>
    </Tooltip>
  );
}
