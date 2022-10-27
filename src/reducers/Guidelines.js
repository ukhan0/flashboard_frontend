export const SET_SELECTED_VIDEO = 'GUIDELINE/SET_SELECTED_VIDEO';

export const setSelectedVideo = selectedVideo => ({
    type: SET_SELECTED_VIDEO,
    selectedVideo
});

const getDefaultState = () => {
    return {
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
        case SET_SELECTED_VIDEO:
            return { ...state, selectedVideo: action.selectedVideo };
        default:
            break;
    }
    return state;
}
