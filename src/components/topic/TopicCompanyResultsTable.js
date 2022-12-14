import React, { useEffect } from 'react';
import { fade } from '@material-ui/core/styles/colorManipulator';
import makeStyles from '@material-ui/core/styles/makeStyles';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Card from '@material-ui/core/Card';
import InputBase from '@material-ui/core/InputBase';
import { useSelector, useDispatch } from 'react-redux';
import { get, uniq, isEmpty, orderBy } from 'lodash';
import SearchIcon from '@material-ui/icons/Search';
import clsx from 'clsx';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { setSelectedCompanyName, setBackDropOnCompanyClick } from '../../reducers/Topic';
import { performTopicSearchHighlights } from './topicActions';
import './TopicTableStyles.css';
import { setSelectedWatchlist } from '../../reducers/Watchlist';
import { setIsFromThemex, setTopicSearchCompany, isDateSet } from '../../reducers/Topic';

const useStyles = makeStyles(theme => ({
  rightAlign: {
    textAlign: 'right'
  },
  loadingTd: {
    textAlign: 'center'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  },
  searchIconContainer: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchIcon: {
    fontSize: '.8rem'
  },
  inputRoot: {
    color: 'inherit',
    borderBottom: '1px solid #ece1e1'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch'
      }
    }
  },
  titleheader: {
    paddingTop: '.3rem',
    paddingBottom: '.3rem'
  },
  contentSection: {
    height: 300
  },
  companyRow: {
    '&:hover': {
      backgroundColor: '#f3ebf2',
      cursor: 'pointer'
    }
  }
}));

export default function TopicCompantResultsTable() {
  const classes = useStyles();
  const {
    searchResult,
    isSearchLoading,
    searchResultHighlights,
    selectedCompanyName,
    topicSearchedComapny,
    isDays
  } = useSelector(state => state.Topic);
  const dispatch = useDispatch();
  const companyResults = get(searchResult, 'buckets.groupByCompanyTicker', []);
  const finalResult = companyResults.map(v => {
    return {
      key: v.key.cn,
      ticker: v.key.ct || v.key.cid,
      doc_count: v.doc_count,
      companyId: v.key.cid ? v.key.cid : ''
    };
  });
  const companyNameSorter = v => v.key.toLowerCase();
  let sortedCompanyData = orderBy(finalResult, ['doc_count', companyNameSorter], ['desc', 'asc']);

  const handleCompanyClick = params => {
    // check if data for this company exists or not
    const uniqCompanyNames = uniq(searchResultHighlights.map(sr => sr.company_name).filter(n => n));
    const companyIndex = uniqCompanyNames.indexOf(params.data.key);
    if (companyIndex === -1) {
      // get data for this company
      if (isDays) {
        dispatch(isDateSet(true));
      }
      dispatch(performTopicSearchHighlights(true, params.data.key));
      dispatch(setBackDropOnCompanyClick(true));
    }
    if (params.data) {
      let data = {
        companyName: params.data.key,
        ticker: params.data.ticker,
        companyId: params.data.companyId
      };
      dispatch(setSelectedWatchlist(data));
      dispatch(setIsFromThemex(false));
    }
    dispatch(setSelectedCompanyName(params.data.key));
  };

  const customComparator = (valueA, valueB) => {
    return valueA.toLowerCase().localeCompare(valueB.toLowerCase());
  };

  const gridApi = React.useRef(null);
  const columnDefs = [
    {
      headerName: 'COMPANY',
      field: 'key',
      menuTabs: false,
      editable: false,
      sortable: true,
      flex: 2,
      colId: 'companyName',
      comparator: customComparator
    },
    {
      headerName: 'TICKER',
      field: 'ticker',
      menuTabs: false,
      editable: false,
      sortable: true,
      flex: 1,
      colId: 'ticker'
    },
    {
      headerName: 'DOCUMENTS',
      field: 'doc_count',
      menuTabs: false,
      editable: false,
      sortable: true,
      flex: 1,
      colId: 'hits'
    }
  ];

  const onGridReady = params => {
    gridApi.current = params.api;
  };
  const onFilterTextChange = e => {
    dispatch(setTopicSearchCompany(e.target.value));
  };

  useEffect(() => {
    if (!gridApi.current) {
      return;
    }
    gridApi.current.setQuickFilter(topicSearchedComapny);
  }, [topicSearchedComapny]);
  useEffect(() => {
    if (searchResultHighlights.length > 0) {
      if (!gridApi.current) {
        return;
      }

      gridApi.current.forEachNode(function(node) {
        node.setSelected(node.data.key === selectedCompanyName);
      });
    }
  }, [searchResultHighlights, selectedCompanyName]);

  return (
    <>
      <Card className="card-box mb-4">
        <div className={clsx(classes.titleheader, 'card-header')}>
          <div className="card-header--title font-weight-bold">Companies</div>
          <div className={classes.search}>
            <div className={classes.searchIconContainer}>
              <SearchIcon className={classes.searchIcon} />
            </div>
            <InputBase
              placeholder="Search..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              value={topicSearchedComapny}
              inputProps={{ 'aria-label': 'search' }}
              onChange={onFilterTextChange}
            />
          </div>
        </div>
        <PerfectScrollbar className={clsx('mb-2', classes.contentSection)}>
          <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
            {isSearchLoading && isEmpty(searchResult) ? (
              <AgGridReact rowData={null} columnDefs={columnDefs}></AgGridReact>
            ) : (
              <AgGridReact
                rowSelection="single"
                onGridReady={onGridReady}
                onCellClicked={handleCompanyClick}
                rowData={sortedCompanyData}
                columnDefs={columnDefs}
                suppressCellSelection={true}
                multiSortKey={'ctrl'}></AgGridReact>
            )}
          </div>
        </PerfectScrollbar>
      </Card>
    </>
  );
}
