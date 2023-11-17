/* eslint-disable react/prop-types */
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { colors } from '../../assets/theme/theme';

const Modal = ({ isOpen, onClose, content, title }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth={'lg'} fullWidth>
      <DialogTitle
        fontWeight="bold"
        sx={{
          fontSize: '24px',
          mb: 1,
          textTransform: 'uppercase',
          borderBottom: `1px solid ${colors.grey[400]}`,
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent>{content}</DialogContent>
    </Dialog>
  );
};

export default Modal;
