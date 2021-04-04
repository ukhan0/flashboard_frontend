import React, { useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { InputAdornment, Grid, TextField, Divider } from '@material-ui/core';
import { get, uniqBy, filter, flatten, flattenDeep, uniq } from 'lodash';
import clsx from 'clsx';

import SearchIcon from '@material-ui/icons/Search';
import { useSelector } from 'react-redux';
import TopicResultsSummary from './TopicResultsSummary'

const useStyles = makeStyles(_theme => ({
  resultHeader: {
    display: 'flex'
  },
  searchResultText: {
    '& .yellowColor': {
      backgroundColor: 'orange',
      paddingLeft: 2,
      paddingRight: 2,
      borderRadius: 4,
    }
  }
}));

const TopicSearchResults = () => {
  const classes = useStyles();
  const { searchResult } = useSelector(state => state.Topic);
  const [selectCompanyIndex, setSelectCompanyIndex] = useState(0);
  const allComapnyResults = get(searchResult, 'data', []);
  const companyNames = uniqBy(allComapnyResults, 'company_name');
  const summaryByCompany = companyNames.map(c => {
    const companyResults = filter(allComapnyResults, r => r.company_name === c.company_name);
    const uniqTitles = uniq(flatten(companyResults.map(cr => cr.results.map(r => r.title))));
    const resultsCount = flattenDeep(companyResults.map(cr => cr.results.map(r => r.content))).length;
    return {
        companyName: c.company_name,
        uniqTitles,
        resultsCount
    }
  })
  const companyResults = allComapnyResults.filter(cr => cr.company_name === companyNames[selectCompanyIndex].company_name)

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{width: '30%'}}>
        <div
          className={clsx(
            'app-inner-content-layout--sidebar bg-white app-inner-content-layout--sidebar__xl pos-r border-right',
            { 'layout-sidebar-open': false }
          )}>
          <div className="p-3">
            <TextField
              fullWidth
              margin="dense"
              placeholder="Company Name ..."
              variant="outlined"
              disabled={true}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
            />
          </div>
          <Divider />
          <PerfectScrollbar>
            <TopicResultsSummary 
              summaryByCompany={summaryByCompany}
              onCompanySelect={(newIndex) => setSelectCompanyIndex(newIndex)}
              selectCompanyIndex={selectCompanyIndex}
            />
          </PerfectScrollbar>
        </div>
      </div>
      <div>
        <div className="app-inner-content-layout--main bg-white p-0">
          <PerfectScrollbar className="mb-4 p-4">
            {
              companyResults.map((companyResult, index) => {
                return (
                  <Fragment key={`rs${index}`}>
                    <div className={classes.resultSection}>
                      <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="flex-start"
                      >
                        <Grid item>
                          <h3 className="font-size-lg mb-3 font-weight-bold">{companyResult.document_type}</h3>
                        </Grid>
                        <Grid item>
                          <small className="text-black-50 pt-1 pr-2">
                            Filing ID:{' '}
                            <b className="text-first">{companyResult.summary_id}</b>
                          </small>
                          <small className="text-black-50 pt-1 pr-2">
                            Document ID:{' '}
                            <b className="text-first">{companyResult.document_id}</b>
                          </small>
                          <small className="text-black-50 pt-1 pr-2">
                            Document Date:{' '}
                            <b className="text-first">{companyResult.document_date}</b>
                          </small>
                        </Grid>
                      </Grid>
                      {
                        companyResult.results.map((result, index) => {
                          return (
                            <div key={`rst${index}`}>
                              <p className="font-size-lg mb-2 text-black-100">{result.title}</p>
                              {
                                result.content.map((content, index) => <p key={`rstc${index}`} className={clsx(classes.searchResultText, 'font-size-mg mb-2 text-black-50')} dangerouslySetInnerHTML={{__html: content}}></p>)
                              }
                            </div>
                          )
                        })
                      }
                    </div>
                    <Divider />
                    <div className="mb-2"></div>
                  </Fragment>

                )
              })
            }
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  );
};
export default TopicSearchResults;
