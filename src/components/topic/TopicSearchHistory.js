import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Collapse } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { includes, get, remove } from 'lodash';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import config from '../../config/config';
import { setAllSearchParams } from '../../reducers/Topic';

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
  const { searchListVersion } = useSelector(state => state.Topic);
  const [topics, setTopics] = useState([]);
  const [openedTopics, setOpenedTopics] = useState([]);
  const [selectedSearch, setSelectedSearch] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const fetchSaveTopics = async () => {
      const response = await axios.get(`${config.apiUrl}/api/topic/list/${user.id}`);
      const topics = get(response, 'data.data', [])
      if(topics && topics.length) {
        setTopics(topics);
        // set first search of first topic as default search
        
        if(openedTopics.length === 0) {
          const firstTopic = get(topics, '[0]', null)
          if(firstTopic) {
            toggleTopic(firstTopic.topicID)
            const firstSearch = get(firstTopic, 'searches[0]', null)
            if(firstSearch) {
              setSearchParams(firstSearch)
            }
          }
        }
      }
    };
    fetchSaveTopics();
  }, [searchListVersion]);

  const toggleTopic = topicId => {
    const newTopicArray = [...openedTopics];
    if (includes(openedTopics, topicId)) {
      // remove from array
      remove(newTopicArray, id => id === topicId);
    } else {
      // add in array
      newTopicArray.push(topicId);
    }
    setOpenedTopics(newTopicArray);
  };

  const isTopicOpen = topicId => {
    return includes(openedTopics, topicId);
  };

  const setSearchParams = searchObj => {
    setSelectedSearch(searchObj);
    dispatch(setAllSearchParams(searchObj));
    setTimeout(() => {
      props.onSearchSelect();
    },1000)
    
  };

  return (
    <List component="nav" className={classes.root}>
      {topics.map((topic, index) => {
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
