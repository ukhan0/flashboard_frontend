export const SET_USER = 'USER/SET_USER';

export const setUser = user => ({
  type: SET_USER,
  user
});

const getDefaultState = () => {
  const userStr = localStorage.getItem(`user`);
  return {
    user: userStr ? JSON.parse(userStr) : null
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
    case SET_USER:
      return { ...state, user: action.user };
    default:
      break;
  }
  return state;
}
