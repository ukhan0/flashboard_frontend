import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TopicThemeLabelTextField from './TopicSearchLabelTextField';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useSelector } from 'react-redux';
const useStyles = makeStyles(theme => ({
  dialog: {
    marginLeft: '20px',
    marginRight: '20px'
  },
  paper: {
    minWidth: '600px'
  }
}));

export default function AlertDialog({
  open,
  handleClose,
  handleUpdateSaveSearch,
  handleClickSaveSearch
}) {
  const { showUpdateButton } = useSelector(state => state.Topic);
  const classes = useStyles();
  return (
    <div>
      <Dialog
        open={open}
        onClose={() => {
          handleClose();
        }}
        classes={{ paper: classes.paper }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">ThemeX Label</DialogTitle>
        <DialogContent>
          <TopicThemeLabelTextField />
        </DialogContent>
        <DialogActions>
          <Button
            style={{ width: '100px' }}
            variant="contained"
            color="primary"
            onClick={() => {
              showUpdateButton ?
                handleUpdateSaveSearch()
                :
                handleClickSaveSearch();
            }}>
            Save
          </Button>
          <Button
            style={{ width: '100px' }}
            variant="contained"
            color="primary"
            onClick={() => {
              handleClose();
            }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
