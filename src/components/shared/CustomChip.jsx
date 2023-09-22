/* eslint-disable react/prop-types */
import { Chip } from '@mui/material';

const CustomChip = ({ icon, onClick }) => {
  return (
    <>
      {icon ? (
        <Chip
          label="Deletable"
          color="primary"
          variant="outlined"
          onDelete={onClick}
          deleteIcon={icon}
        />
      ) : (
        <Chip label="Clickable" onClick={onClick} />
      )}
    </>
  );
};

export default CustomChip;
