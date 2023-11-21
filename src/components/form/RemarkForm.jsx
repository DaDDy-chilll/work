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
import SelectWorkflows from './SelectWorkflows';

const RemarkIcon = ({ value }) => {
  const { user } = useAuth();

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

const RemarkForm = ({ onClick }) => {
  const [remark, setRemark] = useState('');

  const { id } = useParams();

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
            onClick();
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
          onClick();
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
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              px: 5,
              py: 3,
            }}
          >
            <Box>
              <CustomFormLabel label="Form Status" required={true} />
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
              <SelectWorkflows
                name="workflowId"
                formProps={props}
                type="private"
              />
            )}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <CustomFormLabel label="Description" />
              <RichTextEditor text={remark} setText={setRemark} />
            </Box>
          </Box>
          <Box
            sx={{ borderTop: `1px solid ${colors.grey[400]}`, pb: 3, px: 5 }}
          >
            <FormActionButtons
              onClick={onClick}
              innerText="Submit"
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
