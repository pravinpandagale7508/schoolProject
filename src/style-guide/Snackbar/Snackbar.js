import { Alert, Snackbar, Typography } from '@mui/material';

const ErrorMessage = ({ message }) => {
  if (typeof message === 'string') {
    return <Typography variant='subtitle1'>{message}</Typography>;
  } else if (typeof message.data === 'string') {
    return <Typography variant='subtitle1'>{message.data}</Typography>;
  } else if (Array.isArray(message.data)) {
    return message.data.map((item, index) => (
      <Typography key={index} variant='subtitle1'>
        {item}
      </Typography>
    ));
  } else {
    return (
      <Typography variant='subtitle1'>
        {message.error} : {message.path}
      </Typography>
    );
  }
};

const SnackbarWrapper = ({ message, open, onClose, type, vertical, horizontal }) => {
  return (
    <Snackbar anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }} open={open} onClose={onClose} autoHideDuration={4000}>
      <Alert severity={type}>
        <ErrorMessage message={message} />
      </Alert>
    </Snackbar>
  );
};

SnackbarWrapper.defaultProps = {
  message: 'Unhandled error!!!',
  type: 'error',
  vertical: 'bottom',
  horizontal: 'right',
};

export default SnackbarWrapper;
