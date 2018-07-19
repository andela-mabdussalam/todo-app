'use strict';
module.exports = (sequelize, DataTypes) => {
  var Todo = sequelize.define('Todo', {
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      unique: true,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  }, {});
  return Todo;
};
