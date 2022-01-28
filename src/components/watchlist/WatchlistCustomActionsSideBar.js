import React from 'react';
import WatchlistService from './WatchlistService';
import Action from './WatchlistActions/WatchlistActions';
import {
  Drawer,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Toolbar,
  Typography,
  makeStyles
} from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  drawerPaper: {
    width: 320,
    height: 'calc(100% - 150px)',
    top: 150
  },
  formGroup: {
    flexWrap: 'nowrap'
  }
}));

function WatchlistCustomActionsSideBar(props) {
  const classes = useStyles();
  const [dispalyedColumns, setDispalyedColumns] = React.useState([]);
  const [col, setCol] = React.useState(null);
  const handleColumns = (e, status) => {
    const coldId = e.target.value;
    setCol(`${coldId}${status}`);
    WatchlistService.mangeAgGridColunms(coldId, status);
  };

  React.useEffect(() => {
    const stateKey = 'watchlist::state';
    setTimeout(() => {
      const currentColumnsState = localStorage.getItem(stateKey);
      let columns = JSON.parse(currentColumnsState);
      let displayedColumnsState = columns.filter(v => !v.hide).map(v => v.colId);
      setDispalyedColumns(displayedColumnsState);
    }, [100]);
  }, [col]);

  return (
    <Drawer
      anchor={'right'}
      open={props.open}
      onClose={props.handleCloseAgGridSideBar}
      classes={{ paper: classes.drawerPaper }}>
      <Toolbar />
      <div style={{ marginLeft: '10px', height: 'calc(100% - 64px)', top: 64 }}>
        <Typography className={classes.title}>Actions</Typography>

        <Action />
      </div>
    </Drawer>
  );
}

export default WatchlistCustomActionsSideBar;
