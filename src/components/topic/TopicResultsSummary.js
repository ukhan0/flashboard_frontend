import React, { Fragment } from 'react';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { InputAdornment, IconButton,List, ListItem, Tooltip, TextField, Divider } from '@material-ui/core';
import { get, uniqBy, filter, flatten, flattenDeep, uniq } from 'lodash';

import SearchIcon from '@material-ui/icons/Search';
import { useSelector } from 'react-redux';

import avatar1 from '../../assets/images/avatars/avatar1.jpg';
import avatar2 from '../../assets/images/avatars/avatar2.jpg';
import avatar3 from '../../assets/images/avatars/avatar3.jpg';
import avatar4 from '../../assets/images/avatars/avatar4.jpg';

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
