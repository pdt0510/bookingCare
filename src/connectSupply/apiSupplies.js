export const apiUrls = {
  apiUrl: '/api',
  idParamApi: '/:id',
  loginApi: '/login',
  userListedApi: '/user-listed',
  userCreatedApi: '/user-created',
  userDeletedApi: '/user-deleted',
  userUpdatedApi: '/user-updated',
};

export const errStates = {
  noErrors: {
    errCode: 0,
    status: 200, //OK
    message: 'Successfully requested',
  },
  fieldRequired: {
    errCode: 1,
    status: 400, //Bad Request
    message: 'Fields required',
  },
  notFound: {
    errCode: 2,
    status: 404, //Not Found
    message: 'Not Found!',
  },
  incorrectInfo: {
    errCode: 3,
    status: 406, // Not Acceptable
    accMes: 'Your account is incorrect',
    emailMes: 'Incorrect email',
    passwordConfirmedMes: 'Incorrect password',
    idMes: 'Incorrect id',
  },
  missingParams: {
    errCode: 4,
    status: 406, // Not Acceptable
    idMes: 'Missing required id',
  },
  notCreated: {
    errCode: 5,
    status: 501, //Not Implemented
    emailMes: 'Email is already existed',
  },
};
