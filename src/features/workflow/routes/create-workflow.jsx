import { initialValues, WorkflowForm } from '..';

export const CreateWorkflow = () => {
  return (
    <div className="flex flex-col gap-2 my-2 mx-auto w-[80%]">
      <h2 className="font-semibold text-black text-2xl">
        Create New Work Flow
      </h2>
      <div className="bg-white rounded-lg py-7 px-10">
        <WorkflowForm initialValues={initialValues} />
      </div>
    </div>
  );
};
