import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useHistory } from 'react-router-dom';
import FilingsDetailsGraph from './FilingsDetailsWordCountGraph';
import {
  getCompanyFilingListing,
  getCompanyFilingGraphData,
  getCompanyFilingRevenueData,
  getCompanyPrice0verlayOnTimeline,
  clearStateAndCancelApiCalls
} from './FillingAction';
import FilingsCards from './FillingsCardData';
import FilingsCompanyDetails from './FilingsCompanyDetails';
import FillingTable from './FilingsTable';
import FillingCompanyStockChart from './FillingCompanyStockChart';
const useStyles = makeStyles(theme => ({
  companyDetail: {
    top: 60,
    position: 'sticky',
    padding: '0 15px',
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
  const { fillingsGraphData, priceOverlay } = useSelector(state => state.Filings);
  const { selectedItem } = useSelector(state => state.Watchlist);
  const { sidebarToggle } = useSelector(state => state.ThemeOptions);
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    dispatch(getCompanyFilingListing());
    dispatch(getCompanyFilingGraphData());
    dispatch(getCompanyFilingRevenueData());
    dispatch(getCompanyPrice0verlayOnTimeline());
    return () => {
      dispatch(clearStateAndCancelApiCalls());
    };
  }, [dispatch, selectedItem]);

  if (!selectedItem) {
    history.push('/watchlist');
  }
  return selectedItem ? (
    <div>
      {sidebarToggle && (
        <div className={classes.companyDetail}>
          <FilingsCompanyDetails />
        </div>
      )}
      <div className={classes.companyTimelineChart}>
        {
          !!priceOverlay.length ?
            <FillingCompanyStockChart />
            : null
        }
      </div>
      <div>{fillingsGraphData.length > 0 ? <FilingsCards /> : null}</div>
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
