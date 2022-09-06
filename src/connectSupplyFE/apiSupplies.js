export const apiUrls = {
  apiUrl: '/api',
  idParamApi: '/:id',
  loginApi: '/login',
  userListedApi: '/user-listed',
  userCreatedApi: '/user-created',
  userUpdatedApi: '/user-updated',
  userDeletedApi: '/user-deleted',
};

export const errStates = {
  noErrors: {
    errCode: 0,
    okStatus: 200,
    message: 'Successfully requested',
  },
  fieldRequired: {
    errCode: 1,
    status: 400,
    message: 'Fields required',
  },
  notFound: {
    errCode: 2,
    status: 404,
    message: 'Not Found!',
  },
  incorrectInfo: {
    errCode: 3,
    status: 406,
    accMes: 'Your account is incorrect',
    emailMes: 'Incorrect email',
    passwordConfirmedMes: 'Incorrect password confirmed',
  },
  missingParams: {
    errCode: 4,
    status: 406,
    idMes: 'Missing required id',
  },
  notCreated: {
    errCode: 5,
    status: 501,
    emailMes: 'Email is already exited',
  },
};
