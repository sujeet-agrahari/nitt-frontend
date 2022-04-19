import * as yup from 'yup';

import { useNavigate } from 'react-router-dom';
import { Button, Grid, InputAdornment } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Box } from '@mui/system';
import Layout from 'src/components/layout/Layout';
import PageTitle from 'src/components/page-title/PageTitle';
import { useAxios } from 'src/api/use-axios';
import ApiConfig from 'src/api/api-config';
import ControlledTextInput from 'src/components/mui-react-hook-form/ControlledTextInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { CurrencyRupee, Percent } from '@mui/icons-material';

const COURSE_ADD_CONFIG = ApiConfig.COURSE.ADD_COURSE;

const schema = yup.object({
  name: yup.string().required('Field is required!'),
  description: yup.string().required('Field is required!'),
  price: yup.number().positive().integer().required('Field is required'),
  duration: yup.number().positive().integer().required('Field is required'),
  discount: yup.number().positive().integer().default(0),
});

const New = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const { fetch, response, error } = useAxios(COURSE_ADD_CONFIG, false);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (response) {
      navigate(-1);
    }
  });

  const handleAdd = async (data) => {
    COURSE_ADD_CONFIG.data = data;
    fetch();
  };

  return (
    <Layout>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        style={{ minHeight: '100vh', padding: '50px' }}
      >
        <Grid item xs={3}>
          <PageTitle pageTitle="Add New Course" />
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
            <Grid container spacing={4}>
              <Grid item xs={3}>
                <ControlledTextInput name={'name'} control={control} label="Course Name" />
              </Grid>
              <Grid item xs={6}>
                <ControlledTextInput
                  name={'description'}
                  control={control}
                  label="Description"
                  style={{
                    width: '80%',
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <ControlledTextInput
                  name={'price'}
                  control={control}
                  label="Price"
                  type="number"
                  style={{
                    width: '45%',
                  }}
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
                  style={{
                    width: '45%',
                  }}
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
                <ControlledTextInput
                  name={'duration'}
                  control={control}
                  label="Duration"
                  type="number"
                  style={{
                    width: '45%',
                  }}
                  inputProps={{
                    endAdornment: <InputAdornment position="end">Days</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item sm={12} textAlign="center">
                <Button variant="contained" type="submit">
                  Add Course
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default New;
