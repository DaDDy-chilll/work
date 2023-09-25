/* eslint-disable react/prop-types */
import { Box } from '@mui/material';
import DepartmentCard from './DepartmentCard';
import CustomFormLabel from '../shared/CustomFormLabel';

const DepartmentLists = ({ departments, children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <CustomFormLabel label="Department Lists" />
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexWrap: 'wrap',
            ml: 2,
            mt: 1,
          }}
        >
          {departments &&
            departments.map((department, i) => (
              <DepartmentCard key={i} department={department} index={i} />
            ))}
        </Box>
      </Box>
      {children}
    </Box>
  );
};

export default DepartmentLists;
