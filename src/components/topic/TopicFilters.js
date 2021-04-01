import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import TopicTextField from './TopicTextField';
import TopicTextFieldDropDown from './TopicDropDownTextField';
import TopicButtonGroup from './TopicButtonGroup';
import TopicDatePickerTextField from './TopicDatePickerTextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const useStyles = makeStyles(theme => ({
  topsection: {
    marginBottom: 15,
    marginTop: 5,
  }
}));

const TopicFilters = (props) => {
  const classes = useStyles();
  return (
    <Grid container direction="row" justify="space-between" alignItems="flex-start" className={classes.topsection}>
      <Grid item xs={8}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <h6>Search</h6>
            <TopicTextField text="coronavirus" />
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={3}>
            <h6>Document Type:</h6>
            <TopicTextFieldDropDown />
          </Grid>
          <Grid item xs={3}>
            <h6 className="text-black-50">Search Universe:</h6>
            <TopicButtonGroup />
          </Grid>
          <Grid item xs={6}></Grid>
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
              <div>
                <h6>Search From (Optional)</h6>
                <TopicDatePickerTextField />
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
              <Button variant="contained" color="primary" onClick={props.perfromSearch}>
                Search
              </Button>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
};

export default TopicFilters;
