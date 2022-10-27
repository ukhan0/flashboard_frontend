export const SET_USER = 'USER/SET_USER';
export const SET_IS_NEW_EMAIL_NOTIFICATION = 'USER/SET_IS_NEW_EMAIL_NOTIFICATION';
export const SET_SELECTED_VIDEO = 'USER/SET_SELECTED_VIDEO';

export const setUser = user => ({
  type: SET_USER,
  user
});
export const setIsNewEmailNotification = isNewEmailNotification => ({
  type: SET_IS_NEW_EMAIL_NOTIFICATION,
  isNewEmailNotification
});
export const setSelectedVideo = selectedVideo => ({
  type: SET_SELECTED_VIDEO,
  selectedVideo
});

const getDefaultState = () => {
  const userStr = localStorage.getItem(`user`);
  return {
    user: userStr ? JSON.parse(userStr) : null,
    isNewEmailNotification: true,
    selectedVideo: null,
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
    case SET_IS_NEW_EMAIL_NOTIFICATION:
      return { ...state, isNewEmailNotification: action.isNewEmailNotification };
    case SET_SELECTED_VIDEO:
      return { ...state, selectedVideo: action.selectedVideo };
    default:
      break;
  }
  return state;
}
