import React from 'react';
import { useSelector } from 'react-redux';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './FilingsResultsTableStyles.css';

const columnDefs = [
  {
    headerName: 'Document Type',
    field: 'documentType',
    menuTabs: false,
    editable: false,
    sortable: true,
    flex: 2,
    colId: 'companyType',
  },
  {
    headerName: 'Period Date',
    field: 'periodDate',
    menuTabs: false,
    editable: false,
    sortable: true,
    flex: 1,
    colId: 'periodDate'
  },
  {
    headerName: 'Posted Date',
    field: 'postedDate',
    menuTabs: false,
    editable: false,
    sortable: true,
    flex: 1,
    colId: 'postedDate'
  }
];

export default function FilingsResultsTable() {
  const { filingsData } = useSelector(
    state => state.Filings
  );
  
  return (
      <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
          <AgGridReact
            rowSelection="single"
            domLayout='autoHeight'
            rowData={filingsData}
            columnDefs={columnDefs}
            suppressCellSelection={true}
            multiSortKey={'ctrl'}></AgGridReact>
      </div>
  );
}
