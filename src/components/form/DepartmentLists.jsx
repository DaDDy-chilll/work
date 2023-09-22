/* eslint-disable react/prop-types */
import { Box } from '@mui/material';
import DepartmentCard from './DepartmentCard';

const DepartmentLists = ({ departments, children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <label>Department Lists</label>
      <Box
        sx={{
          display: 'flex',
          gap: 3,
          flexWrap: 'wrap',
        }}
      >
        {departments &&
          departments.map((department, i) => (
            <DepartmentCard key={i} department={department} index={i} />
          ))}
      </Box>
      {children}
    </Box>
  );
};

export default DepartmentLists;
