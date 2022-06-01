import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const SocialSentiment = () => {
  const history = useHistory();
  const { selectedItem } = useSelector(state => state.Watchlist);
  if (!selectedItem) {
    history.push('/watchlist');
  }

  const getSentimentUrl = selectedItem => {
    let url = null;
    if (selectedItem.flag === '2') {
      url = `${selectedItem.ticker}?ontology=ticker`;
    } else if (selectedItem.flag === '6') {
      url = `QQQ?ontology=etf`;
    } else {
      url = `${selectedItem.ticker}.TO?ontology=tsx`;
    }
    return url
  };
  return (
    <div>
      <div>
        {selectedItem ? (
          <iframe
            src={`https://activetraders.socialmarketanalytics.com/charts/sentiment/${getSentimentUrl(
              selectedItem
            )}&token=618fe17256f94d64d61ecca43988533e`}
            title="Social Sentiment"
            width="100%"
            height={`${window.innerHeight - 90}px`}
            samesite="None"
            frameBorder="0"
          />
        ) : null}
      </div>
    </div>
  );
};
export default SocialSentiment;
