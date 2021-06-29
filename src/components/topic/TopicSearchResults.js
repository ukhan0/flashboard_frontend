import React, { useState, Fragment, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Grid, Paper, Box } from '@material-ui/core';
import { sortBy, uniqBy, filter, flatten, flattenDeep, uniq, isEmpty, reverse, get, findIndex, toLower } from 'lodash';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import { createResultTitle } from './topicHelpers';
import { useHistory } from 'react-router-dom';
import { setSelectedWatchlist } from '../../reducers/Watchlist';
import { formatComapnyData } from '../watchlist/WatchlistHelpers';
import TopicComapnyDetails from './TopicCompanyDetails';
import { getCompleteWatchlist } from '../../utils/helpers'

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
    marginTop: '12px',
    background: 'white',
  }
}));

const TopicSearchResults = () => {
  const classes = useStyles();
  const resultsSection = useRef(null);
  const history = useHistory();
  const { isSearchLoading, searchResultHighlights, selectedCompanyName } = useSelector(state => state.Topic);
  const dispatch = useDispatch();
  const [selectedCompanyIndex, setSelectedCompanyIndex] = useState(null);
  const [companyResults, setCompanyResults] = useState([]);
  const [companyDetails, setCompanyDetails] = useState({});
  const [summaryByCompany, setSummaryByCompany] = useState([]);

  useEffect(() => {
    const allComapnyResults = searchResultHighlights.map(srh => ({ ...srh }));
    const companyNames = uniqBy(allComapnyResults, 'company_name');
    const summaryByCompanyData = reverse(
      sortBy(
        companyNames.map(c => {
          const companyResults = filter(allComapnyResults, cr => cr.company_name === c.company_name);
          const documentDates = sortBy(
            uniq(filter(companyResults, c => c.document_date).map(cr => new Date(cr.document_date)))
          );
          const uniqTitleCodes = uniq(flatten(companyResults.map(cr => get(cr, 'results', []).map(r => r.title))));
          const uniqTitles = uniq(flatten(companyResults.map(cr => get(cr, 'results', []).map(r => createResultTitle(r.title)))));
          const resultsCount = flattenDeep(companyResults.map(cr => get(cr, 'results', []).map(r => r.content))).length;
          const latestDate = documentDates.length ? documentDates[documentDates.length - 1] : null;
          return {
            companyName: c.company_name,
            uniqTitleCodes,
            uniqTitles,
            resultsCount,
            ticker: c.ticker,
            documentDates,
            latestDate,
            sector: c.gics_sector ? c.gics_sector : null,
            industry: c.gics_industry ? c.gics_industry : null,
            results: allComapnyResults.filter(cr => cr.company_name === c.company_name)
          };
        }),
        ['latestDate']
      )
    );
    const companyResults = get(get(summaryByCompanyData, selectedCompanyIndex, null), 'results', []);
    setSummaryByCompany(summaryByCompanyData);
    setCompanyResults(companyResults);
    const companyDetail = {};
    companyDetail.companyName = get(get(summaryByCompanyData, selectedCompanyIndex, null), 'companyName', null);
    companyDetail.sector = get(get(summaryByCompanyData, selectedCompanyIndex, null), 'sector', null);
    companyDetail.industry = get(get(summaryByCompanyData, selectedCompanyIndex, null), 'industry', null);
    companyDetail.ticker = get(get(summaryByCompanyData, selectedCompanyIndex, null), 'ticker', null);
    setCompanyDetails(companyDetail);
  }, [searchResultHighlights, selectedCompanyIndex]);

  useEffect(() => {
    if (!selectedCompanyName) {
      return;
    }
    const companyIndex = findIndex(summaryByCompany, cr => cr.companyName === selectedCompanyName);
    if (companyIndex !== -1) {
      setSelectedCompanyIndex(companyIndex);
    }
  }, [selectedCompanyName, summaryByCompany]);

  const goToSentimentScreen = companyDocumentResultData => {
    const companyName = get(companyDocumentResultData, 'company_name', null);
    const fileId = get(companyDocumentResultData, 'summary_id', null);
    const documentType = get(companyDocumentResultData, 'document_type', null);
    const documentDate = get(companyDocumentResultData, 'document_date', null);

    const companiesList = getCompleteWatchlist() || []
    let company = companiesList.find(c => toLower(c.b) === toLower(companyName));
    const recentId = fileId.toString().replace('9000', '');

    if (company) {
      company = formatComapnyData(company);
      company.recentId = recentId;
      company.documentType = documentType;
      company.last = documentDate;
      dispatch(setSelectedWatchlist(company));
    } else {
      dispatch(setSelectedWatchlist({ recentId: recentId }));
    }
    history.push('/sentiment');
  };

  return (
    <div ref={resultsSection}>
      <div>
        <div className="bg-white p-0">
          <PerfectScrollbar className="mb-4 p-4">
            <TopicComapnyDetails companyDetail={companyDetails} />
            {isSearchLoading && isEmpty(searchResultHighlights) ? (
              <h4 className="font-size-lg"> </h4>
            ) : (
              companyResults.map((companyResult, index) => {
                return (
                  <Fragment key={`rs${index}`}>
                    <Paper elevation={6} className={classes.margin}>
                      <Box p={4}>
                        <div className={classes.resultSection}>
                          <Grid container direction="row" justify="space-between" alignItems="flex-start">
                            <Grid item>
                              <h3 className="font-size-lg mb-3 font-weight-bold">{companyResult.document_type}</h3>
                            </Grid>
                            <Grid item>
                              <small className="text-black-50 pt-1 pr-2">
                                Filing ID:{' '}
                                <b
                                  className={clsx(classes.clickable, 'text-first')}
                                  onClick={() => goToSentimentScreen(companyResult)}>
                                  {companyResult.summary_id}
                                </b>
                              </small>
                              <small className="text-black-50 pt-1 pr-2">
                                Document ID: <b className="text-first">{companyResult.document_id}</b>
                              </small>
                              <small className="text-black-50 pt-1 pr-2">
                                Document Date:{' '}
                                <b className="text-first">
                                  {companyResult.document_date
                                    ? new Date(companyResult.document_date).toLocaleDateString()
                                    : null}
                                </b>
                              </small>
                            </Grid>
                          </Grid>
                          {get(companyResult, 'results', []).map((result, index) => {
                            return (
                              <div key={`rst${index}`}>
                                <p className="font-size-lg mb-2 text-black-100">{createResultTitle(result.title)}</p>
                                {result.content.map((content, index) => (
                                  <p
                                    key={`rstc${index}`}
                                    className={clsx(classes.searchResultText, 'font-size-mg mb-2 text-black-50')}
                                    dangerouslySetInnerHTML={{ __html: content }}></p>
                                ))}
                              </div>
                            );
                          })}
                        </div>
                      </Box>
                    </Paper>
                    <div className="mb-2"></div>
                  </Fragment>
                );
              })
            )}
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  );
};
export default TopicSearchResults;
