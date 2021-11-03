import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, Typography, Switch, ButtonGroup } from '@material-ui/core';
import TopicSearchTextField from './TopicSearchTextField';
import TopicDocumentTypeDropdown from './TopicDocumentTypeDropdown';
import TopicUniverseGroup from './TopicUniverseGroup';
import TopicSectionGroup from './TopicSectionGroup';
import TopicUniverseSubFilters from './TopicUniverseSubFilters';
import TopicRangePicker from './TopicRangePicker';
import { useSelector, useDispatch } from 'react-redux';
import { forEach, concat } from 'lodash';
import TopicSearchTextTags from './TopicSearchTextInputTags';
import {
  updateSaveSearch,
  handleSaveSearch,
  performTopicSearchAggregate,
  performTopicSearchHighlights
} from './topicActions';
import {
  setOpenTopicSearchDialog,
  resetResultsPage,
  cancelExistingHightlightsCalls,
  setIsTopicEmailAlertEnable,
  setTopicSearchText,
  setIsSimpleSearch
} from '../../reducers/Topic';
import TopicSeachLabelTextField from './TopicSearchLabelTextField';
import { searchVersionTypes } from '../../config/filterTypes';

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
  const dispatch = useDispatch();
  const {
    searchText,
    isSearchError,
    selectedSuggestions,
    showUpdateButton,
    selectedSearch,
    cancelTokenSourceHighlights,
    isTopicEmailAlertEnable,
    searchLabel,
    isSimpleSearch
  } = useSelector(state => state.Topic);
  const handleUpdateSaveSearch = searchId => {
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

    dispatch(updateSaveSearch(searchId));
    dispatch(setOpenTopicSearchDialog(false));
    dispatch(resetResultsPage());
    dispatch(performTopicSearchAggregate(true, true));
  };
  const handleClickSaveSearch = () => {
    dispatch(handleSaveSearch());
    dispatch(setOpenTopicSearchDialog(false));
  };
  let selectedSuggestionsArr = [];
  forEach(selectedSuggestions, values => {
    selectedSuggestionsArr = concat(selectedSuggestionsArr, values);
  });

  const handleChangeTopicAlert = event => {
    if (event.target.checked) {
      dispatch(setIsTopicEmailAlertEnable(true));
    } else {
      dispatch(setIsTopicEmailAlertEnable(false));
    }
  };

  const handleSearchFieldType = v => {
    dispatch(setTopicSearchText(''));

    dispatch(setIsSimpleSearch(v));
  };
  const isButtonActive = !(searchText.length > 2 && searchLabel.length > 2);

  return (
    <Grid
      spacing={2}
      container
      direction="row"
      justify="space-between"
      alignItems="flex-start"
      className={classes.topsection}>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={8}>
            <h6>Theme Name</h6>
            <div style={{ marginBottom: '15px' }}>
              <TopicSeachLabelTextField />
            </div>
          </Grid>

          <Grid item xs={4}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div>
                <h6 className={classes.dateRange}>Date Range</h6>
                <TopicRangePicker />
              </div>
            </div>
          </Grid>
        </Grid>
        <h6>Search Terms</h6>
        <div className={classes.searchContainer}>
          <div className={classes.searchFieldContainer}>
            <Grid container>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={9}>
                    <div style={{ marginRight: '20px' }}>
                      {isSimpleSearch ? <TopicSearchTextTags /> : <TopicSearchTextField />}
                    </div>
                  </Grid>
                  <Grid item xs={3}>
                    <ButtonGroup color="primary">
                      {searchVersionTypes.map((searchVersion, i) => (
                        <Button
                          size="small"
                          key={`sent_${i}`}
                          onClick={() => handleSearchFieldType(searchVersion.key)}
                          variant={isSimpleSearch === searchVersion.key ? 'contained' : 'outlined'}>
                          {searchVersion.label}
                        </Button>
                      ))}
                    </ButtonGroup>
                  </Grid>
                </Grid>
                {!isSimpleSearch ? (
                  <div className={classes.selectedSuggestionsList}>
                    {selectedSuggestionsArr.map((v, index) => (
                      <span key={`ssa${index}`} className="text-black-50">{`${v}${
                        index !== selectedSuggestionsArr.length - 1 ? ', ' : ''
                      }`}</span>
                    ))}
                  </div>
                ) : null}
              </Grid>
              <Grid item xs={4}>
                <div className={classes.suggestionsBtnSection}>
                  {isSearchAllowed(searchText) ? (
                    <Button color="primary" onClick={props.onShowSuggestions}>
                      Show Suggestions
                    </Button>
                  ) : null}
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </Grid>
      <Grid item xs={6}>
        <h6>Document Types</h6>
        <TopicDocumentTypeDropdown />
      </Grid>

      <Grid item xs={12}>
        <h6>Search Universe</h6>
        <TopicUniverseGroup />
      </Grid>
      <Grid item xs={6}>
        <TopicUniverseSubFilters />
      </Grid>
      <Grid item xs={12}>
        <h6>Section</h6>
        <TopicSectionGroup />
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={1} direction="row" justify="space-between" alignItems="flex-end">
          <Grid item>
            <h6>Enable Email Alert</h6>
            <Switch
              checked={isTopicEmailAlertEnable}
              onChange={handleChangeTopicAlert}
              color="primary"
              name="checkedB"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          </Grid>
          <Grid item>
            {showUpdateButton ? (
              <Button
                style={{ width: '100px' }}
                variant="contained"
                color="primary"
                onClick={() => {
                  handleUpdateSaveSearch(selectedSearch.searchId);
                }}>
                Save
              </Button>
            ) : (
              <Button
                style={{ width: '100px' }}
                variant="contained"
                color="primary"
                disabled={isButtonActive}
                onClick={() => {
                  props.onSearch();
                  handleClickSaveSearch();
                }}>
                Save
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {isSearchError ? (
          <div style={{ marginBottom: '5px' }}>
            <Typography color="error">Error Occured</Typography>
          </div>
        ) : null}
      </Grid>
    </Grid>
  );
};

export default TopicFilters;
