import { Box, Stack, Switch, Tooltip, IconButton } from '@mui/material';
import PageTitle from 'src/components/page-title/PageTitle';
import { useConfirm } from 'material-ui-confirm';
import { useState } from 'react';
import { Add, Visibility } from '@mui/icons-material';
import { useAlert } from 'react-alert';
import MuiDataTable from 'mui-datatables';
import { GridActionsCellItem } from '@mui/x-data-grid';
import Layout from '../../components/layout/Layout';

import axiosHook from '../../api/axios-hook';

import ApiConfig from '../../api/api-config';
import AddCourse from './AddCourse';
import UpdateCourse from './UpdateCourse';

const Course = () => {
  const alert = useAlert();
  const confirm = useConfirm();

  const [{ data: courses = [] }, refetchCourse] = axiosHook(ApiConfig.COURSE.GET_COURSES.url);
  const [, executeUpdate] = axiosHook(
    {
      ...ApiConfig.COURSE.UPDATE_COURSE,
    },
    { manual: true }
  );

  const [updateCourseDialogOpen, setUpdateCourseDialogOpen] = useState(false);
  const [courseRow, setCourseRow] = useState({});
  const [addCourseDialogOpen, setAddCourseDialogOpen] = useState(false);

  const handleActive = (course) => {
    const courseStatus = course.isActive;
    confirm({
      description: `Do you want to ${courseStatus ? 'deactivate' : 'activate'} course?`,
      confirmationText: 'Yes',
      title: `${courseStatus ? 'Deactivate' : 'Activate'} Course!`,
    })
      .then(async () => {
        try {
          await executeUpdate({
            url: `${ApiConfig.COURSE.UPDATE_COURSE.url}/${course.id}`,
            data: {
              isActive: !course.isActive,
            },
          });
          await refetchCourse();
        } catch (error) {
          alert.show(error.response.data.message);
        }
      })
      .catch((err) => err?.message ?? alert.error(err?.message));
  };

  const columns = [
    {
      name: 'id',
      label: 'ID',
      options: {
        display: false,
        filter: true,
        sort: true,
      },
    },
    {
      name: 'name',
      label: 'Course',
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: 'duration',
      label: 'Duration',
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'description',
      label: 'Description',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'price',
      label: 'Fees',
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: 'discount',
      label: 'Discount',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'Actions',
      options: {
        filter: true,
        setCellHeaderProps: () => ({ align: 'left' }),
        sort: false,
        empty: true,
        onRowClick: false,
        customBodyRender: (value, tableMeta) => {
          const course = courses.find((course) => course.id === tableMeta.rowData[0]);
          return (
            <Stack flexDirection={'row'} gap={2}>
              <GridActionsCellItem
                icon={<Visibility color="primary" />}
                onClick={() => {
                  setCourseRow(course);
                  setUpdateCourseDialogOpen(true);
                }}
                label="View"
              />
              <GridActionsCellItem
                icon={<Switch checked={course.isActive} />}
                onClick={() => {
                  handleActive(course);
                }}
                label="Active"
              />
            </Stack>
          );
        },
      },
    },
  ];

  return (
    <Layout>
      <Box padding={2} width="100%">
        <PageTitle pageTitle="Courses" />
        <UpdateCourse
          open={updateCourseDialogOpen}
          setOpen={setUpdateCourseDialogOpen}
          refetchCourse={refetchCourse}
          course={courseRow}
          setCourse={setCourseRow}
        />
        <AddCourse open={addCourseDialogOpen} setOpen={setAddCourseDialogOpen} refetchCourse={refetchCourse} />
        <MuiDataTable
          data={courses}
          columns={columns}
          options={{
            filterType: 'checkbox',
            selectableRows: 'none',
            customToolbar: () => (
              <Tooltip title={'Collect Fees'}>
                <IconButton onClick={() => setAddCourseDialogOpen(true)}>
                  <Add />
                </IconButton>
              </Tooltip>
            ),
          }}
        />
      </Box>
    </Layout>
  );
};

export default Course;
