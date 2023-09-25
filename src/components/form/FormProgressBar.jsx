/* eslint-disable react/prop-types */
import { Box } from '@mui/material';
import { colors } from '../../assets/theme/theme';

const FormProgressBar = ({ isOpen }) => {
  return (
    <>
      <Box
        sx={{
          position: 'absolute',
          left: '3px',
          top: 0,
          width: '50%',
          border: `3px solid ${colors.paleBlue[800]}`,
          borderTopLeftRadius: '1rem',
          zIndex: 1,
        }}
      ></Box>
      <Box
        sx={{
          position: 'absolute',
          left: '3px',
          top: 0,
          width: '99%',
          border: `3px solid ${
            isOpen ? colors.paleBlue[800] : colors.white[400]
          }`,
          borderTopRightRadius: '1rem',
          borderTopLeftRadius: '1rem',
        }}
      ></Box>
    </>
  );
};

export default FormProgressBar;
