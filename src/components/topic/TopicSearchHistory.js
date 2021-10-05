import React, { useEffect, useCallback, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { get } from 'lodash';
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
import { performTopicSearchAggregate, fetchTopicsList, deleteSearch } from './topicActions';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 'auto'
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
  }
}));

export default function TopicSearchHistory(props) {
  const classes = useStyles();
  const { cancelTokenSourceHighlights, savedSearches, selectedSearch } = useSelector(state => state.Topic);
  const dispatch = useDispatch();
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
    searchObj => {
      dispatch(setSelectedSearch(searchObj));
      dispatch(setSuggestions({}));
      dispatch(setAllSearchParams(searchObj));
      setTimeout(() => {
        dispatch(resetResultsPage());
        dispatch(performTopicSearchAggregate(true, true));
        // cancel existing calls if there are any
        if (cancelTokenSourceHighlights) {
          cancelTokenSourceHighlights.cancel();
        }
        // dispatch(cancelExistingHightlightsCalls(true));
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
        const firstSearch = get(savedSearches, '[0]', null);
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

  const handleSearch = s => {
    setSearchParams(s);
    props.handleClose();
    dispatch(setBackDropOnCompanyClick(false));
  };

  return (
    <div className={classes.savedSearchesSection}>
      <List component="nav" className={classes.root}>
        {savedSearches.length > 0 ? (
          savedSearches.map((s, index) => {
            return (
              <List component="div" disablePadding key={`lil${index}`}>
                <ListItem
                  button
                  className={classes.nested}
                  selected={selectedSearch && selectedSearch.searchId === s.searchId}
                  onClick={() => {
                    handleSearch(s);
                  }}>
                  <ListItemText primary={s.searchLabel} />
                  <ListItemSecondaryAction>
                    <IconButton
                      aria-label="comments"
                      size="small"
                      onClick={() => {
                        dispatch(setShowUpdateButton(true));
                        dispatch(setShowComposeNew(true));
                        dispatch(setBackDropOnCompanyClick(false));
                        setSearchParamsEdit(s);
                        props.handleClose();
                      }}>
                      <EditIcon className={classes.editIcon} />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="comments"
                      size="small"
                      onClick={() => dispatch(deleteSearch(s.searchId))}>
                      <DeleteForeverIcon className={classes.deleteIcon} />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
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
