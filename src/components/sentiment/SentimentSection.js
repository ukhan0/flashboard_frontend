import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { BeatLoader } from 'react-spinners';
import { createHash } from '../../utils/helpers';
import { setSelectedHeadingId } from '../../reducers/Sentiment';
const useStyles = makeStyles(theme => ({
  content: {
    fontSize: 12
  },
  loaderSection: {
    textAlign: 'center'
  },
  highlightHeading: {
    background:'#CCC',
    display:'inline'
  }
}));

const SentimentSection = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { data, isLoading, selectedHeadingId } = useSelector(state => state.Sentiment);
  useEffect(() => {
    if (selectedHeadingId) {
      setTimeout(() => {
        dispatch(setSelectedHeadingId(null));
      }, 2000);
    }
  }, [selectedHeadingId, dispatch]);

  const displayData = [];
  function visitOutlineObj(acc, obj, lvl, path) {
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
      } else {
        if (prop !== 'Headingtag' && prop !== 'Sectiontext') {
          li = { path, lvl: lvl + 2, prop, content: obj[prop].replace('<br/>', '\n') };
          acc.push(li);
        }
      }
    }
  }

  if (data) {
    visitOutlineObj(displayData, data, 0, '');
  }

  return (
    <div>
      {isLoading ? (
        <div className={classes.loaderSection}>
          <BeatLoader color={'var(--primary)'} size={15} />
        </div>
      ) : (
        displayData.map((d, index) => {
          return (
            <div
              key={index}
              style={{
                paddingLeft: d.lvl * 4 + 4,
                fontSize: d.lvl === 1 ? 40 : 100 / d.lvl,
                scrollMarginTop: '5em',
                textTransform:'capitalize'
              }}
              id={createHash(d.path)}>
              {d.content ? (
                <p className={classes.content}>{d.content}</p>
              ) : (
                <p className={selectedHeadingId === createHash(d.path) ? classes.highlightHeading : null}>{d.prop}</p>
              )}
            </div>
            ) 
        })
      )}
    </div>
  );
};

export default SentimentSection;
