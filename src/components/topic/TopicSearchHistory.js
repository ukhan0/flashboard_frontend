import React, { useState, useEffect, Fragment, useCallback, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Collapse } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { includes, get, remove } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { setAllSearchParams } from '../../reducers/Topic';
import { performTopicSearch, fetchTopicsList } from './topicActions';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

export default function TopicSearchHistory(props) {
  const classes = useStyles();
  const { topicsList } = useSelector(state => state.Topic);
  const [openedTopics, setOpenedTopics] = useState([]);
  const [selectedSearch, setSelectedSearch] = useState(null);
  const dispatch = useDispatch();
  const firstTimeLoad = useRef(false);

  useEffect(() => {
    dispatch(fetchTopicsList());
  }, [dispatch]);

  const setSearchParams = useCallback(searchObj => {
    setSelectedSearch(searchObj);
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
          setSearchParams(firstSearch)
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
              {isTopicOpen(topic.topicID) ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={isTopicOpen(topic.topicID)} timeout="auto" unmountOnExit>
              {topic.searches.map((search, index) => {
                return (
                  <List component="div" disablePadding key={`lil${index}`}>
                    <ListItem
                      button
                      className={classes.nested}
                      selected={selectedSearch && selectedSearch.searchId === search.searchId}
                      onClick={() => setSearchParams(search)}>
                      <ListItemText primary={search.searchText} />
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
