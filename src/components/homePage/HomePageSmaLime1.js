import React, { useCallback, useState, useEffect } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Card from '@material-ui/core/Card';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { getCompanyByIndex } from '../watchlist/WatchlistHelpers';
import { setSelectedWatchlist } from '../../reducers/Watchlist';
import { setIsFromThemex } from '../../reducers/Topic';
import { setSidebarToggle, setSidebarToggleMobile } from '../../reducers/ThemeOptions';
const useStyles = makeStyles(theme => ({
  cardcontent: {
    outline: '1px solid gray',
    margin: ' 16px'
  },
  card: {
    float: 'left',
    outline: '1px solid gray',
    margin: '10px',
    borderradius: '8px'
  },
  cardheading: {
    padding: '1px 10px'
  }
}));
const tableTypes = [
  { name: 'Top', key: 'top', label: 'Social Top Ten Stocks', sort: 'sscore+desc', container: 'container1' },
  { name: 'Bottom', key: 'bottom', label: 'Social Bottom Ten Stocks', sort: 'sscore+asc', container: 'container2' },
  {
    name: 'Relative',
    key: 'relative',
    label: 'Social Relative Volume',
    sort: 'svscore+desc,sscore+desc',
    container: 'container3'
  }
];
export default function HomePageSmaLime1() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { completeCompaniesData, completeCompaniesDataGlobal } = useSelector(state => state.Watchlist);
  const { homePageSelectedWidgetRegion } = useSelector(state => state.HomePage);
  const [tableType, setTableType] = useState(tableTypes[0]);

  const setCompany = useCallback(
    async ticker => {
      let company = await getCompanyByIndex(ticker, completeCompaniesData, completeCompaniesDataGlobal);

      if (company) {
        let last10k = new Date(company['last10k']);
        let last10q = new Date(company['last10q']);
        company.recentId = last10k > last10q ? company.recentId10k : company.recentId10q;
      }

      // if recent id not set
      if (company.recentId === undefined || company.recentId === null) {
        company = {};
      }

      dispatch(setIsFromThemex(false));
      dispatch(setSelectedWatchlist(company));
      dispatch(setSidebarToggle(false));
      dispatch(setSidebarToggleMobile(false));
    },
    [dispatch, completeCompaniesData, completeCompaniesDataGlobal]
  );

  useEffect(() => {
    var factorsData = {
      description: { text: 'Company Name' },
      sscore: { text: 'Sentiment', neg: 'red', pos: 'green' },
      svscore: { text: 'Relative Volume', neg: 'red', pos: 'green' },
      svolume: { text: 'Volume' }
    };
    window.SMA.SMAWebTopTenSentiment({
      container: tableType['container'],
      width: '100%',
      height: '100%',
      title: 'Real Time Social Sentiment Market Snapshot',
      apikey: '907cdf5f789e613d36f0b4dda38930fb1dc590bf',
      customCSS:
        'h1,h2{display:none;} .button-group{display:none;} body{background:#fff;}.Table-holder{margin:0;}.new-btn{border-radius:0;border:1px solid #fff;color:#fff;padding:5px;font-size:12px;height:25px}.button-group{padding:10px 0} .newTable thead>tr {    color: #000000;    background-color: #f0f0f0;    text-align: center;}  .newTable .tbody-row {    background-color: #ffffff;    height: 40px;   margin-bottom: 1px;}.newTable tr{color:#ffffff;}.tbody-row td {    color: #535353;} .Table-holder{padding: 0px;!important} .newTable{width:100%!important;} .newTable .tbody-row:hover{background: #e7f4fe;} .newTable {background:#e7f4fe;} ',
      ontology: homePageSelectedWidgetRegion.type === 'Canada' ? 'tsx' : 'ticker',
      order: 'top',
      sort: tableType['sort'],
      factor: factorsData,
      filters: homePageSelectedWidgetRegion.type === 'Canada' ? '' : 'svolume+gt+12,lastclose+gt+5',
      onItemClick: function(ticker) {
        if (ticker) {
          setCompany(ticker);
        }
      }
    });

    return () => {
      const element = document.getElementById('frame_' + tableType.container);
      if (element) {
        element.remove();
      }
    };
  }, [tableType, setCompany, homePageSelectedWidgetRegion]);

  return (
    <Card className="card-box mb-4" style={{ height: '100%' }}>
      <div className={clsx('card-header')}>
        <div className="card-header--title font-weight-bold drag-handle">{tableType['label']}</div>
        <ButtonGroup color="primary">
          {tableTypes.map((type, i) => (
            <Button
              size="small"
              key={`diff_${i}`}
              onClick={() => setTableType(type)}
              variant={tableType['key'] === type.key ? 'contained' : 'outlined'}>
              {type.name}
            </Button>
          ))}
        </ButtonGroup>
      </div>
      {tableType['container'] === 'container1' ? (
        <div className={classes.cardcontent} style={{ height: 'calc(100% - 80px)' }} id={tableType['container']}></div>
      ) : null}
      {tableType['container'] === 'container2' ? (
        <div className={classes.cardcontent} style={{ height: 'calc(100% - 80px)' }} id={tableType['container']}></div>
      ) : null}
      {tableType['container'] === 'container3' ? (
        <div className={classes.cardcontent} style={{ height: 'calc(100% - 80px)' }} id={tableType['container']}></div>
      ) : null}
    </Card>
  );
}
