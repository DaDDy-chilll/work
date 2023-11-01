import { Box } from '@mui/material';

const policies = [
  'Password must be 8 characters long.',
  'Password must contain at least one lowercase letter.',
  'Password must contain at least one uppercase letter.',
  'Password must contain at least one number.',
  'Password must contain at least one special character.',
];

const PasswordPolicy = () => {
  return (
    <Box sx={{ ml: 3 }}>
      <ul style={{ listStyle: 'disc' }}>
        {policies.map((policy) => (
          <li key={policy}>{policy}</li>
        ))}
      </ul>
    </Box>
  );
};

export default PasswordPolicy;
