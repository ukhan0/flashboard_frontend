import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { useSelector } from 'react-redux';
import { get } from 'lodash';
import { parseDateStrMoment, dateFormaterMoment } from '../watchlist/WatchlistTableHelpers';
import TickerLogo from '../watchlist/WatchlistTableComponents/TickerLogo';
import { Card } from '@material-ui/core';
import clsx from 'clsx';
const frameworkComponents = {
  TickerLogo: TickerLogo
};
const columnDefs = [
  {
    headerName: 'Ticker',
    headerTooltip: 'Ticker',
    field: 'ticker',
    colId: 'ticker',
    width: 118,
    minWidth: 118,
    cellClass: ['center-align-text'],
    filter: 'agTextColumnFilter',
    suppressMenu: false,
    menuTabs: ['generalMenuTab'],
    pinned: 'left',
    cellRenderer: 'TickerLogo'
  },
  {
    headerName: 'Document Type',
    field: 'docType',
    menuTabs: false,
    editable: false,
    sortable: true,
    flex: 1,
    colId: 'document_type'
  },

  {
    headerName: 'Document Date',
    headerTooltip: 'document_date',
    field: 'document_date',
    colId: 'document_date',
    sortable: true,
    valueGetter: params => parseDateStrMoment(get(params, 'data.docDate', null)),
    valueFormatter: params => dateFormaterMoment(params.value),
    filter: 'agDateColumnFilter',
    cellClass: ['center-align-text']
  },
  {
    headerName: 'Aggregate Sentiment',
    field: 'sentiment',
    menuTabs: false,
    editable: false,
    sortable: true,
    flex: 1,
    colId: 'agrregate_sentiment',
    type: 'numericColumn',
    filter: 'agNumberColumnFilter'
  },
  {
    headerName: 'Word Count',
    field: 'wordCount',
    menuTabs: false,
    editable: false,
    sortable: true,
    flex: 1,
    colId: 'word_count',
    type: 'numericColumn',
    filter: 'agNumberColumnFilter'
  }
];

export default function HomePageTable() {
  const { recentCompaniesData } = useSelector(state => state.HomePage);
  return (
    <Card className="card-box mb-4">
      <div className={clsx('card-header')}>
        <div className="card-header--title font-weight-bold">Recent Watchlist Documents</div>
      </div>

      <div className="ag-theme-alpine" style={{ height: '440px', width: '100%' }}>
        <AgGridReact
          columnDefs={columnDefs}
          rowSelection="single"
          rowData={recentCompaniesData}
          suppressCellSelection={true}
          frameworkComponents={frameworkComponents}
          multiSortKey={'ctrl'}></AgGridReact>
      </div>
    </Card>
  );
}
