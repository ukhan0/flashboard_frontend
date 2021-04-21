import React, { useState } from 'react';
import { Grid, Card, Button, Divider, Snackbar } from '@material-ui/core';
import TopicSuggestionsDialog from './TopicSuggestionsDialog';
import TopicSaveDialog from './TopicSaveDialog';
import TopicSearchHistory from './TopicSearchHistory';
import TopicSummaryChart from './TopicSummaryChart';
import TopicCompanyResultsTable from './TopicCompanyResultsTable';
import TopicSearchResults from './TopicSearchResults';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PerfectScrollbar from 'react-perfect-scrollbar';
import TopicHistoryChart from './TopicHistoryChart';
import TopicFilters from './TopicFilters';
import { useSelector, useDispatch } from 'react-redux';
import topicStyles from './topicStyles';
import { setIsSaveDlgOpen, setIsSearchDeleteErr, setIsTopicDeleteErr } from '../../reducers/Topic';

const Topic = () => {
  const classes = topicStyles();
  const { isSaveDlgOpen, isSearchDeleteError, isTopicDeleteError } = useSelector(state => state.Topic);
  const [showFilters, setShowFilters] = useState(false);
  const [isSuggestionsDlgOpen, setIsSuggestionsDlgOpen] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className={classes.root}>
      { showFilters ? 
        <TopicFilters 
          onShowSuggestions={() => setIsSuggestionsDlgOpen(true)}
          onSaveSearch={() => dispatch(setIsSaveDlgOpen(true))}
        /> : null }
      <Grid container spacing={4}>
        <Grid item xs={3}>
          <div className={classes.sideFilterSection}>
            <div className="p-3 bg-white">
              <Button
                onClick={() => {
                  setShowFilters(!showFilters);
                }}
                variant="contained"
                color="primary"
                className="d-block w-100">
                <span className="btn-wrapper--icon">
                  <FontAwesomeIcon icon={['fas', 'upload']} />
                </span>
                <span className="btn-wrapper--label">Compose new</span>
              </Button>
            </div>
            <Divider />
            <PerfectScrollbar>
              <TopicSearchHistory />
            </PerfectScrollbar>
          </div>
        </Grid>
        <Grid item xs={9}>
          <div style={{ display: 'flex', flexDirection: 'row', space: 'wrap' }}>
            <Grid item xs={6}>
              <TopicSummaryChart />
            </Grid>
            <Grid item xs={6} style={{ marginLeft: 10 }}>
              <TopicCompanyResultsTable />
            </Grid>
          </div>
          <Grid item xs={12}>
            <Card className="card-box mb-4">
              <TopicHistoryChart />
            </Card>
          </Grid>
          <Grid item xs={12}>
            <TopicSearchResults />
          </Grid>
        </Grid>
      </Grid>
      {
        isSuggestionsDlgOpen ?
          <TopicSuggestionsDialog 
            isOpen={isSuggestionsDlgOpen}
            onClose={() => null}
            handleClose={() => setIsSuggestionsDlgOpen(false)}
          />
          :
          null
      }
      {
        isSaveDlgOpen ?
          <TopicSaveDialog 
            isOpen={isSaveDlgOpen}
            onClose={() => null}
          />
          :
          null
      }
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
