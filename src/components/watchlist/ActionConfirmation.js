import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ActionConfirmation(props) {
  return (
    <Dialog open={props.isOpen} onClose={props.disAgree}>
      <DialogTitle id="alert-dialog-title">{'Are you sure?'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          You can going to clear the ${props.actionName}. Are you sure?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.disAgree} color="primary">
          Disagree
        </Button>
        <Button onClick={props.Agree} color="primary" autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}
