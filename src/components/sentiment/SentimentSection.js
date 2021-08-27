import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { BeatLoader } from 'react-spinners';
import { createHash } from '../../utils/helpers';
import clsx from 'clsx';
import { setSelectedHeadingId } from '../../reducers/Sentiment';
import { upperCase, get } from 'lodash';
const useStyles = makeStyles(theme => ({
  lvl: {
    fontSize: 20
  },
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
  },
  lvl2: {
    fontSize: 28
  },
  lvl4: {
    fontSize: 24
  },
  lvl6: {
    fontSize: 22
  },

  lvl8: {
    fontSize: 20
  },
  searchResultText: {
    '& .yellowColor': {
      backgroundColor: 'orange',
      paddingLeft: 2,
      paddingRight: 2,
      borderRadius: 4
    }
  },
  searchResultTextHeading: {
    '& .yellowcolor': {
      backgroundColor: 'orange',
      paddingLeft: 2,
      paddingRight: 2,
      borderRadius: 4
    }
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
  function titleCase(str) {
    let splitStr = str.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(' ');
  }
  function detectObjFromCurrentObj(obj) {
    let ObjIdx = '';
    for (let prop in obj) {
      if (typeof obj[prop] === 'object') {
        ObjIdx = prop;
      }
    }
    return ObjIdx;
  }
  function detectSecTextFromCurrentObj(obj) {
    let stIdx = '';
    for (let prop in obj) {
      let regex = /^[a-zA-Z]{1}[0-9]{1}$/;
      if (prop.includes('-st') || regex.test(prop) || prop === 'data') {
        stIdx = prop;
        if (obj[prop] === 'data') {
          stIdx = 'data';
        }
      }
    }
    return stIdx;
  }
  function detectlevelCurrentObj(obj) {
    let stIdx = '';
    for (let prop in obj) {
      let regex = /^l{1}[0-9]{1}$/;
      if (prop.includes('-st')) {
        stIdx = prop;
      } else if (typeof obj[prop] === 'object') {
        stIdx = prop;
      } else if (regex.test(prop)) {
        stIdx = obj[prop];
        if (prop === 'l4') {
          stIdx = prop;
          if (obj[stIdx] === 'data') {
            stIdx = 'data';
          }
        }
      }
    }
    return stIdx;
  }
  function visitOutlineObj(acc, obj, lvl, path) {
    lvl += 1;
    for (let prop in obj) {
      let removeHeadingFromContent;
      let detectedLevel = detectlevelCurrentObj(obj);
      if (detectedLevel === 'l4' || detectedLevel.includes('-st')) {
        let virtualDiv = obj[detectedLevel];
        let vHeadingElem = virtualDiv.includes('<heading class=');
        if (vHeadingElem) {
          const extractQuote = virtualDiv.match(/(?:"[^"]*"|^[^"]*$)/)[0].replace(/"/g, '');
          if (extractQuote.includes('heading')) {
            const removeClass = virtualDiv.replace(' class=', '');
            const removeDoubleQuotes = removeClass.replace(/['"]+/g, '');
            const removeHeading = removeDoubleQuotes.replace(extractQuote, '');
            let result = removeHeading.match(/<heading>(.*?)<\/heading>/g).map(function(val) {
              return val.replace(/<\/?heading>/g, '');
            });
            detectedLevel = extractQuote;
            result.forEach(v => {
              removeHeadingFromContent = v;
              obj['l4-ht'] = v;
            });
          }
        }
      }
      let li = {};
      if (!isNaN(prop)) {
        visitOutlineObj(acc, obj[prop], lvl, path);
      }
      if (prop.includes('-ht')) {
        prop = obj[prop];
        let objIdx = detectObjFromCurrentObj(obj);
        let stIdx = detectSecTextFromCurrentObj(obj);
        path += `.${prop}`;
        if (prop !== 'Headingtag' && prop !== 'Sectiontext' && prop !== 'data') {
          if (lvl === 1 && prop.includes('.htm')) {
          } else {
            li = { path, lvl, prop: titleCase(prop) };
            acc.push(li);
          }
        }
        if (typeof obj[objIdx] === 'object') {
          visitOutlineObj(acc, obj[objIdx], lvl, path);
        } else {
          if (prop !== 'Headingtag' && prop !== 'Sectiontext' && obj[stIdx]) {
            let content = obj[stIdx].replaceAll('\n', '<br/>');
            li = { path, lvl: lvl + 2, prop, content: content.replace(removeHeadingFromContent, '') };
            acc.push(li);
          }
        }
      }
    }
  }
  if (data) {
    const content = get(data, 'sma_data_json', []);
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
        let filteredContentData = displayData.filter(item =>
          item.content ? item.content.indexOf(heading ? heading.firstLine : null) !== -1 : null
        );
        if (filteredContentData.length > 0) {
          const targetHeading = filteredContentData[0].path;
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
                scrollMarginTop: '210px'
              }}
              id={createHash(d.path)}>
              {d.content ? (
                <p
                  className={clsx(classes.content, classes.searchResultText)}
                  dangerouslySetInnerHTML={{ __html: d.content }}></p>
              ) : (
                <p
                  className={clsx(
                    classes.upper,
                    classes.searchResultTextHeading,
                    classes[`lvl${d.lvl}`],
                    classes.lvl,
                    selectedHeadingId === createHash(d.path) ? classes.highlightHeading : null
                  )}
                  dangerouslySetInnerHTML={{ __html: d.lvl === 4 ? upperCase(d.prop) : d.prop }}></p>
              )}
            </div>
          ) : null;
        })
      )}
    </div>
  );
};

export default SentimentSection;
