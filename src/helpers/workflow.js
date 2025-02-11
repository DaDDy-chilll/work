export const getDepartmentsFromWorkflow = (reviewers) => {
  if (!reviewers) return [];
  let departments = [];
  reviewers.map((reviewer) => departments.push(reviewer.department.name));
  return [...new Set(departments)];
};
