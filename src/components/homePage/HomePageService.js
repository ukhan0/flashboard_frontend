class HomePageService {
  constructor() {
    this.agGridAPI = null;
    this.agGridColumnAPI = null;
    this.colStateKey = 'RecentDocs::home';
  }

  init(api, columnApi) {
    this.agGridAPI = api;
    this.agGridColumnAPI = columnApi;
  }

  mangeAgGridColunms = (coldId, status) => {
    this.agGridColumnAPI.setColumnsVisible([coldId], status);
  };

  getColumnState = () => {
    const offRampAlertsTableState = localStorage.getItem(this.colStateKey);
    let columnState = [];
    if (offRampAlertsTableState) {
      try {
        columnState = JSON.parse(offRampAlertsTableState);
      } catch (error) {
        // logException(error)
      }
    }
    return columnState;
  };

  storeColumnsState = state => {
    localStorage.setItem(this.colStateKey, JSON.stringify(state));
  };
}

export default new HomePageService();
