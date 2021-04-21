import React, { Fragment } from 'react';
import { List, ListItem, Divider, ListItemText } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { goToNextPage } from './topicActions';
import { isEmpty } from 'lodash';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(_theme => ({
  textAlignCenter: {
    textAlign: 'center'
  }
}));

const TopicSearchResults = (props) => {
  const summaryByCompany = props.summaryByCompany
  const { isSearchLoading, searchResult } = useSelector(state => state.Topic);
  const dispatch = useDispatch();
  const classes = useStyles()

  const handlePagination = () => {
    console.log(isSearchLoading, searchResult)
    if(!isSearchLoading && !isEmpty(searchResult)) {
      console.log('page end reached')
      dispatch(goToNextPage())
    }
  }

  return (
    <List className="pt-0" style={{ height: 600 }}>
      
      {
        summaryByCompany.map((summary, index) => {
          return (
            <Fragment key={`sbc${index}`}>
              <ListItem button selected={index === props.selectCompanyIndex} onClick={() => props.onCompanySelect(index)}>
                <div className="rounded-0 p-2">
                  <div>
                    <div className="font-weight-bold my-2">{summary.companyName}</div>
                    <div className="d-flex justify-content-between text-black-50">
                      {summary.resultsCount} matches
                    </div>
                    {
                      summary.uniqTitles.map((title, index) => 
                        <p key={`sbct${index}`} className="font-size-xs mb-0">
                          {title}
                        </p>
                      )
                    }
                  </div>
                </div>
              </ListItem>
              <Divider />
            </Fragment>
          )
        })
      }

      {
        isSearchLoading ?
          <ListItem button>
            <ListItemText className={classes.textAlignCenter}>Loading...</ListItemText>
          </ListItem>
          :
          <ListItem button>
            <ListItemText className={classes.textAlignCenter} onClick={handlePagination}>Load More</ListItemText>
          </ListItem>
      }
    </List>
  );
};
export default TopicSearchResults;
