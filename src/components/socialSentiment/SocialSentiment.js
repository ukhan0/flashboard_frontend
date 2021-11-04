import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const SocialSentiment = () => {
  const history = useHistory();
  const { selectedItem } = useSelector(state => state.Watchlist);
  if (!selectedItem) {
    history.push('/watchlist');
  }
  React.useEffect(() => {
    let ticker = selectedItem ? selectedItem.ticker : null;
    window.SMA.SMAIntraDay({
      container: 'sma_intraday_container',
      width: '100%',
      height: '550',
      ontology: 'ticker',
      apikey: '354fa8b5d5639db1b72b4ad2434c780309ad1f52',
      subjects: ticker
    });

    window.SMA.SMAIntraDayDetail({
      container: 'sma_intraday_detailed_container',
      width: '100%',
      height: '650',
      apikey: '354fa8b5d5639db1b72b4ad2434c780309ad1f52',
      ontology: 'ticker',
      subjects: ticker,
      // hideDropdown: true,
      showHeading: true,
      // chartColor: 'f89d03',
      hideHeader: true
    });
  }, [selectedItem]);

  return (
    <div>
      <div id="sma_intraday_container"></div>
      <div style={{ height: '100%' }} id="sma_intraday_detailed_container"></div>
    </div>
  );
};
export default SocialSentiment;
