import React, { useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import ButtonGroup from '@material-ui/core/ButtonGroup';
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
  performTopicTweetsSearchAggregate
} from './topicActions';
import {
  setOpenTopicSearchDialog,
  resetResultsPage,
  setIsTopicEmailAlertEnable,
  setIsSimpleSearch,
  setIsUnsavedSearch,
  setIsDays,
  setSearchSuggestionType,
  setTwitterGeoLocationEnable
} from '../../reducers/Topic';
import { searchVersionTypes } from '../../config/filterTypes';

import TopicThemeLabelDialog from './TopicThemeLabelDialog';
import { resetSuggestions } from '../../reducers/Topic';
import TopicCountryDropDown from './TopicCountryDropDown';
import TopicIndexDropDown from './TopicIndexDropDown';
import { searchSuggestionTypeConfig } from '../../config/appConfig';
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
  },
  country: {
    marginTop: '28px'
  },
  dateRangeContainer: {
    [theme.breakpoints.down('xs')]: {
      marginTop: 21
    }
  }
}));

const isSearchAllowed = (searchText, simpleSearchTextArray) => {
  if ((searchText && searchText.length > 2) || simpleSearchTextArray.length > 0) {
    return true;
  }
};

const TopicFilters = props => {
  const classes = useStyles();

  const [isOpenThemelabelDialog, setOpenThemeDialog] = useState(false);
  const dispatch = useDispatch();
  const {
    searchText,
    selectedSuggestions,
    selectedSearch,
    cancelTokenSourceHighlights,
    isTopicEmailAlertEnable,
    simpleSearchTextArray,
    ignoreSearchTextArray,
    isSimpleSearch,
    searchTextWithAnd,
    searchIndex,
    twitterGeoLocationEnable
  } = useSelector(state => state.Topic);

  const handleUpdateSaveSearch = () => {
    dispatch(resetResultsPage());
    dispatch(performTopicSearchAggregate(true, true));
    dispatch(performTopicTweetsSearchAggregate(true, true));
    dispatch(setIsUnsavedSearch(false));
    // cancel existing calls if there are any
    if (cancelTokenSourceHighlights) {
      cancelTokenSourceHighlights.cancel();
    }
    setTimeout(() => {
      if (searchIndex['id'] !== 4 && searchIndex['id'] !== 5) {
        dispatch(performTopicSearchHighlights(true));
      }
    }, 1000);

    dispatch(updateSaveSearch(selectedSearch.searchId));
    dispatch(setOpenTopicSearchDialog(false));
    dispatch(resetResultsPage());
    dispatch(performTopicSearchAggregate(true, true));
    setOpenThemeDialog(false);
  };
  const handleClickSaveSearch = () => {
    dispatch(handleSaveSearch());
    props.onSearch();
    dispatch(setOpenTopicSearchDialog(false));
    // dispatch(setOpenTopicSearchDialog(false));
    setOpenThemeDialog(false);
  };
  const handleOpenThemeDialog = () => {
    dispatch(setIsDays(false));
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
  const handleSearch = () => {
    dispatch(setIsDays(false));
    props.onSearch();
    dispatch(setIsUnsavedSearch(true));
  };
  let isButtonActive = true;
  if (
    searchText.length > 2 ||
    simpleSearchTextArray.length > 0 ||
    ignoreSearchTextArray.length > 0 ||
    searchTextWithAnd.length > 0
  ) {
    isButtonActive = false;
  }

  const handleOnShowSuggestions = type => {
    dispatch(resetSuggestions());
    dispatch(setSearchSuggestionType(type));
    props.onShowSuggestions(true);
  };

  const handleTwitterGeoLocation = event => {
    if (event.target.checked) {
      dispatch(setTwitterGeoLocationEnable(true));
    } else {
      dispatch(setTwitterGeoLocationEnable(false));
    }
  };

  return (
    <Grid spacing={0} container className={classes.topsection}>
      <TopicThemeLabelDialog
        open={isOpenThemelabelDialog}
        handleClose={handleClose}
        handleClickSaveSearch={handleClickSaveSearch}
        handleUpdateSaveSearch={handleUpdateSaveSearch}
      />
      <Grid container>
        <Grid item sm={8} xs={8} lg={3} md={3}>
          <div style={{ marginRight: '20px' }}>
            {isSimpleSearch ? (
              <>
                <h6>Any of these phrases</h6>
                <TopicSearchTextTags
                  handleOnShowSuggestions={handleOnShowSuggestions}
                  searchSuggestionType={searchSuggestionTypeConfig.simpleSearchTextArray}
                />
                <br />
                <h6>All of these phrases</h6>
                <TopicSearchTextTags2
                  handleOnShowSuggestions={handleOnShowSuggestions}
                  searchSuggestionType={searchSuggestionTypeConfig.searchTextWithAnd}
                />
                <br />
                <h6>None of these phrase</h6>
                <TopicIgnoreSearchText
                  handleOnShowSuggestions={handleOnShowSuggestions}
                  searchSuggestionType={searchSuggestionTypeConfig.ignoreSearchTextArray}
                />
                <br />
              </>
            ) : (
              <>
                <h6>Search Query</h6>
                <TopicSearchTextField />
              </>
            )}
            <div className={classes.suggestionsBtnSection}>
              {!isSimpleSearch ? (
                <>
                  <div className={classes.selectedSuggestionsList}>
                    {selectedSuggestionsArr.map((v, index) => (
                      <span key={`ssa${index}`} className="text-black-50">
                        {
                          `${v}${index !== selectedSuggestionsArr.length - 1 ? ', ' : ''}`
                        }
                      </span>
                    ))}
                  </div>
                  {isSearchAllowed(searchText, simpleSearchTextArray) ? (
                    <Button color="primary" onClick={props.onShowSuggestions}>
                      Show Suggestions
                    </Button>
                  ) : null}
                </>
              ) : null}
            </div>
          </div>
        </Grid>
        <Grid item sm={8} xs={8} lg={5} md={5}>
          <div style={{ marginRight: '20px' }}>
            <Grid container style={{ justifyContent: 'space-between' }}>
              <Grid item>
                <h6>Search</h6>
                <ButtonGroup color="primary" style={{ height: '37px' }}>
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
              <Grid item className={classes.dateRangeContainer}>
                <h6>Date Range</h6>
                <TopicRangePicker />
              </Grid>
            </Grid>
            <div style={{ marginTop: '20px' }}>
              <h6>Document Types</h6>
              <TopicDocumentTypeDropdown />
            </div>
            <div style={{ marginTop: '22px' }}>
              <h6>Select Country</h6>
              <TopicCountryDropDown />
            </div>
          </div>
          <br />
        </Grid>
        <Grid item sm={8} xs={8} lg={2} md={2}>
          {!true ? (
            <>
              {' '}
              <h6>Section</h6>
              <TopicSectionGroup />{' '}
            </>
          ) : null}
          <div style={{ marginTop: '0px' }}>
            <h6>Search Universe</h6>
            <TopicUniverseGroup />
            <div style={{ marginTop: '22px' }}>
              <TopicUniverseSubFilters />
            </div>
            <div>
              <h6>Search From</h6>
              <TopicIndexDropDown />
            </div>
          </div>
        </Grid>
      </Grid>
      {searchIndex['id'] !== 5 && searchIndex['id'] !== 4 ? (
        <Grid item xs={12} md={12} lg={12}>
          <Grid container direction="row" justify="flex-start" alignItems="center" style={{ paddingBottom: '5px' }}>
            <Grid item>
              <h6 style={{ marginBottom: 0 }}>Enable Email Alert</h6>
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
          </Grid>
        </Grid>
      ) : null}

      {searchIndex['id'] === 5 && isSimpleSearch ? (
        <Grid item xs={12} md={12} lg={12}>
          <Grid container direction="row" justify="flex-start" alignItems="center" style={{ paddingBottom: '5px' }}>
            <Grid item>
              <h6 style={{ marginBottom: 0 }}>Tweets with location data only</h6>
            </Grid>
            <Grid item>
              <Switch
                checked={twitterGeoLocationEnable}
                onChange={handleTwitterGeoLocation}
                color="primary"
                name="checkedTwitterGeoLocation"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            </Grid>
          </Grid>
        </Grid>
      ) : null}
      <Grid item xs={12} md={12} lg={12}>
        <Grid container direction="row" justify="flex-start" alignItems="center">
          <Grid item>
            <Button
              disabled={isButtonActive}
              style={{ width: '100px' }}
              variant="contained"
              color="primary"
              onClick={() => handleSearch()}>
              Search
            </Button>
          </Grid>
          <Grid item>&nbsp; </Grid>
          <Grid item>
            <Button
              style={{ width: '100px' }}
              variant="contained"
              color="primary"
              onClick={() => {
                handleOpenThemeDialog();
              }}
            >
              Save
            </Button>
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
