import React from 'react';
import { BeatLoader } from 'react-spinners';
export default function HomePageHeatMap() {
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    window.SMA.HeatmapWidget({
      container: 'sma_widget_container',
      width: '100%',
      height: '510',
      apikey: 'aa0bf3957e823316e5dc18c031c6ddc8074b980d',
      ontology: 'ticker',
      positiveColor: '00ffff',
      negativeColor: 'ffff00',
      neutralColor: 'ffffff',
      minPositiveColor: '009999',
      minNegativeColor: '999900',
      onWidgetLoaderLoaded: () => {
        setIsLoading(false);
      }
    });
  }, []);
  return (
    <>
      {isLoading ? (
        <div style={{ textAlign: 'center' }}>
          <BeatLoader color={'var(--primary)'} loading={true} size={10} />
        </div>
      ) : null}

      <div style={{ height: '100%' }} id="sma_widget_container"></div>
    </>
  );
}
