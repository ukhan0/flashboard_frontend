import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Typography, Button, Grid } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import { BeatLoader } from 'react-spinners';
import { createHash } from '../../utils/helpers';
import {
  setSelectedHeadingId,
  setIsPin,
  setSentimentDrawerOpen,
  setShowTocButton,
  setCurrentToc
} from '../../reducers/Sentiment';
import { upperCase, get } from 'lodash';
import clsx from 'clsx';
import pinOpen from '../../assets/images/illustrations/minimize.svg';
import pinClose from '../../assets/images/illustrations/maximize-size-option.svg';
const useStyles = makeStyles(theme => {
  return {
    list: {
      width: '40vw'
    },
    list2: {
      whiteSpace: 'initial'
    },
    listItem: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      paddingRight: 20,
      cursor: 'pointer',
      color: '#0a30f3',
      '&:hover': {
        textDecoration: 'underline'
      }
    },
    drawerBtn: {
      textAlign: 'center',
      marginTop: '5px'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    loaderSection: {
      textAlign: 'center'
    },
    upper: {
      textTransform: 'capitalize'
    },
    pin: {
      overflowY: 'auto',
      height: `${window.innerHeight - 100}px`
    },
    crossIcon: {
      color: 'black'
    },
    link: {
      color: 'white',
      marginRight: '20px',
      '&:hover': {
        color: 'blue'
      }
    }
  };
});

const SentimentTableOfContent = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { data, isLoading, isPin } = useSelector(state => state.Sentiment);
  const { selectedItem } = useSelector(state => state.Watchlist);
  const displayData = [];
  function sortObject(obj) {
    let newObj = [];
    for (let prop in obj) {
      let objs = {};
      if (typeof obj[prop] === 'object') {
        objs[prop] = obj[prop];
        newObj.push(objs);
      } else {
        objs[prop] = obj[prop];
        newObj.unshift(objs);
      }
    }
    let fObj = {};
    for (let prop1 in newObj) {
      for (let prop2 in newObj[prop1]) {
        fObj[prop2] = newObj[prop1][prop2];
      }
    }
    return fObj;
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
  function detectlvlHeading(obj) {
    var stIdx = '';
    for (var prop in obj) {
      // var regex = /^[a-zA-Z]{1}[0-9]{1}$/;
      if (prop === 'l2' || prop === 'l3') {
        stIdx = prop;
      }
    }
    return stIdx;
  }
  function visitOutlineObj(acc, obj, lvl, path) {
    if (lvl > 5) return;
    lvl += 1;
    obj = sortObject(obj);
    // $i = 0;
    for (let prop in obj) {
      let detectedLevel = detectlevelCurrentObj(obj);
      if (detectedLevel === 'l4' || detectedLevel.includes('-st')) {
        let virtualDiv = obj[detectedLevel];
        if (virtualDiv) {
          let vHeadingElem = virtualDiv.includes('<heading class=');
          if (vHeadingElem) {
            const extractValueInsideQuote = virtualDiv.match(/(?:"[^"]*"|^[^"]*$)/)[0].replace(/"/g, '');
            if (extractValueInsideQuote.includes('heading')) {
              const removeClass = virtualDiv.replace(' class=', '');
              const removeDoubleQuotes = removeClass.replace(/['"]+/g, '');
              const removeHeading = removeDoubleQuotes.replace(extractValueInsideQuote, '');
              let result = removeHeading.match(/<heading>(.*?)<\/heading>/g).map(function(val) {
                return val.replace(/<\/?heading>/g, '');
              });
              detectedLevel = extractValueInsideQuote;
              obj['l4-ht'] = result[0];
            }
          }
        }
      }
      let li = {};
      if (prop.includes('-ht')) {
        prop = obj[prop];
        path += 'id' + detectedLevel.replaceAll(' ', '_').replaceAll('.', '');
        path = path.toLowerCase();
        var detectlvlHdng = detectlvlHeading(obj);
        if (detectlvlHdng) {
          prop = obj[detectlvlHdng + '-ht'];
        }
        if (prop !== 'Headingtag' && prop !== 'Sectiontext' && prop !== 'data') {
          if (lvl === 1 && prop.includes('.htm')) {
          } else {
            li = { path, lvl, prop };
            acc.push(li);
          }
        }
      }
      if (typeof obj[prop] === 'object') {
        visitOutlineObj(acc, obj[prop], lvl, path);
      } else {
      }
    }
  }
  if (data) {
    const headings = get(data, 'sma_data_json', []);
    visitOutlineObj(displayData, headings, 0, '');
  }

  const clickHandle = path => {
    props.onSelection(createHash(path));
    dispatch(setSelectedHeadingId(createHash(path)));
  };

  const handlePin = () => {
    if (isPin) {
      dispatch(setIsPin(false));
      dispatch(setSentimentDrawerOpen(true));
    } else {
      dispatch(setIsPin(true));
      dispatch(setSentimentDrawerOpen(false));
      dispatch(setShowTocButton(false));
    }
  };
  const handleClose = () => {
    dispatch(setShowTocButton(true));
    dispatch(setIsPin(false));
    dispatch(setCurrentToc(true));
  };

  const handleCloseDrawer = () => {
    dispatch(setSentimentDrawerOpen(false));
    dispatch(setCurrentToc(false));
    dispatch(setShowTocButton(true));
  };
  return (
    <React.Fragment>
      <div className={isPin ? classes.pin : classes.list}>
        <div className={classes.header}>
          <div></div>
          <div>
            <Typography variant={'h4'}>Table of contents</Typography>
          </div>
          <div>
            <Button onClick={handlePin}>
              {isPin ? (
                <img alt={'UnPin'} style={{ height: '20px', width: '20px' }} src={pinClose} />
              ) : (
                <img alt={'Pin'} style={{ height: '20px', width: '20px' }} src={pinOpen} />
              )}
            </Button>
            {isPin ? (
              <IconButton className={classes.crossIcon} onClick={handleClose}>
                <CloseIcon fontSize="small" />
              </IconButton>
            ) : (
              <IconButton
                className={classes.crossIcon}
                onClick={() => {
                  handleCloseDrawer();
                }}>
                <CloseIcon fontSize="small" />
              </IconButton>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className={classes.loaderSection}>
            <BeatLoader color={'var(--primary)'} size={15} />
          </div>
        ) : (
          displayData.map((d, index) =>
            index !== 0 ? (
              <div
                key={index}
                style={{ paddingLeft: d.lvl * 4 + 4, whiteSpace: 'initial' }}
                className={clsx(classes.listItem, classes.upper)}
                onClick={() => {
                  clickHandle(d.path);
                }}>
                {d.lvl === 4
                  ? upperCase(d.prop)
                  : d.prop
                      .toLowerCase()
                      .replace('data', '')
                      .replace('ex.data', '')
                      .replace('*.data', '')}
              </div>
            ) : null
          )
        )}
        {/* {!isLoading ? <SentimentHighlight clickHandle={clickHandle} /> : null} */}
        {selectedItem ? (
          <Grid container direction="row" justify="flex-end" alignItems="flex-end">
            <Grid item>
              <a
                href={`https://engine-spirit.s-factors.com/dictionary/historysummary?id=${selectedItem.recentId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className={clsx(classes.link)}>Veiw</p>
              </a>
            </Grid>
          </Grid>
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default SentimentTableOfContent;
