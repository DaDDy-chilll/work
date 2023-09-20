/* eslint-disable react/prop-types */
import { Dialog, DialogContent, DialogTitle } from '@mui/material';

const Modal = ({ isOpen, onClose, content, title }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth={'lg'}>
      <DialogTitle
        variant="h2"
        fontWeight="bold"
        sx={{ mb: '5px', textTransform: 'uppercase' }}
      >
        {title}
      </DialogTitle>
      <DialogContent>{content}</DialogContent>
    </Dialog>
  );
};

export default Modal;
