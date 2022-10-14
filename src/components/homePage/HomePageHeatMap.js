import React, { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { Card } from '@material-ui/core';
import { useDispatch } from 'react-redux';
export default function HomePageHeatMap() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    window.SMA.HeatmapWidget({
      container: 'sma_widget_container',
      width: '100%',
      height: '580',
      apikey: 'aa0bf3957e823316e5dc18c031c6ddc8074b980d',
      ontology: 'ticker',
      positiveColor: '00cc00',
      negativeColor: 'cc0000',
      neutralColor: '999999',
      minPositiveColor: '009900',
      minNegativeColor: '990000',
      hideHeader: 'true',
      hideFactors: 'true',
      // onSymbolLoaded: function(message) {},
      onWidgetLoaderLoaded: () => {
        setIsLoading(false);
      }
    });
  }, [dispatch]);
  return (
    <Card className="card-box mb-4" style={{ height: '100%' }}>
      {isLoading ? (
        <div style={{ textAlign: 'center' }}>
          <BeatLoader color={'var(--primary)'} loading={true} size={10} />
        </div>
      ) : null}
      <div className="card-header">
        <div className="card-header--title font-weight-bold drag-handle">Heat Map</div>
      </div>
      <div style={{ height: '100%', overflow: 'auto' }} id="sma_widget_container">
      </div>
    </Card>
  );
}
