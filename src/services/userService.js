//src11
import axios from '../axios';
import * as apiSupplies from '../connectSupplyFE/apiSupplies';

// v52xx1
export const updateUser = (newData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { apiUrl, userUpdatedApi } = apiSupplies.apiUrls;
      const data = await axios.patch(apiUrl + userUpdatedApi, {
        ...newData, //v51xx2
      });
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

// v51xx1
export const deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { apiUrl, userDeletedApi } = apiSupplies.apiUrls;
      const data = await axios.delete(apiUrl + userDeletedApi, {
        data: { id: userId }, //v51xx2
      });
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

// 58ms50ss
export const newUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { apiUrl, userCreatedApi } = apiSupplies.apiUrls;
      const data = await axios.post(apiUrl + userCreatedApi, newUser);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const userList = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { apiUrl, userListedApi } = apiSupplies.apiUrls;
      const data = await axios.get(apiUrl + userListedApi);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const loginApi = (email, password) => {
  const { apiUrl, loginApi } = apiSupplies.apiUrls;
  return axios.post(apiUrl + loginApi, { email, password });
};
