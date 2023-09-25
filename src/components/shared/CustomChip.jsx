/* eslint-disable react/prop-types */
import { Chip } from '@mui/material';

const CustomChip = ({ icon, onClick, department }) => {
  return (
    <>
      {icon ? (
        <Chip
          label={department.name}
          color="primary"
          variant="outlined"
          onDelete={() => onClick(department)}
          deleteIcon={icon}
        />
      ) : (
        <Chip label="Clear All" color="primary" onClick={onClick} />
      )}
    </>
  );
};

export default CustomChip;
