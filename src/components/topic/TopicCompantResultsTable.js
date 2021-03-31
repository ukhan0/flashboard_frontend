import React, { Fragment } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LinearProgress, Card } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { get, round } from 'lodash';

export default function TopicCompantResultsTable() {
  const { searchResult } = useSelector(state => state.Topic);
  const results = get(searchResult, 'buckets.companyNames', [])
  console.log(results)
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
        <PerfectScrollbar className="scroll-area-sm mb-2">
          <div className="table-responsive">
            <table className="table mb-0">
              <thead>
                <tr>
                  <th style={{ width: 150 }}>Company</th>
                  <th></th>
                  <th>Hits</th>
                  <th>% Hits</th>
                </tr>
              </thead>
              <tbody>
                {
                  computedResults.map((result, index) => {
                    return (
                      <tr key={`r${index}`}>
                        <td colSpan={2}>
                          <div className="align-box-row">
                            <flag-icon className="font-size-xxl mr-2" country="us"></flag-icon>
                            <span>{result.key}</span>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center font-size-lg">
                            <small className="text-black-50 d-block">{result.doc_count}</small>
                          </div>
                        </td>
                        <td>
                          <div className="align-box-row">
                            {/* <div className="flex-grow-1">
                              <LinearProgress color="primary" variant="determinate" value={result.percentage} />
                            </div> */}
                            <div className="text-dark pl-2">{result.percentage}%</div>
                          </div>
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
