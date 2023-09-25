import moment from 'moment';

export const transformLastActivity = (lastActivity) => {
  if (
    lastActivity === 'PREPARED' ||
    lastActivity === 'VERIFIED' ||
    lastActivity === 'APPROVED'
  ) {
    return 'APPROVED';
  }
  return lastActivity;
};

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const transformDate = (createdAt) => {
  if (createdAt === '') {
    return createdAt;
  }

  const year = moment(createdAt).utc().get('years');
  const month = moment(createdAt).utc().get('months');
  const day = moment(createdAt).utc().get('dates');
  return `${day} ${months[month]} ${year}`;
};

export const transformTime = (createdAt) => {
  if (createdAt === '') {
    return createdAt;
  }

  let hour = moment(createdAt).utc().get('hours');
  let minute = moment(createdAt).utc().get('minutes');

  let time = 'AM';

  if (hour > 12) {
    hour = hour - 12;
    time = 'PM';
  }

  if (hour < 10) {
    hour = `0${hour}`;
  }

  if (minute < 10) {
    minute = `0${minute}`;
  }

  return `${hour}:${minute} ${time}`;
};
