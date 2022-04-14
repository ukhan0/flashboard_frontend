import React from 'react';
import { Card, ButtonGroup, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
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
  const [tableType, setTableType] = React.useState(tableTypes[0]);
  React.useEffect(() => {
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
      apikey: 'eb521eaa75f8e0b28b88c81a6e272d9ee03f75ee',
      customCSS:
        'h1,h2{display:none;} .button-group{display:none;} body{background:#b7b7b7;}.Table-holder{margin:0;}.new-btn{border-radius:0;border:1px solid #fff;color:#fff;padding:5px;font-size:12px;height:25px}.button-group{padding:10px 0} .newTable thead>tr {    color: #000000;    background-color: #f0f0f0;    text-align: center;}  .newTable .tbody-row {    background-color: #ffffff;    height: 40px;   margin-bottom: 1px;}.newTable tr{color:#ffffff;}.tbody-row td {    color: #535353;} .Table-holder{padding: 0px;!important} .newTable{width:100%!important;} .newTable .tbody-row:hover {background: #e7f4fe;',
      ontology: 'ticker',
      order: 'top',
      sort: tableType['sort'],
      factor: factorsData,
      filters: 'svolume+gt+12,lastclose+gt+5'
    });
  }, [tableType]);

  return (
    <Card className="card-box mb-4" style={{ maxHeight: '600px' }}>
      <div className={clsx('card-header')}>
        <div className="card-header--title font-weight-bold">{tableType['label']}</div>
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
        <div
          className={classes.cardcontent}
          style={{ height: '450px', width: '600px' }}
          id={tableType['container']}></div>
      ) : null}
      {tableType['container'] === 'container2' ? (
        <div
          className={classes.cardcontent}
          style={{ height: '450px', width: '600px' }}
          id={tableType['container']}></div>
      ) : null}
      {tableType['container'] === 'container3' ? (
        <div
          className={classes.cardcontent}
          style={{ height: '450px', width: '600px' }}
          id={tableType['container']}></div>
      ) : null}
    </Card>
  );
}
