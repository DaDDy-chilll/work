import { useAuth } from './useAuth';
import { useGetAllWorkflows, useSaveWorkflow } from '../api';
import { getDepartmentsFromWorkflow } from '../helpers';
import { toast } from 'react-toastify';

function transformWorkflow(data) {
  return data.map((workflow) => ({
    ...workflow,
    departments: getDepartmentsFromWorkflow(workflow.reviewers),
  }));
}

export const useSelectWorkflow = ({ index, type }) => {
  const { user, validateUser } = useAuth();

  const { mutate: saveWorkflowMutation } = useSaveWorkflow();

  let options = {
    sort: '-createdAt',
    limit: 0,
  };

  if (type) {
    Object.assign(options, { type });
  }

  const { isError, error, data } = useGetAllWorkflows(options);

  let workflows;
  let favouriteWorkflowIds = [];

  if (index === 0) {
    if (!user.favouriteWorkflows) {
      workflows = [];
    } else {
      workflows = transformWorkflow(user.favouriteWorkflows);
    }
  } else {
    if (data?.payload) {
      workflows = transformWorkflow(data?.payload);

      const favouriteWorkflows = transformWorkflow(user.favouriteWorkflows);

      if (favouriteWorkflows) {
        const filteredWorkflows = favouriteWorkflows.filter((object1) => {
          return workflows.filter((object2) => {
            return object1._id === object2._id;
          });
        });

        for (let i = 0; i < filteredWorkflows.length; i++) {
          favouriteWorkflowIds.push(filteredWorkflows[i]._id);
        }
      }
    }
  }

  const saveWorkflow = (id) => {
    saveWorkflowMutation(id, {
      onSuccess: () => {
        toast.success('Success');
        validateUser();
        favouriteWorkflowIds = favouriteWorkflowIds.filter(
          (item) => item !== id,
        );
      },
    });
  };
  return { workflows, favouriteWorkflowIds, saveWorkflow, isError, error };
};
