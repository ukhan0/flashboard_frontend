import React, { useEffect, useCallback, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { get, orderBy } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import {
  setAllSearchParams,
  setSelectedSearch,
  setSuggestions,
  resetResultsPage,
  cancelExistingHightlightsCalls,
  setShowComposeNew,
  setShowUpdateButton,
  setSearchLabel,
  setOpenTopicSearchDialog,
  setSelectedIndustries,
  resetAllSearchParams,
  setBackDropOnCompanyClick
} from '../../reducers/Topic';
import { performTopicSearchAggregate, fetchTopicsList, deleteSearch, perfomeSearchPayloadTweets } from './topicActions';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useLocation } from 'react-router-dom';
import TopicDeleteSearchConfirmDialog from './TopicDeleteSearchConfirmDialog';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 'auto'
    // backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  deleteIcon: {
    fontSize: '1.5rem'
  },
  topicIcon: {
    marginRight: 5
  },
  editIcon: {
    fontSize: '1.5rem'
  },
  editButton: {
    marginRight: '10px',
    fontSize: '.7rem'
  },
  savedSearchesSection: {
    marginTop: 10
  },
  title: {
    marginLeft: 5
  },
  label: {
    width: '150px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    cursor: 'pointer'
  }
}));

export default function TopicSearchHistory(props) {
  const classes = useStyles();
  const [isModal, setModal] = React.useState(false);
  const [deleteSearchId, setDeleteSearchId] = React.useState(null);
  const { cancelTokenSourceHighlights, savedSearches, selectedSearch } = useSelector(state => state.Topic);
  const dispatch = useDispatch();
  const sortedSearches = orderBy(savedSearches, [search => search.searchLabel.toLowerCase()], ['asc']);
  const firstTimeLoad = useRef(false);
  let getQueryParams = new URLSearchParams(useLocation().search);
  useEffect(() => {
    dispatch(fetchTopicsList());
  }, [dispatch]);

  const setSearchParamsEdit = searchObj => {
    dispatch(setSelectedSearch(searchObj));
    dispatch(setSuggestions({}));
    dispatch(setAllSearchParams(searchObj));
    dispatch(setSearchLabel(searchObj.searchLabel));
    dispatch(setOpenTopicSearchDialog(true));
  };

  const setSearchParams = useCallback(
    (searchObj, showLoader = true) => {
      dispatch(setSelectedSearch(searchObj));
      dispatch(setSuggestions({}));
      dispatch(setAllSearchParams(searchObj));
      setTimeout(() => {
        dispatch(resetResultsPage());
        dispatch(performTopicSearchAggregate(showLoader, true));
        dispatch(perfomeSearchPayloadTweets(true, true, '/api/dictionary/search_tweets_data', false));
        dispatch(perfomeSearchPayloadTweets(true, true, '/api/dictionary/search_tweets_aggregate_data', true));
        // cancel existing calls if there are any
        if (cancelTokenSourceHighlights) {
          cancelTokenSourceHighlights.cancel();
        }
        // now perform actual search
        setTimeout(() => {
          dispatch(cancelExistingHightlightsCalls(false));
        }, 1000);
      }, 1000);
    },
    [dispatch, cancelTokenSourceHighlights]
  );

  useEffect(() => {
    if (savedSearches.length > 0 && !firstTimeLoad.current) {
      if (!getQueryParams.get('topicId')) {
        firstTimeLoad.current = true;
        // set first search of first topic as default search
        const sortedSearches = orderBy(savedSearches, [search => search.searchLabel.toLowerCase()], ['asc']);
        const firstSearch = get(sortedSearches, '[0]', null);
        if (!selectedSearch && firstSearch) {
          setSearchParams(firstSearch);
        }
      } else {
        firstTimeLoad.current = true;
        let searchId = parseInt(getQueryParams.get('topicId'));
        // set first search of from email click topic as default search
        let searchIndex = savedSearches.findIndex(savedSearches => savedSearches.searchId === searchId);
        const firstSearch = get(savedSearches, `[${searchIndex}]`, null);
        if (!selectedSearch && firstSearch) {
          setSearchParams(firstSearch);
        }
      }
    }
  }, [savedSearches, setSearchParams, selectedSearch, getQueryParams]);

  const clickHereHandle = () => {
    dispatch(setOpenTopicSearchDialog(true));
    dispatch(setSelectedIndustries([]));
    dispatch(setShowUpdateButton(false));
    dispatch(setSelectedSearch(null, null));
    dispatch(resetAllSearchParams());
  };

  const handleSearch = (s, showLoader = true) => {
    setSearchParams(s, showLoader);
    props.handleClose();
    dispatch(setBackDropOnCompanyClick(false));
  };
  const handleDeleteSearch = searchId => {
    setModal(!isModal);
    if (searchId) {
      setDeleteSearchId(searchId);
    }
  };
  const confirmDeleteSearch = () => {
    setModal(!isModal);
    dispatch(deleteSearch(deleteSearchId));
  };

  const handleEdit = (search) => {
    dispatch(setShowUpdateButton(true));
    dispatch(setShowComposeNew(true));
    dispatch(setBackDropOnCompanyClick(false));
    setSearchParamsEdit(search);
    handleSearch(search, false)
  }

  return (
    <div className={classes.savedSearchesSection}>
      <TopicDeleteSearchConfirmDialog
        open={isModal}
        handleDeleteSearch={handleDeleteSearch}
        confirmDeleteSearch={confirmDeleteSearch}
      />
      <List component="nav" className={classes.root}>
        {sortedSearches.length > 0 ? (
          sortedSearches.map((s, index) => {
            return (
              <ListItem
                button
                className={classes.nested}
                key={index}
                selected={selectedSearch && selectedSearch.searchId === s.searchId}
                onClick={() => {
                  handleSearch(s);
                }}>
                <ListItemText primary={<p className={classes.label}>{s.searchLabel}</p>} />

                <ListItemSecondaryAction>
                  <IconButton
                    aria-label="comments"
                    size="small"
                    onClick={() => {
                      handleEdit(s)
                    }}>
                    <EditIcon className={classes.editIcon} />
                  </IconButton>
                  <IconButton aria-label="comments" size="small" onClick={() => handleDeleteSearch(s.searchId)}>
                    <DeleteForeverIcon className={classes.deleteIcon} />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })
        ) : (
          <p>
            You don't have any saved topics yet. <br></br>
            <span
              style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
              onClick={() => {
                clickHereHandle();
                props.handleClose();
              }}>
              Click here
            </span>{' '}
            to create new one{' '}
          </p>
        )}
      </List>
    </div>
  );
}
