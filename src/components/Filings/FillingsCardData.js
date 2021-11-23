import React from 'react';
import { Card, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { useSelector } from 'react-redux';
import { isEmpty, get } from 'lodash';
import { getCompanyByTickerUniverse } from './FillingsHelper';
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
  const { selectedItem, selectedFileType } = useSelector(state => state.Watchlist);
  const data = getCompanyByTickerUniverse(selectedItem.ticker, 'all');
  const riskSentiment =
    selectedFileType === '10q'
      ? { sentimentQuintile: data.as, sentimentChangeQuintile: data.au }
      : { sentimentQuintile: data.al, sentimentChangeQuintile: data.an };
  const noteSentiment =
    selectedFileType === '10q'
      ? { sentimentQuintile: data.bi, sentimentChangeQuintile: data.bk }
      : { sentimentQuintile: data.az, sentimentChangeQuintile: data.bb };
  const mdaSentiment =
    selectedFileType === '10q'
      ? { sentimentQuintile: data.ae, sentimentChangeQuintile: data.ag }
      : { sentimentQuintile: data.x, sentimentChangeQuintile: data.z };
  let mda = [];
  let mdaDates = [];
  let risk = [];
  let riskDates = [];
  let notes = [];
  let notesDates = [];
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
    mdaDates = fillingsGraphData.filter(s => get(s, 'mda.ssssss', null));
    riskDates = fillingsGraphData.filter(s => get(s, 'risk_factors.ssssss', null));
    notesDates = fillingsGraphData.filter(s => get(s, 'notes.ssssss', null));
  }
  let cardArray = [
    {
      heading: 'RISK & FACTORS',
      content: riskSentiment ? riskSentiment : '',
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
          enabled: true,
          shared: false,
          valueDecimals: 4
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
          categories: riskDates.map(v => v.document_date),
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
            name: 'Sentiment',
            data: risk,
            color: '#ff98a4'
          }
        ]
      }
    },
    {
      heading: 'MANAGEMENT & DISCUSSION',
      content: mdaSentiment ? mdaSentiment : '',
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
          enabled: true,
          shared: false,
          valueDecimals: 4
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
          categories: mdaDates.map(v => v.document_date),
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
            name: 'Sentiment',
            data: mda,
            color: '#7fe4a6'
          }
        ]
      }
    },
    {
      heading: 'NOTES TO  FINANCIAL STATEMENT',
      content: noteSentiment ? noteSentiment : '',
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
          enabled: true,
          shared: false,
          valueDecimals: 4
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
          categories: notesDates.map(v => v.document_date)
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

  const getCount = data => {
    let count = '';
    if (data.length >= 1) {
      count = data[data.length - 1].toFixed(2);
    }
    return count;
  };
  const getPercentageValue = data => {
    let count = '';

    if (data.length >= 2) {
      const current_val = data[data.length - 1];
      const last_val = data[data.length - 2];
      count = (((current_val - last_val) / last_val) * 100).toFixed(2);
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
            <p style={{ textAlign: 'center', marginTop: '5px' }}>{data.heading}</p>
            <Grid container>
              <Grid item xs={6}>
                <CardContent>
                  <h5>{`${data.content ? data.content.sentimentQuintile : ''} (${getCount(
                    data.num.filter(e => e)
                  )})`}</h5>
                  <label className="text-black-50 d-block">Filing Sentiment</label>
                  <h5>{`${data.content ? data.content.sentimentChangeQuintile : ''} (${getPercentageValue(
                    data.num.filter(e => e)
                  )}
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
