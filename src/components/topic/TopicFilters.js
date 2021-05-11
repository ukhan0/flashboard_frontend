import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, Typography } from '@material-ui/core';
import TopicSearchTextField from './TopicSearchTextField';
import TopicDocumentTypeDropdown from './TopicDocumentTypeDropdown';
import TopicButtonGroup from './TopicButtonGroup';
import TopicRangePicker from './TopicRangePicker';
import { useSelector, useDispatch } from 'react-redux';

import { setResultsPage } from '../../reducers/Topic';
import { performTopicSearch } from './topicActions';
import { forEach, concat } from 'lodash';

const useStyles = makeStyles(theme => ({
  topsection: {
    marginBottom: 15,
    marginTop: 5,
  },
  searchContainer: {
    display: 'flex'
  },
  searchFieldContainer: {
    flexGrow: 2,
  },
  suggestionsBtnSection: {
    minWidth: 64,
  },
  selectedSuggestionsList: {
    marginLeft: 5,
  }
}));

const isSearchAllowed = searchText => {
  return searchText && searchText.length > 2 
}

const TopicFilters = (props) => {
  const classes = useStyles();
  const { searchText, isSearchLoading, isSearchError, selectedSuggestions } = useSelector(state => state.Topic);
  const dispatch = useDispatch()

  const handleSearch = () => {
    dispatch(setResultsPage(0))
    dispatch(performTopicSearch(true, true))
  }

  let selectedSuggestionsArr = []
  forEach(selectedSuggestions, values => {
    selectedSuggestionsArr = concat(selectedSuggestionsArr, values)
  })

  return (
    <Grid container direction="row" justify="space-between" alignItems="flex-start" className={classes.topsection}>
      <Grid item xs={8}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <h6>Search</h6>
            <div className={classes.searchContainer}>
              <div className={classes.searchFieldContainer}>
                <TopicSearchTextField />
                <div className={classes.selectedSuggestionsList}>
                  {
                    selectedSuggestionsArr.map((v, index) => <span key={`ssa${index}`} className="text-black-50">{`${v} ${index !== selectedSuggestionsArr.length - 1 ? ',' : ''}`}</span>)
                  }
                </div>
              </div>
              <div className={classes.suggestionsBtnSection}>
                {
                    isSearchAllowed(searchText) ?
                      <Button color="primary" onClick={props.onShowSuggestions}>
                        Show Suggestions
                      </Button>
                    
                    :
                    null
                }
              </div>
            </div>
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={3}>
            <h6>Document Types:</h6>
            <TopicDocumentTypeDropdown />
          </Grid>
          <Grid item xs={3}>
            <h6 className="text-black-50">Search Universe:</h6>
            <TopicButtonGroup />
          </Grid>
          <Grid item xs={6}></Grid>
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
              <div>
                <h6>Search From (Optional)</h6>
                <TopicRangePicker />
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
              {
                isSearchAllowed(searchText) ?
                  <Button variant="contained" color="secondary" onClick={props.onSaveSearch}>
                    Save
                  </Button>
                  :
                  null
              }
              <div className="mr-2"></div>
              <Button variant="contained" color="primary" onClick={handleSearch}>
                Search
              </Button>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
              {
                isSearchError ? <div className="mr-3">
                  <Typography color="error">
                    Error Occured
                  </Typography></div> : null
              }
              {
                isSearchLoading ? <div className="mr-3"><Typography color="primary">{'Searching...'}</Typography></div> : null
              }
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
};

export default TopicFilters;
