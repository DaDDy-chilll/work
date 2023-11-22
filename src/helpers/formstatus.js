export const changeDepartmentStatus = (reviewers) => {
  console.log({ reviewers });

  const departments = groupDepartments(reviewers);

  return departments
    .map((dpt) => {
      const filteredReviewers = reviewers.filter((r) => {
        return r.reviewer.department._id === dpt.id;
      });

      const { serializedPersons, unSerializedPersons } =
        groupReviewers(filteredReviewers);

      const result = [];

      if (serializedPersons.length) {
        result.push({
          department: dpt,
          index: serializedPersons[0].index,
          users: serializedPersons,
        });
      }

      if (unSerializedPersons.length) {
        result.push({
          department: dpt,
          index: unSerializedPersons[0]?.index,
          users: unSerializedPersons,
        });
      }

      return result;
    })
    .flat()
    .sort((a, b) => a.index - b.index);
};

const groupDepartments = (reviewers) => {
  let departments = [];

  reviewers.forEach((r) => {
    let previousIndex = r.index;
    if (r.index - previousIndex !== 1) {
      departments.push({
        id: r.reviewer.department._id,
        name: r.reviewer.department.name,
      });
    }
  });

  departments = Array.from(
    new Set(departments.map((obj) => JSON.stringify(obj))),
  ).map((str) => JSON.parse(str));

  return departments;
};

const groupReviewers = (reviewers) => {
  let previousvalue = undefined;

  let serializedPersons = [];
  let unSerializedPersons = [];

  for (let i = 0; i < reviewers.length; i++) {
    const currentValue = reviewers[i];
    if (reviewers.length === 1) {
      unSerializedPersons.push(currentValue);
    } else {
      if (previousvalue) {
        if (currentValue.index - previousvalue.index === 1) {
          serializedPersons.push(previousvalue);
          if (i === reviewers.length - 1) {
            serializedPersons.push(currentValue);
          }
        } else {
          unSerializedPersons.push(previousvalue);
        }
      }
    }
    previousvalue = currentValue;
  }

  unSerializedPersons = unSerializedPersons.filter((p) => p.length !== 0);
  serializedPersons = serializedPersons.filter((p) => p.length !== 0);

  return {
    serializedPersons,
    unSerializedPersons,
  };
};

// ----------------------------------------------------
export const changeUserStatus = (users) => {
  return users.map((user, i) => {
    let status;
    if (users.length - 1 === i) {
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
};
