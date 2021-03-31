import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, Button, Divider } from '@material-ui/core';
import TopicSuggestionsDialog from './TopicSuggestionsDialog';
import TopicSearchHistory from './TopicSearchHistory';
import TopicSectorChart from './TopicSectorChart';
import TopicCompantResultsTable from './TopicCompantResultsTable';
import TopicSearchResults from './TopicSearchResults';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PerfectScrollbar from 'react-perfect-scrollbar';
import TopicHighChart from './TopicHighChart';
import TopicFilters from './TopicFilters';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  herosection: {
    marginLeft: 80
  },
  searchuniverse: {
    marginLeft: 30
  },
  rightBar: {
    padding: theme.spacing(1),
    height: 235,
    border: '1px solid black',
    overflow: 'scroll',
    display: 'flex',
    flexDirection: 'row'
  },
  inflex: {
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'row'
  },
  searchdate: {
    marginTop: 10,
    float: 'right',
    padding: 20
  },
  savebutton: {
    marginTop: 20,
    marginLeft: 80,
    display: 'flex',
    justifyContent: 'flex-end'
  },
  topsection: {
    marginBottom: 15,
    marginTop: 5,
  }
}));

const Topic = () => {
  const classes = useStyles();
  const [showFilters, setShowFilters] = useState(false)
  const [isSuggestionsDlgOpen, setIsSuggestionsDlgOpen] = useState(false)

  return (
    <div className={classes.root}>
      { showFilters ? <TopicFilters /> : null }
      <Grid container spacing={4}>
        <Grid item xs={3}>
          <div style={{ height: 600, backgroundColor: '#f5f5f5' }}>
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
              <TopicSectorChart />
            </Grid>
            <Grid item xs={6} style={{ marginLeft: 10 }}>
              <TopicCompantResultsTable />
            </Grid>
          </div>
          <Grid item xs={12}>
            <Card className="card-box mb-4" style={{ height: 400 }}>
              <PerfectScrollbar>
                <TopicHighChart />
              </PerfectScrollbar>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <TopicSearchResults />
          </Grid>
        </Grid>
      </Grid>
      <TopicSuggestionsDialog 
        isOpen={isSuggestionsDlgOpen}
        onClose={() => null}
        handleClose={() => setIsSuggestionsDlgOpen(false)}
      />
    </div>
  );
};

export default Topic;
