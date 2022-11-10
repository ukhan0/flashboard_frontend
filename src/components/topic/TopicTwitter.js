import React, { Fragment } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import makeStyles from '@material-ui/core/styles/makeStyles';
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

const TopicTwitterSearchResults = () => {
  const classes = useStyles();

  const { twitterData } = useSelector(state => state.Topic);


const getHrefAndAnchorText = (text) => {
  let partitionArr = text.replace('<a ',';').replace('>',';').replace('</a>','').split(';');
  let hrefTextArr = partitionArr[1].split(' ');
  let hrefText = '';
  hrefTextArr.forEach(item => {
    if(item.startsWith('href')) {
      let temp = item.split('href=');
      hrefText = (temp[1].replace(/"/g,''));
    };
  });
  let anchorText = partitionArr[partitionArr.length-1];
  return {hrefText: hrefText, anchorText: anchorText};
};


  return (
    <div>
      <PerfectScrollbar>
        {twitterData.map((v, index) => {

          const statusLink = `https://twitter.com/${v?.user?.screen_name}/status/${v?.id_str}`
          let source = getHrefAndAnchorText(v.source);
          let tweetFullText = get(v, 'extended_tweet.full_text' , null);
          
          return (
            <Fragment key={`rs${index}`}>
              <Paper elevation={4} className={classes.margin}>
                <Box p={4}>
                  <div className={classes.resultSection}>
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
                          Posting Account ID:{' '}
                          <b className={clsx(classes.clickable, 'text-first')}>{v.user.id}</b>
                        </small>
                        <small className="text-black-50 pt-1 pr-2">
                          Tweet ID: <b className="text-first">{v.id_str}</b>
                        </small>
                        <small className="text-black-50 pt-1 pr-2">
                          Date Posted:{' '}
                          <b className="text-first">
                            {v.created_at ? moment(v.created_at, 'dd MMM DD HH:mm:ss ZZ YYYY').format('dddd, MMMM Do, YYYY h:mm:ss A') : ''}
                          </b>
                        </small>
                      </Grid>
                    </Grid>

                    <p
                      className={clsx(
                        classes.searchResultText,
                        classes.paragraphHeading,
                        classes.clickable,
                        classes.line,
                        'font-size-mg mb-2 text-black-50'
                      )}
                      dangerouslySetInnerHTML={{ __html: tweetFullText ? tweetFullText : v.text }}></p>

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
export default TopicTwitterSearchResults;
