import { Dialog, DialogContent, DialogTitle, IconButton, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const PaperComponent = props => {
  return (
    <>
      <Paper {...props} />
    </>
  );
};

const DialogWithGoBackWrapper = ({ open, onHandleCancel, title, children, maxWidth }) => {
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
        <IconButton onClick={onHandleCancel} color='secondary'>
          <ArrowBackIcon />
        </IconButton>
        {title}
        <IconButton onClick={onHandleCancel} color='secondary'>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
};

DialogWithGoBackWrapper.defaultProps = {
  maxWidth: 'md',
};

export default DialogWithGoBackWrapper;
