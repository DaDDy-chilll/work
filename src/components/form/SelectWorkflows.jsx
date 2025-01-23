/* eslint-disable react/prop-types */
import { Add } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { colors } from '../../assets/theme/theme';
import Modal from '../ui/Modal';
import { useDisclosure } from '../../hooks';
import SelectWorkFlowHeader from './SelectWorkFlowHeader';
import SelectWorkflowBody from './SelectWorkFlowBody';
import { useState } from 'react';
import { useGetWorkflowDetail } from '../../api';
import WorkflowRoute from '../ui/WorkflowRoute';
import { getDepartmentsFromWorkflow } from '../../helpers';

const SelectWorkFlowModal = ({
  onClose,
  children,
  index,
  type,
  disabled,
  formProps,
}) => {
  const handleCancel = () => {
    formProps.setFieldValue('workflowId', undefined);
    onClose();
  };
  return (
    <Box>
      {type !== 'private' && index === 0 ? (
        <Typography sx={{ mt: 1 }}>
          <span style={{ color: colors.red[800] }}>**</span> ပေးပို့လိုသော Work
          Flow မရှိပါက All Work Flows တွင် ရွေးချယ်ပြီး ထည့်သွင်းနိုင်ပါသည်။
        </Typography>
      ) : (
        type !== 'private' && (
          <Typography sx={{ mt: 1 }}>
            <span style={{ color: colors.red[800] }}>**</span> နောက်တစ်ကြိမ်
            ထပ်မံ အသုံးပြုလိုသော Work Flow များကိုသိမ်းထားပြီး My Work Flows
            ထဲတွင် ပြန်လည်ကြည့်နိုင်ပါသည်။
          </Typography>
        )
      )}
      {children}
      {type !== 'private' && index === 1 && (
        <Typography sx={{ mt: 1 }}>
          <span style={{ color: colors.red[800] }}>**</span> All Workflows တွင်
          ရွေးချယ်ပြီး ထည့်သွင်းနိုင်ပါသည်။
        </Typography>
      )}
      <Box display="flex" justifyContent="end" gap={2} mt={2}>
        <Button
          sx={{ width: '200px' }}
          variant="outlined"
          ccolor="primary"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          sx={{ width: '200px' }}
          variant="contained"
          ccolor="primary"
          onClick={onClose}
          disabled={disabled}
        >
          Ok
        </Button>
      </Box>
    </Box>
  );
};

const SelectWorkflows = ({ workflowType, name, formProps, type }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  console.log(formProps.values[name]);

  const [value, setValue] = useState(0);

  const handleChange = (_e, newValue) => {
    setValue(newValue);
  };

  const { data } = useGetWorkflowDetail(formProps.values[name]);
  console.log('data', data);

  return (
    <>
      <Box
        sx={{
          border: `1px dashed ${colors.paleBlue[800]}`,
          display: 'flex',
          justifyContent: `${formProps.values[name] ? 'left' : 'center'}`,
          alignItems: 'center',
          p: 1,
          cursor: 'pointer',
          borderRadius: 1,
          height: '55px',
        }}
        onClick={onOpen}
      >
        {formProps.values[name] ? (
          data?.payload?.reviewers && (
            <WorkflowRoute
              name={data?.payload?.name}
              departments={getDepartmentsFromWorkflow(data?.payload?.reviewers)}
            />
          )
        ) : (
          <>
            <Add sx={{ fontSize: '30px', color: colors.paleBlue[800] }} />
            <Typography fontSize={'20px'} color={colors.paleBlue[800]}>
              Select Work Flow
            </Typography>
          </>
        )}
      </Box>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Select Work flow"
        content={
          <SelectWorkFlowModal
            onClose={onClose}
            index={type === 'private' ? 1 : value}
            type={type}
            disabled={!formProps.values[name]}
            formProps={formProps}
          >
            {type !== 'private' && (
              <SelectWorkFlowHeader onChange={handleChange} index={value} />
            )}
            <Box sx={{ height: '55vh', overflowY: 'auto' }}>
              <SelectWorkflowBody
                index={type === 'private' ? 1 : value}
                name={name}
                formProps={formProps}
                type={type}
                workflowType={workflowType}
              />
            </Box>
          </SelectWorkFlowModal>
        }
      />
    </>
  );
};

export default SelectWorkflows;
