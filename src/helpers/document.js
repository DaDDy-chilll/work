
export const transformLastActivity = (lastActivity) => {
  if (
    lastActivity === 'APPROVED' ||
    lastActivity === 'AUTHORIZE' 
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

export const transformLocalTime = (createdAt) => {
  if (createdAt === '') {
    return createdAt;
  }

  const date = new Date(createdAt);

  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

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

  return {
    date: `${day} ${months[month]} ${year}`,
    time: `${hour}:${minute} ${time}`,
  };
};

