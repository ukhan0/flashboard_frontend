import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, Button, Divider } from '@material-ui/core';
import TopicSuggestionsDialog from './TopicSuggestionsDialog';
import TopicSearchHistory from './TopicSearchHistory';
import TopicSummaryChart from './TopicSummaryChart';
import TopicCompanyResultsTable from './TopicCompanyResultsTable';
import TopicSearchResults from './TopicSearchResults';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PerfectScrollbar from 'react-perfect-scrollbar';
import TopicHistoryChart from './TopicHistoryChart';
import TopicFilters from './TopicFilters';
import axios from 'axios';
import config from '../../config/config';
import { get } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { setSearchResults } from '../../reducers/Topic';
import { getSearchCombinations, getSelectedSuggestionAsArr } from './topicHelpers';

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
  const [error, setError] = useState(null);
  const { searchText, selectedDocumentType, startDate, endDate, selectedSuggestions } = useSelector(state => state.Topic);
  const [showFilters, setShowFilters] = useState(true);
  const [isSuggestionsDlgOpen, setIsSuggestionsDlgOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const showSearchError = () => {
    setIsLoading(false)
    setError('Sorry, we are unable to fetch results')
  }
  
  const handlePerfromSearch = async () => {
    setError(null)
    setIsLoading(true)
    const { suggestionsArr, suggestionsSingleArr } = getSelectedSuggestionAsArr(selectedSuggestions, searchText)
    const fullSearchText = suggestionsSingleArr.length ? getSearchCombinations(suggestionsArr) : searchText
    try {
      const response = await axios.post(`${config.apiUrl}/api/dictionary/search_results`, {
          searchTerm: fullSearchText,
          searchfrom: '',
          startDate: format(startDate, 'yyyy-MM-dd HH:mm:ss'),
          endDate: format(endDate, 'yyyy-MM-dd HH:mm:ss'),
          document_type: selectedDocumentType === 'all' ? '' : selectedDocumentType,
          orderBy: "desc",
          sortBy: "document_date",
          page: 0
      });
      const responsePayload = get(response, 'data', null);
      if(responsePayload) {
        dispatch(setSearchResults(responsePayload))
        setIsLoading(false)
      } else {
        showSearchError()
      }
    } catch (error) {
      console.log(error)
      showSearchError()
    }
  }

  return (
    <div className={classes.root}>
      { showFilters ? 
        <TopicFilters 
          error={error}
          isLoading={isLoading}
          perfromSearch={handlePerfromSearch}
          onShowSuggestions={() => setIsSuggestionsDlgOpen(true)}
          onSaveSearch={() => {}}
        /> : null }
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
              <TopicSummaryChart />
            </Grid>
            <Grid item xs={6} style={{ marginLeft: 10 }}>
              <TopicCompanyResultsTable />
            </Grid>
          </div>
          <Grid item xs={12}>
            <Card className="card-box mb-4" style={{ height: 400 }}>
              <PerfectScrollbar>
                <TopicHistoryChart />
              </PerfectScrollbar>
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
            searchText={searchText}
          />
          :
          null
      }
    </div>
  );
};

export default Topic;
