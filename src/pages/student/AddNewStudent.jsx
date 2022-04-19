import { useEffect, useState } from 'react';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
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
} from '@mui/material';
import { Box, styled } from '@mui/system';

import { pick } from 'lodash';

import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Layout from 'src/components/layout/Layout';
import PageTitle from 'src/components/page-title/PageTitle';
import { CurrencyRupee, Percent } from '@mui/icons-material';
import { db, uploadFile } from '../../firebase';
import ControlledTextInput from '../../components/mui-react-hook-form/ControlledTextInput';
import ControlledDatePicker from '../../components/mui-react-hook-form/ControlledDatePicker';

const Input = styled('input')({
  display: 'none',
});
const schema = yup
  .object({
    firstName: yup.string().required('Field is required!'),
    middleName: yup.string().required('Field is required!'),
    lastName: yup.string().required('Field is required!'),
    fatherName: yup.string().required('Field is required!'),
    motherName: yup.string().required('Field is required!'),
    paidFees: yup.number().positive().integer().required('Field is required!'),
    phone: yup
      .string()
      .matches(/^[6-9]{1}[0-9]{9}$/, 'Invalid phone number!')
      .required('Field is required!'),
    dateOfBirth: yup.date().typeError('Invalid date').required('Field is required'),
    address: yup.string().required('Field is required'),
    discount: yup.number().typeError('Must be a number').integer().min(0),
    photo: yup.mixed().test('photo', 'Photo is required!', (value) => value && value.length > 0),
    courseId: yup.string().required('Select course'),
    email: yup.string().email('Invalid email!').nullable().default(null),
    totalFees: yup
      .number()
      .typeError('Total fees required, select course!')
      .positive('Total fees required, select course!')
      .required('Total fees required, select course!'),
  })
  .required();

const AddNewStudent = () => {
  const [courses, setCourses] = useState([]);

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'courses'),
      (snapshot) => {
        const list = [];
        snapshot.docs.forEach((doc) => list.push({ id: doc.id, ...doc.data() }));
        setCourses(list);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => unsub();
  }, []);

  const navigate = useNavigate();

  const handleAdd = async (data) => {
    try {
      // upload the file
      data.photo = await uploadFile(data.photo[0], data.phone);
      const student = await addDoc(collection(db, 'students'), {
        createdAt: new Date(),
        updatedAt: new Date(),
        ...pick(data, [
          'email',
          'photo',
          'phone',
          'address',
          'lastName',
          'firstName',
          'fatherName',
          'middleName',
          'motherName',
          'dateOfBirth',
        ]),
      });
      const enrollment = await addDoc(collection(db, 'enrollments'), {
        studentId: student.id,
        ...pick(data, ['courseId']),
        createdAt: new Date(),
        updatedAt: new Date(),
        totalFees: data.totalFees,
      });
      await addDoc(collection(db, 'fees'), {
        createdAt: new Date(),
        updatedAt: new Date(),
        ...pick(data, ['paidFees']),
        enrollmentId: enrollment.id,
      });
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <Box padding={2}>
        <PageTitle pageTitle="Add New Student" margin={4} />
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
          <Grid container spacing={4} textAlign="center">
            <Grid item xs={4}>
              <ControlledTextInput name={'firstName'} control={control} label="First Name" />
            </Grid>
            <Grid item xs={4}>
              <ControlledTextInput name={'middleName'} control={control} label="Middle Name" />
            </Grid>
            <Grid item xs={4}>
              <ControlledTextInput name={'lastName'} control={control} label="Last Name" />
            </Grid>
            <Grid item xs={4}>
              <ControlledTextInput name={'fatherName'} control={control} label="Father Name" />
            </Grid>
            <Grid item xs={4}>
              <ControlledTextInput name={'motherName'} control={control} label="Mother Name" />
            </Grid>
            <Grid item xs={4}>
              <ControlledTextInput
                name={'phone'}
                control={control}
                label="Phone"
                inputLabelProps={{
                  maxLength: 10,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <ControlledTextInput name={'email'} control={control} label="Email" type="email" />
            </Grid>
            <Grid item sm={4}>
              <ControlledDatePicker name={'dateOfBirth'} label="Date Of Birth" disableFuture control={control} />
            </Grid>
            <Grid item sm={4}>
              <Controller
                name="courseId"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <FormControl variant="standard" sx={{ m: 1, width: '45%' }}>
                    <InputLabel id="select-course">Course</InputLabel>
                    <Select
                      labelId="select-course"
                      label="Course"
                      {...field}
                      variant="standard"
                      error={Boolean(errors.courseId)}
                      onChange={(e) => {
                        const courseId = e.target.value;
                        const totalFees = courseId ? courses.find(({ id }) => id === courseId).fees : '';
                        setValue('totalFees', totalFees);
                        field.onChange(courseId);
                      }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {courses.map((course) => (
                        <MenuItem key={course.id} value={course.id}>
                          {course.course}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={4}>
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
            <Grid item xs={4}>
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
            <Grid item xs={4}>
              <ControlledTextInput name={'paidFees'} control={control} label="Paid Fees" type="number" />
            </Grid>
            <Grid item sm={6}>
              <ControlledTextInput
                name={'address'}
                control={control}
                label="Address"
                inputLabelProps={{ shrink: true }}
                style={{ width: '63%' }}
              />
            </Grid>
            <Grid item sm={12} textAlign="center">
              <Button
                variant="contained"
                type="submit"
                // disabled={percentage < 100}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Layout>
  );
};

export default AddNewStudent;
