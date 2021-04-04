import React, { Fragment } from 'react';
import { List, ListItem, Divider } from '@material-ui/core';


const TopicSearchResults = (props) => {
  const summaryByCompany = props.summaryByCompany
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
    </List>
  );
};
export default TopicSearchResults;
