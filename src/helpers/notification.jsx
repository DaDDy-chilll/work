export const getNotiText = ({ from, action }) => {
  if (action === 'SUBMITTED') {
    return (
      <>
        <b>{from}</b> submitted a form!
      </>
    );
  }
  if (action === 'PREPARED') {
    return <>The requested form needs to be edited!</>;
  }
  if (action === 'VERIFIED') {
    return (
      <>
        <b>{from}</b> verified the requested form!
      </>
    );
  }
  if (action === 'APPROVED') {
    return (
      <>
        <b>{from}</b> approved the requested form!
      </>
    );
  }
  if (action === 'REJECTED') {
    return (
      <>
        <b>{from}</b> rejected the requested form!
      </>
    );
  }
  if (action === 'REQUESTED_REVISION') {
    return (
      <>
        <b>{from}</b> requested revision!
      </>
    );
  }
  if (action === 'REVISED') {
    return <>This form needs acknowledgement from you!</>;
  }
  if (action === 'COMMENTED') {
    return (
      <>
        <b>{from}</b> commented!
      </>
    );
  }
  if (action === 'ACKNOWLEDGED') {
    return (
      <>
        <b>{from}</b> acknowledged the requested form!
      </>
    );
  }
};

export const getDuration = (createdAt) => {
  const start = new Date(createdAt).getTime();
  const end = new Date().getTime();

  const difference = end - start;
  // const difference = 72000

  const oneSecond = 1000;
  const oneMinute = oneSecond * 60;
  const oneHour = oneMinute * 60;
  const oneDay = oneHour * 24;
  const oneWeek = oneDay * 7;
  const oneMonth = oneDay * 30;
  const oneYear = oneMonth * 12;

  if (difference > oneYear) {
    return Math.round(difference / oneYear) + ' year ago'; // year
  }

  if (difference > oneMonth) {
    return Math.round(difference / oneMonth) + ' month ago'; // month
  }

  if (difference > oneWeek) {
    return Math.round(difference / oneWeek) + ' week ago'; // week
  }

  if (difference > oneDay) {
    return Math.round(difference / oneDay) + ' day ago'; // day
  }

  if (difference > oneHour) {
    return Math.round(difference / oneHour) + ' hour ago'; // hour
  }

  if (difference > oneMinute) {
    return Math.round(difference / oneMinute) + ' minute ago'; // minute
  }

  if (difference > oneSecond) {
    return Math.round(difference / oneSecond) + 's ago'; // second
  }
};
