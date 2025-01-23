/* eslint-disable react/prop-types */
import { Add } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { colors } from '../../assets/theme/theme';
import Modal from '../ui/Modal';
import { useDisclosure } from '../../hooks';
import SelectWorkflowBody from './SelectWorkFlowBody';
// import { useState } from 'react';
import { useGetWorkflowDetail } from '../../api';
import WorkflowRoute from '../ui/WorkflowRoute';
import { getDepartmentsFromWorkflow } from '../../helpers';
const SelectOrderWorkFlowModal = ({
  onClose,
  children,
  disabled,
  formProps,
}) => {
  const handleCancel = () => {
    formProps.setFieldValue('workflowId', undefined);
    onClose();
  };
  return (
    <Box>
      <Typography sx={{ mt: 1 }}>
        <span style={{ color: colors.red[800] }}>**</span> Purchase Request
        process ပြီးပါက Purchase Order စတင်နိုင်ရန် Purchase Order Work Flow
        ရွေးချယ်ပါ။
      </Typography>

      {children}

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

const SelectOrderWorkflows = ({ name, formProps, type, workflowType }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  // const [value, setValue] = useState(0);

  // const handleChange = (_e, newValue) => {
  //     setValue(newValue);
  // };

  const { data } = useGetWorkflowDetail(formProps.values[name]);

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
              Select Purchase Order Work Flow to route
            </Typography>
          </>
        )}
      </Box>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Select Purchase Order Work Flow to route"
        content={
          <SelectOrderWorkFlowModal
            onClose={onClose}
            type={type}
            disabled={!formProps.values[name]}
            formProps={formProps}
          >
            {/* {type !== 'private' && (
              <SelectWorkFlowHeader onChange={handleChange} index={value} />
            )} */}
            <Box sx={{ height: '50vh', overflowY: 'auto' }}>
              <SelectWorkflowBody
                index={1}
                name={name}
                formProps={formProps}
                workflowType={workflowType}
              />
            </Box>
          </SelectOrderWorkFlowModal>
        }
      />
    </>
  );
};

export default SelectOrderWorkflows;
