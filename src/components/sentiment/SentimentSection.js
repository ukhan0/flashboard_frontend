import React from 'react';
import { useSelector } from 'react-redux';

const SentimentSection = props => {

  const { data } = useSelector(state => state.Sentiment);

  const displayData = []
  function visitOutlineObj (acc, obj, lvl, path) {
    lvl += 1;
    for (var prop in obj) {
      var li = {};
      path += `.${prop}`
      if (prop !== 'Headingtag' && prop !== 'Sectiontext' && prop !== 'data') {
        li = {path, lvl, prop};
        acc.push(li);
      }

      if (typeof obj[prop] === 'object') {
        visitOutlineObj(acc, obj[prop], lvl, path);
      } else {  
        if (prop !== 'Headingtag' && prop !== 'Sectiontext') {
          li = {path, lvl: lvl+2, prop, content: obj[prop].replaceAll('\n', '<br/>')};
          acc.push(li);
        }
      }
    }
  }
  visitOutlineObj(displayData, data, 0, '')

  return (
    <div>
      {
        displayData.map((d, index) =>
          <div key={index} style={{paddingLeft: (d.lvl * 4) +4}} id={d.path}>
            {d.content ? d.content : d.prop}
          </div>
        )
      }
    </div>
  );
};

export default SentimentSection;
