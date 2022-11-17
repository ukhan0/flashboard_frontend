import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import CloseIcon from '@material-ui/icons/Close';
import makeStyles from '@material-ui/core/styles/makeStyles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import WatchlistService from './WatchlistService';
import {
  setIsFilterActive,
  setIsFilterUpdate,
  setSelectedFilter,
  setFilterLabel,
  setWatchlistType,
  setWatchlistFileType,
  setWatchlistMetric,
  setWatchlistUniverse
} from '../../reducers/Watchlist';
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
  const {
    selectedFilter,
    isFilterActive,
    selectedType,
    selectedFileType,
    selectedMetric,
    selectedUniverse,
  } = useSelector(state => state.Watchlist);
  const dispatch = useDispatch();
  const setFilters = (filter, isUpdate) => {
    if (!isEmpty(filter.search_json)) {
      WatchlistService.agGridAPI.setFilterModel(filter.search_json);
    }
    if (isUpdate) {
      dispatch(setSelectedFilter(filter));
      dispatch(setIsFilterUpdate(true));
      dispatch(setFilterLabel(filter.filter_label));
      dispatch(setWatchlistType(
        filter.search_json.selectedType ?
          filter.search_json.selectedType
          :
          isFilterActive ?
            selectedType
            :
            'domestic'
      ));
      dispatch(setWatchlistFileType(
        filter.search_json.selectedFileType ?
          filter.search_json.selectedFileType
          :
          isFilterActive ?
            selectedFileType
            :
            '10-K'
      ));
      dispatch(setWatchlistMetric(
        filter.search_json.selectedMetric ?
          filter.search_json.selectedMetric
          :
          isFilterActive ?
            selectedMetric
            :
            'totdoc'
      ));
      dispatch(setWatchlistUniverse(
        filter.search_json.selectedUniverse ?
          filter.search_json.selectedUniverse
          :
          isFilterActive ?
            selectedUniverse
            :
            'all'
      ));
      setTimeout(() => {
        WatchlistService.agGridAPI.setFilterModel(filter.search_json);
        dispatch(setIsFilterActive(true));
      }, 100);
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
