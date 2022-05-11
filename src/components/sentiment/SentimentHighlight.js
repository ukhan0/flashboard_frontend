import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { get } from 'lodash';
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
  const [currentTextId, setCurrentTextId] = React.useState(0);
  const [currentSelectedKeyword, setCurrentSelectedKeyword] = React.useState('');
  const [viewedHighlights, setViewedHighlights] = React.useState(0);
  const [highlightsData, setHighlightsData] = useState(props.highlightsData);
  useEffect(() => {
    if (props.highlightsData) {
      setHighlightsData(props.highlightsData);
    }
  }, [props.highlightsData]);

  useEffect(() => {
    setTimeout(() => {
      if (document.getElementById('viewedhighlight')) {
        document.getElementById('viewedhighlight').textContent = viewedHighlights;
      }
    }, 100);
  }, [viewedHighlights, currentSelectedKeyword]);

  //   Index as path
  const clickHandle = (key, index) => {
    document.getElementById('selectedHighlightText').textContent = key + ':';
    if (props.is_first_iteration.current > 0 && currentSelectedKeyword === key) {
      handleNext(key);
    } else {
      document.getElementById('totalhighlight').textContent = get(highlightsData, `${key}`, []).length;
      props.clickHandle(get(highlightsData, [`${key}`, index, `${key}`]), true);
      setCurrentSelectedKeyword(key);
      setViewedHighlights(index + 1);
      setCurrentTextId(index + 1);
      props.newTest(props.is_first_iteration.current + 1);
    }
  };

  const handleNext = () => {
    if (get(highlightsData, `${currentSelectedKeyword}`, []).length === 1) {
      return;
    } else if (currentTextId + 1 > get(highlightsData, `${currentSelectedKeyword}`, []).length) {
      props.newTest(0);
      // props.is_first_iteration.current = 0;
      clickHandle(currentSelectedKeyword, 0);
    } else {
      props.clickHandle(
        get(highlightsData, [`${currentSelectedKeyword}`, currentTextId, `${currentSelectedKeyword}`]),
        true
      );
      setViewedHighlights(currentTextId + 1);
      setCurrentTextId(currentTextId + 1);
    }
  };
  const handlePre = () => {
    if (get(highlightsData, `${currentSelectedKeyword}`, []).length === 1) {
      return;
    } else if (currentTextId - 1 <= 0) {
      props.newTest(0);
      // is_first_iteration.current = 0;
      setCurrentTextId(get(highlightsData, `${currentSelectedKeyword}`, []).length - 1);
      clickHandle(currentSelectedKeyword, get(highlightsData, `${currentSelectedKeyword}`, []).length - 1);
    } else {
      props.clickHandle(
        get(highlightsData, [`${currentSelectedKeyword}`, currentTextId - 2, `${currentSelectedKeyword}`]),
        true
      );
      setViewedHighlights(currentTextId - 1);
      setCurrentTextId(currentTextId - 1);
    }
  };
  const keys = Object.keys(highlightsData);
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
                onClick={e => {
                  clickHandle(key, 0);
                }}>
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
