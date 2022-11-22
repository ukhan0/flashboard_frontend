import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { setSnackBarObj } from '../../reducers/Alerts';

const NotificationAlerts = () => {
  const dispatch = useDispatch();
  const { snackBarObj } = useSelector(state => state.Alerts);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setSnackBarObj(null));
  };

  const anchorOrigin = snackBarObj?.anchorOrigin
    ? snackBarObj.anchorOrigin
    : { vertical: 'bottom', horizontal: 'left' };
  const severity = snackBarObj?.severity ? snackBarObj.severity : 'success';
  const message = snackBarObj?.message ? snackBarObj.message : '';

  return snackBarObj ? (
    <Snackbar
      open={true}
      autoHideDuration={snackBarObj?.autoHideDuration ? snackBarObj?.autoHideDuration : 4000}
      onClose={handleClose}
      anchorOrigin={anchorOrigin}>
      <MuiAlert onClose={handleClose} severity={severity} elevation={6} variant="filled">
        {message}
      </MuiAlert>
    </Snackbar>
  ) : null;
};

export default NotificationAlerts;
