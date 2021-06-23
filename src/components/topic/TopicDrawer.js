import React, { useState } from 'react';
import { Grid, Button, Divider, Drawer, IconButton } from '@material-ui/core';
import TopicSuggestionsDialog from './TopicSuggestionsDialog';
import TopicSearchHistory from './TopicSearchHistory';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PerfectScrollbar from 'react-perfect-scrollbar';
import TopicFilters from './TopicFilters';
import { useSelector, useDispatch } from 'react-redux';
import topicStyles from './topicStyles';
import CloseIcon from '@material-ui/icons/Close';
import TopicSnackbar from './TopicSnackbar';

import {
  setIsSaveDlgOpen,
  setShowComposeNew,
  setShowUpdateButton,
  setSelectedSearch,
  resetAllSearchParams,
  setSelectedIndustries,
  setSnackBarActive
} from '../../reducers/Topic';

const TopicDrawer = props => {
  const classes = topicStyles();
  const [isSuggestionsDlgOpen, setIsSuggestionsDlgOpen] = useState(false);
  const { showFilters, isSnackBarActive, snackBarMessage, snackBarSeverity } = useSelector(state => state.Topic);
  const dispatch = useDispatch();

  const handleCloseSnackBar = () => {
    dispatch(setSnackBarActive(false));
  };
  
  const handleComposeNew = () => {
    window.scrollTo(0, 0);
    dispatch(setShowComposeNew(true));
    dispatch(setShowUpdateButton(false));
    dispatch(setSelectedSearch(null, null));
    dispatch(resetAllSearchParams());
    dispatch(setSelectedIndustries([]));
  };

  return (
    <Drawer anchor={'right'} open={props.isOpen} onClose={props.onClose}>
      <TopicSnackbar
       open = {isSnackBarActive}
       onClose = {()=>{handleCloseSnackBar()}}
       message = {snackBarMessage}
       severity = {snackBarSeverity}
      />
      <div className={classes.topicDrawerContent}>
        <div className={classes.topicDrawerHeader}>
          <IconButton onClick={props.onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>
        {showFilters ? (
          <TopicFilters
            onShowSuggestions={() => setIsSuggestionsDlgOpen(true)}
            onSaveSearch={() => dispatch(setIsSaveDlgOpen(true))}
            onSearch={props.handleSearch}
          />
        ) : null}
        <div className={classes.sideFilterSection}>
          <div className="p-3 bg-white">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button onClick={handleComposeNew} variant="contained" color="primary" className="d-block w-100">
                  <span className="btn-wrapper--icon">
                    <FontAwesomeIcon icon={['fas', 'upload']} />
                  </span>
                  <span className="btn-wrapper--label">Compose new</span>
                </Button>
              </Grid>
              <Grid item xs={2}>
                <div className={classes.closeBtnSection}>
                  {showFilters ? (
                    <Button
                      className={classes.closeButton}
                      color="primary"
                      onClick={() => {
                        dispatch(setShowComposeNew(false));
                      }}>
                      Close
                    </Button>
                  ) : null}
                </div>
              </Grid>
            </Grid>
          </div>
          <Divider />
          <PerfectScrollbar>
            <TopicSearchHistory />
          </PerfectScrollbar>
        </div>
      </div>
      {isSuggestionsDlgOpen ? (
        <TopicSuggestionsDialog
          isOpen={isSuggestionsDlgOpen}
          onClose={() => null}
          handleClose={() => setIsSuggestionsDlgOpen(false)}
        />
      ) : null}
    </Drawer>
  );
};

export default TopicDrawer;
