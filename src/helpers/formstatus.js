export const changeFormStatus = (reviewers) => {
  let departments = [];
  reviewers.forEach((r) => {
    departments.push(r.reviewer.department.name);
  });

  departments = [...new Set([...departments])];

  return departments.map((dpt) => {
    const originalUsers = reviewers.filter(
      (r) => r.reviewer.department.name === dpt,
    );
    const users = originalUsers.map((user, i) => {
      let status;
      if (originalUsers.length - 1 === i) {
        if (
          user.status === 'PREPARED' ||
          user.status === 'VERIFIED' ||
          user.status === 'APPROVED'
        ) {
          status = 'APPROVED';
        }
      }

      return {
        ...user,
        status: status ? status : user.status,
      };
    });
    return {
      name: dpt,
      users,
    };
  });
};
