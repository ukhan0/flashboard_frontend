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

  const handleNotificationClick = url => {
    window.open(url, '_blank');
  };

  const getNotificationsData = async () => {
    dispatch(setHomePageLoader(true));
    const now = moment();
    try {
      const response = await axios.get(`https://financialmodelingprep.com/api/v4/earning-calendar-confirmed`, {
        params: {
          from: now.format('YYYY-MM-DD'),
          to: now.add(1, 'M').format('YYYY-MM-DD'),
          apikey: 'c5ceb6f582038248f453e7318e934528'
        }
      });
      const data = get(response, 'data', []);
      if (response) {
        setNotificationData(data);
        dispatch(setHomePageLoader(false));
      }
    } catch (error) {
      console.log(error);
      setNotificationData([]);
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
      </div>
      <div>
        <div style={{ height: '500px' }}>
          <PerfectScrollbar>
            <div className="card-header--title font-weight-bold " style={{ textAlign: 'center', padding: '10px' }}>
              Upcoming Earning Calls
            </div>
            {notificationData.map((data, index) => (
              <div className="timeline-list timeline-list-offset timeline-list-offset-dot" key={index}>
                <div
                  className="timeline-item"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleNotificationClick(data.url)}>
                  <div className="timeline-item-offset">
                    {moment(data.date + 'T' + data.time + ':' + '00').format('hh:mm A')}
                  </div>
                  <div className="timeline-item--content">
                    <div className="timeline-item--icon"></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingRight: '20px' }}>
                      <h4 className="timeline-item--label mb-2 ">{data.symbol}</h4>
                      <h4 className="timeline-item--label mb-2 " style={{ textAlign: 'right' }}>
                        {moment(data.date + 'T' + data.time + ':' + '00').format('DD-MM-YYYY')}
                      </h4>
                    </div>
                    <p>{data.title}</p>
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
