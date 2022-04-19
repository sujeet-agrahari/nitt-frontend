import { Box, Stack } from '@mui/material';
import moment from 'moment';
import Layout from 'src/components/layout/Layout';
import PageTitle from 'src/components/page-title/PageTitle';
import { useAxios } from '../../api/use-axios';
import NewTable from '../../components/table/NewTable';
import { NewWidget } from '../../components/widget/NewWidget';
import ApiConfig from '../../api/api-config';

const getEnrolledStudents = (enrollments) =>
  enrollments.map((enrollment) => ({
    id: enrollment.studentId,
    name: enrollment.Student.firstName + enrollment.Student.lastName,
    course: enrollment.Course.name,
    phone: enrollment.Student.User.phone,
    paidFees: enrollment.Fees.reduce((total, { paidFees }) => total + paidFees, 0),
    totalFees: enrollment.netFees,
    dueFees: enrollment.netFees - enrollment.Fees.reduce((total, { paidFees }) => total + paidFees, 0),
    enrolledOn: moment(enrollment.enrolledOn).format('DD-MM-YYYY'),
  }));

const Dashboard = () => {
  const { response: students } = useAxios(ApiConfig.STUDENT.GET_STUDENTS);
  const { response: courses } = useAxios(ApiConfig.COURSE.GET_COURSES);
  const { response: totalFees } = useAxios(ApiConfig.FEES.GET_TOTAL);
  const { response: enrollments = [] } = useAxios(ApiConfig.ENROLLMENT.GET_ENROLLMENTS);

  return (
    <Layout>
      <Box padding={2} width="100%">
        <Stack direction={'row'} justifyContent="space-between" gap={2} mb={10}>
          <NewWidget type={'student'} counter={students?.length} />
          <NewWidget type={'course'} counter={courses?.length} />
          <NewWidget type={'earning'} counter={totalFees} />
        </Stack>
        <PageTitle pageTitle="Recently Added Students" margin={0} />
        <NewTable
          rowTitles={['Student ID', 'Name', 'Course', 'Phone', 'Fees Paid', 'Total Fees', 'Fees Due', 'Enrolled On']}
          rowData={getEnrolledStudents(enrollments)}
        />
      </Box>
    </Layout>
  );
};
export default Dashboard;
