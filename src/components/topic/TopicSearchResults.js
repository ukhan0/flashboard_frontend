import React, { useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { InputAdornment, Grid, TextField, Divider } from '@material-ui/core';
import { sortBy, uniqBy, filter, flatten, flattenDeep, uniq, isEmpty, reverse, get } from 'lodash';
import clsx from 'clsx';
import SearchIcon from '@material-ui/icons/Search';
import { useSelector } from 'react-redux';
import TopicResultsSummary from './TopicResultsSummary'
import { createResultTitle } from './topicHelpers'
import moment from 'moment'

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
  const { isSearchLoading, searchResultHighlights } = useSelector(state => state.Topic);
  const [resultsCompanyFilterText, setResultsCompanyFilterText] = useState('');
  const [selectedCompanyIndex, setSelectedCompanyIndex] = useState(0)
  const allComapnyResults = searchResultHighlights.map(srh => ({...srh}))
  const companyNames = uniqBy(allComapnyResults, 'company_name')
  const summaryByCompany = reverse(sortBy(companyNames.map(c => {
    const companyResults = filter(allComapnyResults, cr => cr.company_name === c.company_name);
    const documentDates = sortBy(uniq(filter(companyResults, c => c.document_date).map(cr => new Date(cr.document_date))));
    const uniqTitleCodes = uniq(flatten(companyResults.map(cr => cr.results.map(r => r.title))));
    const uniqTitles = uniq(flatten(companyResults.map(cr => cr.results.map(r => createResultTitle(r.title)))));
    const resultsCount = flattenDeep(companyResults.map(cr => cr.results.map(r => r.content))).length;
    const latestDate = documentDates.length ? documentDates[documentDates.length - 1] : null
    return {
        companyName: c.company_name,
        uniqTitleCodes,
        uniqTitles,
        resultsCount,
        ticker: c.ticker,
        documentDates,
        latestDate,
        results: allComapnyResults.filter(cr => cr.company_name === c.company_name)
    }
  }), ['latestDate']))

  const handleCompanySearch = (event) => {
    setResultsCompanyFilterText(event.target.value)
  }
  
  const companyResults = get(get(summaryByCompany, selectedCompanyIndex, null), 'results', [])
  
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{width: '35%'}}>
        <div
          className={clsx( 'bg-white border-right', { 'layout-sidebar-open': false })}>
          <div className="p-3">
            <TextField
              fullWidth
              margin="dense"
              placeholder="Company Name ..."
              variant="outlined"
              disabled={false}
              onChange={handleCompanySearch}
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
              onCompanySelect={(index) => setSelectedCompanyIndex(index)}
              selectedCompanyIndex={selectedCompanyIndex}
              resultsCompanyFilterText={resultsCompanyFilterText}
            />
          </PerfectScrollbar>
        </div>
      </div>
      <div style={{width: '65%'}}>
        <div className="app-inner-content-layout--main bg-white p-0">
          <PerfectScrollbar className="mb-4 p-4">
            {
              (isSearchLoading && isEmpty(searchResultHighlights)) ?
                <h4 className="font-size-lg">Loading...</h4>
              :
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
                              <b className="text-first">{companyResult.document_date ? moment(new Date(companyResult.document_date).getTime()).format('MM/DD/YYYY') : null}</b>
                            </small>
                          </Grid>
                        </Grid>
                        {
                          companyResult.results.map((result, index) => {
                            return (
                              <div key={`rst${index}`}>
                                <p className="font-size-lg mb-2 text-black-100">{createResultTitle(result.title)}</p>
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
