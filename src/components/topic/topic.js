import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, Button, Divider } from '@material-ui/core';
import TopicTextField from './topicTextField';
import TopicTextFieldDropDown from './topicDropDownTextField';
import TopicButtonGroup from './topicButtonGroup';
import TopicDatePickerTextField from './topicDatePickerTextField';
import TopicDialog from './topicDialog';
import TopicSidebar from './TopicSidebar';
import TopicSectorChart from './topicSectorChart';
import TopicCompanyCard from './TopicCompanyCard';
import TopicHeroSection from './topicHeroSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PerfectScrollbar from 'react-perfect-scrollbar';
import TopicHighChart from './topicHighChart';

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
    float: 'right',
    padding: 20
  },
  savebutton: {
    marginTop: 20,
    marginLeft: 80,
    display: 'flex',
    justifyContent: 'flex-end'
  },
  topsection: {
    marginBottom: 15,
    marginTop: 5,
  }
}));

const Topic = () => {
  const classes = useStyles();
  const [showFilters, setShowFilters] = React.useState(false);

  return (
    <div className={classes.root}>
      {showFilters ? (
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
                <h6>Search Universe:</h6>
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
                  <TopicDialog />
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : null}
      <Grid container spacing={4}>
        <Grid item xs={3}>
          <div style={{ height: 600, backgroundColor: '#f5f5f5' }}>
            <div className="p-3 bg-white">
              <Button
                onClick={() => {
                  setShowFilters(!showFilters);
                }}
                variant="contained"
                color="primary"
                className="d-block w-100">
                <span className="btn-wrapper--icon">
                  <FontAwesomeIcon icon={['fas', 'upload']} />
                </span>
                <span className="btn-wrapper--label">Compose new</span>
              </Button>
            </div>
            <Divider />
            <PerfectScrollbar>
              <TopicSidebar />
            </PerfectScrollbar>
          </div>
        </Grid>
        <Grid item xs={9}>
          <div style={{ display: 'flex', flexDirection: 'row', space: 'wrap' }}>
            <Grid item xs={6}>
              <TopicSectorChart />
            </Grid>
            <Grid item xs={6} style={{ marginLeft: 10 }}>
              <TopicCompanyCard />
            </Grid>
          </div>
          <Grid item xs={12}>
            <Card className="card-box mb-4" style={{ height: 400 }}>
              <PerfectScrollbar>
                <TopicHighChart />
              </PerfectScrollbar>
            </Card>
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
