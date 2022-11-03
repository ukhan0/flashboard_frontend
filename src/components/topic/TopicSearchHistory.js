import React, { useEffect, useCallback, useRef } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { get, orderBy } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { subMonths, startOfMonth, endOfMonth } from 'date-fns';
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
  setBackDropOnCompanyClick,
  setIsUnsavedSearch,
  setSearchId,
  setTopicSearchDateRange
} from '../../reducers/Topic';
import { performTopicSearchAggregate, deleteSearch, performTopicTweetsSearchAggregate } from './topicActions';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useLocation } from 'react-router-dom';
import TopicDeleteSearchConfirmDialog from './TopicDeleteSearchConfirmDialog';
import { preventParentClick } from './topicHelpers';
import { useHistory } from 'react-router-dom';

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
  const history = useHistory();
  const [isModal, setModal] = React.useState(false);
  const [deleteSearchId, setDeleteSearchId] = React.useState(null);
  const { cancelTokenSourceHighlights, savedSearches, selectedSearch, linkSearchId } = useSelector(
    state => state.Topic
  );
  const dispatch = useDispatch();
  const sortedSearches = orderBy(savedSearches, [search => search.searchLabel.toLowerCase()], ['asc']);
  let firstTimeLoad = useRef(false);
  let data = new URLSearchParams(useLocation().search);
  let getQueryParams = useRef(data);

  const setSearchParams = useCallback(
    (searchObj, showLoader = true) => {
      dispatch(setSelectedSearch(searchObj));
      dispatch(setSuggestions({}));
      dispatch(setAllSearchParams(searchObj));
      setTimeout(() => {
        dispatch(resetResultsPage());
        dispatch(performTopicSearchAggregate(showLoader, true));
        dispatch(performTopicTweetsSearchAggregate(true, true));
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
    if (linkSearchId) {
      let firstSearch = savedSearches.find(savedSearches => savedSearches.searchId === linkSearchId);
      if (firstSearch) {
        setSearchParams(firstSearch);
      }
      dispatch(setSearchId(null));
    }
  }, [dispatch, linkSearchId, setSearchParams, savedSearches]);
  const setSearchParamsEdit = searchObj => {
    dispatch(setSelectedSearch(searchObj));
    dispatch(setSuggestions({}));
    dispatch(setAllSearchParams(searchObj));
    dispatch(setSearchLabel(searchObj.searchLabel));
    dispatch(setOpenTopicSearchDialog(true));
  };

  useEffect(() => {
    if (savedSearches.length > 0 && !firstTimeLoad.current) {
      if (!getQueryParams.current.get('topicId')) {
        firstTimeLoad.current = true;
        // set first search of first topic as default search
        const sortedSearches = orderBy(savedSearches, [search => search.searchLabel.toLowerCase()], ['asc']);
        const firstSearch = get(sortedSearches, '[0]', null);
        if (!selectedSearch && firstSearch) {
          setSearchParams(firstSearch);
        }
      } else {
        firstTimeLoad.current = true;
        let searchId = parseInt(getQueryParams.current.get('topicId'));
        // set first search of from email click topic as default search
        let firstSearch = savedSearches.find(savedSearches => savedSearches.searchId === searchId);

        if (!selectedSearch && firstSearch) {
          setSearchParams(firstSearch);
        }
      }
    }
  }, [savedSearches, setSearchParams, selectedSearch]);

  const clickHereHandle = e => {
    preventParentClick(e);
    dispatch(setOpenTopicSearchDialog(true));
    dispatch(setSelectedIndustries([]));
    dispatch(setShowUpdateButton(false));
    dispatch(setSelectedSearch(null, null));
    dispatch(resetAllSearchParams());
  };

  const handleSearch = (e, s, showLoader = true) => {
    preventParentClick(e);
    dispatch(
      setTopicSearchDateRange({
        startDate: subMonths(startOfMonth(new Date()), 12),
        endDate: endOfMonth(new Date())
      })
    );
    history.push('/topic');
    dispatch(setIsUnsavedSearch(false));
    setSearchParams(s, showLoader);
    props.handleClose();
    dispatch(setBackDropOnCompanyClick(false));
  };
  const handleDeleteSearch = (e, searchId) => {
    preventParentClick(e);
    setModal(!isModal);
    if (searchId) {
      setDeleteSearchId(searchId);
    }
  };
  const confirmDeleteSearch = e => {
    setModal(!isModal);
    preventParentClick(e);
    dispatch(deleteSearch(deleteSearchId));
    if (deleteSearchId === selectedSearch.searchId) {
      const searchObj = savedSearches.find(s => deleteSearchId === s.searchId);
      dispatch(setSelectedSearch(searchObj));
      dispatch(setAllSearchParams(searchObj));
    }

    dispatch(setOpenTopicSearchDialog(false));
    dispatch(setShowUpdateButton(false));
  };

  const handleEdit = (e, search) => {
    if (e) {
      preventParentClick(e);
    }
    dispatch(setIsUnsavedSearch(false));
    dispatch(setShowUpdateButton(true));
    dispatch(setShowComposeNew(true));
    dispatch(setBackDropOnCompanyClick(false));
    setSearchParamsEdit(search);
    handleSearch(e, search, false);
  };

  return (
    <div
      className={classes.savedSearchesSection}
      onClick={e => {
        preventParentClick(e);
      }}>
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
                onClick={e => {
                  handleSearch(e, s);
                }}>
                <ListItemText primary={<p className={classes.label}>{s.searchLabel}</p>} />

                <ListItemSecondaryAction>
                  <IconButton
                    aria-label="comments"
                    size="small"
                    onClick={e => {
                      handleEdit(e, s);
                    }}>
                    <EditIcon className={classes.editIcon} />
                  </IconButton>
                  <IconButton aria-label="comments" size="small" onClick={e => handleDeleteSearch(e, s.searchId)}>
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
              onClick={e => {
                clickHereHandle(e);
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
