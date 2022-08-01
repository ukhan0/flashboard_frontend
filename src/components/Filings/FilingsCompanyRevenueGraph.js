import React, { useCallback, useEffect, useState } from 'react';
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
import { orderBy, get } from 'lodash';
import { entityTypes } from '../../config/filterTypes';

const FilingsCompanyRevenueGraph = props => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [selectedEntityType, setSelectedEntityType] = useState('emerging_entities');
  const { filingsRevenueData } = useSelector(state => state.Filings);
  const [entitiesData, setEntitiesData] = useState([]);
  const { selectedItem } = useSelector(state => state.Watchlist);
  const data = useCallback(() => {
    let data = {};
    let caculateStrength = filingsRevenueData
      .map(v => {
        return { ...v, strength: v.newCount - v.oldCount };
      })
      .filter(e => !selectedItem.companyName.toLowerCase().includes(e.name.toLowerCase()));

    const comman = caculateStrength.filter(v => v.oldCount > 0 && v.newCount > 0);
    const disappearing = caculateStrength.filter(v => v.oldCount > 0 && v.newCount === 0);
    const emerging = caculateStrength.filter(v => v.newCount > 0 && v.oldCount === 0);
    // const filterData = caculateStrength;
    let filterCommanDataSorted = orderBy(comman, ['strength'], ['desc']);
    let filterDisappearingDataSorted = orderBy(disappearing, ['oldCount'], ['desc']);
    let filterEmergingDataSorted = orderBy(emerging, ['newCount'], ['desc']);
    // let finalResult = filterDataSorted;
    let filingsRevenueComman1 = filterCommanDataSorted.map(v => {
      return { name: v.name, low: -v.oldCount, high: 0 };
    });
    let filingsRevenueComman2 = filterCommanDataSorted.map(v => {
      return { name: v.name, low: 0, high: v.newCount };
    });
    let filingsRevenueEmerging = filterEmergingDataSorted.map(v => {
      return { name: v.name, low: 0, high: v.newCount };
    });
    let filingsRevenueDisappearing = filterDisappearingDataSorted.map(v => {
      return { name: v.name, low: -v.oldCount, high: 0 };
    });

    let filingsRevenueEmerging2 = filterEmergingDataSorted.map(v => {
      return { name: v.name, low: 0, high: 0 };
    });
    let filingsRevenueDisappearing2 = filterDisappearingDataSorted.map(v => {
      return { name: v.name, low: 0, high: 0 };
    });

    data.emergingEntities = filingsRevenueEmerging.concat(filingsRevenueEmerging2);
    data.disappearingEntities = filingsRevenueDisappearing.concat(filingsRevenueDisappearing2);
    data.commonEntities = filingsRevenueComman1.concat(filingsRevenueComman2);
    return data;
  }, [filingsRevenueData, selectedItem]);

  const handleEntitiesType = type => {
    setSelectedEntityType(type);
  };
  useEffect(() => {
    let entities = data();
    let newData = [];
    if (selectedEntityType === 'emerging_entities') {
      newData = get(entities, 'emergingEntities', []);
    } else if (selectedEntityType === 'disappearing_entities') {
      newData = get(entities, 'disappearingEntities', []);
    } else {
      newData = get(entities, 'commonEntities', []);
    }
    setEntitiesData(newData);
  }, [data, selectedEntityType]);
  const options = {
    chart: {
      type: 'columnrange',
      inverted: true,
      panning: true,
      panKey: 'shift',
      events: {
        load: function() {}
      }
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
        data: entitiesData,
        dataLabels: {
          enabled: true
        }
      }
    ]
  };
  const Buttons = () => {
    return (
      <ButtonGroup color="primary">
        {entityTypes.map((type, i) => (
          <Button
            size="small"
            key={`type_${i}`}
            onClick={() => handleEntitiesType(type.key)}
            variant={type.key === selectedEntityType ? 'contained' : 'outlined'}>
            {type.label}
          </Button>
        ))}
      </ButtonGroup>
    );
  };

  return (
    <Card className="mb-4">
      <div className="card-header-alt d-flex justify-content-between p-4">
        <Grid container spacing={3}>
          <Grid container alignItems="center" xs={12}>
            <Grid item xs={6}>
              <h6 className="font-weight-bold font-size-lg mb-1 text-black">Entities Mentioned</h6>
              <p className="text-black-50 mb-0">Old vs New Entities Mentioned</p>
            </Grid>

            <Grid item xs={6} style={{ textAlign: 'right', paddingRight: '15px' }}>
              {Buttons()}
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
  );
};
export default React.memo(FilingsCompanyRevenueGraph);
