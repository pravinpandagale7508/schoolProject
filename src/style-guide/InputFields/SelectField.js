import { memo } from 'react';

import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';

const SelectFieldWrapper = ({ label, value, onChange, options, disabled, required, xs, sm, md, lg,msx }) => {
  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg}>
      <FormControl fullWidth disabled={disabled} required={required}>
        <InputLabel id={label} sx={{ top: -6, maxWidth: 'calc(100% - 40px)' }}>
          {label}
        </InputLabel>
        <Select
          value={value || ''}
          label={label}
          onChange={onChange}
          size='small'
                  MenuProps={{ sx: msx }}>
          {options?.map(option => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};

SelectFieldWrapper.defaultProps = {
  label: '',
  value: '',
  required: null,
  options: [],
  xs: 12,
  sm: 6,
  md: 4,
  lg: 2,
  msx: { maxHeight: '400px' }
};

export default memo(SelectFieldWrapper);
