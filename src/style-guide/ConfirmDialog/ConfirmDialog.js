import { Button, Dialog, DialogActions, DialogTitle, Paper } from '@mui/material';
import Draggable from 'react-draggable';

const PaperComponent = props => {
  return (
    <Draggable handle='#draggable-dialog-title' cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
};

const ConfirmDialog = ({ open, onHandleYes, onHandleClose, message }) => {
  return (
    <Dialog
      open={open}
      onClose={onHandleClose}
      PaperComponent={PaperComponent}
      aria-labelledby='draggable-dialog-title'>
      <DialogTitle id='draggable-dialog-title'>{message}</DialogTitle>
      <DialogActions>
        <Button variant='outlined' onClick={onHandleYes}>
          Yes
        </Button>
        <Button variant='outlined' autoFocus onClick={onHandleClose} color='error'>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
