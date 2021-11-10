import React from 'react';
import { Card, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useSelector } from 'react-redux';
import { isEmpty, get } from 'lodash';
const useStyles = makeStyles(theme => ({
  card: {
    height: 180
  },
  chart: {
    position: 'absolute',

    right: 0,
    bottom: 0
  }
}));

const FilingsCards = () => {
  const { fillingsGraphData } = useSelector(state => state.Filings);
  let mda = [];
  let risk = [];
  let notes = [];
  if (!isEmpty(fillingsGraphData)) {
    mda = fillingsGraphData.map(s => {
      let wordCount = get(s, 'mda.ssssss', '');

      return wordCount;
    });
    risk = fillingsGraphData.map(s => {
      let wordCount = get(s, 'risk_factors.ssssss', '');

      return wordCount;
    });
    notes = fillingsGraphData.map(s => {
      let wordCount = get(s, 'notes.ssssss', '');

      return wordCount;
    });
  }

  let cardArray = [
    {
      heading: 'RISK & FACTORS',
      content: 'Neutral',
      num: risk,
      percent: 67,
      options: {
        chart: {
          type: 'areaspline',
          height: 130,
          width: 180,
          spacingBottom: 0,
          spacingLeft: 0,
          spacingRight: 0,
          marginBottom: 0,
          marginLeft: 0,
          marginRight: 0
        },
        title: {
          text: null
        },
        credits: {
          enabled: false
        },
        tooltip: {
          enabled: false,
          shared: false
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
          visible: false,
          labels: {
            enabled: false
          },
          title: {
            text: null
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
            data: risk,
            color: '#ff98a4'
          }
        ]
      }
    },
    {
      heading: 'MANAGEMENT & DISCUSSION',
      content: 'Extermely High',
      num: mda,
      percent: 32,
      options: {
        chart: {
          type: 'areaspline',
          height: 130,
          width: 180,
          spacingBottom: 0,
          spacingLeft: 0,
          spacingRight: 0,
          marginBottom: 0,
          marginLeft: 0,
          marginRight: 0
        },
        title: {
          text: null
        },
        credits: {
          enabled: false
        },
        tooltip: {
          enabled: false,
          shared: false
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
          visible: false,
          labels: {
            enabled: false
          },
          title: {
            text: null
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
            data: mda,
            color: '#7fe4a6'
          }
        ]
      }
    },
    {
      heading: 'NOTES TO  FINANCIAL STATEMENT',
      content: 'High',
      num: notes,
      percent: 21,
      options: {
        chart: {
          type: 'areaspline',
          height: 130,
          width: 180,
          spacingBottom: 0,
          spacingLeft: 0,
          spacingRight: 0,
          marginBottom: 0,
          marginLeft: 0,
          marginRight: 0
        },
        title: {
          text: null
        },
        credits: {
          enabled: false
        },
        tooltip: {
          enabled: false,
          shared: false
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
          visible: false,
          labels: {
            enabled: false
          },
          title: {
            text: null
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
            data: notes,
            color: '#7fc8fd'
          }
        ]
      }
    }
  ];

  const getCount = data => {
    let count = '';
    if (data.length >= 2) {
      count = (data[0] - data[1]).toFixed(2);
    }
    if (data.length === 1) {
      count = data[0].toFixed(2);
    }
    return count;
  };
  const getPercentageValue = data => {
    let count = '';

    if (data.length >= 2) {
      count = (data[0] - (data[1] / data[1]) * 100).toFixed(2);
    }
    if (data.length === 1) {
      count = data[0].toFixed(2);
    }

    return count;
  };

  const classes = useStyles();
  return (
    <Grid container spacing={2}>
      {cardArray.map((data, index) => (
        <Grid item xs={4} key={index}>
          <Card className={classes.card}>
            <Grid container>
              <Grid item xs={6}>
                <CardContent>
                  <p>{data.heading}</p>
                  <h3>{`${data.content} (${getCount(data.num.filter(e => e))})`}</h3>
                  {getPercentageValue(data.num.filter(e => e)) > 35 ? (
                    <p style={{ color: 'green' }}>
                      {getPercentageValue(data.num.filter(e => e)) + '%'}
                      <ExpandMoreIcon></ExpandMoreIcon>
                    </p>
                  ) : (
                    <p style={{ color: 'red' }}>
                      {getPercentageValue(data.num.filter(e => e)) + '%'}
                      <ExpandMoreIcon></ExpandMoreIcon>
                    </p>
                  )}
                </CardContent>
              </Grid>
              <Grid item xs={6} className={classes.chart}>
                <HighchartsReact highcharts={Highcharts} options={data.options} />
              </Grid>
            </Grid>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default FilingsCards;
