import React from 'react';
import { Card, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


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
let cardArray = [
  {
    heading: 'RISK & FACTORS',
    content: 'Neutral',
    num: 23,
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
          data: [0, 9, 12, 8, 3, 18, 12],
          color: '#12c5db'
        }
      ]
    }
  },
  {
    heading: 'MANAGEMENT & DESCUSSION',
    content: 'Extermely High',
    num: 132,
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
          data: [0, 7, 8, 15, 11, 10, 18],
          color: '#1bc943'
        }
      ]
    }
  },
  {
    heading: 'NOTES TO  FINANCIAL STATEMENT',
    content: 'High',
    num: 93,
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
          data: [0, 5, 7, 5, 31, 10, 12],
          color: '#4493ff'
        }
      ]
    }
  }
];
const SentimentCard = () => {
  // const { cardGraphData } = useSelector(state => state.Sentiment);
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
                  <h3>{`${data.content} (${data.num})`}</h3>
                  {data.percent > 35 ? (
                    <p style={{ color: 'green' }}>
                      {data.percent + '%'}
                      <ExpandMoreIcon></ExpandMoreIcon>
                    </p>
                  ) : (
                    <p style={{ color: 'red' }}>
                      {data.percent + '%'}
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

export default SentimentCard;
