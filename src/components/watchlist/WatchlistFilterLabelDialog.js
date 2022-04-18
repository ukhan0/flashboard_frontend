import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  dialog: {
    marginLeft: '20px',
    marginRight: '20px'
  },
  paper: {
    minWidth: '600px'
  }
}));

export default function AlertDialog(props) {
  const [filterLabel, setFilterLabel] = React.useState('');
  const classes = useStyles();
  const hanldeFilterLabel = e => {
    setFilterLabel(e.target.value);
  };
  return (
    <div>
      <Dialog
        open={props.isFilterLabelOpen}
        onClose={() => {
          props.handleCloseAgGridFilterLabelDialog();
        }}
        classes={{ paper: classes.paper }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Screen Name</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TextField
              size="small"
              fullWidth
              value={filterLabel}
              onChange={e => {
                hanldeFilterLabel(e);
              }}
              variant="outlined"
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={filterLabel.length > 2 ? false : true}
            style={{ width: '100px' }}
            variant="contained"
            color="primary"
            onClick={() => {
              props.saveFilter(filterLabel);
              setFilterLabel('');
            }}>
            Save
          </Button>

          <Button
            style={{ width: '100px' }}
            variant="contained"
            color="primary"
            onClick={() => {
              props.handleCloseAgGridFilterLabelDialog();
              setFilterLabel('');
            }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}