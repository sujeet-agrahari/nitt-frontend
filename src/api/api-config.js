const ApiConfig = {
  COURSE: {
    GET_COURSES: {
      url: '/courses',
    },
<<<<<<< HEAD
    POST_COURSE: {
=======
    ADD_COURSE: {
>>>>>>> master
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
<<<<<<< HEAD
    POST_FEES: {
      url: '/fees',
      method: 'POST',
    },
=======
>>>>>>> master
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
<<<<<<< HEAD
    POST_ENROLLMENT: {
      url: '/enrollments',
      method: 'POST',
    },
    PUT_ENROLLMENT: {
      url: '/enrollments',
      method: 'PUT',
    },
=======
>>>>>>> master
  },
  AUTH: {
    LOGIN: {
      url: 'auth/login',
      method: 'POST',
    },
  },
};

export default ApiConfig;
