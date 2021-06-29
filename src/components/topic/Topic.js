import React from 'react';
import { Grid, Snackbar } from '@material-ui/core';
import TopicPieChart from './TopicPieChart';
import TopicCompanyResultsTable from './TopicCompanyResultsTable';
import TopicSearchResults from './TopicSearchResults';
import TopicHistoryChart from './TopicHistoryChart';
import { useSelector, useDispatch } from 'react-redux';
import topicStyles from './topicStyles';
import TopicDialog from './TopicDialog';
import TopicSnackbar from './TopicSnackbar';
import TopicCurrentDetailLabel from './TopicCurrentDetailLabel'
import {
  setIsSearchDeleteErr,
  setIsTopicDeleteErr,
  resetResultsPage,
  cancelExistingHightlightsCalls,
  setSnackBarActive
} from '../../reducers/Topic';
import { performTopicSearchAggregate, performTopicSearchHighlights } from './topicActions';

const Topic = () => {
  const classes = topicStyles();
  const {
    isSearchDeleteError,
    isTopicDeleteError,
    cancelTokenSourceHighlights,
    isSnackBarActive,
    snackBarMessage,
    snackBarSeverity
  } = useSelector(state => state.Topic);

  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(resetResultsPage());
    dispatch(performTopicSearchAggregate(true, true));
    // cancel existing calls if there are any
    if (cancelTokenSourceHighlights) {
      cancelTokenSourceHighlights.cancel();
    }
    dispatch(cancelExistingHightlightsCalls(true));
    // now perform actual search
    setTimeout(() => {
      dispatch(cancelExistingHightlightsCalls(false));
      dispatch(performTopicSearchHighlights(true));
    }, 1000);
  };

  const handleCloseSnackBar = () => {
    dispatch(setSnackBarActive(false));
  };

  return (
    <div className={classes.root}>
      <TopicCurrentDetailLabel/>
      <TopicDialog handleSearch={handleSearch} />
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <TopicHistoryChart />
            </Grid>
            <Grid item xs={4}>
              <TopicCompanyResultsTable />
            </Grid>
            <Grid item xs={4}>
              <TopicPieChart onChange={handleSearch} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TopicSearchResults />
        </Grid>
      </Grid>
      <TopicSnackbar
        open={isSnackBarActive}
        onClose={() => {
          handleCloseSnackBar();
        }}
        message={snackBarMessage}
        severity={snackBarSeverity}
      />
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={isSearchDeleteError}
        autoHideDuration={6000}
        onClose={() => dispatch(setIsSearchDeleteErr(false))}
        message="Sorry, we are unable to delete search"
      />
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isTopicDeleteError}
        autoHideDuration={6000}
        onClose={() => dispatch(setIsTopicDeleteErr(false))}
        message="Sorry, we are unable to delete topic"
      />
    </div>
  );
};

export default Topic;
