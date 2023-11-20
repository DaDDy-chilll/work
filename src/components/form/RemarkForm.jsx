/* eslint-disable react/prop-types */
import { Box, MenuItem } from '@mui/material';
import { Formik } from 'formik';
import RichTextEditor from '../ui/RichTextEditor';
import FormActionButtons from '../ui/FormActionButtons';
import { useState } from 'react';
import { remarkSchema, remarkValues } from '../../schema/document.schema';
import FormSelect from '../shared/FormSelect';
import { ACTIONS } from '../../constants/document';
import { useChangeStatus, useRejectDocument } from '../../api/document';
import { toast } from 'react-toastify';
import { useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import {
  AssistantDirection,
  Cancel,
  CheckCircle,
  Textsms,
} from '@mui/icons-material';
import { colors } from '../../assets/theme/theme';
import { useAuth } from '../../hooks/useAuth';
import CustomFormLabel from '../shared/CustomFormLabel';
import { useGetAllWorkflows } from '../../api';
import { getDepartmentsFromWorkflow } from '../../helpers';
import WorkflowRoute from '../ui/WorkflowRoute';

const RemarkIcon = ({ value }) => {
  const { user } = useAuth();

  // console.log(user.permissions);

  if (value === ACTIONS.APPROVE && user?.permissions?.canApprove)
    return <CheckCircle sx={{ color: colors.darkGreen[800] }} />;

  if (value === ACTIONS.REJECT)
    return <Cancel sx={{ color: colors.red[800] }} />;

  if (value === ACTIONS.VERIFY && user?.permissions?.canVerify)
    return <CheckCircle sx={{ color: colors.darkGreen[800] }} />;

  if (value === ACTIONS.FORWARD && user?.permissions?.canForward)
    return <AssistantDirection sx={{ color: colors.pink[800] }} />;

  if (value === ACTIONS.COMMENT)
    return <Textsms sx={{ color: colors.paleBlue[800] }} />;
};

const RemarkForm = ({ onClose }) => {
  const [remark, setRemark] = useState('');

  const { id } = useParams();

  const { data } = useGetAllWorkflows({ limit: 0, type: 'private' });

  let workflows;

  if (data?.payload) {
    workflows = data?.payload?.map((workflow) => ({
      ...workflow,
      departments: getDepartmentsFromWorkflow(workflow.reviewers),
    }));
  }

  // console.log({ workflows });

  const { mutate: changeStatusMutation, isLoading: changeStatusLoading } =
    useChangeStatus();

  const { mutate: rejectMutation, isLoading: rejectLoading } =
    useRejectDocument();

  const queryClient = useQueryClient();

  const handleChangeStatus = ({ action, workflowId }) => {
    if (action === ACTIONS.REJECT) {
      rejectMutation(
        { data: { remark }, id },
        {
          onSuccess: () => {
            toast.success('ok');
            queryClient.invalidateQueries(['document', id]);
            onClose();
          },
        },
      );
      return;
    }

    changeStatusMutation(
      { data: { action, remark, workflowId }, id },
      {
        onSuccess: () => {
          toast.success('ok');
          queryClient.invalidateQueries(['document', id]);
          onClose();
        },
      },
    );
  };

  const { user } = useAuth();

  let actions = [ACTIONS.COMMENT, ACTIONS.REJECT];
  if (user.permissions.canApprove) {
    actions.push(ACTIONS.APPROVE);
  }

  if (user.permissions.canVerify) {
    actions.push(ACTIONS.VERIFY);
  }

  if (user.permissions.canForward) {
    actions.push(ACTIONS.FORWARD);
  }

  const formActions = Object.values(actions).map((action) => ({
    _id: action,
    value: action,
  }));

  return (
    <Formik
      initialValues={remarkValues}
      validationSchema={remarkSchema}
      onSubmit={handleChangeStatus}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
              <label>
                Form Status <span style={{ color: colors.red[800] }}>*</span>
              </label>
              <FormSelect
                placeholder="Select Form Status"
                name="action"
                formProps={props}
              >
                {formActions.map((item) => (
                  <MenuItem value={item._id} key={item._id}>
                    <Box textTransform={'capitalize'}>
                      <RemarkIcon value={item.value} /> {item.value}
                    </Box>
                  </MenuItem>
                ))}
              </FormSelect>
            </Box>

            {props.values.action === ACTIONS.FORWARD && (
              <Box>
                <CustomFormLabel label="Select Work Flow" />
                <FormSelect
                  placeholder="Select Work Flow"
                  name="workflowId"
                  formProps={props}
                >
                  {workflows &&
                    workflows?.map((item) => (
                      <MenuItem value={item._id} key={item._id}>
                        <WorkflowRoute
                          name={item?.name}
                          departments={item?.departments}
                        />
                      </MenuItem>
                    ))}
                </FormSelect>
              </Box>
            )}

            <RichTextEditor text={remark} setText={setRemark} />

            <FormActionButtons
              onClick={onClose}
              innerText="Save"
              loading={
                props.values.action === ACTIONS.REJECT
                  ? rejectLoading
                  : changeStatusLoading
              }
              justifyContent="right"
              width="200px"
            />
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default RemarkForm;
