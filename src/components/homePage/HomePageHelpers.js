export const lastTweets = () => {
  let tweets = [];
  const lastTweets = localStorage.getItem('lastTweets');
  if (lastTweets) {
    tweets = JSON.parse(lastTweets).length > 0 ? JSON.parse(lastTweets) : [];
  }

  return tweets;
};
