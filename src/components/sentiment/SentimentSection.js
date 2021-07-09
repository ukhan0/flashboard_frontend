import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { BeatLoader } from 'react-spinners';
import { createHash } from '../../utils/helpers';
import clsx from 'clsx';
import { setSelectedHeadingId } from '../../reducers/Sentiment';
import { upperCase, get } from 'lodash';
const useStyles = makeStyles(theme => ({
  content: {
    fontSize: 12
  },
  loaderSection: {
    textAlign: 'center'
  },
  highlightHeading: {
    background: '#CCC',
    display: 'inline'
  },
  upper: {
    textTransform: 'capitalize'
  }
}));

const SentimentSection = props => {
  const classes = useStyles();
  const calledOnce = React.useRef(true);
  const dispatch = useDispatch();
  const { data, isLoading, selectedHeadingId, isApiResponseReceived } = useSelector(state => state.Sentiment);
  const { heading } = useSelector(state => state.Topic);
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
          li = { path, lvl: lvl + 2, prop, content: obj[prop].replaceAll('\n', '<br/>') };
          acc.push(li);
        }
      }
    }
  }
  if (data) {
    const content = get(data, 'data_json', []);
    visitOutlineObj(displayData, content, 0, '');
  }
  useEffect(() => {
    if (isApiResponseReceived) {
      calledOnce.current = true;
    } else {
      calledOnce.current = false;
    }
  }, [isApiResponseReceived]);

  useEffect(() => {
    if (calledOnce.current) {
      if (displayData.length > 0) {
        let filteredData = displayData.filter(item => (item.content ? item.content.indexOf(heading) !== -1 : null));
        if (filteredData.length > 0) {
          const targetHeading = filteredData[0].path;
          if (targetHeading) {
            dispatch(setSelectedHeadingId(createHash(targetHeading)));
            calledOnce.current = false;
          }
        }
      }
    } else {
      return;
    }
  }, [displayData, dispatch, heading]);

  useEffect(() => {
    if (selectedHeadingId) {
      props.onSelection(selectedHeadingId);
    }
  }, [selectedHeadingId, props]);

  return (
    <div>
      {isLoading ? (
        <div className={classes.loaderSection}>
          <BeatLoader color={'var(--primary)'} size={15} />
        </div>
      ) : (
        displayData.map((d, index) => {
          return index !== 0 ? (
            <div
              key={index}
              style={{
                paddingLeft: d.lvl * 4 + 4,
                fontSize: d.lvl === 1 ? 40 : 100 / d.lvl,
                scrollMarginTop: '210px'
              }}
              id={createHash(d.path)}>
              {d.content ? (
                <p className={classes.content} dangerouslySetInnerHTML={{ __html: d.content }}></p>
              ) : (
                <p
                  className={clsx(
                    classes.upper,
                    selectedHeadingId === createHash(d.path) ? classes.highlightHeading : null
                  )}>
                  {d.lvl === 3 ? upperCase(d.prop) : d.prop}
                </p>
              )}
            </div>
          ) : null;
        })
      )}
    </div>
  );
};

export default SentimentSection;
