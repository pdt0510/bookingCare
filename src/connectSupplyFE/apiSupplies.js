export const apiUrls = {
  apiUrl: '/api',
  loginApi: '/login',
  userListedApi: '/user-listed',
};

export const errStates = {
  noErrors: {
    errCode: 0,
    message: 'successfully requested',
  },
  fieldRequired: {
    errCode: 1,
    message: 'Fields required',
  },
  notFound: {
    errCode: 2,
    message: 'Not found!',
  },
  badRequest: {
    errCode: 3,
    message: 'Your account is incorrect',
  },
};
