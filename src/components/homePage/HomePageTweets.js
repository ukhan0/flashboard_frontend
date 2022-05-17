import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Grid, Paper, Box, Avatar, Card } from '@material-ui/core';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { get, uniqBy } from 'lodash';
import { BeatLoader } from 'react-spinners';
import { getWatchlist } from '../watchlist/watchlistApiCalls';
import SocketService from '../../socketService';

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

  margin: {
    marginTop: '12px',
    background: 'white'
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
    backgroundColor: '#87ceeb',
    paddingLeft: 2,
    paddingRight: 2,
    borderRadius: 4,
    color: 'white'
  }
}));

const TopicSearchResults = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const tweets = useRef([]);
  const [renderTime, setRenderTime] = useState(0);
  const [userWatchlist, setUserWatchlist] = React.useState([]);
  const { selectedFileType, selectedType } = useSelector(state => state.Watchlist);
  const getUserWatchlist = useCallback(async () => {
    const resp = await dispatch(getWatchlist('watchlist', selectedFileType, selectedType));
    setUserWatchlist(resp);
  }, [dispatch, selectedFileType, selectedType]);
  useEffect(() => {
    getUserWatchlist();
  }, [getUserWatchlist]);
  useEffect(() => {
    for (let i = 0; i < userWatchlist.length; i++) {
      SocketService.socket.on(userWatchlist[i].ticker, d => {
        let tweetObj = JSON.parse(d);
        tweetObj.namx = userWatchlist[i].ticker;
        if (tweets.current.length > 70) {
          tweets.current.pop();
        }
        tweets.current.unshift(tweetObj);
      });
    }
  }, [userWatchlist]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setRenderTime(renderTime + 1);
    }, [3000]);
    return () => {
      clearInterval(intervalId); //This is important
    };
  }, [renderTime]);
  return (
    <div>
      <Card className="card-box mb-4" style={{ maxHeight: '600px' }}>
        <div style={{ float: 'left', outline: '1px solid gray', margin: '10px', borderradius: '8px' }}>
          <div className="card-header--title font-weight-bold">Social Stream</div>
          <div style={{ height: '600px', width: '600px', margin: ' 16px' }}>
            {tweets.current.length > 0 ? (
              <PerfectScrollbar>
                {uniqBy(tweets.current, 'actor.id').map((v, index) => {
                  return (
                    <Fragment key={`rs${index}`}>
                      <Paper elevation={6} className={classes.margin}>
                        <Box p={4}>
                          <div>
                            <Grid container direction="row" justify="space-between" alignItems="flex-start">
                              <Grid item>
                                <Avatar
                                  alt="TwitterLogo"
                                  src={`${get(v, 'actor.image', '')}`}
                                  className="app-sidebar-userbox-avatar"
                                  style={{ float: 'left' }}
                                />
                                <div style={{ float: 'left', paddingLeft: '5px' }}>
                                  <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={`https://twitter.com/${v.account.name}`}>
                                    <span className={classes.topic}> {v.account.name}</span>
                                    &nbsp;
                                    {v.posting_account}
                                  </a>
                                  <br></br>
                                  <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={`${get(v, 'tweet_json.link', '')}`}>
                                    <span>{v.source}</span>
                                  </a>
                                </div>
                              </Grid>
                              <Grid item>
                                <small className="text-black-50 pt-1 pr-2">
                                  Posting Account ID:{' '}
                                  <b className={clsx(classes.clickable, 'text-first')}>{v.account.accountId}</b>
                                </small>
                                <small className="text-black-50 pt-1 pr-2">
                                  Tweet ID: <b className="text-first">{v.account.id}</b>
                                </small>
                                <small className="text-black-50 pt-1 pr-2">
                                  Date Posted:{' '}
                                  <b className="text-first">
                                    {v.actor.postedTime
                                      ? moment(v.actor.postedTime).format('dddd, MMMM Do, YYYY h:mm:ss A')
                                      : ''}
                                  </b>
                                </small>
                              </Grid>
                            </Grid>

                            <p
                              key={`rstc`}
                              className={clsx(
                                classes.searchResultText,
                                classes.paragraphHeading,
                                classes.clickable,
                                classes.line,
                                'font-size-mg mb-2 text-black-50'
                              )}>
                              {v.actor.summary ? v.actor.summary : v.body}
                            </p>
                          </div>
                        </Box>
                      </Paper>
                    </Fragment>
                  );
                })}
              </PerfectScrollbar>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <BeatLoader color={'var(--primary)'} loading={true} size={10} />
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};
export default TopicSearchResults;
