import { LocalizationProvider, DatePicker } from '@mui/lab';
import AdapterDayjs from '@mui/lab/AdapterDayjs';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

const ControlledDatePicker = ({ control, label, name, variant = 'standard', disableFuture = false }) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Controller
      name={name}
      control={control}
      defaultValue={null}
      render={({ field: { onChange, value }, fieldState }) => (
        <DatePicker
          label={label}
          inputFormat="DD-MM-YYYY"
          mask="__-__-____"
          disableFuture={disableFuture}
          value={value}
          onChange={(value) => onChange(value)}
          renderInput={(params) => (
            <TextField
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              variant={variant}
              {...params}
            />
          )}
        />
      )}
    />
  </LocalizationProvider>
);

export default ControlledDatePicker;
