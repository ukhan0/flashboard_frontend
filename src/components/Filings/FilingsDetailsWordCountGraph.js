import React, { Fragment } from 'react';
import { Grid, Card, Divider } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty, get } from 'lodash';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import FillingRevenueGraph from './FilingsCompanyRevenueGraph';
import config from '../../config/config';
import { sectionIds } from './FillingsHelper';
import { useHistory } from 'react-router-dom';
import { setSelectedWatchlist } from '../../reducers/Watchlist';
import { setIsFromThemex } from '../../reducers/Topic';
import { setIsFromfilling, setSelectedHeadingId } from '../../reducers/Sentiment';
Highcharts.setOptions({
  lang: {
    thousandsSep: ','
  }
});

const FilingsDetailsGraph = props => {
  const { fillingsGraphData, filingsRevenueData, isWordCountChart, isEntitiesChart } = useSelector(
    state => state.Filings
  );
  const { selectedItem } = useSelector(state => state.Watchlist);
  const dispatch = useDispatch();
  const history = useHistory();
  let hideGraphs = config.hideGraph;
  const isEntities = filingsRevenueData.length > 0 ? true : false;
  const isGraph = fillingsGraphData.length > 0 ? true : false;
  const graphSize = hideGraphs === 'false' ? (!isEntities && isGraph ? 12 : 6) : 12;
  const entitiesGraphSize = !isGraph && isEntities && isWordCountChart ? 12 : 6;

  let mdas = [];
  let risks = [];
  let notes = [];
  let dates = [];
  let document_id = [];
  if (!isEmpty(fillingsGraphData)) {
    dates = fillingsGraphData.map(s => s.document_date);
    document_id = fillingsGraphData.map(s => s.document_id);
    mdas = fillingsGraphData.map(s => get(s, 'mda.wwwccc', 0), { d: 12 });
    risks = fillingsGraphData.map(s => get(s, 'risk_factors.wwwccc', 0));
    notes = fillingsGraphData.map(s => get(s, 'notes.wwwccc', 0));
  }
  const options = {
    chart: {
      type: 'column'
    },
    title: {
      text: null
    },
    xAxis: {
      categories: dates,
      data: document_id
    },
    yAxis: {
      visible: false,
      labels: {
        enabled: false
      },
      title: {
        text: null
      }
    },
    legend: {
      align: 'right',
      x: -30,
      verticalAlign: 'top',
      y: 25,
      floating: true,
      backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || 'white',
      borderColor: '#CCC',
      borderWidth: 1,
      shadow: false
    },
    credits: {
      enabled: false
    },
    tooltip: {
      headerFormat: '<b>{point.x}</b><br/>',
      pointFormat: '{series.name} WORD COUNT: {point.y}<br/>'
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: true
        }
      },
      series: {
        cursor: 'pointer',
        point: {
          events: {
            click: function() {
              if (this) {
                let recentId = this.series.chart.options.xAxis[0].data[this.index];
                if (recentId) {
                  // recentId = recentId.toString().replace('9000', '');
                  selectedItem.recentId = recentId;
                  dispatch(setSelectedWatchlist(selectedItem));
                  dispatch(setIsFromfilling(true));
                  dispatch(setIsFromThemex(false));
                  dispatch(setSelectedHeadingId(sectionIds[this.series.name] || ''));
                  history.push('/sentiment');
                }
              }
            }
          }
        }
      }
    },

    series: [
      {
        minPointLength: 10,
        name: 'RISK',
        data: risks.filter(e => e),
        color: '#ff98a4'
      },
      {
        minPointLength: 10,
        name: 'NOTES',
        data: notes.filter(e => e),
        color: '#7fc8fd'
      },
      {
        minPointLength: 10,
        name: 'MDA',
        data: mdas.filter(e => e),
        color: '#7fe4a6'
      }
    ]
  };

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid
          item
          xs={entitiesGraphSize}
          md={entitiesGraphSize}
          lg={entitiesGraphSize}
          style={{ display: !isEntities && isEntitiesChart ? 'none' : 'block' }}>
          <div>{hideGraphs === 'false' ? <FillingRevenueGraph /> : null}</div>
        </Grid>
        <Grid item xs={12} md={graphSize} lg={graphSize}>
          {isGraph ? (
            <Card className="mb-4">
              <div className="card-header-alt d-flex justify-content-between p-4">
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <div>
                      <h6 className="font-weight-bold font-size-lg mb-1 text-black">Word Count</h6>
                      <p className="text-black-50 mb-0">Changes in Major items over time</p>
                    </div>
                  </Grid>
                </Grid>
              </div>
              <div className="mx-4 divider" />
              <div className="mx-4 divider" />
              <div className="p-4">
                <Grid container spacing={4}>
                  <Grid item xs={12} md={12}>
                    <HighchartsReact highcharts={Highcharts} options={options} />
                  </Grid>
                </Grid>
                <Divider />
                <Divider />
              </div>
            </Card>
          ) : null}
        </Grid>
      </Grid>
    </Fragment>
  );
};
export default React.memo(FilingsDetailsGraph);
