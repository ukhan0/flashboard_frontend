import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import FilingsDetailsGraph from './FilingsDetailsGraph';
import {
  getCompanyFilingListing,
  getCompanyFilingGraphData,
  getCompanyFilingRevenueData,
  getCompanyPrice0verlayOnTimeline
} from './FillingAction';
import FilingsCards from './FillingsCardData';
import FilingsCompanyDetails from './FilingsCompanyDetails';
import FillingTable from './FilingsTable';
import FilingsTimelineChart from './FillingCompanyPriceOverlay';
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


const FilingsTimelineChartMemo = React.memo(FilingsTimelineChart, (prevProps, nextProps) => {
  // compare props to decide either prev and next props are equal are not.
  // currently we don't have have any props. 
  return true;    // true means, don't re-render the component.
});

const Filings = () => {
  const dispatch = useDispatch();
  const { selectedItem } = useSelector(state => state.Watchlist);
  const { sidebarToggle } = useSelector(state => state.ThemeOptions);
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    dispatch(getCompanyFilingListing());
    dispatch(getCompanyFilingGraphData());
    dispatch(getCompanyFilingRevenueData());
    dispatch(getCompanyPrice0verlayOnTimeline());
  }, [dispatch, selectedItem]);

  if (!selectedItem) {
    history.push('/watchlist');
  }

  return selectedItem ? (
    <div>
      <div className={classes.companyDetail}>{sidebarToggle ? <FilingsCompanyDetails /> : null}</div>
      <div className={classes.companyTimelineChart}>
        <FilingsTimelineChartMemo />
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
