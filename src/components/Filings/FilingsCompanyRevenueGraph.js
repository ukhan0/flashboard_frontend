import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './FilingsResultsTableStyles.css';
import { useHistory } from 'react-router-dom';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import highchartsGantt from 'highcharts/highcharts-more';
import { setIsFromSideBar, setIsFromThemex } from '../../reducers/Topic';
import { setFillingsSearchText } from '../../reducers/Filings';
import { Grid, Card, Divider, ButtonGroup, Button } from '@material-ui/core';
import { orderBy } from 'lodash';
import { entityTypes } from '../../config/filterTypes';

export default function FilingsCompanyRevenueGraph() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { filingsRevenueData } = useSelector(state => state.Filings);
  let caculateStrength = filingsRevenueData.map(v => {
    return { ...v, strength: v.newCount - v.oldCount };
  });
  // const filterData = caculateStrength.filter(v => v.oldCount > 0 && v.newCount > 0);
  const filterData = caculateStrength;

  let filterDataSorted = orderBy(filterData, ['strength'], ['desc']);

  let finalResult = filterDataSorted;
  let filingsRevenue1 = finalResult.map(v => {
    return { name: v.name, low: -v.oldCount, high: 0 };
  });
  let filingsRevenue2 = finalResult.map(v => {
    return { name: v.name, low: 0, high: v.newCount };
  });

  const options = {
    chart: {
      type: 'columnrange',
      inverted: true,
      panning: true,
      panKey: 'shift'
    },

    legend: {
      enabled: false
    },

    title: {
      text: null
    },

    tooltip: {
      enabled: false
    },

    xAxis: {
      type: 'category',
      min: 0,
      max: 10,
      scrollbar: {
        enabled: true
      },
      tickLength: 0
    },
    credits: {
      enabled: false
    },

    yAxis: {
      title: {
        text: 'Mentions'
      },
      labels: {
        formatter: function() {
          return Math.abs(this.value);
        }
      },
      gridLineColor: '#197F07',
      gridLineWidth: 0,
      lineWidth: 1,
      plotLines: [
        {
          color: '#888888',
          width: 1,
          value: 0,
          zIndex: 4
        }
      ]
    },

    plotOptions: {
      columnrange: {
        negativeColor: 'red',
        dataLabels: {
          enabled: true,
          grouping: true,
          formatter: function() {
            if (this.y === 0) return '';
            else return Math.abs(this.y);
          }
        }
      },
      series: {
        lineWidth: 10,
        cursor: 'pointer',
        point: {
          events: {
            click: function() {
              if (this) {
                dispatch(setIsFromSideBar(false));
                dispatch(setFillingsSearchText(this.name));
                dispatch(setIsFromThemex(false));
                history.push('/sentiment');
              }
            }
          }
        }
      }
    },
    series: [
      {
        name: 'Mentions',
        data: filingsRevenue1.concat(filingsRevenue2),
        dataLabels: {
          enabled: true
        }
      }
    ]
  };
  return (
    <>
      <Card className="mb-4">
        <div className="card-header-alt d-flex justify-content-between p-4">
          <Grid container spacing={3}>
            <Grid container alignItems="center" xs={12}>
              <Grid item xs={6}>
                <h6 className="font-weight-bold font-size-lg mb-1 text-black">Entities Mentioned</h6>
                <p className="text-black-50 mb-0">Old vs New Entities Mentioned</p>
              </Grid>
              <Grid item xs={6} style={{ textAlign: 'right', paddingRight: '15px' }}>
                <ButtonGroup color="primary">
                  {entityTypes.map((type, i) => (
                    <Button
                      size="small"
                      key={`type_${i}`}
                      // onClick={() => handleEntitiesType(type)}
                      // variant={type.key === selectedEntityTypes.key ? 'contained' : 'outlined'}
                      variant="outlined">
                      {type.label}
                    </Button>
                  ))}
                </ButtonGroup>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <div className="mx-4 divider" />
        <div className="mx-4 divider" />
        <div className="p-4">
          <Grid container spacing={4}>
            <Grid item xs={12} md={12}>
              <div style={{ height: '100%', width: '100%' }}>
                <HighchartsReact highcharts={highchartsGantt(Highcharts)} options={options} />
              </div>
            </Grid>
          </Grid>
          <Divider />
          <Divider />
        </div>
      </Card>
    </>
  );
}
