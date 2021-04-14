import React, { useState, useEffect, Fragment, useCallback, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Collapse, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { includes, get, remove } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { setAllSearchParams, setSelectedSearch } from '../../reducers/Topic';
import { performTopicSearch, fetchTopicsList, deleteTopic, deleteSearch } from './topicActions';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  deleteIcon: {
    fontSize: '.7rem',
  },
}));

export default function TopicSearchHistory(props) {
  const classes = useStyles();
  const { topicsList, selectedSearch } = useSelector(state => state.Topic);
  const [openedTopics, setOpenedTopics] = useState([]);
  const dispatch = useDispatch();
  const firstTimeLoad = useRef(false);

  useEffect(() => {
    dispatch(fetchTopicsList());
  }, [dispatch]);

  const setSearchParams = useCallback((searchObj, topicObj) => {
    dispatch(setSelectedSearch(searchObj, topicObj));
    dispatch(setAllSearchParams(searchObj));
    setTimeout(() => {
      dispatch(performTopicSearch());
    },1000)
  }, [dispatch]);

  const toggleTopic = useCallback(topicId => {
    const newTopicArray = [...openedTopics];
    if (includes(openedTopics, topicId)) {
      // remove from array
      remove(newTopicArray, id => id === topicId);
    } else {
      // add in array
      newTopicArray.push(topicId);
    }
    setOpenedTopics(newTopicArray);
  }, [openedTopics]);

  useEffect(() => {
    if(topicsList && topicsList.length && !firstTimeLoad.current) {
      firstTimeLoad.current = true
      // set first search of first topic as default search
      const firstTopic = get(topicsList, '[0]', null)
      if(firstTopic) {
        toggleTopic(firstTopic.topicID)
        const firstSearch = get(firstTopic, 'searches[0]', null)
        if(firstSearch) {
          setSearchParams(firstSearch, firstTopic)
        }
      }
    }
  }, [topicsList, setSearchParams, toggleTopic]);

  const isTopicOpen = topicId => {
    return includes(openedTopics, topicId);
  };

  return (
    <List component="nav" className={classes.root}>
      {topicsList.map((topic, index) => {
        return (
          <Fragment key={`li${index}`}>
            <ListItem button onClick={() => toggleTopic(topic.topicID)}>
              <ListItemText primary={topic.topicText} />
              <ListItemSecondaryAction>
                <IconButton edge="end" size="small" onClick={() => dispatch(deleteTopic(topic.topicID))}>
                  <CloseIcon className={classes.deleteIcon} />
                </IconButton>
                {isTopicOpen(topic.topicID) ? 
                  <IconButton edge="end">
                    <ExpandLess />
                  </IconButton>
                  : 
                  <IconButton edge="end">
                    <ExpandMore />
                  </IconButton>
                }
              </ListItemSecondaryAction>
            </ListItem>
            <Collapse in={isTopicOpen(topic.topicID)} timeout="auto" unmountOnExit>
              {get(topic, 'searches', []).map((search, index) => {
                return (
                  <List component="div" disablePadding key={`lil${index}`}>
                    <ListItem
                      button
                      className={classes.nested}
                      selected={selectedSearch && selectedSearch.searchId === search.searchId}
                      onClick={() => setSearchParams(search, topic)}>
                      <ListItemText primary={search.searchText} />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="comments" size="small" onClick={() => dispatch(deleteSearch(topic.topicID, search.searchId))} >
                          <CloseIcon className={classes.deleteIcon} />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                );
              })}
            </Collapse>
          </Fragment>
        );
      })}
    </List>
  );
}