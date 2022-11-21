import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  twitterHeading: {
    marginBottom: 8,
    fontWeight: 500,
    fontSize: 14
  },
  twitterList: {
    paddingLeft: 30,
    '& li': {
      marginBottom: '8px'
    }
  }
}));

const TopicTwitterHelpPopupContent = props => {
  const classes = useStyles();

  return (
    <div>
      <Grid container>
        <Grid item xs={12} sm={true}>
          <Typography className={classes.twitterHeading}>Matching on Tweet contents:</Typography>
          <ul className={classes.twitterList}>
            <li>keyword</li>
            <li>“quoted phrase”</li>
            <li>“keyword1 keyword2”~N</li>
            <li>#</li>
            <li>@</li>
            <li>$</li>
            <li>url:</li>
            <li>lang:</li>
          </ul>
        </Grid>
        <Grid item xs={12} sm={true}>
          <Typography className={classes.twitterHeading}>Matching on accounts of interest:</Typography>

          <ul className={classes.twitterList}>
            <li>from:</li>
            <li>to:</li>
            <li>retweets_of:</li>
          </ul>
        </Grid>
        <Grid item xs={12} sm={true}>
          <Typography className={classes.twitterHeading}>Tweet attributes:</Typography>

          <ul className={classes.twitterList}>
            <li>is:retweet</li>
            <li>has:mentions</li>
            <li>has:hashtags</li>
            <li>has:media</li>
            <li>has:videos</li>
            <li>has:images</li>
            <li>has:links</li>
            <li>has:symbols</li>
            <li>is:verified</li>
            <li>-is:nullcast&nbsp;(negation only operator)</li>
          </ul>
        </Grid>
        <Grid item xs={12} sm={true}>
          <Typography className={classes.twitterHeading}>Geospatial operators:</Typography>

          <ul className={classes.twitterList}>
            <li>bounding_box:[west_long south_lat east_long north_lat]</li>
            <li>point_radius:[lon lat radius]</li>
            <li>has:geo</li>
            <li>place:</li>
            <li>place_country:</li>
            <li>has:profile_geo</li>
            <li>profile_country:</li>
            <li>profile_region:</li>
            <li>profile_locality:</li>
          </ul>
        </Grid>
      </Grid>
    </div>
  );
};

export default TopicTwitterHelpPopupContent;
