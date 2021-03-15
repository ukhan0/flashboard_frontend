import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Grid } from '@material-ui/core';
import TopicDialogCheckBox from './topicDialogCheckBoxField';

export default function TopicDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Save
      </Button>
      <Dialog maxWidth="lg" open={open} onClose={handleClose} >
        <DialogTitle id="max-width-dialog-title">Smart Synonums</DialogTitle>
        <DialogContent>
          <DialogContentText style={{padding:20}}>
            <Grid container spacing={4}>
              <Grid item xs={7} style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#f5f5f5' }}>
                <Grid item xs={6} >
                  <TopicDialogCheckBox />
                  </Grid>
                  <Grid item xs={6} >
                  <TopicDialogCheckBox />
                </Grid>
              </Grid>
              <Grid item xs={4} style={{ backgroundColor: '#f5f5f5',marginLeft:10 }}>
                <TopicDialogCheckBox />
              </Grid>
            </Grid>
            <Grid container spacing={4} style={{marginTop:30}}>
              <Grid item xs={7} style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#f5f5f5'}}>
                <Grid item xs={6} >
                  <TopicDialogCheckBox />
                  </Grid>
                  <Grid item xs={6} >
                  <TopicDialogCheckBox />
                </Grid>
              </Grid>
              <Grid item xs={4} style={{ backgroundColor: '#f5f5f5',marginLeft:10 }}>
                <TopicDialogCheckBox />
              </Grid>
            </Grid>
            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
