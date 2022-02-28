import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './FilingsResultsTableStyles.css';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock';
import moment from 'moment';
import { renameDocumentTypes } from '../topic/topicHelpers';
import { getColorByDocType } from './FillingsHelper';
import { setSelectedWatchlist } from '../../reducers/Watchlist';
import { setSentimentResult } from '../../reducers/Sentiment';
import { useHistory } from 'react-router-dom';
import { dateFormaterMoment, parseDateStrMoment } from '../watchlist/WatchlistTableHelpers';
import { setIsFromThemex } from 'reducers/Topic';
export default function FillingCompanyPriceOverlay(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { sidebarToggle, sidebarToggleMobile } = useSelector(state => state.ThemeOptions);
  const { selectedItem } = useSelector(state => state.Watchlist);
  let data = props.chartPriceData.map(v => {
    return [parseInt(new Date(v.as_of_date).getTime()), parseFloat(v.close_price)];
  });
  const newData = props.chartData.map(v => {
    let date = new Date(dateFormaterMoment(parseDateStrMoment(v.document_date.split('.')[0]))).getTime();
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
      )}<br/>Period Date:
      ${moment(v.period_date).format('DD MMMM, YYYY')}
       `
    };
  });

  let latestDate = newData[newData.length - 1];

  const options = {
    rangeSelector: {
      selected: 4
    },

    title: {
      text: `${props.title}`
    },
    tooltip: { distance: 30 },
    xAxis: {
      max: latestDate ? latestDate.x : new Date().getTime()
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
      {
        type: 'flags',
        data: newData,
        dataLabels: {
          allowOverlap: true
        },
        fillColor: newData.color,
        events: {
          click: function(event) {
            if (event) {
              selectedItem.recentId = event.point.options.document_id;
              dispatch(setSentimentResult(null, null));
              dispatch(setSelectedWatchlist(selectedItem));
              dispatch(setIsFromThemex(false));
              history.push('/sentiment');
            }
          }
        },
        onSeries: 'dataseries',
        width: 16,
        style: {
          color: 'white',
          cursor: 'pointer'
        }
      }
    ]
  };

  React.useEffect(() => {
    if (Highcharts.charts[0]) {
      setTimeout(() => {
        Highcharts.charts[0].reflow();
      }, [400]);
    }
  }, [sidebarToggle, sidebarToggleMobile]);
  
  return <HighchartsReact highcharts={Highcharts} constructorType={'stockChart'} options={options} />;
}
