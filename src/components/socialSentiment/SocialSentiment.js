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
    let socailArr = {
      2: `${selectedItem.ticker}?ontology=ticker`,
      6: `${selectedItem.ticker}?ontology=etf`,
      13: `${selectedItem.ticker}?ontology=spac`,
      15: `${selectedItem.ticker}.TO?ontology=tsx`,

    }
    return socailArr[selectedItem.flag]??null
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
            height={`${window.innerHeight - 190}px`}
            samesite="None"
            frameBorder="0"
          />
        ) : null}
      </div>
    </div>
  );
};
export default SocialSentiment;
