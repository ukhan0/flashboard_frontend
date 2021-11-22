import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import FilingsTimelineChart from './FilingsTimelineChart ';
import FilingsDetailsGraph from './FilingsDetailsGraph';
import { getCompanyFilingListing, getCompanyFilingGraphData, getCompanyFilingRevenueData } from './FillingAction';
import FilingsCards from './FillingsCardData';
import FilingsCompanyDetails from './FilingsCompanyDetails';
import { setCompanyFillingGraphData } from '../../reducers/Filings';
import FillingTable from './FilingsTable';
const useStyles = makeStyles(theme => ({
  companyDetail: {
    top: 60,
    position: 'sticky',
    padding: 15,
    zIndex: 1
  },
  filingsDetailsGraph: {
    marginTop: '10px'
  },
  companyTimelineChart: {
    top: 60,

    padding: 15
  }
}));

const Filings = () => {
  const dispatch = useDispatch();
  const { selectedItem } = useSelector(state => state.Watchlist);
  const { sidebarToggle } = useSelector(state => state.ThemeOptions);
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    dispatch(setCompanyFillingGraphData([]));
    dispatch(getCompanyFilingListing());
    dispatch(getCompanyFilingGraphData());
    // dispatch(getCompanyFilingRevenueData());
  }, [dispatch]);

  if (!selectedItem) {
    history.push('/watchlist');
  }

  return selectedItem ? (
    <div>
      <div className={classes.companyDetail}>{sidebarToggle ? <FilingsCompanyDetails /> : null}</div>
      <div className={classes.companyTimelineChart}>
        <FilingsTimelineChart />
      </div>
      <div>
        <FilingsCards />
      </div>
      <div className={classes.filingsDetailsGraph}>
        <FilingsDetailsGraph />
      </div>
      <div>
        <FillingTable />
      </div>
    </div>
  ) : null;
};

export default Filings;
