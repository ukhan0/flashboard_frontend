import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Card } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { get, round } from 'lodash';

const useStyles = makeStyles(_theme => ({
  rightAlign: {
    textAlign: 'right',
  },
  loadingTd: {
    textAlign: 'center',
  }
}));

export default function TopicCompantResultsTable() {
  const classes = useStyles()
  const { searchResult, isSearchLoading } = useSelector(state => state.Topic);
  const results = get(searchResult, 'buckets.companyNames', [])
  const totalHits = results.reduce((accumulator, currentValue) => accumulator + currentValue.doc_count, 0 )
  const computedResults = results.map(result => {
    return {
      ...result,
      percentage: round(( result.doc_count / totalHits ) * 100)
    }
  })
  return (
    <Fragment>
      <Card className="card-box mb-4">
        <div className="card-header">
          <div className="card-header--title font-weight-bold">Companies</div>
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
                  isSearchLoading ? 
                    <tr>
                      <td colSpan={3} className={classes.loadingTd}>Loading...</td>
                    </tr>
                    :
                    computedResults.map((result, index) => {
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
