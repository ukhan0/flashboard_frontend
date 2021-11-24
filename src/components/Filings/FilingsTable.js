import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './FilingsResultsTableStyles.css';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { formatComapnyData } from '../watchlist/WatchlistHelpers';
import { renameDocumentTypes } from '../topic/topicHelpers';
import { setSelectedWatchlist } from '../../reducers/Watchlist';
import { getCompanyByTickerUniverse } from './FillingsHelper';
import { cloneDeep } from 'lodash';
const columnDefs = [
  {
    headerName: 'Document Type',
    field: 'document_type',
    menuTabs: false,
    editable: false,
    sortable: false,
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
    valueFormatter: params =>
      params.data.document_date ? moment(params.data.document_date).format('DD MMMM, YYYY') : ''
  },
  {
    headerName: 'Period Date',
    field: 'period_date',
    menuTabs: false,
    editable: false,
    sortable: false,
    flex: 1,
    colId: 'periodDate',
    valueFormatter: params => (params.data.period_date ? moment(params.data.period_date).format('DD MMMM, YYYY') : '')
  }
];
export default function FilingsResultsTable() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { fillingsData } = useSelector(state => state.Filings);
  const fillingsDataCopy = cloneDeep(fillingsData);
  const cellClicked = async params => {
    if (params.data) {
      let selectedItem = getCompanyByTickerUniverse(params.data.ticker, 'all');
      let company = formatComapnyData(selectedItem);
      company.recentId = params.data.document_id;
      dispatch(setSelectedWatchlist(company));
      history.push('/sentiment');
    }
  };

  return (
    <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
      <AgGridReact
        rowSelection="single"
        domLayout="autoHeight"
        rowData={fillingsDataCopy.reverse()}
        columnDefs={columnDefs}
        suppressCellSelection={true}
        onCellClicked={cellClicked}
        multiSortKey={'ctrl'}></AgGridReact>
    </div>
  );
}
