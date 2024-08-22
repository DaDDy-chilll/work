import { useParams } from 'react-router-dom';
import { useGetWorkflow, WorkflowForm } from '..';

export const EditWorkflow = () => {
  const { id } = useParams();

  const { data } = useGetWorkflow(id);

  const reviewers = data?.payload?.reviewers;

  let departments = [];
  let users = [];

  if (reviewers) {
    reviewers.forEach((item) => {
      users.push(item.reviewer);
      departments.push(item.reviewer.department);
    });

    departments = departments.map((item, index) => ({ ...item, order: index }));
  }

  return (
    <div className="flex flex-col gap-2 my-2 mx-auto w-[80%]">
      <h2 className="font-semibold text-black text-2xl">Edit Work Flow</h2>
      <div className="bg-white rounded-lg py-7 px-10">
        {data?.payload && (
          <WorkflowForm
            initialValues={data?.payload}
            id={id}
            departments={departments}
            users={users}
          />
        )}
      </div>
    </div>
  );
};
