/* eslint-disable react/prop-types */
import { Box } from '@mui/material';
import { colors } from '../../assets/theme/theme';

const WorkflowRoute = ({ departments }) => {
  const concatString = '>>';
  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      {departments.map((data, i) => (
        <>
          <span style={{ color: colors.paleBlue[800] }}>{data}</span>
          {i !== departments.length - 1 && <span>{concatString}</span>}
        </>
      ))}
    </Box>
  );
};

export default WorkflowRoute;
