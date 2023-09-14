export const getDepartmentsFromWorkflow = (reviewers) => {
  let departments = [];
  reviewers.map((reviewer) => departments.push(reviewer.department.name));
  return [...new Set(departments)];
};
