import { Dialog, DialogContent, DialogTitle, IconButton, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Draggable from 'react-draggable';

const PaperComponent = props => {
  return (
    <Draggable handle='#draggable-dialog-title' cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
};

const DialogWrapper = ({ open, onHandleCancel, title, children, maxWidth }) => {
  return (
    <Dialog
      open={open}
      onClose={onHandleCancel}
      maxWidth={maxWidth}
      PaperComponent={PaperComponent}
      aria-labelledby='draggable-dialog-title'>
      <DialogTitle
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 1 }}
        id='draggable-dialog-title'>
        {title}
        <IconButton onClick={onHandleCancel} color='secondary'>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
};

DialogWrapper.defaultProps = {
  maxWidth: 'md',
};

export default DialogWrapper;
