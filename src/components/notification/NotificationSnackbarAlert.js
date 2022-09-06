import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import notificationTune from './notificationTune.mp3';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { cloneDeep } from 'lodash';

const NewNotificationSnackbarAlert = () => {
  const [unreadNotifications, setUnreadNotifications] = useState([]);
  const { notifications } = useSelector(state => state.Watchlist);

  const Alert = props => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  const handleClose = index => {
    let copy = cloneDeep(unreadNotifications);
    copy.splice(index, 1);
    setUnreadNotifications(copy);
  };

  const autoHideHandler = (index, reason) => {
    if (reason === 'timeout') {
      setUnreadNotifications([]);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      const unreadNoti = notifications.filter(notification => !notification.is_read);
      if (unreadNoti.length > 0) {
        setUnreadNotifications(unreadNoti);
        let audio = new Audio(notificationTune);
        audio.play();
      } else {
        setUnreadNotifications([]);
      }
    }, [3000]);
  }, [notifications]);

  return (
    <>
      {unreadNotifications.map((unreadNotification, index) => {
        return (
          <Snackbar
            key={index}
            style={{ marginBottom: index * 55 }}
            open={true}
            autoHideDuration={5000}
            onClose={(event, reason) => {
              autoHideHandler(index, reason);
            }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
            <Alert
              onClose={() => {
                handleClose(index);
              }}
              severity={'info'}>
              {`${unreadNotification.title} (${unreadNotification.description})`}
            </Alert>
          </Snackbar>
        );
      })}
    </>
  );
};

export default React.memo(NewNotificationSnackbarAlert);
