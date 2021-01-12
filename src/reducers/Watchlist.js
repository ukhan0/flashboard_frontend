
export const SET_FILE_TYPE = 'WATCHLIST/SET_FILE_TYPE';
export const SET_UNIVERSE = 'WATCHLIST/SET_UNIVERSE';
export const SET_METRIC = 'WATCHLIST/SET_METRIC';
export const RESET_WATCHLIST = 'WATCHLIST/RESET_WATCHLIST';

export const setWatchlistFileType = fileType => ({
  type: SET_FILE_TYPE,
  fileType
});
export const setWatchlistUniverse = universe => ({
  type: SET_UNIVERSE,
  universe
});
export const setWatchlistMetric = metric => ({
  type: SET_METRIC,
  metric
});
export const resetWatchlist = () => ({
  type: RESET_WATCHLIST
});

const getDefaultState = () => {
  return {
    selectedFileType: '10k',
    selectedUniverse: 'watchlist',
    selectedMetric: 'totdoc'
  };
};

export default function reducer(
  state = {
    ...getDefaultState()
  },
  action
) {
  switch (action.type) {
    // watchlist
    case SET_FILE_TYPE:
      return { ...state, selectedFileType: action.fileType };
    case SET_UNIVERSE:
      return { ...state, selectedUniverse: action.universe };
    case SET_METRIC:
      return { ...state, selectedMetric: action.metric };
    case RESET_WATCHLIST:
      return { ...state, ...getDefaultState() };
    default:
      break;
  }
  return state;
}
