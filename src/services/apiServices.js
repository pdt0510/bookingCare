import * as apiSupplies from '../connectSupply/apiSupplies';
import db from '../models/index';
import bcrypt from 'bcryptjs';

export const userList = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const dataArr = await db.users.findAll({
        raw: false,
      });
      resolve(dataArr);
    } catch (error) {
      reject(error);
    }
  });
};

export const handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { noErrors, badRequest } = apiSupplies.errStates;
      const isExist = await checkUserEmail(email);
      let data = {
        ...badRequest,
        user: {},
      };

      if (isExist) {
        const userDb = await db.users.findOne({
          where: { email },
          attributes: ['email', 'password', 'roleId'],
          raw: true,
        });

        if (userDb) {
          const isPassword = await checkUserPassword(userDb.password, password);

          if (isPassword) {
            data = {
              ...noErrors,
              user: {
                ...userDb,
                password: undefined,
              },
            };
          }
        }
      }

      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const checkUserEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.users.findOne({
        where: { email },
        raw: true,
      });

      if (user) {
        resolve(true);
      }
      resolve(false);
    } catch (error) {
      reject(error);
    }
  });
};

export const checkUserPassword = (dbPassword, clientPassword) => {
  return new Promise((resolve, reject) => {
    try {
      const isChecked = bcrypt.compareSync(clientPassword, dbPassword);
      resolve(isChecked);
    } catch (error) {
      reject(error);
    }
  });
};
