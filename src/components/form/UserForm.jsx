import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';
// import { useQueryClient } from 'react-query';
// import { toast } from 'react-toastify';
import { useCreateUser, useFetchAllDepartments } from '../../api';
import PasswordToggle from './PasswordToggle';
import { useState } from 'react';
import FormActionButtons from '../ui/FormActionButtons';

const UserForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [canEditAmount, setCanEditAmount] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
    getValues,
  } = useForm();

  const { data: departments } = useFetchAllDepartments({
    limit: 0,
  });
  const { isLoading: createLoading } = useCreateUser();
  // const queryClient = useQueryClient();

  const handleOnSubmit = handleSubmit(async (data) => {
    console.log({ data });
    // createMutation(data, {
    //     onSuccess: () => {
    //         toast.success('ok');
    //         queryClient.invalidateQueries(['users']);
    //     },
    //     onSettled: () => {
    //         reset();
    //         onClose();
    //     },
    // });
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
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          {...register('email')}
          error={!!errors.email}
        />
        <TextField
          type={showPassword ? 'text' : 'password'}
          fullWidth
          label="Password"
          variant="outlined"
          {...register('password')}
          error={!!errors.password}
          InputProps={{
            endAdornment: (
              <PasswordToggle
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            ),
          }}
        />
        <TextField
          type={showPassword ? 'text' : 'password'}
          fullWidth
          label="Confirm Password"
          variant="outlined"
          {...register('confirmPassword')}
          error={!!errors.confirmPassword}
          InputProps={{
            endAdornment: (
              <PasswordToggle
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            ),
          }}
        />
        <TextField
          fullWidth
          label="Job Label"
          variant="outlined"
          {...register('jobLabel')}
          error={!!errors.jobLabel}
        />
        <FormControl variant="filled">
          <InputLabel id="department">Select Department</InputLabel>
          <Select
            labelId="department"
            id="department"
            {...register('department')}
            name="department"
            error={!!errors.department}
          >
            {departments &&
              departments?.payload.map((department, i) => (
                <MenuItem value={department?._id} key={i}>
                  {department?.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormGroup>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <FormControlLabel
              control={<Checkbox />}
              label="Create"
              checked={true}
              disabled={true}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Acknowledge"
              checked={true}
              disabled={true}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Comment"
              checked={true}
              disabled={true}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Reject"
              checked={true}
              disabled={true}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Reverse"
              checked={true}
              disabled={true}
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 5 }}>
            <FormControlLabel
              control={<Checkbox />}
              label="Revise"
              {...register('canEdit')}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Verify"
              {...register('canVerify')}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Approve"
              {...register('canApprove')}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Edit"
              checked={canEditAmount ? true : getValues('canPrepare')}
              value={canEditAmount ? true : getValues('canPrepare')}
              {...register('canPrepare')}
              onChange={(e) => console.log(e.target.checked)}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Edit Amount"
              {...register('canEditAmount')}
              onClick={(e) => setCanEditAmount(e.target.checked)}
            />
          </Box>
        </FormGroup>
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

export default UserForm;
