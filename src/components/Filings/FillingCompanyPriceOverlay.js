import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './FilingsResultsTableStyles.css';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock';
import { Paper } from '@material-ui/core';
import clsx from 'clsx';
import moment from 'moment';
import { renameDocumentTypes } from '../topic/topicHelpers';
import { getColorByDocType, getCompanyByTickerUniverse } from './FillingsHelper';
import { formatComapnyData } from '../watchlist/WatchlistHelpers';
import { setSelectedWatchlist } from '../../reducers/Watchlist';
import { useHistory } from 'react-router-dom';
import HighChartDelay from 'highcharts-tooltip-delay';
export default function FilingsTimelineChart() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { priceOverlay, fillingsData } = useSelector(state => state.Filings);
  let data = priceOverlay.map(v => {
    return [parseInt(new Date(v.as_of_date).getTime()), parseFloat(v.close_price)];
  });
  React.useEffect(() => {
    HighChartDelay(Highcharts);
  }, []);

  const newData = fillingsData.map(v => {
    let y = moment(v.document_date).format('YYYY');
    let m = moment(v.document_date).format('M');
    let d = moment(v.document_date).format('D');
    let date = Date.UTC(parseInt(y), parseInt(m - 1), parseInt(d));
    let rename = renameDocumentTypes(v.document_type);

    let title = rename;

    if (rename === 'Earning Call') {
      title = 'EC';
    } else if (title === '8-K') {
      title = '8K';
    } else if (title === '10-K') {
      title = 'K';
    } else if (title === '10-Q') {
      title = 'Q';
    }

    return {
      x: date,
      ticker: v.ticker,
      document_id: v.document_id,
      title: title,
      color: getColorByDocType(v.document_type),
      text: `<strong >${rename}</strong><br/>Document Date: ${moment(v.document_date).format(
        'DD MMMM, YYYY'
      )}<br/>Period Date: ${v.period_date}`
    };
  });

  const options = {
    tooltip: {
      delayForDisplay: 2000
    },
    rangeSelector: {
      selected: 3
    },

    title: {
      text: 'Timeline'
    },

    yAxis: {
      title: {
        text: 'Timeline'
      }
    },
    credits: {
      enabled: false
    },

    series: [
      {
        color: '#A9A9A9',
        name: 'Close Price',
        data: data,
        id: 'dataseries',
        tooltip: {
          valueDecimals: 4
        }
      },
      // {
      //   type: 'flags',
      //   data: newData,
      //   onSeries: 'dataseries',
      //   shape: 'squarepin',
      //   width: 16
      // },
      // {
      //   type: 'flags',
      //   data: newData,
      //   shape: 'circlepin',
      //   width: 16
      // },
      {
        type: 'flags',
        data: newData,
        // color: Highcharts.getOptions().colors[0], // same as onSeries
        // fillColor: Highcharts.getOptions().colors[0],
        fillColor: newData.color,
        events: {
          click: function(event) {
            if (event) {
              let selectedItem = getCompanyByTickerUniverse(event.point.options.ticker, 'all');
              let company = formatComapnyData(selectedItem);
              company.recentId = event.point.options.document_id;
              dispatch(setSelectedWatchlist(company));
              history.push('/sentiment');
            }
          }
        },
        onSeries: 'dataseries',
        width: 16,
        style: {
          color: 'white',
          cursor: 'pointer'
        },
        states: {
          hover: {
            //fillColor: 'white',
          }
        }
      }
    ]
  };
  return (
    <Paper className={clsx('app-page-title')}>
      <div style={{ height: '100%', width: '100%' }}>
        <HighchartsReact highcharts={Highcharts} constructorType={'stockChart'} options={options} />
      </div>
    </Paper>
  );
}
