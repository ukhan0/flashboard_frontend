import React, { useEffect } from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { sentimentTypes } from '../../config/filterTypes';
import { useSelector, useDispatch } from 'react-redux';
import { saveSentimentSettings } from './SentimentHelpers';
import { setSentimentFilters } from '../../reducers/Sentiment';

const SentimentFilters = () => {
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
            disabled={false}
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
