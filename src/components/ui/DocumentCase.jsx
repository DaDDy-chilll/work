/* eslint-disable react/prop-types */
import { Box, Typography } from '@mui/material';
import { colors } from '../../assets/theme/theme';

const DocumentCase = ({ documentCase }) => {
  return (
    <Box
      sx={{
        backgroundColor: documentCase ? colors.red[200] : colors.paleGreen[200],
        p: 1,
        borderRadius: '50px',
      }}
    >
      <Typography
        sx={{
          fontSize: '14px',
          fontWeight: 500,
          textAlign: 'center',
        }}
        color={documentCase ? colors.red[800] : colors.paleGreen[800]}
      >
        {documentCase ? 'Close' : 'Open'}
      </Typography>
    </Box>
  );
};

export default DocumentCase;
