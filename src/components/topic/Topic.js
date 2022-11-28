import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import TopicPieChart from './TopicPieChart';
import TopicCompanyResultsTable from './TopicCompanyResultsTable';
import TopicSearchResults from './TopicSearchResults';
import TopicHistoryChart from './TopicHistoryChart';
import { useSelector, useDispatch } from 'react-redux';
import topicStyles from './topicStyles';
import TopicSnackbar from './TopicSnackbar';
import TopicCurrentSearchDetail from './TopicCurrentSearchDetail';
import {
  setIsTopicDeleteErr,
  setSnackBarOBJ,
  setTopicHandleSearchCombineReducer,
  setSearchError
} from '../../reducers/Topic';
import { performTopicSearchAggregate, performTopicTweetsSearchAggregate, fetchTopicsList } from './topicActions';
import TopicTweetsWorldMap from './TopicTweetsWorldMap';
import TopicTweetsPieChart from './TopicTweetsPieChart';
import TopicCompose from './TopicCompose';
import TopicTweets from './TopicTweets';
import TopicTweetTable from './TopicTweetsTable';
import TopicTwitter from './TopicTwitter';
import TopicTwitterWorldMap from './TopicTwitterWorldMap';
import TopicTwitterPieChart from './TopicTwitterPieChart';
import { setItemInLocalStorage } from '../../utils/helpers';
const Topic = () => {
  const classes = topicStyles();
  const {
    isTopicDeleteError,
    cancelTokenSourceHighlights,
    snackBarOBJ,
    openTopicSearchDialog,
    showUpdateButton,
    searchIndex,
    twitterData
  } = useSelector(state => state.Topic);

  const dispatch = useDispatch();

  const handleSearch = historyBy => {
    dispatch(setTopicHandleSearchCombineReducer());
    setItemInLocalStorage('searchIndex', searchIndex, true);
    dispatch(performTopicSearchAggregate(true, true, historyBy));
    dispatch(performTopicTweetsSearchAggregate(true, true));
    // cancel existing calls if there are any
    if (cancelTokenSourceHighlights) {
      cancelTokenSourceHighlights.cancel();
    }
  };
  useEffect(() => {
    dispatch(fetchTopicsList());
    return () => {
      dispatch(setSearchError(false));
    };
  }, [dispatch]);
  const handleCloseSnackBar = () => {
    dispatch(setSnackBarOBJ({ isSnackBarActive: false, snackBarSeverity: '', snackBarMessage: '' }));
  };

  return (
    <div className={classes.root}>
      {!openTopicSearchDialog || (openTopicSearchDialog && showUpdateButton) ? <TopicCurrentSearchDetail /> : null}
      <TopicCompose handleSearch={handleSearch} />
      <Grid container spacing={1}>
        <Grid item xs={12}>
          {searchIndex['id'] === 4 || searchIndex['id'] === 5 ? null : (
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <TopicHistoryChart handleSearch={handleSearch} />
              </Grid>
              <Grid item xs={4}>
                <TopicCompanyResultsTable />
              </Grid>
              <Grid item xs={4}>
                <TopicPieChart onChange={handleSearch} />
              </Grid>
            </Grid>
          )}
        </Grid>
        <Grid item xs={12}>
          {searchIndex['id'] === 4 ? (
            <Grid container>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={4}>
                    <TopicTweetsWorldMap />
                  </Grid>
                  <Grid item xs={4}>
                    <TopicTweetTable />
                  </Grid>
                  <Grid item xs={4}>
                    <TopicTweetsPieChart />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <TopicTweets />
              </Grid>
            </Grid>
          ) : null}
        </Grid>
        <Grid item xs={12}>
          {searchIndex['id'] === 5 ? (
            <Grid container>
              {twitterData.length ? (
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={6}>
                      <TopicTwitterWorldMap />
                    </Grid>

                    <Grid item xs={6}>
                      <TopicTwitterPieChart />
                    </Grid>
                  </Grid>
                </Grid>
              ) : null}
              <Grid item xs={12}>
                <TopicTwitter />
              </Grid>
            </Grid>
          ) : null}
        </Grid>

        {searchIndex['id'] !== 4 && searchIndex['id'] !== 5 ? (
          <Grid item xs={12}>
            <TopicSearchResults />
          </Grid>
        ) : null}
      </Grid>
      <TopicSnackbar
        open={snackBarOBJ.isSnackBarActive}
        onClose={() => {
          handleCloseSnackBar();
        }}
        message={snackBarOBJ.snackBarMessage}
        severity={snackBarOBJ.snackBarSeverity}
      />
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={isTopicDeleteError}
        autoHideDuration={6000}
        onClose={() => dispatch(setIsTopicDeleteErr(false))}
        message="Sorry, we are unable to delete topic"
      />
    </div>
  );
};

export default Topic;
