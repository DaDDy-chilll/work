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

const SelectWorkFlowModal = ({ onClose, children }) => {
  return (
    <Box>
      {children}
      <Typography sx={{ mt: 1 }}>
        <span style={{ color: colors.red[800] }}>**</span> All Workflows တွင်
        ရွေးချယ်ပြီး ထည့်သွင်းနိုင်ပါသည်။
      </Typography>
      <Box display="flex" justifyContent="end" gap={2} mt={2}>
        <Button
          sx={{ width: '200px' }}
          variant="outlined"
          ccolor="primary"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          sx={{ width: '200px' }}
          variant="contained"
          ccolor="primary"
          onClick={onClose}
        >
          Ok
        </Button>
      </Box>
    </Box>
  );
};

const SelectWorkflows = ({ name, formProps }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [value, setValue] = useState(0);

  const handleChange = (_e, newValue) => {
    setValue(newValue);
  };

  const { data } = useGetWorkflowDetail(formProps.values[name]);

  return (
    <>
      <Box
        sx={{
          border: `1px dashed ${colors.paleBlue[800]}`,
          display: 'flex',
          justifyContent: 'center',
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
          <SelectWorkFlowModal onClose={onClose}>
            <SelectWorkFlowHeader onChange={handleChange} index={value} />
            <Box sx={{ height: '60vh', overflowY: 'auto' }}>
              <SelectWorkflowBody
                index={value}
                name={name}
                formProps={formProps}
              />
            </Box>
          </SelectWorkFlowModal>
        }
      />
    </>
  );
};

export default SelectWorkflows;
