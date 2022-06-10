import { Avatar, Box, Stack } from '@mui/material';
import moment from 'moment';
import Layout from 'src/components/layout/Layout';
import PageTitle from 'src/components/page-title/PageTitle';
import MuiDataTable from 'mui-datatables';
import { Widget } from '../../components/widget/Widget';
import ApiConfig from '../../api/api-config';
import axiosHook from '../../api/axios-hook';

const getEnrolledStudents = (enrollments) =>
  enrollments.map((enrollment) => ({
    id: enrollment.studentId.split('-').pop(),
    studentName: `${enrollment.Student.firstName} ${enrollment.Student.lastName}`,
    course: enrollment.Course.name,
    photo: enrollment.Student.photo,
    phone: enrollment.Student.User.phone,
    paidFees: enrollment.Fees.reduce((total, { paidFees }) => total + paidFees, 0),
    dueFees: enrollment.netFees - enrollment.Fees.reduce((total, { paidFees }) => total + paidFees, 0),
    enrolledOn: moment(enrollment.enrolledOn).format('DD-MM-YYYY'),
  }));

const columns = [
  {
    name: 'id',
    label: 'Id',
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
    label: 'COURSE',
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
    name: 'paidFees',
    label: 'Paid Fees',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: 'dueFees',
    label: 'Due Fees',
    options: {
      filter: true,
      sort: false,
    },
  },
];

const Dashboard = () => {
  const [{ data: students }] = axiosHook(ApiConfig.STUDENT.GET_STUDENTS.url);
  const [{ data: courses }] = axiosHook(ApiConfig.COURSE.GET_COURSES.url);
  const [{ data: totalFees }] = axiosHook(ApiConfig.FEES.GET_TOTAL.url);
  const [{ data: enrollments = [] }] = axiosHook(ApiConfig.ENROLLMENT.GET_ENROLLMENTS.url);

  return (
    <Layout>
      <Box padding={2} width="100%">
        <Stack direction={'row'} justifyContent="space-between" gap={2} mb={4}>
          <Widget type={'student'} counter={students?.length} />
          <Widget type={'course'} counter={courses?.length} />
          <Widget type={'earning'} counter={totalFees} />
        </Stack>
        <PageTitle pageTitle="Recently Added Students" margin={1} />
        <MuiDataTable
          data={getEnrolledStudents(enrollments)}
          columns={columns}
          options={{
            filterType: 'checkbox',
            rowsPerPage: 5,
            selectableRows: 'none',
            rowsPerPageOptions: [5, 10, 15, 20],
          }}
        />
      </Box>
    </Layout>
  );
};
export default Dashboard;
