import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Collapse } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { includes, get, remove } from 'lodash';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function TopicSearchHistory() {
  const classes = useStyles();
  const { searchListVersion } = useSelector(state => state.Topic);
  const [open, setOpen] = React.useState(true);
  const [topics, setTopics] = useState([])
  const [openedTopics, setOpenedTopics] = []

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const fetchSaveTopics = async () => {
      const response = await axios.get(`api/topic/list/${user.id}`);
      setOpenedTopics([])
      setTopics(get(response, 'data.data', []));
    }
    fetchSaveTopics()
  },[searchListVersion])

  const toggleTopic = (topicId) => {
    const newTopicArray = [...openedTopics]
    if(includes(openedTopics, topicId)){
      // remove from array
      remove(newTopicArray, id => id === topicId)
    } else {
      // add in array
      newTopicArray.push(topicId)
    }
    setOpenedTopics(newTopicArray)
  };

  const isTopicOpen = (topicId) => {
    return includes(openedTopics, topicId)
  }

  const setSearchParams = (searchObj) => {
    console.log(searchObj)
  }

  return (
    <List
      component="nav"
      className={classes.root}
    >
      {
        topics.map(topic => {
          return (
            <>
              <ListItem button onClick={() => toggleTopic(topic.topicID)}>
                <ListItemText primary={topic.topicText} />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={isTopicOpen(topic.topicID)} timeout="auto" unmountOnExit>
                {
                  topic.searches.map(search => {
                    return (
                      <List component="div" disablePadding>
                        <ListItem button className={classes.nested} onClick={() => setSearchParams(search)}>
                          <ListItemText primary={search.searchText} />
                        </ListItem>
                      </List>
                    )
                  })
                }
              </Collapse>
            </>
          )
        })
      }
    </List>
  );
}
