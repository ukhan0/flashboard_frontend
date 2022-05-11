import React from 'react';
import { Drawer } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import SentimentTableOfContent from './SentimentTableOfContent';
import { setSentimentDrawerOpen, setShowTocButton, setCurrentToc } from '../../reducers/Sentiment';

const SentimentDrawer = props => {
  const dispatch = useDispatch();
  const { isSentimentDrawerOpen } = useSelector(state => state.Sentiment);

  const handleCloseDrawer = () => {
    dispatch(setSentimentDrawerOpen(false));
    dispatch(setCurrentToc(false));
    dispatch(setShowTocButton(true));
  };

  return (
    <React.Fragment>
      <Drawer anchor={'right'} open={isSentimentDrawerOpen} onClose={handleCloseDrawer}>
        <SentimentTableOfContent
          highlightsData={props.highlightsData}
          tableData={props.tableData}
          onSelection={props.onSelection}
          clickHandle={props.clickHandle}
        />
      </Drawer>
    </React.Fragment>
  );
};

export default SentimentDrawer;
