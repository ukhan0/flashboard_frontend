export const SET_HOMEPAGE_SELECTED_ITEM = 'HOMEPAGE/SET_HOMEPAGE_SELECTED_ITEM ';
export const setHomePageSelectedItem = homePageSelectedItem => ({
  type: SET_HOMEPAGE_SELECTED_ITEM,
  homePageSelectedItem
});
const getDefaultState = () => {
  return {
    homePageSelectedItem: {}
  };
};

export default function reducer(
  state = {
    ...getDefaultState()
  },
  action
) {
  switch (action.type) {
    case SET_HOMEPAGE_SELECTED_ITEM:
      return { ...state, homePageSelectedItem: action.homePageSelectedItem };
    default:
      break;
  }
  return state;
}
