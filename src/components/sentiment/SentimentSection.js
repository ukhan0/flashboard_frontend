import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { BeatLoader } from 'react-spinners';
import { createHash } from '../../utils/helpers';
import clsx from 'clsx';
import { setSelectedHeadingId } from '../../reducers/Sentiment';
import { upperCase, get } from 'lodash';
import Rainbow from './Rainbow';
import convert from 'xml-js';
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
    },
    yellowClr: {
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
  const [basicColor] = useState({
    minV: -1,
    maxV: 1,
    n: 100
  });

  const { data, isLoading, selectedHeadingId, isApiResponseReceived, isExtremeSentiment } = useSelector(
    state => state.Sentiment
  );
  const { heading } = useSelector(state => state.Topic);
  useEffect(() => {
    if (selectedHeadingId) {
      setTimeout(() => {
        dispatch(setSelectedHeadingId(null));
      }, 2000);
    }
  }, [selectedHeadingId, dispatch]);

  const displayData = [];
  // const maxValueCheckArr = [];
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
      let headingLevelDetected = false;
      if (detectedLevel === 'l4' || detectedLevel.includes('-st')) {
        let virtualDiv = obj[detectedLevel];
        if (virtualDiv) {
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
              headingLevelDetected = true;
              result.forEach(v => {
                removeHeadingFromContent = v;
                obj['l4-ht'] = v;
              });
            }
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
        if (headingLevelDetected) {
          path += 'id' + detectedLevel.replaceAll(' ', '_').toLowerCase();
        } else {
          path +=
            'id' +
            detectedLevel
              .replaceAll(' ', '_')
              .replaceAll('.', '')
              .toLowerCase();
        }
        path = path.toLowerCase();
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
  const isHTML = str =>
    !(str || '')
      // replace html tag with content
      .replace(/<([^>]+?)([^>]*?)>(.*?)<\/\1>/gi, '')
      // remove remaining self closing tags
      .replace(/(<([^>]+)>)/gi, '')
      // remove extra space at start and end
      .trim();
  let removeHeadingTags = content => {
    let isHeadingClass = content.includes('<heading class=');
    let isHeadingTag = content.includes('</heading>');
    let newContent = content;
    const test = isHTML(content);
    if (!test) {
      newContent = `<span>${content}</span>`;
    }

    if (isHeadingClass && isHeadingTag) {
      let startText = content.indexOf('<heading class=');
      let endText = content.indexOf('</heading>');
      let removeText = content.slice(startText, endText + 10);
      newContent = content.replace(removeText, '');
    }
    return newContent;
  };

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
  const rainbowSection = new Rainbow();
  rainbowSection.setSpectrum('red', 'white', 'white', 'white', 'green');

  const rainbow = new Rainbow();
  rainbow.setSpectrum('red', 'white', 'green');
  const parentClr = val => {
    var pos = parseFloat(((val - basicColor.minV) / (basicColor.maxV - basicColor.minV)) * basicColor.n);
    let clr = rainbowSection.colourAt(pos);
    if (isExtremeSentiment) {
      if (val > 0.2 || val < -0.2) {
        return clr;
      } else {
        // return white
        return 'FFFFFF';
      }
    }
    return clr;
  };
  const childClr = val => {
    if (val) {
      var pos = parseFloat(((val - basicColor.minV) / (basicColor.maxV - basicColor.minV)) * basicColor.n);
      let clr = rainbow.colourAt(pos);
      if (isExtremeSentiment) {
        if (val > 0.2 || val < -0.2) {
          return clr;
        } else {
          // return white
          return 'FFFFFF';
        }
      }
      return clr;
    }
  };
  const newDisplayData = [];
  displayData.forEach(d => {
    const processedData = { ...d };
    processedData.id = createHash(d.path);
    if (d.content) {
      let newContent = removeHeadingTags(d.content);
      const test = isHTML(newContent);
      if (!test) {
        newContent = `<span>${newContent}</span>`;
      }
      processedData.newData = convert.xml2js(newContent.replaceAll('&', ''));
    }
    newDisplayData.push(processedData);
  });

  return (
    <div>
      {isLoading ? (
        <div className={classes.loaderSection}>
          <BeatLoader color={'var(--primary)'} size={15} />
        </div>
      ) : (
        newDisplayData.map((d, index) => {
          return index !== 0 ? (
            <div
              key={index}
              style={{
                paddingLeft: d.lvl * 4 + 4,
                scrollMarginTop: '210px'
              }}
              id={d.id}>
              {d.content ? (
                <div
                  style={{
                    backgroundColor: '#' + parentClr(d.newData.attributes ? d.newData.attributes.v : 0)
                  }}>
                  {d.newData.elements
                    ? d.newData.elements[0].elements.map((a, indexx) => {
                        return (
                          <div key={indexx}>
                            {a.elements
                              ? Array.isArray(a.elements)
                                ? a.elements.map((c, i) => {
                                    return (
                                      <span
                                        key={i}
                                        className={clsx(classes.content, classes.searchResultText)}
                                        style={{
                                          backgroundColor: '#' + childClr(a.attributes ? a.attributes.v : 0)
                                        }}>
                                        {c.type === 'element' ? (
                                          <>
                                            {c.elements ? (
                                              <span
                                                style={{
                                                  backgroundColor: 'orange',
                                                  paddingLeft: 2,
                                                  paddingRight: 2,
                                                  borderRadius: 4
                                                }}>
                                                {c.elements[0].text}
                                              </span>
                                            ) : null}
                                          </>
                                        ) : (
                                          c.text
                                        )}
                                      </span>
                                    );
                                  })
                                : null
                              : null}{' '}
                          </div>
                        );
                      })
                    : null}
                </div>
              ) : (
                <p
                  className={clsx(
                    classes.upper,
                    classes.searchResultTextHeading,
                    classes.searchResultText,
                    classes[`lvl${d.lvl}`],
                    classes.lvl,
                    selectedHeadingId === d.id ? classes.highlightHeading : null
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
