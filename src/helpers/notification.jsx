import { colors } from '../assets/theme/theme';

export const changeTextColor = ({ action }) => {
  let textColor;

  if (action === 'SUBMITTED') textColor = colors.darkYellow[800];
  if (action === 'PENDING') textColor = colors.darkYellow[800];

  if (action === 'APPROVED') textColor = colors.paleGreen[800];
  if (action === 'VERIFIED') textColor = colors.darkGreen[800];
  if (action === 'REJECTED') textColor = colors.red[800];

  if (action === 'PREPARED') textColor = colors.orange[800];
  if (action === 'COMMENTED') textColor = colors.paleBlue[800];

  if (action === 'REQUESTED_REVISION') textColor = colors.purple[800];
  if (action === 'REVISED') textColor = colors.darkBlue[800];
  if (action === 'ACKNOWLEDGED') textColor = colors.purple[800];

  return textColor;
};

export const changeBgColor = ({ action }) => {
  let bgColor;

  if (action === 'SUBMITTED') bgColor = colors.darkYellow[200];
  if (action === 'PENDING') bgColor = colors.darkYellow[200];

  if (action === 'APPROVED') bgColor = colors.paleGreen[200];
  if (action === 'VERIFIED') bgColor = colors.darkGreen[200];
  if (action === 'REJECTED') bgColor = colors.red[200];

  if (action === 'PREPARED') bgColor = colors.orange[200];
  if (action === 'COMMENTED') bgColor = colors.paleBlue[200];

  if (action === 'REQUESTED_REVISION') bgColor = colors.purple[200];
  if (action === 'REVISED') bgColor = colors.darkBlue[200];
  if (action === 'ACKNOWLEDGED') bgColor = colors.purple[200];

  return bgColor;
};

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
