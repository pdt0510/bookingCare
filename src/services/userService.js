//src9, 1m58ss,
import axios from '../axios';
import * as apiSupplies from '../connectSupplyFE/apiSupplies';

// 4ms59ss
export const loginApi = (email, password) => {
  const { apiUrl, loginApi } = apiSupplies.apiUrls;
  return axios.post(apiUrl + loginApi, { email, password }); // 20ms33ss
};
