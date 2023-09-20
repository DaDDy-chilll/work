/* eslint-disable react/prop-types */
import { Box, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useCreateDepartment } from '../../api';
import FormActionButtons from '../ui/FormActionButtons';
import { toast } from 'react-toastify';
import { useQueryClient } from 'react-query';

const DepartmentForm = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { isLoading: createLoading, mutate: createMutation } =
    useCreateDepartment();
  const queryClient = useQueryClient();

  const handleOnSubmit = handleSubmit(async ({ name, isAuthorized }) => {
    createMutation(
      {
        name,
        type: isAuthorized ? 'authorized' : '',
      },
      {
        onSuccess: () => {
          toast.success('ok');
          queryClient.invalidateQueries(['departments']);
        },
        onSettled: () => {
          reset();
          onClose();
        },
      },
    );
  });

  return (
    <form onSubmit={handleOnSubmit}>
      <Box display="flex" flexDirection={'column'} gap={3}>
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          {...register('name')}
          error={!!errors.name}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Authorized"
          {...register('isAuthorized')}
        />
      </Box>

      <FormActionButtons
        innerText="Create"
        loading={createLoading}
        justifyContent="center"
        width="400px"
      />
    </form>
  );
};

export default DepartmentForm;
