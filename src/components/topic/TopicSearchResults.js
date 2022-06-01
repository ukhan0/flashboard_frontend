import React, { useState, Fragment, useEffect, useRef, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Grid, Paper, Box, Switch, Tooltip } from '@material-ui/core';
import { sortBy, uniqBy, filter, flatten, flattenDeep, uniq, isEmpty, reverse, get, findIndex, toLower } from 'lodash';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import { createResultTitle, preventParentClick, extractResultTitleFromPath } from './topicHelpers';
import { useHistory } from 'react-router-dom';
import { setSelectedWatchlist } from '../../reducers/Watchlist';
import { formatComapnyData } from '../watchlist/WatchlistHelpers';
import TopicComapnyDetails from './TopicCompanyDetails';
import {
  setIsFromSideBar,
  setIsFromThemex,
  setSimpleSearchTextArray,
  setIgnoreSearchTextArray,
  setOpenTopicSearchDialog,
  setTopicSearchText
} from '../../reducers/Topic';
import {
  setSelectedHeadingId,
  setIsApiResponseReceived,
  setSentimentResult,
  setIsFromfilling,
  setSentimentSearchIndex
} from '../../reducers/Sentiment';
import { createHash } from '../../utils/helpers';
import { renameDocumentTypes } from './topicHelpers';
import { setWatchlistSearchText, setSelectedTickerSymbol } from '../../reducers/Watchlist';
import { dateFormaterMoment, parseDateStrMoment } from '../watchlist/WatchlistTableHelpers';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

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
    background: 'white'
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

const TopicSearchResults = () => {
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false); // hide menu
  const [selectedText, setSelectedText] = useState(''); // hide menu
  const classes = useStyles();
  const resultsSection = useRef(null);
  const [enableBoxId, setEnableBoxId] = useState(null);
  const history = useHistory();
  const {
    isSearchLoading,
    searchResultHighlights,
    selectedCompanyName,
    isSimpleSearch,
    simpleSearchTextArray,
    ignoreSearchTextArray,
    searchText
  } = useSelector(state => state.Topic);
  const { completeCompaniesData } = useSelector(state => state.Watchlist);
  const dispatch = useDispatch();
  const [selectedCompanyIndex, setSelectedCompanyIndex] = useState(null);
  const [companyResults, setCompanyResults] = useState([]);
  const [companyDetails, setCompanyDetails] = useState({});
  const [summaryByCompany, setSummaryByCompany] = useState([]);
  const [x, setX] = useState('');
  const [y, setY] = useState('');
  const searchRegex = / data/gi;
  const companyResultsDiv = useRef(null);
  let tooltipMessage = 'Enable edit and then drag mouse on words to add them in your search term';
  const handleClick = useCallback(() => (show ? setShow(!show) : null), [show]);

  useEffect(() => {
    if (companyResults.length === 0) {
      return;
    }
    const companyResultsDivRef = companyResultsDiv.current;
    if (companyResultsDiv && companyResultsDivRef) {
      document.addEventListener('click', handleClick);
    }

    return () => {
      if (companyResultsDiv && companyResultsDivRef) {
        document.removeEventListener('click', handleClick);
      }
    };
  }, [companyResults, handleClick]);
  const replaceHeadingRegex = /<heading class="(.*)">(.*)<\/heading>/gm;

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
          const uniqTitles = uniq(
            flatten(companyResults.map(cr => get(cr, 'results', []).map(r => createResultTitle(r.title))))
          );
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

  const goToSentimentScreen = (companyDocumentResultData, result, indexx) => {
    dispatch(setIsFromfilling(false));
    const actualTitle = result.title.replace('sma_data_json.', '');
    const removel4 = actualTitle.replace('.l4', '');
    const replaceDots = removel4.replaceAll('.', 'id');
    dispatch(setSelectedHeadingId(createHash(`id${replaceDots}`)));
    dispatch(setIsFromSideBar(false));
    dispatch(setIsApiResponseReceived(false));
    dispatch(setSentimentResult(null, null));
    dispatch(setSelectedTickerSymbol(null));
    dispatch(setWatchlistSearchText(''));
    const fileId = get(companyDocumentResultData, 'summary_id', null);
    const companyId = get(companyDocumentResultData, 'company_id', null);
    const documentType = get(companyDocumentResultData, 'document_type', null);
    const documentDate = get(companyDocumentResultData, 'document_date', null);
    const documentId = get(companyDocumentResultData, 'document_id', null);
    const ticker = get(companyDocumentResultData, 'ticker', null);
    let company = completeCompaniesData.find(c => toLower(c.ticker) === toLower(ticker));
    const recentId = fileId.toString().replace('9000', '');
    if (company) {
      company = formatComapnyData(company);
      company.recentId = recentId;
      company.ticker = ticker;
      company.documentType = documentType;
      company.last = documentDate;
      company.companyId = companyId;
      company.documentId = documentId;
      dispatch(setSentimentResult(null, null));
      dispatch(setSelectedWatchlist(company));
    } else {
      dispatch(setSentimentResult(null, null));
      dispatch(
        setSelectedWatchlist({
          recentId: recentId,
          companyId: companyId,
          ticker: ticker,
          documentType: documentType,
          documentId: documentId
        })
      );
    }
    if (indexx === enableBoxId) {
    } else {
      dispatch(setSentimentSearchIndex(result.index));
      dispatch(setIsFromThemex(true));
      history.push('/sentiment');
    }
  };

  const handleMouseDown = e => {
    preventParentClick(e);
    setShow(false);

    setX(e.pageX);
    setY(e.pageY);
  };
  const handleMouseUp = (e, index) => {
    preventParentClick(e);
    const delta = 6;
    const diffX = Math.abs(e.pageX - x);
    const diffY = Math.abs(e.pageY - y);
    let c = window.getSelection().toString();
    if (c && enableBoxId === index) {
      setSelectedText(window.getSelection().toString());
      setShow(true);
      setAnchorPoint({ x: e.pageX, y: e.pageY });
    }
    if (diffX < delta && diffY < delta) {
    }
  };

  const addSelectedTextInSearchTerm = () => {
    if (isSimpleSearch && selectedText) {
      let previousData = simpleSearchTextArray;
      previousData.push(selectedText);
      dispatch(setSimpleSearchTextArray(previousData));
    }
    if (!isSimpleSearch && selectedText) {
      let data = `${searchText} OR ${selectedText}`;
      dispatch(setTopicSearchText(data));
    }
    dispatch(setOpenTopicSearchDialog(true));
  };
  const removeSelectedTextInSearchTerm = () => {
    if (isSimpleSearch && selectedText) {
      let previousData = ignoreSearchTextArray;
      previousData.push(selectedText);
      dispatch(setIgnoreSearchTextArray(previousData));
    }
    if (!isSimpleSearch && selectedText) {
      let data = `${searchText} NOT ${selectedText}`;
      dispatch(setTopicSearchText(data));
    }
    dispatch(setOpenTopicSearchDialog(true));
  };
  const handleCardEdit = (e, id) => {
    if (e.target.checked) {
      setEnableBoxId(id);
    } else {
      setEnableBoxId(null);
    }
  };
  return (
    <div ref={resultsSection}>
      <div className={classes.currentCompanyDetail}>
        <TopicComapnyDetails companyDetail={companyDetails} />
      </div>
      <div className="app" ref={companyResultsDiv}>
        {show ? (
          <div
            style={{
              top: anchorPoint.y - 60,
              left: anchorPoint.x - 40,
              zIndex: 200,
              position: 'fixed',
              boxShadow: '0 3px 10px rgb(0 0 0 / 100%)',
              borderRadius: '20px'
            }}>
            <ul className="list-group list-group-flush text-left">
              <li className="list-group-item rounded-top" style={{ borderRadius: '10px' }}>
                <div className="align-box-row">
                  <div className="pl-2">
                    <small
                      style={{ cursor: 'pointer' }}
                      className="font-weight-bold"
                      onClick={() => addSelectedTextInSearchTerm()}>
                      Add term in search
                    </small>
                    <div className="divider my-2"></div>
                    <small
                      style={{ cursor: 'pointer' }}
                      className="font-weight-bold"
                      onClick={() => removeSelectedTextInSearchTerm()}>
                      Remove term from search
                    </small>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        ) : (
          <> </>
        )}

        <PerfectScrollbar>
          {isSearchLoading && isEmpty(searchResultHighlights) ? (
            <></>
          ) : (
            companyResults.map((companyResult, indexx) => {
              return (
                <Fragment key={`rs${indexx}`}>
                  <Paper elevation={6} className={classes.margin}>
                    <Box p={4}>
                      <div className={classes.resultSection}>
                        <Grid container direction="row" justify="space-between" alignItems="flex-start">
                          <Grid item>
                            <h2>
                              {renameDocumentTypes(companyResult.document_type)}
                              &nbsp; &nbsp;
                              {companyResult.document_date ? (
                                <span className={clsx(classes.documentDate, 'text-black-50')}>
                                  {dateFormaterMoment(parseDateStrMoment(companyResult.document_date))}
                                </span>
                              ) : null}
                            </h2>
                          </Grid>

                          <Grid item>
                            <Tooltip title={tooltipMessage}>
                              <small className="text-black-50 pt-1 pr-2">Edit</small>
                            </Tooltip>
                            <Tooltip title={tooltipMessage}>
                              <Switch
                                checked={indexx === enableBoxId ? true : false}
                                onChange={e => {
                                  handleCardEdit(e, indexx);
                                }}
                                color="primary"
                                name="checkedB"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                              />
                            </Tooltip>
                            <small className="text-black-50 pt-1 pr-2">
                              Filing ID:{' '}
                              <b className={clsx(classes.clickable, 'text-first')}>{companyResult.summary_id}</b>
                            </small>
                            <small className="text-black-50 pt-1 pr-2">
                              Document ID: <b className="text-first">{companyResult.document_id}</b>
                            </small>
                          </Grid>
                        </Grid>
                        {get(companyResult, 'results', []).map((result, index) => {
                          let resultIndex = index;
                          return (
                            <div key={`rst${index}`}>
                              {result.content.map((content, index) => {
                                const titleData = extractResultTitleFromPath(content);
                                const titleDataLength = titleData.length;
                                let htmlContentToShow = content
                                  .replaceAll(searchRegex, '')
                                  .replaceAll(replaceHeadingRegex, '');
                                return (
                                  <>
                                    <Grid
                                      key={`rsttt${resultIndex}`}
                                      container
                                      direction="row"
                                      justify="flex-start"
                                      alignItems="center">
                                      <Grid item>
                                        <p className="font-size-lg mb-2 text-black-100">
                                          {titleData.map((contentTitle, indexTitle) => {
                                            return (
                                              <>
                                                <span>{contentTitle}</span>
                                                <span>
                                                  {!indexTitle && titleDataLength > 1 ? <ArrowForwardIcon /> : null}
                                                </span>
                                              </>
                                            );
                                          })}
                                        </p>
                                      </Grid>
                                    </Grid>
                                    <p
                                      key={`rstc${index}`}
                                      className={clsx(
                                        classes.searchResultText,
                                        classes.paragraphHeading,
                                        classes.clickable,
                                        classes.line,
                                        'font-size-mg mb-2 text-black-50'
                                      )}
                                      dangerouslySetInnerHTML={{ __html: htmlContentToShow }}
                                      onClick={e => goToSentimentScreen(companyResult, result, indexx)}
                                      onMouseUp={e => handleMouseUp(e, indexx)}
                                      onMouseDown={e => handleMouseDown(e, indexx)}></p>
                                  </>
                                );
                              })}
                            </div>
                          );
                        })}
                      </div>
                    </Box>
                  </Paper>
                </Fragment>
              );
            })
          )}
        </PerfectScrollbar>
      </div>
    </div>
  );
};
export default TopicSearchResults;
