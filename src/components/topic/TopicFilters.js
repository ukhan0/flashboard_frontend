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
import TopicIgnoreSearchText from './TopicIgnoreSearchTextInputTags';
import TopicSearchTextTags2 from './TopicSearchTextInputTags2';
import {
  updateSaveSearch,
  handleSaveSearch,
  performTopicSearchAggregate,
  performTopicSearchHighlights,
  perfomeSearchPayloadTweets
} from './topicActions';
import {
  setOpenTopicSearchDialog,
  resetResultsPage,
  cancelExistingHightlightsCalls,
  setIsTopicEmailAlertEnable,
  setIsSimpleSearch
} from '../../reducers/Topic';
import { searchVersionTypes } from '../../config/filterTypes';

import TopicThemeLabelDialog from './TopicThemeLabelDialog';
import { resetSuggestions } from '../../reducers/Topic';
import TopicIndexDropDown from './TopicIndexDropDown';
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

  const [isOpenThemelabelDialog, setOpenThemeDialog] = React.useState(false);
  const dispatch = useDispatch();
  const {
    searchText,
    isSearchError,
    selectedSuggestions,
    showUpdateButton,
    selectedSearch,
    cancelTokenSourceHighlights,
    isTopicEmailAlertEnable,
    simpleSearchTextArray,
    ignoreSearchTextArray,
    isSimpleSearch
  } = useSelector(state => state.Topic);
  const handleUpdateSaveSearch = () => {
    dispatch(resetResultsPage());
    dispatch(performTopicSearchAggregate(true, true));
    dispatch(perfomeSearchPayloadTweets(true, true, '/api/dictionary/search_tweets_data', false));
    dispatch(perfomeSearchPayloadTweets(true, true, '/api/dictionary/search_tweets_aggregate_data', true));
    
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

    dispatch(updateSaveSearch(selectedSearch.searchId));
    dispatch(setOpenTopicSearchDialog(false));
    dispatch(resetResultsPage());
    dispatch(performTopicSearchAggregate(true, true));
    setOpenThemeDialog(false);
  };
  const handleClickSaveSearch = () => {
    dispatch(handleSaveSearch());
    dispatch(setOpenTopicSearchDialog(false));
    // dispatch(setOpenTopicSearchDialog(false));
    setOpenThemeDialog(false);
  };
  const handleOpenThemeDialog = () => {
    setOpenThemeDialog(true);
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
    dispatch(setIsSimpleSearch(v));
    dispatch(resetSuggestions());
  };

  const handleClose = () => {
    setOpenThemeDialog(false);
  };
  let isButtonActive = true;
  if (searchText.length > 2 || simpleSearchTextArray.length > 0 || ignoreSearchTextArray.length > 0) {
    isButtonActive = false;
  }

  return (
    <Grid spacing={0} container className={classes.topsection}>
      <TopicThemeLabelDialog
        open={isOpenThemelabelDialog}
        handleClose={handleClose}
        handleClickSaveSearch={handleClickSaveSearch}
        handleUpdateSaveSearch={handleUpdateSaveSearch}
      />
      <Grid container>
        <Grid item sm={8} xs={8} lg={4} md={4}>
          <div style={{ marginRight: '20px' }}>
            {isSimpleSearch ? (
              <>
                {' '}
                <h6>Any of these phrases</h6>
                <TopicSearchTextTags />
                <br />
                <h6>All of these phrases</h6>
                <TopicSearchTextTags2 />
                <br />
                <h6>None of these phrase</h6>
                <TopicIgnoreSearchText />
              </>
            ) : (
              <>
                <h6>Search Query</h6>
                <TopicSearchTextField />
              </>
            )}
            <div className={classes.suggestionsBtnSection}>
              {!isSimpleSearch ? (
                <div className={classes.selectedSuggestionsList}>
                  {selectedSuggestionsArr.map((v, index) => (
                    <span key={`ssa${index}`} className="text-black-50">{`${v}${
                      index !== selectedSuggestionsArr.length - 1 ? ', ' : ''
                    }`}</span>
                  ))}
                </div>
              ) : null}
              {isSearchAllowed(searchText, simpleSearchTextArray) ? (
                <Button color="primary" onClick={props.onShowSuggestions}>
                  Show Suggestions
                </Button>
              ) : null}
            </div>
            <h6 className={classes.dateRange}>Document Types</h6>
            <TopicDocumentTypeDropdown />
          </div>
        </Grid>
        <Grid item sm={8} xs={8} lg={3} md={3}>
          <>
            <h6>Search</h6>
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
            {/* <div style={{ marginTop: '22px' }}> */}
            <h6 className={classes.dateRange}>Date Range</h6>
            <TopicRangePicker />
            <h6 className={classes.dateRange}>Search From</h6>
            <TopicIndexDropDown />
            {/* </div> */}
          </>
        </Grid>
        <Grid item sm={8} xs={8} lg={2} md={2}>
          <h6>Section</h6>
          <TopicSectionGroup />
          <div style={{ marginTop: '25px' }}>
            <h6>Search Universe</h6>
            <TopicUniverseGroup />
            <div style={{ marginTop: '25px' }}>
              <TopicUniverseSubFilters />
            </div>
          </div>
        </Grid>
        <Grid item sm={8} xs={8} md={3} lg={3}></Grid>
      </Grid>

      <Grid item xs={12} md={12} lg={12}>
        <Grid container direction="row" justifyContent="space-around" alignItems="center">
          <Grid item>
            <h6>Enable Email Alert</h6>
          </Grid>
          <Grid item>
            <Switch
              checked={isTopicEmailAlertEnable}
              onChange={handleChangeTopicAlert}
              color="primary"
              name="checkedB"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          </Grid>
          <Grid item>
            {isSearchError ? (
              <div style={{ marginBottom: '5px' }}>
                <Typography color="error">Error Occured</Typography>
              </div>
            ) : null}
          </Grid>{' '}
        </Grid>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <Grid container direction="row" justifyContent="flex-start" alignItems="center">
          <Grid item>
            <Button
              disabled={isButtonActive}
              style={{ width: '100px' }}
              variant="contained"
              color="primary"
              onClick={() => props.onSearch()}>
              Search
            </Button>
          </Grid>
          <Grid item>&nbsp; </Grid>
          <Grid item>
            {showUpdateButton ? (
              <Button
                style={{ width: '100px' }}
                variant="contained"
                color="primary"
                onClick={() => {
                  handleOpenThemeDialog();
                }}>
                Update
              </Button>
            ) : (
              <Button
                style={{ width: '100px' }}
                variant="contained"
                color="primary"
                disabled={isButtonActive}
                onClick={() => {
                  // props.onSearch();
                  handleOpenThemeDialog();
                }}>
                Save
              </Button>
            )}
          </Grid>
          <Grid item>&nbsp; </Grid>
          <Grid item>
            <Button
              style={{ width: '100px' }}
              variant="contained"
              color="primary"
              onClick={() => {
                props.handleCloseTopicDialog();
              }}>
              Close
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TopicFilters;
