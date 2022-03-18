import React from 'react';

export default function HomePageSmaLime() {
  React.useEffect(() => {
    window.SMA.SMAWebTopTenSentiment({
      container: 'container',
      width: '100%',
      height: '510',
      apikey: 'eb521eaa75f8e0b28b88c81a6e272d9ee03f75ee',
      ontology: 'ticker',
      order: 'top',
      factor: 'sscore',
      filters: 'svolume+gt+12,sscore+gt+0,lastclose+gt+5'
    });
  }, []);
  return <div style={{ height: '100%' }} id="container"></div>;
}
