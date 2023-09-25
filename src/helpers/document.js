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
