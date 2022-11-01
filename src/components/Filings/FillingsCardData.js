import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CardContent from '@material-ui/core/CardContent';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useSelector } from 'react-redux';
import { isEmpty, get, round } from 'lodash';
const useStyles = makeStyles(theme => ({
  card: {
    height: 270
  },
  chart: {
    position: 'absolute',
    right: 0,
    width: '100%',
    // bottom: 0,
    marginLeft: 0
  }
}));

const FilingsCards = () => {
  const { fillingsGraphData } = useSelector(state => state.Filings);
  const { sidebarToggle, sidebarToggleMobile } = useSelector(state => state.ThemeOptions);

  let riskSentiment;
  let noteSentiment;
  let mdaSentiment;
  const cardHeight = 200;
  // const cardWidth = 200;

  let mda = [];
  let risk = [];
  let notes = [];
  let dates = [];
  if (!isEmpty(fillingsGraphData)) {
    mda = fillingsGraphData.map(s => get(s, 'mda.ssssss', 0));
    risk = fillingsGraphData.map(s => get(s, 'risk_factors.ssssss', 0));
    notes = fillingsGraphData.map(s => get(s, 'notes.ssssss', 0));
    dates = fillingsGraphData.map(d => d.document_date);
  }
  React.useEffect(() => {
    if (Highcharts.charts) {
      setTimeout(() => {
        if (Highcharts.charts[0]) {
          Highcharts.charts[0].reflow();
        }
        if (Highcharts.charts[1]) {
          Highcharts.charts[1].reflow();
        }
        if (Highcharts.charts[2]) {
          Highcharts.charts[2].reflow();
        }
      }, [500]);
    }
  }, [sidebarToggle, sidebarToggleMobile]);

  let cardArray = [];
  if (!isEmpty(fillingsGraphData)) {
    cardArray = [
      {
        heading: 'RISK & FACTORS',
        content: riskSentiment ? riskSentiment : 0,
        num: risk,
        percent: 67,
        options: {
          chart: {
            type: 'areaspline',
            height: cardHeight
            // width: cardWidth
          },
          title: {
            text: null
          },
          credits: {
            enabled: false
          },
          tooltip: {
            enabled: true,
            shared: false,
            valueDecimals: 2
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
          xAxis: {
            categories: dates,

            type: 'datetime',
            title: {
              text: null
            },
            labels: {
              style: {
                color: '#999999'
              },
              formatter: function() {
                return Highcharts.dateFormat('%b %y', new Date(this.value));
              }
            }
          },
          plotOptions: {
            series: {
              dataLabels: {
                enabled: false
              },
              marker: {
                enabled: false
              },
              line: {
                marker: {
                  enabled: false
                },
                states: {
                  hover: {
                    enabled: true
                  }
                },
                series: {
                  dataLabels: {
                    enabled: false
                  }
                }
              }
            },
            areaspline: {
              fillOpacity: 0.2
            }
          },
          series: [
            {
              showInLegend: false,
              name: 'Sentiment',
              data: risk,
              color: '#ff98a4'
            }
          ]
        }
      },
      {
        heading: 'MANAGEMENT & DISCUSSION',
        content: mdaSentiment ? mdaSentiment : 0,
        num: mda,
        percent: 32,
        options: {
          chart: {
            type: 'areaspline',
            height: cardHeight
            // width: cardWidth
          },
          title: {
            text: null
          },
          credits: {
            enabled: false
          },
          tooltip: {
            enabled: true,
            shared: false,
            valueDecimals: 2
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
          xAxis: {
            categories: dates,
            type: 'datetime',
            title: {
              text: null
            },
            labels: {
              style: {
                color: '#999999'
              },
              formatter: function() {
                return Highcharts.dateFormat('%b %y', new Date(this.value));
              }
            }
          },
          plotOptions: {
            series: {
              dataLabels: {
                enabled: false
              },
              marker: {
                enabled: false
              },
              line: {
                marker: {
                  enabled: false
                },
                states: {
                  hover: {
                    enabled: true
                  }
                },
                series: {
                  dataLabels: {
                    enabled: false
                  }
                }
              }
            },
            areaspline: {
              fillOpacity: 0.2
            }
          },
          series: [
            {
              showInLegend: false,
              name: 'Sentiment',
              data: mda,
              color: '#7fe4a6'
            }
          ]
        }
      },
      {
        heading: 'NOTES TO  FINANCIAL STATEMENT',
        content: noteSentiment ? noteSentiment : 0,
        num: notes,
        percent: 21,
        options: {
          chart: {
            type: 'areaspline',
            height: cardHeight
            // width: cardWidth
          },
          title: {
            text: null
          },
          credits: {
            enabled: false
          },
          tooltip: {
            enabled: true,
            shared: false,
            valueDecimals: 2
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
          xAxis: {
            categories: dates,
            type: 'datetime',
            title: {
              text: null
            },
            labels: {
              style: {
                color: '#999999'
              },
              formatter: function() {
                return Highcharts.dateFormat('%b %y', new Date(this.value));
              }
            }
          },
          plotOptions: {
            series: {
              dataLabels: {
                enabled: false
              },
              marker: {
                enabled: false
              },
              line: {
                marker: {
                  enabled: false
                },
                states: {
                  hover: {
                    enabled: true
                  }
                },
                series: {
                  dataLabels: {
                    enabled: false
                  }
                }
              }
            },
            areaspline: {
              fillOpacity: 0.2
            }
          },
          series: [
            {
              showInLegend: false,
              name: 'Sentiment',
              data: notes,
              color: '#7fc8fd'
            }
          ]
        }
      }
    ];
  }

  const getCount = data => {
    let count = null;
    if (data.length >= 1) {
      count = data[data.length - 1];
    }
    return round(count, 2);
  };
  const getPercentageValue = data => {
    let count = null;

    if (data.length >= 2) {
      const current_val = data[data.length - 1];
      const last_val = data[data.length - 2];
      count = current_val - last_val;
    }
    if (data.length === 1) {
      count = data[0];
    }

    return round(count, 2);
  };

  const classes = useStyles();
  return (
    <Grid container spacing={2}>
      {cardArray.map((data, index) => {
        let quintileChange = data.num;
        return (
          <Grid item xs={4} key={index}>
            <Card className={classes.card}>
              <p style={{ textAlign: 'center', marginTop: '5px' }}>{data.heading}</p>
              <Grid container>
                <Grid item xs={4} md={4}>
                  <CardContent>
                    <h5>{`(${quintileChange.length > 0 ? getCount(quintileChange.filter(e => e)) : ''})`}</h5>
                    <label className="text-black-50 d-block">Filing Sentiment</label>
                    <h5>{`(${quintileChange.length > 0 ? getPercentageValue(quintileChange.filter(e => e)) : ''}
                  )`}</h5>
                    <label className="text-black-50 d-block">Sentiment Change</label>
                    {/* <span style={{ display: 'inline' }}>
                    {getPercentageValue(data.num.filter(e => e)) >= 0 ? (
                      <ExpandLessIcon></ExpandLessIcon>
                    ) : (
                      <ExpandMoreIcon></ExpandMoreIcon>
                    )}
                  </span> */}
                  </CardContent>
                </Grid>
                <Grid item xs={8} md={8} className={classes.chart}>
                  <HighchartsReact
                    containerProps={{ style: { width: '100%' } }}
                    highcharts={Highcharts}
                    options={data.options}
                  />
                </Grid>
              </Grid>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default FilingsCards;
