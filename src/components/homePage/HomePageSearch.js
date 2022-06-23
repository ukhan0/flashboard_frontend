import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, Typography } from '@material-ui/core';
import TopicSearchTextField from '../topic/TopicSearchTextField';
import TopicDocumentTypeDropdown from '../topic/TopicDocumentTypeDropdown';
import { useSelector, useDispatch } from 'react-redux';
import { forEach, concat } from 'lodash';
import { performTopicSearchAggregate, performTopicTweetsSearchAggregate } from '../topic/topicActions';
import {
  setOpenTopicSearchDialog,
  resetResultsPage,
  cancelExistingHightlightsCalls,
  setIsSimpleSearch,
  setIsUnsavedSearch,
  setSimpleSearchTextArray
} from '../../reducers/Topic';
import TopicIndexDropDown from '../topic/TopicIndexDropDown';
import { useHistory } from 'react-router-dom';
import TopicSuggestionsDialog from '../topic/TopicSuggestionsDialog';
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
    marginTop: '28px'
  }
}));

const isSearchAllowed = (searchText, simpleSearchTextArray) => {
  if ((searchText && searchText.length > 2) || simpleSearchTextArray.length > 0) {
    return true;
  }
};

const TopicFilters = props => {
  const classes = useStyles();
  const history = useHistory();

  const dispatch = useDispatch();
  const {
    searchText,
    isSearchError,
    selectedSuggestions,
    simpleSearchTextArray,
    ignoreSearchTextArray,
    cancelTokenSourceHighlights
  } = useSelector(state => state.Topic);

  let selectedSuggestionsArr = [];
  forEach(selectedSuggestions, values => {
    selectedSuggestionsArr = concat(selectedSuggestionsArr, values);
  });

  const handleSearch2 = () => {
    props.onClose();
    dispatch(setIsSimpleSearch(true));
    dispatch(setSimpleSearchTextArray([searchText]));
    dispatch(resetResultsPage());
    dispatch(performTopicSearchAggregate(true, true));
    dispatch(performTopicTweetsSearchAggregate(true, true));
    // cancel existing calls if there are any
    if (cancelTokenSourceHighlights) {
      cancelTokenSourceHighlights.cancel();
    }
    dispatch(cancelExistingHightlightsCalls(true));
    // now perform actual search
    setTimeout(() => {
      dispatch(cancelExistingHightlightsCalls(false));
    }, 1000);
    
    dispatch(setIsUnsavedSearch(true));
    
    history.push('./topic');
    dispatch(setOpenTopicSearchDialog(true));
  };
  const [isSuggestionsDlgOpen, setIsSuggestionsDlgOpen] = useState(false);

  const handleCloseTopicSuggestionsDialog = () => {
    setIsSuggestionsDlgOpen(false);
  };

  let isButtonActive = true;
  if (searchText.length > 2 || simpleSearchTextArray.length > 0 || ignoreSearchTextArray.length > 0) {
    isButtonActive = false;
  }
  return (
    <Grid spacing={0} container className={classes.topsection}>
      {isSuggestionsDlgOpen ? (
        <TopicSuggestionsDialog
          isOpen={isSuggestionsDlgOpen}
          onClose={() => null}
          handleClose={() => handleCloseTopicSuggestionsDialog()}
        />
      ) : null}

      <Grid item xs={12}>
        <div style={{ marginRight: '20px' }}>
          <h6>Search Query</h6>
          <TopicSearchTextField />

          <div className={classes.suggestionsBtnSection}>
            {
              <div className={classes.selectedSuggestionsList}>
                {selectedSuggestionsArr.map((v, index) => (
                  <span key={`ssa${index}`} className="text-black-50">{`${v}${
                    index !== selectedSuggestionsArr.length - 1 ? ', ' : ''
                  }`}</span>
                ))}
              </div>
            }
            {isSearchAllowed(searchText, simpleSearchTextArray) ? (
              <Button color="primary" onClick={() => setIsSuggestionsDlgOpen(true)}>
                Show Suggestions
              </Button>
            ) : null}
          </div>
          <h6 className={classes.dateRange}>Document Types</h6>
          <TopicDocumentTypeDropdown />
        </div>
      </Grid>
      <Grid item xs={12}>
        <h6 className={classes.dateRange}>Search From</h6>
        <TopicIndexDropDown />
      </Grid>
      <Grid item xs={12}>
        <div style={{ marginTop: '10px' }}>
          <Grid container direction="row" justifyContent="flex-start" alignItems="center">
            <Grid item>
              <Button
                disabled={isButtonActive}
                style={{ width: '100px' }}
                variant="contained"
                color="primary"
                onClick={() => handleSearch2()}>
                Search
              </Button>
            </Grid>
            <Grid item>&nbsp; </Grid>
            <Grid item>&nbsp; </Grid>
            <Grid item>
              <Button
                style={{ width: '100px' }}
                variant="contained"
                color="primary"
                onClick={() => {
                  props.onClose();
                }}>
                Close
              </Button>
            </Grid>
          </Grid>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Grid container direction="row" justifyContent="space-around" alignItems="center">
          <Grid item>
            {isSearchError ? (
              <div style={{ marginBottom: '5px' }}>
                <Typography color="error">Error Occured</Typography>
              </div>
            ) : null}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TopicFilters;
