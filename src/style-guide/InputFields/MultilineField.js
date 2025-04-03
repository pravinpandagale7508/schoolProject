import { memo } from 'react';

import { Grid, TextField } from '@mui/material';

const MultilineFieldWrapper = ({ label, value, onChange, required, xs, sm, md, lg  }) => {
  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg}>
      <TextField
        fullWidth
        multiline
        rows={2}
        label={label}
        value={value || ''}
        onChange={onChange}
        required={required}
      />
    </Grid>
  );
};

MultilineFieldWrapper.defaultProps = {
  label: '',
  value: '',
  required: null,
  xs: 12,
  sm: 6,
  md: 4,
  lg: 2,
};

export default memo(MultilineFieldWrapper);
