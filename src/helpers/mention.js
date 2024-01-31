export const filterMentions = ({ data, user }) => {
  let mentions;

  mentions = data.map((item) => {
    const reviewers = item.reviewers.filter(
      (person) => person._id === user._id,
    );
    return { ...item, hasMentioned: reviewers.length ? true : false };
  });

  return mentions?.filter(
    (item) => item.hasMentioned || item.actor._id === user._id,
  );
};
