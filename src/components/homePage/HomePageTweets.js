import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Tooltip, Box, Avatar, Card } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { cloneDeep, get, uniqBy } from 'lodash';
import { BeatLoader } from 'react-spinners';
import { getWatchlist } from '../watchlist/watchlistApiCalls';
// import SocketService from '../../socketService';
import io from 'socket.io-client';
import config from 'config/config';
import { lastTweets } from './HomePageHelpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Repeat, SmsOutlined, FavoriteBorderOutlined } from '@material-ui/icons';
const socket = io.connect(config.socketUrl);
// SocketService.init(socket);
const useStyles = makeStyles(theme => ({
  resultHeader: {
    display: 'flex'
  },
  searchResultText: {
    '& .yellowColor': {
      backgroundColor: 'orange',
      paddingLeft: 2,
      paddingRight: 2,
      borderRadius: 4
    }
  },
  documentDate: {
    fontSize: '20px'
  },
  currentCompanyDetail: {
    marginRight: '15px',
    marginTop: '20px',
    marginLeft: '15px',
    top: 60,
    position: 'sticky',
    zIndex: 1
  },
  heading: {
    fontSize: '16px',
    marginBottom: '5px',
    marginLeft: '10px',
    display: 'inline-block',
    fontWeight: 'bold'
  },
  paragraphHeading: {
    '& heading': {
      color: '#898a91',
      paddingLeft: 2,
      paddingRight: 2,
      borderRadius: 4,
      fontWeight: 'bold',
      fontSize: '18px'
    }
  },
  line: {
    '& sssss': {
      display: 'block'
    }
  },
  topic: {
    paddingLeft: 2,
    paddingRight: 2,
    fontWeight: 'bold'
  }
}));

const TopicSearchResults = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  // const tweets = useRef(lastTweets());
  const [tweetsUpdate, setTweetsUpdate] = useState(lastTweets());
  // const [renderTime, setRenderTime] = useState(0);
  const [userWatchlist, setUserWatchlist] = useState([]);
  const { selectedFileType, selectedType } = useSelector(state => state.Watchlist);
  // const lastTweetsData = JSON.stringify(tweets.current);
  const getUserWatchlist = useCallback(async () => {
    const resp = await dispatch(getWatchlist('watchlist', selectedFileType, selectedType));
    setUserWatchlist(resp);
  }, [dispatch, selectedFileType, selectedType]);

  useEffect(() => {
    getUserWatchlist();
  }, [getUserWatchlist]);

  // useEffect(() => {
  //   return () => {
  //     localStorage.setItem('lastTweets', JSON.stringify(tweetsUpdate));
  //   };
  // }, [tweetsUpdate]);

  useEffect(() => {
    return () => {
      socket.close();
    }
  }, []);

  useEffect(() => {
    socket.connect();

    for (let i = 0; i < userWatchlist.length; i++) {
      socket.emit('join_room', userWatchlist[i].ticker);
      socket.on(userWatchlist[i].ticker, function (data) {
        let tweetObj = JSON.parse(data);
        tweetObj.namx = userWatchlist[i].ticker;

        setTweetsUpdate((prevState) => {
          let tweets = cloneDeep(prevState);
          if (tweets.length > 70) {
            tweets.pop();
          }

          tweets.unshift(tweetObj);
          localStorage.setItem('lastTweets', JSON.stringify(tweets));
          
          return tweets
        });
      });
    }
  }, [userWatchlist]);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setRenderTime(renderTime + 1);
  //   }, [3000]);
  //   return () => {
  //     clearInterval(intervalId); //This is important
  //   };
  // }, [renderTime]);

  function goToTweet(tweet_link) {
    window.open(tweet_link, '_blank');
  }

  function tweetActions(action, tweet_id) {
    let id = tweet_id.substring(tweet_id.lastIndexOf(':') + 1, tweet_id.length);
    if (action === 'REPLY') {
      window.open(`https://twitter.com/intent/tweet?in_reply_to=${id}`, '_blank');
    }
    if (action === 'RETWEET') {
      window.open(`https://twitter.com/intent/retweet?tweet_id=${id}`, '_blank');
    }
    if (action === 'LIKE') {
      window.open(`https://twitter.com/intent/favorite?tweet_id=${id}`, '_blank');
    }
  }
  return (
    <Card className="card-box mb-4" style={{ height: '100%' }}>
      <div className={'card-header'}>
        <div className="card-header--title font-weight-bold drag-handle">Social Stream</div>
      </div>
      <div style={{ outline: '1px solid gray', margin: '10px 0 10px 10px', borderradius: '8px', height: '100%' }}>
        <Grid container direction="row" justify="center" alignItems="flex-start">
          {/* <Grid item></Grid> */}
          <Grid item>
            {tweetsUpdate.length < 1 ? (
              <div>
                <BeatLoader color={'var(--primary)'} loading={true} size={10} />
              </div>
            ) : null}
          </Grid>
          {/* <Grid item></Grid> */}
        </Grid>

        {tweetsUpdate.length > 0 && <div style={{ height: 'calc(100% - 60px)', margin: ' 0', overflowY: 'auto' }}>
          {uniqBy(tweetsUpdate, 'actor.id').map((v, index) => {
            return (
              <Fragment key={`rs${index}`}>
                <Box
                  p={2}
                  elevation={6}
                  style={{
                    width: '99%',
                    border: '1px solid lightgrey',
                    marginBottom: '5px',
                    borderRadius: '20px',
                    boxShadow: 'rgba(0,0,0,0.16) 0px 3px 6px,rgba(0,0,0,0.23) 0px 3px 6px'
                  }}>
                  <div>
                    <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                      <Grid item>
                        <Avatar
                          alt="TwitterLogo"
                          src={`${get(v, 'actor.image', '')}`}
                          className="app-sidebar-userbox-avatar"
                          style={{ float: 'left' }}
                        />
                        <div style={{ float: 'left', paddingLeft: '5px' }}>
                          <a target="_blank" rel="noopener noreferrer" href={v.actor.link}>
                            <span className={classes.topic}>{v.actor.displayName}</span>
                            <span className="text-black-50 pt-1 pr-2"> @{v.account.name} </span>
                          </a>
                          <Tooltip
                            placement="top"
                            title={
                              v.object ? moment(v.object.postedTime).format('dddd, MMMM Do, YYYY h:mm:ss A') : ''
                            }>
                            <span className="text-black-50 pt-1 pr-2">
                              . {v.object ? moment(v.object.postedTime).fromNow() : ''}
                            </span>
                          </Tooltip>
                        </div>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={12}>
                        <p
                          onClick={() => {
                            goToTweet(v.object.link);
                          }}
                          key={`rstc`}
                          style={{
                            paddingLeft: '50px',
                            position: 'relative',
                            bottom: '5px',
                            cursor: 'pointer'
                          }}>
                          {v.long_object ? v.long_object.body : v.body}
                        </p>
                      </Grid>
                    </Grid>
                    <Grid container direction="row" justify="space-around" alignItems="center" spacing={5}>
                      <Grid
                        style={{ cursor: 'pointer', textAlign: 'center' }}
                        item
                        xs={4}
                        onClick={() => {
                          tweetActions('REPLY', v.object.id);
                        }}
                        onMouseEnter={e => {
                          e.target.style.color = 'blue';
                        }}
                        onMouseLeave={e => {
                          e.target.style.color = 'black';
                        }}>
                        <SmsOutlined />
                        <span> Reply</span>
                      </Grid>
                      <Grid
                        style={{ cursor: 'pointer', textAlign: 'center' }}
                        item
                        xs={4}
                        onClick={() => {
                          tweetActions('RETWEET', v.object.id);
                        }}
                        onMouseEnter={e => {
                          e.target.style.color = 'blue';
                        }}
                        onMouseLeave={e => {
                          e.target.style.color = 'black';
                        }}>
                        <Repeat />
                        <span> Retweet</span>
                      </Grid>
                      <Grid
                        style={{ cursor: 'pointer', textAlign: 'center' }}
                        item
                        xs={4}
                        onClick={() => {
                          tweetActions('LIKE', v.object.id);
                        }}
                        onMouseEnter={e => {
                          e.target.style.color = 'blue';
                        }}
                        onMouseLeave={e => {
                          e.target.style.color = 'black';
                        }}>
                        <FavoriteBorderOutlined />
                        <span> Like</span>
                      </Grid>
                    </Grid>
                  </div>
                </Box>
              </Fragment>
            );
          })}
        </div>}
        <p className="text-black-50 pt-2 pb-2 pr-2" style={{ textAlign: 'right', marginRight: 20 }}>
          <span>
            <FontAwesomeIcon icon={['fab', 'twitter']} className="font-size-md" />
          </span>{' '}
          Powered by Twitter
        </p>
      </div>
    </Card>
  );
};
export default TopicSearchResults;
