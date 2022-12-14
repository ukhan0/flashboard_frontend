import React, { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import Card from '@material-ui/core/Card';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';

const tableTypes =
  process.env?.REACT_APP_DOMAIN_NAME === 'TMX'
    ? [
        { name: 'Canada', key: 'canada', sort: 'tsx', container: 'heatmap-container2' },
        { name: 'U.S.', key: 'us', sort: 'ticker', container: 'heatmap-container1' }
      ]
    : [
        { name: 'U.S.', key: 'us', sort: 'ticker', container: 'heatmap-container1' },
        { name: 'Canada', key: 'canada', sort: 'tsx', container: 'heatmap-container2' }
      ];

export default function HomePageHeatMap() {
  const [isLoading, setIsLoading] = useState(true);
  const [tableType, setTableType] = useState(tableTypes[0]);
  const dispatch = useDispatch();
  const { homePageSelectedWidgetRegion } = useSelector(state => state.HomePage);

  useEffect(() => {
    window.SMA.HeatmapWidget({
      container: tableType['container'],
      width: '100%',
      height: '580',
      apikey: '907cdf5f789e613d36f0b4dda38930fb1dc590bf',
      ontology: tableType['sort'],
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
  }, [dispatch, tableType]);

  useEffect(() => {
    if (homePageSelectedWidgetRegion.type === 'Canada') {
      setTableType(tableTypes.find(item => item.key === 'canada'));
    } else {
      setTableType(tableTypes.find(item => item.key === 'us'));
    }
  }, [homePageSelectedWidgetRegion]);

  return (
    <Card className="card-box mb-4" style={{ height: '100%' }}>
      {isLoading ? (
        <div style={{ textAlign: 'center' }}>
          <BeatLoader color={'var(--primary)'} loading={true} size={10} />
        </div>
      ) : null}
      <div className="card-header" style={{ padding: '6px 20px' }}>
        <div className="card-header--title font-weight-bold drag-handle">Heat Map</div>
        <ButtonGroup color="primary">
          {tableTypes.map((type, i) => (
            <Button
              size="small"
              key={`diff_${i}`}
              onClick={() => setTableType(type)}
              variant={tableType['key'] === type.key ? 'contained' : 'outlined'}>
              {type.name}
            </Button>
          ))}
        </ButtonGroup>
      </div>

      {tableType['container'] === 'heatmap-container1' ? (
        <div style={{ height: '100%', overflow: 'auto' }} id={tableType['container']}></div>
      ) : null}
      {tableType['container'] === 'heatmap-container2' ? (
        <div style={{ height: '100%', overflow: 'auto' }} id={tableType['container']}></div>
      ) : null}
    </Card>
  );
}
