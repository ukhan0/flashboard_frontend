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

function AddRemoveIcon(props) {
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

function areEqual(prevProps, nextProps) {
 return prevProps.value === nextProps.value;
}

export default React.memo(AddRemoveIcon, areEqual)
