import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card } from '@material-ui/core';
import TopicTextField from './topicTextField';
import TopicTextFieldDropDown from './topicDropDownTextField';
import TopicButtonGroup from './topicButtonGroup';
import TopicDatePickerTextField from './topicDatePickerTextField';
import TopicDialog from './topicDialog';
import TopicSidebar from './TopicSidebar';
import TopicSectorChart from './topicSectorChart';
import TopicCompanyCard from './TopicCompanyCard';
import TopicHeroSection from './topicHeroSection';
import TopicSidebarFooter from './topicFooter';

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
    marginTop: 36,
    float: 'right'
  }
}));

const Topic = () => {
  const classes = useStyles();
  const [showFilters, setShowFilters] = React.useState(true);

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <Grid item xs={8} lg={8} className={classes.herosection}>
            <h6>Search</h6>
            <TopicTextField text="coronavirus" />
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
        </Grid>

        <Grid item xs={4}>
          <Grid item xs={12} className={classes.searchdate}>
            <h6>Search From (Optional)</h6>
            <TopicDatePickerTextField />
          </Grid>
        </Grid>
        <Grid item xs={2} className={classes.savebutton}>
          <TopicDialog />
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={2}>
          <div style={{ height: 600, backgroundColor: '#f5f5f5' }}>
            <TopicSidebar />
            <TopicSidebarFooter />
          </div>
        </Grid>
        <Grid item xs={10}>
          <div style={{ display: 'flex', flexDirection: 'row', space: 'wrap' }}>
            <Grid item xs={6}>
              <TopicSectorChart />
            </Grid>
            <Grid item xs={6} style={{ marginLeft: 10 }}>
              <TopicCompanyCard />
            </Grid>
          </div>
          <Grid item xs={12}>
            <Card className="card-box mb-4" style={{ height: 150 }}></Card>
          </Grid>
          <Grid item xs={12}>
            <TopicHeroSection />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Topic;
