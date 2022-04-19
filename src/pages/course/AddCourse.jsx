import * as yup from 'yup';

import { Grid, InputAdornment } from '@mui/material';
import { useForm } from 'react-hook-form';
import ApiConfig from 'src/api/api-config';
import ControlledTextInput from 'src/components/mui-react-hook-form/ControlledTextInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { CurrencyRupee, Percent } from '@mui/icons-material';
import FormDialog from 'src/components/form-dialog/FormDialog';
import axiosHook from '../../api/axios-hook';

const schema = yup.object({
  name: yup.string().required('Field is required!'),
  description: yup.string().required('Field is required!'),
  price: yup.number().positive().integer().required('Field is required'),
  duration: yup.number().positive().integer().required('Field is required'),
  discount: yup.number().min(0).default(0),
});

const AddCourse = ({ open, setOpen, refetchCourse }) => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const [, executeAdd] = axiosHook(
    {
      ...ApiConfig.COURSE.POST_COURSE,
    },
    { manual: true }
  );

  const addCourse = () => {
    handleSubmit(async (data) => {
      try {
        await executeAdd({
          data,
        });
        setOpen(false);
        await refetchCourse();
        alert.success('Course is added!');
      } catch (error) {
        alert.error(error.response.data.message);
      }
    })();
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <FormDialog isOpen={open} handleClose={handleClose} title="Add Course" handleConfirm={addCourse}>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <ControlledTextInput name={'name'} control={control} label="Course Name" />
        </Grid>
        <Grid item xs={6}>
          <ControlledTextInput name={'description'} control={control} label="Description" />
        </Grid>
        <Grid item xs={6}>
          <ControlledTextInput
            name={'price'}
            control={control}
            label="Price"
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
          <ControlledTextInput
            name={'discount'}
            control={control}
            label="Discount"
            type="number"
            inputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Percent />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <ControlledTextInput
            name={'duration'}
            control={control}
            label="Duration"
            type="number"
            inputProps={{
              endAdornment: <InputAdornment position="end">Days</InputAdornment>,
            }}
          />
        </Grid>
      </Grid>
    </FormDialog>
  );
};

export default AddCourse;
