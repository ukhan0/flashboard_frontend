import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './FilingsResultsTableStyles.css';
import { setSelectedWatchlist } from '../../reducers/Watchlist';
import { useHistory } from 'react-router-dom';

import moment from 'moment';

const columnDefs = [
  {
    headerName: 'Document Type',
    field: 'document_type',
    menuTabs: false,
    editable: false,
    sortable: false,
    flex: 1,
    colId: 'documentType',
    valueFormatter: params =>
      params.data.document_type === 'FMP-transcript' ? 'Earning Calls' : params.data.document_type
  },
  {
    headerName: 'Document Date',
    field: 'document_date',
    menuTabs: false,
    editable: false,
    sortable: true,
    flex: 1,
    colId: 'documentDate',
    valueFormatter: params => moment(params.data.document_date).format('DD MMMM, YYYY')
  },
  {
    headerName: 'Period Date',
    field: 'period_date',
    menuTabs: false,
    editable: false,
    sortable: false,
    flex: 1,
    colId: 'periodDate',
    valueFormatter: params => moment(params.data.period_date).format('DD MMMM, YYYY')
  }
];

export default function FilingsResultsTable() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { fillingsData } = useSelector(state => state.Filings);
  const cellClicked = async params => {
    if (params.data) {
      dispatch(setSelectedWatchlist({ recentId: params.data.document_id }));
      history.push('/sentiment');
    }
  };

  return (
    <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
      <AgGridReact
        rowSelection="single"
        domLayout="autoHeight"
        rowData={fillingsData}
        columnDefs={columnDefs}
        suppressCellSelection={true}
        onCellClicked={cellClicked}
        multiSortKey={'ctrl'}></AgGridReact>
    </div>
  );
}
