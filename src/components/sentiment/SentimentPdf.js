import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import config from '../../config/config';
import { BeatLoader } from 'react-spinners';
import Dialog from '@material-ui/core/Dialog';
import { Grid } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const SentimentPdf = ({ closeOpenPdfPopup }) => {
  const { selectedItem } = useSelector(state => state.Watchlist);
  const [isLoading, setIsloading] = useState(true);

  if (!selectedItem) {
    return;
  }
  return (
    <div style={{ overflow: 'hidden' }}>
      <Dialog open={true} fullWidth={true} maxWidth="xl" onClose={closeOpenPdfPopup}>
        <Grid style={{ height: '95vh', overflow: 'hidden' }}>
          <Grid container justify="flex-end">
            <CloseIcon
              style={{
                cursor: 'pointer',
                margin: '-8px 0 0 8px',
                background: '#5383ff',
                position: 'fixed',
                borderRadius: '12px',
                color: 'white',
                border: '1px solid #ccc'
              }}
              onClick={closeOpenPdfPopup}
            />
          </Grid>
          {isLoading && (
            <div style={{ textAlign: 'center' }}>
              <BeatLoader color={'var(--primary)'} loading={true} size={10} />
            </div>
          )}
          <iframe
            src={`${config.sentimentIframUrl}?filling_id=${selectedItem.recentId}`}
            title="Sentiment"
            width="100%"
            height={isLoading ? '97%' : '100%'}
            samesite="None"
            frameBorder="0"
            id="Sentiments"
            onLoad={() => setIsloading(false)}
          />
        </Grid>
      </Dialog>
    </div>
  );
};

export default SentimentPdf;
