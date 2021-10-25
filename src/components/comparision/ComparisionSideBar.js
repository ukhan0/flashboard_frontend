import React from 'react';

import { Box } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import SettingsTwoToneIcon from '@material-ui/icons/SettingsTwoTone';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import ComparisionFilters from './ComparisionFilters';

const useStyles = makeStyles(theme => ({
  drawer: {
    '& .MuiDrawer-paper': {
      width: '300px',
      paddingLeft: 10,
      paddingRight: 2,
      borderRadius: 4,
      marginTop: '60px'
    }
  }
}));

const ComparisionSideBar = props => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: true
  });
  const toggleDrawer = (side, open) => event => {
    setState({ ...state, [side]: open });
  };

  return (
    // <Hidden smDown>
    <Box className="theme-config-wrapper" component="div">
      <Fab size="large" color="primary" onClick={toggleDrawer('right', true)} className="configurator-btn">
        <SettingsTwoToneIcon />
      </Fab>
      <Drawer
        ModalProps={{
          BackdropProps: {
            classes: {
              root: 'drawer-backdrop'
            }
          }
        }}
        variant="temporary"
        anchor="right"
        open={state.right}
        className={classes.drawer}
        onClose={toggleDrawer('right', false)}>
        <ComparisionFilters
          handleComparisionMethod={props.handleComparisionMethod}
          handleComparisionDifference={props.handleComparisionDifference}
          comparisionDifference={props.comparisionDifference}
          comparisionMethod={props.comparisionMethod}
        />
      </Drawer>
    </Box>
    // </Hidden>
  );
};

export default ComparisionSideBar;
