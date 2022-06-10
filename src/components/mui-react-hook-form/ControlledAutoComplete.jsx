import { Autocomplete, TextField } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

const ControlledAutoComplete = ({ options = [], label, getOptionLabel, control, defaultValue, name }) => (
  <Controller
    name={name}
    control={control}
    defaultValue={defaultValue}
    render={({ field, fieldState }) => (
      <Autocomplete
        options={options}
        getOptionLabel={getOptionLabel}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            variant="standard"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            fullWidth
          />
        )}
        {...field}
        isOptionEqualToValue={(option, value) => value === undefined || value === '' || option?.id === value?.id}
        onChange={(_, data) => field.onChange(data)}
      />
    )}
  />
);

export default ControlledAutoComplete;
