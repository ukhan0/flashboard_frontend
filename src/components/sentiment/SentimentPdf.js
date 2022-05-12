import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import config from '../../config/config';
import { BeatLoader } from 'react-spinners';
const SentimentPdf = props => {
  const [isLoading, setIsloading] = useState(false);
  const { selectedItem } = useSelector(state => state.Watchlist);
  const [height, setHeight] = useState(3000);
  const sentimentIframe = useRef(null);

  if (!selectedItem) {
    return;
  }

  // handle iframe height
  const handleHeightChange = () => {
    setIsloading(false);
    //const realHeight = sentimentIframe.current.contentHeight;
    //setHeight(realHeight);
  };

  return (
    <>
      {isLoading ? (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          {' '}
          <BeatLoader color={'var(--primary)'} loading={true} size={10} />
        </div>
      ) : null}

      <iframe
        ref={sentimentIframe}
        src={`${config.sentimentIframUrl}?filling_id=${selectedItem.recentId}`}
        title="Sentiment"
        width="100%"
        height={`${height}px`}
        samesite="None"
        frameBorder="0"
        id="Sentiments"
        onLoad={() => handleHeightChange()}
      />
    </>
  );
};

export default SentimentPdf;
