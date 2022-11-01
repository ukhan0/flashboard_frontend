import React, { useState, useRef, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { get } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import { setTopicSearchDateRange, isDateSet, setIsDays } from '../../reducers/Topic';
import moment from 'moment';
const companyColor = '#4092e5';
const fileColor = '#359901';

const useStyles = makeStyles(theme => ({
  companiesCount: {
    color: companyColor,
    fontSize: '1.2rem'
  },
  filesCount: {
    color: fileColor,
    fontSize: '1.2rem'
  },
  topContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5
  }
}));

const CompanyCheckbox = withStyles({
  root: {
    color: companyColor,
    '&$checked': {
      color: companyColor
    }
  },
  checked: {}
})(props => <Checkbox color="default" {...props} />);

const FileCheckbox = withStyles({
  root: {
    color: fileColor,
    '&$checked': {
      color: fileColor
    }
  },
  checked: {}
})(props => <Checkbox color="default" {...props} />);

const TopicHistoryChart = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { searchResult, startDate, endDate, isDays } = useSelector(state => state.Topic);
  const history = get(searchResult, 'buckets.history', []);
  const [isCompaniesSelected, setIsCompaniesSelected] = useState(true);
  const [isFilesSelected, setIsFilesSelected] = useState(true);

  const firstTimeLoad = useRef(false);
  const [preDate, setPreDate] = useState(null);
  useEffect(() => {
    if (!firstTimeLoad.current) {
      firstTimeLoad.current = true;
      setPreDate({ startDate: startDate, endDate: endDate });
    }
  }, [startDate, endDate]);
  const options = {
    chart: {
      zoomType: 'xy',
      height: 297,
      backgroundColor: '#ffffff',
      borderRadius: 0,
      marginTop: 0
    },
    title: null,
    colors: [companyColor, fileColor],
    credits: {
      enabled: false
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      area: {
        // lineWidth: 2.5,
        // fillOpacity: 0.1,
        marker: {
          lineColor: '#fff',
          lineWidth: 1,
          radius: 3.5,
          symbol: 'circle'
        },
        shadow: !1
      },
      column: {
        lineWidth: 16,
        shadow: !1,
        borderWidth: 0,
        groupPadding: 0.05
      },
      series: {
        cursor: 'pointer',
        point: {
          events: {
            click: function() {
              if (this) {
                // const docCount = get(this, 'series.name', null);
                // if (docCount === 'Documents Count') {
                const index = get(this, 'index', null);
                const docData = get(this, 'series.data', []);
                if (docData.length > 0) {
                  let selectedDate = {
                    startDate: moment(docData[index].category, 'MM-DD-YYYY')._d,
                    endDate: isDays
                      ? moment(docData[index].category, 'MM-DD-YYYY')._d
                      : moment(docData[index].category, 'MM-DD-YYYY').endOf('month')._d
                  };
                  dispatch(setTopicSearchDateRange(selectedDate));
                  dispatch(isDateSet(true));
                  props.handleSearch('day');
                  dispatch(setIsDays(true));
                  // setIsDays(true);
                }
                // }
              }
            }
          }
        }
      }
    },
    xAxis: [
      {
        type: 'datetime',
        title: {
          text: null
        },
        tickmarkPlacement: 'off',
        // dateTimeLabelFormats: {
        //     day: "%b %e"
        // },
        gridLineColor: '#eeeeee',
        gridLineWidth: 0,
        labels: {
          style: {
            color: '#999999'
          },
          formatter: function() {
            let date = moment(this.value, 'MM-DD-YYYY');
            return isDays ? date.format('DD MMM') : date.format('MMM YYYY');
          }
        }
      }
    ],
    yAxis: [
      {
        showFirstLabel: !1,
        showLastLabel: !1,
        tickPixelInterval: 50,
        endOnTick: !1,
        title: {
          text: 'Count'
        },
        gridLineColor: '#eeeeee',
        gridLineWidth: 0.5,
        zIndex: 2,
        labels: {
          format: '{value}',
          align: 'right',
          style: {
            color: '#999999'
          },
          x: -4
        }
      }
    ],
    tooltip: {
      shared: true
    },
    series: [
      {
        type: 'column',
        name: 'Documents Count',
        data: []
      },
      {
        type: 'line',
        name: 'Files Count',
        data: []
      }
    ]
  };

  const timeValues = [];
  const yAxisCompaniesCounts = [];
  const yAxisFilesCounts = [];
  let totalCompaniesCount = 0;
  let totalFilesCount = 0;
  for (const historyItem of history) {
    timeValues.push(historyItem.key_as_string);
    yAxisCompaniesCounts.push(historyItem.companies_count);
    totalCompaniesCount += historyItem.companies_count;
    yAxisFilesCounts.push(historyItem.doc_type_count);
    totalFilesCount += historyItem.doc_type_count;
  }
  options.xAxis[0].categories = timeValues;
  if (isCompaniesSelected) {
    options.series[0].data = yAxisCompaniesCounts;
  }
  if (isFilesSelected) {
    options.series[1].data = yAxisFilesCounts;
  }
  const handleReset = () => {
    dispatch(setIsDays(false));
    dispatch(setTopicSearchDateRange(preDate));
    props.handleSearch();
  };
  return (
    <Card className="card-box mb-4">
      <Grid container direction="row" justify="space-between" alignItems="center" className={classes.topContainer}>
        <Grid item>
          <Grid container spacing={2}>
            <Grid item>
              <div className={classes.companiesCount}>{totalCompaniesCount.toLocaleString()}</div>
              <span className="text-black-50">Companies</span>
            </Grid>
            <Grid item>
              <div className={classes.filesCount}>{totalFilesCount.toLocaleString()}</div>
              <span className="text-black-50">Files</span>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <FormControlLabel
            control={
              <CompanyCheckbox
                checked={isCompaniesSelected}
                onChange={() => setIsCompaniesSelected(!isCompaniesSelected)}
                name="Companies"
                color="primary"
              />
            }
            label="Companies"
          />
          <FormControlLabel
            control={
              <FileCheckbox
                checked={isFilesSelected}
                onChange={() => setIsFilesSelected(!isFilesSelected)}
                name="Companies"
                color="primary"
              />
            }
            label="Files"
          />
          {isDays ? (
            <Button className="m-0 p-0 btn text-warning" size="small" onClick={handleReset}>
              Reset
            </Button>
          ) : null}
        </Grid>
      </Grid>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Card>
  );
};
export default TopicHistoryChart;
