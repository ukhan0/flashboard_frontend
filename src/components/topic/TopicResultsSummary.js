import React, { Fragment } from 'react';
import { List, ListItem, Divider, ListItemText, Grid } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { goToNextPage } from './topicActions';
import { isEmpty } from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import TickerLogo from './TopicTickerLogo';
import { BeatLoader } from 'react-spinners';
import moment from 'moment';

const useStyles = makeStyles(_theme => ({
  textAlignCenter: {
    textAlign: 'center'
  },
  margin: {
    marginTop: '20px',
    textAlign: 'center'
  },
}));

const TopicSearchResults = props => {
  const summaryByCompany = props.summaryByCompany;
  const { isHighlightsSearchLoading, searchResultHighlights } = useSelector(state => state.Topic);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handlePagination = () => {
    if (!isHighlightsSearchLoading && !isEmpty(searchResultHighlights)) {
      dispatch(goToNextPage());
    }
  };

  const filteredSummaryByCompany = summaryByCompany.filter(s =>
    s.companyName.toLowerCase().includes(props.resultsCompanyFilterText.toLowerCase())
  );

  return (
    <List className="pt-0" style={{ height: 600 }}>
      {filteredSummaryByCompany.map((summary, index) => {
        return (
          <Fragment key={`sbc${index}`}>
            <ListItem button selected={index === props.selectedCompanyIndex} onClick={() => props.onCompanySelect(index)}>
              <div>
                <Grid container direction="row" justify="flex-start" alignItems="center">
                  <Grid item>
                    <TickerLogo value={summary.ticker} />
                  </Grid>
                  <Grid item>
                    <div className="font-weight-bold my-2" style={{ marginLeft: '5px' }}>
                      {summary.companyName}
                    </div>
                  </Grid>
                </Grid>
                <div className="d-flex justify-content-between text-black-50">
                  <div>{ summary.resultsCount } {'matches  '}</div>
                  <div>{ summary.latestDate ? moment(summary.latestDate).format('DD/MM/YYYY') : null }</div>
                </div>
                {summary.uniqTitles.map((title, index) => (
                  <p key={`sbct${index}`} className="font-size-xs mb-0">
                    {title}
                  </p>
                ))}
              </div>
            </ListItem>
            <Divider />
          </Fragment>
        );
      })}

      {isHighlightsSearchLoading ? (
        <div className={classes.margin}>
          <BeatLoader color={'var(--primary)'} size={15} />
        </div>
      ) : (
        <ListItem button>
          <ListItemText className={classes.textAlignCenter} onClick={handlePagination}>
            Load More
          </ListItemText>
        </ListItem>
      )}
    </List>
  );
};
export default TopicSearchResults;
