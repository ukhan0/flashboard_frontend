import React from 'react'
import { forEach, isEmpty, get, isNull } from 'lodash'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import { parseDateStr, parseNumber, percentFormater, currencyFormater, currencyStyler, changeWordGetter, changeWordFormatter, changeWordStyler } from './WatchlistTableHelpers'
import moment from 'moment'

const defaultColDef = {
	sortable: true,
	filter: true,
	resizable: true,
	floatingFilter: true
}

const sideBarConfiguration = {
	toolPanels: [
		{
			id: 'columns',
			labelDefault: 'Columns',
			labelKey: 'columns',
			iconKey: 'columns',
			toolPanel: 'agColumnsToolPanel',
			toolPanelParams: {
				suppressRowGroups: true,
				suppressValues: true,
			},
		},
		{
			id: 'filters',
			labelDefault: 'Filters',
			labelKey: 'filters',
			iconKey: 'filter',
			toolPanel: 'agFiltersToolPanel',
		}
	],
	position: 'right',
	defaultToolPanel: null,
}

const colDefs = [
	{
		headerName: 'Ticker',
		field: 'ticker',
	},
	{
		headerName: 'Company Name',
		field: 'companyName',
		filter: 'agTextColumnFilter',
	},
	{
		headerName: 'Sector',
		field: 'sector',
	},
	{
		headerName: 'Industry',
		field: 'industry',
		filter: 'agTextColumnFilter',
	},
	{
		headerName: 'Mktcap',
		field: 'mktcap',
		filter: 'agNumberColumnFilter',
		valueGetter: (params) => parseNumber(get(params, 'data.mktcap', null)),
		valueFormatter: (params) => currencyFormater(params.value, 0),
		cellStyle: currencyStyler,
	},
	{
		headerName: 'Adv',
		field: 'adv',
		filter: 'agNumberColumnFilter',
		valueGetter: (params) => parseNumber(get(params, 'data.adv', null)),
		valueFormatter: (params) => currencyFormater(params.value, 0),
		cellStyle: currencyStyler,
	},
	{
		headerName: 'Last Reported',
		field: 'last',
		valueGetter: (params) => parseDateStr(get(params, 'data.last', null)),
		valueFormatter: (params) => {
			let formatedValue = null
			if(params.value) {
				const momentDateObj = moment(params.value)
				formatedValue = momentDateObj.format('YYYY-MM-DD')
			}
			return formatedValue
		},
		filter: 'agDateColumnFilter',
	},
	{
		headerName: 'Sentiment',
		children: [
			{
				headerName: 'Sentiment',
				field: 'sentiment',
				filter: 'agNumberColumnFilter',
				valueGetter: (params) => parseNumber(get(params, 'data.sentiment', null)),
				valueFormatter: percentFormater,
			},
			{
				headerName: 'Sentiment Word',
				field: 'sentimentWord',
				valueGetter: (params) => changeWordGetter(get(params, 'data.sentimentWord', null)),
				valueFormatter: (params) => changeWordFormatter(params.value),
				cellStyle: (params) => changeWordStyler(params.value)
			},
        ]
	},
	{
		headerName: 'Sentiment Change',
		children: [
			{
				headerName: 'Sentiment Change',
				field: 'sentimentChange',
				filter: 'agNumberColumnFilter',
				valueGetter: (params) => parseNumber(get(params, 'data.sentimentChange', null)),
				valueFormatter: percentFormater,
			},
			{
				headerName: 'Sentiment Change Word',
				field: 'sentimentChangeWord',
				valueGetter: (params) => changeWordGetter(get(params, 'data.sentimentChangeWord', null)),
				valueFormatter: (params) => changeWordFormatter(params.value),
				cellStyle: (params) => changeWordStyler(params.value)
			},
		]
	},
	{
		headerName: 'Word Count Change',
		children: [
			{
				headerName: 'Word Count Change',
				field: 'wordCountChange',
				filter: 'agNumberColumnFilter',
			},
			{
				headerName: 'Word Count Change Percent',
				field: 'wordCountChangePercent',
				filter: 'agNumberColumnFilter',
				valueGetter: (params) => parseNumber(get(params, 'data.wordCountChangePercent', null)),
				valueFormatter: percentFormater,
			},
			{
				headerName: 'Word Count Change Percent Word',
				field: 'wordCountChangePercentWord',
				valueGetter: (params) => changeWordGetter(get(params, 'data.wordCountChangePercentWord', null)),
				valueFormatter: (params) => changeWordFormatter(params.value),
				cellStyle: (params) => changeWordStyler(params.value)
			},
		]
	},
]

export default function WatchlistTable(props) {

	const storeColumnsState = (params) => {
		const columnState = params.columnApi.getColumnState()
		props.storeColumnsState(columnState)
	}

	const storeSortState = (params) => {
		const sortingsModel = params.api.getSortModel()
    	props.storeSortingsState(sortingsModel)
	}

	const storeFilteringState = (params) => {
		const filteringModel = params.api.getFilterModel()
		console.log(filteringModel)
    	props.storeFilteringState(filteringModel)
	}

	const handleGridReady = (params) => {
		const columnsState = props.columnsState
		// const sortingState = props.sortingState
		// const filteringState = props.filteringState
		if(columnsState && columnsState.length) {
			params.columnApi.setColumnState(columnsState)
		}

		// if(sortingState && sortingState.length) {
		// 	params.api.setSortModel(sortingState)
		// 	params.api.onSortChanged()
		// }

		// if(filteringState && !isEmpty(filteringState)) {
		// 	console.log(filteringState)
		// 	forEach(filteringState, (columnFilterQuery, columnKey) => {
		// 		params.api.getFilterInstance(columnKey).setModel(columnFilterQuery)
		// 	})
		// 	params.api.onFilterChanged()
		// }
	}

	return (
		<div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
			<AgGridReact
				onGridReady={handleGridReady}
				rowData={props.data}
				columnDefs={colDefs}
				defaultColDef={defaultColDef}
				sideBar={sideBarConfiguration}
				onColumnResized={storeColumnsState}
				onColumnMoved={storeColumnsState}
				onColumnVisible={storeColumnsState}
				onSortChanged={storeColumnsState}
				onFilterChanged={storeColumnsState}
			>
			</AgGridReact>
		</div>
	)
}
