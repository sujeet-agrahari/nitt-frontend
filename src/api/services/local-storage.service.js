const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};
const LocalStorageService = {
  getUser,
  getAccessToken: () => {
    const user = getUser();
    return user ? user.accessToken : null;
  },
  getRefreshToken: () => {
    const user = getUser();
    return user ? user.refreshToken : null;
  },
  getUserId: () => {
    const user = getUser();
    return user ? user.userId : null;
  },
  setUser: (user) => {
    if (!user) {
      return localStorage.setItem('user', null);
    }
    return localStorage.setItem('user', JSON.stringify(user));
  },
  setAccessToken: (accessToken) => {
    const user = getUser();
    if (user) {
      user.accessToken = accessToken;
    }
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  },
  setRefreshToken: (refreshToken) => {
    const user = getUser();
    if (user) {
      user.refreshToken = refreshToken;
    }
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  },
};

export default LocalStorageService;
