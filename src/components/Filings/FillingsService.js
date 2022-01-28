class FillingsService {
  constructor() {
    this.agGridAPI = null;
    this.agGridColumnAPI = null;
  }

  init(api, columnApi) {
    this.agGridAPI = api;
    this.agGridColumnAPI = columnApi;
  }
}

export default new FillingsService();
