const ApiConfig = {
  COURSE: {
    GET_COURSES: {
      url: '/courses',
    },
    ADD_COURSE: {
      url: '/courses',
      method: 'POST',
    },
    UPDATE_COURSE: {
      url: '/courses',
      method: 'PUT',
    },
  },
  FEES: {
    GET_FEES: {
      url: '/fees',
    },
    GET_TOTAL: {
      url: '/fees/total',
    },
  },
  STUDENT: {
    GET_STUDENTS: {
      url: '/students',
    },
  },
  ENROLLMENT: {
    GET_ENROLLMENTS: {
      url: '/enrollments',
    },
  },
  AUTH: {
    LOGIN: {
      url: 'auth/login',
      method: 'POST',
    },
  },
};

export default ApiConfig;
