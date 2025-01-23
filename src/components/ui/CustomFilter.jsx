/* eslint-disable react/prop-types */
import { Box } from '@mui/material';
import { colors } from '../../assets/theme/theme';

const CustomFilter = ({ items, optionValue, handleOptionChange }) => {
  return (
    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
      {items.map((item) => (
        <Box
          key={item.value}
          sx={{
            bgcolor: `${
              optionValue.value === item.value
                ? colors.paleBlue[800]
                : colors.bgColor
            }`,
            color: `${
              optionValue.value === item.value
                ? colors.white[100]
                : colors.black[300]
            }`,
            border: `1px solid ${colors.paleBlue[800]}`,
            width: '140px',
            height: '40px',
            borderRadius: 5,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
          onClick={() => {
            handleOptionChange(item);
          }}
        >
          {item.text}
        </Box>
      ))}
    </Box>
  );
};

export default CustomFilter;
