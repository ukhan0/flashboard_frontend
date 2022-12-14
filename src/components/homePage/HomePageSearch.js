import React, { useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TopicSearchTextField from '../topic/TopicSearchTextField';
import TopicDocumentTypeDropdown from '../topic/TopicDocumentTypeDropdown';
import { useSelector, useDispatch } from 'react-redux';
import { forEach, concat } from 'lodash';
import { performTopicSearchAggregate, performTopicTweetsSearchAggregate } from '../topic/topicActions';
import {
  setOpenTopicSearchDialog,
  resetResultsPage,
  setIsSimpleSearch,
  setIsUnsavedSearch,
  setSimpleSearchTextArray,
  setSearchSuggestionType,
  setTopicSearchText
} from '../../reducers/Topic';
import TopicIndexDropDown from '../topic/TopicIndexDropDown';
import { useHistory } from 'react-router-dom';
import TopicSuggestionsDialog from '../topic/TopicSuggestionsDialog';
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
    cancelTokenSourceHighlights,
    isSimpleSearch
  } = useSelector(state => state.Topic);

  let selectedSuggestionsArr = [];
  forEach(selectedSuggestions, values => {
    selectedSuggestionsArr = concat(selectedSuggestionsArr, values);
  });

  const handleSearch2 = () => {
    props.onClose();
    dispatch(setIsSimpleSearch(true));
    dispatch(setSimpleSearchTextArray([searchText, ...simpleSearchTextArray]));
    dispatch(setSearchSuggestionType(searchSuggestionTypeConfig.simpleSearchTextArray));
    dispatch(resetResultsPage());
    dispatch(performTopicSearchAggregate(true, true));
    dispatch(performTopicTweetsSearchAggregate(true, true));
    dispatch(setTopicSearchText(''));
    // cancel existing calls if there are any
    if (cancelTokenSourceHighlights) {
      cancelTokenSourceHighlights.cancel();
    }

    dispatch(setIsUnsavedSearch(true));
    dispatch(setIsSimpleSearch(true));

    setTimeout(() => {
      history.push('./topic');
    }, [400]);
    dispatch(setOpenTopicSearchDialog(true));
  };
  const [isSuggestionsDlgOpen, setIsSuggestionsDlgOpen] = useState(false);

  const handleCloseTopicSuggestionsDialog = () => {
    setIsSuggestionsDlgOpen(false);
  };
  const handleOnChange = () => {
    if (isSimpleSearch) {
      dispatch(setIsSimpleSearch(false));
    }
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
          <TopicSearchTextField onChangeStatus={true} onChange={handleOnChange} />

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
              <Button
                color="primary"
                onClick={() => {
                  dispatch(setSearchSuggestionType(searchSuggestionTypeConfig.simpleSearchTextArray));
                  setIsSuggestionsDlgOpen(true);
                }}>
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
          <Grid container direction="row" justify="flex-start" alignItems="center">
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
        <Grid container direction="row" justify="space-around" alignItems="center">
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
