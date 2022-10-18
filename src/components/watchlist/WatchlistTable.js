import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty, get, forEach } from 'lodash';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community';
import countriesCode from '../../config/countriesCode';
import { setSidebarToggle, setSidebarToggleMobile } from '../../reducers/ThemeOptions';
import WatchlistService from './WatchlistService';
import WordStatus from './WatchlistTableComponents/WordStatus';
import AddRemoveIcon from './WatchlistTableComponents/AddRemoveIcon';
import TickerLogo from './WatchlistTableComponents/TickerLogo';
import CountryCodeRenderer from './WatchlistTableComponents/CountryCodeRenderer';
import TweetsIcon from './WatchlistTableComponents/tweet';
import './watchlistTableStyles.css';
import Action from './WatchlistActions/WatchlistActions';
import { useLocation } from 'react-router-dom';
import { saveComparisionSettings, getComparisionSettings } from '../comparision/ComparisionHelper';
import {
  checkIsFilterActive,
  getWatchlistType,
  isBigAgGrid,
  getWatchlistSettings,
  getCompanyByIndex,
  storeColumnsState,
  getColumnState,
  storeFilteringState,
  getFilteringState
} from './WatchlistHelpers';
import {
  setIsFilterActive,
  setSelectedTickerSymbol,
  setIsTickerSelected,
  setSelectedWatchlist
} from '../../reducers/Watchlist';
import {
  watchlistTableColDefs,
  watchlistTableColDefs1,
  watchlistTableSideBarConfiguration
} from '../../config/columnDefinations';

const frameworkComponents = {
  WordStatusRenderer: WordStatus,
  AddRemoveIcon: AddRemoveIcon,
  TickerLogo: TickerLogo,
  actions: Action,
  CountryCodeRenderer: CountryCodeRenderer,
  TweetIcon: TweetsIcon
};

const defaultColDef = {
  sortable: true,
  filter: true,
  resizable: true,
  floatingFilter: true,
  suppressMenu: true,
  filterParams: { newRowsAction: 'keep' },
  headerClass: ['allColumnHeader'],
  wrapText: true,
  headerComponentParams: {
    template:
      '<div class="ag-cell-label-container" role="presentation">' +
      '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
      '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
      '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
      '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
      '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
      '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
      '    <span ref="eText" class="ag-header-cell-text" role="columnheader" style="white-space: normal;"></span>' +
      '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
      '  </div>' +
      '</div>'
  }
};

const gridOptions = {
  headerHeight: 80
};

const tableFooter = {
  border: '1px solid #d1d1d1',
  paddingRight: '1.7%',
  position: 'relative',
  top: 0,
  textAlign: 'right',
  width: '100%'
};
const WatchlistTable = ({ tableData, onColumnClick, handleWatchlistTickers }) => {
  const dispatch = useDispatch();
  const {
    selectedMetric,
    isTickerSelected,
    selectedType,
    selectedFileType,
    completeCompaniesData,
    completeCompaniesDataGlobal
  } = useSelector(state => state.Watchlist);
  const gridApi = React.useRef(null);
  const gridRef = React.useRef();
  const [isFilterData, setIsFilterData] = React.useState(false);
  const [isClear, setIsClear] = React.useState(false);
  let getQueryParams = new URLSearchParams(useLocation().search);
  let isTicker = React.useRef(false);
  const [columnDefination, setColumnDefination] = useState([]);
  const [rowCount, setRowCount] = React.useState(0);

  useEffect(() => {
    isBigAgGrid(selectedFileType)
      ? setColumnDefination(watchlistTableColDefs)
      : setColumnDefination(watchlistTableColDefs1);
  }, [selectedFileType]);

  const storeColumnsStateComman = params => {
    const columnState = params.columnApi.getColumnState();

    storeColumnsState(selectedFileType, columnState);
    var padding = 40;
    var height = headerHeightGetter() + padding;
    params.api.setHeaderHeight(height);
    params.api.resetRowHeights();
  };
  const storeChangedColumnsState = params => {
    if (params.type === 'sortChanged' || params.type === 'columnResized' || params.type === 'columnMoved') {
      storeColumnsStateComman(params);
    }
  };

  const storeColumnsStateVisible = params => {
    storeColumnsStateComman(params);
  };

  React.useEffect(() => {
    if (!gridApi.current) {
      return;
    }
    isTicker.current = false;
    const tickerFilterInstance = gridApi.current.getFilterInstance('ticker');
    if (isTickerSelected) {
      isTicker.current = true;
      tickerFilterInstance.setModel({
        type: 'equals',
        filter: ''
      });
    }
    gridApi.current.onFilterChanged();
  }, [isTickerSelected]);
  const handleColumnHideForSedar = useCallback(
    gridApiLocal => {
      let columnDefs = columnDefination;
      columnDefs.forEach(function(colDef) {
        if (colDef.field === 'mktcap' || colDef.field === 'adv') {
          if (getWatchlistType() === 'global') {
            colDef.hide = true;
          } else {
            colDef.hide = false;
          }
        }
      });
      gridApiLocal.setColumnDefs(columnDefs);
    },
    [columnDefination]
  );
  useEffect(() => {
    if (!gridApi.current) {
      return;
    }
    handleColumnHideForSedar(gridApi.current);
  }, [selectedType, handleColumnHideForSedar]);
  const setRecentOldId = (item, company, documentType = '10-K') => {
    if (documentType === '10-K') {
      item.recentId10k = company.recentId10k ? company.recentId10k : company.recentId10q;
      item.oldId10k = company.oldId10k ? company.oldId10k : company.oldId10q;
      item.recentId10q = company.recentId10q ? company.recentId10q : company.recentId10k;
      item.oldId10q = company.oldId10q ? company.oldId10q : company.oldId10k;
      item.oldId = company.oldId10k ? company.oldId10k : company.oldId10q;
      // item.recentId = company.recentId10k ? company.recentId10k : company.recentId10q;
      item.comparisonType = '10-K';
    } else {
      item.recentId10k = company.recentId10k ? company.recentId10k : company.recentId10q;
      item.oldId10k = company.oldId10k ? company.oldId10k : company.oldId10q;
      item.recentId10q = company.recentId10q ? company.recentId10q : company.recentId10k;
      item.oldId10q = company.oldId10q ? company.oldId10q : company.oldId10k;
      item.oldId = company.oldId10q ? company.oldId10q : company.oldId10k;
      // item.recentId = company.recentId10q ? company.recentId10q : company.recentId10k;
      item.comparisonType = '10-Q';
    }
    return item;
  };
  const cellClicked = async params => {
    if (params.data) {
      let item = { ...params.data, companyName: params.data.company_name, recentId: params.data.id };
      let rowId = params.column.colId;

      if (!isBigAgGrid(selectedFileType)) {
        if (rowId === 'actions') {
          handleWatchlistTickers(params.data.ticker, params.data.isTickerActive);
          return;
        }
        let company = await getCompanyByIndex(params.data.ticker, completeCompaniesData, completeCompaniesDataGlobal);
        if (company) {
          if (params.data.documentType === '10-Q') {
            item = await setRecentOldId(item, company, '10-Q');
          } else {
            item = await setRecentOldId(item, company, '10-K');
          }
        }
        dispatch(setSelectedWatchlist(item));
        dispatch(setSidebarToggle(false));
        dispatch(setSidebarToggleMobile(false));
      } else {
        let comparisionSection = getComparisionSettings() ? getComparisionSettings() : {};
        comparisionSection.comparisionSection = selectedMetric;
        saveComparisionSettings(comparisionSection);
        // dispatch(setSidebarToggle(true));
        // dispatch(setSidebarToggleMobile(true));
        onColumnClick(params.data, rowId);
      }
    }
  };

  const filterChangeHandler = params => {
    if (params?.api?.rowModel?.rowsToDisplay) {
      let data = params?.api?.rowModel?.rowsToDisplay;
      setRowCount(data.length);
      if (data.length < 1) {
        setIsFilterData(true);
        setTimeout(() => {
          gridApi.current.showNoRowsOverlay();
        }, [200]);
      } else {
        setIsFilterData(false);
        gridApi.current.hideOverlay();
      }
    }
    setIsClear(WatchlistService.getTickerState());
    const filteringModel = params.api.getFilterModel();
    const watchlistSetting = getWatchlistSettings();
    let selectedType, selectedFileType, selectedUniverse, selectedMetric;
    if (watchlistSetting) {
      selectedType = watchlistSetting.selectedType ? watchlistSetting.selectedType : 'domestic';
      selectedFileType = watchlistSetting.selectedFileType ? watchlistSetting.selectedFileType : '10-K';
      selectedUniverse = watchlistSetting.selectedUniverse ? watchlistSetting.selectedUniverse : 'watchlist';
      selectedMetric = watchlistSetting.selectedMetric ? watchlistSetting.selectedMetric : 'totdoc';
    } else {
      selectedType = 'domestic';
      selectedFileType = '10-K';
      selectedUniverse = 'watchlist';
      selectedMetric = 'totdoc';
    }
    const allSelectedFilters = { ...filteringModel, selectedType, selectedFileType, selectedUniverse, selectedMetric };
    storeFilteringState(allSelectedFilters);
    dispatch(setIsFilterActive(checkIsFilterActive()));
  };

  const handleGridReady = params => {
    WatchlistService.init(params.api, params.columnApi); // global service
    gridApi.current = params.api;
    var inputFilters = document.getElementsByClassName('ag-text-field-input');
    forEach(inputFilters, function(data) {
      data.setAttribute('autoComplete', 'new-password');
    });
  };
  function headerHeightGetter() {
    var columnHeaderTexts = [...document.querySelectorAll('.ag-header-cell-text')];
    var clientHeights = columnHeaderTexts.map(headerText => headerText.clientHeight);
    var tallestHeaderTextHeight = Math.max(...clientHeights);

    return tallestHeaderTextHeight;
  }

  const handleFirstDataRendered = params => {
    handleColumnHideForSedar(params.api);
    if (params?.api?.rowModel?.rowsToDisplay) {
      let data = params?.api?.rowModel?.rowsToDisplay;
      setRowCount(data.length);
    }
    var padding = 40;
    var height = headerHeightGetter() + padding;
    params.api.setHeaderHeight(height);
    params.api.resetRowHeights();

    const filteringState = getFilteringState(true);
    if (filteringState && !isEmpty(filteringState)) {
      params.api.setFilterModel(filteringState);
    }
    const tickerFilterInstance = gridApi.current.getFilterInstance('ticker');
    if (getQueryParams.get('ticker')) {
      tickerFilterInstance.setModel({
        type: 'equals',
        filter: getQueryParams.get('ticker')
      });
    }
    gridApi.current.onFilterChanged();
    const columnsState = getColumnState(selectedFileType);
    if (columnsState && columnsState.length) {
      gridRef.current.columnApi.applyColumnState({
        state: columnsState,
        applyOrder: true
      });
    }
  };

  React.useEffect(() => {
    if (isClear && isTicker.current) {
      dispatch(setSelectedTickerSymbol(null));
      setIsClear(false);
      dispatch(setIsTickerSelected(false));
    }
  }, [isClear, dispatch]);

  React.useEffect(() => {
    if (!gridApi.current) {
      return;
    }

    if (get(tableData, 'data', [])) {
      setTimeout(() => {
        let data = gridApi.current.rowModel?.rowsToDisplay;
        setRowCount(data.length);
      }, [100]);
    }
  }, [tableData]);

  useEffect(() => {
    const columnsState = getColumnState(selectedFileType);
    if (columnsState && columnsState.length) {
      setTimeout(() => {
        gridRef.current.columnApi.applyColumnState({
          state: columnsState,
          applyOrder: true
        });
      }, [500]);
    } else {
      storeColumnsState(selectedFileType, columnsState);
    }
  }, [selectedFileType]);
  return (
    <div className="ag-theme-alpine" style={{ height: '98%', width: '100%' }}>
      <AgGridReact
        ref={gridRef}
        sortingOrder={['asc', 'desc']}
        onGridReady={handleGridReady}
        onFirstDataRendered={handleFirstDataRendered}
        rowData={tableData}
        quickFilterText={''}
        columnDefs={columnDefination}
        defaultColDef={defaultColDef}
        sideBar={watchlistTableSideBarConfiguration}
        tooltipShowDelay={0}
        pagination={false}
        rowSelection="single"
        gridOptions={gridOptions}
        multiSortKey="ctrl"
        frameworkComponents={frameworkComponents}
        onCellClicked={cellClicked}
        onColumnResized={storeChangedColumnsState}
        onColumnMoved={storeChangedColumnsState}
        onColumnVisible={storeColumnsStateVisible}
        onSortChanged={storeChangedColumnsState}
        suppressScrollOnNewData={true}
        enableBrowserTooltips={true}
        context={countriesCode}
        overlayNoRowsTemplate={isFilterData ? 'No result for specified filters' : 'No Rows To Show'}
        onFilterChanged={filterChangeHandler}></AgGridReact>
      <div style={tableFooter}>Total Rows : {rowCount}</div>
    </div>
  );
};

export default WatchlistTable;
