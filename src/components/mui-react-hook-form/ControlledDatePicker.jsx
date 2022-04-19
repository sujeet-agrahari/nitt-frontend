import { LocalizationProvider, DatePicker } from '@mui/lab';
import AdapterDayjs from '@mui/lab/AdapterDayjs';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

const ControlledDatePicker = ({
  control,
  label,
  name,
  variant = 'standard',
  disableFuture = false,
  defaultValue = null,
}) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value }, fieldState }) => (
        <DatePicker
          label={label}
          inputFormat="YYYY-MM-DD"
          views={['year', 'month', 'day']}
          mask="____-__-__"
          disableFuture={disableFuture}
          value={value}
          onChange={(value) => onChange(value.toDate())}
          renderInput={(params) => (
            <TextField
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              variant={variant}
              {...params}
              fullWidth
            />
          )}
        />
      )}
    />
  </LocalizationProvider>
);

export default ControlledDatePicker;
