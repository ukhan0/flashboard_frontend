export const lastTweets = () => {
  let tweets = [];
  const lastTweets = localStorage.getItem('lastTweets');
  if (lastTweets) {
    tweets = JSON.parse(lastTweets).length > 0 ? JSON.parse(lastTweets) : [];
  }

  return tweets;
};

export const storeUpCommingCallsType = type => {
  localStorage.setItem('upcommingcallstype', type);
};
export const getUpCommingCallsType = () => {
  let type = localStorage.getItem('upcommingcallstype');

  if (!type) {
    type = 'all';
  }
  return type;
};
