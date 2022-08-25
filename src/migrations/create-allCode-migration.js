'use strict';
const types = {
  STRING: 'STRING',
  BOOLEAN: 'BOOLEAN',
  INTEGER: 'INTEGER',
  DATE: 'DATE',
  TEXT: 'TEXT',
};

const tableInfo = {
  tableName: 'allcodes',
  keyValueCols: [
    `key-${types.STRING}`,
    `type-${types.STRING}`,
    `valueEN-${types.STRING}`,
    `valueVI-${types.STRING}`,
  ],
};

const handleColTypes = (colTypeList, sequelizeList = true) => {
  let result = {};
  if (sequelizeList) {
    tableInfo.keyValueCols.forEach((element) => {
      const keys = element.split('-');
      if (element.includes(types.STRING)) {
        result[keys[0]] = { type: colTypeList.STRING };
      } else if (element.includes(types.INTEGER)) {
        result[keys[0]] = { type: colTypeList.INTEGER };
      } else if (element.includes(types.BOOLEAN)) {
        result[keys[0]] = { type: colTypeList.BOOLEAN };
      } else if (element.includes(types.DATE)) {
        result[keys[0]] = { type: colTypeList.DATE };
      } else if (element.includes(types.TEXT)) {
        result[keys[0]] = { type: colTypeList.TEXT };
      }
    });
  } else {
    tableInfo.keyValueCols.forEach((element) => {
      const keys = element.split('-');
      if (element.includes(types.STRING)) {
        result[keys[0]] = colTypeList.STRING;
      } else if (element.includes(types.INTEGER)) {
        result[keys[0]] = colTypeList.INTEGER;
      } else if (element.includes(types.BOOLEAN)) {
        result[keys[0]] = colTypeList.BOOLEAN;
      } else if (element.includes(types.DATE)) {
        result[keys[0]] = colTypeList.DATE;
      } else if (element.includes(types.TEXT)) {
        result[keys[0]] = colTypeList.TEXT;
      }
    });
  }
  return result;
};

module.exports = {
  async up(queryInterface, Sequelize) {
    const colsTypes = handleColTypes(Sequelize);
    console.log('colsTypes create-allcode --------------');

    await queryInterface.createTable(`${tableInfo.tableName}`, {
      ...colsTypes,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(`${tableInfo.tableName}`);
  },
  tableInfo,
  handleColTypes,
};
