import { Box } from '@mui/material';
import PageTitle from 'src/components/page-title/PageTitle';
import { useConfirm } from 'material-ui-confirm';
import Layout from '../../components/layout/Layout';
import Datatable from '../../components/datatable/Datatable';

import courseColumns from './course-columns';
import { useAxios } from '../../api/use-axios';

import ApiConfig from '../../api/api-config';

const COURSE_UPDATE_AXIOS_CONFIG = ApiConfig.COURSE.UPDATE_COURSE;

const Course = () => {
  const confirm = useConfirm();
  const entity = 'courses';
  const { fetch: fetchCourse, response: courses = [] } = useAxios(ApiConfig.COURSE.GET_COURSES);
  const { fetch } = useAxios(COURSE_UPDATE_AXIOS_CONFIG, false);

  const handleDeactivate = (courseId) => {
    confirm({ description: 'Do you want to deactivate course?', confirmationText: 'Yes', title: 'Deactivate Course!' })
      .then(async () => {
        COURSE_UPDATE_AXIOS_CONFIG.url = `${COURSE_UPDATE_AXIOS_CONFIG.url}/${courseId}`;
        COURSE_UPDATE_AXIOS_CONFIG.data = {
          isActive: false,
        };
        console.log(COURSE_UPDATE_AXIOS_CONFIG);
        await fetch();
        await fetchCourse();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Layout>
      <Box padding={2} width="100%">
        <PageTitle pageTitle="Courses" addButton to="/courses/new" />
        <Datatable entity={entity} columns={courseColumns} rows={courses} deleteRow={handleDeactivate} />
      </Box>
    </Layout>
  );
};

export default Course;
