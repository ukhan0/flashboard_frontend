import React, { useState , useEffect } from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Card, InputBase } from '@material-ui/core';
import { useSelector } from 'react-redux';
import SearchIcon from '@material-ui/icons/Search';
import clsx from 'clsx';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './TopicTableStyles.css';

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
    height: 400
  },
  companyRow: {
    '&:hover': {
      backgroundColor: '#f3ebf2',
      cursor: 'pointer'
    }
  }
}));

export default function TopicTweetsTable() {
  const classes = useStyles();
  const { tweetsTableData } = useSelector(state => state.Topic);
  const { completeCompaniesData, isCompleteCompaniesDataLoaded } = useSelector(state => state.WatchList);

  useEffect(() => {
    if(!isCompleteCompaniesDataLoaded){
        // show loader
    } else {
      // hide loader
    }
  }, [isCompleteCompaniesDataLoaded]);

  const getCompanyName = ticker => {
    let companyName = '';

    let company = completeCompaniesData.find(c => c.ticker.toLowerCase() === ticker.toLowerCase());

    if (company) {
      companyName = company.b;
    }
    return companyName;
  };

  const tableData = tweetsTableData.map(v => {
    return { companyName: getCompanyName(v.key), ticker: v.key, docCount: v.doc_count };
  });

  const [gridApi, setGridApi] = useState(null);
  const columnDefs = [
    {
      headerName: 'COMPANY',
      field: 'companyName',
      menuTabs: false,
      editable: false,
      sortable: true,
      flex: 2,
      colId: 'companyName'
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
      field: 'docCount',
      menuTabs: false,
      editable: false,
      sortable: true,
      flex: 1,
      colId: 'hits'
    }
  ];

  const onGridReady = params => {
    setGridApi(params.api);
  };
  const onFilterTextChange = e => {
    gridApi.setQuickFilter(e.target.value);
  };

  return (
    <Card className="card-box mb-4" style={{ marginTop: '20px' }}>
      <div className={clsx(classes.titleheader, 'card-header')}>
        <div className="card-header--title font-weight-bold">Tweets Count</div>
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
            inputProps={{ 'aria-label': 'search' }}
            onChange={onFilterTextChange}
          />
        </div>
      </div>
      <PerfectScrollbar className={clsx('mb-2', classes.contentSection)}>
        <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
          <AgGridReact
            rowSelection="single"
            onGridReady={onGridReady}
            rowData={tweetsTableData.length > 0 ? tableData : null}
            columnDefs={columnDefs}
            suppressCellSelection={true}
            multiSortKey={'ctrl'}></AgGridReact>
        </div>
      </PerfectScrollbar>
    </Card>
  );
}
