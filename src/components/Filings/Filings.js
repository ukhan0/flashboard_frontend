import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import FilingsResultsTable from './FilingsResultsTable';
import FilingsDetailsGraph from './FilingsDetailsGraph';
import FilingsCards from '../sentiment/SentimentCard';
import { getCompanyFilingListing } from './FillingAction';
import FilingsCompanyDetails from './FilingsCompanyDetails';
const useStyles = makeStyles(theme => ({
  companyDetail: {
    top: 70,
    position: 'sticky',
    padding: 15,
    zIndex: 1
  },
  filingsDetailsGraph: {
    marginTop: '10px'
  }
}));

const Filings = () => {
  const dispatch = useDispatch();
  const { selectedItem } = useSelector(state => state.Watchlist);
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    dispatch(getCompanyFilingListing());
  }, [dispatch]);

  if (!selectedItem) {
    history.push('/watchlist');
  }

  return selectedItem ? (
    <div>
      <div className={classes.companyDetail}>
        <FilingsCompanyDetails />
      </div>
      <div>
        <FilingsCards />
      </div>
      <div className={classes.filingsDetailsGraph}>
        <FilingsDetailsGraph />
      </div>
      <div>
        <FilingsResultsTable />
      </div>
    </div>
  ) : null;
};

export default Filings;
