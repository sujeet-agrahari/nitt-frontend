import { TextField } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

const ControlledTextInput = ({
  label,
  name,
  control,
  style = {},
  defaultValue,
  type = 'text',
  variant = 'standard',
  inputLabelProps = {},
  disabled = false,
  inputProps = {},
}) => (
  <Controller
    name={name}
    control={control}
    defaultValue={defaultValue}
    render={({ field, fieldState }) => (
      <TextField
        {...field}
        label={label}
        type={type}
        style={style}
        error={!!fieldState.error}
        helperText={fieldState.error?.message}
        InputLabelProps={inputLabelProps}
        InputProps={inputProps}
        disabled={disabled}
        variant={variant}
      />
    )}
  />
);

export default ControlledTextInput;
