import PageTitle from 'src/components/page-title/PageTitle';
import { Avatar, Box, Stack } from '@mui/material';
import ApiConfig from 'src/api/api-config';
import MuiDataTable from 'mui-datatables';
import moment from 'moment';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import axiosHook from '../../api/axios-hook';

const getStudents = (enrollments) =>
  enrollments.map((enrollment) => ({
    id: enrollment.id,
    photo: enrollment.Student.photo,
    firstName: enrollment.Student.firstName,
    lastName: enrollment.Student.lastName,
    studentName: `${enrollment.Student.firstName} ${enrollment.Student.lastName}`,
    course: enrollment.Course.name,
    dateOfBirth: moment(enrollment.Student.dateOfBirth).format('DD-MM-YYYY'),
    phone: enrollment.Student.User.phone,
    paidFees: enrollment.Fees.reduce((total, { paidFees }) => total + paidFees, 0),
    netFees: enrollment.netFees,
    dueFees: enrollment.netFees - enrollment.Fees.reduce((total, { paidFees }) => total + paidFees, 0),
    enrolledOn: moment(enrollment.enrolledOn).format('DD-MM-YYYY'),
  }));

const Student = () => {
  const [{ data: enrollments = [] }] = axiosHook(ApiConfig.ENROLLMENT.GET_ENROLLMENTS.url);
  const navigate = useNavigate();
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
      name: 'photo',
      label: 'Photo',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => <Avatar src={value} sx={{ height: '60px', width: '60px' }} />,
      },
    },
    {
      name: 'studentName',
      label: 'Student',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'phone',
      label: 'Phone',
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: 'course',
      label: 'Course',
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'enrolledOn',
      label: 'Admission Date',
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: 'dateOfBirth',
      label: 'Date Of Birth',
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'netFees',
      label: 'Total Fees',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'paidFees',
      label: 'Paid Fees',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'dueFees',
      label: 'Fees Due',
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
          const enrollment = enrollments.find((enrollment) => enrollment.id === tableMeta.rowData[0]);
          return (
            <Stack flexDirection={'row'} gap={2}>
              <GridActionsCellItem
                icon={<Visibility color="primary" />}
                onClick={() => navigate(`${enrollment.id}`, { state: enrollment })}
                label="Edit"
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
        <PageTitle pageTitle="Students" addButton to="new" />
        <MuiDataTable
          data={getStudents(enrollments)}
          columns={columns}
          options={{
            filterType: 'checkbox',
            selectableRows: 'none',
          }}
        />
      </Box>
    </Layout>
  );
};

export default Student;
