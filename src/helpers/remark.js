// CHANGE LAST ACTIVITY IN EACH DEPARTMENT (VERIFIED, PREPARED => APPROVED)

export const transformRemarks = (remarks) => {
  let departments = [];
  if (remarks) {
    remarks.forEach((remark) => {
      departments.push(remark.department);
    });
  }

  departments = [...new Set([...departments])];

  const departmentActionsArray = departments.map((dpt) => {
    const originalUsers = remarks.filter((remark) => remark.department === dpt);

    const users = originalUsers.map((user, i) => {
      let action;
      if (originalUsers.length - 1 === i) {
        if (
          user.action === 'PREPARED' ||
          user.action === 'VERIFIED' ||
          user.action === 'APPROVED'
        ) {
          action = 'APPROVED';
        }
      }

      return {
        ...user,
        action: action ? action : user.action,
      };
    });

    return users;
  });

  let transformedRemarks;

  if (departmentActionsArray.length !== 0) {
    transformedRemarks = departmentActionsArray.reduce((arr, val) => {
      return arr.concat(val);
    });
  }

  return transformedRemarks;
};
