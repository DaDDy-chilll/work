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
  const date = new Date(createdAt);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return `${day} ${months[month]} ${year}`;
};

export const transformTime = (createdAt) => {
  if (createdAt === '') {
    return createdAt;
  }
  const date = new Date(createdAt);
  let hour = date.getHours();
  let minute = date.getMinutes();

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
