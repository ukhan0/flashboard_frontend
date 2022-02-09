import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './FilingsResultsTableStyles.css';
import { useHistory } from 'react-router-dom';
import { formatComapnyData } from '../watchlist/WatchlistHelpers';
import { dateFormaterMoment, parseDateStrMoment } from '../watchlist/WatchlistTableHelpers';
import { renameDocumentTypes } from '../topic/topicHelpers';
import { setSelectedWatchlist } from '../../reducers/Watchlist';
import { setSentimentResult, setIsFromfilling } from '../../reducers/Sentiment';
import { setIsFromThemex } from '../../reducers/Topic';
import { storeColumnsState, getColumnState } from './FillingsHelper';
import FillingsService from './FillingsService';
import { cloneDeep } from 'lodash';

const defaultColDef = {
  sortable: true,
  filter: true,
  resizable: true,
  floatingFilter: true,
  suppressMenu: true,
  filterParams: { newRowsAction: 'keep' },
  headerClass: ['allColumnHeader'],
  wrapText: true
};

const columnDefs = [
  {
    headerName: 'Document Type',
    field: 'document_type',
    menuTabs: false,
    editable: false,
    sortable: true,
    flex: 1,
    colId: 'documentType',
    valueFormatter: params => renameDocumentTypes(params.data.document_type)
  },
  {
    headerName: 'Document Date',
    field: 'document_date',
    menuTabs: false,
    editable: false,
    sortable: true,
    flex: 1,
    colId: 'documentDate',
    // filter: 'agDateColumnFilter',
    valueFormatter: params =>
      params.data.document_date ? dateFormaterMoment(parseDateStrMoment(params.data.document_date.split('.')[0])) : ''
  },
  {
    headerName: 'Period Date',
    field: 'period_date',
    menuTabs: false,
    editable: false,
    sortable: true,
    flex: 1,
    colId: 'periodDate',
    // filter: 'agDateColumnFilter',
    valueFormatter: params =>
      params.data.period_date ? dateFormaterMoment(parseDateStrMoment(params.data.period_date.split('.')[0])) : ''
  },
  {
    headerName: 'Sentiment',
    field: 'sentiment',
    menuTabs: false,
    editable: false,
    sortable: true,
    flex: 1,
    colId: 'sentiment',
    type: 'numericColumn',
    filter: 'agNumberColumnFilter'
  },
  {
    headerName: 'Word Count',
    field: 'word_count',
    flex: 1,
    colId: 'WordCount',
    menuTabs: false,
    editable: false,
    sortable: true,
    type: 'numericColumn',
    filter: 'agNumberColumnFilter'
  }
];

export default function FilingsResultsTable() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { fillingsData } = useSelector(state => state.Filings);
  const { selectedItem } = useSelector(state => state.Watchlist);
  let fillingsDataCopy = cloneDeep(fillingsData);
  const cellClicked = async params => {
    if (params.data) {
      selectedItem.recentId = params.data.document_id;
      selectedItem.documentType = params.data.document_type;
      dispatch(setSentimentResult(null, null));
      dispatch(setSelectedWatchlist(selectedItem));
      dispatch(setIsFromfilling(true));
      dispatch(setIsFromThemex(false));
      history.push('/sentiment');
    }
  };
  const storeColumnsStates = params => {
    const columnState = params.columnApi.getColumnState();
    storeColumnsState(columnState);
  };

  const handleGridReady = params => {
    FillingsService.init(params.api, params.columnApi); // global service
    const columnsState = getColumnState();
    if (columnsState) {
      storeColumnsState(columnsState);
    } else {
      const columnState = params.columnApi.getColumnState();
      storeColumnsState(columnState);
    }

    if (columnsState && columnsState.length) {
      params.columnApi.applyColumnState({
        state: columnsState,
        applyOrder: true
      });
    }
  };
  const handleFirstDataRendered = params => {
    const columnsState = getColumnState();
    if (columnsState && columnsState.length) {
      params.columnApi.applyColumnState({
        state: columnsState,
        applyOrder: true
      });
    }
  };

  return (
    <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
      <AgGridReact
        defaultColDef={defaultColDef}
        rowSelection="single"
        domLayout="autoHeight"
        rowData={fillingsDataCopy.reverse()}
        columnDefs={columnDefs}
        suppressCellSelection={true}
        onCellClicked={cellClicked}
        onGridReady={handleGridReady}
        onFirstDataRendered={handleFirstDataRendered}
        onColumnResized={storeColumnsStates}
        onColumnMoved={storeColumnsStates}
        onColumnVisible={storeColumnsStates}
        onSortChanged={storeColumnsStates}
        multiSortKey={'ctrl'}></AgGridReact>
    </div>
  );
}
