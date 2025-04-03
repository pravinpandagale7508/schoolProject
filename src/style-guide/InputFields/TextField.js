import { memo } from 'react';

import { Grid, TextField } from '@mui/material';

const TextFieldWrapper = ({
  label,
  value,
  onChange,
  onKeyDown,
  readOnly,
  required,
  placeholder,
  type,
  xs,
  sm,
  md,
  lg,
  endAdornment,
}) => {
  let inputProps = null;

  if (type === 'number') {
    inputProps = { inputProps: { min: 0 } };
  }

  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg}>
      <TextField
        InputProps={{
          readOnly,
          ...inputProps,
          endAdornment,
        }}
        error={required && (value == null || value == '')}
        required={required}
        placeholder={placeholder}
        fullWidth
        size='small'
        type={type}
        label={label}
        value={value || ''}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </Grid>
  );
};

TextFieldWrapper.defaultProps = {
  label: '',
  value: '',
  placeholder: '',
  readOnly: false,
  required: null,
  endAdornment: null,
  xs: 12,
  sm: 6,
  md: 4,
  lg: 2,
};

export default memo(TextFieldWrapper);
