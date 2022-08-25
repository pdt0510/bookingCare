import * as apiServices from '../services/apiServices';
import * as apiSupplies from '../connectSupply/apiSupplies';
import db from '../models/index';

export const userListFn = async (req, res) => {
  const dataArr = await apiServices.userList();

  if (dataArr) {
    return res.status(200).json({
      message: 'successfully users listed',
      data: dataArr,
    });
  }

  return res.status(404).json({
    message: 'failed users listed',
    data: [],
  });
};

export const loginFn = async (req, res) => {
  const { email, password } = req.body;
  const { fieldRequired, badRequest } = apiSupplies.errStates;
  let data = null;

  if (!email || !password) {
    data = fieldRequired;
    return res.status(500).json(data);
  }

  data = await apiServices.handleUserLogin(email, password);

  if (data.errCode === badRequest.errCode) {
    return res.status(404).json(data);
  }

  return res.status(200).json(data);
};
