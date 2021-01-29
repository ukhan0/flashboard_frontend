import React from 'react';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import { Button, Tooltip } from '@material-ui/core';

export default function AddRemoveIcon(props) {
  return (
    <Tooltip arrow title={props.value ? 'Remove Ticker' : 'Add Ticker'}>
      <Button>{props.value ? <StarIcon /> : <StarBorderIcon />}</Button>
    </Tooltip>
  );
}
