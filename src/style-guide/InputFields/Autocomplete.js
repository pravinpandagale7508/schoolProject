import { memo } from 'react';

import { Autocomplete, Grid, TextField } from '@mui/material';

const AutocompleteWrapper = ({ label, value, onChange, options, required, field, xs, sm, md, lg }) => {
  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg}>
      <Autocomplete
        freeSolo
        selectOnFocus
        autoComplete={true}
        autoHighlight={true}
        autoSelect={true}
        clearOnBlur
        fullWidth
        size='small'
        options={options}
        getOptionLabel={option => {
          if (typeof option === 'string') {
            return option;
          }
          return option.name ? `${option.name}` : '';
        }}
        renderInput={params => <TextField {...params} label={label} required={required} error={required && (value == null || value == '')} />}
        value={options.find(option => option.id === value)?.name || ''}
        onChange={(_, newValue) => {
          if (newValue) {
            onChange(field, newValue.id);
          } else {
            onChange(field, '');
          }
        }}
      />
    </Grid>
  );
};

AutocompleteWrapper.defaultProps = {
  label: '',
  value: '',
  xs: 12,
  sm: 6,
  md: 4,
  lg: 2,
  required: null,
};

export default memo(AutocompleteWrapper);
