import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock';
import { Grid, Card } from '@material-ui/core';
import moment from 'moment';
import { renameDocumentTypes } from '../topic/topicHelpers';
import { getColorByDocType } from '../Filings/FillingsHelper';
import { dateFormaterMoment, parseDateStrMoment } from '../watchlist/WatchlistTableHelpers';
import HomePageSearchField from './HomePageSearchField';
import { makeStyles } from '@material-ui/core/styles';
import { getCompanyHomePageStockData, getCompanyPrice0verlayOnTimeline } from './homePageActions';
import { BeatLoader } from 'react-spinners';
import clsx from 'clsx';
const useStyles = makeStyles(theme => ({
  loader: {
    textAlign: 'center',
    marginLeft: '20px',
    marginTop: '10px'
  },
  topContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5
  }
}));
export default function FillingCompanyPriceOverlay() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { homePagePriceData, homePageStockData, homePageSelectedItem, isLoading } = useSelector(
    state => state.HomePage
  );

  let data = homePagePriceData.map(v => {
    return [parseInt(new Date(v.as_of_date).getTime()), parseFloat(v.close_price)];
  });
  const newData = homePageStockData.map(v => {
    let date = new Date(dateFormaterMoment(parseDateStrMoment(v.document_date.split('.')[0]))).getTime();
    let rename = renameDocumentTypes(v.document_type);
    let title = rename;
    if (rename === 'Earning Call') {
      title = 'EC';
    } else if (title === '8-K') {
      title = '8K';
    } else if (title === '10-K') {
      title = 'K';
    } else if (title === '10-Q') {
      title = 'Q';
    }

    return {
      x: date,
      ticker: v.ticker,
      document_id: v.document_id,
      title: title,
      color: getColorByDocType(v.document_type),
      text: `<strong >${rename}</strong><br/>Document Date: ${moment(v.document_date).format(
        'DD MMMM, YYYY'
      )}<br/>Period Date: ${v.period_date}`
    };
  });

  let latestDate = newData[newData.length - 1];

  const options = {
    rangeSelector: {
      selected: 4
    },
    title: {
      text: 'Timeline'
    },
    xAxis: {
      max: latestDate ? latestDate.x : new Date().getTime()
    },
    yAxis: {
      title: {
        text: 'Timeline'
      }
    },
    credits: {
      enabled: false
    },
    series: [
      {
        color: '#A9A9A9',
        name: 'Close Price',
        data: data,
        id: 'dataseries',
        tooltip: {
          valueDecimals: 4
        }
      },
      {
        type: 'flags',
        data: newData,
        dataLabels: {
          allowOverlap: true
        },
        fillColor: newData.color,
        events: {
          click: function(event) {
            if (event) {
            }
          }
        },
        onSeries: 'dataseries',
        width: 16,
        style: {
          color: 'white',
          cursor: 'pointer'
        },
        states: {
          hover: {}
        }
      }
    ]
  };

  React.useEffect(() => {
    dispatch(getCompanyHomePageStockData());
    dispatch(getCompanyPrice0verlayOnTimeline());
  }, [dispatch, homePageSelectedItem]);
  
  return (
    <Card className="card-box mb-4">
      <div className={clsx('card-header')}>
        <div className="card-header--title font-weight-bold">Timeline</div>
      </div>
      <Grid container direction="row" justify="space-between" alignItems="center" className={classes.topContainer}>
        <Grid item>
          <Grid container spacing={2}>
            <Grid item>
              <div className={classes.companiesCount}>
                <HomePageSearchField />
              </div>
            </Grid>
            <Grid item>
              <div className={classes.loader}>
                {<BeatLoader color={'var(--primary)'} loading={isLoading} size={10} />}
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <div style={{ height: '100%', width: '100%' }}>
        <HighchartsReact highcharts={Highcharts} constructorType={'stockChart'} options={options} />
      </div>
    </Card>
  );
}
