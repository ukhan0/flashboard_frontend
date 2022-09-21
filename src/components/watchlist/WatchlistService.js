import { formatExportValue } from './WatchlistTableHelpers';
import { isEmpty } from 'lodash';
const exportParams = {
  fileName: 'WatchList',
  processCellCallback: formatExportValue
};

class WatchListService {
  constructor() {
    this.agGridAPI = null;
    this.agGridColumnAPI = null;
    this.agGrid2API = null;
    this.agGrid2ColumnAPI = null;
    this.agGrid2 = 'watchlist:grid2';
  }

  init(api, columnApi) {
    this.agGridAPI = api;
    this.agGridColumnAPI = columnApi;
  }
  initGrid2(api, columnApi) {
    this.agGrid2API = api;
    this.agGrid2ColumnAPI = columnApi;
  }

  autoSizeColumns = () => {
    var allColumnIds = [];
    this.agGridColumnAPI.getAllColumns().forEach(function(column) {
      allColumnIds.push(column.colId);
    });
    this.agGridColumnAPI.autoSizeColumns(allColumnIds, false);
  };

  sizeColumnsToFit = () => {
    this.agGridAPI.sizeColumnsToFit();
  };

  mangeAgGridColunms = (coldId, status) => {
    this.agGridColumnAPI.setColumnsVisible([coldId], status);
  };

  getAgGridAColunms = () => {
    let columns = [];
    let displayedColumns = [];
    if (this.agGridColumnAPI?.columnController?.columnDefs) {
      columns = this.agGridColumnAPI.columnController.columnDefs;
      displayedColumns = this.agGridColumnAPI.getAllDisplayedColumns().map(v => v.colId);
    }
    return { columns: columns, displayedColumns: displayedColumns };
  };

  getTickerState = () => {
    let clear = false;
    const filteringModel = this.agGridAPI.getFilterModel();
    if (isEmpty(filteringModel)) {
      clear = true;
    }
    return clear;
  };

  clearSort = sort => {
    this.agGridColumnAPI.applyColumnState({
      defaultState: { sort: null }
    });
    this.agGridColumnAPI.applyColumnState({
      state: [
        {
          colId: 'last',
          sort: sort
        }
      ]
    });
  };

  clearFilter = () => {
    if (this.agGridAPI) {
      this.agGridAPI.setFilterModel(null);
    }
  };

  exportWatchlist(format) {
    switch (format) {
      case 'csv':
        this.agGridAPI.exportDataAsCsv(exportParams);
        break;
      case 'xml':
        this.agGridAPI.exportDataAsExcel({
          exportMode: 'xml',
          ...exportParams
        });
        break;
      case 'xlsx':
        this.agGridAPI.exportDataAsExcel(exportParams);
        break;
      default:
        break;
    }
  }

}

export default new WatchListService();
