const ApiConfig = {
  COURSE: {
    GET_COURSES: {
      url: '/courses',
    },
    POST_COURSE: {
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
    POST_FEES: {
      url: '/fees',
      method: 'POST',
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
    POST_ENROLLMENT: {
      url: '/enrollments',
      method: 'POST',
    },
    PUT_ENROLLMENT: {
      url: '/enrollments',
      method: 'PUT',
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
