import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, FormControlLabel, Checkbox, Card } from '@material-ui/core';
import TopicTextField from './topicTextField';
import TopicTextFieldDropDown from './topicDropDownTextField';
import TopicButtonGroup from './topicButtonGroup';
import TopicDatePickerTextField from './topicDatePickerTextField';
import TopicCheckBoxField from './topicCheckBoxField';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  herosection: {
    marginLeft: 80
  },
  searchuniverse: {
    marginLeft: 30
  },
  rightBar: {
    padding: theme.spacing(1),
    height: 235,
    border: '1px solid black',
    overflow: 'scroll',
    display: 'flex',
    flexDirection: 'row'
  },
  inflex: {
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'row'
  },
  searchdate: {
    marginTop: 10,
    float: 'right'
  },
  savebutton: {
    marginTop: 10,
    float: 'right'
  }
}));

const Topic = () => {
  const classes = useStyles();
  const [showFilters, setShowFilters] = React.useState(true);

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={6} className={classes.inflex}>
          <Grid item xs={8} lg={8} className={classes.herosection}>
            <h6>Search</h6>
            <TopicTextField text="coronavirus" />
          </Grid>
        </Grid>
        <Grid item xs={5}>
          <Grid item xs={12} className={classes.searchdate}>
            <h6>Search From (Optional)</h6>
            <TopicDatePickerTextField />
          </Grid>
          <Grid></Grid>
        </Grid>
        <Grid item xs={6} className={classes.inflex}>
          <Grid item xs={4} className={classes.herosection}>
            <h6>Document Type:</h6>
            <TopicTextFieldDropDown />
          </Grid>
          <Grid item xs={4} className={classes.searchuniverse}>
            <h6>Search Universe:</h6>
            <TopicButtonGroup />
          </Grid>
        </Grid>
        <Grid item xs={5}>
          <Button color="primary" variant="contained" className={classes.savebutton}>
            Save
          </Button>
        </Grid>
      </Grid>
      <h6>Ajmal</h6>
    </div>
  );
};

export default Topic;
