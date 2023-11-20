import { DOCUMENT_STATUSES } from '../constants';

export const changeFormStatus = (reviewers) => {
  let departments = [];
  reviewers.forEach((r) => {
    let previousIndex = r.index;
    if (r.index - previousIndex !== 1) {
      departments.push(r.reviewer.department.name);
    }
  });
  // departments = [...new Set([...departments])];

  const uniqueDepartments = [...new Set([...departments])];

  const finishedDepartments = getDepartments({
    departments: uniqueDepartments,
    reviewers,
    isFinish: true,
  });

  const unFinishedDepartments = getDepartments({
    departments: uniqueDepartments,
    reviewers,
    isFinish: false,
  });

  takeDepartments({
    reviewers,
  });

  return [...finishedDepartments, ...unFinishedDepartments];
};

const takeDepartments = ({ reviewers }) => {
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

  const result = departments.map((dpt) => {
    const filteredReviewers = reviewers.filter((r) => {
      return r.reviewer.department._id === dpt.id;
    });

    let previousvalue = undefined;

    let serializedPersons = [];
    let unSerializedPersons = [];

    for (let i = 0; i < filteredReviewers.length; i++) {
      const currentValue = filteredReviewers[i];
      if (filteredReviewers.length === 1) {
        unSerializedPersons.push(currentValue);
      } else {
        if (previousvalue) {
          if (currentValue.index - previousvalue.index === 1) {
            console.log('hello');
            serializedPersons.push(previousvalue);
            if (i === filteredReviewers.length - 1) {
              serializedPersons.push(currentValue);
            }
          } else {
            unSerializedPersons.push(previousvalue);
          }
        }
      }

      previousvalue = currentValue;
    }

    // let differentDepartmentPersons = filteredReviewers.filter((object1) => {
    //   return sameDepartmentPersons.filter((object2) => {
    //     return object1.reviewer._id !== object2.reviewer._id;
    //   });
    // });

    return {
      department: dpt,
      serializedPersons,
      unSerializedPersons,
    };
  });

  console.log({ result });
};

const getDepartments = ({ departments, reviewers, isFinish }) => {
  return departments
    .map((dpt) => {
      let originalUsers;

      if (isFinish) {
        originalUsers = reviewers.filter((r) => {
          return (
            r.reviewer.department.name === dpt &&
            [...Object.values(DOCUMENT_STATUSES)].includes(r.status)
          );
        });
      } else {
        originalUsers = reviewers.filter(
          (r) =>
            r.reviewer.department.name === dpt &&
            ![...Object.values(DOCUMENT_STATUSES)].includes(r.status),
        );
      }

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
    })
    .filter((d) => d.users.length !== 0);
};