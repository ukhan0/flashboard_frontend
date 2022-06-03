import React, { useCallback } from 'react';
import { Card } from '@material-ui/core';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { setEmailTemplate } from '../../reducers/Watchlist';
import { useHistory } from 'react-router-dom';
import { setHomePageLoader } from '../../reducers/HomePage';
import axios from 'axios';
import { forEach, get, reverse } from 'lodash';
import config from '../../config/config';

export default function HomepageNotification() {
  const { notifications } = useSelector(state => state.Watchlist);
  const [upcomingCalls, setUpcomingCalls] = React.useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleEmailTemplate = (t, title) => {
    dispatch(setEmailTemplate({ emailTemplate: t, title: title }));
    history.push('./notification');
  };

  const handleNotificationClick = url => {
    window.open(url, '_blank');
  };

  const getNotificationsData = useCallback(async () => {
    dispatch(setHomePageLoader(true));
    const now = moment();
    try {
      const response = await axios.get(`https://financialmodelingprep.com/api/v4/earning-calendar-confirmed`, {
        params: {
          from: now.format('YYYY-MM-DD'),
          to: now.add(1, 'M').format('YYYY-MM-DD'),
          apikey: config.upcomingEarningCalls
        }
      });
      if (response.data.length > 1) {
        const data = get(response, 'data', []);
        reverse(data);
        //place datetime object in all items
        forEach(data, function(item) {
          item['datetime'] = moment(`${item.date}T${item.time}:00`);
        });
        //re-sort data by time in ascending order
        data.sort(function(a, b) {
          return a.datetime - b.datetime;
        });

        setUpcomingCalls(data);
        dispatch(setHomePageLoader(false));
      }
    } catch (error) {
      console.error('Internal server error:', error);
      setUpcomingCalls([]);
      dispatch(setHomePageLoader(false));
    }
  }, [dispatch]);

  React.useEffect(() => {
    getNotificationsData();
  }, [getNotificationsData]);

  return (
    <Card className="card-box mb-4" style={{ height: '600px' }}>
      <div className={clsx('card-header')}>
        <div className="card-header--title font-weight-bold">Notifications</div>
      </div>
      <div>
        <div style={{ height: '500px' }}>
          <PerfectScrollbar>
            <div className="card-header--title font-weight-bold " style={{ textAlign: 'center', padding: '10px' }}>
              Upcoming Earning Calls
            </div>
            {upcomingCalls?.map((data, index) => (
              <div className="timeline-list timeline-list-offset timeline-list-offset-dot" key={index}>
                <div
                  className="timeline-item"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleNotificationClick(data.url)}>
                  <div className="timeline-item-offset">{moment(`${data.date}T${data.time}:00`).format('hh:mm A')}</div>
                  <div className="timeline-item--content">
                    <div className="timeline-item--icon"></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingRight: '20px' }}>
                      <h4 className="timeline-item--label mb-2 ">{data.symbol}</h4>
                      <h4 className="timeline-item--label mb-2 " style={{ textAlign: 'right' }}>
                        {moment(`${data.date}T${data.time}:00`).format('MM/DD/YYYY')}
                      </h4>
                    </div>
                    <p>{data.title}</p>
                  </div>
                </div>
              </div>
            ))}
            <hr></hr>
            {notifications?.map((data, index) => (
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
