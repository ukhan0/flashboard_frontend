import React, { useState } from 'react';
import { Grid, Snackbar, Button } from '@material-ui/core';
import TopicSaveDialog from './TopicSaveDialog';
import TopicPieChart from './TopicPieChart';
import TopicCompanyResultsTable from './TopicCompanyResultsTable';
import TopicSearchResults from './TopicSearchResults';
import TopicHistoryChart from './TopicHistoryChart';
import { useSelector, useDispatch } from 'react-redux';
import topicStyles from './topicStyles';
import TopicDrawer from './TopicDrawer';
import {
  setIsSearchDeleteErr,
  setIsTopicDeleteErr,
  resetResultsPage,
  cancelExistingHightlightsCalls,
} from '../../reducers/Topic';
import { performTopicSearchAggregate, performTopicSearchHighlights } from './topicActions';

const Topic = () => {
  const classes = topicStyles();
  const {
    isSaveDlgOpen,
    isSearchDeleteError,
    isTopicDeleteError,
    cancelTokenSourceHighlights,
  } = useSelector(state => state.Topic);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

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

  return (
    <div className={classes.root}>
      <div className={classes.topicDrawerOpener}>
        <Button color="primary" variant="contained" className="m-2" onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
          My Searches
        </Button>
      </div>
      <TopicDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} handleSearch={handleSearch} />
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
      {isSaveDlgOpen ? <TopicSaveDialog isOpen={isSaveDlgOpen} onClose={() => null} /> : null}
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
