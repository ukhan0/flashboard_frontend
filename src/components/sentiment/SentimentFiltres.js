import React, { useEffect } from 'react';
import { ButtonGroup, Button } from '@material-ui/core';
import { sentimentTypes } from '../../config/filterTypes';
import { useSelector, useDispatch } from 'react-redux';
import { saveSentimentSettings } from './SentimentHelpers';
import { setSentimentFilters } from '../../reducers/Sentiment';

const SentimentFilters = props => {
  const dispatch = useDispatch();

  const { sentiment } = useSelector(state => state.Sentiment);

  const handleClickSentimentType = s => {
    dispatch(setSentimentFilters(s));
  };
  useEffect(() => {
    saveSentimentSettings(sentiment);
  }, [sentiment]);
  return (
    <>
      <ButtonGroup color="primary">
        {sentimentTypes.map((sentimentType, i) => (
          <Button
            size="small"
            key={`sent_${i}`}
            disabled={props.disable}
            onClick={() => handleClickSentimentType(sentimentType.key)}
            variant={sentiment === sentimentType.key ? 'contained' : 'outlined'}>
            {sentimentType.label}
          </Button>
        ))}
      </ButtonGroup>
    </>
  );
};
export default SentimentFilters;
