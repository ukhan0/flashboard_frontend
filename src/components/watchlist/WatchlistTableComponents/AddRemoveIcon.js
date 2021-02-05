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
  const classes = useStyles();

  return (
    <Tooltip arrow title={props.value ? 'Remove from Watchlist' : 'Add to Watchlist'}>
      <Button>
        {props.value ? <StarIcon className={classes.star} /> : <StarBorderIcon className={classes.star} />}
      </Button>
    </Tooltip>
  );
}
