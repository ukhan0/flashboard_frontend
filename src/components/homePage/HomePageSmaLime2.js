import React from 'react';
import { Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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
export default function HomePageSmaLime2() {
  const classes = useStyles();
  React.useEffect(() => {
    var factorsData = {
      description: { text: 'Company Name' },
      sscore: { text: 'Sentiment', neg: 'red', pos: 'green' },
      svscore: { text: 'Relative Volume', neg: 'red', pos: 'green' },
      svolume: { text: 'Volume' }
    };
    window.SMA.SMAWebTopTenSentiment({
      container: 'container2',
      width: '100%',
      height: '100%',
      title: 'Real Time Social Sentiment Market Snapshot',
      apikey: 'eb521eaa75f8e0b28b88c81a6e272d9ee03f75ee',
      customCSS:
        'h1,h2{display:none;} .button-group{display:none;} body{background:#b7b7b7;}.Table-holder{margin:0;}.new-btn{border-radius:0;border:1px solid #fff;color:#fff;padding:5px;font-size:12px;height:25px}.button-group{padding:10px 0} .newTable thead>tr {    color: #000000;    background-color: #f0f0f0;    text-align: center;}  .newTable .tbody-row {    background-color: #ffffff;    height: 40px;   margin-bottom: 1px;}.newTable tr{color:#ffffff;}.tbody-row td {    color: #535353;} .Table-holder{padding: 0px;!important} .newTable{width:100%!important;} .newTable .tbody-row:hover {background: #e7f4fe;',
      ontology: 'ticker',
      order: 'bottom',
      sort: 'svolume+desc,sscore+desc',
      factor: factorsData,
      filters: 'svolume+gt+12,sscore+lt+0,lastclose+gt+5'
    });
  }, []);
  return (
    <Card className="card-box mb-4">
      <div className={classes.card}>
        <h2 className="card-header--title font-weight-bold">Social Bottom Ten Stocks</h2>
        <div className={classes.cardcontent} style={{ height: '450px', width: '600px' }} id="container2"></div>
      </div>
    </Card>
  );
}
