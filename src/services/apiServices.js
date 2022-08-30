//src10
import * as apiSupplies from '../connectSupply/apiSupplies';
import db from '../models/index';
import bcrypt from 'bcryptjs';
import moment from 'moment';

const checkUserEmail = (email) => {
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

const checkUserPassword = (dbPassword, clientPassword) => {
  return new Promise((resolve, reject) => {
    try {
      const isChecked = bcrypt.compareSync(clientPassword, dbPassword);
      resolve(isChecked);
    } catch (error) {
      reject(error);
    }
  });
};

const hashingPassword = (password) => {
  return new Promise((resolve, reject) => {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      resolve(hashedPassword);
    } catch (error) {
      reject(error);
    }
  });
};

//v48xx1
export const userUpdatedApi = (clientData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { noErrors, notFound } = apiSupplies.errStates;
      let data = { ...notFound, user: {} };

      const isUpdated = await db.users
        .update(
          {
            firstName: clientData.firstname,
            lastName: clientData.lastname,
            address: clientData.address,
          },
          { where: { id: clientData.id } },
        )
        .then((res) => {
          const isSuccessed = 1;
          return res[0] === isSuccessed ? true : false;
        });

      if (isUpdated) {
        const user = await db.users.findOne({
          where: { id: clientData.id },
          attributes: { exclude: ['password'] },
        });
        data = {
          ...noErrors,
          user,
        };
      }

      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const userCreatedApi = (clientData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let now = null;
      const { noErrors, notCreated } = apiSupplies.errStates;
      let data = {
        errCode: notCreated.errCode,
        status: notCreated.status,
        message: notCreated.emailMes,
        user: {},
      };

      const isExisted = await checkUserEmail(clientData.email);
      if (isExisted) {
        //no handling
      } else {
        const hashedPassword = await hashingPassword(clientData.password);

        //v48xx3
        const anNewUser = await db.users
          .findOrCreate({
            where: { email: clientData.email },
            defaults: {
              email: clientData.email,
              password: hashedPassword,
              firstName: clientData.firstname,
              lastName: clientData.lastname,
              gender: clientData.gender === '1' ? true : false,
              address: clientData.address,
              phoneNumber: clientData.phoneNumber,
              roleId: clientData.roleId,
            },
          })
          .then((res) => {
            const [userData, isNewUser] = res; //v48xx3
            if (isNewUser) {
              now = moment().format('YYYY-MM-DD HH:mm:ss'); //v48xx4
              return userData.get({ plain: true }); //v48xx5
            } else {
              return false;
            }
          });

        if (anNewUser) {
          data = {
            ...noErrors,
            user: {
              ...anNewUser,
              password: undefined,
              createdAt: now, //v48xx4
              updatedAt: now,
            },
          };
        }
      }
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

//v46xx2
export const userListApi = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = {};
      let users = null;
      const { noErrors, notFound } = apiSupplies.errStates;

      if (userId === 'ALL') {
        users = await db.users.findAll({
          attributes: { exclude: ['password'] }, //14ms09ss
        });
      } else {
        users = await db.users.findAll({
          where: { userId },
          attributes: { exclude: ['password'] }, //14ms09ss
          // raw: true, //15ms50ss
        });
      }
      // console.log('users - ', users); //15ms50ss

      if (users) {
        data = {
          ...noErrors,
          users,
        };
      } else {
        data = {
          ...notFound,
          users: [],
        };
      }
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { noErrors, incorrectInfo } = apiSupplies.errStates;
      const isExist = await checkUserEmail(email);
      let data = {
        errCode: incorrectInfo.errCode,
        message: incorrectInfo.accMes,
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
