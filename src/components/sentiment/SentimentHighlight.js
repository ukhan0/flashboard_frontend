import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Paper, Box, Grid } from '@material-ui/core';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
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
    marginLeft: '20px',
    marginRight: '20px',
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
    position: 'sticky',
    zIndex: 1
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
  }
}));

const SentimentHighlights = props => {
  const classes = useStyles();
  const { sentimentHighlights } = useSelector(state => state.Sentiment);
  const [currentTextId, setCurrentTextId] = React.useState(0);
  const [viewedHighlights, setViewedHighlights] = React.useState(currentTextId);
  const [totalHighlights, setTotalHighlights] = React.useState(sentimentHighlights.length);

  useEffect(() => {
    if(sentimentHighlights){
      setTotalHighlights(sentimentHighlights.length)
    }
  }, [sentimentHighlights])

  //   Index as path
  const clickHandle = index => {
    props.clickHandle(`#${index + 1}text`);
    setViewedHighlights(index + 1)
    setCurrentTextId(index + 1);
  };

  const handleNext = () => {
    if (currentTextId + 1 > sentimentHighlights.length) {
      return;
    }
    props.clickHandle(`#${currentTextId + 1}text`);
    setViewedHighlights(currentTextId + 1)
    setCurrentTextId(currentTextId + 1);
  };
  const handlePre = () => {
    if (currentTextId - 1 <= 0) {
      return;
    }
    props.clickHandle(`#${currentTextId - 1}text`);
    setViewedHighlights(currentTextId - 1)
    setCurrentTextId(currentTextId - 1);
  };
  return (
    <div>
      <PerfectScrollbar>
        <Paper elevation={6} className={classes.margin}>
          <div>
            <Grid container direction="row" justify="flex-end" alignItems="flex-end">
              <Grid item>
                <ArrowBackIosIcon
                  fontSize="small"
                  className={classes.clickable}
                  onClick={() => {
                    handlePre();
                  }}
                />
              </Grid>
              <Grid item>
                <span>{viewedHighlights}/{totalHighlights}</span>
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
          </div>
          <Box p={4}>
            {sentimentHighlights.map((content, index) => {
              return (
                <div key={`rst${index}`}>
                  <p
                    key={`rstc${index}`}
                    className={clsx(
                      classes.searchResultText,
                      classes.paragraphHeading,
                      classes.line,
                      'font-size-mg mb-2 text-black-50'
                    )}
                    onClick={e => {
                      clickHandle(index);
                    }}
                    dangerouslySetInnerHTML={{ __html: content }}></p>
                </div>
              );
            })}
          </Box>
        </Paper>
      </PerfectScrollbar>
    </div>
  );
};
export default SentimentHighlights;
