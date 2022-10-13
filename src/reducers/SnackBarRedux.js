export const SET_SNACKBAR_OBJ = 'SNACKBAR/SET_SNACKBAR_OBJ';

export const setSnackBarObj = snackBarObj => ({
  type: SET_SNACKBAR_OBJ,
  snackBarObj
});

const getDefaultState = () => {
  return {
    snackBarObj: {
      isSnackBar: false,
      message: '',
      severity: '',
      anchorOrigin: {},
    },
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
    case SET_SNACKBAR_OBJ:
      return { ...state, snackBarObj: action.snackBarObj };
    default:
      break;
  }
  return state;
}
