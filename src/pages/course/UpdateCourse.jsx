import * as yup from 'yup';

import { Grid, InputAdornment } from '@mui/material';
import { useForm } from 'react-hook-form';
import ApiConfig from 'src/api/api-config';
import ControlledTextInput from 'src/components/mui-react-hook-form/ControlledTextInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { CurrencyRupee, Percent } from '@mui/icons-material';
import FormDialog from 'src/components/form-dialog/FormDialog';
import { useAlert } from 'react-alert';
import { useEffect } from 'react';
import axiosHook from '../../api/axios-hook';

const schema = yup.object({
  name: yup.string().required('Field is required!'),
  description: yup.string().required('Field is required!'),
  price: yup.number().positive().integer().required('Field is required'),
  duration: yup.number().positive().integer().required('Field is required'),
  discount: yup.number().default(0),
});

const UpdateCourse = ({ open, setOpen, refetchCourse, course }) => {
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const alert = useAlert();

  // rest form state
  useEffect(() => {
    if (open) {
      reset();
    }
  }, [open, reset]);

  const [, executeUpdate] = axiosHook(
    {
      ...ApiConfig.COURSE.UPDATE_COURSE,
    },
    { manual: true }
  );

  const updateCourse = () => {
    handleSubmit(async (data) => {
      try {
        await executeUpdate({
          url: `${ApiConfig.COURSE.GET_COURSES.url}/${course.id}`,
          data,
        });
        await refetchCourse();
        setOpen(false);
        alert.success('Course is updated!');
      } catch (error) {
        alert.error(error.response.data.message);
      }
    })();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <FormDialog isOpen={open} handleClose={handleClose} title="Update Course" handleConfirm={updateCourse}>
      <Grid container spacing={4} textAlign="center">
        <Grid item xs={6}>
          <ControlledTextInput name={'name'} control={control} label="Course" defaultValue={course?.name} />
        </Grid>
        <Grid item xs={6}>
          <ControlledTextInput
            name={'price'}
            control={control}
            label="Fees"
            type="number"
            defaultValue={course?.price}
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
            defaultValue={course?.discount}
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
            defaultValue={course?.duration}
            inputProps={{
              endAdornment: <InputAdornment position="end">Days</InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={8}>
          <ControlledTextInput
            name={'description'}
            control={control}
            label="Description"
            defaultValue={course?.description}
          />
        </Grid>
      </Grid>
    </FormDialog>
  );
};

export default UpdateCourse;
