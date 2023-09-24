/* eslint-disable react/prop-types */
import { Box } from '@mui/material';
import { colors } from '../../assets/theme/theme';

const WorkflowRoute = ({ departments, name }) => {
  const concatString = '>>';
  return (
    <Box sx={{ display: 'flex', gap: 1, fontSize: '14px', fontWeight: 500 }}>
      {departments.map((data, i) => (
        <>
          <span style={{ color: colors.paleBlue[800] }}>{data}</span>
          {i !== departments.length - 1 && <span>{concatString}</span>}
        </>
      ))}
      {name && <span>({name})</span>}
    </Box>
  );
};

export default WorkflowRoute;
