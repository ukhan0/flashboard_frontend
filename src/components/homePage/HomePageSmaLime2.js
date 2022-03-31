import React from 'react';

export default function HomePageSmaLime2() {
  React.useEffect(() => {
    window.SMA.SMAWebTopTenSentiment({
      container: 'containerr',
      width: '100%',
      height: '510',
      apikey: 'a43ba9d17b54090fc5fd179ed7c427838ba0817f',
      ontology: 'ticker',
      order: 'bottom',
      factor: 'sscore',
      filters: 'svolume+gt+12,sscore+lt+0'
    });
  }, []);
  return <div style={{ height: '100%' }} id="containerr"></div>;
}
