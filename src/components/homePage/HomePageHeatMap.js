import React, { useCallback } from 'react';
import { BeatLoader } from 'react-spinners';
import { Card } from '@material-ui/core';
import { formatComapnyData } from '../watchlist/WatchlistHelpers';
import { setSelectedWatchlist } from '../../reducers/Watchlist';
import { setSidebarToggle, setSidebarToggleMobile } from '../../reducers/ThemeOptions';
import { useSelector, useDispatch } from 'react-redux';
export default function HomePageHeatMap() {
  const [isLoading, setIsLoading] = React.useState(true);
  const { completeCompaniesData } = useSelector(state => state.Watchlist);
  const dispatch = useDispatch();
  const getCompanyByTicker = useCallback(
    ticker => {
      let rawData = completeCompaniesData;
      let company = rawData.find(sd => sd.ticker === ticker);
      return company;
    },
    [completeCompaniesData]
  );
  React.useEffect(() => {
    window.SMA.HeatmapWidget({
      container: 'sma_widget_container',
      width: '100%',
      height: '600',
      apikey: 'aa0bf3957e823316e5dc18c031c6ddc8074b980d',
      ontology: 'ticker',
      positiveColor: '00cc00',
      negativeColor: 'cc0000',
      neutralColor: '999999',
      minPositiveColor: '009900',
      minNegativeColor: '990000',
      hideHeader: 'true',
      hideFactors: 'true',
      onSymbolLoaded: function(message) {
        let selectedItem = getCompanyByTicker(message.tickerName);
        if (!selectedItem) {
          // props.handleSnackBar({ isSnackBar: true, message: 'Company Not Found', severity: 'info' });
          return;
        }
        let company = formatComapnyData(selectedItem);
        if (company) {
          let last10k = new Date(company['last10k']);
          let last10q = new Date(company['last10q']);
          company.recentId = last10k > last10q ? company.recentId10k : company.recentId10q;
        }
        dispatch(setSelectedWatchlist(company));
        dispatch(setSidebarToggle(false));
        dispatch(setSidebarToggleMobile(false));
      },
      onWidgetLoaderLoaded: () => {
        setIsLoading(false);
      }
    });
  }, [dispatch, getCompanyByTicker]);
  return (
    <Card className="card-box mb-4" style={{ maxHeight: '600px' }}>
      {isLoading ? (
        <div style={{ textAlign: 'center' }}>
          <BeatLoader color={'var(--primary)'} loading={true} size={10} />
        </div>
      ) : null}
      <div style={{ height: '100%' }} id="sma_widget_container"></div>
    </Card>
  );
}
