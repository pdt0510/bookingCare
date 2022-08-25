//src9, 6ms29ss
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true,
});

// 29ms49ss
instance.interceptors.response.use(
  (response) => {
    const { data } = response;
    return data;
  },
  (error) => {
    const { response } = error;
    return response.data;
  },
);

export default instance;
