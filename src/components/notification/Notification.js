import React, { Fragment, useState, useEffect, useCallback } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Popover from '@material-ui/core/Popover';
import NotificationsActiveTwoToneIcon from '@material-ui/icons/NotificationsActiveTwoTone';
// import SocketService from '../../socketService';
// import sound from './Tones.mp3';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import config from '../../config/config';
import axios from 'axios';
import { setSearchId } from '../../reducers/Topic';
import { setIsNewEmailNotification } from '../../reducers/User';
import { useDispatch } from 'react-redux';
import SocketService from '../../socketService';
import NewNotificationSnackbarAlert from './NotificationSnackbarAlert';
import { get } from 'lodash';

const Notification = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [anchorEl1, setAnchorEl1] = useState(null);
  const [count, setCount] = useState(0);
  const { notifications } = useSelector(state => state.Watchlist);

  const getNotifications = useCallback(() => {
    let countSum = 0;
    notifications.forEach(element => {
      if (!element.is_read) {
        countSum = countSum + 1;
      }
      setCount(countSum);
    });
  }, [notifications]);

  useEffect(() => {
    getNotifications();
  }, [getNotifications]);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && SocketService.socket) {
      SocketService.socket.connect();
      SocketService.socket.emit('join_room', user.id);
      SocketService.socket.on(user.id, function(data) {
        if (get(data, 'status', false)) {
          dispatch(setIsNewEmailNotification(true));
        }
      });
    }
  }, [dispatch]);

  const open1 = Boolean(anchorEl1);
  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  const resetCounter = () => {
    setCount(0);
  };

  const handleEmailTemplate = (link, id) => {
    if (id && window.location.pathname === '/topic') {
      dispatch(setSearchId(id));
    }
    history.push(link);
    handleClose1();
  };
  const deleteNotification = async () => {
    try {
      await axios.delete(`${config.apiUrl}/api/email/notification`);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClick1 = event => {
    setAnchorEl1(event.currentTarget);
    resetCounter();
    deleteNotification();
  };
  const getTitle = data => {
    let title = get(data, 'title', '');
    if (title.toLocaleLowerCase() === 'FMP-Transcript'.toLocaleLowerCase()) {
      title = 'Earning Calls';
    }
    if (title.toLowerCase() === 'ThemeX Alert'.toLocaleLowerCase()) {
      title = `ThemeX (${get(data, 'topic', '')})`;
    }
    return title;
  };

  const getTime = v => {
    return moment.unix(v).format('hh:mm A');
  };

  const getNotificationDescription = data => {
    let tweetDescription = '';
    let tickerArr = get(data, 'tickerArr', null);
    if (tickerArr) {
      tweetDescription = tickerArr.length > 3 ? tickerArr.slice(0, 3).join(',') + '...' : tickerArr.join(',');
    } else {
      tweetDescription = data.description;
    }

    return tweetDescription;
  };
  return (
    <Fragment>
      <Hidden>
        <Box component="span">
          <IconButton onClick={handleClick1} color="inherit" className="btn-inverse mx-1 d-50">
            {count > 0 ? <div className="badge badge-pill badge-danger badge-header">{count}</div> : null}
            <NotificationsActiveTwoToneIcon />
          </IconButton>
          <Popover
            open={open1}
            anchorEl={anchorEl1}
            onClose={handleClose1}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
            PaperProps={{
              style: { marginTop: '5px', width: '400px' }
            }}>
            <div className="popover-custom-lg overflow-hidden">
              <div
                className="bg-composed-wrapper border-0 text-center rounded-sm m-2"
                style={{ backgroundColor: '#3d4977' }}>
                <div className="bg-composed-wrapper--content text-light px-2 py-4">
                  <p className="opacity-8 mb-0">
                    You have <b className="text-success">{notifications.length}</b> new messages.
                  </p>
                </div>
              </div>
              <div className="height-280">
                <PerfectScrollbar>
                  {notifications.map((data, index) => (
                    <div className="timeline-list timeline-list-offset timeline-list-offset-dot" key={index}>
                      <div
                        className="timeline-item"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleEmailTemplate(data.link, get(data, 'searchId', null))}>
                        <div className="timeline-item-offset">{getTime(get(data, 'email_time', null))}</div>
                        <div className="timeline-item--content">
                          <div className="timeline-item--icon"></div>
                          <h4 className="timeline-item--label mb-2 font-weight-bold"> {getTitle(data)}</h4>
                          <p>{getNotificationDescription(data)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </PerfectScrollbar>
              </div>
              {/* <div className="text-center py-3">
                <Button variant="outlined" onClick={() => resetCounter()}>
                  Mark As Read
                </Button>
              </div> */}
            </div>
          </Popover>
        </Box>
      </Hidden>
      <NewNotificationSnackbarAlert />
    </Fragment>
  );
};

export default Notification;
