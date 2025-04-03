import { memo } from 'react';

import { Grid, TextField } from '@mui/material';
import { MobileDateTimePicker } from '@mui/lab';

const DateTimePicker = ({ value, label, onChange, required, xs, sm, md, disabled }) => {
  return (
    <Grid item xs={xs} sm={sm} md={md}>
      <MobileDateTimePicker
        disabled={disabled}
        value={value}
        onChange={onChange}
        renderInput={params => <TextField size='small' fullWidth {...params} label={label} required={required} />}
      />
    </Grid>
  );
};

DateTimePicker.defaultProps = {
  label: '',
  value: null,
  required: null,
  xs: 12,
  sm: 6,
  md: 4,
};

export default memo(DateTimePicker);
