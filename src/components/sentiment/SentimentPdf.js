import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import config from '../../config/config';
import { BeatLoader } from 'react-spinners';
const SentimentPdf = props => {
  const [isLoading, setIsloading] = useState(true);
  const { selectedItem } = useSelector(state => state.Watchlist);
  if (!selectedItem) {
    return;
  }
  return (
    <>
      {isLoading ? (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          {' '}
          <BeatLoader color={'var(--primary)'} loading={true} size={10} />
        </div>
      ) : null}

      <iframe
        src={`${config.sentimentIframUrl}?filling_id=${selectedItem.recentId}`}
        title="Sentiment"
        width="100%"
        height="1000px"
        samesite="None"
        frameBorder="0"
        id="Sentiments"
        onLoad={() => {
          setIsloading(false);
        }}
      />
    </>
  );
};

export default SentimentPdf;
