import React, { useCallback } from 'react';
import { Card, ButtonGroup, Button } from '@material-ui/core';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setHomePageLoader } from '../../reducers/HomePage';
import axios from 'axios';
import { forEach, get, reverse } from 'lodash';
import config from '../../config/config';
import { earningsCallType } from '../../config/filterTypes';
import { setSearchId } from '../../reducers/Topic';
import { getUpCommingCallsType, storeUpCommingCallsType } from './HomePageHelpers';

export default function HomepageNotification() {
  const { notifications } = useSelector(state => state.Watchlist);
  const { globalWatchlist, domesticWatchlist } = useSelector(state => state.HomePage);
  const [upcomingCalls, setUpcomingCalls] = React.useState([]);
  const [upComingCallType, setUpComingCallType] = React.useState('all');
  const [filterData, setFilterData] = React.useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleEmailTemplate = (link, id) => {
    if (id && window.location.pathname === '/topic') {
      dispatch(setSearchId(id));
    }
    history.push(link);
  };

  const handleNotificationClick = data => {
    window.open(data.url, '_blank');
  };

  const getEarningsCalls = useCallback(async () => {
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
    } catch (error) {
      console.error('Internal server error:', error);
      setUpcomingCalls([]);
      dispatch(setHomePageLoader(false));
    }
  }, [dispatch]);

  const getSelectedData = useCallback(() => {
    let finalData = [];
    let watchlist = globalWatchlist.concat(domesticWatchlist);
    upcomingCalls.forEach(u => {
      let ticker = watchlist.find(sd => sd.ticker === u.symbol);
      if (ticker) {
        finalData.push(u);
      }
    });
    setFilterData(finalData);
  }, [globalWatchlist, domesticWatchlist, upcomingCalls]);

  React.useEffect(() => {
    setUpComingCallType(getUpCommingCallsType());
    getEarningsCalls();
  }, [getEarningsCalls, dispatch]);

  React.useEffect(() => {
    getSelectedData();
  }, [getSelectedData]);
  const handleUpType = key => {
    storeUpCommingCallsType(key);
    setUpComingCallType(key);
  };
  const getTime = v => {
    return moment.unix(v).format('hh:mm A');
  };
  return (
    <Card className="card-box mb-4" style={{ height: '100%' }}>
      <div className={clsx('card-header')}>
        <div className="card-header--title font-weight-bold drag-handle">Notifications</div>
        <ButtonGroup color="primary">
          {earningsCallType.map((type, i) => (
            <Button
              size="small"
              key={`diff_${i}`}
              onClick={() => handleUpType(type.key)}
              variant={type.key === upComingCallType ? 'contained' : 'outlined'}>
              {type.label}
            </Button>
          ))}
        </ButtonGroup>
      </div>
      <div>
        <div style={{ height: '600px' }}>
          <PerfectScrollbar>
            <div className="card-header--title font-weight-bold " style={{ textAlign: 'center', padding: '10px' }}>
              Upcoming Calls
            </div>
            {(upComingCallType === 'all' ? upcomingCalls : filterData).map((data, index) => (
              <div className="timeline-list timeline-list-offset timeline-list-offset-dot" key={index}>
                <div
                  className="timeline-item"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleNotificationClick(data)}>
                  <div className="timeline-item-offset" style={{ width: '60px', textAlign: 'center' }}>
                    {moment(`${data.date}T${data.time}:00`).format('hh:mm A') + '(ET)'}
                  </div>
                  <div className="timeline-item--content">
                    <div className="timeline-item--icon"></div>
                    <div style={{ display: 'flex', justify: 'space-between', paddingRight: '20px' }}>
                      <h4 className="timeline-item--label mb-2 ">{data.symbol}  &nbsp; {moment(`${data.date}T${data.time}:00`).format('MM/DD/YYYY')}</h4>
                    </div>
                    <p>{data.title}</p>
                  </div>
                </div>
              </div>
            ))}
            <hr></hr>
            {notifications.map((data, index) => (
              <div className="timeline-list timeline-list-offset timeline-list-offset-dot" key={index}>
                <div
                  className="timeline-item"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleEmailTemplate(data.link, get(data, 'searchId', null))}>
                  <div className="timeline-item-offset">{getTime(get(data, 'email_time', null))}</div>
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
