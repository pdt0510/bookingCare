//src10
import * as apiServices from '../services/apiServices';
import * as apiSupplies from '../connectSupply/apiSupplies';

export const userUpdatedFn = async (req, res) => {
  let data = null;
  const id = +req.body.id;
  const { fieldRequired, incorrectInfo } = apiSupplies.errStates;

  if (!id || typeof id !== 'number') {
    data = {
      errCode: incorrectInfo.errCode,
      status: incorrectInfo.status,
      message: incorrectInfo.idMes,
    };
  } else {
    let isEmpty = false;
    const clientData = req.body;

    for (const key in clientData) {
      if (clientData[key] === null || clientData[key] === '') {
        isEmpty = true;
        break;
      }
    }

    if (isEmpty) {
      data = fieldRequired;
    } else {
      data = await apiServices.userUpdatedApi(clientData);
    }
  }

  return res.status(data.status).json(data);
};

export const userCreatedFn = async (req, res) => {
  let data = null;
  let isEmpty = false;
  const clientData = req.body;
  const { notCreated, fieldRequired, incorrectInfo } = apiSupplies.errStates;

  // v48xx2
  for (const key in clientData) {
    if (clientData[key] === null || clientData[key] === '') {
      isEmpty = true;
      break;
    }
  }

  if (isEmpty) {
    data = fieldRequired;
    return res.status(data.status).json(data);
  } else if (!clientData.email.includes('@gmail.com')) {
    data = {
      errCode: incorrectInfo.errCode,
      status: incorrectInfo.status,
      message: incorrectInfo.emailMes,
    };
    return res.status(data.status).json(data);
  } else if (clientData.password !== clientData.passwordConfirmed) {
    data = {
      errCode: incorrectInfo.errCode,
      status: incorrectInfo.status,
      message: incorrectInfo.passwordConfirmedMes,
    };
    return res.status(data.status).json(data);
  }

  data = await apiServices.userCreatedApi(clientData);

  if (data.errCode === notCreated.errCode) {
    return res.status(data.status).json(data);
  }

  return res.status(data.status).json(data);
};

export const userDeletedFn = async (req, res) => {
  // v48xx6
  // const id = +req.params.id;
  const id = +req.body.id;
  let data = null;
  const { incorrectInfo } = apiSupplies.errStates;

  if (!id || typeof id !== 'number') {
    data = {
      errCode: incorrectInfo.errCode,
      status: incorrectInfo.status,
      message: incorrectInfo.idMes,
    };
  } else {
    data = await apiServices.userDeletedApi(id);
  }
  return res.status(data.status).json(data);
};

export const userListFn = async (req, res) => {
  //4ms01ss
  let data = null;
  const id = Object.keys(req.params).length === 0 ? 'ALL' : req.params.id;
  const { notFound, missingParams } = apiSupplies.errStates;

  if (!id) {
    data = {
      errCode: missingParams.errCode,
      message: missingParams.idMes,
    };
    return res.status(data.status).json(data);
  } else {
    data = await apiServices.userListApi('ALL');
  }
  return res.status(data.status).json(data);
};

export const loginFn = async (req, res) => {
  const { email, password } = req.body;
  const { fieldRequired, incorrectInfo } = apiSupplies.errStates;
  let data = null;

  if (!email || !password) {
    data = fieldRequired;
    return res.status(data.status).json(data);
  }

  data = await apiServices.handleUserLogin(email, password);
  if (data.errCode === incorrectInfo.errCode) {
    return res.status(data.status).json(data);
  }
  return res.status(data.status).json(data);
};
