import React, { Fragment, useState, useEffect, useCallback } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Hidden, IconButton, Box, Popover, Button } from '@material-ui/core';
import NotificationsActiveTwoToneIcon from '@material-ui/icons/NotificationsActiveTwoTone';
// import io from 'socket.io-client';
import sound from './Tones.mp3';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { setEmailTemplate } from '../../reducers/Watchlist';
import { useHistory } from 'react-router-dom';
import config from '../../config/config';
import axios from 'axios';
// const socket = io.connect('http://localhost:3001');
// const socket = io.connect('http://localhost:3001', {
//   withCredentials: true,
//   extraHeaders: {
//     'my-custom-header': 'abcd'
//   }
// });

const Notification = () => {
  const dispatch = useDispatch();
  const history = useHistory();
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

  const playSound = () => {
    const audio = new Audio(sound);
    audio.play();
  };

  // const socketNotificationData = useCallback(() => {
  //   try {
  //     console.log('yes');
  //     socket.on('emailN', payload => {
  //       console.log(payload, 'jsdjjjsd');
  //       // setNotification([payload, ...notification]);÷
  //       // if (!payload.is_read) {
  //       //   setCount(count + 1);
  //       //   playSound();
  //       // } else {
  //       //   setCount(count);
  //       // }
  //     });
  //   } catch (error) {
  //     console.log(error, 'sddf');
  //   }
  // }, [count, notification, socket]);

  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  const open1 = Boolean(anchorEl1);
  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  const resetCounter = () => {
    setCount(0);
  };

  const handleEmailTemplate = (t, title) => {
    dispatch(setEmailTemplate({ emailTemplate: t, title: title }));
    history.push('./notification');
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
                        onClick={() => handleEmailTemplate(data.emailTemplate, data.title)}>
                        <div className="timeline-item-offset">{moment(data.created_date).format('LT')}</div>
                        <div className="timeline-item--content">
                          <div className="timeline-item--icon"></div>
                          <h4 className="timeline-item--label mb-2 font-weight-bold">{data.title}</h4>
                          <p>{data.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </PerfectScrollbar>
              </div>
              <div className="text-center py-3">
                <Button variant="outlined" onClick={() => resetCounter()}>
                  Mark As Read
                </Button>
              </div>
            </div>
          </Popover>
        </Box>
      </Hidden>
    </Fragment>
  );
};

export default Notification;
