import * as yup from 'yup';

import { Grid, InputAdornment } from '@mui/material';
import { useForm } from 'react-hook-form';
import ApiConfig from 'src/api/api-config';
import ControlledTextInput from 'src/components/mui-react-hook-form/ControlledTextInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { CurrencyRupee } from '@mui/icons-material';
import FormDialog from 'src/components/form-dialog/FormDialog';
import ControlledDatePicker from 'src/components/mui-react-hook-form/ControlledDatePicker';
import ControlledAutoComplete from 'src/components/mui-react-hook-form/ControlledAutoComplete';
import { useAlert } from 'react-alert';
import axiosHook from '../../api/axios-hook';

const schema = yup.object({
  enrollmentId: yup.mixed().required('Field is required!'),
  paidFees: yup.number().positive().integer().required('Field is required!').typeError('Field is required!'),
  paidOn: yup.date().typeError('Invalid date').required('Field is required').default(new Date()),
  medium: yup.string().default('Cash'),
  receiptNo: yup.string(),
});

export const AddFees = ({ open, setOpen, refetchFees }) => {
  const alert = useAlert();

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const [{ data: enrollments = [] }] = axiosHook(ApiConfig.ENROLLMENT.GET_ENROLLMENTS.url);

  const [, executeAdd] = axiosHook(
    {
      ...ApiConfig.FEES.POST_FEES,
    },
    { manual: true }
  );

  const addFees = () => {
    handleSubmit(async (data) => {
      data.enrollmentId = data.enrollmentId.id;
      try {
        await executeAdd({
          data,
        });
        await refetchFees();
        setOpen(false);
        alert.success('Fees is added!');
      } catch (error) {
        alert.error(error.response.data.message);
      }
    })();
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <FormDialog isOpen={open} handleClose={handleClose} title="Add Fees" handleConfirm={addFees}>
      <Grid container spacing={4} textAlign="center">
        <Grid item xs={6}>
          <ControlledAutoComplete
            control={control}
            name="enrollmentId"
            options={enrollments}
            getOptionLabel={(option) => option.Student?.User?.phone}
            label="Select Students"
            defaultValue={null}
          />
        </Grid>
        <Grid item xs={6}>
          <ControlledTextInput
            name={'paidFees'}
            control={control}
            label="Paid Fees"
            type="number"
            inputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <CurrencyRupee />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <ControlledTextInput name={'medium'} control={control} label="Payment Medium" />
        </Grid>
        <Grid item xs={6}>
          <ControlledTextInput name={'receiptNo'} control={control} label="Receipt No" />
        </Grid>
        <Grid item sm={6}>
          <ControlledDatePicker name={'paidOn'} label="Paid On" disableFuture control={control} />
        </Grid>
      </Grid>
    </FormDialog>
  );
};
