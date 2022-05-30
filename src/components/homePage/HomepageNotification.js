import React from 'react';
import { Card } from '@material-ui/core';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { setEmailTemplate } from '../../reducers/Watchlist';
import { useHistory } from 'react-router-dom';
import { setHomePageLoader } from '../../reducers/HomePage';
import axios from 'axios';
import { get } from 'lodash';

export default function HomepageNotification() {
  const { notifications } = useSelector(state => state.Watchlist);
  const [notificationData, setNotificationData] = React.useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleEmailTemplate = (t, title) => {
    dispatch(setEmailTemplate({ emailTemplate: t, title: title }));
    history.push('./notification');
  };
  const getNotificationsData = async () => {
    dispatch(setHomePageLoader(true));
    try {
      const response = await axios.get(
        `https://financialmodelingprep.com/api/v4/earning-calendar-confirmed`,
        {
          params: {
            from:"2022-05-27",
            to:"2022-06-30",
            apikey:"c5ceb6f582038248f453e7318e934528"
          }
        }
        );
      const data = get(response, 'data', []);
      if (response) {
        console.log('notif:', notifications);
        console.log('resp', data);
        setNotificationData(data);
        dispatch(setHomePageLoader(false));
      }
    } catch (error) {
      console.log(error)
      setNotificationData([]),
      dispatch(setHomePageLoader(false));
    }
  };

  React.useEffect(() => {
    getNotificationsData();
  }, []);

  return (
    <Card className="card-box mb-4" style={{ height: '600px' }}>
      <div className={clsx('card-header')}>
        <div className="card-header--title font-weight-bold">Notifications</div>
        <div className="card-header--title font-weight-bold"> </div>
      </div>
      <div>
        <div style={{ height: '500px' }}>
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
      </div>
    </Card>
  );
}
