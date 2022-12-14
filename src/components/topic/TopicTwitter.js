import React, { Fragment, useCallback } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Alert from '@material-ui/lab/Alert';
import makeStyles from '@material-ui/core/styles/makeStyles';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { get, union } from 'lodash';
import Highlighter from 'react-highlight-words';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';

const useStyles = makeStyles(theme => ({
  resultHeader: {
    display: 'flex'
  },
  searchResultText: {
    display: 'block',
    '& .yellowColor': {
      backgroundColor: 'orange',
      padding: '0 2px',
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
  },
  twitterThumbLink: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  tweetImg: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center'
  },
  twitterVideoThumb: {
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
      width: '30%'
    },

    [theme.breakpoints.down('xs')]: {
      width: '60%'
    }
  },
  twitterImgVideoContainer: {
    width: '100%',
    '&::after': {
      content: '""',
      zIndex: 8,
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      position: 'absolute',
      width: '100%',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    },
    '& img': {
      width: '100%'
    }
  },
  twitterThumbIcon: {
    fontSize: '80px',
    position: 'absolute',
    top: 0,
    zIndex: 222,
    color: 'white',
    display: 'flex',
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto'
  },
  twitterImgContainer: {
    width: '25%',
    maxHeight: '250px',
    overflow: 'hidden',
    '& img': {
      width: '100%'
    }
  },
  twitterThumb: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& $twitterImgContainer': {
      marginLeft: 12
    },
    '& $twitterImgContainer:first-child': {
      marginLeft: 0
    }
  }
}));

const TopicTwitterSearchResults = () => {
  const classes = useStyles();

  const { twitterData, twitterFetchData } = useSelector(state => state.Topic);
  const { searchText, searchTextWithAnd, simpleSearchTextArray, isSimpleSearch } = useSelector(state => state.Topic);

  const searchWords = useCallback(() => {
    let words = [];
    if (isSimpleSearch) {
      words = union(simpleSearchTextArray, searchTextWithAnd);
    } else {
      words = searchText.split(' ');
      words = words.filter(item => {
        return item !== 'OR' && item !== 'AND';
      });
    }
    return words;
  }, [isSimpleSearch, simpleSearchTextArray, searchTextWithAnd, searchText]);

  const getHrefAndAnchorText = text => {
    let partitionArr = text
      .replace('<a ', ';')
      .replace('>', ';')
      .replace('</a>', '')
      .split(';');
    let hrefTextArr = partitionArr[1].split(' ');
    let hrefText = '';
    hrefTextArr.forEach(item => {
      if (item.startsWith('href')) {
        let temp = item.split('href=');
        hrefText = temp[1].replace(/"/g, '');
      }
    });
    let anchorText = partitionArr[partitionArr.length - 1];
    return { hrefText: hrefText, anchorText: anchorText };
  };

  return (
    <div>
      <PerfectScrollbar>
        {twitterData.map((v, index) => {
          const statusLink = `https://twitter.com/${v?.user?.screen_name}/status/${v?.id_str}`;
          let source = getHrefAndAnchorText(v.source);
          let tweetFullText = get(v, 'extended_tweet.full_text', null);
          let media = get(v, 'extended_tweet.entities.media', null);

          return (
            <Fragment key={`rs${index}`}>
              <Paper elevation={4} className={classes.margin}>
                <Box p={4}>
                  <div className={classes.resultSection} style={{ overflow: 'hidden' }}>
                    <Grid container direction="row" justify="space-between" alignItems="flex-start">
                      <Grid item>
                        <Avatar
                          alt="TwitterLogo"
                          src={`${get(v, 'user.profile_image_url', '')}`}
                          className="app-sidebar-userbox-avatar"
                          style={{ float: 'left' }}
                        />
                        <div style={{ float: 'left', paddingLeft: '5px' }}>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`https://twitter.com/${v.user.screen_name}`}>
                            <span className={classes.topic}> {v.topic_names}</span>
                            &nbsp;
                            {v.user.name}
                          </a>
                          <br></br>
                          <a target="_blank" rel="noopener noreferrer" href={statusLink}>
                            <span>{source.anchorText}</span>
                          </a>
                        </div>
                      </Grid>
                      <Grid item>
                        <small className="text-black-50 pt-1 pr-2">
                          Posting Account ID: <b className={clsx(classes.clickable, 'text-first')}>{v.user.id}</b>
                        </small>
                        <small className="text-black-50 pt-1 pr-2">
                          Tweet ID: <b className="text-first">{v.id_str}</b>
                        </small>
                        <small className="text-black-50 pt-1 pr-2">
                          Date Posted:{' '}
                          <b className="text-first">
                            {v.created_at
                              ? moment(v.created_at, 'dd MMM DD HH:mm:ss ZZ YYYY').format(
                                  'dddd, MMMM Do, YYYY h:mm:ss A'
                                )
                              : ''}
                          </b>
                        </small>
                      </Grid>
                    </Grid>

                    <Highlighter
                      className={clsx(
                        classes.searchResultText,
                        classes.paragraphHeading,
                        classes.clickable,
                        classes.line,
                        'font-size-mg mb-2 mt-2 text-black-50'
                      )}
                      highlightClassName="yellowColor"
                      searchWords={searchWords()}
                      autoEscape={true}
                      textToHighlight={tweetFullText ? tweetFullText : v.text}
                    />

                    {media && media.length && media[0]?.media_url_https ? (
                      <Grid container direction="row" justify="space-between" alignItems="flex-start">
                        <Grid item xs={12} className={classes.tweetImg} data-type={media[0].type}>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={statusLink}
                            className={classes.twitterThumbLink}>
                            {media[0].type === 'video' ? (
                              <>
                                <div className={classes.twitterVideoThumb}>
                                  <PlayCircleOutlineIcon className={classes.twitterThumbIcon} />
                                  <div className={classes.twitterImgVideoContainer}>
                                    <img src={media[0].media_url_https} alt="tweet-img" />
                                  </div>
                                </div>
                              </>
                            ) : (
                              <div className={classes.twitterThumb}>
                                {media.map((item, index) => (
                                  <div className={classes.twitterImgContainer} key={index}>
                                    <img src={item.media_url_https} alt="tweet-img" />
                                  </div>
                                ))}
                              </div>
                            )}
                          </a>
                        </Grid>
                      </Grid>
                    ) : null}
                  </div>
                </Box>
              </Paper>
            </Fragment>
          );
        })}

        {twitterData.length === 0 && twitterFetchData === true ? (
          <Alert severity="info">No result found against your search terms. </Alert>
        ) : null}
      </PerfectScrollbar>
    </div>
  );
};
export default TopicTwitterSearchResults;
