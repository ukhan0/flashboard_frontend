import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, FormControlLabel, Checkbox,Card } from '@material-ui/core';
import TopicTextField from './topicTextField';
import TopicTextFieldDropDown from './topicDropDownTextField';
import TopicDatePickerTextField from './topicDatePickerTextField';
import TopicCheckBoxField from './topicCheckBoxField';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
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
  savebutton: {
    marginTop: 10,
    display: 'flex',
    justifyContent: 'flex-end'
  }
}));

const Topic = () => {
  const classes = useStyles();
  const [showFilters, setShowFilters] = React.useState(true);

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={6} lg={6}>
          <div className="p-4 mb-4">
            <Grid item xs={12}>
              <Grid item xs={4}>
                <h5>Filling Search</h5>
              </Grid>
            </Grid>
            <Grid item xs={12} className={classes.inflex}>
              <Grid item xs={6}>
                <h6>Filling Search ($ is not required)</h6>
                <TopicTextField text="coronavirus" />
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={6}>
                <h6>Search From (Optional)</h6>
                <TopicTextField text='Enter text like "P1.l1.*" (without quote)' />
              </Grid>
            </Grid>
            <Grid item xs={12} className={classes.inflex}>
              <Grid item xs={3}>
                <h6>Show Filter</h6>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={showFilters}
                      onChange={event => {
                        setShowFilters(event.target.checked);
                      }}
                    />
                  }
                />
              </Grid>
              <Grid item xs={4} style={{ marginLeft: 20 }}>
                <h6>Document Type:</h6>
                <TopicTextFieldDropDown />
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={4}>
                <h6>Sort By:</h6>
                <TopicTextFieldDropDown />
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={2}>
                <h6>Sort By:</h6>
                <TopicTextFieldDropDown />
              </Grid>
            </Grid>
            <Grid item xs={12} className={classes.inflex}>
              <Grid item xs={3}></Grid>
              <Grid item xs={4} style={{ marginLeft: 20 }}>
                <h6> Start Date:</h6>
                <TopicDatePickerTextField />
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={4}>
                <h6>End Date:</h6>
                <TopicDatePickerTextField />
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={2} style={{ marginTop: '5%' }}></Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item xs={6} lg={6}>
          <div className="p-4 mb-4">
            <h6>Smart Synonyms:</h6>
            <Grid item xs={12} className={classes.rightBar}>
              <Grid item xs={4} lg={4}>
                <TopicCheckBoxField />
              </Grid>
              <Grid item xs={4} lg={4}>
                <TopicCheckBoxField />
              </Grid>
              <Grid item xs={4} lg={4}>
                <TopicCheckBoxField />
              </Grid>
            </Grid>
            <Grid item xs={12} className={classes.savebutton}>
              <Button size="small" variant="contained" color="primary" style={{ marginRight: 4 }}>
                Save
              </Button>
              <Button size="small" variant="outlined" color="primary">
                Search
              </Button>
            </Grid>
          </div>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={3} lg={3} style={{marginBottom:15,marginLeft:15}}>
            <div className="bg-midnight-bloom p-3 rounded text-white h-100">
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div className="font-weight-bold font-size-lg d-flex align-items-center mb-3">
                  <span>Insights</span>
                </div>
                <div className="pl-2 d-block text-back"style={{marginTop:"2%"}}>
                  Total : <span style={{ backgroundColor: 'black', borderRadius: 8,padding:2 }}>1000</span>
                </div>
              </div>
              <div className="pl-2 d-block text-back" style={{ backgroundColor: 'grey',padding:5 }}>
                <h5>1. By Document Type</h5>
              </div>
              <div style={{ padding: 10 }}>
                <span>10-Q</span>
                <span style={{ float: 'right', backgroundColor: 'black', borderRadius: 8 ,padding:2}}>18635</span>
              </div>
              <div style={{ padding: 10 }}>
                <span>10-K</span>
                <span style={{ float: 'right', backgroundColor: 'black', borderRadius: 8,padding:2 }}>5691</span>
              </div>
              <div className="pl-2 d-block text-back" style={{ backgroundColor: 'grey',padding:5 }}>
                <h5>2. By Company Name</h5>
              </div>
              <div style={{ padding: 10 }}>
                <span>ImmuCell Corporation</span>
                <span style={{ float: 'right', backgroundColor: 'black', borderRadius: 8,padding:2 }}>18</span>
              </div>
              <div style={{ padding: 10 }}>
                <span>SkinnVisible</span>
                <span style={{ float: 'right', backgroundColor: 'black', borderRadius: 8,padding:2 }}>13</span>
              </div>
              <div style={{ padding: 10 }}>
                <span>Power Solution Internation .inc</span>
                <span style={{ float: 'right', backgroundColor: 'black', borderRadius: 8,padding:2 }}>12</span>
              </div>
            </div>
          </Grid>
          <Grid item xs={8} lg={8}  >
              <Card style={{height:360,width:"106%"}}></Card>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Topic;
