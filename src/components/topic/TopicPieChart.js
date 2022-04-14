import React, { useEffect, useState } from 'react';
import { Card, Button } from '@material-ui/core';
import TopicSectorChart from './TopicSectorChart';
import TopicIndustryChart from './TopicIndustryChart';
import { useSelector, useDispatch } from 'react-redux';
import { get, findIndex } from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
  setSelectedSector,
  setSelectedIndustries,
  setSelectedUniverse,
  setSelectedCountry
} from '../../reducers/Topic';

const useStyles = makeStyles(_theme => ({
  clickable: {
    cursor: 'pointer'
  },
  contentSection: {
    height: 300
  }
}));

export default function TopicPieChart(props) {
  const classes = useStyles();
  const { searchResult, selectedSector, selectedCountry } = useSelector(state => state.Topic);
  const [sectorData, setSectorData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const rawData = get(searchResult, 'buckets.groupBySectorIndustry', []);
    const sectorDataLocal = [];

    rawData.forEach(rd => {
      const sectorName = get(rd, 'key.gs', null);
      const docCount = get(rd, 'doc_count', 0);
      if (!sectorName) {
        return;
      }
      const sectorIndex = findIndex(sectorDataLocal, sd => sd.name === sectorName);
      if (sectorIndex !== -1) {
        sectorDataLocal[sectorIndex].docCount += docCount;
      } else {
        sectorDataLocal.push({
          name: sectorName,
          y: docCount,
          drilldown: sectorName
        });
      }
    });
    setSectorData(sectorDataLocal);
  }, [searchResult]);

  const resetChartSelection = () => {
    dispatch(setSelectedCountry(null));
    dispatch(setSelectedSector(null));
    dispatch(setSelectedIndustries([]));
    dispatch(setSelectedUniverse('all'));
    props.onChange();
  };
  let searchIndex = JSON.parse(localStorage.getItem('searchIndex')) || {};

  return (
    <>
      <Card className="card-box mb-4">
        <div className="card-header">
          <div className="card-header--title">
            <span className={'font-weight-bold'}>
              {searchIndex['id'] === 2 || searchIndex['id'] === 3
                ? 'Country'
                : selectedSector
                ? selectedSector
                : 'Sector'}
            </span>
          </div>
          {selectedSector || selectedCountry ? (
            <div>
              <Button className="m-0 p-0 btn text-warning" size="small" onClick={resetChartSelection}>
                Reset
              </Button>
            </div>
          ) : null}
        </div>
        <div className={clsx('mb-2', classes.contentSection)}>
          {sectorData.length === 1 && searchIndex['id'] !== 2 && searchIndex['id'] !== 3 ? (
            <TopicIndustryChart handleIndustryClick={props.onChange} />
          ) : (
            <TopicSectorChart handleSectorClick={props.onChange} />
          )}
        </div>
      </Card>
    </>
  );
}
