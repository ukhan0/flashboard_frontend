import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { getSentimentData } from './sentimentActions';
import { useSelector, useDispatch } from 'react-redux';
const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  },
  drawerBtn: {
    textAlign: 'center',
    marginTop: '5px'
  }
});

const SentimentDrawer = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  const { sentimentData} = useSelector(state => state.Sentiment);

  const toggleDrawer = () => {
    setOpenDrawer(true);
  };

  const clickHandle = () => {
    toggleDrawer();
    dispatch(getSentimentData());
  };
  return (
    <React.Fragment>
      <Button className={classes.drawerBtn} variant="contained" color="primary" onClick={clickHandle}>
        Table of Content
      </Button>
      <SwipeableDrawer anchor={'right'} open={openDrawer} onClose={openDrawer} onOpen={toggleDrawer}>
        <div className={clsx(classes.list, {})}>
          <List>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setOpenDrawer(false);
              }}>
              Close
            </Button>
          </List>
          <Divider />
          <List></List>
        </div>
      </SwipeableDrawer>
    </React.Fragment>
  );
};
export default SentimentDrawer;
