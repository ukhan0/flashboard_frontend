import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Paper, Box } from '@material-ui/core';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
const useStyles = makeStyles(theme => ({
  resultHeader: {
    display: 'flex'
  },
  searchResultText: {
    '& .yellowColor': {
      backgroundColor: 'orange',
      paddingLeft: 2,
      paddingRight: 2,
      borderRadius: 4
    }
  },
  clickable: {
    cursor: 'pointer'
  },
  margin: {
    marginTop: '7px',
    background: 'white',
    marginLeft: '20px',
    marginRight: '20px'
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

const SentimentHighlights = () => {
  const classes = useStyles();
  const { sentimentHighlights } = useSelector(state => state.Sentiment);
  return (
    <div>
      <PerfectScrollbar>
        {sentimentHighlights.map((content, index) => {
          return (
            <Fragment key={`rs${index}`}>
              <Paper elevation={6} className={classes.margin}>
                <Box p={4}>
                  <div className={classes.resultSection}>
                    <div key={`rst${index}`}>
                      <p
                        key={`rstc${index}`}
                        className={clsx(
                          classes.searchResultText,
                          classes.paragraphHeading,
                          classes.clickable,
                          classes.line,
                          'font-size-mg mb-2 text-black-50'
                        )}
                        dangerouslySetInnerHTML={{ __html: content }}></p>
                    </div>
                  </div>
                </Box>
              </Paper>
            </Fragment>
          );
        })}
      </PerfectScrollbar>
    </div>
  );
};
export default SentimentHighlights;
