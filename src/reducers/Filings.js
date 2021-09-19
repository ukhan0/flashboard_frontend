import { filingsData } from './filingsMockData';

const getDefaultState = () => {
  return {
    filingsData: filingsData
  };
};

export default function reducer(
  state = {
    ...getDefaultState()
  },
  action
) {
  switch (action.type) {
    default:
      break;
  }
  return state;
}
