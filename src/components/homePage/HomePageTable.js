import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { get, round } from 'lodash';
import {
  parseDateStrMoment,
  dateFormaterMoment,
  descriptionValueStyler,
  parseNumber,
  percentFormater,
  changeWordGetter,
  numberWordComparator
} from '../watchlist/WatchlistTableHelpers';
import TickerLogo from '../watchlist/WatchlistTableComponents/TickerLogo';
import { Card, ButtonGroup, Button } from '@material-ui/core';
import clsx from 'clsx';
import './HomePageTableStyle.css';
import { setSelectedWatchlist } from '../../reducers/Watchlist';
import { setSidebarToggle, setSidebarToggleMobile } from '../../reducers/ThemeOptions';
import { useDispatch, useSelector } from 'react-redux';
import { setHomePageSelectedItem, setHomePageSearchIndex, setHomePageLoader } from '../../reducers/HomePage';
import config from '../../config/config';
import axios from 'axios';
import { renameDocumentTypes } from '../topic/topicHelpers';
import { homePageTypesSelection } from '../../config/filterTypes';
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
    colId: 'document_type',
    valueFormatter: params => renameDocumentTypes(params.data.document_type)
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
    filter: 'agNumberColumnFilter',
    valueGetter: params => {
      const sentimentValue = get(params, 'data.sentiment', null);
      let sentimentObj = null;
      if (sentimentValue) {
        sentimentObj = {
          number: parseNumber(get(params, 'data.sentiment', null)),
          word: changeWordGetter(get(params, 'data.sentimentWord', null))
        };
      }
      return sentimentObj;
    },
    valueFormatter: params => percentFormater(params, true),
    comparator: numberWordComparator,
    filterParams: {
      valueGetter: params => {
        const value = get(params, 'data.sentiment', null);
        return value !== null ? parseNumber(value) : null;
      }
    },
    cellStyle: params => {
      return descriptionValueStyler(params);
    }
  },
  {
    headerName: 'Word Change Percentage',
    field: 'wordCount',
    menuTabs: false,
    editable: false,
    sortable: true,
    flex: 1,
    colId: 'word_count',
    type: 'numericColumn',
    filter: 'agNumberColumnFilter',
    valueGetter: params => {
      const sentimentValue = get(params, 'data.wordCount', null);
      let sentimentObj = null;
      if (sentimentValue) {
        sentimentObj = {
          number: parseNumber(sentimentValue),
          word: changeWordGetter(get(params, 'data.wordCountChangePercentWord', null))
        };
      }
      return sentimentObj;
    },
    valueFormatter: params => percentFormater(params, true),
    comparator: numberWordComparator,
    filterParams: {
      valueGetter: params => {
        const value = get(params, 'data.wordCount', null);
        return value !== null ? parseNumber(value) : null;
      }
    },
    cellStyle: params => {
      return descriptionValueStyler(params);
    }
  }
];

export default function HomePageTable(props) {
  const [recentCompaniesData, setRecentCompaniesData] = useState([]);
  const { homePageSelectedSearchIndex } = useSelector(state => state.HomePage);
  const dispatch = useDispatch();
  const cellClicked = params => {
    if (params.data) {
      dispatch(setSelectedWatchlist(params.data));
      dispatch(setHomePageSelectedItem(params.data));
      dispatch(setSidebarToggle(false));
      dispatch(setSidebarToggleMobile(false));
    }
  };

  const getRecentCompaniesData = React.useCallback(
    async searchIndex => {
      dispatch(setHomePageLoader(true));

      try {
        const response = await axios.get(
          `${config.apiUrl}/api/get_company_filing_listing?index=${searchIndex.key}&order=DESC&limit=100&type=${searchIndex.type}`
        );
        const data = get(response, 'data.data', []);
        if (response) {
          const recentData = data.map(d => {
            return {
              ...d,
              docType: get(d, 'document_type', null),
              sentiment: round(get(d, 'sentiment', null), 2),
              // sentimentWord: get(d['10k'].totdoc, 'sentimentWord', null),
              docDate: get(d, 'document_date', null),
              wordCount: round(get(d, 'word_count', null), 2)
              // wordCountChangePercentWord: get(d['10k'].totdoc, 'wordCountChangePercentWord', null)
            };
          });

          setRecentCompaniesData(recentData);
          dispatch(setHomePageSelectedItem(get(recentData, '[0]', null)));
          dispatch(setHomePageLoader(false));
        } else {
          dispatch(setHomePageSelectedItem({}));
          setRecentCompaniesData([]);
          dispatch(setHomePageLoader(false));
        }
      } catch (error) {
        dispatch(setHomePageSelectedItem({}));
        setRecentCompaniesData([]);
        dispatch(setHomePageLoader(false));
      }
    },
    [dispatch]
  );
  useEffect(() => {
    getRecentCompaniesData(homePageSelectedSearchIndex);
  }, [getRecentCompaniesData, homePageSelectedSearchIndex]);

  return (
    <Card className="card-box mb-4" style={{ height: '600px' }}>
      <div className={clsx('card-header')}>
        <div className="card-header--title font-weight-bold">Recent Watchlist Documents</div>
        <ButtonGroup color="primary">
          {homePageTypesSelection.map((diff, i) => (
            <Button
              size="small"
              key={`diff_${i}`}
              onClick={() => dispatch(setHomePageSearchIndex(diff))}
              variant={diff.key === homePageSelectedSearchIndex.key ? 'contained' : 'outlined'}>
              {diff.label}
            </Button>
          ))}
        </ButtonGroup>
      </div>
      <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
        <AgGridReact
          columnDefs={columnDefs}
          rowSelection="single"
          rowData={recentCompaniesData}
          suppressCellSelection={true}
          frameworkComponents={frameworkComponents}
          onCellClicked={cellClicked}
          multiSortKey={'ctrl'}></AgGridReact>
      </div>
    </Card>
  );
}
