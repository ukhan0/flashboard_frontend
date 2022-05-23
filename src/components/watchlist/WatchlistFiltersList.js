import React from 'react';
import {
  Drawer,
  Typography,
  makeStyles,
  IconButton,
  Grid,
  ListItem,
  ListItemText,
  List,
  ListItemSecondaryAction
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import WatchlistService from './WatchlistService';
import { setIsFilterUpdate, setSelectedFilter, setFilterLabel } from '../../reducers/Watchlist';
import { isEmpty } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

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
function WatchlistFiltersList(props) {
  const classes = useStyles();
  const { selectedFilter } = useSelector(state => state.Watchlist);
  const dispatch = useDispatch();
  const setFilters = (filter, isUpdate) => {
    if (!isEmpty(filter.search_json)) {
      WatchlistService.agGridAPI.setFilterModel(filter.search_json);
    }
    if (isUpdate) {
      dispatch(setSelectedFilter(filter));
      dispatch(setIsFilterUpdate(true));
      dispatch(setFilterLabel(filter.filter_label));
      props.handleCloseAgGridFilterDialog();
    }
  };

  return (
    <Drawer
      anchor={'right'}
      open={props.isSavedFilterDialog}
      onClose={() => props.handleCloseAgGridFilterDialog()}
      classes={{ paper: classes.drawerPaper }}>
      <Grid container direction="row" justify="space-between" alignItems="center">
        <Grid item></Grid>
        <Grid item>
          {' '}
          <Typography variant="h5">Screens</Typography>
        </Grid>
        <Grid item>
          {' '}
          <IconButton onClick={() => props.handleCloseAgGridFilterDialog()}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Grid>
      </Grid>

      <div style={{ marginLeft: '10px', height: 'calc(100% - 64px)', top: 64 }}>
        <List component="nav" className={classes.root}>
          {props.savedFiltersList.length > 0 ? (
            props.savedFiltersList.map((f, index) => {
              return (
                <ListItem
                  button
                  className={classes.nested}
                  key={index}
                  selected={selectedFilter && selectedFilter.id === f.id}
                  onClick={e => {
                    setFilters(f, true);
                  }}>
                  <ListItemText primary={<p className={classes.label}>{f.filter_label ? f.filter_label : 'no'}</p>} />
                  <ListItemSecondaryAction>
                    <IconButton
                      aria-label="comments"
                      size="small"
                      onClick={e => {
                        setFilters(f, true);
                      }}>
                      <EditIcon className={classes.editIcon} />
                    </IconButton>
                    <IconButton
                      aria-label="comments"
                      size="small"
                      onClick={() => {
                        props.deleteFilter(f.id);
                      }}>
                      <DeleteForeverIcon className={classes.deleteIcon} />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })
          ) : (
            <p>You don't have any saved filters yet</p>
          )}
        </List>
      </div>
    </Drawer>
  );
}

export default WatchlistFiltersList;
