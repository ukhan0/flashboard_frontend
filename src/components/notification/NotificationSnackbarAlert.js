import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import notificationTune from './notificationTune.mp3';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { cloneDeep } from 'lodash';

const NewNotificationSnackbarAlert = () => {
  const doNotShowOnReload = useRef(0);
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
    if (doNotShowOnReload.current === 2) {
      const unreadNoti = notifications.filter(notification => !notification.is_read);
      if (unreadNoti.length) {
        setUnreadNotifications(unreadNoti.slice(0, 2));
        const audio = new Audio(notificationTune);
        audio.volume = 0.5;
        audio.play();
      }
    } else if (doNotShowOnReload.current === 0) {
      doNotShowOnReload.current = 1;
    } else {
      doNotShowOnReload.current = 2;
    }
  }, [notifications]);

  return (
    <>
      {unreadNotifications.map((unreadNotification, index) => {
        return (
          <div key={index}>
            <Snackbar
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
          </div>
        );
      })}
    </>
  );
};

export default React.memo(NewNotificationSnackbarAlert);
