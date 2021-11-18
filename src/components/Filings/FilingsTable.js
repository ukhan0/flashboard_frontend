import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './FilingsResultsTableStyles.css';
import { useHistory } from 'react-router-dom';
import cjson from 'compressed-json';
import moment from 'moment';
import { formatComapnyData } from '../watchlist/WatchlistHelpers';
import { renameDocumentTypes } from '../topic/topicHelpers';
import { setSelectedWatchlist } from '../../reducers/Watchlist';
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
    valueFormatter: params => (params.data.document_date ? params.data.document_date : '')
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
  const cellClicked = async params => {
    if (params.data) {
      let selectedItem = getCompanyByTicker(params.data.ticker);
      let company = formatComapnyData(selectedItem);

      company.recentId = params.data.document_id;
      dispatch(setSelectedWatchlist(company));
      history.push('/sentiment');
    }
  };
  const getCompanyByTicker = ticker => {
    let rawData = localStorage.getItem(`watchlist-data-all`);
    if (rawData) {
      rawData = cjson.decompress.fromString(rawData);
    }
    let company = rawData.find(sd => sd.ticker === ticker);

    return company;
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
