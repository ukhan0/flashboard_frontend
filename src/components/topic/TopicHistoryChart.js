import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { get } from 'lodash';
import { useSelector } from 'react-redux';
import { Grid, FormControlLabel, Checkbox } from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles';

const companyColor = '#0388cb'
const fileColor = '#359901'

const useStyles = makeStyles(theme => ({
  companiesCount: {
    color: companyColor,
    fontSize: '1.2rem',
  },
  filesCount: {
    color: fileColor,
    fontSize: '1.2rem',
  },
  topContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
  }
}));

const CompanyCheckbox = withStyles({
  root: {
    color: companyColor,
    '&$checked': {
      color: companyColor,
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const FileCheckbox = withStyles({
  root: {
    color: fileColor,
    '&$checked': {
      color: fileColor,
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const TopicHistoryChart = () => {

  const classes = useStyles()
  const { searchResult } = useSelector(state => state.Topic);
  const history = get(searchResult, 'buckets.history', []);
  const [ isCompaniesSelected, setIsCompaniesSelected  ] = useState(true)
  const [ isFilesSelected, setIsFilesSelected  ] = useState(true)

  const options = {
    chart: {
      zoomType: 'xy',
      height: 200,
      backgroundColor: "#ffffff",
      borderRadius: 0,
      marginTop: 0,
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
          lineWidth: 2.5,
          fillOpacity: .1,
          marker: {
              lineColor: "#fff",
              lineWidth: 1,
              radius: 3.5,
              symbol: "circle"
          },
          shadow: !1
      },
      column: {
          lineWidth: 16,
          shadow: !1,
          borderWidth: 0,
          groupPadding: .05
      }
    },
    xAxis: [
      {
        type: "datetime",
        title: {
            text: null
        },
        tickmarkPlacement: "off",
        // dateTimeLabelFormats: {
        //     day: "%b %e"
        // },
        gridLineColor: "#eeeeee",
        gridLineWidth: 0,
        labels: {
            style: {
                color: "#999999"
            },
            formatter: function() {
              return Highcharts.dateFormat('%b %Y', new Date(this.value));
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
          text: 'Count',
        },
        gridLineColor: "#eeeeee",
        gridLineWidth: .5,
        zIndex: 2,
        labels: {
          format: '{value}',
          align: "right",
          style: {
              color: "#999999"
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
        type: "column",
        name: 'Documents Count',
        data: []
      },
      {
        type: "area",
        name: 'Files Count',
        data: []
      },
    ]
  };

  const timeValues = [];
  const yAxisCompaniesCounts = [];
  const yAxisFilesCounts = [];
  let totalCompaniesCount = 0
  let totalFilesCount = 0
  for (const historyItem of history) {
    timeValues.push(historyItem.key_as_string);
    yAxisCompaniesCounts.push(historyItem.companies_count)
    totalCompaniesCount += historyItem.companies_count
    yAxisFilesCounts.push(historyItem.doc_type_count)
    totalFilesCount += historyItem.doc_type_count
  }
  options.xAxis[0].categories = timeValues;
  if(isCompaniesSelected){
    options.series[0].data = yAxisCompaniesCounts;
  }
  if(isFilesSelected) {
    options.series[1].data = yAxisFilesCounts;
  }

  return (
    <>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        className={classes.topContainer}
      >
        <Grid item>
          <Grid container spacing={2}>
            <Grid item>
              <div className={classes.companiesCount}>{totalCompaniesCount.toLocaleString()}</div>
              <span className="text-black-50">
                Companies
              </span>
            </Grid>
            <Grid item>
              <div className={classes.filesCount}>{totalFilesCount.toLocaleString()}</div>
              <span className="text-black-50">
                Files
              </span>
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
        </Grid>
      </Grid>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  );
};
export default TopicHistoryChart;
