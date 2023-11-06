import { Box } from '@mui/material';

const policies = [
  'Password must be at least 8 characters',
  'Password must be at most 16 characters',
  'Password must contain at least one lowercase letter. [a-z]',
  'Password must contain at least one uppercase letter. [A-Z]',
  'Password must contain at least one number. [0-9]',
  'Password must contain at least one special character. [!@#$%^&*(),.?":{}|<>]',
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
