import Client from './client';

const refreshToken = (refreshToken) =>
  Client({
    url: '/auth/refresh-token',
    method: 'POST',
    data: {
      refreshToken,
    },
  });

export default refreshToken;
