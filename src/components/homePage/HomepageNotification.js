import React from 'react';
import { Card } from '@material-ui/core';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { setEmailTemplate } from '../../reducers/Watchlist';
import { useHistory } from 'react-router-dom';
export default function HomepageNotification() {
  const { notifications } = useSelector(state => state.Watchlist);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleEmailTemplate = (t, title) => {
    dispatch(setEmailTemplate({ emailTemplate: t, title: title }));
    history.push('./notification');
  };

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
