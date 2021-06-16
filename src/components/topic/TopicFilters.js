import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, Typography } from '@material-ui/core';
import TopicSearchTextField from './TopicSearchTextField';
import TopicDocumentTypeDropdown from './TopicDocumentTypeDropdown';
import TopicUniverseGroup from './TopicUniverseGroup';
import TopicSectionGroup from './TopicSectionGroup';
import TopicUniverseSubFilters from './TopicUniverseSubFilters';
import TopicRangePicker from './TopicRangePicker';
import { useSelector } from 'react-redux';

import { forEach, concat } from 'lodash';

const useStyles = makeStyles(theme => ({
  topsection: {
    marginBottom: 15,
    marginTop: 5
  },
  searchContainer: {
    display: 'flex'
  },
  searchFieldContainer: {
    flexGrow: 2
  },
  suggestionsBtnSection: {
    minWidth: 64
  },
  selectedSuggestionsList: {
    marginLeft: 5
  },
  dateRange: {
    textAlign: 'center'
  }
}));

const isSearchAllowed = searchText => {
  return searchText && searchText.length > 2;
};

const TopicFilters = props => {
  const classes = useStyles();
  const { searchText, isSearchError, selectedSuggestions, showUpdateButton } = useSelector(state => state.Topic);

  let selectedSuggestionsArr = [];
  forEach(selectedSuggestions, values => {
    selectedSuggestionsArr = concat(selectedSuggestionsArr, values);
  });

  return (
    <Grid container direction="row" justify="space-between" alignItems="flex-start" className={classes.topsection}>
      <Grid item xs={10}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <h6>Search</h6>
            <div className={classes.searchContainer}>
              <div className={classes.searchFieldContainer}>
                <TopicSearchTextField />
                <div className={classes.selectedSuggestionsList}>
                  {selectedSuggestionsArr.map((v, index) => (
                    <span key={`ssa${index}`} className="text-black-50">{`${v} ${
                      index !== selectedSuggestionsArr.length - 1 ? ',' : ''
                    }`}</span>
                  ))}
                </div>
              </div>
              <div className={classes.suggestionsBtnSection}>
                {isSearchAllowed(searchText) ? (
                  <Button color="primary" onClick={props.onShowSuggestions}>
                    Show Suggestions
                  </Button>
                ) : null}
              </div>
            </div>
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={3}>
            <h6>Document Types:</h6>
            <TopicDocumentTypeDropdown />
          </Grid>
          <Grid item>
            <h6>Search Universe:</h6>
            <TopicUniverseGroup />
          </Grid>
          <Grid item>
            <h6 className={'text-black-50'}>Section:</h6>
            <TopicSectionGroup />
          </Grid>
          <Grid item xs={3}></Grid>
          <Grid item xs={4}>
            <TopicUniverseSubFilters />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div>
                <h6 className={classes.dateRange}>Date Range</h6>
                <TopicRangePicker />
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              {isSearchAllowed(searchText) ? (
                 showUpdateButton ?
                 <Button variant="contained" color="secondary" onClick={props.onSaveSearch}>
                   Update
                 </Button>
                 :
                <Button variant="contained" color="secondary" onClick={props.onSaveSearch}>
                  Save
                </Button>
              ) : null}
              <div className="mr-2"></div>
              <Button variant="contained" color="primary" onClick={props.onSearch}>
                Search
              </Button>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              {isSearchError ? (
                <div className="mr-3">
                  <Typography color="error">Error Occured</Typography>
                </div>
              ) : null}
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TopicFilters;
