import React, { Fragment, useState } from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Card, InputBase } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { get, round, isEmpty } from 'lodash';
import SearchIcon from '@material-ui/icons/Search';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  rightAlign: {
    textAlign: 'right',
  },
  loadingTd: {
    textAlign: 'center',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIconContainer: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIcon: {
    fontSize: '.8rem',
  },
  inputRoot: {
    color: 'inherit',
    borderBottom: '1px solid #ece1e1',
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
        width: '20ch',
      },
    },
  },
  titleheader: {
    paddingTop: '.3rem',
    paddingBottom: '.3rem',
  }
}));

export default function TopicCompantResultsTable() {
  const classes = useStyles()
  const { searchResult, isSearchLoading } = useSelector(state => state.Topic);
  const [ filterText, setFilterText ] = useState('');
  const results = get(searchResult, 'buckets.companyNames', [])
  const totalHits = results.reduce((accumulator, currentValue) => accumulator + currentValue.doc_count, 0 )
  const computedResults = results.map(result => {
    return {
      ...result,
      percentage: round(( result.doc_count / totalHits ) * 100)
    }
  })

  const handleSearchTextChange = (event) => {
    setFilterText(event.target.value)
  }

  return (
    <Fragment>
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
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleSearchTextChange}
            />
          </div>
        </div>
        
        <PerfectScrollbar className="scroll-area-md mb-2">
          <div className="table-responsive">
            <table className="table mb-0">
              <thead>
                <tr>
                  <th style={{ width: '70%' }}>Company</th>
                  <th className={classes.rightAlign}>Hits</th>
                  <th className={classes.rightAlign}>% Hits</th>
                </tr>
              </thead>
              <tbody>
                {
                  isSearchLoading && isEmpty(searchResult) ? 
                    <tr>
                      <td colSpan={3} className={classes.loadingTd}>Loading...</td>
                    </tr>
                    :
                    computedResults.filter(c => c.key.toLowerCase().includes(filterText.toLowerCase())).map((result, index) => {
                      return (
                        <tr key={`r${index}`}>
                          <td>
                            <div className="align-box-row">
                              <flag-icon className="font-size-xxl mr-2" country="us"></flag-icon>
                              <span>{result.key}</span>
                            </div>
                          </td>
                          <td className={classes.rightAlign}>
                              <small className="text-black-50 d-block">{result.doc_count}</small>
                          </td>
                          <td className={classes.rightAlign}>
                              <small className="text-black-50 d-block">{result.percentage}%</small>
                          </td>
                        </tr>
                      )
                    })
                }
              </tbody>
            </table>
          </div>
        </PerfectScrollbar>
        
      </Card>
    </Fragment>
  );
}
