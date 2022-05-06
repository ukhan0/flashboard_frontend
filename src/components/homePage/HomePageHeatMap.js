import React from 'react';
import { BeatLoader } from 'react-spinners';
import { Card } from '@material-ui/core';
export default function HomePageHeatMap() {
  const [isLoading, setIsLoading] = React.useState(true);
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
      onWidgetLoaderLoaded: () => {
        setIsLoading(false);
      }
    });
  }, []);
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
