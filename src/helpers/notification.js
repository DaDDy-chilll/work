export const getDuration = (createdAt) => {
  const start = new Date(createdAt).getTime();
  const end = new Date().getTime();

  const difference = end - start;

  const oneSecond = 1000;
  const oneMinute = oneSecond * 60;
  const oneHour = oneMinute * 60;
  const oneDay = oneHour * 24;
  const oneWeek = oneDay * 7;
  const oneMonth = oneDay * 30;
  const oneYear = oneMonth * 12;

  if (difference > oneYear) {
    return Math.round(difference / oneYear) + ' year ago';
  }

  if (difference > oneMonth) {
    return Math.round(difference / oneMonth) + ' month ago';
  }

  if (difference > oneWeek) {
    return Math.round(difference / oneWeek) + ' week ago';
  }

  if (difference > oneDay) {
    return Math.round(difference / oneDay) + ' day ago';
  }

  if (difference > oneHour) {
    return Math.round(difference / oneHour) + ' hour ago';
  }

  if (difference > oneMinute) {
    return Math.round(difference / oneMinute) + ' minute ago';
  }

  if (difference > oneSecond) {
    return 'Just now';
  }
};
