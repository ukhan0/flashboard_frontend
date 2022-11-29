import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { setSnackBarObj } from '../../reducers/Alerts';
import { get } from 'lodash';

const NotificationAlerts = () => {
  const dispatch = useDispatch();
  const { snackBarObj } = useSelector(state => state.Alerts);

  const autoHideDuration = get(snackBarObj, 'autoHideDuration', 4000);
  const anchorOrigin = get(snackBarObj, 'anchorOrigin', { vertical: 'bottom', horizontal: 'left' });
  const topMargin = get(snackBarObj, 'topMargin', null);
  const severity = get(snackBarObj, 'severity', 'success');
  const elevation = get(snackBarObj, 'elevation', 6);
  const variant = get(snackBarObj, 'variant', 'filled');
  const message = get(snackBarObj, 'message', '');

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setSnackBarObj(null));
  };

  return snackBarObj ? (
    <Snackbar
      open={true}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={anchorOrigin}
      style={{ top: topMargin }}
    >
      <MuiAlert
        onClose={handleClose}
        severity={severity}
        elevation={elevation}
        variant={variant}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  ) : null;
};

export default NotificationAlerts;
