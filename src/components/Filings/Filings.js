import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import FilingsCompanyDetails from './FilingsCompanyDetails';
import FilingsResultsTable from './FilingsResultsTable';
import FilingsDetailsGraph from './FilingsDetailsGraph';
import FilingsCards from '../sentiment/SentimentCard'

const useStyles = makeStyles(theme => ({
  companyDetail: {
    top: 70,
    position: 'sticky',
    padding: 15,
    zIndex: 1,
  }
}));

const Filings = () => {
  
  const { selectedItem } = useSelector(state => state.Watchlist);
  const classes = useStyles();
  const history = useHistory();
  
  if (!selectedItem) {
    history.push('/watchlist');
  }
  
  return (
    selectedItem ?
    <div>   
      <div className={classes.companyDetail}>
        <FilingsCompanyDetails />
      </div>
      <div>
        <FilingsCards/>
      </div>
      <div style={{marginTop:'10px'}}>
        <FilingsDetailsGraph />
      </div>
      <div>
        <FilingsResultsTable />
      </div>
    </div>
    :
    null
  );
};

export default Filings;
