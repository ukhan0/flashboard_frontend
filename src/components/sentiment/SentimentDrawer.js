import React from 'react';
import { Drawer } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { get } from 'lodash';
import SentimentTableOfContent from './SentimentTableOfContent';

const SentimentDrawer = props => {
  const { data, isSentimentDrawerOpen } = useSelector(state => state.Sentiment);
  const displayData = [];
  function visitOutlineObj(acc, obj, lvl, path) {
    if (lvl > 4) return;
    lvl += 1;
    for (var prop in obj) {
      var li = {};
      path += `.${prop}`;
      if (prop !== 'Headingtag' && prop !== 'Sectiontext' && prop !== 'data') {
        li = { path, lvl, prop };
        acc.push(li);
      }
      if (typeof obj[prop] === 'object') {
        visitOutlineObj(acc, obj[prop], lvl, path);
      }
    }
  }
  if (data) {
    const headings = get(data, 'data_json', []);
    visitOutlineObj(displayData, headings, 0, '');
  }
  return (
    <React.Fragment>
      <Drawer anchor={'right'} open={isSentimentDrawerOpen}>
        <SentimentTableOfContent onSelection={props.onSelection} />
      </Drawer>
    </React.Fragment>
  );
};

export default SentimentDrawer;
