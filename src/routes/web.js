import express from 'express';
import * as webSupplies from '../connectSupply/webSupplies';
import * as homeController from '../controller/homeController';

import * as apiSupplies from '../connectSupply/apiSupplies';
import * as apiController from '../controller/apiController';

const appRouters = express.Router();

const initWebRoutes = (app) => {
  //web
  const {
    idParam,
    homeUrl,
    userFormUrl,
    userPostedUrl,
    userListedUrl,
    userEditedUrl,
    userUpdatedUrl,
    userDeletedUrl,
  } = webSupplies.urls;

  const {
    getHomePage,
    getCRUD,
    postCRUD,
    userList,
    editUser,
    updateUser,
    delUser,
  } = homeController;

  appRouters.get(homeUrl, getHomePage);
  appRouters.get(userFormUrl, getCRUD);
  appRouters.post(userPostedUrl, postCRUD);
  appRouters.get(userListedUrl, userList);
  appRouters.get(`${userEditedUrl}/${idParam}`, editUser);
  appRouters.post(`${userUpdatedUrl}/${idParam}`, updateUser);
  appRouters.get(`${userDeletedUrl}/${idParam}`, delUser);

  // api
  const { apiUrl, userListedApi, loginApi } = apiSupplies.apiUrls;
  const { userListFn, loginFn } = apiController;

  appRouters.get(apiUrl + userListedApi, userListFn);
  appRouters.post(apiUrl + loginApi, loginFn);
  return app.use(homeUrl, appRouters);
};

export default initWebRoutes;
