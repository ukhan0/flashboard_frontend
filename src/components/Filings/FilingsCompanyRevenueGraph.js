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
import { setSelectedWatchlist } from '../../reducers/Watchlist';
import CustomEvents from 'highcharts-custom-events';
CustomEvents(Highcharts);

const FilingsCompanyRevenueGraph = props => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [selectedEntityType, setSelectedEntityType] = useState(null);
  const { filingsRevenueData } = useSelector(state => state.Filings);
  const [entitiesData, setEntitiesData] = useState([]);
  const { selectedItem } = useSelector(state => state.Watchlist);
  const [reBuildGraph, setReBuildGraph] = useState(false);

  const removingSpacesAndPunctuation = string =>
    string
      .replace(/[@[.|+,/#?!$%^&*;:<>'’`"{}=\-_~()]/g, '')
      .replace(/\s/g, '')
      .toLowerCase();

  const data = useCallback(() => {
    let data = {};
    let caculateStrength = filingsRevenueData
      .map(v => {
        return { ...v, strength: v.newCount - v.oldCount };
      })
      .filter(e => {
        let firstWord = e.name.split(' ');
        return !(
          removingSpacesAndPunctuation(selectedItem.companyName).includes(
            removingSpacesAndPunctuation(firstWord[0].toLowerCase())
          ) ||
          removingSpacesAndPunctuation(e.name).includes('delaware'.toLowerCase()) ||
          removingSpacesAndPunctuation(selectedItem.companyName).includes(removingSpacesAndPunctuation(e.name))
        );
      });
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

    data.emerging_entities = filingsRevenueEmerging.concat(filingsRevenueEmerging2);
    data.disappearing_entities = filingsRevenueDisappearing.concat(filingsRevenueDisappearing2);
    data.common_entities = filingsRevenueComman1.concat(filingsRevenueComman2);
    return data;
  }, [filingsRevenueData, selectedItem]);

  const handleEntitiesType = type => {
    if (selectedEntityType !== type) {
      setReBuildGraph(true);
    }
    setSelectedEntityType(type);
  };

  useEffect(() => {
    setSelectedEntityType('emerging_entities');
  }, []);

  useEffect(() => {
    setEntitiesData(data());
  }, [data]);
  const setId = (item, event, type) => {
    let id = null;
    let oldId = null;
    if (get(item, 'documentType', null) === '10-K') {
      oldId = get(item, 'oldId10k', null);
      id = get(item, 'recentId10k', null);
    } else {
      oldId = get(item, 'oldId10q', null);
      id = get(item, 'recentId10q', null);
    }

    switch (type) {
      case 'emerging_entities':
        dispatch(setSelectedWatchlist({ ...item, recentId: id }));
        // code block
        break;
      case 'disappearing_entities':
        dispatch(setSelectedWatchlist({ ...item, recentId: oldId }));
        // code block
        break;
      default:
        if (event.color === 'red') {
          dispatch(setSelectedWatchlist({ ...item, recentId: oldId }));
        } else {
          dispatch(setSelectedWatchlist({ ...item, recentId: id }));
        }
    }
  };
  const getShowingCompany = data => {
    return (data.length / 2) > 10 ? 10 : (data.length / 2) - 1;
  };
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
      max: getShowingCompany(get(entitiesData, selectedEntityType, [])),

      scrollbar: {
        enabled: true
      },
      tickLength: 0,
      labels: {
        style: { cursor: 'pointer' },
        events: {
          click: function() {
            if (this) {
              dispatch(setIsFromSideBar(false));
              dispatch(setFillingsSearchText(this.value));
              dispatch(setIsFromThemex(false));
              setId(selectedItem, this, selectedEntityType);
              history.push('/sentiment');
            }
          }
        }
      }
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

                setId(selectedItem, this, selectedEntityType);

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
        data: get(entitiesData, selectedEntityType, []).filter(e => e),
        dataLabels: {
          enabled: true
        }
      }
    ]
  };

  useEffect(() => {
    if (reBuildGraph) {
      setReBuildGraph(false);
    }
  }, [reBuildGraph]);

  const Buttons = () => {
    return (
      <ButtonGroup color="primary">
        {entityTypes.map((type, i) => (
          <Button
            disabled={get(entitiesData, type.key, []).length > 0 ? false : true}
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
          <Grid container alignItems="center">
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
              {!reBuildGraph ? <HighchartsReact highcharts={highchartsGantt(Highcharts)} options={options} /> : <></>}
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
