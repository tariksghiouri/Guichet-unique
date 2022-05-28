/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('accounts', {
    'id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      primaryKey: true,
      comment: "null",
      autoIncrement: true
    },
    'email': {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "null"
    },
    'passwordHash': {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "null"
    },
    'role': {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "null"
    },
    'verificationToken': {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "null"
    },
    'verified': {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "null"
    },
    'resetToken': {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "null"
    },
    'resetTokenExpires': {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "null"
    },
    'passwordReset': {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "null"
    },
    'created': {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "null"
    },
    'updated': {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "null"
    }
  }, {
    tableName: 'accounts'
  });
};
