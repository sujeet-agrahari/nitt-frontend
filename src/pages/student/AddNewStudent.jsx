import { useNavigate } from 'react-router-dom';
import {
  Button,
  Avatar,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Stack,
  InputAdornment,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import { Box, styled } from '@mui/system';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Layout from 'src/components/layout/Layout';
import PageTitle from 'src/components/page-title/PageTitle';
import { CurrencyRupee, Percent } from '@mui/icons-material';
import axiosHook from 'src/api/axios-hook';
import ApiConfig from 'src/api/api-config';
import { useAlert } from 'react-alert';
import { uploadFile } from 'src/firebase';
import { useConfirm } from 'material-ui-confirm';
import { useState } from 'react';
import ControlledTextInput from '../../components/mui-react-hook-form/ControlledTextInput';
import ControlledDatePicker from '../../components/mui-react-hook-form/ControlledDatePicker';

const Input = styled('input')({
  display: 'none',
});
const schema = yup
  .object({
    phone: yup
      .string()
      .matches(/^[6-9]{1}[0-9]{9}$/, 'Invalid phone number!')
      .required('Field is required!'),

    firstName: yup.string().required('Field is required!'),
    middleName: yup.string(),
    lastName: yup.string().required('Field is required!'),
    fatherName: yup.string().required('Field is required!'),
    motherName: yup.string().required('Field is required!'),
    addressLine1: yup.string().required('Field is required'),
    addressLine2: yup.string(),
    dateOfBirth: yup.date().typeError('Invalid date').required('Field is required'),
    email: yup.string().email('Invalid email!').nullable().default(null),
    photo: yup.mixed().test('photo', 'Photo is required!', (value) => value && value.length > 0),

    discount: yup.number().typeError('Must be a number').integer().min(0).default(0),
    courseId: yup.string().required('Select course'),
    totalFees: yup
      .number()
      .typeError('Total fees required, select course!')
      .positive('Total fees required, select course!')
      .required('Total fees required, select course!'),
    enrolledOn: yup.date().typeError('Invalid date').default(new Date()),

    paidFees: yup.number().positive().integer().required('Field is required!'),
    paidOn: yup.date().typeError('Invalid date').required('Field is required').default(new Date()),
    medium: yup.string().default('Cash'),
    receiptNo: yup.string().default(),
  })
  .required();

const AddNewStudent = () => {
  const alert = useAlert();

  const confirm = useConfirm();
  const [isLoading, setLoading] = useState(false);

  const [{ data: courses = [] }] = axiosHook(ApiConfig.COURSE.GET_COURSES.url);
  const [, createEnrollment] = axiosHook(
    { ...ApiConfig.ENROLLMENT.POST_ENROLLMENT },
    {
      manual: true,
    }
  );
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const navigate = useNavigate();

  const handleAdd = async (data) => {
    setLoading(true);
    try {
      data.photo = await uploadFile(data.photo[0], data.phone);
      const response = await createEnrollment({
        data,
      });
      setLoading(false);
      confirm({
        description: `Password is ${response.data.user.password}`,
        title: 'Student Created!',
        confirmationText: 'Okay',
      })
        .then(() => navigate(-1))
        .catch((err) => alert.show(err?.message));
    } catch (error) {
      setLoading(false);
      alert.error(error.response.data.message);
    }
  };
  return (
    <Layout>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="secondary" size={70} />
      </Backdrop>
      <Box padding={2}>
        <PageTitle pageTitle="Add New Student" margin={3} />
        <Box
          component="form"
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            boxShadow: '2px 4px 10px 1px rgba(201, 201, 201, 0.47)',
            borderRadius: '10px',
            padding: '20px',
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(handleAdd)}
        >
          <Controller
            name="photo"
            control={control}
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <Stack gap={2} alignItems="center">
                <Avatar
                  sx={{ width: 200, height: 200 }}
                  src={
                    value && value.length
                      ? URL.createObjectURL(value[0])
                      : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
                  }
                  alt="files preview"
                />
                <label htmlFor="files">
                  <Input
                    {...fieldProps}
                    onChange={(event) => onChange(event.target.files)}
                    type="file"
                    accept="image/*"
                    id="files"
                    multiple
                  />
                  <Button variant="contained" component="span">
                    Upload
                  </Button>
                  {errors.photo && (
                    <Typography variant="caption" display="block" color="crimson" gutterBottom>
                      {errors.photo.message}
                    </Typography>
                  )}
                </label>
              </Stack>
            )}
          />
          <Grid container spacing={6} textAlign="center">
            <Grid item xs={3}>
              <ControlledTextInput
                name={'phone'}
                control={control}
                label="Phone"
                inputLabelProps={{
                  maxLength: 10,
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <ControlledTextInput name={'firstName'} control={control} label="First Name" />
            </Grid>
            <Grid item xs={3}>
              <ControlledTextInput name={'middleName'} control={control} label="Middle Name" />
            </Grid>
            <Grid item xs={3}>
              <ControlledTextInput name={'lastName'} control={control} label="Last Name" />
            </Grid>
            <Grid item xs={3}>
              <ControlledTextInput name={'fatherName'} control={control} label="Father Name" />
            </Grid>
            <Grid item xs={3}>
              <ControlledTextInput name={'motherName'} control={control} label="Mother Name" />
            </Grid>
            <Grid item xs={3}>
              <ControlledTextInput name={'email'} control={control} label="Email" type="email" />
            </Grid>
            <Grid item sm={3}>
              <ControlledDatePicker name={'dateOfBirth'} label="Date Of Birth" disableFuture control={control} />
            </Grid>
            <Grid item sm={3}>
              <ControlledDatePicker name={'enrolledOn'} label="Enrolled On" disableFuture control={control} />
            </Grid>
            <Grid item sm={3}>
              <ControlledTextInput name={'addressLine1'} control={control} label="Address Line One" />
            </Grid>
            <Grid item sm={3}>
              <ControlledTextInput name={'addressLine2'} control={control} label="Address Line Two" />
            </Grid>

            <Grid item sm={3}>
              <Controller
                name="courseId"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <FormControl variant="standard" sx={{ m: 1, width: '100%' }}>
                    <InputLabel id="select-course">Course</InputLabel>
                    <Select
                      labelId="select-course"
                      label="Course"
                      {...field}
                      variant="standard"
                      error={Boolean(errors.courseId)}
                      onChange={(e) => {
                        const courseId = e.target.value;
                        const totalFees = courseId ? courses.find(({ id }) => id === courseId).price : '';
                        console.log(totalFees);
                        setValue('totalFees', totalFees);
                        field.onChange(courseId);
                      }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {courses.map((course) => (
                        <MenuItem key={course.id} value={course.id}>
                          {course.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={3}>
              <ControlledTextInput
                name={'totalFees'}
                defaultValue=""
                control={control}
                label="Total Fees"
                type="number"
                inputLabelProps={{ shrink: true }}
                disabled
                inputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <CurrencyRupee />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={3}>
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
            <Grid item xs={3}>
              <ControlledTextInput name={'paidFees'} control={control} label="Paid Fees" type="number" />
            </Grid>
            <Grid item sm={3}>
              <ControlledDatePicker name={'paidOn'} label="Paid On" disableFuture control={control} />
            </Grid>
            <Grid item sm={3}>
              <ControlledTextInput name={'medium'} control={control} label="Payment Medium" defaultValue={'Cash'} />
            </Grid>
            <Grid item sm={3}>
              <ControlledTextInput name={'receiptNo'} control={control} label="Receipt No" />
            </Grid>
          </Grid>
          <Grid item sm={12} textAlign="center" marginTop={2}>
            <Button
              variant="contained"
              type="submit"
              // disabled={percentage < 100}
            >
              Submit
            </Button>
          </Grid>
        </Box>
      </Box>
    </Layout>
  );
};

export default AddNewStudent;
