import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty, get, forEach } from 'lodash';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community';
import { setSidebarToggle, setSidebarToggleMobile } from '../../reducers/ThemeOptions';
import WatchlistService from './WatchlistService';
import WordStatus from './WatchlistTableComponents/WordStatus';
import AddRemoveIcon from './WatchlistTableComponents/AddRemoveIcon';
import TickerLogo from './WatchlistTableComponents/TickerLogo';
import CountryCodeRenderer from './WatchlistTableComponents/CountryCodeRenderer';
import TweetsIcon from './WatchlistTableComponents/tweet';
import './watchlistTableStyles.css';
import Action from './WatchlistActions/WatchlistActions';
import { saveComparisionSettings, getComparisionSettings } from '../comparision/ComparisionHelper';
import {
  getWatchlistType,
  isBigAgGrid,
  getWatchlistSettings,
  getCompanyByIndex,
  storeColumnsState,
  getColumnState,
  storeFilteringState,
  getFilteringState,
  getFilterCountriesArray,
  isItSocialCompany
} from './WatchlistHelpers';
import { setIsFilterActive, setSelectedWatchlist } from '../../reducers/Watchlist';
import {
  watchlistTableDefaultColDef,
  watchlistTableColDefs,
  watchlistTableColDefs1,
  watchlistTableSideBarConfiguration
} from '../../config/columnDefinations';
import { useHistory } from 'react-router-dom';

const frameworkComponents = {
  WordStatusRenderer: WordStatus,
  AddRemoveIcon: AddRemoveIcon,
  TickerLogo: TickerLogo,
  actions: Action,
  CountryCodeRenderer: CountryCodeRenderer,
  TweetIcon: TweetsIcon
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

const filterColumnsFromBackend = ['country', 'document_type', 'source', 'industry', 'sector'];

const WatchlistTable = ({ tableData, onColumnClick, handleWatchlistTickers, fetchTable2Data }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    selectedMetric,
    selectedType,
    selectedFileType,
    completeCompaniesData,
    completeCompaniesDataGlobal
  } = useSelector(state => state.Watchlist);
  const gridApi = useRef(null);
  const gridRef = useRef();
  const [isFilterData, setIsFilterData] = useState(false);
  const [columnDefination, setColumnDefination] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [fetchFiltersFromApiFlag, setFetchFiltersFromApiFlag] = useState(false);

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

        if (rowId === 'tweetsFlag' && isItSocialCompany(params.data.flag)) {
          dispatch(setSelectedWatchlist(params.data));
          history.push('/socialSentiment');
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
        if (rowId !== 'actions') {
          dispatch(setSidebarToggleMobile(true));
        }
        onColumnClick(params.data, rowId);
      }
    }
  };

  const filterColumnsFromBackendHandler = filteringModel => {
    let filtersObjectForApiCall = {};
    Object.keys(filteringModel).forEach(key => {
      if (filterColumnsFromBackend.includes(key)) {
        filtersObjectForApiCall[`filter_${key}`] = `*${filteringModel[key].filter}*`;
      }
    });
    if (Object.keys(filtersObjectForApiCall).length) {
      if (filteringModel.country) {
        const countryies = getFilterCountriesArray(filteringModel.country.filter);
        if (countryies) {
          filtersObjectForApiCall['filter_country'] = countryies;
        } else {
          return;
        }
      }
      setFetchFiltersFromApiFlag(true);
      fetchTable2Data(filtersObjectForApiCall);
    } else if (fetchFiltersFromApiFlag) {
      setFetchFiltersFromApiFlag(false);
      fetchTable2Data();
    }
  };

  const filterChangeHandler = params => {
    const filteringModel = params.api.getFilterModel();
    if (params?.api?.rowModel?.rowsToDisplay) {
      let data = params.api.rowModel.rowsToDisplay;
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
    const watchlistSetting = getWatchlistSettings();
    let type, fileType, universe, metric;
    if (watchlistSetting) {
      type = watchlistSetting.selectedType ?? 'domestic';
      fileType = watchlistSetting.selectedFileType ?? '10-K';
      universe = watchlistSetting.selectedUniverse ?? 'all';
      metric = watchlistSetting.selectedMetric ?? 'totdoc';
    } else {
      type = 'domestic';
      fileType = '10-K';
      universe = 'watchlist';
      metric = 'totdoc';
    }
    const allSelectedFilters = {
      ...filteringModel,
      selectedType: type,
      selectedFileType: fileType,
      selectedUniverse: universe,
      selectedMetric: metric
    };
    if (selectedFileType !== '10-K' && selectedFileType !== '10-Q') {
      // filter column from backend
      filterColumnsFromBackendHandler(filteringModel);
    }
    storeFilteringState(allSelectedFilters);
    // dispatch(setIsFilterActive(params.api.isAnyFilterPresent()));
    // dispatch(setIsFilterActive(params.api.isColumnFilterPresent()));
    dispatch(setIsFilterActive(!isEmpty(filteringModel)));
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
    const columnsState = getColumnState(selectedFileType);
    if (columnsState && columnsState.length) {
      gridRef.current.columnApi.applyColumnState({
        state: columnsState,
        applyOrder: true
      });
    }
  };

  useEffect(() => {
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
        defaultColDef={watchlistTableDefaultColDef}
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
        overlayNoRowsTemplate={isFilterData ? 'No result for specified filters' : 'No Rows To Show'}
        onFilterChanged={filterChangeHandler}></AgGridReact>
      <div style={tableFooter}>Total Rows : {rowCount}</div>
    </div>
  );
};

export default WatchlistTable;
