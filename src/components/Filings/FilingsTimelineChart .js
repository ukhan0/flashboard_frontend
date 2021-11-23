import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './FilingsResultsTableStyles.css';
import { setSelectedWatchlist } from '../../reducers/Watchlist';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { formatComapnyData } from '../watchlist/WatchlistHelpers';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import highchartsGantt from 'highcharts/modules/timeline';
import { renameDocumentTypes } from '../topic/topicHelpers';
import { Paper } from '@material-ui/core';
import clsx from 'clsx';
import { getCompanyByTickerUniverse, getColorByDocType } from './FillingsHelper';
export default function FilingsTimelineChart() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { fillingsData } = useSelector(state => state.Filings);

  const graphData = fillingsData.map(v => {
    let y = moment(v.document_date).format('YYYY');
    let m = moment(v.document_date).format('M');
    let d = moment(v.document_date).format('D');
    let date = Date.UTC(parseInt(y), parseInt(m), parseInt(d));
    return {
      ticker: v.ticker,
      document_id: v.document_id,
      document_type: renameDocumentTypes(v.document_type),
      name: `<strong >${renameDocumentTypes(v.document_type)}</strong>`,
      x: date,
      description: `Document Date: ${moment(v.document_date).format('DD MMMM, YYYY')}<br/>Period Date: ${moment(
        v.period_date
      ).format('DD MMMM, YYYY')}`,
      color: getColorByDocType(v.document_type)
    };
  });

  const options = {
    chart: {
      zoomType: 'x',
      type: 'timeline',
      height: '150px'
    },
    xAxis: {
      type: 'datetime',
      visible: true
    },
    yAxis: {
      gridLineWidth: 1,
      title: null,
      labels: {
        enabled: false
      }
    },
    legend: {
      enabled: false
    },
    title: {
      text: 'Time Series'
    },
    subtitle: {
      text: null
    },
    tooltip: {
      style: {
        width: 300
      }
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      series: {
        cursor: 'pointer',
        point: {
          events: {
            click: function() {
              if (this) {
                let selectedItem = getCompanyByTickerUniverse(this.ticker, 'all');
                let company = formatComapnyData(selectedItem);
                company.recentId = this.document_id;
                dispatch(setSelectedWatchlist(company));
                history.push('/sentiment');
              }
            }
          }
        }
      }
    },
    series: [
      {
        dataLabels: {
          allowOverlap: false,
          format: '<strong >{point.document_type}</strong>'
        },
        marker: {
          symbol: 'circle'
        },
        data: graphData
      }
    ]
  };
  return (
    <Paper className={clsx('app-page-title')}>
      <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
        <HighchartsReact highcharts={highchartsGantt(Highcharts)} options={options} />
      </div>
    </Paper>
  );
}
