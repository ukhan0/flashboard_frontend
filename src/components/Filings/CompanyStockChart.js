import React, { useEffect, useState } from 'react';
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
  const { selectedItem } = useSelector(state => state.Watchlist);
  const [priceData, setPirceData] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    let data = props.chartPriceData.map(v => {
      return [parseInt(new Date(v.as_of_date).getTime()), parseFloat(v.close_price)];
    });
    setPirceData(data);
  }, [props.chartPriceData]);

  useEffect(() => {
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

    if (newData.length) {
      setChartData(newData);
    }
  }, [props.chartData]);

  const handleEventClick = event => {
    if (event) {
      selectedItem.recentId = event.point.options.document_id;
      dispatch(setSentimentResult(null, null));
      dispatch(setSelectedWatchlist(selectedItem));
      dispatch(setIsFromThemex(false));
      history.push('/sentiment');
    }
  };

  return priceData && chartData ? (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={'stockChart'}
      options={{
        chart: {
          height: props.height ? props.height : ''
        },
        rangeSelector: {
          selected: 4
        },

        title: {
          text: `${props.title}`
        },
        tooltip: { distance: 30, split: false },

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
            data: priceData,
            id: 'dataseries',
            tooltip: {
              valueDecimals: 4
            }
          },
          {
            type: 'flags',
            data: chartData,
            dataLabels: {
              allowOverlap: true
            },
            fillColor: null,
            events: {
              click: handleEventClick
            },
            onSeries: 'dataseries',
            width: 16,
            style: {
              color: 'white',
              cursor: 'pointer'
            }
          }
        ]
      }}
    />
  ) : null;
}
