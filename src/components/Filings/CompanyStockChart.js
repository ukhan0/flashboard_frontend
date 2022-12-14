import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './FilingsResultsTableStyles.css';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock';
import moment from 'moment';
import { renameDocumentTypes } from '../topic/topicHelpers';
import { getColorByDocType, getGroupType } from './FillingsHelper';
import { setSelectedWatchlist } from '../../reducers/Watchlist';
import { useHistory } from 'react-router-dom';
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

  const formatDate = value => {
    if (value) {
      return moment(value.split('.')[0]).format('DD MMMM, YYYY');
    } else {
      return '';
    }
  };

  useEffect(() => {
    const newData = props.chartData.map(v => {
      let date = new Date(v.document_date).getTime();
      let rename = renameDocumentTypes(v.document_type);
      let title = getGroupType(v.document_type);
      return {
        x: date,
        ticker: v.ticker,
        document_id: v.document_id,
        title: title,
        color: getColorByDocType(v.document_type),
        text: `<strong >${rename}</strong><br/>Document Date: ${formatDate(v.document_date)}<br/>Period Date:
        ${formatDate(v.period_date)}`
      };
    });

    if (newData.length) {
      setChartData(newData);
    }
  }, [props.chartData]);

  const handleEventClick = event => {
    if (event) {
      selectedItem.recentId = event.point.options.document_id;
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
            width: null,
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
