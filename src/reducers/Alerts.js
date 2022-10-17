export const SET_SNACKBAR_OBJ = 'ALERTS/SET_SNACKBAR_OBJ';

export const setSnackBarObj = snackBarObj => ({
  type: SET_SNACKBAR_OBJ,
  snackBarObj
});

const getDefaultState = () => {
  return {
    snackBarObj: null
  };
};

export default function reducer(
  state = {
    ...getDefaultState()
  },
  action
) {
  switch (action.type) {
    case SET_SNACKBAR_OBJ:
      return { ...state, snackBarObj: action.snackBarObj };
    default:
      break;
  }
  return state;
}
