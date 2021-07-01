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
  resetAllSearchParams
} from '../../reducers/Topic';
import {
  performTopicSearchAggregate,
  performTopicSearchHighlights,
  fetchTopicsList,
  deleteSearch
} from './topicActions';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

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
          // dispatch(performTopicSearchHighlights(true));
        }, 1000);
      }, 1000);
    },
    [dispatch, cancelTokenSourceHighlights]
  );

  useEffect(() => {
    if (savedSearches.length > 0 && !firstTimeLoad.current) {
      firstTimeLoad.current = true;
      // set first search of first topic as default search
      const firstSearch = get(savedSearches, '[0]', null);
      if (!selectedSearch && firstSearch) {
        setSearchParams(firstSearch);
      }
    }
  }, [savedSearches, setSearchParams, selectedSearch]);

  const clickHereHandle = () => {
    dispatch(setOpenTopicSearchDialog(true));
    dispatch(setSelectedIndustries([]));
    dispatch(setShowUpdateButton(false));
    dispatch(setSelectedSearch(null, null));
    dispatch(resetAllSearchParams());
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
                  onClick={() => setSearchParams(s)}>
                  <ListItemText primary={s.searchText} />
                  <ListItemSecondaryAction>
                    <IconButton
                      aria-label="comments"
                      size="small"
                      onClick={() => {
                        dispatch(setShowUpdateButton(true));
                        dispatch(setShowComposeNew(true));
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
