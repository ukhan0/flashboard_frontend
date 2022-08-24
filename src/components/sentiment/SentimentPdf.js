import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import config from '../../config/config';
import { BeatLoader } from 'react-spinners';

const SentimentPdf = props => {
  const { innerHeight } = window;
  const { selectedItem } = useSelector(state => state.Watchlist);
  const [height, setHeight] = useState(innerHeight);
  const sentimentIframe = useRef(null);
  const [yHeight, setYHeight] = useState(0);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
      const handleScroll = event => {
        const currentYheight = window.scrollY;
        if (currentYheight > yHeight) {
          setYHeight(currentYheight);
          setHeight(window.scrollY + innerHeight);
        }
      };
      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
  }, [innerHeight, yHeight]);

  if (!selectedItem) {
    return;
  }

  const onLoadComplete = () => {
    setIsloading(false);
    // window.removeEventListener('scroll', () => {});
  };

  return (
    <>
      {isLoading ? (
        <div style={{ textAlign: 'center', margin: '10px 0' }}>
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
        onLoad={onLoadComplete}
        scrolling="no"
      />
    </>
  );
};

export default SentimentPdf;
