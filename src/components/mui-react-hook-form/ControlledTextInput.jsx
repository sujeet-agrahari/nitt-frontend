import { TextField } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

const getDefaultValue = (defaultValue, type) => {
  if (type === 'text' && !defaultValue) {
    return '';
  }
  if (type === 'number' && defaultValue <= 0) {
    return 0;
  }
  return defaultValue;
};
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
  margin,
}) => (
  <Controller
    name={name}
    control={control}
    defaultValue={getDefaultValue(defaultValue, type)}
    render={({ field, fieldState }) => (
      <TextField
        {...field}
        label={label}
        margin={margin}
        type={type}
        style={style}
        error={!!fieldState.error}
        helperText={fieldState.error?.message}
        InputLabelProps={inputLabelProps}
        InputProps={inputProps}
        disabled={disabled}
        variant={variant}
        fullWidth
      />
    )}
  />
);

export default ControlledTextInput;
