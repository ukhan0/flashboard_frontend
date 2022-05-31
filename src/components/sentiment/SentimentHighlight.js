import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { get, forEach } from 'lodash';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
const useStyles = makeStyles(theme => ({
  resultHeader: {
    display: 'flex'
  },
  searchResultText: {
    '& .yellowColor': {
      backgroundColor: 'orange',
      paddingLeft: 2,
      paddingRight: 2,
      borderRadius: 4,
      cursor: 'pointer'
    }
  },
  clickable: {
    cursor: 'pointer'
  },
  margin: {
    marginTop: '7px',
    background: 'white',
    marginBottom: '20px'
  },
  documentDate: {
    fontSize: '20px'
  },
  currentCompanyDetail: {
    marginRight: '15px',
    marginTop: '20px',
    marginLeft: '15px',
    top: 60,
    position: 'sticky'
  },
  heading: {
    fontSize: '16px',
    marginBottom: '5px',
    marginLeft: '10px',
    display: 'inline-block',
    fontWeight: 'bold'
  },
  paragraphHeading: {
    '& heading': {
      color: '#898a91',
      paddingLeft: 2,
      paddingRight: 2,
      borderRadius: 4,
      fontWeight: 'bold',
      fontSize: '18px'
    }
  },
  line: {
    '& sssss': {
      display: 'block'
    }
  },
  tagContainer: {
    paddingLeft: '10px',
    paddingBottom: '10px'
  },
  nextBtnContainer: {
    paddingTop: '-5px',
    paddingBottom: '5px'
  }
}));

const SentimentHighlights = props => {
  const classes = useStyles();
  const [currentSelectedKeyword, setCurrentSelectedKeyword] = React.useState('');
  const [viewedHighlights, setViewedHighlights] = React.useState(0);
  const [highlightsData, setHighlightsData] = useState(props.highlightsData);
  const keys = Object.keys(highlightsData);
  const refValues = useRef({ count: 0, total: 0, selectedKeyIndex: 0, selectedWordIndex: 0, blueTextId: null });
  const defaultSelect = () => {
    refValues.current.count = 0;
    refValues.current.selectedKeyIndex = 0;
    refValues.current.selectedWordIndex = 0;
    refValues.current.count++;
    refValues.current.blueTextId = get(highlightsData, [
      `${keys[refValues.current.selectedKeyIndex]}`,
      refValues.current.selectedWordIndex,
      `${keys[refValues.current.selectedKeyIndex]}`
    ]);
    props.clickHandle(refValues.current.blueTextId, true);
    if (document.getElementById(refValues.current.blueTextId)) {
      document.getElementById(refValues.current.blueTextId).style.backgroundColor = '#33ffff';
    }

    document.getElementById('selectedHighlightText').textContent = keys[refValues.current.selectedKeyIndex];
    setViewedHighlights(refValues.current.count);
  };
  useEffect(() => {
    if (props.highlightsData) {
      setHighlightsData(props.highlightsData);
    }
    document.getElementById('selectedHighlightText').textContent = keys[refValues.current.selectedKeyIndex];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.highlightsData]);

  useEffect(() => {
    defaultSelect();
    var total = 0;
    forEach(highlightsData, function(key) {
      total += key.length;
    });
    document.getElementById('totalhighlight').textContent = total;
    refValues.current.total = total;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [highlightsData]);

  useEffect(() => {
    setTimeout(() => {
      if (document.getElementById('viewedhighlight')) {
        document.getElementById('viewedhighlight').textContent = viewedHighlights;
      }
    }, 100);
  }, [viewedHighlights, currentSelectedKeyword]);

  const handleNext = () => {
    if (refValues.current.selectedWordIndex === highlightsData[keys[refValues.current.selectedKeyIndex]].length - 1) {
      //select next word
      refValues.current.selectedKeyIndex++;
      refValues.current.selectedWordIndex = -1;
    }
    if (refValues.current.count < refValues.current.total) {
      //select next position of current selected word
      refValues.current.count++;
      props.is_first_iteration.current = 0;
      refValues.current.selectedWordIndex++;
    } else {
      //re-select first word after complete cycle
      refValues.current.count = 1;
      refValues.current.selectedKeyIndex = 0;
      refValues.current.selectedWordIndex = 0;
      props.is_first_iteration.current = 1;
    }
    document.getElementById(refValues.current.blueTextId).style.backgroundColor = 'orange';
    refValues.current.blueTextId = get(highlightsData, [
      `${keys[refValues.current.selectedKeyIndex]}`,
      refValues.current.selectedWordIndex,
      `${keys[refValues.current.selectedKeyIndex]}`
    ]);
    props.clickHandle(refValues.current.blueTextId, true);
    document.getElementById(refValues.current.blueTextId).style.backgroundColor = '#33ffff';
    setCurrentSelectedKeyword(keys[refValues.current.selectedKeyIndex]);
    document.getElementById('selectedHighlightText').textContent = keys[refValues.current.selectedKeyIndex];
    setViewedHighlights(refValues.current.count);
    props.newTest(props.is_first_iteration.current + 1);
  };

  const handlePre = () => {
    if (refValues.current.selectedWordIndex === 0) {
      if (refValues.current.selectedKeyIndex === 0) {
        refValues.current.selectedKeyIndex = keys.length - 1;
      } else {
        refValues.current.selectedKeyIndex--;
      }
      refValues.current.selectedWordIndex = highlightsData[keys[refValues.current.selectedKeyIndex]].length - 1;
    } else {
      refValues.current.selectedWordIndex--;
    }
    if (refValues.current.count === 1) {
      refValues.current.count = refValues.current.total;
    } else {
      refValues.current.count--;
    }
    document.getElementById(refValues.current.blueTextId).style.backgroundColor = 'orange';
    refValues.current.blueTextId = get(highlightsData, [
      `${keys[refValues.current.selectedKeyIndex]}`,
      refValues.current.selectedWordIndex,
      `${keys[refValues.current.selectedKeyIndex]}`
    ]);
    props.clickHandle(refValues.current.blueTextId, true);
    document.getElementById(refValues.current.blueTextId).style.backgroundColor = '#33ffff';
    document.getElementById('selectedHighlightText').textContent = keys[refValues.current.selectedKeyIndex];
    setViewedHighlights(refValues.current.count);
  };

  return (
    <div>
      <Grid item xs={12} style={{ marginRight: '5px', paddingTop: '5px' }}>
        <Grid container direction="row" justify="flex-start" alignItems="center">
          <Grid item>
            <label className="text-black-50 d-block">{'Search Terms:'}&nbsp;</label>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="flex-end"
              className={classes.nextBtnContainer}>
              <Grid style={{ marginRight: '10px' }}>
                <span id="selectedHighlightText"></span>
              </Grid>
              <Grid item>
                <ArrowBackIosIcon
                  fontSize="small"
                  className={classes.clickable}
                  onClick={() => {
                    handlePre();
                  }}
                />
              </Grid>
              <Grid item style={{ marginRight: 15 }}>
                <span>
                  <span className="viewedHighlightsCls" id="viewedhighlight">
                    0
                  </span>
                  /
                  <span className="totalHighlightsCls" id="totalhighlight">
                    0
                  </span>
                </span>
              </Grid>
              <Grid item>
                <ArrowForwardIosIcon
                  fontSize="small"
                  className={classes.clickable}
                  onClick={() => {
                    handleNext();
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={2} className={classes.tagContainer}>
        {keys.map((key, index) => {
          return (
            <div
              key={`rst${index}`}
              style={{
                cursor: 'pointer',
                color: '#5383ff',
                border: '1px solid #5383ff',
                borderRadius: '5px',
                padding: '1px 5px',
                marginLeft: '10px',
                marginTop: '10px',
                marginBottom: '5px'
              }}>
              <div
              // onClick={e => {
              //   clickHandle(key, 0);
              // }}
              >
                {key}
              </div>
            </div>
          );
        })}
      </Grid>
    </div>
  );
};
export default SentimentHighlights;
