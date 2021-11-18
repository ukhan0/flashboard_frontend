import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './FilingsResultsTableStyles.css';
import { setSelectedWatchlist } from '../../reducers/Watchlist';
import { useHistory } from 'react-router-dom';
import cjson from 'compressed-json';
import moment from 'moment';
import { formatComapnyData } from '../watchlist/WatchlistHelpers';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import highchartsGantt from 'highcharts/modules/timeline';
import { renameDocumentTypes } from '../topic/topicHelpers';
import { Paper } from '@material-ui/core';
import clsx from 'clsx';
export default function FilingsTimelineChart() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { fillingsData } = useSelector(state => state.Filings);

  const graphData = fillingsData.map(v => {
    return {
      ticker: v.ticker,
      document_id: v.document_id,
      document_type: renameDocumentTypes(v.document_type),
      name: `<strong >${renameDocumentTypes(v.document_type)}</strong>`,

      description: `Document Date: ${moment(v.document_date).format('DD MMMM, YYYY')}<br/>Period Date: ${moment(
        v.period_date
      ).format('DD MMMM, YYYY')}`
    };
  });
  const getCompanyByTicker = ticker => {
    let rawData = localStorage.getItem(`watchlist-data-all`);
    if (rawData) {
      rawData = cjson.decompress.fromString(rawData);
    }
    let company = rawData.find(sd => sd.ticker === ticker);

    return company;
  };
  const options = {
    chart: {
      zoomType: 'x',
      type: 'timeline'
    },
    xAxis: {
      type: 'datetime',
      visible: false
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
      text: 'Timeline of Document Filings'
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
                let selectedItem = getCompanyByTicker(this.ticker);
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
