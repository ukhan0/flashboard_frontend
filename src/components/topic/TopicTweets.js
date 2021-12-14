import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Grid, Paper, Box, Avatar } from '@material-ui/core';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { get } from 'lodash';

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
const deleteSummaryObject = data => {
  delete data['tweet_json.object.summary'];
  if (data['tweet_json.long_object.body']) {
    delete data['tweet_json.body'];
  }
  return Object.values(data);
};

const TopicSearchResults = () => {
  const classes = useStyles();

  const { tweetsData } = useSelector(state => state.Topic);

  return (
    <div>
      <PerfectScrollbar>
        {tweetsData.map((v, index) => {
          return (
            <Fragment key={`rs${index}`}>
              <Paper elevation={6} className={classes.margin}>
                <Box p={4}>
                  <div className={classes.resultSection}>
                    <Grid container direction="row" justify="space-between" alignItems="flex-start">
                      <Grid item>
                        <Avatar
                          alt="TwitterLogo"
                          src={`${get(v, 'tweet_json.actor.image', '')}`}
                          className="app-sidebar-userbox-avatar"
                          style={{ float: 'left' }}
                        />
                        <div style={{ float: 'left', paddingLeft: '5px' }}>
                          <a target="_blank" rel="noopener noreferrer" href={v.source}>
                            <span className={classes.topic}> {v.topic_names}</span>
                            &nbsp;
                            {v.posting_account}
                            <br />
                            <span>{v.source}</span>
                          </a>
                        </div>
                      </Grid>
                      <Grid item>
                        <small className="text-black-50 pt-1 pr-2">
                          Posting Account ID:{' '}
                          <b className={clsx(classes.clickable, 'text-first')}>{v.posting_account_id}</b>
                        </small>
                        <small className="text-black-50 pt-1 pr-2">
                          Tweet ID: <b className="text-first">{v.twitter_account_id}</b>
                        </small>
                        <small className="text-black-50 pt-1 pr-2">
                          Date Posted:{' '}
                          <b className="text-first">
                            {v.date_posted ? moment.unix(v.date_posted).format('dddd, MMMM Do, YYYY h:mm:ss A') : ''}
                          </b>
                        </small>
                      </Grid>
                    </Grid>

                    {deleteSummaryObject(v.highlighted_text).map((c, b) => {
                      return (
                        <p
                          key={`rstc${b}`}
                          className={clsx(
                            classes.searchResultText,
                            classes.paragraphHeading,
                            classes.clickable,
                            classes.line,
                            'font-size-mg mb-2 text-black-50'
                          )}
                          dangerouslySetInnerHTML={{ __html: c }}></p>
                      );
                    })}
                  </div>
                </Box>
              </Paper>
            </Fragment>
          );
        })}
      </PerfectScrollbar>
    </div>
  );
};
export default TopicSearchResults;
